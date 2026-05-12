export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://toolstack.tech/blog"},{"@type":"ListItem","position":3,"name":"Free Meta Description Generator: Stop Google Rewriting Your Snippets","item":"https://toolstack.tech/blog/free-meta-description-generator"}]}' }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Free Meta Description Generator — Stop Google Rewriting Your Snippets",
        "description": "Generate SEO-optimised meta descriptions free",
        "thumbnailUrl": "https://img.youtube.com/vi/tgoaNpOkV7c/maxresdefault.jpg",
        "embedUrl": "https://www.youtube.com/embed/tgoaNpOkV7c",
        "uploadDate": "2026-05-12",
        "duration": "PT7M"
      }) }} />
      {children}
    </>
  );
}
