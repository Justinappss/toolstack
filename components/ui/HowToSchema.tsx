import React from "react";

interface HowToStep {
    name: string;
    text: string;
    url?: string;
    image?: string;
}

interface HowToSchemaProps {
    name: string;
    description: string;
    steps: HowToStep[];
    image?: string;
    totalTime?: string;
}

export function HowToSchema({ name, description, steps, image, totalTime }: HowToSchemaProps) {
    if (!steps || steps.length === 0) return null;

    const howToJsonLd: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        step: steps.map((step, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: step.name,
            text: step.text,
            ...(step.url ? { url: step.url } : {}),
            ...(step.image ? { image: step.image } : {}),
        })),
    };

    if (image) {
        howToJsonLd.image = image;
    }

    if (totalTime) {
        howToJsonLd.totalTime = totalTime;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
    );
}