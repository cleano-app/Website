// Small "surface" illustrations used by BeforeAfterSlider - a schematic
// dirty vs. clean rendering per service type (texture + colour), since no
// real photography or image-generation is available in this environment.
type SceneType = "gutter" | "bin" | "window" | "pressure" | "graffiti" | "rooftop";
type SceneState = "before" | "after";

export default function DirtyCleanScene({
  type,
  state,
  className = "",
}: {
  type: SceneType;
  state: SceneState;
  className?: string;
}) {
  const dirty = state === "before";

  return (
    <svg viewBox="0 0 200 150" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`dcs-clean-${type}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-light)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill={dirty ? "#e7e2da" : `url(#dcs-clean-${type})`} />
      {renderScene(type, dirty)}
    </svg>
  );
}

function renderScene(type: SceneType, dirty: boolean) {
  const line = dirty ? "#8a7c63" : "var(--color-brand-dark)";
  const grime = "#a89572";

  switch (type) {
    case "gutter":
      return (
        <>
          <rect x="20" y="55" width="160" height="20" rx="4" fill="none" stroke={line} strokeWidth="3" />
          {dirty ? (
            <>
              {[32, 48, 64, 80, 96, 112, 128, 144, 160].map((x, i) => (
                <circle key={x} cx={x} cy={62 + (i % 2) * 6} r="5" fill={grime} opacity="0.8" />
              ))}
              <path d="M40 75c0 10 4 16 4 20" stroke="#7b8fae" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
            </>
          ) : (
            <>
              <path d="M30 63h140" stroke="var(--color-brand)" strokeWidth="2" opacity="0.5" />
              <circle cx="150" cy="70" r="3" fill="var(--color-brand)" />
            </>
          )}
        </>
      );
    case "bin":
      return (
        <>
          <path d="M75 40h50l-6 80a6 6 0 0 1-6 5H87a6 6 0 0 1-6-5l-6-80Z" fill="white" stroke={line} strokeWidth="3" />
          <rect x="72" y="32" width="56" height="10" rx="2" fill={dirty ? grime : "var(--color-brand)"} opacity={dirty ? 0.6 : 1} />
          {dirty ? (
            <>
              <path d="M85 60c6 4 4 12 10 14M110 65c-4 6 2 10-2 16M95 90c8 2 6 10 12 12" stroke={grime} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
              <circle cx="130" cy="55" r="2" fill="#5a5a3c" />
              <circle cx="136" cy="63" r="1.6" fill="#5a5a3c" />
            </>
          ) : (
            <path d="M84 55l10-10M84 90l24-24" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          )}
        </>
      );
    case "window":
      return (
        <>
          <rect x="45" y="25" width="110" height="100" rx="2" fill="white" stroke={line} strokeWidth="3" />
          <path d="M100 25v100M45 75h110" stroke={line} strokeWidth="2" />
          {dirty ? (
            <>
              <circle cx="75" cy="55" r="10" fill={grime} opacity="0.5" />
              <circle cx="125" cy="95" r="14" fill={grime} opacity="0.4" />
              <path d="M60 100c10 5 20 0 30 6" stroke={grime} strokeWidth="2" opacity="0.6" fill="none" />
            </>
          ) : (
            <path d="M55 115l90-90" stroke="white" strokeWidth="8" opacity="0.6" strokeLinecap="round" />
          )}
        </>
      );
    case "pressure":
      return (
        <>
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 5 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={20 + col * 33}
                y={20 + row * 30}
                width="30"
                height="27"
                fill="none"
                stroke={line}
                strokeWidth="1.5"
                opacity="0.7"
              />
            ))
          )}
          {dirty ? (
            <>
              <ellipse cx="70" cy="55" rx="22" ry="14" fill="#7a8f5e" opacity="0.5" />
              <ellipse cx="140" cy="90" rx="26" ry="16" fill="#6b6047" opacity="0.45" />
              <ellipse cx="50" cy="110" rx="18" ry="10" fill="#7a8f5e" opacity="0.4" />
            </>
          ) : (
            <path d="M20 130L180 30" stroke="white" strokeWidth="10" opacity="0.5" strokeLinecap="round" />
          )}
        </>
      );
    case "graffiti":
      return (
        <>
          {/* brick wall */}
          {[0, 1, 2, 3, 4].map((row) =>
            Array.from({ length: row % 2 === 0 ? 6 : 5 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={row % 2 === 0 ? col * 34 : 17 + col * 34}
                y={20 + row * 22}
                width="32"
                height="20"
                fill="none"
                stroke={line}
                strokeWidth="1.25"
                opacity="0.5"
              />
            ))
          )}
          {dirty ? (
            <>
              <path d="M35 45c10-15 25-10 20 5s-25 5-15-10" stroke="#c2554a" strokeWidth="3.5" fill="none" opacity="0.8" strokeLinecap="round" />
              <path d="M95 60c20-8 35 5 50-3" stroke="#4a7fc2" strokeWidth="4" fill="none" opacity="0.75" strokeLinecap="round" />
              <path d="M60 95c8 12 25 12 35-2" stroke="#c2a34a" strokeWidth="3.5" fill="none" opacity="0.75" strokeLinecap="round" />
              <path d="M130 100l20 20M150 100l-20 20" stroke="#4a7fc2" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
            </>
          ) : (
            <path d="M25 125L175 25" stroke="white" strokeWidth="8" opacity="0.5" strokeLinecap="round" />
          )}
        </>
      );
    case "rooftop":
      return (
        <>
          <path d="M20 110L100 20L180 110Z" fill="white" stroke={line} strokeWidth="3" />
          <path d="M100 20v90" stroke={line} strokeWidth="1.5" opacity="0.5" />
          <path d="M40 100l50-64M70 100l30-40M110 100l30-40M140 100l20-26" stroke={line} strokeWidth="1" opacity="0.35" />
          {dirty ? (
            <>
              <ellipse cx="65" cy="80" rx="18" ry="10" fill="#6b7f4a" opacity="0.55" />
              <ellipse cx="130" cy="70" rx="16" ry="9" fill="#7a8f5e" opacity="0.5" />
              <ellipse cx="95" cy="55" rx="12" ry="7" fill="#6b7f4a" opacity="0.45" />
            </>
          ) : (
            <path d="M35 100L145 35" stroke="white" strokeWidth="7" opacity="0.5" strokeLinecap="round" />
          )}
        </>
      );
  }
}
