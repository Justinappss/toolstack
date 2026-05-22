export default function Layout({ children }: { children: React.ReactNode }) {
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://toolstack.tech/blog" },
            { "@type": "ListItem", "position": 3, "name": "Google AI Search Redesign 2026", "item": "https://toolstack.tech/blog/google-ai-search-redesign-2026" },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            {children}
        </>
    );
}
