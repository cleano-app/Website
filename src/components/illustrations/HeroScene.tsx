// Custom illustration for the hero (and anywhere else a big "photo" was a
// placeholder box) - a clean house + gutter + shine scene in brand colors.
// Stands in for real photography until Cleano supplies real job photos.
export default function HeroScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 360"
      className={className}
      role="img"
      aria-label="Illustration of a house exterior being professionally cleaned"
    >
      <defs>
        <linearGradient id="hero-blob-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-light)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="hero-roof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-dark)" />
          <stop offset="100%" stopColor="var(--color-brand)" />
        </linearGradient>
        <linearGradient id="hero-drop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-light)" />
          <stop offset="100%" stopColor="var(--color-brand)" />
        </linearGradient>
      </defs>

      {/* decorative background blobs */}
      <circle cx="360" cy="80" r="120" fill="url(#hero-blob-a)" />
      <circle cx="80" cy="290" r="90" fill="url(#hero-blob-a)" />

      {/* house */}
      <g>
        {/* body */}
        <rect x="120" y="180" width="220" height="130" rx="6" fill="white" stroke="var(--color-brand-dark)" strokeWidth="3" />
        {/* roof */}
        <path d="M100 180 L230 90 L360 180 Z" fill="white" stroke="var(--color-brand-dark)" strokeWidth="3" strokeLinejoin="round" />
        {/* gutter along roof edge, highlighted */}
        <path d="M104 181 L360 181" stroke="url(#hero-roof)" strokeWidth="7" strokeLinecap="round" />
        {/* door */}
        <rect x="212" y="240" width="36" height="70" rx="3" fill="var(--color-brand-light)" fillOpacity="0.3" stroke="var(--color-brand-dark)" strokeWidth="2.5" />
        {/* windows */}
        <rect x="148" y="205" width="40" height="34" rx="2" fill="var(--color-brand-light)" fillOpacity="0.25" stroke="var(--color-brand-dark)" strokeWidth="2.5" />
        <path d="M168 205v34M148 222h40" stroke="var(--color-brand-dark)" strokeWidth="2" />
        <rect x="272" y="205" width="40" height="34" rx="2" fill="var(--color-brand-light)" fillOpacity="0.25" stroke="var(--color-brand-dark)" strokeWidth="2.5" />
        <path d="M292 205v34M272 222h40" stroke="var(--color-brand-dark)" strokeWidth="2" />
      </g>

      {/* water droplets falling from the gutter, mid-clean */}
      <path d="M150 195c6 10 6 16 0 20 -6-4-6-10 0-20Z" fill="url(#hero-drop)" opacity="0.9" />
      <path d="M330 198c5 9 5 14 0 18 -5-4-5-9 0-18Z" fill="url(#hero-drop)" opacity="0.7" />

      {/* professional-clean seal */}
      <g transform="translate(372,246)">
        <circle r="34" fill="white" stroke="var(--color-brand)" strokeWidth="3" />
        <path d="M-13 1l9 9 17-19" fill="none" stroke="var(--color-brand-dark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* sparkle accents */}
      <g stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round">
        <path d="M60 120v16M52 128h16" />
        <path d="M400 150v12M394 156h12" />
      </g>
    </svg>
  );
}
