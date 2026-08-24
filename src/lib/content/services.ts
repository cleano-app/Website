// NOTE: `pricingFrom` values below are PLACEHOLDER "from" prices, not real
// Cleano pricing - nobody gave us a price list. Review and correct every
// figure in this file before the site goes live.

export type ServiceOption = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  cardBlurb: string;
  heroHeadline: string;
  heroSubhead: string;
  included: string[];
  why: { title: string; body: string }[];
  serviceOptions?: ServiceOption[];
  pricingFrom: string;
  pricingNote: string;
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    shortName: "Gutters",
    cardBlurb: "Clear blockages before they cause damp and water damage.",
    heroHeadline: "Professional Gutter Cleaning",
    heroSubhead:
      "Protect your property from blocked gutters, overflowing water and avoidable damage.",
    included: [
      "Full gutter clearing, front and back",
      "Professional gutter vacuum equipment",
      "Removal of leaves, moss and debris",
      "Downpipe checks where applicable",
      "Before and after photos, including drone photos of the roofline",
      "Cleano Photo Report emailed to you",
    ],
    why: [
      {
        title: "Overflowing gutters",
        body: "Blocked gutters spill water down walls every time it rains, staining brickwork and rendering.",
      },
      {
        title: "Damp and water damage",
        body: "Water that can't drain away finds its way into roofs, fascias and foundations - expensive to fix later.",
      },
      {
        title: "Preventative maintenance",
        body: "A yearly clean is far cheaper than the repair bill for a gutter left blocked for several seasons.",
      },
    ],
    pricingFrom: "£45",
    pricingNote: "Exact quote based on property size, gutter length and access.",
    faqs: [
      {
        q: "How often should gutters be cleaned?",
        a: "Once a year for most homes, or twice a year if you're near large trees that shed a lot of leaves.",
      },
      {
        q: "Do you clean gutters from a ladder or with a vacuum system?",
        a: "We use professional gutter vacuum equipment for most properties, which lets us clear gutters safely from the ground without a ladder against your walls.",
      },
      {
        q: "Will you check my downpipes too?",
        a: "Yes - where accessible, we check downpipes for blockages as part of the job and flag anything that needs further attention.",
      },
      {
        q: "Do I get proof the work was done?",
        a: "Yes. Every gutter clean includes a Cleano Photo Report with before-and-after photos - including drone photos of the roofline where useful - sent straight to your email.",
      },
      {
        q: "What areas do you cover?",
        a: "We cover Stamford Hill, Tottenham, Hackney, Wood Green, Golders Green, Edgware, Enfield and the surrounding areas - see our Areas We Cover page.",
      },
    ],
  },
  {
    slug: "bin-cleaning",
    name: "Bin Cleaning",
    shortName: "Bins",
    cardBlurb: "No grime, smells or flies - one-off or on a schedule.",
    heroHeadline: "Clean bins. No grime, smells or flies.",
    heroSubhead: "Professional bin cleaning for homes and businesses.",
    included: [
      "Full bin washing, inside and outside",
      "Dirt and residue removal",
      "Deodorising and sanitising where applicable",
      "High-end professional equipment for a fast, thorough clean",
      "Domestic and commercial bins",
      "Lids and handles included",
    ],
    serviceOptions: [
      {
        title: "One-Off Cleaning",
        description: "For bins that need a proper deep clean right now.",
      },
      {
        title: "4-Weekly Subscription",
        description:
          "Scheduled cleaning every 4 weeks, available in specific areas, from £6.90 + VAT per bin.",
      },
    ],
    why: [
      {
        title: "Smells and bacteria",
        body: "Food waste and general rubbish leave residue that builds up fast, especially in warmer months.",
      },
      {
        title: "Flies and pests",
        body: "A dirty bin attracts flies and other pests to your doorstep - a proper clean removes what's drawing them in.",
      },
      {
        title: "Kerbside appearance",
        body: "Clean bins look better outside a home or business, and matter more than most people realise for commercial premises.",
      },
    ],
    pricingFrom: "£6.90",
    pricingNote:
      "+ VAT per bin on our 4-weekly subscription, available in specific areas. One-off cleans quoted separately.",
    faqs: [
      {
        q: "How often should bins be cleaned?",
        a: "Most households go for our 4-weekly subscription; commercial bins used more heavily are often better on a fortnightly schedule.",
      },
      {
        q: "Do you clean wheelie bins and communal bins?",
        a: "Yes - we clean individual household wheelie bins as well as communal and commercial bins for blocks, offices and other premises.",
      },
      {
        q: "What's the difference between one-off and the 4-weekly subscription?",
        a: "One-off is a single deep clean; the 4-weekly subscription puts your bins on a repeat schedule from £6.90 + VAT per bin, available in specific areas, so you never have to think about it.",
      },
      {
        q: "Do you sanitise the bins, or just rinse them?",
        a: "Our process removes dirt and residue and includes deodorising/sanitising where applicable, not just a rinse.",
      },
      {
        q: "Can I get a quote without you visiting first?",
        a: "Yes - tell us how many bins and where, and in most cases we can quote instantly without a site visit.",
      },
    ],
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    shortName: "Windows",
    cardBlurb: "Streak-free glass, frames and sills - one-off or regular.",
    heroHeadline: "Clean windows. Professional finish.",
    heroSubhead: "Reliable window cleaning for homes and businesses.",
    included: [
      "Glass, inside and out where accessible",
      "Frames and sills",
      "Streak-free finish",
      "Professional water-fed pole equipment where appropriate",
      "One-off or regular visits",
    ],
    why: [
      {
        title: "First impressions",
        body: "Clean windows are one of the fastest ways to make a home or shopfront look properly looked after.",
      },
      {
        title: "Hard water and grime build-up",
        body: "Left too long, mineral deposits and grime become much harder to shift - regular cleaning keeps glass looking new.",
      },
      {
        title: "Safe, reliable access",
        body: "Water-fed pole equipment reaches upper floors safely, without ladders against your property.",
      },
    ],
    pricingFrom: "£20",
    pricingNote: "Prices from, based on property size - or request a property-specific quote.",
    faqs: [
      {
        q: "How often do you recommend window cleaning?",
        a: "Most customers go for a monthly or 8-weekly regular clean, which keeps glass consistently streak-free.",
      },
      {
        q: "Do you clean the inside of windows too?",
        a: "Our standard service covers the outside; interior cleaning can be arranged for accessible properties on request.",
      },
      {
        q: "What equipment do you use?",
        a: "Professional water-fed pole systems for most homes, which clean safely from the ground and reach upper-floor windows.",
      },
      {
        q: "Can I set up a recurring clean?",
        a: "Yes - regular window cleaning is our most popular option. Choose a frequency when you request your quote.",
      },
      {
        q: "Do you clean commercial shopfronts?",
        a: "Yes, including scheduled cleaning for shops and offices - see our Commercial Cleaning page.",
      },
    ],
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    shortName: "Pressure Washing",
    cardBlurb: "Bring tired driveways, patios and paving back to life.",
    heroHeadline: "Bring tired outdoor surfaces back to life.",
    heroSubhead:
      "Professional pressure washing for residential and commercial properties.",
    included: [
      "Full surface assessment before we start",
      "Professional-grade pressure washing equipment",
      "Careful treatment for delicate surfaces",
      "Debris and residue cleared away after",
      "Before and after photos",
    ],
    why: [
      {
        title: "Driveways and patios",
        body: "Moss, algae and ground-in dirt build up over time and make outdoor spaces look neglected - and can get slippery.",
      },
      {
        title: "Paving and decking",
        body: "Regular pressure washing keeps paving and decking looking new and helps them last longer.",
      },
      {
        title: "Walls and commercial areas",
        body: "Exterior walls and commercial forecourts benefit from the same dramatic, visible clean.",
      },
    ],
    pricingFrom: "£60",
    pricingNote: "Based on area, surface type and condition - upload a photo for a fast quote.",
    faqs: [
      {
        q: "What surfaces can you pressure wash?",
        a: "Driveways, patios, paving, decking, walls and commercial forecourts - we assess the surface first and adjust pressure accordingly.",
      },
      {
        q: "Will pressure washing damage my patio or decking?",
        a: "We match pressure and technique to the surface, and delicate materials are treated with extra care to avoid damage.",
      },
      {
        q: "How long does a typical job take?",
        a: "Most residential driveways or patios take a few hours; larger commercial areas are quoted individually.",
      },
      {
        q: "Can I get a quote from a photo?",
        a: "Yes - upload a photo of the area when you request a quote and we can often price it without a site visit.",
      },
      {
        q: "Do you offer this for commercial properties?",
        a: "Yes, including scheduled maintenance for commercial forecourts and shared areas - see our Commercial Cleaning page.",
      },
    ],
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial Cleaning",
    shortName: "Commercial",
    cardBlurb: "Scheduled exterior cleaning with clear reporting.",
    heroHeadline: "Reliable exterior cleaning for your business.",
    heroSubhead:
      "Professional scheduled and one-off cleaning with clear reporting.",
    included: [
      "Gutter cleaning",
      "Bin cleaning",
      "Window cleaning",
      "Pressure washing",
      "Scheduled maintenance visits",
    ],
    why: [
      {
        title: "VAT invoices",
        body: "Proper VAT invoicing for your accounts, every time.",
      },
      {
        title: "Fully insured",
        body: "Cleano is fully insured for work on commercial premises, multi-site portfolios and shared buildings.",
      },
      {
        title: "One point of contact",
        body: "A single point of contact for scheduling across multiple sites, instead of juggling different contractors.",
      },
      {
        title: "Photo reports",
        body: "Every visit is documented with a Cleano Photo Report - useful evidence for property managers and landlords.",
      },
    ],
    pricingFrom: "Custom",
    pricingNote: "Priced per site based on scope and schedule - request a commercial quote.",
    faqs: [
      {
        q: "Who do you typically work with?",
        a: "Property managers, landlords, offices, shops, schools, blocks of flats and other organisations across London and the surrounding areas.",
      },
      {
        q: "Can you manage multiple sites under one contract?",
        a: "Yes - multi-site scheduling with one point of contact is one of the most common commercial setups we run.",
      },
      {
        q: "Do you provide VAT invoices?",
        a: "Yes, full VAT invoices are provided for all commercial work.",
      },
      {
        q: "How does the Photo Report help commercial customers?",
        a: "It gives property managers and landlords documented evidence that scheduled maintenance was actually carried out, useful for compliance and for leaseholders/tenants.",
      },
      {
        q: "How do we get started?",
        a: "Request a commercial quote with your site details and we'll come back with a proposed scope and schedule.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
