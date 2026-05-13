export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://toolstack.tech/blog"},{"@type":"ListItem","position":3,"name":"Why Every AI Tool Has a Paywall Problem (And How to Fix It)","item":"https://toolstack.tech/blog/why-every-ai-tool-has-a-paywall-problem"}]}' }} />

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "Why Every AI Tool Has a Paywall Problem — And What We Did About It",
                "description": "Most AI tools hide behind paywalls. ToolStack offers 58+ free AI tools with no signup. Here's why that matters.",
                "thumbnailUrl": "https://img.youtube.com/vi/r_icDDPLJ4U/maxresdefault.jpg",
                "embedUrl": "https://www.youtube.com/embed/r_icDDPLJ4U",
                "uploadDate": "2026-05-09",
                "duration": "PT5M",
                "contentUrl": "https://www.youtube.com/watch?v=r_icDDPLJ4U",
            }) }} />
      {children}
    </>
  );
}
