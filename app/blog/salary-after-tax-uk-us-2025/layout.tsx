export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://toolstack.tech/blog"},{"@type":"ListItem","position":3,"name":"Salary After Tax UK vs US 2025","item":"https://toolstack.tech/blog/salary-after-tax-uk-us-2025"}]}' }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "Salary After Tax 2025: UK vs US — What You Actually Take Home",
                "description": "UK PAYE + National Insurance breakdown vs US Federal + FICA — complete take-home pay comparison with calculator.",
                "thumbnailUrl": "https://img.youtube.com/vi/piA8aP3ehrg/maxresdefault.jpg",
                "embedUrl": "https://www.youtube-nocookie.com/embed/piA8aP3ehrg",
                "url": "https://youtu.be/piA8aP3ehrg",
                "uploadDate": "2026-05-28",
                "duration": "PT8M"
            }) }} />
            {children}
        </>
    );
}
