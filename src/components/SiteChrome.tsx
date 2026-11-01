/**
 * The cleaning site's header, promo, footer and mobile bar. Parsha Line
 * pages hide it with CSS (parsha.css), not by path: on parshaline.com the
 * address bar shows /builder, not /parsha/builder, so the path can't tell.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return <div className="site-chrome contents">{children}</div>;
}
