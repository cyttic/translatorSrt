// Variation B — Vertical timeline.
// Settings live in a left source-list sidebar with stage-by-stage drill-down.
// Main column is a centered vertical timeline; selected stage shows preview detail.

function VariationB({ theme: themeName = 'dark' }) {
  const theme = themes[themeName];
  const stageStatus = (i) => {
    if (RUN.done.includes(i)) return 'done';
    if (i === RUN.active) return 'active';
    return 'idle';
  };

  return (
    <MacWindow theme={theme} title="SubtitlesTransformer">
      {/* Body grid: left settings · main timeline */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 0 }}>
        {/* LEFT SIDEBAR */}
        <SettingsRailB theme={theme} themeName={themeName} />

        {/* MAIN */}
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0,
          background: theme.bg,
        }}>
          <ToolbarB theme={theme} themeName={themeName}/>

          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            {/* Timeline scroll area */}
            <div style={{ flex: 1, overflow: 'auto', padding: '20px 28px 18px' }}>
              <TimelineHeader theme={theme}/>
              <Timeline theme={theme} stageStatus={stageStatus}/>
            </div>

            {/* Terminal */}
            <Terminal theme={theme}/>
          </div>
        </div>
      </div>
    </MacWindow>
  );
}

function ToolbarB({ theme, themeName }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 16px',
      background: theme.titlebar,
      borderBottom: `0.5px solid ${theme.hairline}`,
    }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 11, color: theme.textMute, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon.Folder size={12}/>
        <span>~/Movies/Lectures</span>
        <Icon.Chevron size={8}/>
        <span style={{ color: theme.text, fontWeight: 600 }}>lecture-04-quantum-mechanics.mp4</span>
      </div>
      <div style={{ flex: 1 }}/>
      <span style={{ fontSize: 10.5, color: theme.textMute, fontFamily: FONT_MONO }}>
        {RUN.elapsed} elapsed · ETA {RUN.eta}
      </span>
      <div style={{
        display: 'flex', padding: 2, borderRadius: 6, gap: 1,
        background: theme.chipBg,
      }}>
        <SegBtnB theme={theme} active={themeName==='light'}><Icon.Sun/></SegBtnB>
        <SegBtnB theme={theme} active={themeName==='dark'}><Icon.Moon/></SegBtnB>
      </div>
      <button style={btnDangerB(theme)}>
        <Icon.Stop size={9}/>
        <span style={{ marginLeft: 6 }}>Stop run</span>
      </button>
    </div>
  );
}

function SegBtnB({ theme, active, children }) {
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

function btnDangerB(theme) {
  return {
    all: 'unset', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center',
    padding: '4px 10px', borderRadius: 6,
    background: theme.error, color: '#fff',
    fontSize: 11, fontWeight: 600,
    boxShadow: 'inset 0 -0.5px 0 rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.1)',
  };
}

// ─── Left settings rail ─────────────────────────────────────────
function SettingsRailB({ theme, themeName }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: 0,
      background: theme.sidebar,
      borderRight: `0.5px solid ${theme.hairline}`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }}>
      {/* Source row — looks selected */}
      <div style={{
        padding: '12px 14px',
        borderBottom: `0.5px solid ${theme.hairline}`,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: 0.4, color: theme.textMute, marginBottom: 6 }}>Source</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: 7, borderRadius: 7,
          background: theme.accentSoft,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 5,
            background: theme.accent, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon.Video size={14}/>
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: theme.text,
              overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {RUN.filename}
            </div>
            <div style={{ fontSize: 10, color: theme.textMute, fontFamily: FONT_MONO, marginTop: 1 }}>
              {RUN.duration} · {RUN.filesize}
            </div>
          </div>
        </div>
      </div>

      {/* Stage list */}
      <div style={{ padding: '8px 0', borderBottom: `0.5px solid ${theme.hairline}` }}>
        <div style={{ padding: '4px 14px 6px', fontSize: 10, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: 0.4, color: theme.textMute }}>
          Stages
        </div>
        {STAGES.map((s, i) => (
          <StageRow key={s.id} theme={theme} stage={s} index={i}
            selected={i===2 /* Translate currently selected for settings drill-down */}
            status={i===0||i===1 ? 'done' : i===2 ? 'active' : 'idle'} />
        ))}
      </div>

      {/* Selected stage settings */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{
          padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 8,
          borderBottom: `0.5px solid ${theme.hairlineFaint}`,
        }}>
          <Icon.Translate size={13}/>
          <span style={{ fontSize: 11.5, fontWeight: 600 }}>Translate · Settings</span>
        </div>

        <div style={{ padding: '6px 14px 14px' }}>
          <Field theme={theme} label="Provider">
            <Select theme={theme} value="OpenAI"/>
          </Field>
          <Field theme={theme} label="Model">
            <Select theme={theme} value="gpt-4o"/>
          </Field>
          <Field theme={theme} label="Source language">
            <Select theme={theme} value="English (auto-detected)"/>
          </Field>
          <Field theme={theme} label="Target language">
            <Select theme={theme} value="Русский (ru-RU)"/>
          </Field>
          <Field theme={theme} label="Style">
            <Select theme={theme} value="Lecture · formal"/>
          </Field>

          <div style={{ marginTop: 10, fontSize: 10.5, color: theme.textMute, fontWeight: 600, letterSpacing: 0.2, textTransform: 'uppercase' }}>
            Tuning
          </div>

          <div style={{ marginTop: 6 }}>
            <Row mt={0}>
              <span>Temperature</span>
              <span style={{ fontFamily: FONT_MONO }}>0.2</span>
            </Row>
            <Slider theme={theme} value={0.2} label="0.2"/>
          </div>

          <div style={{ marginTop: 10 }}>
            <Row mt={0}>
              <span>Chunk size</span>
              <span style={{ fontFamily: FONT_MONO }}>32 lines</span>
            </Row>
            <Slider theme={theme} value={0.4} label="32"/>
          </div>

          <Row><span>Preserve timing exactly</span><Toggle theme={theme} on/></Row>
          <Row><span>Keep technical terms</span><Toggle theme={theme} on/></Row>
          <Row><span>Use glossary.csv</span><Toggle theme={theme} on={false}/></Row>

          <Field theme={theme} label="System prompt">
            <div style={{
              background: theme.fieldBg, border: `0.5px solid ${theme.fieldBorder}`,
              borderRadius: 5, padding: '6px 8px', fontSize: 10.5, lineHeight: 1.45,
              fontFamily: FONT_MONO, color: theme.text, height: 60, overflow: 'hidden',
            }}>
              You are translating a physics lecture from English to Russian.
              Keep formulas and Latin names intact. Maintain formal academic tone…
            </div>
          </Field>
        </div>
      </div>
    </div>
  );
}

function StageRow({ theme, stage, index, selected, status }) {
  const I = Icon[stage.icon];
  const isDone = status === 'done';
  const isActive = status === 'active';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      margin: '0 8px', padding: '5px 6px', borderRadius: 6,
      background: selected ? theme.chipBg : 'transparent',
      cursor: 'pointer',
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isActive ? theme.accent : isDone ? theme.success : theme.chipBg,
        color: isActive || isDone ? '#fff' : theme.textMute,
        fontSize: 9.5, fontWeight: 700, fontFamily: FONT_MONO,
      }}>
        {isDone ? <Icon.Check size={10}/> : index+1}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: theme.text }}>{stage.name}</div>
        <div style={{ fontSize: 10, color: theme.textMute, fontFamily: FONT_MONO,
          overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          {isDone && {0:'14.2s · ok', 1:'2m 08s · ok'}[index]}
          {isActive && `64% · ETA 02:14`}
          {!isDone && !isActive && 'queued'}
        </div>
      </div>
      {isActive && <Spinner color={theme.accent}/>}
    </div>
  );
}

// ─── Main column header ─────────────────────────────────────────
function TimelineHeader({ theme }) {
  const pct = Math.round(RUN.overall*100);
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        marginBottom: 10,
      }}>
        <div>
          <div style={{ fontSize: 10.5, color: theme.textMute, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>
            Pipeline Run · #421
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: theme.text, letterSpacing: -0.3, marginTop: 2 }}>
            Transcribe & translate to Russian
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '4px 10px', borderRadius: 999,
          background: theme.accentSoft, color: theme.accent,
          fontSize: 11, fontWeight: 600,
        }}>
          <Spinner color={theme.accent}/>
          Running · {pct}%
        </div>
      </div>

      {/* Overall progress bar */}
      <div style={{ height: 4, borderRadius: 2, background: theme.chipBg, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: theme.accent, borderRadius: 2,
          backgroundImage: `linear-gradient(90deg, ${theme.accent}, ${theme.accent})` }}/>
      </div>
      {/* Stage tick marks */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6,
        fontSize: 10, fontFamily: FONT_MONO, color: theme.textFaint }}>
        <span>00:00</span><span>25%</span><span>50%</span><span>75%</span><span>{RUN.duration}</span>
      </div>
    </div>
  );
}

// ─── Vertical timeline ──────────────────────────────────────────
function Timeline({ theme, stageStatus }) {
  return (
    <div style={{ position: 'relative', paddingLeft: 24 }}>
      {/* Vertical rail */}
      <div style={{
        position: 'absolute', left: 11, top: 12, bottom: 16, width: 2,
        background: theme.chipBg,
      }}>
        {/* progress fill: through done stages + half of active */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: '100%',
          height: '55%', background: theme.success,
          backgroundImage: `linear-gradient(to bottom, ${theme.success} 0%, ${theme.success} 70%, ${theme.accent} 70%, ${theme.accent} 100%)`,
        }}/>
      </div>

      {STAGES.map((s, i) => {
        const status = stageStatus(i);
        const expanded = i === 2; // current selected = active = expanded with preview
        return (
          <TimelineNode key={s.id} theme={theme} stage={s} index={i} status={status} expanded={expanded}/>
        );
      })}
    </div>
  );
}

function TimelineNode({ theme, stage, index, status, expanded }) {
  const I = Icon[stage.icon];
  const isActive = status === 'active';
  const isDone = status === 'done';

  return (
    <div style={{ position: 'relative', marginBottom: 16, marginLeft: -24 }}>
      {/* Node dot */}
      <div style={{
        position: 'absolute', left: 0, top: 8,
        width: 24, height: 24, borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background:
          isDone ? theme.success :
          isActive ? theme.accent :
          theme.panel,
        border: `1.5px solid ${
          isDone ? theme.success :
          isActive ? theme.accent :
          theme.hairline}`,
        color: isDone||isActive ? '#fff' : theme.textMute,
        boxShadow: isActive ? `0 0 0 5px ${theme.accentSoft}` : 'none',
        zIndex: 1,
      }}>
        {isDone ? <Icon.Check size={11}/> :
         isActive ? <Spinner color="#fff"/> :
         <span style={{ fontSize: 10.5, fontWeight: 700, fontFamily: FONT_MONO }}>{index+1}</span>}
      </div>

      {/* Card */}
      <div style={{
        marginLeft: 40,
        background: theme.panel,
        border: `0.5px solid ${isActive ? theme.accent : theme.hairline}`,
        borderRadius: 8,
        padding: '12px 14px',
        boxShadow: isActive
          ? `0 6px 18px ${theme.name==='dark'?'rgba(0,0,0,0.35)':'rgba(0,0,0,0.06)'}`
          : 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{stage.name}</span>
              <span style={{ fontSize: 10.5, color: theme.textMute, fontFamily: FONT_MONO }}>{stage.sub}</span>
            </div>
            {isActive && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                <div style={{ flex: 1, height: 3, borderRadius: 2, background: theme.chipBg, overflow: 'hidden' }}>
                  <div style={{ width: `${Math.round(RUN.progress*100)}%`, height: '100%', background: theme.accent, borderRadius: 2,
                    backgroundImage: `repeating-linear-gradient(45deg, ${theme.accent}, ${theme.accent} 4px, rgba(255,255,255,0.18) 4px, rgba(255,255,255,0.18) 8px)`,
                    backgroundSize: '8px 8px',
                    animation: 'stripe 800ms linear infinite',
                  }}/>
                </div>
                <span style={{ fontSize: 10.5, fontFamily: FONT_MONO, color: theme.accent, fontWeight: 600 }}>{Math.round(RUN.progress*100)}%</span>
              </div>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color:
              isDone ? theme.success : isActive ? theme.accent : theme.textFaint,
              letterSpacing: 0.4, textTransform: 'uppercase',
            }}>
              {isDone && 'Done'}{isActive && 'Running'}{status==='idle' && 'Queued'}
            </div>
            <div style={{ fontSize: 10, color: theme.textFaint, fontFamily: FONT_MONO, marginTop: 2 }}>
              {isDone && {0:'14.2 s', 1:'2m 08 s'}[index]}
              {isActive && 'ETA 02:14'}
              {status==='idle' && '—'}
            </div>
          </div>
        </div>

        {expanded && isActive && <ActivePreview theme={theme}/>}
        {isDone && <DoneSummary theme={theme} index={index}/>}
      </div>
    </div>
  );
}

// Expanded preview for the running stage (Translate).
function ActivePreview({ theme }) {
  const pairs = [
    ['en', 'Now consider what happens to a particle when no one is observing it.'],
    ['ru', 'Теперь рассмотрим, что происходит с частицей, когда за ней никто не наблюдает.'],
    ['en', 'In the Copenhagen interpretation, the wave function describes a real superposition.'],
    ['ru', 'В копенгагенской интерпретации волновая функция описывает реальную суперпозицию.'],
    ['en', '— translating —'],
  ];
  return (
    <div style={{
      marginTop: 10, padding: 10,
      background: theme.panelMute, borderRadius: 6,
      border: `0.5px solid ${theme.hairlineFaint}`,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 6,
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', color: theme.textMute }}>
          Live preview
        </span>
        <span style={{ fontSize: 10, color: theme.textFaint, fontFamily: FONT_MONO }}>
          820 / 1280 lines · 64%
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr', columnGap: 10, rowGap: 4 }}>
        {pairs.map(([lang, text], i) => (
          <React.Fragment key={i}>
            <span style={{
              fontSize: 9.5, fontWeight: 700, color:
                lang==='ru' ? theme.accent : theme.textFaint,
              fontFamily: FONT_MONO, textTransform: 'uppercase',
              alignSelf: 'baseline',
            }}>{lang==='—translating—'?'':lang}</span>
            <span style={{
              fontSize: 11.5, color: text.startsWith('—') ? theme.textFaint : theme.text,
              fontStyle: text.startsWith('—') ? 'italic' : 'normal',
            }}>
              {text}
              {text.startsWith('—') && <span style={{ marginLeft: 6, animation: 'blink 1s steps(2) infinite' }}>▍</span>}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function DoneSummary({ theme, index }) {
  const items = {
    0: [
      ['Format', 'pcm_s16le · 16 kHz · mono'],
      ['Output', '/tmp/sxt-9af2/audio.wav'],
      ['Size', '133.4 MB'],
    ],
    1: [
      ['Model', 'whisper large-v3 (Metal)'],
      ['Language', 'en (prob 0.998)'],
      ['Segments', '1,280 · 12,847 words'],
    ],
  }[index];
  if (!items) return null;
  return (
    <div style={{
      marginTop: 10, padding: '8px 10px',
      background: theme.successSoft, borderRadius: 6,
      display: 'flex', flexWrap: 'wrap', gap: 14,
    }}>
      {items.map(([k, v]) => (
        <div key={k} style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 9.5, color: theme.textMute, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: 0.3 }}>{k}</span>
          <span style={{ fontSize: 11, color: theme.text, fontFamily: FONT_MONO }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { VariationB });
