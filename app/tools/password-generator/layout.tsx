import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Password Generator — Secure, Random, No Signup | ToolStack",
  description: "Generate strong, random passwords with custom length and character sets. Runs entirely in your browser — no data ever leaves your device. Free, no signup.",
  keywords: [
    "password generator",
    "strong password generator",
    "random password generator",
    "secure password generator",
    "free password generator",
    "password creator",
    "complex password generator",
    "online password generator",
    "safe password generator",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/password-generator",
  },
  openGraph: {
    title: "Free Password Generator — Secure, Random, No Signup | ToolStack",
    description: "Generate ironclad, cryptographically secure passwords with VaultGuard Pro. 100% client-side security.",
    url: "https://toolstack.tech/tools/password-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Password Generator — Secure, Random, No Signup | ToolStack",
    description: "Generate ironclad, cryptographically secure passwords with VaultGuard Pro. 100% client-side security.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
