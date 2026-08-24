import type { Metadata } from "next";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";

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
          <PhotoPlaceholder label="Cleano Photo Report example" aspect="aspect-[4/3]" />
        </div>
      </section>

      <section className="bg-muted-bg py-14">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:grid-cols-3 sm:px-6">
          <PhotoPlaceholder label="Cleano vehicle" aspect="aspect-square" />
          <PhotoPlaceholder label="Cleano equipment" aspect="aspect-square" />
          <PhotoPlaceholder label="Cleano team" aspect="aspect-square" />
        </div>
      </section>
    </>
  );
}
