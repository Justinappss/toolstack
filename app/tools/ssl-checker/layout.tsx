import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SSL Certificate Checker — Check SSL Validity & Expiry",
    description: "Check any website's SSL certificate instantly. See if it's valid, how many days until it expires, the issuer, and which domains it covers. Free, no signup.",
    keywords: [
        "ssl certificate checker",
        "ssl checker",
        "ssl expiry checker",
        "check ssl certificate",
        "ssl certificate validity checker",
        "https checker",
        "ssl certificate expiry",
        "ssl certificate lookup",
        "website ssl checker",
        "ssl certificate tool",
    ],
    alternates: { canonical: "https://toolstack.tech/tools/ssl-checker" },
    openGraph: {
        title: "SSL Certificate Checker — Check SSL Validity & Expiry",
        description: "Check any website's SSL certificate. See validity, expiry date, issuer and covered domains. Free, no signup.",
        url: "https://toolstack.tech/tools/ssl-checker",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "SSL Certificate Checker — Check SSL Validity & Expiry",
        description: "Check SSL certificate validity, expiry and issuer for any website. Free, instant.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
