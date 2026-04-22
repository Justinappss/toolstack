import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "IP Address Lookup — Find Your IP, Location & ISP",
    description: "Find your public IP address instantly. See your location, ISP, timezone, hostname and coordinates. Also look up any IP address for geolocation data. Free, no signup.",
    keywords: [
        "ip address lookup",
        "what is my ip address",
        "my ip address",
        "ip geolocation",
        "ip location finder",
        "find my ip",
        "ip address checker",
        "what is my ip",
        "ip lookup tool",
        "ip address location",
    ],
    alternates: { canonical: "https://toolstack.tech/tools/ip-address-lookup" },
    openGraph: {
        title: "IP Address Lookup — Find Your IP, Location & ISP",
        description: "Find your public IP address, location, ISP, timezone and more. Free, instant, no signup.",
        url: "https://toolstack.tech/tools/ip-address-lookup",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "IP Address Lookup — Find Your IP, Location & ISP",
        description: "Find your IP address, location, ISP and timezone instantly. Free, no signup.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
