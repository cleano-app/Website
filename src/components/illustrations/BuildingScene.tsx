// Illustration of a commercial building, paired with HeroScene's house for
// the Residential/Commercial split section.
export default function BuildingScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 270"
      className={className}
      role="img"
      aria-label="Illustration of a commercial building exterior"
    >
      <defs>
        <linearGradient id="bld-blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-light)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="bld-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand)" />
          <stop offset="100%" stopColor="var(--color-brand-dark)" />
        </linearGradient>
      </defs>

      <circle cx="380" cy="60" r="100" fill="url(#bld-blob)" />
      <circle cx="60" cy="220" r="70" fill="url(#bld-blob)" />

      {/* building */}
      <rect x="150" y="50" width="180" height="190" rx="4" fill="white" stroke="var(--color-brand-dark)" strokeWidth="3" />
      <rect x="150" y="50" width="180" height="14" fill="url(#bld-accent)" />

      {/* window grid */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={172 + col * 50}
            y={86 + row * 36}
            width="34"
            height="24"
            rx="2"
            fill="var(--color-brand-light)"
            fillOpacity="0.25"
            stroke="var(--color-brand-dark)"
            strokeWidth="2"
          />
        ))
      )}

      {/* entrance */}
      <rect x="220" y="200" width="40" height="40" fill="var(--color-brand-light)" fillOpacity="0.3" stroke="var(--color-brand-dark)" strokeWidth="2.5" />

      {/* smaller flanking building for depth */}
      <rect x="90" y="120" width="60" height="120" fill="white" stroke="var(--color-brand-dark)" strokeWidth="2.5" opacity="0.85" />
      <rect x="330" y="90" width="70" height="150" fill="white" stroke="var(--color-brand-dark)" strokeWidth="2.5" opacity="0.85" />

      {/* clean seal */}
      <g transform="translate(400,220)">
        <circle r="32" fill="white" stroke="var(--color-brand)" strokeWidth="3" />
        <path d="M-12 1l8 8 16-18" fill="none" stroke="var(--color-brand-dark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
