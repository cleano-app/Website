import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Cleano",
  description: "Who Cleano is, the Cleano Standard, and why every job comes with a Photo Report.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-muted-bg">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            About Cleano
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Who We Are</h2>
        <p className="mt-4 text-foreground/70">
          Cleano is a professional exterior cleaning company serving homes and businesses across
          London and the surrounding areas - gutter cleaning, window cleaning, pressure washing,
          bin cleaning and scheduled commercial cleaning. We built Cleano around one idea:
          cleaning should be done properly, by a professional team, with the equipment to do it
          right.
        </p>
      </section>

      <section className="bg-muted-bg py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">The Cleano Standard</h2>
          <p className="mt-4 text-foreground/70">
            Every Cleano job follows the same standard, whether it&apos;s a single household gutter
            clean or a scheduled contract across multiple commercial sites: a uniformed team,
            professional equipment, full insurance, clear communication before and after the job,
            and photo evidence of the work completed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Photo Reports</h2>
            <p className="mt-4 text-foreground/70">
              Every Cleano job ends with a Photo Report - before-and-after photos of the work,
              sent straight to you. It&apos;s proof the job was actually done, not just a tick on
              an invoice, and it&apos;s especially valued by landlords and property managers who
              need evidence that scheduled maintenance happened.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border-subtle shadow-lg shadow-foreground/5">
            <Image
              src="/images/photo-report.png"
              alt="Example Cleano Photo Report on a phone screen, showing before and after photos of a completed job"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted-bg py-14">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:grid-cols-3 sm:px-6">
          {[
            {
              src: "/images/about-van.png",
              alt: "Cleano branded van parked on a residential London street",
            },
            {
              src: "/images/about-equipment.png",
              alt: "Cleano professional cleaning equipment laid out and ready for a job",
            },
            {
              src: "/images/about-team.png",
              alt: "Uniformed Cleano team members outside a London property",
            },
          ].map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border-subtle shadow-sm"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
