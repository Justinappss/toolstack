import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "How to Tailor a Cover Letter to a Job Description Fast — Free in 2026",
    description:
      "Tailored cover letters get 53% more callbacks. Learn the 5-step method to match any cover letter to any job description in under 30 minutes — free AI tool included, no signup.",
    keywords: [
      "how to tailor a cover letter",
      "tailor cover letter to job description",
      "tailored cover letter",
      "cover letter customization",
      "free cover letter generator",
      "AI cover letter 2026",
      "cover letter tips 2026",
      "how to write a cover letter fast",
      "cover letter keywords",
    ],
    alternates: {
      canonical:
        "https://toolstack.tech/blog/how-to-tailor-cover-letter-to-job-description",
    },
    openGraph: {
      type: "article",
      title:
        "How to Tailor a Cover Letter to a Job Description Fast — Free in 2026",
      description:
        "Tailored cover letters get 53% more callbacks. 5-step method, free AI tool, before/after examples. No signup required.",
      url: "https://toolstack.tech/blog/how-to-tailor-cover-letter-to-job-description",
      siteName: "ToolStack",
      images: [
        {
          url: "https://toolstack.tech/blog/thumbnail-cover-letter.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        "How to Tailor a Cover Letter to Any Job in 30 Minutes — Free",
      description:
        "Tailored cover letters get 53% more callbacks. Free 5-step guide + AI tool, no account needed.",
      images: ["https://toolstack.tech/blog/thumbnail-cover-letter.png"],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "How to Tailor a Cover Letter to a Job Description Fast — Free in 2026",
    description:
      "Tailored cover letters get 53% more callbacks. Learn the 5-step method to match any cover letter to any job description in under 30 minutes.",
    url: "https://toolstack.tech/blog/how-to-tailor-cover-letter-to-job-description",
    datePublished: "2026-05-21",
    dateModified: "2026-05-21",
    author: {
      "@type": "Person",
      name: "Justin Pirrie",
      url: "https://www.linkedin.com/in/justin-pirrie/",
    },
    publisher: {
      "@type": "Organization",
      name: "ToolStack",
      logo: {
        "@type": "ImageObject",
        url: "https://toolstack.tech/favicon.png",
      },
    },
    image: "https://toolstack.tech/blog/thumbnail-cover-letter.png",
    mainEntityOfPage:
      "https://toolstack.tech/blog/how-to-tailor-cover-letter-to-job-description",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Tailor a Cover Letter to a Job Description",
    description:
      "A 5-step method for tailoring any cover letter to a specific job description in under 30 minutes, for free.",
    totalTime: "PT30M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Extract keywords from the job description",
        text: "Copy the job description and identify the 5–8 most repeated verbs and nouns — these are what the hiring manager cares most about.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Score your background against the requirements",
        text: "Map each keyword to a specific achievement or experience from your background.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Write a tailored opening paragraph",
        text: "Open with the company's top priority and your most relevant achievement — answer their biggest need in the first two sentences.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Match your achievements to their priorities",
        text: "Replace generic claims with quantified, role-specific accomplishments that mirror the job description's language.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Generate and refine with AI",
        text: "Use ToolStack's free cover letter generator with your tailored inputs to produce a polished draft in seconds — no account required.",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long should a tailored cover letter be?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "One page maximum — 3 to 4 paragraphs. Hiring managers spend an average of 7 seconds scanning a cover letter, so shorter and more targeted always wins.",
        },
      },
      {
        "@type": "Question",
        name: "Is it OK to use AI to write a cover letter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — 70% of job seekers already use AI for cover letters, and only 18% of hiring managers can correctly identify AI-written content. The key is personalising the output to the specific role and company.",
        },
      },
      {
        "@type": "Question",
        name: "How do I tailor a cover letter quickly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the 5-step method: extract 5–8 keywords from the job description, map them to your achievements, rewrite the opening paragraph, swap in role-specific language, then use a free AI tool to polish the draft.",
        },
      },
      {
        "@type": "Question",
        name: "What keywords should I include in a tailored cover letter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mirror verbs and nouns that appear 3+ times in the job posting — especially skills, methodologies, and outcomes. If the posting says 'cross-functional collaboration', use that exact phrase once.",
        },
      },
      {
        "@type": "Question",
        name: "Does tailoring a cover letter really make a difference?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Significantly. Tailored cover letters produce a 53% higher callback rate than no cover letter and 31% more interviews than a generic one. Candidates who tailor are 1.9x more likely to land an interview.",
        },
      },
      {
        "@type": "Question",
        name: "How do I tailor a cover letter if I have a career gap?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Focus on transferable skills and any projects, freelance work, or learning completed during the gap. Address it briefly and confidently in one sentence, then pivot immediately to your most relevant strength for the role.",
        },
      },
      {
        "@type": "Question",
        name: "What is the fastest free way to tailor a cover letter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use ToolStack's free AI cover letter generator. Enter the job title, company name, and a description of your most relevant experience for that role. Select your tone and generate in seconds — no account required.",
        },
      },
      {
        "@type": "Question",
        name: "How many tailored cover letters should I send per week?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quality beats quantity. 5 highly tailored applications outperform 50 generic ones. With the 5-step method and a free AI tool, each tailored letter takes under 30 minutes.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://toolstack.tech",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://toolstack.tech/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "How to Tailor a Cover Letter to a Job Description",
        item: "https://toolstack.tech/blog/how-to-tailor-cover-letter-to-job-description",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
