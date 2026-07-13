import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/styles/fonts";
import { SITE } from "@/lib/constants";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/motion";
import { BrandThemeSync } from "@/components/brand/brand-theme-sync";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Eʋe food",
    "Ewe cuisine",
    "Ghanaian food Accra",
    "Giloz Restaurant",
    "Sefofo",
    "akple",
    "banku",
    "food delivery Accra",
    "order food Ghana",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0E0D0C" },
    { media: "(prefers-color-scheme: light)", color: "#FBF4E9" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-brand="eve" suppressHydrationWarning>
      <body className={`${fontVariables} min-h-dvh antialiased`}>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-on-brand"
        >
          Skip to content
        </a>
        <BrandThemeSync />
        <SmoothScroll>
          <Header />
          <main id="content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
