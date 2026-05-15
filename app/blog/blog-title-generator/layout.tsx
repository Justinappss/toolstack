export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://toolstack.tech/blog"},{"@type":"ListItem","position":3,"name":"SEO Blog Title Generator: Write Titles That Rank and Get Clicked","item":"https://toolstack.tech/blog/blog-title-generator"}]}' }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Blog Title Generator – Free Tool That Writes 10 SEO Titles Instantly",
        "description": "Generate 10 SEO-optimised blog titles in 10 seconds — no login, no paywall",
        "thumbnailUrl": "https://img.youtube.com/vi/Q-ANgok15rk/maxresdefault.jpg",
        "embedUrl": "https://www.youtube.com/embed/Q-ANgok15rk",
        "uploadDate": "2026-05-15T00:00:00+00:00",
        "duration": "PT7M13S"
      }) }} />
      {children}
    </>
  );
}
