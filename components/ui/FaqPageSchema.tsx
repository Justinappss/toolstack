import React from "react";

interface FAQ {
    q: string;
    a: string;
}

interface FaqPageSchemaProps {
    faqs: FAQ[];
}

export function FaqPageSchema({ faqs }: FaqPageSchemaProps) {
    if (!faqs || faqs.length === 0) return null;

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
    );
}
