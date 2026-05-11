export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://toolstack.tech/blog"},{"@type":"ListItem","position":3,"name":"What Is an SEO Tool? DIY SEO Tools Guide: Boost Your Rankings in 2026","item":"https://toolstack.tech/blog/complete-guide-to-free-seo-tools"}]}' }} />
      {children}
    </>
  );
}
