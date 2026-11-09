"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Turnstile from "../Turnstile";
import { WhatsAppIcon } from "../site/ui";
import { LEAD_LIMITS, PHONE_RE, POSTCODE_RE, validateNewLead, type NewLeadInput } from "@/lib/leads";
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
 * (the owner, 9 Nov 2026: "add the chat like inside the app"). It finds
 * answers; it never does anything on anyone's behalf. Quick buttons are
 * answered straight away (no AI), typed questions by AI from the website's
 * own content (/api/chat). A message for the office is written in the same
 * chat box, as in the app - no form: the chat asks for a name, number and
 * postcode one at a time (once per visit) and sends it as a lead, so it
 * lands in Ops with the usual office email.
 */

type ChatLink = { label: string; href: string };
type Msg = {
  id: string;
  from: "visitor" | "chat";
  text: string;
  links?: ChatLink[];
  /** A question it couldn't answer - offer to send it to the office. */
  offerOffice?: string;
  /** A message for the office that didn't send - offer to try again. */
  retry?: string;
  /** Part of a message to the office (name, number, postcode): never sent to the AI. */
  private?: boolean;
};
type Contact = { name?: string; phone?: string; postcode?: string };
type Step = "message" | "name" | "phone" | "postcode" | "check";

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

// What the chat box is for at each step of a message to the office.
const STEP_INPUT: Record<Step, { placeholder: string; label: string; autoComplete?: string; inputMode?: "tel" }> = {
  message: { placeholder: "Your message to the office", label: "Your message to the office" },
  name: { placeholder: "Your name", label: "Your name", autoComplete: "name" },
  phone: { placeholder: "Mobile number", label: "Mobile number", autoComplete: "tel", inputMode: "tel" },
  postcode: { placeholder: "Postcode", label: "Postcode", autoComplete: "postal-code" },
  check: { placeholder: "", label: "" },
};

export default function SiteChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "hello", from: "chat", text: "Hi! Ask us anything about our services, or tap a button below." },
  ]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  // A message on its way to the office, and the step it's at.
  const [office, setOffice] = useState<{ step: Step; message: string } | null>(null);
  // Asked once per visit, then reused for any further message.
  const [contact, setContact] = useState<Contact>({});
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
  const sourcePage = `/chat${pathname === "/" ? "" : pathname}`;

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
      say({ private: true, from: "chat", text: "Sure - type your message below and I'll pass it to the office." });
      setOffice({ step: "message", message: "" });
      inputRef.current?.focus();
    }
  }

  /** Send `message` to the office, first asking for whatever's missing. */
  function toOffice(message: string, c: Contact = contact) {
    const first = c.name?.split(/\s+/)[0];
    if (!c.name) {
      say({ private: true, from: "chat", text: "I'll send that to the office. What's your name?" });
      setOffice({ step: "name", message });
    } else if (!c.phone) {
      say({ private: true, from: "chat", text: `Thanks${first ? `, ${first}` : ""}. What's the best number for the office to reach you on?` });
      setOffice({ step: "phone", message });
    } else if (!c.postcode) {
      say({ private: true, from: "chat", text: "And your postcode?" });
      setOffice({ step: "postcode", message });
    } else if (TURNSTILE_SITE_KEY) {
      // The site's bot check, as on the quote form - deliver() runs once it passes.
      say({ private: true, from: "chat", text: "One quick check, then it's sent." });
      setOffice({ step: "check", message });
    } else {
      void deliver(message, c);
    }
    inputRef.current?.focus();
  }

  async function deliver(message: string, c: Contact, turnstileToken?: string) {
    setOffice(null);
    setBusy(true);
    const payload: NewLeadInput = {
      name: c.name ?? "",
      phone: c.phone ?? "",
      postcode: c.postcode ?? "",
      service: "other",
      serviceOtherNote: `From the website chat: ${message}`.slice(0, LEAD_LIMITS.serviceOtherNote),
      sourcePage,
      website: "",
      turnstileToken,
    };
    try {
      const invalid = validateNewLead(payload);
      if (invalid) throw new Error(invalid);
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "That didn't send.");
      }
      say({ private: true, from: "chat", text: `Sent - thank you. The office will get back to you on ${c.phone}. Anything else I can help with?` });
    } catch (e) {
      const why = e instanceof Error ? e.message : "That didn't send.";
      say({ private: true, from: "chat", text: `${why} You can try again, or call or WhatsApp us on ${siteConfig.phoneDisplay}.`, retry: message });
    } finally {
      setBusy(false);
    }
  }

  /** The chat box while a message to the office is under way. */
  function officeReply(value: string) {
    if (!office) return;
    const step = office.step;
    say({ private: true, from: "visitor", text: value });
    if (step === "message") return toOffice(value.slice(0, 470));
    const next: Contact = { ...contact };
    if (step === "name") {
      if (value.length < 2) return say({ private: true, from: "chat", text: "Please type your name." });
      next.name = value.slice(0, LEAD_LIMITS.name);
    } else if (step === "phone") {
      if (!PHONE_RE.test(value)) return say({ private: true, from: "chat", text: "That doesn't look like a phone number - could you check it?" });
      next.phone = value;
    } else if (step === "postcode") {
      if (!POSTCODE_RE.test(value)) return say({ private: true, from: "chat", text: "Please type your postcode, like N16 6TL." });
      next.postcode = value.toUpperCase();
    }
    setContact(next);
    toOffice(office.message, next);
  }

  function cancelOffice() {
    setOffice(null);
    say({ private: true, from: "chat", text: "No problem - nothing was sent. Ask me anything else." });
  }

  async function send() {
    const q = text.trim();
    if (!q || busy) return;
    setText("");
    if (office) return officeReply(q);
    say({ from: "visitor", text: q });
    setBusy(true);
    // The conversation so far, without anyone's contact details.
    const history = msgs.filter((m) => m.id !== "hello" && !m.private).map((m) => ({ from: m.from, text: m.text }));
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history }),
      });
      const r = await res.json().catch(() => ({ error: "No signal - try again." }));
      if (r.offline) say({ from: "chat", text: "I can't answer typed questions right now, but the office can.", offerOffice: q });
      else if (r.error) say({ from: "chat", text: r.error, offerOffice: q });
      else say({ from: "chat", text: r.reply, links: r.links, offerOffice: r.handoff ? q : undefined });
    } catch {
      say({ from: "chat", text: "No signal - try again, or send your question to the office.", offerOffice: q });
    } finally {
      setBusy(false);
    }
  }

  const input = office ? STEP_INPUT[office.step] : { placeholder: "Ask a question", label: "Your question" };
  const chip = "rounded-full bg-[#e9f5ef] px-3 py-1 text-[13px] font-semibold text-brand-dark";

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
                          <a key={l.href} href={l.href} className={chip}>
                            {l.label}
                          </a>
                        ) : (
                          <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={chip}>
                            {l.label}
                          </Link>
                        ),
                      )}
                    </div>
                  )}
                  {m.offerOffice && !office && !busy && (
                    <button type="button" onClick={() => toOffice(m.offerOffice!)} className={chip}>
                      Send this to the office
                    </button>
                  )}
                  {m.retry && !office && !busy && (
                    <button type="button" onClick={() => toOffice(m.retry!)} className={chip}>
                      Try again
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
            {office?.step === "check" && TURNSTILE_SITE_KEY && (
              <div className="flex justify-start">
                <Turnstile siteKey={TURNSTILE_SITE_KEY} onVerify={(token) => token && void deliver(office.message, contact, token)} />
              </div>
            )}
          </div>

          <div className="flex gap-1.5 overflow-x-auto border-t border-border-subtle bg-white px-3 py-2 [scrollbar-width:none]">
            {office ? (
              <>
                <span className="shrink-0 self-center text-[13px] font-semibold text-foreground/60">Message to the office</span>
                <button type="button" onClick={cancelOffice} className="ml-auto shrink-0 rounded-full border border-[#cfd8d3] bg-white px-3 py-1.5 text-[13px] font-semibold text-foreground">
                  Cancel
                </button>
              </>
            ) : (
              QUICK.filter((q) => q.key !== "offer" || offerRunning).map((q) => (
                <button
                  key={q.key}
                  type="button"
                  disabled={busy}
                  onClick={() => quick(q.key, q.label)}
                  className="shrink-0 rounded-full border border-[#cfd8d3] bg-white px-3 py-1.5 text-[13px] font-semibold text-foreground disabled:opacity-50"
                >
                  {q.label}
                </button>
              ))
            )}
          </div>
          {office?.step !== "check" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="flex items-end gap-2 bg-white px-3 pt-1"
            >
              <textarea
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                rows={1}
                maxLength={office?.step === "message" ? 470 : 1000}
                placeholder={input.placeholder}
                aria-label={input.label}
                autoComplete={input.autoComplete ?? "off"}
                inputMode={input.inputMode}
                className="max-h-28 min-h-11 flex-1 resize-none rounded-[22px] border border-[#cfd8d3] bg-muted-bg px-4 py-2.5 text-[16px] text-foreground placeholder:text-foreground/45 focus:border-brand-dark focus:outline-none"
              />
              <button type="submit" disabled={busy || !text.trim()} aria-label="Send" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-dark text-white disabled:opacity-40">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.99.99 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
                </svg>
              </button>
            </form>
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

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8.4l-3.7 3.1A1 1 0 0 1 3 20.3V6a2 2 0 0 1 2-2Zm3 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    </svg>
  );
}
