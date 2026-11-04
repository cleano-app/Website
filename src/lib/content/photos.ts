// Which photograph goes where. These are licensed stock photos (see
// public/images/stock/CREDITS.md) standing in until Cleano's own job
// photos replace them - swap the file here and every page that shows it
// follows. `position` is the CSS object-position that keeps the subject in
// view; `phonePosition` the same for a tall phone crop.

export type Photo = { src: string; alt: string; position?: string; phonePosition?: string };

const stock = (file: string) => `/images/stock/${file}`;

/** The homepage hero slideshow, in order. Five photos, 7 seconds each. */
export const heroSlides: Photo[] = [
  { src: stock("dirty-gutter.jpg"), alt: "A gutter clogged with moss along a roof edge", position: "60% 50%", phonePosition: "55% 50%" },
  { src: stock("pressure-washing.jpg"), alt: "Pressure washing a paved street in London", position: "70% 50%", phonePosition: "78% 50%" },
  { src: stock("moss-roof.jpg"), alt: "Moss growing over clay roof tiles", position: "50% 50%", phonePosition: "50% 50%" },
  { src: stock("window-cleaners.jpg"), alt: "Window cleaners working on a commercial building", position: "50% 40%", phonePosition: "44% 50%" },
  { src: stock("glass-office.jpg"), alt: "The glass front of an office building", position: "50% 50%", phonePosition: "60% 50%" },
];

/** Each service's card photo and its page's header photo. */
export const servicePhotos: Record<string, { card: Photo; hero: Photo }> = {
  "gutter-cleaning": {
    card: { src: stock("dirty-gutter.jpg"), alt: "A gutter clogged with moss", position: "60% 50%" },
    hero: { src: stock("dirty-gutter.jpg"), alt: "A gutter clogged with moss along a roof edge", position: "60% 50%" },
  },
  "rooftop-cleaning": {
    card: { src: stock("tiled-roof.jpg"), alt: "A brick house with a tiled roof", position: "50% 40%" },
    hero: { src: stock("moss-roof.jpg"), alt: "Moss growing over clay roof tiles", position: "50% 50%" },
  },
  "window-cleaning": {
    card: { src: stock("window-cleaners.jpg"), alt: "Window cleaners on a commercial building", position: "45% 50%" },
    hero: { src: stock("window-cleaners.jpg"), alt: "Window cleaners working on a commercial building", position: "50% 40%" },
  },
  "pressure-washing": {
    card: { src: stock("pressure-washing.jpg"), alt: "Pressure washing paving", position: "65% 50%" },
    hero: { src: stock("pressure-washing.jpg"), alt: "Pressure washing a paved street in London", position: "70% 50%" },
  },
  "bin-cleaning": {
    card: { src: stock("wheelie-bins.jpg"), alt: "Wheelie bins along a back alley", position: "50% 70%" },
    hero: { src: stock("wheelie-bins.jpg"), alt: "Wheelie bins lined up along a back alley", position: "50% 72%" },
  },
  "graffiti-removal": {
    card: { src: stock("graffiti-wall.jpg"), alt: "Graffiti on a brick wall", position: "50% 50%" },
    hero: { src: stock("graffiti-wall.jpg"), alt: "Graffiti across a brick wall", position: "50% 50%" },
  },
};

/** The Portfolio scheme's header photo. */
export const portfolioHero: Photo = { src: stock("london-terraces.jpg"), alt: "A street of Edwardian terraced houses in London", position: "65% 50%" };

/** Cleano's own photo report, from the Ops app - real, not stock. */
export const reportScreenshot = { src: "/photos/report-example.jpg", width: 1400, height: 1044, alt: "A Cleano field service report, with job details and the gutter checklist" };
