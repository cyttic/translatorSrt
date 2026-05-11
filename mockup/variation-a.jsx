// Variation A — Horizontal pipeline.
// Reads left→right like a build pipeline. Settings live in a right inspector.

function VariationA({ theme: themeName = 'dark' }) {
  const theme = themes[themeName];
  const stageStatus = (i) => {
    if (RUN.done.includes(i)) return 'done';
    if (i === RUN.active) return 'active';
    return 'idle';
  };

  return (
    <MacWindow theme={theme} title="SubtitlesTransformer — lecture-04-quantum-mechanics.mp4">
      {/* Body grid: main + right inspector */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 320px', minHeight: 0 }}>
        {/* MAIN COLUMN */}
        <div style={{
          display: 'flex', flexDirection: 'column', minWidth: 0,
          borderRight: `0.5px solid ${theme.hairline}`,
        }}>
          {/* Toolbar */}
          <ToolbarA theme={theme} themeName={themeName} />

          {/* Pipeline visualization */}
          <div style={{ padding: '18px 22px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <PipelineChain theme={theme} stageStatus={stageStatus} />

            {/* Overall progress strip */}
            <OverallStripA theme={theme} />
          </div>

          {/* Terminal */}
          <Terminal theme={theme} />
        </div>

        {/* RIGHT INSPECTOR */}
        <InspectorA theme={theme} />
      </div>
    </MacWindow>
  );
}

function ToolbarA({ theme, themeName }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 16px', borderBottom: `0.5px solid ${theme.hairline}`,
      background: theme.panelMute,
    }}>
      {/* File chip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '5px 10px 5px 8px', borderRadius: 7,
        background: theme.fieldBg, border: `0.5px solid ${theme.fieldBorder}`,
        flex: 1, minWidth: 0, maxWidth: 520,
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: 5, flexShrink: 0,
          background: theme.accentSoft, color: theme.accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon.Video size={13}/>
        </div>
        <div style={{ display:'flex', flexDirection:'column', minWidth: 0, lineHeight: 1.2 }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: theme.text,
            overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {RUN.filename}
          </div>
          <div style={{ fontSize: 10, color: theme.textMute, fontFamily: FONT_MONO }}>
            {RUN.filesize} · {RUN.duration} · {RUN.resolution}
          </div>
        </div>
        <button style={btnGhost(theme)}>Replace</button>
      </div>

      <div style={{ flex: 1 }} />

      {/* Theme toggle (segmented) */}
      <div style={{
        display: 'flex', padding: 2, borderRadius: 6, gap: 1,
        background: theme.chipBg,
      }}>
        <SegBtn theme={theme} active={themeName==='light'}><Icon.Sun/></SegBtn>
        <SegBtn theme={theme} active={themeName==='dark'}><Icon.Moon/></SegBtn>
      </div>

      {/* Start button */}
      <button style={{
        ...btnPrimary(theme),
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <Icon.Stop size={9}/> Stop
      </button>
    </div>
  );
}

function PipelineChain({ theme, stageStatus }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
      padding: '6px 0',
    }}>
      {STAGES.map((s, i) => {
        const status = stageStatus(i);
        return (
          <div key={s.id} style={{ position: 'relative', padding: '0 4px' }}>
            {/* Connector to next */}
            {i < STAGES.length - 1 && <Connector theme={theme} status={status} nextStatus={stageStatus(i+1)} />}
            <StageCard theme={theme} stage={s} index={i} status={status} />
          </div>
        );
      })}
    </div>
  );
}

function StageCard({ theme, stage, index, status }) {
  const isActive = status === 'active';
  const isDone = status === 'done';
  const accent =
    isActive ? theme.accent :
    isDone ? theme.success : theme.textFaint;
  const iconBg =
    isActive ? theme.accentSoft :
    isDone ? theme.successSoft : theme.chipBg;
  const I = Icon[stage.icon];
  const pct = isActive ? Math.round(RUN.progress * 100) :
              isDone   ? 100 : 0;

  return (
    <div style={{
      position: 'relative',
      background: theme.panel,
      border: `0.5px solid ${isActive ? theme.accent : theme.hairline}`,
      boxShadow: isActive
        ? `0 0 0 3px ${theme.accentSoft}, 0 6px 18px ${theme.name==='dark'?'rgba(0,0,0,0.4)':'rgba(0,0,0,0.06)'}`
        : `0 1px 2px ${theme.name==='dark'?'rgba(0,0,0,0.3)':'rgba(0,0,0,0.04)'}`,
      borderRadius: 8, padding: '12px 12px 10px',
      transition: 'all .15s', minHeight: 116,
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 6,
          background: iconBg, color: accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 600,
        }}>
          <I size={14}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: theme.text, lineHeight: 1.1 }}>{stage.name}</div>
          <div style={{ fontSize: 10, color: theme.textMute, fontFamily: FONT_MONO, marginTop: 2 }}>{stage.sub}</div>
        </div>
        {isDone && <span style={{ color: theme.success, display:'inline-flex' }}><Icon.Check size={12}/></span>}
        {isActive && <Spinner color={theme.accent}/>}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 4 }}>
        <div style={{
          height: 4, borderRadius: 2,
          background: theme.chipBg, overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            width: `${pct}%`, height: '100%',
            background: isDone ? theme.success : theme.accent,
            transition: 'width .3s',
            position: 'relative', overflow: 'hidden',
          }}>
            {isActive && <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(45deg, rgba(255,255,255,.18) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.18) 50%, rgba(255,255,255,.18) 75%, transparent 75%, transparent)`,
              backgroundSize: '8px 8px',
              animation: 'stripe 800ms linear infinite',
            }}/>}
          </div>
        </div>
      </div>

      {/* Status line */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 10.5, fontFamily: FONT_MONO,
      }}>
        <span style={{ color: accent, fontWeight: 600 }}>
          {isDone && `DONE`}
          {isActive && `RUNNING · ${pct}%`}
          {status === 'idle' && `QUEUED`}
        </span>
        <span style={{ color: theme.textFaint }}>
          {isDone && {0:'00:00:14', 1:'00:02:08'}[index]}
          {isActive && `ETA 02:14`}
          {status === 'idle' && '—'}
        </span>
      </div>
    </div>
  );
}

function Connector({ theme, status, nextStatus }) {
  const filled = status === 'done';
  return (
    <div style={{
      position: 'absolute', top: 25, right: -8, width: 16, zIndex: 0,
      pointerEvents: 'none',
    }}>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
        <path d="M1 6h14" stroke={filled ? theme.success : theme.pipeIdle}
          strokeWidth="1.2" strokeLinecap="round"
          strokeDasharray={filled ? '0' : '2 2'} />
        <path d="M11 2l4 4-4 4" stroke={filled ? theme.success : theme.pipeIdle}
          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </div>
  );
}

function OverallStripA({ theme }) {
  const pct = Math.round(RUN.overall * 100);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '10px 14px',
      background: theme.panel,
      border: `0.5px solid ${theme.hairline}`,
      borderRadius: 8,
    }}>
      <div style={{ fontSize: 10.5, color: theme.textMute, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>
        Overall
      </div>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: theme.chipBg, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: theme.accent, borderRadius: 3 }} />
      </div>
      <div style={{ display: 'flex', gap: 14, fontFamily: FONT_MONO, fontSize: 11, color: theme.text }}>
        <div><span style={{ color: theme.textFaint, marginRight: 4 }}>•</span>{pct}%</div>
        <div><span style={{ color: theme.textFaint, marginRight: 4 }}>elapsed</span>{RUN.elapsed}</div>
        <div><span style={{ color: theme.textFaint, marginRight: 4 }}>eta</span>{RUN.eta}</div>
      </div>
    </div>
  );
}

function Spinner({ color }) {
  return (
    <div style={{
      width: 12, height: 12, borderRadius: '50%',
      border: `1.5px solid ${color}`, borderTopColor: 'transparent',
      animation: 'spin 0.8s linear infinite',
    }} />
  );
}

// ─── Right inspector ─────────────────────────────────────────────
function InspectorA({ theme }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: 0,
      background: theme.panelMute,
      overflow: 'hidden',
    }}>
      {/* Inspector header */}
      <div style={{
        padding: '12px 14px',
        borderBottom: `0.5px solid ${theme.hairline}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Icon.Settings size={13}/>
        <span style={{ fontSize: 12, fontWeight: 600 }}>Pipeline Settings</span>
        <div style={{ flex: 1 }}/>
        <span style={{
          fontSize: 10, fontFamily: FONT_MONO, color: theme.textMute,
          padding: '1px 6px', borderRadius: 4, background: theme.chipBg,
        }}>preset: default</span>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        <Disclosure theme={theme} label="Output" open badge="mp4">
          <Field theme={theme} label="Destination">
            <TextInput theme={theme} value="~/Movies/SubsOut/" mono/>
          </Field>
          <Field theme={theme} label="Filename pattern">
            <TextInput theme={theme} value="{name}.{lang}.{ext}" mono/>
          </Field>
          <Row><span>Overwrite existing</span><Toggle theme={theme} on={false}/></Row>
          <Row><span>Open in Finder when done</span><Toggle theme={theme} on={true}/></Row>
        </Disclosure>

        <Disclosure theme={theme} label="1 · Extract Audio" open badge="ffmpeg">
          <Field theme={theme} label="Codec">
            <Select theme={theme} value="pcm_s16le · 16-bit"/>
          </Field>
          <Row>
            <span>Sample rate</span>
            <span style={{ fontFamily: FONT_MONO }}>16 kHz</span>
          </Row>
          <Slider theme={theme} value={0.5} label="16k"/>
          <Row><span>Mono downmix</span><Toggle theme={theme} on={true}/></Row>
          <Row><span>Loudness normalize</span><Toggle theme={theme} on={false}/></Row>
        </Disclosure>

        <Disclosure theme={theme} label="2 · Transcribe" open badge="whisper">
          <Field theme={theme} label="Model">
            <Select theme={theme} value="large-v3 (ggml, 1.55 GB)"/>
          </Field>
          <Field theme={theme} label="Source language">
            <Select theme={theme} value="Auto-detect"/>
          </Field>
          <Row>
            <span>Beam size</span>
            <span style={{ fontFamily: FONT_MONO }}>5</span>
          </Row>
          <Slider theme={theme} value={0.5} label="5"/>
          <Row><span>VAD (silero)</span><Toggle theme={theme} on={true}/></Row>
          <Row><span>Word timestamps</span><Toggle theme={theme} on={true}/></Row>
          <Row><span>Use Metal (GPU)</span><Toggle theme={theme} on={true}/></Row>
        </Disclosure>

        <Disclosure theme={theme} label="3 · Translate (AI)" open={false}>
          <Field theme={theme} label="Provider"><Select theme={theme} value="OpenAI"/></Field>
          <Field theme={theme} label="Target language"><Select theme={theme} value="Русский (ru-RU)"/></Field>
        </Disclosure>

        <Disclosure theme={theme} label="4 · Mux Subtitles" open={false}>
          <Field theme={theme} label="Mode"><Select theme={theme} value="Softsub (mov_text)"/></Field>
        </Disclosure>
      </div>
    </div>
  );
}

// ─── Terminal (bottom) ───────────────────────────────────────────
function Terminal({ theme }) {
  const lines = [
    ['info',  '[12:04:18]', 'extract', 'ffmpeg started · -i lecture-04...mp4 -vn -ac 1 -ar 16000'],
    ['ok',    '[12:04:32]', 'extract', 'wrote /tmp/sxt-9af2/audio.wav (133.4 MB) in 14.2s'],
    ['info',  '[12:04:32]', 'whisper', 'loading model large-v3 (1.55 GB) on Metal'],
    ['info',  '[12:04:34]', 'whisper', 'language detected: en (prob 0.998)'],
    ['log',   '[12:05:11]', 'whisper', 'segment 412/1280 · "the wave function collapses when..."'],
    ['log',   '[12:05:48]', 'whisper', 'segment 818/1280 · "in the Copenhagen interpretation we say..."'],
    ['warn',  '[12:06:02]', 'whisper', 'low-confidence span 00:38:21 → 00:38:24 (0.42)'],
    ['log',   '[12:06:26]', 'whisper', 'segment 1180/1280 · running · 64%'],
  ];
  const colorFor = (kind) => ({
    info: theme.accent, ok: theme.success, warn: theme.warn,
    err: theme.error, log: theme.textMute,
  }[kind] || theme.textMute);

  return (
    <div style={{
      flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column',
      background: theme.terminal, color: theme.terminalText,
      borderTop: `0.5px solid ${theme.hairline}`,
    }}>
      {/* Terminal header */}
      <div style={{
        height: 26, flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 12px',
        borderBottom: '0.5px solid rgba(255,255,255,0.06)',
        fontSize: 10.5, color: 'rgba(255,255,255,0.6)',
      }}>
        <span style={{ fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Output</span>
        <span style={{ display: 'flex', gap: 6 }}>
          {['All', 'Errors', 'Stage'].map((t, i) => (
            <span key={t} style={{
              padding: '1px 7px', borderRadius: 4,
              background: i===0 ? 'rgba(255,255,255,0.10)' : 'transparent',
              color: i===0 ? '#fff' : 'rgba(255,255,255,0.55)',
            }}>{t}</span>
          ))}
        </span>
        <div style={{ flex: 1 }}/>
        <span style={{ fontFamily: FONT_MONO, color: 'rgba(255,255,255,0.4)' }}>tail · auto-scroll</span>
        <span style={{ fontFamily: FONT_MONO, color: 'rgba(255,255,255,0.4)' }}>clear</span>
      </div>

      {/* Terminal body */}
      <div style={{
        flex: 1, overflow: 'hidden', padding: '8px 12px 8px',
        fontFamily: FONT_MONO, fontSize: 11, lineHeight: 1.5,
      }}>
        {lines.map((l, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, whiteSpace: 'pre' }}>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>{l[1]}</span>
            <span style={{ color: colorFor(l[0]), fontWeight: 600, minWidth: 56 }}>
              {`[${l[2]}]`.padEnd(11, ' ')}
            </span>
            <span>{l[3]}</span>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 10, marginTop: 2 }}>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>[12:06:32]</span>
          <span style={{ color: theme.accent, fontWeight: 600, minWidth: 56 }}>{'[whisper]  '}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ animation: 'blink 1s steps(2) infinite' }}>▍</span>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>transcribing…</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Buttons ─────────────────────────────────────────────────────
function btnPrimary(theme) {
  return {
    all: 'unset',
    cursor: 'pointer',
    padding: '5px 12px', borderRadius: 6,
    background: theme.accent, color: '#fff',
    fontSize: 11.5, fontWeight: 600,
    boxShadow: 'inset 0 -0.5px 0 rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.1)',
  };
}
function btnGhost(theme) {
  return {
    all: 'unset',
    cursor: 'pointer',
    padding: '3px 8px', borderRadius: 5,
    fontSize: 10.5, fontWeight: 500,
    color: theme.textMute,
    border: `0.5px solid ${theme.fieldBorder}`,
    background: 'transparent',
  };
}
function SegBtn({ theme, active, children }) {
  return (
    <button style={{
      all: 'unset',
      width: 24, height: 18, borderRadius: 4,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: active ? theme.panel : 'transparent',
      color: active ? theme.text : theme.textMute,
      boxShadow: active ? `0 0.5px 1.5px rgba(0,0,0,0.15)` : 'none',
      cursor: 'pointer',
    }}>{children}</button>
  );
}

Object.assign(window, { VariationA });
