import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { SmartPasteListener } from "@/components/SmartPasteListener";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "ToolStack — Free AI & Utility Tools", template: "%s | ToolStack" },
  description: "Access 57+ premium, completely free utility tools for developers, marketers, and creators. No paywalls and no forced sign-ups. Experience the frictionless arsenal.",
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
    description: "Access 57+ premium, completely free utility tools for developers, marketers, and creators. No paywalls and no forced sign-ups. Experience the frictionless arsenal.",
    images: [
      {
        url: "https://toolstack.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolStack Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolStack — Free AI & Utility Tools",
    description: "Access 57+ premium, completely free utility tools for developers, marketers, and creators. No paywalls and no forced sign-ups. Experience the frictionless arsenal.",
    images: ["https://toolstack.tech/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to third-party origins for faster resource loading */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MNRHVXL2X9" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MNRHVXL2X9');`}</Script>
        <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2395093382559560" strategy="lazyOnload" crossOrigin="anonymous" />
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
                "https://www.linkedin.com/company/toolstacktech"
              ],
              "description": "57+ free online AI & utility tools for writers, marketers, and developers."
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is ToolStack really free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Every tool on ToolStack is 100% free with no signup, no subscription, and no hidden paywalls. ToolStack was built as a direct response to the modern web over-monetising simple utilities — the anti-friction philosophy means instant access to every tool."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What kinds of tools does ToolStack offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ToolStack offers 60+ tools across 10 categories: AI & writing tools (prompt generator, grammar checker, paraphrasing tool), developer tools (JSON formatter, JWT decoder, regex tester, SQL formatter), finance calculators (VAT, mortgage, salary), SEO tools (meta description generator, YouTube tag generator), card collecting tools (grading profit calculator, card flip ROI, eBay offer calculator), and more."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to create an account to use ToolStack?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. ToolStack requires no account, no signup, and no email. Every tool works instantly in your browser. Most tools run entirely client-side, meaning your data never leaves your device."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Who built ToolStack?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ToolStack was built by Justin Pirrie, a solo developer, over three months. It launched in 2026 and reached #1 on r/SideProject with 6,100 views in 24 hours. The mission is to give everyone frictionless access to premium-quality utilities without paywalls or forced signups."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which AI tools are available on ToolStack?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ToolStack's AI tools include an AI Prompt Generator (using RISEN, STAR, and 5 other frameworks for ChatGPT, Claude & Gemini), a Grammar Checker powered by GPT-4o, a Paraphrasing Tool with 6 rewrite modes, a Text Summarizer with 4 output formats, a Blog Title Generator, an AI Color Palette Generator, and a Hashtag Generator for Instagram, TikTok, and LinkedIn."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What developer tools does ToolStack have?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ToolStack's developer tools include a JSON Formatter and validator, JWT Decoder, Regex Tester with live highlighting, SQL Formatter, Base64 Encoder/Decoder, UUID Generator (v4, v1, v5, ULID, NanoID), Unix Timestamp Converter, Code Diff Checker, CSS Gradient Generator, and a Favicon Generator. All run in the browser with no backend required."
                  }
                }
              ]
            }),
          }}
        />
        <Navbar />
        <CommandPalette />
        <SmartPasteListener />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
