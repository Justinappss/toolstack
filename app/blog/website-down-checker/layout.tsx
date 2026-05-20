export default function Layout({ children }: { children: React.ReactNode }) {
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://toolstack.tech/blog" },
            { "@type": "ListItem", "position": 3, "name": "Website Down Checker", "item": "https://toolstack.tech/blog/website-down-checker" },
        ],
    };

    const video = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Website Down Checker: How to Know If Your Site Is Down in 10 Seconds",
        "description": "How to check if your website is down using a free website down checker, set up automatic alerts, and fix the problem fast.",
        "thumbnailUrl": "https://img.youtube.com/vi/A92kyI445JE/maxresdefault.jpg",
        "uploadDate": "2026-05-20",
        "embedUrl": "https://www.youtube.com/embed/A92kyI445JE",
        "contentUrl": "https://youtu.be/A92kyI445JE",
        "publisher": {
            "@type": "Organization",
            "name": "ToolStack",
            "url": "https://toolstack.tech",
        },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(video) }} />
            {children}
        </>
    );
}
