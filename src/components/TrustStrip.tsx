const items: { label: string; icon: React.ReactNode }[] = [
  {
    label: "Fully Insured",
    icon: <path d="M12 3l8 3v6c0 4.5-3.2 8.2-8 9-4.8-.8-8-4.5-8-9V6l8-3Z" />,
  },
  {
    label: "VAT Registered",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6M9 13h6M9 17h3" />
      </>
    ),
  },
  {
    label: "Professional Equipment",
    icon: <path d="M14.7 6.3a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4L9.4 17.6a2 2 0 0 1-.9.5l-3 .8.8-3a2 2 0 0 1 .5-.9l8.9-8.7ZM13 8l3 3" />,
  },
  {
    label: "Photo Reports",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M8 6l1.5-2.5h5L16 6" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
  },
];

export default function TrustStrip() {
  return (
    <div className="border-y border-border-subtle bg-muted-bg">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 text-sm font-medium text-brand-dark sm:px-6">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {item.icon}
            </svg>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
