import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "Prompt Engineering: A Complete Guide to Writing Better AI Prompts",
    description: "Learn prompt engineering from scratch. The RISEN framework, 5 techniques that work in 2026, privacy tips, and a free AI prompt generator — no signup required.",
    alternates: { canonical: "https://toolstack.tech/blog/ai-prompt-generator-guide" },
    openGraph: {
        title: "Prompt Engineering: A Complete Guide to Writing Better AI Prompts",
        description: "Master prompt engineering with the RISEN framework. Free AI prompt generator included — no signup, no paywall, runs in your browser.",
        url: "https://toolstack.tech/blog/ai-prompt-generator-guide",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-11",
        modifiedTime: "2026-05-11",
        images: [{ url: "https://toolstack.tech/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Prompt Engineering: A Complete Guide to Writing Better AI Prompts",
        description: "Master prompt engineering with the RISEN framework. Free AI prompt generator included — no signup, no paywall, runs in your browser.",
        images: ["https://toolstack.tech/og-image.png"],
    },
};

const FAQS = [
    {
        question: "What is prompt engineering?",
        answer: "Prompt engineering is the practice of writing clear, structured instructions for AI language models like ChatGPT, Claude, or Gemini to get useful, accurate responses. A well-engineered prompt includes context, a specific task, format constraints, and tone guidance. The difference between a vague prompt and a well-structured one can be the difference between a generic paragraph and a genuinely useful output.",
    },
    {
        question: "What is the RISEN framework for prompts?",
        answer: "RISEN stands for Role, Instructions, Steps, End goal, and Narrowing. It is a structured approach to writing AI prompts that consistently produces better results. You start by defining the role the AI should play (e.g. 'you are a senior copywriter'), then the specific instructions, the steps to follow, the desired end goal, and finally any constraints or narrowing parameters like word count, tone, or audience. Using RISEN eliminates the guesswork and produces prompts that work the first time.",
    },
    {
        question: "Does it matter which AI tool I use with my prompts?",
        answer: "The same well-structured prompt generally works across ChatGPT, Claude, Gemini, and other LLMs — but each model has different strengths. Claude excels at long-form reasoning and document analysis. ChatGPT is strong at broad knowledge and conversational tasks. Gemini integrates well with Google Workspace. A good prompt is model-agnostic, but you can tailor it further by specifying the model's strengths in the Role section of your RISEN prompt.",
    },
    {
        question: "Is it safe to put personal information in an AI prompt?",
        answer: "Generally, you should avoid including sensitive personal data — real names of third parties, financial details, medical information, or confidential business data — in AI prompts, especially when using consumer-facing tools. Most major providers use your inputs to improve their models unless you opt out. Our AI Prompt Generator runs entirely in your browser and sends nothing to external servers, so you can build prompts without privacy concerns.",
    },
    {
        question: "How many AI tools can the AI Prompt Generator work with?",
        answer: "The AI Prompt Generator on ToolStack is designed to produce prompts compatible with over 80 AI tools and platforms — including ChatGPT, Claude, Gemini, Midjourney, Stable Diffusion, Perplexity, and more. You can specify the target platform to get a prompt optimised for that tool's specific conventions and capabilities.",
    },
    {
        question: "What is the difference between a system prompt and a user prompt?",
        answer: "A system prompt is a set of persistent instructions given to the AI before the conversation begins — it defines the AI's persona, constraints, and context. A user prompt is the specific request you send in the conversation. Consumer AI tools like ChatGPT typically expose only the user prompt, but developer APIs let you set both. For most use cases, writing a strong user prompt using the RISEN framework is sufficient to get great results without needing system-level access.",
    },
];

const accent = "#6366f1";
const accentBg = "rgba(99,102,241,0.06)";
const accentBorder = "rgba(99,102,241,0.18)";

const toolsLink: React.CSSProperties = {
    color: accent,
    fontWeight: 600,
    textDecoration: "none",
};

const sectionCard: React.CSSProperties = {
    padding: "24px 28px",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    marginBottom: 24,
};

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="Prompt Engineering: A Complete Guide to Writing Better AI Prompts"
                description="Learn prompt engineering from scratch. The RISEN framework, 5 techniques that work in 2026, privacy tips, and a free AI prompt generator — no signup required."
                url="https://toolstack.tech/blog/ai-prompt-generator-guide"
                datePublished="2026-05-11"
                dateModified="2026-05-11"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>Prompt Engineering Guide</span>
                    </div>

                    {/* Tag + meta */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>AI</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>May 11, 2026 · 7 min read</span>
                    </div>

                    {/* H1 */}
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        Prompt Engineering: A Complete Guide to Writing Better AI Prompts
                    </h1>

                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · May 11, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>

                {/* TL;DR */}
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>TL;DR</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Prompt engineering is the single biggest leverage point for getting useful output from any AI model.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ The RISEN framework (Role, Instructions, Steps, End goal, Narrowing) is the most reliable structure for writing prompts that work first time.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ The <Link href="/tools/ai-prompt-generator" style={{ color: accent }}>AI Prompt Generator</Link> builds optimised prompts for 80+ AI tools — free, no signup.</li>
                    </ul>
                </div>

                {/* YouTube Video */}
                <div style={{ marginBottom: 48, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", background: "#000" }}>
                    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                        <iframe
                            src="https://www.youtube.com/embed/91vbYjjgBKQ"
                            title="Prompt Engineering: How to Write Better AI Prompts (RISEN Framework)"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                        />
                    </div>
                    <div style={{ padding: "16px 20px", background: "rgba(255,255,255,0.02)" }}>
                        <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>
                            Watch: Prompt Engineering explained in 7 minutes — the RISEN framework, privacy best practices (4:00), and how to use the free AI Prompt Generator across 80+ tools.
                        </p>
                    </div>
                </div>

                <AdBlock type="horizontal" />

                {/* Body */}
                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>

                    <p style={{ margin: "0 0 22px" }}>
                        Every AI tool you use — ChatGPT, Claude, Gemini, Midjourney, Perplexity — is only as good as the instruction you give it. That instruction is your prompt. And most people write prompts the way they send a text message: casual, vague, and missing half the context the AI needs to do anything useful.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        Prompt engineering fixes that. It is not a technical skill — it does not require coding, a developer account, or any specialist knowledge. It is simply the practice of writing clear, structured instructions that tell the AI exactly what you need, in what format, and with what constraints. Once you understand the principles, every AI interaction becomes faster and more productive.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Why Your Prompts Are Getting Bad Results</h2>
                    <p style={{ margin: "0 0 16px" }}>
                        The most common prompt engineering mistake is treating AI like a search engine. You type a query — &ldquo;write me a marketing email&rdquo; — and you get a generic, unusable response. That is not the AI failing. That is an underspecified instruction.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        Think about what that prompt is missing: Who is the audience? What product? What tone — formal or casual? How long? What call to action? What is the context — cold outreach, existing customer, post-purchase? Without this information, the AI fills in the blanks with the most average possible answer. That is what generic output looks like.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        The fix is not a better AI model. It is a better prompt. The same model that gave you a generic email will produce something genuinely usable when you give it the context it needs.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The RISEN Framework</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        RISEN is the most reliable prompt structure for consistent, high-quality results. It stands for:
                    </p>
                    <div style={sectionCard}>
                        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                            <li style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                                <strong style={{ color: "white", fontFamily: "monospace", fontSize: 13, background: "rgba(99,102,241,0.15)", padding: "2px 8px", borderRadius: 4, marginRight: 10 }}>R</strong>
                                <strong style={{ color: "white" }}>Role</strong> — Define who the AI is playing. &ldquo;You are a senior copywriter with 10 years of experience in SaaS.&rdquo; This anchors the AI&apos;s persona and determines its default tone, vocabulary, and perspective.
                            </li>
                            <li style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                                <strong style={{ color: "white", fontFamily: "monospace", fontSize: 13, background: "rgba(99,102,241,0.15)", padding: "2px 8px", borderRadius: 4, marginRight: 10 }}>I</strong>
                                <strong style={{ color: "white" }}>Instructions</strong> — State the specific task clearly. &ldquo;Write a 300-word cold email for a project management tool targeting operations managers at companies with 50–200 employees.&rdquo;
                            </li>
                            <li style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                                <strong style={{ color: "white", fontFamily: "monospace", fontSize: 13, background: "rgba(99,102,241,0.15)", padding: "2px 8px", borderRadius: 4, marginRight: 10 }}>S</strong>
                                <strong style={{ color: "white" }}>Steps</strong> — If the task has a process, spell it out. &ldquo;Start with a subject line, then a one-sentence opener about a common pain point, then three bullet points about benefits, then a single CTA.&rdquo;
                            </li>
                            <li style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                                <strong style={{ color: "white", fontFamily: "monospace", fontSize: 13, background: "rgba(99,102,241,0.15)", padding: "2px 8px", borderRadius: 4, marginRight: 10 }}>E</strong>
                                <strong style={{ color: "white" }}>End goal</strong> — Define what success looks like. &ldquo;The goal is to get the reader to book a 15-minute demo call.&rdquo; This shapes how the AI frames every sentence.
                            </li>
                            <li style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                                <strong style={{ color: "white", fontFamily: "monospace", fontSize: 13, background: "rgba(99,102,241,0.15)", padding: "2px 8px", borderRadius: 4, marginRight: 10 }}>N</strong>
                                <strong style={{ color: "white" }}>Narrowing</strong> — Add constraints. &ldquo;Avoid jargon. Do not use the word &lsquo;solution&rsquo;. Keep it under 250 words. Use a conversational, direct tone.&rdquo; Narrowing prevents the AI from drifting into generic territory.
                            </li>
                        </ul>
                    </div>
                    <p style={{ margin: "0 0 22px" }}>
                        Used together, these five elements eliminate ambiguity. The AI has no reason to guess — you have told it everything it needs. This is why a RISEN prompt almost always outperforms a one-line instruction, even on the same model.
                    </p>

                    <AdBlock type="horizontal" />

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>5 Prompt Engineering Techniques That Work in 2026</h2>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "32px 0 10px" }}>1. Chain of thought</h3>
                    <p style={{ margin: "0 0 22px" }}>
                        Add &ldquo;think step by step&rdquo; or &ldquo;reason through this before answering&rdquo; to any complex prompt. This forces the model to break down the problem before reaching a conclusion, which significantly reduces errors on multi-step tasks like calculations, analysis, and structured arguments.
                    </p>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "32px 0 10px" }}>2. Few-shot examples</h3>
                    <p style={{ margin: "0 0 22px" }}>
                        Include one or two examples of exactly what you want in the prompt. &ldquo;Here is an example of the tone I want: [paste example]. Now write this in the same style.&rdquo; The AI will pattern-match your example rather than defaulting to its own conventions. This is the fastest way to get on-brand output.
                    </p>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "32px 0 10px" }}>3. Output format specification</h3>
                    <p style={{ margin: "0 0 22px" }}>
                        Tell the AI exactly how you want the output structured. &ldquo;Return this as a JSON object with fields: title, summary, bullet_points (array of 5), and call_to_action.&rdquo; Or: &ldquo;Format as a numbered list with a bold heading for each item.&rdquo; Format specification saves you editing time and makes AI output paste-ready.
                    </p>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "32px 0 10px" }}>4. Persona stacking</h3>
                    <p style={{ margin: "0 0 22px" }}>
                        Combine roles for nuanced output. &ldquo;You are a UX writer with a background in psychology, writing for an audience that is technically literate but time-poor.&rdquo; Stacking personas gives the AI a richer frame to work within and produces more specific, less generic responses.
                    </p>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: "32px 0 10px" }}>5. Iterative refinement</h3>
                    <p style={{ margin: "0 0 22px" }}>
                        Treat the first response as a draft, not a final answer. Follow up with specific refinement instructions: &ldquo;Good — now make the opening more direct and cut the third paragraph. Keep everything else.&rdquo; AI models handle iterative feedback well. Most great outputs come from two or three rounds, not one shot.
                    </p>

                    <AdBlock type="horizontal" />

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Privacy: What Not to Put in a Prompt</h2>
                    <p style={{ margin: "0 0 16px" }}>
                        This is important and under-discussed. When you use consumer AI tools like ChatGPT or Gemini, your prompts may be used to improve the model unless you specifically opt out in settings. That means anything you type could, in theory, influence future outputs across the platform.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        Practical rules to follow:
                    </p>
                    <div style={sectionCard}>
                        <ul style={{ margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>Never include real names of private individuals — customers, colleagues, or contacts — in your prompts.</li>
                            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>Never paste financial data, medical records, or legal documents into a consumer AI interface unless you have confirmed data handling terms.</li>
                            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>For confidential business strategy, use the API with data retention disabled, or a self-hosted model.</li>
                            <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>Anonymise examples — use placeholder names like &ldquo;Company X&rdquo; or &ldquo;Customer A&rdquo; instead of real identities.</li>
                        </ul>
                    </div>
                    <p style={{ margin: "0 0 22px" }}>
                        The <Link href="/tools/ai-prompt-generator" style={toolsLink}>AI Prompt Generator</Link> on ToolStack runs entirely in your browser. Nothing you type is sent to an external server — it uses the AI API at point of generation only, and we do not store your prompts.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The AI Prompt Generator: 80+ Tools, Zero Signup</h2>
                    <p style={{ margin: "0 0 16px" }}>
                        Building a RISEN prompt from scratch every time takes practice. The <Link href="/tools/ai-prompt-generator" style={toolsLink}>AI Prompt Generator</Link> does it automatically. Describe what you want to achieve, choose your target AI tool from a list of 80+ platforms, set the tone and format — and it outputs a complete, structured prompt ready to paste.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        It covers ChatGPT, Claude, Gemini, Midjourney, DALL-E, Stable Diffusion, Perplexity, and dozens more. Whether you are generating images, writing copy, analysing data, or building code — the prompt generator produces instructions optimised for each tool&apos;s specific capabilities and conventions.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        No account required. No trial period. No paywall. It runs in your browser and is free to use as many times as you need.
                    </p>

                    {/* CTA */}
                    <div style={{ margin: "52px 0 0", padding: "32px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, textAlign: "center" as const }}>
                        <p style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 8px" }}>Write better prompts in seconds</p>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 20px" }}>Free AI Prompt Generator — builds optimised RISEN prompts for 80+ AI tools. No signup, no credit card, runs entirely in your browser.</p>
                        <Link href="/tools/ai-prompt-generator" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)", color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                            Try the AI Prompt Generator Free →
                        </Link>
                    </div>
                </div>

                {/* FAQs */}
                <div style={{ marginTop: 64 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "0 0 28px" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {FAQS.map(({ question, answer }) => (
                            <div key={question} style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", margin: "0 0 10px" }}>{question}</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Back + related */}
                <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <Link href="/blog" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <ArrowLeft size={14} />
                        Back to Blog
                    </Link>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <Link href="/tools/ai-prompt-generator" style={{ fontSize: 13, fontWeight: 700, color: accent, textDecoration: "none" }}>AI Prompt Generator</Link>
                        <Link href="/tools/grammar-checker" style={{ fontSize: 13, fontWeight: 700, color: accent, textDecoration: "none" }}>Grammar Checker</Link>
                        <Link href="/tools/text-summarizer" style={{ fontSize: 13, fontWeight: 700, color: accent, textDecoration: "none" }}>Text Summariser</Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
