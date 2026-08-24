// PLACEHOLDER: no real accreditation/certification logos were supplied.
// These are empty badge slots, not real claims - swap each for a real
// certification logo (e.g. Checkatrade, TrustMark, SafeContractor, ICO
// registration) once Cleano has them, or remove this section entirely if
// not wanted.
const placeholderCerts = ["Certification", "Certification", "Certification", "Certification"];

export default function Certifications() {
  return (
    <section className="border-y border-border-subtle bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-foreground/40">
          Accreditations &amp; Certifications
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-6">
          {placeholderCerts.map((label, i) => (
            <div
              key={i}
              className="flex h-16 w-32 items-center justify-center rounded-xl border-2 border-dashed border-border-subtle text-xs text-foreground/35"
            >
              {label} logo
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
