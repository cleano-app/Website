// NOTE: `pricingFrom`/`pricingNote` are only rendered on the service page
// when `hidePricing` is NOT set. Bin Cleaning has real, confirmed pricing
// from Cleano and is shown. Every other service still carries placeholder
// "from" figures (nobody gave us a full price list) so `hidePricing: true`
// keeps them off the live site - fill in real numbers and drop the flag
// once they're confirmed.

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
  /** Hides the Pricing section on the service page - use while pricingFrom is still a placeholder. */
  hidePricing?: boolean;
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
    hidePricing: true,
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
        q: "Do you also carry out gutter repairs?",
        a: "Yes - alongside cleaning we carry out minor gutter repairs such as reseals, loose brackets and small leaks where needed. Let us know when you request a quote and we'll take a look.",
      },
      {
        q: "What areas do you cover?",
        a: "We cover London and the surrounding areas.",
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
    heroSubhead: "Reliable exterior window cleaning for homes and businesses.",
    included: [
      "Exterior glass cleaning",
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
    hidePricing: true,
    faqs: [
      {
        q: "How often do you recommend window cleaning?",
        a: "Most customers go for a monthly or 8-weekly regular clean, which keeps glass consistently streak-free.",
      },
      {
        q: "Do you clean the inside of windows too?",
        a: "No - we clean the outside of windows only, for both homes and commercial buildings. This lets us work safely and efficiently from the ground or with water-fed poles, without needing access inside the property.",
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
        a: "Yes, including scheduled cleaning for shops and offices - just let us know when you request a quote.",
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
    hidePricing: true,
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
        a: "Yes, including scheduled maintenance for commercial forecourts and shared areas - just let us know when you request a quote.",
      },
    ],
  },
  {
    slug: "graffiti-removal",
    name: "Graffiti Removal",
    shortName: "Graffiti",
    cardBlurb: "Fast, careful removal from walls, shutters and signage.",
    heroHeadline: "Professional Graffiti Removal",
    heroSubhead:
      "Fast, careful graffiti removal for homes, shops and commercial buildings.",
    included: [
      "Assessment of surface and paint type before we start",
      "Professional graffiti removal treatment",
      "Careful technique to avoid damaging the surface underneath",
      "Removal from brick, render, metal shutters and signage",
      "Before and after photos",
      "Cleano Photo Report emailed to you",
    ],
    why: [
      {
        title: "The longer it stays, the worse it gets",
        body: "Graffiti left up tends to attract more of it - fast removal is the best way to stop repeat tagging.",
      },
      {
        title: "Kerb appeal",
        body: "A tagged wall or shutter is one of the fastest ways to make a home or business look neglected.",
      },
      {
        title: "Lease and compliance requirements",
        body: "Landlords, managing agents and businesses are often required to remove graffiti quickly under lease or council terms.",
      },
    ],
    pricingFrom: "£75",
    pricingNote: "Based on surface area, surface type and paint - send a photo for a fast quote.",
    hidePricing: true,
    faqs: [
      {
        q: "How quickly can you remove graffiti?",
        a: "We treat graffiti removal as urgent where possible and aim to get to most jobs within a few days of enquiry.",
      },
      {
        q: "Will removal damage the surface underneath?",
        a: "We assess the surface and paint type first and choose a technique suited to it, to minimise any risk to brick, render, metal or signage underneath.",
      },
      {
        q: "What surfaces can you treat?",
        a: "Brick, render, metal shutters, signage and most common exterior surfaces - let us know what's affected when you request a quote.",
      },
      {
        q: "Can I get a quote from a photo?",
        a: "Yes - a photo of the affected area is usually enough for us to give you a fast, accurate quote.",
      },
      {
        q: "Do you offer this for commercial properties?",
        a: "Yes, including shopfronts, shutters and managed buildings - just let us know when you request a quote.",
      },
    ],
  },
  {
    slug: "rooftop-cleaning",
    name: "Rooftop Cleaning",
    shortName: "Rooftop",
    cardBlurb: "Safe moss and algae removal that protects your roof.",
    heroHeadline: "Professional Rooftop Cleaning",
    heroSubhead:
      "Safe, professional roof cleaning that removes moss and algae and protects your roof.",
    included: [
      "Moss, algae and lichen removal from roof tiles",
      "Soft-wash treatment suited to your roof type",
      "Debris and moss clearance from valleys and flat sections",
      "Ridge and roofline inspection while we're up there",
      "Before and after photos, including drone photos of the roof",
      "Cleano Photo Report emailed to you",
    ],
    why: [
      {
        title: "Moss traps moisture",
        body: "Moss and algae hold water against the tiles, which speeds up wear and can lead to leaks over time.",
      },
      {
        title: "Extends roof life",
        body: "Regular cleaning protects the roof surface and can delay costly repairs or a full re-roof.",
      },
      {
        title: "Kerb appeal",
        body: "A moss-covered, streaked roof is one of the most visible signs of a neglected property.",
      },
    ],
    pricingFrom: "£150",
    pricingNote: "Exact quote based on roof size, pitch and access.",
    hidePricing: true,
    faqs: [
      {
        q: "Is roof cleaning safe for my tiles?",
        a: "Yes - we use a soft-wash approach suited to your roof type, rather than aggressive pressure washing that can damage or dislodge tiles.",
      },
      {
        q: "How is this different from gutter cleaning?",
        a: "Gutter cleaning clears the gutters themselves; rooftop cleaning treats the roof surface - removing moss, algae and lichen from the tiles. We're happy to quote for both together.",
      },
      {
        q: "How do you access the roof safely?",
        a: "We use appropriate access equipment for the property and follow standard safety practice throughout - and use drone photography to inspect and document areas that are hard to reach safely.",
      },
      {
        q: "Do I get proof the work was done?",
        a: "Yes. Every rooftop clean includes a Cleano Photo Report with before-and-after photos - including drone photos of the roof - sent straight to your email.",
      },
      {
        q: "What areas do you cover?",
        a: "We cover London and the surrounding areas.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
