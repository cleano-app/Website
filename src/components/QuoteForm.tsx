"use client";

import { useState } from "react";
import { services } from "@/lib/content/services";
import { LEAD_LIMITS, LEAD_SERVICE_LABELS, type LeadService, type NewLeadInput } from "@/lib/leads";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { siteConfig, telHref, whatsappHref } from "@/lib/siteConfig";
import Turnstile from "./Turnstile";

const serviceChoices: { value: LeadService; label: string }[] = [
  ...services.map((s) => ({ value: s.slug.replace(/-/g, "_") as LeadService, label: s.name })),
  { value: "other", label: "Other" },
];

// Mirrors the DB-level limits on the lead-photos storage bucket (see
// supabase/migrations/0004_harden_lead_photos_bucket.sql) so a rejected
// upload never gets that far - the user finds out immediately instead.
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Step = 1 | 2 | 3;

export default function QuoteForm({
  sourcePage,
  defaultService,
}: {
  sourcePage: string;
  defaultService?: LeadService;
}) {
  const [step, setStep] = useState<Step>(defaultService ? 2 : 1);
  const [service, setService] = useState<LeadService | null>(defaultService ?? null);
  const [serviceOtherNote, setServiceOtherNote] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [website, setWebsite] = useState(""); // honeypot - see the hidden field below
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function goToStep2() {
    if (!service) {
      setErrorMessage("Please choose a service to continue.");
      return;
    }
    setErrorMessage(null);
    setStep(2);
  }

  function goToStep3() {
    if (!name.trim() || !phone.trim() || !postcode.trim()) {
      setErrorMessage("Please fill in your name, phone number and postcode.");
      return;
    }
    setErrorMessage(null);
    setStep(3);
  }

  function handlePhotoSelect(files: File[]) {
    const accepted: File[] = [];
    for (const file of files) {
      if (accepted.length + photos.length >= LEAD_LIMITS.maxPhotos) break;
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        setErrorMessage(`${file.name} isn't a supported image type - please use JPEG, PNG, WebP or HEIC.`);
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        setErrorMessage(`${file.name} is too large - please keep photos under 10MB.`);
        continue;
      }
      accepted.push(file);
    }
    if (accepted.length) setErrorMessage(null);
    setPhotos((prev) => [...prev, ...accepted].slice(0, LEAD_LIMITS.maxPhotos));
  }

  async function handleSubmit() {
    if (!service) return;
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setErrorMessage("Please complete the verification check above.");
      return;
    }
    setSubmitting(true);
    setErrorMessage(null);

    const photoPaths = await uploadPhotos(photos);

    const utm = readUtmParams();
    const payload: NewLeadInput = {
      name: name.trim(),
      phone: phone.trim(),
      postcode: postcode.trim(),
      service,
      serviceOtherNote: service === "other" ? serviceOtherNote.trim() : undefined,
      photoPaths,
      sourcePage,
      utm,
      website,
      turnstileToken: turnstileToken || undefined,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please call or WhatsApp us instead.");
      }
      setSubmitted(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call or WhatsApp us instead."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand/30 bg-brand-light/10 p-8 text-center">
        <h3 className="text-xl font-bold text-brand-dark">Thanks - we&apos;ve got your request!</h3>
        <p className="mt-2 text-sm text-foreground/70">
          We&apos;ll be in touch shortly with your quote. If it&apos;s urgent, call or WhatsApp us
          directly.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={telHref()} className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white">
            Call {siteConfig.phoneDisplay}
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-brand px-6 py-3 text-sm font-semibold text-brand-dark"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border-subtle p-6 sm:p-8">
      {/* Honeypot - invisible to real visitors (off-screen, not display:none,
          since some bots skip that), tempting to anything auto-filling every
          field on the page. See /api/leads route.ts for how this is used. */}
      <div aria-hidden="true" className="relative h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <StepIndicator step={step} />

      {step === 1 && (
        <fieldset className="mt-6">
          <legend className="text-lg font-bold text-foreground">What do you need cleaned?</legend>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {serviceChoices.map((choice) => (
              <button
                key={choice.value}
                type="button"
                onClick={() => setService(choice.value)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                  service === choice.value
                    ? "border-brand bg-brand text-white"
                    : "border-border-subtle text-foreground/80 hover:border-brand"
                }`}
              >
                {choice.label}
              </button>
            ))}
          </div>
          {errorMessage && <p className="mt-3 text-sm text-red-600">{errorMessage}</p>}
          <button
            type="button"
            onClick={goToStep2}
            className="mt-6 w-full rounded-full bg-brand py-3.5 text-sm font-semibold text-white sm:w-auto sm:px-8"
          >
            Continue
          </button>
        </fieldset>
      )}

      {step === 2 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-foreground">Your details</h3>
          {service && (
            <p className="mt-1 text-sm text-foreground/60">
              Service: <span className="font-medium text-brand-dark">{LEAD_SERVICE_LABELS[service]}</span>
            </p>
          )}
          <div className="mt-4 grid gap-4">
            <Field label="Name" value={name} onChange={setName} autoComplete="name" />
            <Field label="Mobile number" value={phone} onChange={setPhone} type="tel" autoComplete="tel" />
            <Field label="Postcode" value={postcode} onChange={setPostcode} autoComplete="postal-code" />
            {service === "other" && (
              <Field
                label="What do you need cleaned?"
                value={serviceOtherNote}
                onChange={setServiceOtherNote}
              />
            )}
          </div>
          {errorMessage && <p className="mt-3 text-sm text-red-600">{errorMessage}</p>}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-full border border-border-subtle px-6 py-3.5 text-sm font-semibold text-foreground/70"
            >
              Back
            </button>
            <button
              type="button"
              onClick={goToStep3}
              className="flex-1 rounded-full bg-brand py-3.5 text-sm font-semibold text-white sm:flex-none sm:px-8"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-foreground">Add photos (optional)</h3>
          <p className="mt-1 text-sm text-foreground/60">
            A few photos of the area often means we can quote without a site visit.
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            onChange={(e) => handlePhotoSelect(Array.from(e.target.files ?? []))}
            className="mt-4 block w-full text-sm text-foreground/70 file:mr-4 file:rounded-full file:border-0 file:bg-muted-bg file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-dark"
          />
          {photos.length > 0 && (
            <p className="mt-2 text-xs text-foreground/50">{photos.length} photo(s) selected</p>
          )}
          {TURNSTILE_SITE_KEY && (
            <div className="mt-4">
              <Turnstile siteKey={TURNSTILE_SITE_KEY} onVerify={setTurnstileToken} />
            </div>
          )}
          {errorMessage && <p className="mt-3 text-sm text-red-600">{errorMessage}</p>}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={submitting}
              className="rounded-full border border-border-subtle px-6 py-3.5 text-sm font-semibold text-foreground/70 disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 rounded-full bg-brand py-3.5 text-sm font-semibold text-white disabled:opacity-60 sm:flex-none sm:px-8"
            >
              {submitting ? "Sending..." : "Get My Free Quote"}
            </button>
          </div>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-foreground/40">
        Prefer to talk? <a href={telHref()} className="underline">Call {siteConfig.phoneDisplay}</a> or{" "}
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="underline">
          WhatsApp us
        </a>
        .
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground/80">{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground focus:border-brand"
      />
    </label>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const labels = ["Service", "Details", "Photos"];
  return (
    <ol className="flex items-center gap-2 text-xs font-medium text-foreground/50">
      {labels.map((label, i) => {
        const n = (i + 1) as Step;
        const isActive = n === step;
        const isDone = n < step;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                isActive || isDone ? "bg-brand text-white" : "bg-muted-bg text-foreground/40"
              }`}
            >
              {n}
            </span>
            <span className={isActive ? "text-foreground" : ""}>{label}</span>
            {i < labels.length - 1 && <span className="mx-1 text-foreground/20">—</span>}
          </li>
        );
      })}
    </ol>
  );
}

// Strips a user-supplied filename down to a safe charset before it becomes
// part of a storage path - filenames can contain almost anything (path
// separators, unicode tricks, control characters), and this path is later
// matched server-side against PHOTO_PATH_RE in lib/leads.ts, so the two
// need to agree on what's "safe".
function sanitizeFileName(name: string): string {
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : "";
  const safeBase = base.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 60) || "photo";
  const safeExt = ext.replace(/[^a-zA-Z0-9.]/g, "").slice(0, 10);
  return `${safeBase}${safeExt}`;
}

async function uploadPhotos(files: File[]): Promise<string[]> {
  if (files.length === 0) return [];

  try {
    const supabase = createBrowserSupabaseClient();
    const paths: string[] = [];
    // handlePhotoSelect already caps this, but never trust that a caller
    // won't grow the array some other way - re-cap here too.
    for (const file of files.slice(0, LEAD_LIMITS.maxPhotos)) {
      const path = `${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;
      const { error } = await supabase.storage.from("lead-photos").upload(path, file);
      if (!error) paths.push(path);
    }
    return paths;
  } catch {
    // Supabase not configured yet, or upload failed - never block the lead
    // submission itself on photos.
    return [];
  }
}

function readUtmParams(): NewLeadInput["utm"] {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
    term: params.get("utm_term") ?? undefined,
    content: params.get("utm_content") ?? undefined,
  };
  return Object.values(utm).some(Boolean) ? utm : undefined;
}
