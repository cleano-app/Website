import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import { companyDetails, serviceAreas, siteConfig } from "@/lib/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Distinctive display font for headings only - body copy stays on Geist
// Sans for readability. Sora's geometric, slightly rounded letterforms
// read as more "designed" than the default sans for big headline text.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

// Site-wide defaults. Every page sets its own title/description/og/canonical
// through pageMetadata() (src/lib/seo.ts) - relative paths there resolve
// against this metadataBase, so og:url and the canonical link always carry
// the live domain plus the page's own path.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Local SEO foundation: LocalBusiness structured data so search
            engines can associate Cleano with the service area/areas below. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: siteConfig.name,
              legalName: companyDetails.legalName,
              vatID: companyDetails.vatNumber,
              description: siteConfig.description,
              url: siteConfig.url,
              telephone: siteConfig.phone,
              email: siteConfig.email,
              address: {
                "@type": "PostalAddress",
                ...companyDetails.registeredOfficeAddress,
              },
              areaServed: [...serviceAreas],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: siteConfig.phone,
                email: siteConfig.email,
                contactType: "customer service",
                areaServed: "GB",
                availableLanguage: "English",
              },
              image: `${siteConfig.url}/brand/cleano-logo.png`,
            }),
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}
