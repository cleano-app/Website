import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { heroSlides } from "@/lib/content/photos";
import { siteConfig, telHref, whatsappHref } from "@/lib/siteConfig";
import { btn, PhoneIcon, WhatsAppIcon } from "../site/ui";

// The homepage hero: real photographs of the work - gutters, pressure
// washing, roofs, windows - changing slowly behind the headline, on a dark
// green shade that keeps the text readable on every one. All CSS (see
// .hero-slide in globals.css): no JavaScript, and a still first photo for
// anyone who has asked for reduced motion.
//
// The big line says what we do (for visitors and for Google); the slogan
// sits above it. Phones get a shorter line and one button - Call is already
// in the header and the bottom bar - and the hero is never taller than the
// screen left between the header and the bottom bar (8rem), so the headline
// and the quote button are always on the first screen.

const STEP = 7; // seconds per photo - must match the keyframes in globals.css
const FADE = 1.6;

// Start each slide STEP seconds after the last; the first is already in
// view when the page opens.
const delay = (i: number) => `${i * STEP - FADE}s`;

export default function HeroSlideshow() {
  return (
    <section className="hero-home relative flex min-h-[min(600px,calc(100svh-8rem))] items-end overflow-hidden bg-[#0b2a20] pt-20 pb-10 text-white sm:min-h-0 sm:h-[600px] sm:items-center sm:pt-0 sm:pb-0">
      {heroSlides.map((slide, i) => (
        <div
          key={slide.src}
          className="hero-slide absolute inset-0"
          style={{ animationDelay: delay(i), "--pos": slide.position, "--pos-sm": slide.phonePosition } as CSSProperties}
        >
          <Image
            src={slide.src}
            alt={i === 0 ? slide.alt : ""}
            fill
            sizes="100vw"
            preload={i === 0}
            className="object-cover [object-position:var(--pos-sm)] sm:[object-position:var(--pos)]"
          />
        </div>
      ))}
      <div
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,32,24,.94)_0%,rgba(8,32,24,.78)_40%,rgba(8,32,24,.1)_70%,rgba(8,32,24,0)_100%)] sm:bg-[linear-gradient(90deg,rgba(8,32,24,.86)_0%,rgba(8,32,24,.6)_45%,rgba(8,32,24,.08)_80%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="text-[15px] font-bold text-brand-light">{siteConfig.tagline}</p>
        <h1 className="hero-title mt-2.5 max-w-[640px] text-[29px] leading-[1.1] font-bold sm:text-[50px] sm:leading-[1.06]">
          Exterior cleaning for homes and businesses,{" "}
          <span className="relative inline-block text-brand-light">
            done properly.
            <span className="absolute inset-x-0 bottom-[0.04em] -z-0 h-[0.12em] rounded-full bg-brand-light/45" aria-hidden="true" />
          </span>
        </h1>
        <p className="hero-lead mt-3 max-w-[520px] text-[15px] leading-relaxed text-[#e2efe9] sm:mt-4 sm:text-lg">
          <span className="sm:hidden">Gutters, roofs, windows, driveways, bins and graffiti across London. A photo report after every job.</span>
          <span className="hidden sm:inline">
            Gutters, roofs, windows, driveways, bins and graffiti across London and the surrounding areas. Fully insured, CHAS
            accredited, and a photo report after every job.
          </span>
        </p>
        <div className="hero-ctas mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row">
          <Link href="/quote" className={btn.solidOnDark}>
            Get a Free Quote
          </Link>
          <a href={telHref()} className={btn.lineOnDark.replace("inline-flex", "hidden sm:inline-flex")}>
            <PhoneIcon />
            Call {siteConfig.phoneDisplay}
          </a>
          <p className="text-center text-sm text-[#d7ebe3] sm:hidden">
            or call{" "}
            <a href={telHref()} className="font-bold text-white">
              {siteConfig.phoneDisplay}
            </a>
            {" · "}
            <a
              href={whatsappHref("Hi Cleano, I'd like a quote for...", "/")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 align-middle font-bold text-white"
            >
              <span className="text-[#25D366]">
                <WhatsAppIcon size={16} />
              </span>
              WhatsApp
            </a>
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 motion-reduce:hidden sm:bottom-6" aria-hidden="true">
        {heroSlides.map((slide, i) => (
          <span key={slide.src} className="hero-bar relative h-1 w-[22px] overflow-hidden rounded-sm bg-white/35 sm:w-7" style={{ animationDelay: delay(i) }} />
        ))}
      </div>
    </section>
  );
}
