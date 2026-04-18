import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Case Converter — camelCase, snake_case, Title Case & More | ToolStack",
  description: "Convert text between 10+ case formats instantly: UPPERCASE, lowercase, camelCase, snake_case, kebab-case, PascalCase, and more. Free, no signup.",
  keywords: [
    "case converter",
    "text case converter",
    "uppercase to lowercase",
    "lowercase to uppercase",
    "title case converter",
    "sentence case converter",
    "camelCase converter",
    "snake_case converter",
    "kebab-case converter",
    "PascalCase converter",
    "online case converter",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/case-converter",
  },
  openGraph: {
    title: "Free Case Converter — camelCase, snake_case, Title Case & More | ToolStack",
    description: "Convert text between 10+ case formats instantly: UPPERCASE, lowercase, camelCase, snake_case, kebab-case, PascalCase, and more.",
    url: "https://toolstack.tech/tools/case-converter",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Case Converter — camelCase, snake_case, Title Case & More | ToolStack",
    description: "Convert text between UPPERCASE, lowercase, camelCase, snake_case, kebab-case, PascalCase, and more. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
