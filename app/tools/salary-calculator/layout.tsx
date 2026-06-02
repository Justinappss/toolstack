import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Salary Calculator — UK Take-Home Pay 2025/26 & US Federal | ToolStack',
    description: 'Free salary calculator for UK and US. Full PAYE breakdown with income tax, National Insurance, pension and student loan for UK. Federal tax and FICA for US. Annual and monthly take-home pay instantly.',
    keywords: ['salary calculator uk', 'take home pay calculator', 'salary after tax uk 2025', 'uk paye calculator', 'national insurance calculator', 'us salary calculator', 'federal tax calculator'],
    alternates: { canonical: 'https://toolstack.tech/tools/salary-calculator' },
    openGraph: {
      type: 'website',
      title: 'Salary Calculator — UK Take-Home Pay 2025/26 & US Federal | ToolStack',
      description: 'Full UK PAYE and US Federal take-home pay calculations. Income tax, NI, pension and student loan for UK. Federal tax and FICA for US. Free, no signup.',
      url: 'https://toolstack.tech/tools/salary-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Free Salary Calculator — UK & US Take-Home Pay', description: 'Full UK PAYE 2025/26 and US Federal take-home pay. Income tax, NI, pension, student loan. Free.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Salary Calculator — UK & US Take-Home Pay",
        "description": "Free salary calculator for UK and US. Full PAYE breakdown with income tax, National Insurance, pension and student loan for UK. Federal tax and FICA for US.",
        "url": "https://toolstack.tech/tools/salary-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Finance Tools","item":"https://toolstack.tech/tools/category/finance"},{"@type":"ListItem","position":4,"name":"Salary Calculator","item":"https://toolstack.tech/tools/salary-calculator"}]}' }} />
      {children}
    </>
  );
}
