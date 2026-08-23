// A clearly-marked stand-in for real Cleano photography. The V1 build plan
// is explicit that stock photos should be avoided in favour of real job/
// team/vehicle photos - since none exist in this repo yet, this renders an
// obvious "replace me" placeholder instead of pretending with stock imagery.
// Swap these out for real <Image> components once photos are supplied
// (drop files in /public/images and point `src` at them).
export default function PhotoPlaceholder({
  label,
  className = "",
  aspect = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`${aspect} ${className} flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand/40 bg-muted-bg px-4 text-center`}
      role="img"
      aria-label={`Placeholder for photo: ${label}`}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-brand"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="8.5" cy="10" r="1.5" />
        <path d="M21 15l-5-5-9 9" />
      </svg>
      <span className="text-sm font-medium text-brand-dark">{label}</span>
      <span className="text-xs text-foreground/50">Real Cleano photo goes here</span>
    </div>
  );
}
