// Illustration for the "Cleano Photo Report" - the site's differentiator,
// called out on Home and About. A clipboard/report with a check and a
// photo thumbnail, standing in for a real report screenshot.
export default function ReportScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 320"
      className={className}
      role="img"
      aria-label="Illustration of a Cleano photo report with before-and-after photos and a completed checklist"
    >
      <defs>
        <linearGradient id="report-blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-light)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="report-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand)" />
          <stop offset="100%" stopColor="var(--color-brand-dark)" />
        </linearGradient>
      </defs>

      <circle cx="280" cy="70" r="90" fill="url(#report-blob)" />
      <circle cx="60" cy="260" r="70" fill="url(#report-blob)" />

      {/* clipboard */}
      <rect x="70" y="40" width="200" height="250" rx="14" fill="white" stroke="var(--color-brand-dark)" strokeWidth="3" />
      <rect x="130" y="26" width="80" height="28" rx="8" fill="url(#report-accent)" />

      {/* photo thumbnail */}
      <rect x="92" y="76" width="156" height="90" rx="8" fill="var(--color-brand-light)" fillOpacity="0.2" stroke="var(--color-brand)" strokeWidth="2" />
      <path d="M104 150l32-32 24 22 20-18 24 28" fill="none" stroke="var(--color-brand-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="118" cy="96" r="8" fill="var(--color-brand)" />

      {/* checklist lines */}
      {[188, 214, 240].map((y) => (
        <g key={y}>
          <circle cx="104" cy={y} r="8" fill="var(--color-brand)" />
          <path d={`M100 ${y}l3 3 6-7`} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="122" y={y - 3} width="106" height="6" rx="3" fill="var(--color-brand-dark)" opacity="0.15" />
        </g>
      ))}

      {/* seal */}
      <g transform="translate(292,238)">
        <circle r="30" fill="white" stroke="var(--color-brand)" strokeWidth="3" />
        <path d="M-11 1l8 8 15-17" fill="none" stroke="var(--color-brand-dark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
