#!/usr/bin/env python3
"""
translate_srt.py — Translate Hebrew SRT subtitles to Russian using OpenAI LLM.

Usage:
    python translate_srt.py input.srt [output.srt]

Requirements:
    pip install openai
    export OPENAI_API_KEY="your-key-here"
"""

import sys
import os
import re
import time
from collections import deque
from openai import OpenAI

# ── Config ────────────────────────────────────────────────────────────────────

MODEL          = "gpt-5.4-nano"  # fast + cheap OpenAI model (released March 2026)
MAX_RETRIES    = 3
RETRY_DELAY    = 2               # seconds between retries
CONTEXT_WINDOW = 20              # sliding window: how many past lines to keep as context

SYSTEM_PROMPT = (
    "You are a professional subtitle translator specializing in academic and technical content. "
    "You are translating subtitles from a university lecture series about Databases (DB). "
    "The content is a mix of lecturer speech and student questions during the lecture — "
    "so some lines may be short questions, interruptions, or informal phrasing. "
    "The subtitles were auto-transcribed from speech, so they may contain transcription errors, "
    "incomplete sentences, or unclear phrasing — use your knowledge of database concepts "
    "(SQL, normalization, indexing, transactions, relational models, ERD, ACID, joins, keys, etc.) "
    "to infer the correct meaning when something seems wrong or ambiguous. "
    "When provided, use the recent context (already translated lines) to understand the current "
    "topic and maintain consistency in terminology and flow. "
    "Translate the given Hebrew subtitle text to Russian. "
    "Keep the translation natural, technically accurate, and concise — it must fit on screen as a subtitle. "
    "Output ONLY the translated Russian text, nothing else. "
    "Do not add explanations, quotes, or any extra characters."
)

# ── SRT parsing ───────────────────────────────────────────────────────────────

def parse_srt(path: str) -> list[dict]:
    """Parse an SRT file into a list of subtitle blocks."""
    with open(path, encoding="utf-8-sig") as f:
        content = f.read()

    # Split on blank lines between blocks
    raw_blocks = re.split(r"\n\s*\n", content.strip())
    subtitles = []

    for block in raw_blocks:
        lines = block.strip().splitlines()
        if len(lines) < 3:
            continue

        index_line = lines[0].strip()
        timing_line = lines[1].strip()
        text_lines = lines[2:]

        if not index_line.isdigit():
            continue
        if "-->" not in timing_line:
            continue

        subtitles.append({
            "index": index_line,
            "timing": timing_line,
            "text": "\n".join(text_lines),
        })

    return subtitles


def write_srt(subtitles: list[dict], path: str) -> None:
    """Write subtitle blocks back to an SRT file."""
    blocks = []
    for sub in subtitles:
        blocks.append(f"{sub['index']}\n{sub['timing']}\n{sub['text']}")
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n\n".join(blocks) + "\n")


# ── Translation ───────────────────────────────────────────────────────────────

def build_user_message(hebrew_text: str, context: deque) -> str:
    """Build the user message, prepending sliding context window if available."""
    if context:
        context_block = "\n".join(f"{i+1}. {line}" for i, line in enumerate(context))
        return (
            f"Recent translated lines (for context only, do NOT retranslate):\n"
            f"{context_block}\n\n"
            f"Now translate this line:\n{hebrew_text}"
        )
    return hebrew_text


def translate_text(client: OpenAI, hebrew_text: str, context: deque) -> str:
    """Send one subtitle string to the LLM and return the Russian translation."""
    user_message = build_user_message(hebrew_text, context)

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            response = client.chat.completions.create(
                model=MODEL,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user",   "content": user_message},
                ],
                temperature=0.3,
                max_completion_tokens=300,
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"  ⚠  Attempt {attempt}/{MAX_RETRIES} failed: {e}")
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_DELAY)
            else:
                print("  ✗  Giving up on this block, keeping original text.")
                return hebrew_text


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) < 2:
        print("Usage: python translate_srt.py input.srt [output.srt]")
        sys.exit(1)

    input_path = sys.argv[1]
    if not os.path.isfile(input_path):
        print(f"Error: file not found — {input_path}")
        sys.exit(1)

    # Default output name: original_ru.srt
    if len(sys.argv) >= 3:
        output_path = sys.argv[2]
    else:
        base, ext = os.path.splitext(input_path)
        output_path = f"{base}_ru{ext}"

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Error: OPENAI_API_KEY environment variable is not set.")
        sys.exit(1)

    client = OpenAI(api_key=api_key)

    print(f"📂 Reading: {input_path}")
    subtitles = parse_srt(input_path)
    total = len(subtitles)
    print(f"🔢 Found {total} subtitle block(s)\n")

    # Sliding context window of last N translated Russian lines
    context: deque = deque(maxlen=CONTEXT_WINDOW)

    for i, sub in enumerate(subtitles, start=1):
        original = sub["text"]
        print(f"[{i}/{total}] Translating block #{sub['index']} "
              f"(context: {len(context)} lines) ...", flush=True)
        print(f"  HE: {original[:80]}{'…' if len(original) > 80 else ''}")

        translated = translate_text(client, original, context)
        sub["text"] = translated

        # Push translated line into sliding window (deque auto-drops oldest)
        context.append(translated)

        print(f"  RU: {translated[:80]}{'…' if len(translated) > 80 else ''}\n")

    write_srt(subtitles, output_path)
    print(f"✅ Done! Saved to: {output_path}")


if __name__ == "__main__":
    main()