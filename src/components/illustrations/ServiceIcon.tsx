// Hand-built line-art icons for each service, used instead of stock/AI
// photography (no image-gen or open internet access in this environment).
// Each renders inside a soft gradient badge in brand colors.

type ServiceIconType =
  | "gutter"
  | "bin"
  | "window"
  | "pressure"
  | "commercial";

const paths: Record<ServiceIconType, React.ReactNode> = {
  gutter: (
    <>
      <path d="M6 14h20" />
      <path d="M9 14v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
      <path d="M13 19v3M19 19v3" />
      <path d="M16 8l0 4" />
      <path d="M13 10l3-3 3 3" />
    </>
  ),
  bin: (
    <>
      <path d="M9 10v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V10" />
      <path d="M7 10h18" />
      <path d="M13 7h6l1 3H12l1-3Z" />
      <path d="M13.5 14.5v5M16 14.5v5M18.5 14.5v5" />
    </>
  ),
  window: (
    <>
      <rect x="7" y="6" width="18" height="20" rx="1.5" />
      <path d="M16 6v20M7 16h18" />
      <path d="M4 9l3-3M4 23l3 3M29 9l-3-3M29 23l-3 3" />
    </>
  ),
  pressure: (
    <>
      <path d="M9 22h9l4-9H9l-2 5" />
      <path d="M11 13V8a2 2 0 0 1 2-2h2" />
      <path d="M22 13l5 -1" />
      <path d="M9 22l-2 5M14 22l-1 5M19 22l-1 5" />
    </>
  ),
  commercial: (
    <>
      <path d="M7 26V9l7-3 7 3v17" />
      <path d="M7 26h14" />
      <path d="M11 13h2M11 17h2M17 13h2M17 17h2" />
      <path d="M13 26v-5h4v5" />
    </>
  ),
};

export default function ServiceIcon({
  type,
  className = "",
}: {
  type: ServiceIconType;
  className?: string;
}) {
  const gradId = `service-icon-grad-${type}`;
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-light/25 to-brand/15 ${className}`}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor="var(--color-brand)" />
            <stop offset="100%" stopColor="var(--color-brand-dark)" />
          </linearGradient>
        </defs>
        {paths[type]}
      </svg>
    </div>
  );
}
