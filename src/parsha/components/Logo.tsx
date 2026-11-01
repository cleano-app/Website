/** Temporary Parsha Line mark: a sefer on its two rollers, its lines in rainbow colours. */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden>
      <rect width="64" height="64" rx="15" fill="#4757e6" />
      <rect x="17" y="15" width="30" height="34" rx="2" fill="#ffffff" />
      <g strokeWidth="3.4" strokeLinecap="round">
        <path d="M23,24 H41" stroke="#f0508f" />
        <path d="M23,31 H41" stroke="#ffc83d" />
        <path d="M23,38 H35" stroke="#2bb673" />
      </g>
      <g fill="#ffffff" stroke="#1f2340" strokeWidth="2.4">
        <rect x="9" y="11" width="10" height="42" rx="5" />
        <rect x="45" y="11" width="10" height="42" rx="5" />
      </g>
      <path d="M14,5 V11 M14,53 V59 M50,5 V11 M50,53 V59" stroke="#1f2340" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
