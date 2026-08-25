import type { Metadata } from "next";
import Image from "next/image";
import FloatingButterflies from "@/components/motion/FloatingButterflies";

export const metadata: Metadata = {
  title: "About Cleano",
  description: "Who Cleano is, the Cleano Standard, and why every job comes with a Photo Report.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-grain relative overflow-hidden border-b border-border-subtle bg-gradient-to-br from-muted-bg via-muted-bg to-brand-light/15">
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-light/25 blur-3xl" />
        <FloatingButterflies
          flock={[
            { top: "16%", left: "10%", size: 20, duration: 9, delay: 0.2, xDrift: [0, 12, -6, 0], yDrift: [0, -12, 6, 0], rotate: [-8, 10, -4, -8], opacity: 0.5 },
            { top: "70%", left: "88%", size: 16, duration: 10, delay: 1, xDrift: [0, -8, 6, 0], yDrift: [0, 8, -6, 0], rotate: [8, -10, 6, 8], opacity: 0.4 },
          ]}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            About Cleano
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Who We Are</h2>
        <p className="mt-4 text-foreground/70">
          Cleano is a professional exterior cleaning company serving homes and businesses across
          London and the surrounding areas - gutter cleaning, rooftop cleaning, window cleaning,
          pressure washing, bin cleaning and graffiti removal. We built Cleano around one idea:
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
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-2xl border border-border-subtle shadow-sm">
              <Image
                src="/photos/report-example.jpg"
                alt="A real Cleano Field Service Report, showing the job details and checklist sent to customers after every job"
                width={1400}
                height={1044}
                className="h-auto w-full"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border-subtle shadow-sm">
              <Image
                src="/photos/report-photos-example.jpg"
                alt="Real before photos from a Cleano Field Service Report, plus an annotated defect photo flagging an issue for the customer"
                width={1400}
                height={931}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted-bg py-14">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:grid-cols-3 sm:px-6">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border-subtle shadow-sm">
            <Image
              src="/photos/cleano-vehicle.jpg"
              alt="A Cleano branded van, liveried with the Cleano logo and list of services"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border-subtle shadow-sm">
            <Image
              src="/photos/cleano-equipment.jpg"
              alt="Cleano's branded cleaning equipment - pressure washer, hose reels, chemicals and tools, laid out beside the van"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border-subtle shadow-sm">
            <Image
              src="/photos/cleano-team.jpg"
              alt="The Cleano team in branded uniforms, standing beside the Cleano van and equipment"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
