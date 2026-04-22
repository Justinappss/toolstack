import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Decoder — Decode JSON Web Tokens Instantly",
  description: "Decode any JSON Web Token instantly. View the header, payload and signature, check expiry, and inspect all standard claims. Free, no signup, 100% private.",
  keywords: [
    "JWT decoder",
    "JSON web token decoder",
    "decode JWT",
    "JWT parser",
    "JWT token inspector",
    "JWT claims viewer",
    "JWT expiry checker",
    "decode JSON web token online",
    "JWT payload decoder",
    "JWT header decoder",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/jwt-decoder",
  },
  openGraph: {
    title: "JWT Decoder — Decode JSON Web Tokens Instantly",
    description: "Decode any JWT token instantly. View header, payload, signature and expiry. Free, no signup, 100% private.",
    url: "https://toolstack.tech/tools/jwt-decoder",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Decoder — Decode JSON Web Tokens Instantly",
    description: "Decode any JWT instantly. View header, payload, signature and expiry. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
