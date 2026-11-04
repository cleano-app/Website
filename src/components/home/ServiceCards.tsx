import Image from "next/image";
import Link from "next/link";
import { getServiceBySlug } from "@/lib/content/services";
import { servicePhotos } from "@/lib/content/photos";
import { SectionHeading } from "../site/ui";

// The six services as photo cards. On a computer: photo, name, one line
// and a link. On a phone the line and the link go - two small tiles to a
// row, name only, the whole tile the link - so the section stays short.

const order = ["gutter-cleaning", "rooftop-cleaning", "window-cleaning", "pressure-washing", "bin-cleaning", "graffiti-removal"];

export default function ServiceCards() {
  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our services"
          title="What we clean"
          sub="Six services, one standard: a careful job, a tidy site and a photo report when we finish."
        />
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:mt-7 sm:grid-cols-3 sm:gap-5">
          {order.map((slug) => {
            const service = getServiceBySlug(slug)!;
            const photo = servicePhotos[slug].card;
            return (
              <li key={slug}>
                <Link
                  href={`/${slug}`}
                  className="group block h-full overflow-hidden rounded-[12px] border border-border-subtle bg-white transition-shadow hover:shadow-[0_18px_40px_-26px_rgba(15,40,30,.5)] sm:rounded-[14px]"
                >
                  <div className="relative aspect-[4/3] sm:aspect-auto sm:h-[190px]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 640px) 360px, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      style={{ objectPosition: photo.position }}
                    />
                  </div>
                  <div className="px-3 py-2.5 sm:px-[18px] sm:pt-4 sm:pb-[18px]">
                    <h3 className="text-[15px] leading-tight font-bold text-foreground sm:text-lg">{service.name}</h3>
                    <p className="mt-1.5 hidden text-sm leading-snug text-foreground/65 sm:block">{service.cardBlurb}</p>
                    <span className="mt-3 hidden text-sm font-bold text-brand-dark sm:block">{service.name} &rarr;</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
