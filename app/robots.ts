import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      { userAgent: "GPTBot",            allow: "/" },
      { userAgent: "OAI-SearchBot",     allow: "/" },
      { userAgent: "ClaudeBot",         allow: "/" },
      { userAgent: "PerplexityBot",     allow: "/" },
      { userAgent: "Google-Extended",   allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "cohere-ai",         allow: "/" },
      { userAgent: "CCBot",             allow: "/" },
    ],
    sitemap: "https://toolstack.tech/sitemap.xml",
  };
}
