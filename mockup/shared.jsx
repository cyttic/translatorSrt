// Shared design tokens, window chrome, icons, and reusable bits.
// Used by both variation A (horizontal pipeline) and variation B (vertical timeline).

const FONT_UI = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", system-ui, sans-serif';
const FONT_MONO = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace';

// macOS-flavored theme tokens
const themes = {
  light: {
    name: 'light',
    bg: '#ececef',
    panel: '#ffffff',
    panelMute: '#f5f5f7',
    sidebar: 'rgba(246,246,247,0.85)',
    titlebar: 'rgba(236,236,239,0.85)',
    terminal: '#1c1c1e',
    terminalText: '#e8e8ea',
    text: '#1d1d1f',
    textMute: 'rgba(60,60,67,0.6)',
    textFaint: 'rgba(60,60,67,0.35)',
    hairline: 'rgba(0,0,0,0.10)',
    hairlineFaint: 'rgba(0,0,0,0.06)',
    fieldBg: '#ffffff',
    fieldBorder: 'rgba(0,0,0,0.12)',
    chipBg: 'rgba(0,0,0,0.05)',
    accent: '#0066cc',
    accentSoft: 'rgba(0,102,204,0.12)',
    success: '#28a745',
    successSoft: 'rgba(40,167,69,0.12)',
    warn: '#f0a020',
    error: '#d73a49',
    pipeIdle: 'rgba(0,0,0,0.12)',
    pipeActive: '#0066cc',
    pipeDone: '#28a745',
  },
  dark: {
    name: 'dark',
    bg: '#1c1c1e',
    panel: '#252527',
    panelMute: '#1f1f21',
    sidebar: 'rgba(38,38,42,0.85)',
    titlebar: 'rgba(40,40,44,0.85)',
    terminal: '#0e0e10',
    terminalText: '#d4d4d6',
    text: '#f5f5f7',
    textMute: 'rgba(235,235,245,0.55)',
    textFaint: 'rgba(235,235,245,0.3)',
    hairline: 'rgba(255,255,255,0.08)',
    hairlineFaint: 'rgba(255,255,255,0.05)',
    fieldBg: '#2c2c2e',
    fieldBorder: 'rgba(255,255,255,0.10)',
    chipBg: 'rgba(255,255,255,0.06)',
    accent: '#0a84ff',
    accentSoft: 'rgba(10,132,255,0.18)',
    success: '#30d158',
    successSoft: 'rgba(48,209,88,0.16)',
    warn: '#ffd60a',
    error: '#ff453a',
    pipeIdle: 'rgba(255,255,255,0.12)',
    pipeActive: '#0a84ff',
    pipeDone: '#30d158',
  },
};

// Traffic lights (clickable look only).
function TrafficLights() {
  const dot = (bg) => (
    <div style={{
      width: 12, height: 12, borderRadius: '50%', background: bg,
      boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.18)',
    }} />
  );
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {dot('#ff5f57')}{dot('#febc2e')}{dot('#28c840')}
    </div>
  );
}

// Inline SF-style line icons. Mono, 1.5px stroke.
const Icon = {
  Video: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="3.5" width="10" height="9" rx="1.5"/>
      <path d="M11.5 7l3-2v6l-3-2z"/>
    </svg>
  ),
  Audio: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6v4M5.5 4v8M8 5.5v5M10.5 3v10M13 6v4"/>
    </svg>
  ),
  Text: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4h10M8 4v9M5.5 13h5"/>
    </svg>
  ),
  Translate: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6M5 3v1.5c0 2-1 4-3 5M3 5c0 1.5 1.5 3.2 4 4M9 13l3-7 3 7M10 11h4"/>
    </svg>
  ),
  Mux: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="2.5" width="9" height="6" rx="1"/>
      <rect x="5.5" y="7.5" width="9" height="6" rx="1"/>
    </svg>
  ),
  Play: (p) => (
    <svg width={p.size||12} height={p.size||12} viewBox="0 0 12 12" fill="currentColor">
      <path d="M3 2l7 4-7 4z"/>
    </svg>
  ),
  Stop: (p) => (
    <svg width={p.size||10} height={p.size||10} viewBox="0 0 10 10" fill="currentColor">
      <rect x="1.5" y="1.5" width="7" height="7" rx="1"/>
    </svg>
  ),
  Check: (p) => (
    <svg width={p.size||12} height={p.size||12} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 6.5l2.5 2.5 4.5-5.5"/>
    </svg>
  ),
  Folder: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 4.5a1 1 0 0 1 1-1h3.2l1.3 1.5h6.5a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1z"/>
    </svg>
  ),
  Settings: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="2"/>
      <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4"/>
    </svg>
  ),
  Sun: (p) => (
    <svg width={p.size||13} height={p.size||13} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="8" cy="8" r="3"/>
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M2.8 2.8l1.1 1.1M12.1 12.1l1.1 1.1M2.8 13.2l1.1-1.1M12.1 3.9l1.1-1.1"/>
    </svg>
  ),
  Moon: (p) => (
    <svg width={p.size||13} height={p.size||13} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5z"/>
    </svg>
  ),
  Chevron: (p) => (
    <svg width={p.size||10} height={p.size||10} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2l3 3-3 3"/>
    </svg>
  ),
  Spark: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3M3.6 3.6l2 2M10.4 10.4l2 2M3.6 12.4l2-2M10.4 5.6l2-2"/>
    </svg>
  ),
};

// Canonical 4-stage pipeline.
const STAGES = [
  { id: 'extract',    name: 'Extract Audio',  sub: 'ffmpeg · demux',                icon: 'Audio' },
  { id: 'transcribe', name: 'Transcribe',     sub: 'whisper.cpp · large-v3',        icon: 'Text' },
  { id: 'translate',  name: 'Translate (AI)', sub: 'gpt-4o · target ru-RU',         icon: 'Translate' },
  { id: 'mux',        name: 'Mux Subtitles',  sub: 'ffmpeg · burn / softsub',       icon: 'Mux' },
];

// A demo run-state snapshot. Stage 2 is in-flight at 64%.
const RUN = {
  active: 2,         // index of running stage
  progress: 0.64,    // 0..1 of active stage
  overall: 0.41,     // 0..1 overall
  done: [0, 1],      // completed indices
  filename: 'lecture-04-quantum-mechanics.mp4',
  filesize: '482.6 MB',
  duration: '01:24:17',
  resolution: '1920×1080 · h.264',
  elapsed: '00:03:42',
  eta: '00:05:18',
};

// Window chrome wrapper. We render the macOS frame at fixed pixel size and
// let the design canvas scale it.
function MacWindow({ theme, width = 1280, height = 820, title, children }) {
  return (
    <div style={{
      width, height, borderRadius: 12, overflow: 'hidden',
      background: theme.bg, color: theme.text, fontFamily: FONT_UI,
      boxShadow: `0 0 0 0.5px ${theme.name==='dark'?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.18)'}, 0 24px 60px rgba(0,0,0,${theme.name==='dark'?0.55:0.22})`,
      display: 'flex', flexDirection: 'column',
      fontSize: 12, fontFeatureSettings: '"cv11","ss01"',
    }}>
      {/* Titlebar */}
      <div style={{
        height: 38, flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px',
        background: theme.titlebar,
        borderBottom: `0.5px solid ${theme.hairline}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}>
        <TrafficLights />
        <div style={{ flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 600, color: theme.text, letterSpacing: 0.1 }}>
          {title}
        </div>
        <div style={{ width: 52 }} />
      </div>
      {children}
    </div>
  );
}

// Reusable sidebar row: collapsible section header.
function Disclosure({ theme, label, open=true, badge, children }) {
  const [isOpen, setOpen] = React.useState(open);
  return (
    <div style={{ borderBottom: `0.5px solid ${theme.hairlineFaint}` }}>
      <button onClick={()=>setOpen(o=>!o)} style={{
        all: 'unset', display: 'flex', alignItems: 'center', gap: 6,
        width: '100%', boxSizing: 'border-box',
        padding: '8px 14px', cursor: 'pointer',
        fontSize: 11, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase',
        color: theme.textMute,
      }}>
        <span style={{ display:'inline-flex', transform: isOpen?'rotate(90deg)':'rotate(0deg)', transition: 'transform .15s', color: theme.textFaint }}>
          <Icon.Chevron size={9}/>
        </span>
        <span style={{ flex: 1 }}>{label}</span>
        {badge && <span style={{
          fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 4,
          background: theme.chipBg, color: theme.textMute, letterSpacing: 0,
          textTransform: 'none',
        }}>{badge}</span>}
      </button>
      {isOpen && <div style={{ padding: '2px 14px 12px' }}>{children}</div>}
    </div>
  );
}

// Form controls — compact, macOS-styled.
function Field({ theme, label, children, hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
      <div style={{ fontSize: 10.5, color: theme.textMute, fontWeight: 500, letterSpacing: 0.1 }}>{label}</div>
      {children}
      {hint && <div style={{ fontSize: 10, color: theme.textFaint }}>{hint}</div>}
    </div>
  );
}

function Select({ theme, value, options=[] }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 24, padding: '0 8px',
      background: theme.fieldBg, border: `0.5px solid ${theme.fieldBorder}`,
      borderRadius: 5, fontSize: 11.5, color: theme.text,
      boxShadow: theme.name==='dark' ? 'inset 0 -0.5px 0 rgba(255,255,255,0.04)' : 'inset 0 -0.5px 0 rgba(0,0,0,0.04)',
    }}>
      <span>{value}</span>
      <span style={{ display:'inline-flex', flexDirection:'column', gap: 1, color: theme.textMute }}>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 3.5L4 1l2.5 2.5"/></svg>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 1.5L4 4l2.5-2.5"/></svg>
      </span>
    </div>
  );
}

function TextInput({ theme, value, placeholder, mono=false }) {
  return (
    <div style={{
      height: 24, padding: '0 8px',
      background: theme.fieldBg, border: `0.5px solid ${theme.fieldBorder}`,
      borderRadius: 5, fontSize: 11.5, color: value? theme.text : theme.textFaint,
      fontFamily: mono ? FONT_MONO : FONT_UI,
      display: 'flex', alignItems: 'center',
    }}>{value || placeholder}</div>
  );
}

function Toggle({ theme, on=true }) {
  return (
    <div style={{
      width: 28, height: 16, borderRadius: 8, padding: 1,
      background: on ? theme.accent : theme.chipBg,
      transition: 'background .15s',
      display: 'flex', alignItems: 'center',
      justifyContent: on ? 'flex-end' : 'flex-start',
      boxShadow: on ? 'none' : `inset 0 0 0 0.5px ${theme.fieldBorder}`,
    }}>
      <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 2px rgba(0,0,0,0.25)' }} />
    </div>
  );
}

function Row({ children, justify='space-between', gap=8, mt=6, align='center' }) {
  return (
    <div style={{
      display: 'flex', alignItems: align, justifyContent: justify, gap, marginTop: mt,
      fontSize: 11.5,
    }}>{children}</div>
  );
}

function Slider({ theme, value=0.5, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 20 }}>
      <div style={{ flex: 1, height: 3, borderRadius: 2, background: theme.chipBg, position: 'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width: `${value*100}%`, background: theme.accent, borderRadius: 2 }} />
        <div style={{ position:'absolute', left: `calc(${value*100}% - 6px)`, top: -4.5, width: 12, height: 12, borderRadius: '50%', background: '#fff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(0,0,0,0.15)' }} />
      </div>
      {label && <span style={{ fontSize: 10.5, color: theme.textMute, fontVariantNumeric: 'tabular-nums', minWidth: 28, textAlign: 'right' }}>{label}</span>}
    </div>
  );
}

// Push the chrome / globals onto window so variation files can use them.
Object.assign(window, {
  FONT_UI, FONT_MONO, themes, TrafficLights, Icon,
  STAGES, RUN, MacWindow, Disclosure, Field, Select,
  TextInput, Toggle, Row, Slider,
});
