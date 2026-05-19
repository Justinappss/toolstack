import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Password Breach Checker — Free, 100% Private | ToolStack",
    description: "Check if your password was exposed in a data breach. Uses k-anonymity — your password never leaves your device. Checks 900M+ breached passwords instantly. No signup.",
    keywords: ["password breach checker", "have i been pwned", "password leak checker", "check password breach", "hibp password check", "pwned passwords", "data breach password check"],
    alternates: {
        canonical: "https://toolstack.tech/tools/password-breach-checker",
    },
    openGraph: {
        title: "Password Breach Checker — Free, 100% Private | ToolStack",
        description: "Check if your password was exposed in a data breach. K-anonymity keeps your password completely private — it never leaves your device.",
        url: "https://toolstack.tech/tools/password-breach-checker",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Password Breach Checker — Free, 100% Private | ToolStack",
        description: "Check if your password was exposed in a data breach. K-anonymity keeps your password completely private — it never leaves your device.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
