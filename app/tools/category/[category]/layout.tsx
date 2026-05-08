import { Metadata } from "next";
import { CATEGORY_MAP } from "../../tool-data";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categoryParam = category.toLowerCase();
  const activeCategory = CATEGORY_MAP[categoryParam] || "Professional";

  return {
    title: `Free ${activeCategory} Tools & Utilities | ToolStack`,
    description: `A collection of free, high-performance ${activeCategory} tools. No signup, no ads, instant results. Built for modern professional workflows.`,
    alternates: {
      canonical: `https://toolstack.tech/tools/category/${categoryParam}`,
    },
    openGraph: {
      title: `Free ${activeCategory} Tools | ToolStack`,
      description: `A collection of free, high-performance ${activeCategory.toLowerCase()} tools. No signup, no ads, instant results.`,
      url: `https://toolstack.tech/tools/category/${categoryParam}`,
      siteName: "ToolStack",
      type: "website",
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
