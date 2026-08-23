import Link from "next/link";
import { siteConfig, telHref, whatsappHref } from "@/lib/siteConfig";

// Per the V1 build plan: mobile visitors should always have Call, WhatsApp
// and Get Quote within reach - a sticky bar rather than just a floating
// WhatsApp icon. Hidden on lg+ where the header already shows this.
export default function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border-subtle bg-background shadow-[0_-2px_10px_rgba(0,0,0,0.06)] lg:hidden">
      <a
        href={telHref()}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-foreground/80"
        aria-label={`Call ${siteConfig.phoneDisplay}`}
      >
        <PhoneIcon />
        <span className="text-[11px] font-medium">Call</span>
      </a>
      <a
        href={whatsappHref("Hi Cleano, I'd like a quote for...")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 border-x border-border-subtle py-2.5 text-foreground/80"
        aria-label="Message us on WhatsApp"
      >
        <WhatsAppIcon />
        <span className="text-[11px] font-medium">WhatsApp</span>
      </a>
      <Link
        href="/quote"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 bg-brand py-2.5 text-white"
      >
        <QuoteIcon />
        <span className="text-[11px] font-semibold">Get Quote</span>
      </Link>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.3.1.2 1.6 2.5 3.9 3.4.5.2.9.4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.5-.6 1.6-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M4 6h16M4 12h10M4 18h7" />
      <path d="M18 15l3 3-3 3" />
    </svg>
  );
}
