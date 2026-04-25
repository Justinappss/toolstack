import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact — ToolStack",
    description: "Get in touch with the ToolStack team. We'd love to hear from you — feedback, questions, partnerships or bug reports.",
    alternates: { canonical: "https://toolstack.tech/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
