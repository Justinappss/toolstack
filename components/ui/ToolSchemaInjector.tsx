"use client";
import { usePathname } from "next/navigation";
import { ALL_TOOLS } from "@/app/tools/tool-data";

export function ToolSchemaInjector() {
  const pathname = usePathname();
  const tool = ALL_TOOLS.find(t => t.href === pathname);
  if (!tool) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.title,
    "description": tool.desc,
    "url": `https://toolstack.tech${tool.href}`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
