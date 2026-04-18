import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HistorySidebar } from "@/components/HistorySidebar";
import { CommandPalette } from "@/components/CommandPalette";
import { SmartPasteListener } from "@/components/SmartPasteListener";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "ToolStack — Free AI & Utility Tools", template: "%s | ToolStack" },
  description: "60+ free online tools for writers, marketers, developers, and business owners. AI-powered, instant results, no signup required.",
  keywords: ["free online tools", "ai tools", "utility tools", "prompt generator", "word counter", "seo tools"],
  metadataBase: new URL("https://toolstack.tech"),
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "ToolStack",
    title: "ToolStack — Free AI & Utility Tools",
    description: "60+ free online tools. Instant results, no signup required.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MNRHVXL2X9" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MNRHVXL2X9');`}</Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ToolStack",
              "url": "https://toolstack.tech",
              "logo": "https://toolstack.tech/favicon.png",
              "sameAs": [
                "https://x.com/toolstack",
                "https://linkedin.com/company/toolstack"
              ],
              "description": "60+ free online AI & utility tools for writers, marketers, and developers."
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ToolStack",
              "url": "https://toolstack.tech",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://toolstack.tech/tools?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <Navbar />
        <CommandPalette />
        <SmartPasteListener />
        <HistorySidebar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
