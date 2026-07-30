import type { Metadata, Viewport } from "next";
import { displaySerif, metaSans } from "./fonts";
import { ChromeProvider } from "@/components/chrome/ChromeContext";
import { SiteHeader } from "@/components/header/SiteHeader";
import { FullscreenMenu } from "@/components/header/FullscreenMenu";
import { SiteFooter } from "@/components/footer/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Adada & Kabbani — Integrated Interiors",
    template: "%s — Adada & Kabbani",
  },
  description:
    "Bespoke interiors, kitchens, closets, professional culinary environments and architectural joinery, designed and delivered through one integrated team. Jeddah and Makkah, Saudi Arabia.",
  openGraph: {
    title: "Adada & Kabbani — Integrated Interiors",
    description:
      "Architectural fit-out, bespoke kitchens, closets, professional culinary environments and timber joinery, delivered through one integrated team.",
    type: "website",
    locale: "en",
  },
};

export const viewport: Viewport = {
  themeColor: "#211f1c",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${displaySerif.variable} ${metaSans.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <ChromeProvider>
          <SiteHeader />
          <FullscreenMenu />
          <main id="main">{children}</main>
          <SiteFooter />
        </ChromeProvider>
      </body>
    </html>
  );
}
