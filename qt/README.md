# SubtitlesTransformer — Qt 6 / QML mockup

A drop-in Qt 6 + Qt Quick Controls 2 project that implements the **Variation A** (horizontal pipeline) UI from the HTML mockup in this repo.

## Pipeline

```
Extract Audio  →  Transcribe  →  Translate (AI)  →  Mux Subtitles
   ffmpeg          whisper.cpp        gpt-4o          ffmpeg
```

Each stage has live status (`idle | active | done | error`), a progress value, and an elapsed/eta text label. The right inspector hosts collapsible settings per stage. The bottom terminal scrolls real stdout/stderr from your tools.

## Layout

```
┌──────────────────────────────────────────────┬──────────────┐
│ Toolbar (file chip · theme toggle · Stop)    │              │
├──────────────────────────────────────────────┤  Pipeline    │
│  ┌─stage─┐ → ┌─stage─┐ → ┌─stage─┐ → ┌─...─┐ │  Settings    │
│  │       │   │       │   │ ACTIVE│   │     │ │  (collapsible│
│  └───────┘   └───────┘   └───────┘   └─────┘ │   sections)  │
│  Overall ████████████░░░░░░░░  41%  03:42/9m │              │
├──────────────────────────────────────────────┤              │
│ Output (terminal, colored prefixes per stage)│              │
└──────────────────────────────────────────────┴──────────────┘
```

## Build

Requires Qt 6.5+ and CMake 3.21+.

```bash
cd qt
mkdir build && cd build
cmake .. -DCMAKE_PREFIX_PATH=/path/to/Qt/6.7/macos
cmake --build .
./SubtitlesTransformer.app/Contents/MacOS/SubtitlesTransformer
```

## File map

| File | Purpose |
|---|---|
| `src/main.cpp` | Entry point, picks `Basic` QQuickStyle so the custom design isn't overridden |
| `qml/Main.qml` | Root `ApplicationWindow` and overall layout |
| `qml/Theme.qml` | Singleton with light/dark tokens. Toggle `Theme.dark` from anywhere |
| `qml/StagesModel.qml` | `ListModel` of the 4-stage pipeline with simulated progress timer |
| `qml/LogModel.qml` | Terminal scrollback model — call `append(kind, stage, text)` to log |
| `qml/components/PipelineChain.qml` | Horizontal row of `StageCard` + `Connector` |
| `qml/components/StageCard.qml` | Single stage card (icon, name, progress bar, status row) |
| `qml/components/SettingsInspector.qml` | Right-side stack of `SettingsSection` |
| `qml/components/SettingsSection.qml` | Disclosure / collapsible group |
| `qml/components/Terminal.qml` | Bottom log with colored `[stage]` prefixes |
| `qml/components/*` | Buttons, icons, form controls |

## Wiring your backend

The mockup uses a `Timer` inside `StagesModel.qml` to advance the active stage. Replace this with signals from your C++ pipeline:

```cpp
// In your pipeline object exposed to QML:
emit stageProgress("transcribe", 0.42);
emit stageFinished("transcribe");
emit logLine("whisper", "info", "segment 818/1280");
```

Then in QML:

```qml
Connections {
    target: pipeline
    function onStageProgress(id, p) {
        for (var i = 0; i < stages.count; ++i)
            if (stages.get(i).stageId === id)
                stages.setProperty(i, "progress", p);
    }
    function onLogLine(stage, kind, text) {
        logModel.append(kind, stage, text);
    }
}
```

## Theme

A single boolean — `Theme.dark` — flips every color token. Wire it to a `QSettings` value if you want persistence across launches.

## Notes

- **Native vs custom controls.** `main.cpp` sets `QQuickStyle::setStyle("Basic")` so the custom restyling renders consistently. Switch to `"macOS"` if you'd rather use platform controls (but expect the look-and-feel to diverge from the mockup).
- **Drag-and-drop.** `FileChip.qml` already has a `DropArea`; hook it up to your `QFileInfo`/path handling.
- **HTML reference.** `../SubtitlesTransformer.html` shows both variations (horizontal pipeline + vertical timeline) in dark and light. This QML project implements the horizontal pipeline; the vertical timeline is a straightforward replacement of `PipelineChain.qml`.
