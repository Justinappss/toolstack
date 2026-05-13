export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://toolstack.tech/blog"},{"@type":"ListItem","position":3,"name":"Prompt Engineering: A Complete Guide to Writing Better AI Prompts","item":"https://toolstack.tech/blog/ai-prompt-generator-guide"}]}' }} />

            <script type="application/ld+json" dangerouslySetInnerHTML={ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "Prompt Engineering Guide — Free AI Prompt Generator Tutorial",
                "description": "Learn prompt engineering with the RISEN framework and other techniques. Free AI prompt generator included.",
                "thumbnailUrl": "https://img.youtube.com/vi/91vbYjjgBKQ/maxresdefault.jpg",
                "embedUrl": "https://www.youtube.com/embed/91vbYjjgBKQ",
                "uploadDate": "2026-05-11",
                "duration": "PT5M",
                "contentUrl": "https://www.youtube.com/watch?v=91vbYjjgBKQ",
            }) } />      {children}
    </>
  );
}
