import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://eduardo-schettino.netlify.app";
const TITLE = "Eduardo Schettino — Ingeniero de Automatización y Software";
const DESCRIPTION =
  "Portafolio de Eduardo Schettino, Ingeniero de Proyectos en automatización industrial (PLC, SCADA, HMI, AVEVA) y desarrollo de software en Santiago, Chile.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Eduardo Schettino",
  },
  description: DESCRIPTION,
  keywords: [
    "Eduardo Schettino",
    "Ingeniero de Automatización",
    "Automatización Industrial",
    "PLC",
    "SCADA",
    "HMI",
    "AVEVA System Platform",
    "Allen-Bradley",
    "Rockwell",
    "Ingeniero de Proyectos",
    "Software Developer",
    "Santiago, Chile",
  ],
  authors: [{ name: "Eduardo Schettino" }],
  creator: "Eduardo Schettino",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Eduardo Schettino — Portafolio",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#111110",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eduardo Schettino",
  jobTitle: "Ingeniero de Proyectos — Automatización Industrial y Software",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago",
    addressCountry: "CL",
  },
  knowsAbout: [
    "Automatización Industrial",
    "PLC",
    "SCADA",
    "HMI",
    "AVEVA System Platform",
    "Software Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
