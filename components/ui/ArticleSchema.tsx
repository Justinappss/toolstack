import React from "react";

interface FAQ {
    question: string;
    answer: string;
}

interface ArticleSchemaProps {
    headline: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified: string;
    faqs?: FAQ[];
}

export function ArticleSchema({
    headline,
    description,
    url,
    datePublished,
    dateModified,
    faqs = []
}: ArticleSchemaProps) {
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": headline,
        "description": description,
        "author": {
            "@type": "Person",
            "name": "Justin Pirrie",
            "url": "https://www.linkedin.com/in/justin-pirrie/",
            "jobTitle": "Founder",
            "worksFor": {
                "@type": "Organization",
                "name": "ToolStack"
            }
        },
        "publisher": {
            "@type": "Organization",
            "name": "ToolStack",
            "logo": {
                "@type": "ImageObject",
                "url": "https://toolstack.tech/logo.svg"
            },
            "sameAs": [
                "https://www.linkedin.com/in/justin-pirrie/"
            ]
        },
        "datePublished": datePublished,
        "dateModified": dateModified,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    };

    const faqJsonLd = faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
        </>
    );
}
