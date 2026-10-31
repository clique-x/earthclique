import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site, EMAIL, INSTAGRAM, MAP } from "@/content";

const manrope = localFont({
  src: "../../public/fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "EarthClique – IT Solutions & Digital Services in SIDCUL, Haridwar",
  description:
    "Laptop & PC repair, AMC for offices and factories, servers & networking, websites & apps, digital marketing and AI automation. Shop 209, Deep Ganga Complex, SIDCUL, Haridwar. Open daily 9 am – 10 pm.",
  openGraph: {
    type: "website",
    siteName: "EarthClique",
    title: "EarthClique · IT Solutions & Digital Services",
    description: "From laptop repair to AI automation. SIDCUL, Haridwar.",
    url: site.url,
    locale: "en_IN",
    images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: "EarthClique — IT Solutions & Digital Services, SIDCUL, Haridwar" }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32x32.png", sizes: "32x32" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = { themeColor: "#0E6B76", width: "device-width", initialScale: 1, viewportFit: "cover" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "EarthClique",
  description: site.tagline,
  url: site.url,
  telephone: "+918755572898",
  email: EMAIL,
  image: `${site.url}/brand/og.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No. 209, 2nd Floor, Deep Ganga Shopping Complex, SIDCUL",
    addressLocality: "Haridwar",
    addressRegion: "Uttarakhand",
    postalCode: "249403",
    addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "22:00",
  },
  founder: { "@type": "Person", name: site.owner.name, jobTitle: site.owner.title },
  sameAs: [INSTAGRAM, MAP],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
