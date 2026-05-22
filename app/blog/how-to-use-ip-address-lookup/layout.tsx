import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "How to Use an IP Address Lookup Tool — Complete Guide 2026",
    description:
      "Learn how to use an IP address lookup tool to reveal geolocation, ISP, VPN status, and more. Free guide with real use cases, common mistakes, and a free tool — no signup needed.",
    keywords: [
      "how to use ip address lookup",
      "ip address lookup",
      "ip address lookup tool",
      "what does ip address lookup show",
      "ip geolocation",
      "check ip address",
      "free ip lookup",
      "ip address tracker",
      "vpn checker",
      "ip address 2026",
    ],
    alternates: {
      canonical: "https://toolstack.tech/blog/how-to-use-ip-address-lookup",
    },
    openGraph: {
      type: "article",
      title: "How to Use an IP Address Lookup Tool — Complete Guide 2026",
      description:
        "Reveal geolocation, ISP, VPN status and more from any IP. Free step-by-step guide with real use cases — no signup required.",
      url: "https://toolstack.tech/blog/how-to-use-ip-address-lookup",
      siteName: "ToolStack",
      images: [
        {
          url: "https://toolstack.tech/blog/how-to-use-ip-address-lookup/hero-banner.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "How to Use an IP Address Lookup Tool — Free Guide 2026",
      description:
        "Reveal geolocation, ISP, VPN status and more from any IP. Free step-by-step guide — no signup.",
      images: ["https://toolstack.tech/blog/how-to-use-ip-address-lookup/hero-banner.png"],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Use an IP Address Lookup Tool — Complete Guide 2026",
    description:
      "Learn how to use an IP address lookup tool to reveal geolocation, ISP, VPN status, and more. Free guide with real use cases and common mistakes.",
    url: "https://toolstack.tech/blog/how-to-use-ip-address-lookup",
    datePublished: "2026-05-22",
    dateModified: "2026-05-22",
    author: {
      "@type": "Person",
      name: "Justin Pirrie",
      url: "https://www.linkedin.com/in/justin-pirrie/",
    },
    publisher: {
      "@type": "Organization",
      name: "ToolStack",
      logo: {
        "@type": "ImageObject",
        url: "https://toolstack.tech/favicon.png",
      },
    },
    image: "https://toolstack.tech/blog/how-to-use-ip-address-lookup/hero-banner.png",
    mainEntityOfPage: "https://toolstack.tech/blog/how-to-use-ip-address-lookup",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Use an IP Address Lookup Tool",
    description: "A step-by-step guide to using a free IP address lookup tool to reveal geolocation, ISP, VPN status, and more.",
    totalTime: "PT5M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Find your public IP address",
        text: "Go to toolstack.tech/tools/ip-address-lookup — your public IP is detected and displayed automatically.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Read the results",
        text: "Review the geolocation, ISP, organisation, ASN, timezone, hostname, and proxy/VPN detection fields.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Look up any IP address",
        text: "Paste any public IP address into the input field to investigate it — useful for suspicious logins, bot traffic, or network troubleshooting.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Interpret the data correctly",
        text: "Understand what each field means: geolocation is accurate to city level (50–75%), not street level. Datacenter IPs indicate bots or VPNs, not real users.",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does an IP address lookup show?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An IP address lookup reveals the country, region, and city the IP is registered to, the ISP (Internet Service Provider), the organisation or hosting company, the ASN (Autonomous System Number), the timezone, the hostname, and whether the IP is flagged as a VPN, proxy, or datacenter.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate is IP address geolocation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Country-level accuracy is over 99%. Region or state level is 80–90% accurate. City-level is 50–75% accurate. Street-level geolocation is not reliable — IP lookup shows where an ISP registered the IP block, not the user's exact physical location.",
        },
      },
      {
        "@type": "Question",
        name: "Can I look up someone else's IP address?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can look up any public IP address. Looking up IPs that have contacted your server or website is legal in virtually all jurisdictions. Using IP lookup to track individuals without consent may violate privacy law, including GDPR in the EU.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between a public and private IP address?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A private IP (e.g. 192.168.x.x or 10.x.x.x) is your address on a local network and cannot be looked up externally. A public IP is assigned by your ISP and is what the internet sees. IP lookup tools only work with public IP addresses.",
        },
      },
      {
        "@type": "Question",
        name: "How do I check if my VPN is working using an IP lookup?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Run an IP lookup before connecting to your VPN and note your country and ISP. Connect to the VPN, then run the lookup again. If the country and ISP have changed, your VPN is working correctly.",
        },
      },
      {
        "@type": "Question",
        name: "Why does my IP address show the wrong city?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IP geolocation shows where your ISP registered the IP block, not your physical location. Your ISP may have registered IP ranges in a different city or region. Mobile data IPs often geolocate to a cell tower city rather than your actual location.",
        },
      },
      {
        "@type": "Question",
        name: "What is an ASN in an IP lookup?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ASN stands for Autonomous System Number. It identifies the network or organisation that controls a block of IP addresses. If an IP's ASN belongs to Amazon Web Services, Google Cloud, or DigitalOcean, it's likely a server or bot, not a real person.",
        },
      },
      {
        "@type": "Question",
        name: "Is IP address lookup free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. ToolStack's IP address lookup tool is completely free with no account required. Visit toolstack.tech/tools/ip-address-lookup to check any IP instantly.",
        },
      },
    ],
  };

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "IP Address Lookup: What It Reveals & How to Use It Free (2026)",
    description: "A complete walkthrough of how to use a free IP address lookup tool — geolocation, ISP, VPN detection, use cases, and common mistakes explained.",
    thumbnailUrl: "https://toolstack.tech/blog/how-to-use-ip-address-lookup/hero-banner.png",
    uploadDate: "2026-05-22",
    embedUrl: "https://www.youtube.com/embed/wArK7NN0kg4",
    url: "https://youtu.be/wArK7NN0kg4",
    publisher: {
      "@type": "Organization",
      name: "ToolStack",
      logo: { "@type": "ImageObject", url: "https://toolstack.tech/favicon.png" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://toolstack.tech" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://toolstack.tech/blog" },
      { "@type": "ListItem", position: 3, name: "How to Use an IP Address Lookup", item: "https://toolstack.tech/blog/how-to-use-ip-address-lookup" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
