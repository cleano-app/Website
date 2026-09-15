// Turning what a customer typed into the quote form into links the office
// can tap straight from the notification email.
//
// The form deliberately accepts a loose range of formats (see PHONE_RE in
// lib/leads.ts) - "07700 900123", "+44 7700 900123", "(020) 3370 4040" are
// all fine by a human reading them. A `tel:` link tolerates the same range.
// wa.me does not: it wants international digits with no "+", no spaces and
// no leading zero, and a number converted wrongly doesn't fail - it opens a
// conversation with whoever else owns that number. So the WhatsApp helper
// returns null whenever it can't be confident, and the caller leaves the
// button out rather than shipping a link to a stranger.

/** Digits (and a leading +) only - safe to put in a tel: href. Null when
 * there aren't enough digits to be a real number. */
export function telLink(raw: string): string | null {
  const trimmed = raw.trim();
  const plus = trimmed.startsWith("+") || trimmed.startsWith("00");
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  return plus ? `+${digits.replace(/^00/, "")}` : digits;
}

/** International digits for wa.me, or null if the number can't be resolved
 * confidently. A leading 0 is read as UK national format - this site serves
 * London and the surrounding areas only, so that assumption holds here; it
 * would not on an international site. */
export function whatsAppNumber(raw: string): string | null {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");

  // Explicit international: +44..., 0044..., and any other country code the
  // customer wrote out in full. Trust it as given.
  if (trimmed.startsWith("+")) {
    return digits.length >= 8 && digits.length <= 15 ? digits : null;
  }
  if (digits.startsWith("00")) {
    const rest = digits.slice(2);
    return rest.length >= 8 && rest.length <= 15 ? rest : null;
  }

  // UK national: 07700 900123 / 020 3370 4040 -> 44 + the rest.
  if (digits.startsWith("0")) {
    const national = digits.slice(1);
    // UK numbers are 10 digits after the trunk 0 (a handful of older
    // landline ranges are 9).
    return national.length === 9 || national.length === 10 ? `44${national}` : null;
  }

  // Already international without a plus, e.g. "44 7700 900123".
  if (digits.startsWith("44")) {
    return digits.length >= 11 && digits.length <= 13 ? digits : null;
  }

  // Anything else - a bare "7700900123", a partial number, something odd.
  // Guessing here is what opens a chat with the wrong person.
  return null;
}
