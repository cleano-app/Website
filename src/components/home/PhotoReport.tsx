import Image from "next/image";
import { reportScreenshot } from "@/lib/content/photos";
import { Framed, SectionHeading, TickList } from "../site/ui";

// Every job ends with a Cleano photo report - shown with a real report
// from the Ops app.
export default function PhotoReport() {
  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-7 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading
            eyebrow="The Cleano photo report"
            title="Proof of every job, by email"
            sub="Every job ends with a report: before and after photos, what we found and what we did. Landlords and managing agents use it as evidence that maintenance was carried out."
          />
          <TickList
            className="mt-5"
            items={[
              "Before and after photos of the work",
              "Drone photos of roofs and gutters where useful",
              "Anything we noticed that needs attention",
              "Sent straight to your inbox, yours to keep",
            ]}
          />
        </div>
        <Framed>
          <Image
            src={reportScreenshot.src}
            alt={reportScreenshot.alt}
            width={reportScreenshot.width}
            height={reportScreenshot.height}
            sizes="(min-width: 1024px) 540px, 100vw"
            className="block h-auto w-full"
          />
        </Framed>
      </div>
    </section>
  );
}
