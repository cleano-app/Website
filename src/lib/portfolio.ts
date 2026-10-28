import { mailtoHref, whatsappHref } from "@/lib/siteConfig";

// The Portfolio Gutter Care Scheme - for landlords, property managers and
// anyone with several properties. Its page, and the two ways to start,
// shared by the page itself and every place on the site that offers it.

export const portfolioPath = "/gutter-cleaning/portfolio";

export const portfolioMailto = mailtoHref({
  subject: "Portfolio Gutter Care Scheme enquiry",
  body: "Hi Cleano,\n\nHere's our property portfolio for the Portfolio Gutter Care Scheme:\n\nNumber of properties: \nAddresses / list attached: \nOne-off inspection or ongoing programme: \n\nThanks,",
});

/** WhatsApp about the scheme, tagged with the page it was sent from. */
export function portfolioWhatsapp(fromPath: string = portfolioPath) {
  return whatsappHref("Hi Cleano, I'd like to discuss the Portfolio Gutter Care Scheme for our properties", fromPath);
}
