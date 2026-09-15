// For the one place this app hand-builds an HTML string - the lead
// notification email. React's auto-escaping doesn't apply to a template
// literal, and every field in that email is typed by a stranger on the
// public quote form, so each one goes through this first.
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
