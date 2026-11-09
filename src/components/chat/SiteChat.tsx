"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Turnstile from "../Turnstile";
import { WhatsAppIcon } from "../site/ui";
import { validateNewLead, type NewLeadInput } from "@/lib/leads";
import { portfolioPath } from "@/lib/portfolio";
import {
  inspectionBookingUrl,
  inspectionPromo,
  inspectionPromoRunning,
  mainNav,
  serviceAreas,
  siteConfig,
  whatsappHref,
} from "@/lib/siteConfig";

/**
 * The website chat - the public counterpart of the chat in the Cleano app
 * (the owner, 9 Nov 2026: "add the chat like inside the app"). Three ways
 * in, as in the app: quick buttons answered straight away (no AI), a typed
 * question answered by AI from the website's own content (/api/chat), and
 * "Message the office", which arrives as a lead in Ops with the usual
 * email. A person is always one tap away: the office, or WhatsApp.
 */

type ChatLink = { label: string; href: string };
type Msg = { id: string; from: "visitor" | "chat"; text: string; links?: ChatLink[]; offerOffice?: string };

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const newId = () => Math.random().toString(36).slice(2);

// The six services, by their short menu names (not the full services
// content, which would add its whole text to every visitor's download).
const serviceLinks = mainNav.filter((item) => !["/about", "/contact", portfolioPath].includes(item.href));

const QUICK = [
  { key: "price", label: "Get a price" },
  { key: "services", label: "Our services" },
  { key: "areas", label: "Areas we cover" },
  { key: "offer", label: "Free inspection" },
  { key: "office", label: "Message the office" },
] as const;

export default function SiteChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "hello", from: "chat", text: "Hi! Ask us anything about our services, or tap a button below." },
  ]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [office, setOffice] = useState<{ message: string } | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy, office]);

  // Escape closes the chat.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const say = (m: Omit<Msg, "id">) => setMsgs((prev) => [...prev, { ...m, id: newId() }]);
  const offerRunning = inspectionPromoRunning();

  function quick(key: (typeof QUICK)[number]["key"], label: string) {
    say({ from: "visitor", text: label });
    if (key === "price") {
      say({
        from: "chat",
        text: "The quickest way is our quote form - it takes under a minute, and a photo or two often means we can price it without a visit.",
        links: [{ label: "Get a free quote", href: "/quote" }],
      });
    } else if (key === "services") {
      say({
        from: "chat",
        text: "We clean gutters, roofs, windows, driveways and patios, wheelie bins, and remove graffiti - for homes and businesses. Every job ends with a photo report.",
        links: serviceLinks,
      });
    } else if (key === "areas") {
      say({
        from: "chat",
        text: `We cover London and the surrounding areas, including ${serviceAreas.join(", ")}. Tell us your postcode and we'll confirm.`,
        links: [{ label: "Get a free quote", href: "/quote" }],
      });
    } else if (key === "offer") {
      say({
        from: "chat",
        text: `For a limited time, we're checking gutters and downpipes by drone for free - for homes in ${inspectionPromo.area} only. You get the photos by email, with any blockage marked.`,
        links: [
          { label: "Book free inspection", href: inspectionBookingUrl() },
          { label: "See the offer", href: inspectionPromo.path },
        ],
      });
    } else {
      startOffice("");
    }
  }

  function startOffice(message: string) {
    setOffice({ message });
    say({ from: "chat", text: "Leave your details and message, and the office will get back to you." });
  }

  async function send() {
    const q = text.trim();
    if (!q || busy) return;
    setText("");
    say({ from: "visitor", text: q });
    setBusy(true);
    const history = msgs.filter((m) => m.id !== "hello").map((m) => ({ from: m.from, text: m.text }));
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history }),
      });
      const r = await res.json().catch(() => ({ error: "No signal - try again." }));
      if (r.offline) say({ from: "chat", text: "I can't answer typed questions right now - the office can.", offerOffice: q });
      else if (r.error) say({ from: "chat", text: r.error, offerOffice: q });
      else say({ from: "chat", text: r.reply, links: r.links, offerOffice: r.handoff ? q : undefined });
    } catch {
      say({ from: "chat", text: "No signal - try again, or message the office.", offerOffice: q });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Above the phone's bottom bar; on the offer page's computer view
          its floating Book button has the right corner, so the chat moves left. */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Chat with Cleano"
          className={`fixed right-4 bottom-[84px] z-40 flex h-14 items-center gap-2 rounded-full bg-brand-dark px-4 text-white shadow-[0_8px_24px_rgba(15,93,70,0.4)] transition active:scale-95 lg:bottom-6 ${pathname === inspectionPromo.path ? "lg:right-auto lg:left-6" : "lg:right-6"}`}
        >
          <ChatIcon />
          <span className="hidden text-sm font-bold sm:inline">Chat with us</span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Chat with Cleano"
          className="fixed inset-0 z-50 flex flex-col bg-white sm:inset-auto sm:right-6 sm:bottom-6 sm:h-[600px] sm:max-h-[calc(100dvh-48px)] sm:w-[380px] sm:overflow-hidden sm:rounded-[18px] sm:shadow-[0_16px_48px_rgba(15,40,30,0.3)]"
        >
          <div className="flex items-center gap-3 bg-brand-dark px-4 py-3 text-white" style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white">
              <Image src="/brand/cleano-icon.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[16px] font-bold">Cleano</span>
              <span className="block text-[12px] text-white/80">Questions about our services, any time</span>
            </span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/15">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-2.5 overflow-y-auto bg-muted-bg px-3 py-4" aria-live="polite">
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.from === "visitor" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] space-y-2 rounded-[16px] px-3.5 py-2.5 text-[14.5px] leading-snug ${
                    m.from === "visitor" ? "rounded-br-[6px] bg-brand-dark text-white" : "rounded-bl-[6px] border border-border-subtle bg-white text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  {!!m.links?.length && (
                    <div className="flex flex-wrap gap-1.5">
                      {m.links.map((l) =>
                        l.href.startsWith("http") ? (
                          <a key={l.href} href={l.href} className="rounded-full bg-[#e9f5ef] px-3 py-1 text-[13px] font-semibold text-brand-dark">
                            {l.label}
                          </a>
                        ) : (
                          <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-full bg-[#e9f5ef] px-3 py-1 text-[13px] font-semibold text-brand-dark">
                            {l.label}
                          </Link>
                        ),
                      )}
                    </div>
                  )}
                  {m.offerOffice && !office && (
                    <button type="button" onClick={() => startOffice(m.offerOffice!)} className="rounded-full bg-[#e9f5ef] px-3 py-1 text-[13px] font-semibold text-brand-dark">
                      Send to the office
                    </button>
                  )}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <span className="flex gap-1 rounded-[16px] rounded-bl-[6px] border border-border-subtle bg-white px-3.5 py-3" aria-label="Typing">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-foreground/30" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </span>
              </div>
            )}
            {office && (
              <OfficeForm
                initialMessage={office.message}
                sourcePage={`/chat${pathname === "/" ? "" : pathname}`}
                onCancel={() => setOffice(null)}
                onSent={() => {
                  setOffice(null);
                  say({ from: "chat", text: "Sent - thank you. The office will get back to you soon." });
                }}
              />
            )}
          </div>

          {!office && (
            <>
              <div className="flex gap-1.5 overflow-x-auto border-t border-border-subtle bg-white px-3 py-2 [scrollbar-width:none]">
                {QUICK.filter((q) => q.key !== "offer" || offerRunning).map((q) => (
                  <button
                    key={q.key}
                    type="button"
                    disabled={busy}
                    onClick={() => quick(q.key, q.label)}
                    className="shrink-0 rounded-full border border-[#cfd8d3] bg-white px-3 py-1.5 text-[13px] font-semibold text-foreground disabled:opacity-50"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void send();
                }}
                className="flex items-end gap-2 bg-white px-3 pt-1"
              >
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send();
                    }
                  }}
                  rows={1}
                  maxLength={1000}
                  placeholder="Ask a question"
                  aria-label="Your question"
                  className="max-h-28 min-h-11 flex-1 resize-none rounded-[22px] border border-[#cfd8d3] bg-muted-bg px-4 py-2.5 text-[16px] text-foreground placeholder:text-foreground/45 focus:border-brand-dark focus:outline-none"
                />
                <button type="submit" disabled={busy || !text.trim()} aria-label="Send" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-dark text-white disabled:opacity-40">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.99.99 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
                  </svg>
                </button>
              </form>
            </>
          )}

          <p className="bg-white px-4 pt-2 text-center text-[11.5px] leading-snug text-foreground/50" style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}>
            Typed questions are answered automatically from our website. For a person,{" "}
            <a href={whatsappHref("Hi Cleano, I have a question.", pathname)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 font-semibold text-brand-dark">
              <WhatsAppIcon size={12} /> WhatsApp us
            </a>{" "}
            or call {siteConfig.phoneDisplay}.
          </p>
        </div>
      )}
    </>
  );
}

/** "Message the office" - sent as a lead (service "other", the message as
 * its note), so it lands in Ops with the page it came from and the usual
 * office email. */
function OfficeForm({ initialMessage, sourcePage, onCancel, onSent }: { initialMessage: string; sourcePage: string; onCancel: () => void; onSent: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [website, setWebsite] = useState(""); // honeypot, as on the quote form
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function submit() {
    const payload: NewLeadInput = {
      name: name.trim(),
      phone: phone.trim(),
      postcode: postcode.trim(),
      service: "other",
      serviceOtherNote: `From the website chat: ${message.trim()}`.slice(0, 500),
      sourcePage,
      website,
      turnstileToken: token || undefined,
    };
    const invalid = validateNewLead(payload) ?? (message.trim() ? null : "Please write your message.");
    if (invalid) return setError(invalid);
    if (TURNSTILE_SITE_KEY && !token) return setError("Please complete the check above.");
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "That didn't send - please call or WhatsApp us instead.");
      }
      onSent();
    } catch (e) {
      setError(e instanceof Error ? e.message : "That didn't send - please call or WhatsApp us instead.");
    } finally {
      setSending(false);
    }
  }

  const field = "w-full rounded-[10px] border border-[#cfd8d3] bg-white px-3 py-2 text-[16px] text-foreground focus:border-brand-dark focus:outline-none";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      className="space-y-2 rounded-[14px] border border-border-subtle bg-white p-3"
    >
      <input className={field} placeholder="Your name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} aria-label="Your name" />
      <input className={field} placeholder="Mobile number" autoComplete="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} aria-label="Mobile number" />
      <input className={field} placeholder="Postcode" autoComplete="postal-code" value={postcode} onChange={(e) => setPostcode(e.target.value)} maxLength={10} aria-label="Postcode" />
      <textarea className={`${field} min-h-20 resize-none`} placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={470} aria-label="Your message" />
      <div aria-hidden="true" className="relative h-0 w-0 overflow-hidden">
        <label htmlFor="chat-website">Website</label>
        <input id="chat-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} onVerify={setToken} />}
      {error && <p className="text-[13px] text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button type="button" onClick={onCancel} className="rounded-[10px] border-[1.5px] border-[#cdd6d1] px-4 py-2 text-sm font-bold text-foreground/75">
          Back
        </button>
        <button type="submit" disabled={sending} className="flex-1 rounded-[10px] bg-brand-dark px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
          {sending ? "Sending…" : "Send to the office"}
        </button>
      </div>
      <p className="text-[11.5px] text-foreground/50">
        Landlord with several properties? See the <Link href={portfolioPath} className="font-semibold text-brand-dark">Portfolio Scheme</Link>.
      </p>
    </form>
  );
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8.4l-3.7 3.1A1 1 0 0 1 3 20.3V6a2 2 0 0 1 2-2Zm3 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    </svg>
  );
}
