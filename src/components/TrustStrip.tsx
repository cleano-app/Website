const items = ["Fully Insured", "VAT Registered", "Professional Equipment", "Photo Reports"];

export default function TrustStrip() {
  return (
    <div className="border-y border-border-subtle bg-muted-bg">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4 text-sm font-medium text-brand-dark sm:px-6">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
