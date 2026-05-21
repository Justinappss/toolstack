import Image from "next/image";
import Link from "next/link";

const accent = "#6366f1";
const accentDim = "rgba(99,102,241,0.12)";
const accentBorder = "rgba(99,102,241,0.28)";
const bg = "#050505";
const surface = "#0f0f1a";
const border = "rgba(255,255,255,0.07)";
const text = "rgba(255,255,255,0.88)";
const muted = "rgba(255,255,255,0.45)";
const green = "#34d399";
const red = "#f87171";
const amber = "#f59e0b";

const stats = [
  { value: "53%", label: "higher callback rate with a tailored vs no cover letter", source: "HRbrain.ai" },
  { value: "1.9×", label: "more likely to land an interview when you tailor", source: "Resume.io" },
  { value: "78%", label: "of hiring managers can tell when a cover letter is generic", source: "ResumeGenius 2026" },
  { value: "94%", label: "of hiring managers say cover letters influence interview decisions", source: "ResumeGenius 2026" },
  { value: "45%", label: "of hiring managers read the cover letter before the résumé", source: "NovoResume 2026" },
  { value: "250+", label: "applications received per corporate job posting on average", source: "HiringThing 2026" },
  { value: "2–3%", label: "applicant-to-interview ratio in 2026 — down from 8.4% in 2023", source: "HiringThing 2026" },
  { value: "70%", label: "of job seekers now use AI for cover letters and company research", source: "JobCannon 2026" },
];

const steps = [
  {
    num: "01",
    title: "Extract keywords from the job description",
    time: "5 min",
    body: "Copy the full job description into a Google Doc. Use Ctrl+F to find the verbs and nouns that repeat 3+ times — those are the exact signals the hiring manager (and ATS) is looking for. Aim to pull 5–8 priority keywords. Common examples: 'cross-functional collaboration', 'data-driven', 'stakeholder management', 'growth targets'.",
    tip: "Focus on action verbs and outcomes, not just job titles. If 'drove revenue' appears twice, that phrase matters more than the word 'sales'.",
  },
  {
    num: "02",
    title: "Score your background against the requirements",
    time: "5 min",
    body: "Create a two-column list: keywords on the left, your matching achievement on the right. For every keyword you can match with a specific, quantified result — that's a bullet your cover letter must include. If you can only match 4 of 8, focus entirely on those 4 rather than trying to stretch.",
    tip: "Use numbers wherever possible. 'Grew organic traffic' is weak. 'Grew organic traffic 47% in 8 months' is what gets callbacks.",
  },
  {
    num: "03",
    title: "Write a tailored opening paragraph",
    time: "5 min",
    body: "Rewrite your first paragraph from scratch for every application. Open by naming the company's top priority (from the job description) and immediately connect it to your strongest relevant result. Do not open with 'I am writing to apply for'. Open with their problem and your proof.",
    tip: "Generic opener vs tailored opener — see the before/after section below. The difference is what gets a recruiter to keep reading.",
  },
  {
    num: "04",
    title: "Match your achievements to their priorities",
    time: "10 min",
    body: "For each body paragraph, lead with a keyword from the job description, then back it up with a specific achievement. Mirror their language exactly — if they say 'cross-functional collaboration', don't paraphrase it as 'teamwork'. ATS systems and human readers both reward linguistic alignment.",
    tip: "Keep each paragraph to one theme. One keyword → one achievement → one measurable outcome. Three tight paragraphs beat six vague ones.",
  },
  {
    num: "05",
    title: "Generate and refine with AI in seconds",
    time: "2 min",
    body: "Open ToolStack's free cover letter generator. In the job title field, use the exact role title from the posting. In the background field, paste your two or three most keyword-matched achievements from Step 2. Choose your tone — Professional for corporate, Confident for startups, Creative for agencies — and generate. Edit the output with your real name, numbers, and any details the AI generalised.",
    tip: "The AI gives you the structure and phrasing. You supply the specifics. That combination is what sounds human and passes ATS.",
  },
];

const quotes = [
  {
    quote: "A tailored cover letter isn't a courtesy — it's competitive intelligence. You're showing the hiring manager that you read the brief and you understand what they actually need.",
    name: "Amanda Augustine",
    title: "Career Expert, TopResume",
  },
  {
    quote: "The cover letter is your first test of whether you can do the job. Can you identify what matters most, communicate clearly, and make a case for yourself? Hiring managers are watching for exactly that.",
    name: "Brie Weiler Reynolds",
    title: "Former Career Development Manager, FlexJobs",
  },
  {
    quote: "Our 2026 survey data shows 81% of recruiters rate job-specific tailoring as 'important' or 'very important' — yet fewer than a third of applicants actually do it. That gap is the opportunity.",
    name: "ResumeGenius Research Team",
    title: "2026 Hiring Manager Survey, n=625",
  },
];

const comparisonTools = [
  { feature: "Price", toolstack: "Free", grammarly: "Freemium", enhancv: "Freemium", chatgpt: "Free (limited)" },
  { feature: "Login required", toolstack: "No", grammarly: "Yes", enhancv: "Yes", chatgpt: "Yes" },
  { feature: "Tone modes", toolstack: "4 modes", grammarly: "Manual edits", enhancv: "Limited", chatgpt: "Manual prompting" },
  { feature: "Unlimited uses", toolstack: "Yes", grammarly: "No (daily cap)", enhancv: "No", chatgpt: "No (rate limits)" },
  { feature: "Job description field", toolstack: "Via background", grammarly: "No", enhancv: "Yes", chatgpt: "Via prompt" },
  { feature: "ATS-friendly output", toolstack: "Yes", grammarly: "Partial", enhancv: "Yes", chatgpt: "Manual formatting" },
  { feature: "Export / download", toolstack: "Copy to clipboard", grammarly: "Premium only", enhancv: "PDF (paid)", chatgpt: "Copy only" },
  { feature: "Time to generate", toolstack: "~10 seconds", grammarly: "~30 seconds", enhancv: "~20 seconds", chatgpt: "~60 seconds" },
  { feature: "Setup time", toolstack: "0 min", grammarly: "5 min (account)", enhancv: "5 min (account)", chatgpt: "2 min (account)" },
];

const faqs = [
  {
    q: "How long should a tailored cover letter be?",
    a: "One page maximum — 3 to 4 paragraphs. Hiring managers spend an average of 7 seconds scanning a cover letter, so shorter and more targeted always wins. Aim for 250–350 words.",
  },
  {
    q: "Is it OK to use AI to write a tailored cover letter?",
    a: "Yes — 70% of job seekers already use AI for cover letters, and only 18% of hiring managers can correctly identify AI-written content. The key is personalising the output with your real achievements, specific numbers, and role-specific language. Generic AI output gets rejected. Personalised AI output gets interviews.",
  },
  {
    q: "How many keywords should I include in a tailored cover letter?",
    a: "Mirror 5–8 keywords from the job description. Focus on verbs and nouns that appear 3+ times in the posting — especially skills, methodologies, and outcome phrases. If the posting says 'cross-functional collaboration', use that exact phrase at least once.",
  },
  {
    q: "Does tailoring a cover letter really make a difference?",
    a: "Significantly. Tailored cover letters produce a 53% higher callback rate than no cover letter and 31% more callbacks than a generic one. Candidates who tailor are 1.9x more likely to land an interview. And 74% of recruiters say tailoring directly leads to interview invitations.",
  },
  {
    q: "How do I tailor a cover letter if I have a career gap?",
    a: "Acknowledge the gap in one confident sentence, then pivot immediately to what you bring. Focus on transferable skills, freelance or project work during the gap, and any learning (courses, certifications) you completed. Then spend the rest of the letter showing how your experience matches their priorities.",
  },
  {
    q: "What is the fastest free way to tailor a cover letter?",
    a: "Use ToolStack's free AI cover letter generator. Extract 2–3 key requirements from the job description. Enter the job title, company name, and paste those requirements into the background field as your relevant experience. Select tone. Generate in seconds — no account required.",
  },
  {
    q: "How many tailored cover letters should I send per week?",
    a: "Quality beats quantity. 5 highly tailored applications consistently outperform 50 generic ones in terms of interview conversion. With the 5-step method and a free AI tool, each tailored letter takes under 30 minutes once you have your keyword-achievement bank ready.",
  },
  {
    q: "Should I tailor the cover letter subject line and email too?",
    a: "Yes — start tailoring from the subject line. Use the exact job title and reference number if available. In the email body, write one sentence that mirrors the top requirement in the posting. This signals alignment before the hiring manager even opens the attachment.",
  },
];

const actionPlan = [
  { day: "Day 1", action: "Audit your current cover letter — identify every generic claim and vague phrase. Highlight anything that isn't specific to a role." },
  { day: "Day 2", action: "Build your achievements bank. Write 10 quantified accomplishments from your career (numbers, percentages, timeframes, team sizes)." },
  { day: "Day 3", action: "Practice keyword extraction on 3 job postings you've saved. Build the two-column keyword → achievement map for each." },
  { day: "Day 4", action: "Write one fully tailored cover letter using the 5-step method. Time yourself — first attempt usually takes 25–35 minutes." },
  { day: "Day 5", action: "Apply to one role with your tailored letter and track it. Note the company, role, date sent, and any response timeline." },
  { day: "Day 6", action: "Refine based on what felt slow in Day 4. Improve your achievements bank. Set up a simple tracking spreadsheet." },
  { day: "Day 7", action: "Build your repeatable system — base template + ToolStack generator + keyword checklist. Target 3 tailored applications this week." },
];

const predictions = [
  { date: "H2 2026", text: "ATS platforms will begin scoring cover letters on keyword density in real time, surfacing match scores to applicants before submission — making tailoring mandatory rather than advisory." },
  { date: "Q1 2027", text: "Major job boards including LinkedIn and Indeed will introduce AI-assisted cover letter matching scores visible during the application flow, giving job seekers instant feedback on alignment." },
  { date: "2027+", text: "Cover letters will evolve into dynamic, role-responsive documents — auto-updating from your profile to match each posting, with tone and emphasis adjusting based on company culture signals." },
];

export default function Page() {
  return (
    <div style={{ background: bg, minHeight: "100vh", color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* ── Hero ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          <Link href="/blog" style={{ fontSize: 12, color: muted, textDecoration: "none" }}>Blog</Link>
          <span style={{ color: muted, fontSize: 12 }}>›</span>
          <span style={{ fontSize: 12, color: accent }}>Career & Job Search</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {["Tutorial", "Cover Letters", "AI Tools", "Free"].map(tag => (
            <span key={tag} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, background: accentDim, border: `1px solid ${accentBorder}`, color: accent }}>{tag}</span>
          ))}
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20, color: "white", maxWidth: 820 }}>
          How to Tailor a Cover Letter to a Job Description Fast — Free in 2026
        </h1>
        <p style={{ fontSize: 18, color: muted, lineHeight: 1.7, maxWidth: 680, marginBottom: 28 }}>
          Most cover letters never get read. Tailored ones get 53% more callbacks. Here is the exact 5-step method — and a free AI tool to cut the work to under 30 minutes.
        </p>
        <div style={{ display: "flex", gap: 20, fontSize: 13, color: muted, flexWrap: "wrap", marginBottom: 48, alignItems: "center" }}>
          <span>By <strong style={{ color: text }}>Justin Pirrie</strong></span>
          <span>May 21, 2026</span>
          <span>9 min read</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: green, display: "inline-block" }} />
            Updated for 2026
          </span>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px", display: "grid", gridTemplateColumns: "220px 1fr", gap: 56 }} className="blog-layout">

        {/* ── Sidebar TOC ── */}
        <aside style={{ position: "sticky", top: 100, height: "fit-content", display: "flex", flexDirection: "column", gap: 4 }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: muted, marginBottom: 12 }}>On This Page</p>
          {[
            ["#short-answer", "The Short Answer"],
            ["#why-generic-fails", "Why Generic Fails"],
            ["#five-steps", "5-Step Method"],
            ["#before-after", "Before & After"],
            ["#try-free", "Try It Free"],
            ["#scorecard", "Tailoring Scorecard"],
            ["#case-study", "Case Study"],
            ["#comparison", "Tool Comparison"],
            ["#pros-cons", "Pros & Cons"],
            ["#action-plan", "7-Day Plan"],
            ["#predictions", "2026 Predictions"],
            ["#faq", "FAQ"],
          ].map(([href, label]) => (
            <a key={href} href={href} style={{ fontSize: 13, color: muted, textDecoration: "none", padding: "5px 0 5px 12px", borderLeft: `2px solid ${border}`, transition: "all 0.15s" }}
              onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = text; (e.target as HTMLAnchorElement).style.borderLeftColor = accent; }}
              onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = muted; (e.target as HTMLAnchorElement).style.borderLeftColor = border; }}>
              {label}
            </a>
          ))}
          <a href="https://toolstack.tech/tools/cover-letter-generator" target="_blank" rel="noopener noreferrer"
            style={{ marginTop: 24, padding: "12px 16px", borderRadius: 10, background: accent, color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none", textAlign: "center", display: "block" }}>
            Try Free Tool →
          </a>
        </aside>

        {/* ── Article Body ── */}
        <article style={{ minWidth: 0 }}>

          {/* ── YouTube embed placeholder — add URL when video is ready ── */}
          {/* Uncomment and replace VIDEO_ID once you have the YouTube URL:
          <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
            <iframe src="https://www.youtube.com/embed/VIDEO_ID" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
          <div style={{ padding: "12px 16px", borderRadius: 10, background: surface, marginBottom: 40 }}>
            <p style={{ fontSize: 13, color: muted, margin: 0 }}>Watch: How to tailor a cover letter to any job description in under 30 minutes — free AI tool demo included.</p>
          </div>
          */}

          {/* Audio Overview */}
          <div style={{ padding: "20px 24px", borderRadius: 16, background: surface, border: `1px solid ${border}`, marginBottom: 40 }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>NotebookLM Audio Overview — Deep Dive Podcast</p>
            <p style={{ fontSize: 13, color: muted, marginBottom: 14 }}>Prefer to listen? Full breakdown of the 5-step tailoring method, real stats, and before/after examples — audio format.</p>
            <audio controls style={{ width: "100%", accentColor: accent }}>
              <source src="/blog/how-to-tailor-cover-letter-to-job-description/audio-overview.m4a" type="audio/mp4" />
            </audio>
          </div>

          {/* Direct answer */}
          <div id="short-answer" style={{ padding: "24px 28px", borderRadius: 16, background: accentDim, border: `1px solid ${accentBorder}`, marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, marginBottom: 10 }}>The Short Answer</p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: text, margin: 0 }}>
              Tailor your cover letter by extracting 5–8 priority keywords from the job description, mapping each to a specific achievement, rewriting your opening paragraph to address the company's top need, and generating a polished draft with a free AI tool — total time under 30 minutes.
            </p>
          </div>

          {/* Executive summary */}
          <div style={{ padding: "24px 28px", borderRadius: 16, background: surface, border: `1px solid ${border}`, marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: muted, marginBottom: 16 }}>Key Takeaways</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Tailored cover letters produce 53% more callbacks and make candidates 1.9× more likely to land interviews than generic applications.",
                "78% of hiring managers can immediately identify a generic cover letter — which means the other 22% are the only ones your generic letter has a chance with.",
                "The average corporate job posting attracts 250+ applications in 2026, with a 2–3% interview conversion rate. Tailoring is your primary differentiator.",
                "70% of job seekers now use AI for cover letters — but 62% of rejections happen because the output lacks personalisation. The workflow below fixes that.",
              ].map((point, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ minWidth: 24, height: 24, borderRadius: "50%", background: accent, color: "white", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: text, margin: 0 }}>{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 20 }}>Why Tailoring Is the Only Strategy That Works in 2026</h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: text, marginBottom: 28 }}>
            The job market has fundamentally changed. According to data from HiringThing, the applicant-to-interview ratio dropped from 8.4% in 2023 to just 2–3% in 2026. The average corporate role receives over 250 applications. Every hiring manager is overwhelmed, time-poor, and scanning for any reason to say no. A generic cover letter is that reason.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 48 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ padding: "20px 18px", borderRadius: 14, background: surface, border: `1px solid ${border}`, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: accent, letterSpacing: "-0.03em" }}>{s.value}</span>
                <span style={{ fontSize: 13, color: text, lineHeight: 1.5 }}>{s.label}</span>
                <span style={{ fontSize: 11, color: muted, marginTop: 4 }}>— {s.source}</span>
              </div>
            ))}
          </div>

          {/* Expert quotes */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
            {quotes.map((q, i) => (
              <div key={i} style={{ padding: "22px 26px", borderRadius: 14, background: surface, border: `1px solid ${border}`, borderLeft: `3px solid ${accent}` }}>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: text, fontStyle: "italic", margin: "0 0 14px" }}>"{q.quote}"</p>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "white", margin: 0 }}>{q.name}</p>
                  <p style={{ fontSize: 12, color: muted, margin: "2px 0 0" }}>{q.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Why generic fails */}
          <h2 id="why-generic-fails" style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16 }}>Why Generic Cover Letters Fail Every Time</h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: text, marginBottom: 16 }}>
            Research from Resume.io shows that 78% of hiring managers can tell within seconds when a cover letter is generic. What gives it away? Vague claims ("I am a hard worker with excellent communication skills"), wrong company name left from copy-paste, and zero reference to the actual role's requirements.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: text, marginBottom: 28 }}>
            According to a 2026 ResumeGenius survey of 625 hiring managers, 81% rate job-specific tailoring as "important" or "very important" — yet data from NovoResume shows 30.5% of job seekers submit the same cover letter to every application. That gap between what hiring managers want and what candidates deliver is your opportunity.
          </p>

          {/* Before / After */}
          <h2 id="before-after" style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 20 }}>Before & After: Generic vs Tailored</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}>
            <div style={{ padding: "22px", borderRadius: 14, background: "rgba(248,113,113,0.06)", border: `1px solid rgba(248,113,113,0.2)` }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: red, marginBottom: 14 }}>Generic — Gets Ignored</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: text, fontStyle: "italic", margin: 0 }}>
                "I am writing to apply for the Marketing Manager position at your company. I have several years of experience in marketing and I believe I would be a great fit for your team. I am a hard worker with strong communication skills and I am passionate about helping companies grow."
              </p>
            </div>
            <div style={{ padding: "22px", borderRadius: 14, background: "rgba(52,211,153,0.06)", border: `1px solid rgba(52,211,153,0.2)` }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: green, marginBottom: 14 }}>Tailored — Gets Interviews</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: text, fontStyle: "italic", margin: 0 }}>
                "Your job posting prioritises cross-functional campaign leadership and 30% YoY growth targets — exactly what I delivered at Acme Corp, where I led a 6-person cross-functional team to grow organic reach 47% in 8 months, contributing £340K in attributed pipeline. Here is how I would replicate that at [Company]."
              </p>
            </div>
          </div>

          {/* Animated infographic */}
          <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${border}`, marginBottom: 48 }}>
            <video autoPlay muted loop playsInline style={{ width: "100%", display: "block" }}>
              <source src="/blog/how-to-tailor-cover-letter-to-job-description/infographic-animated.mp4" type="video/mp4" />
            </video>
            <div style={{ padding: "12px 16px", background: surface }}>
              <p style={{ fontSize: 13, color: muted, margin: 0 }}>The tailored vs generic cover letter gap — why the difference in callbacks is so large.</p>
            </div>
          </div>

          {/* 5-Step Guide */}
          <h2 id="five-steps" style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 8 }}>The 5-Step Method: Tailor Any Cover Letter in Under 30 Minutes</h2>
          <p style={{ fontSize: 14, color: muted, marginBottom: 32 }}>Total time: ~27 minutes. Works for any role, any industry, any experience level.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
            {steps.map((step) => (
              <div key={step.num} style={{ padding: "24px 26px", borderRadius: 16, background: surface, border: `1px solid ${border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: accent, fontFamily: "monospace", background: accentDim, padding: "4px 10px", borderRadius: 8 }}>Step {step.num}</span>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: 0, flex: 1 }}>{step.title}</h3>
                  <span style={{ fontSize: 11, fontWeight: 700, color: green, background: "rgba(52,211,153,0.1)", padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>{step.time}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: text, margin: "0 0 12px" }}>{step.body}</p>
                <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(99,102,241,0.07)", border: `1px solid ${accentBorder}` }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "0.08em" }}>Pro tip: </span>
                  <span style={{ fontSize: 13, color: muted }}>{step.tip}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Static infographic */}
          <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${border}`, marginBottom: 48 }}>
            <Image src="/blog/how-to-tailor-cover-letter-to-job-description/infographic-steps.png" alt="5-step cover letter tailoring method — ToolStack 2026" width={760} height={427} style={{ width: "100%", height: "auto", display: "block" }} />
            <div style={{ padding: "12px 16px", background: surface }}>
              <p style={{ fontSize: 13, color: muted, margin: 0 }}>The 5-step tailoring method at a glance — keyword extraction through AI generation.</p>
            </div>
          </div>

          {/* Tool Screenshots */}
          <h2 id="try-free" style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 8 }}>Try It Free — No Login, No Limits</h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: text, marginBottom: 24 }}>
            ToolStack's free AI cover letter generator handles Step 5 in seconds. Enter the job title, company name, and your 2–3 keyword-matched achievements in the background field. Select tone. Generate. The whole process takes less than 2 minutes once you have your keyword-achievement map from Steps 1–4.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
            {[
              { src: "/blog/how-to-tailor-cover-letter-to-job-description/screenshot-step1.png", caption: "Step 1–3 — Enter the job title, company, and your keyword-matched background. No account needed." },
              { src: "/blog/how-to-tailor-cover-letter-to-job-description/screenshot-step2.png", caption: "Step 4 — Select your tone mode. Professional, Confident, Creative, or Concise — matched to the company culture." },
              { src: "/blog/how-to-tailor-cover-letter-to-job-description/screenshot-output.png", caption: "Step 5 — Your tailored cover letter is ready in seconds. Copy and personalise with your real numbers." },
            ].map((img, i) => (
              <div key={i} style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${border}` }}>
                <Image src={img.src} alt={img.caption} width={760} height={420} style={{ width: "100%", height: "auto", display: "block" }} />
                <div style={{ padding: "12px 16px", background: surface }}>
                  <p style={{ fontSize: 13, color: muted, margin: 0 }}>{img.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA block */}
          <div style={{ padding: "28px 32px", borderRadius: 18, background: `linear-gradient(135deg, ${accentDim}, rgba(99,102,241,0.05))`, border: `1px solid ${accentBorder}`, marginBottom: 48, textAlign: "center" }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: "white", marginBottom: 8 }}>Generate Your Tailored Cover Letter Free</p>
            <p style={{ fontSize: 14, color: muted, marginBottom: 20 }}>No account. No credit card. 4 tone modes. Works for any role.</p>
            <a href="https://toolstack.tech/tools/cover-letter-generator" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", padding: "14px 32px", borderRadius: 12, background: accent, color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Open Cover Letter Generator →
            </a>
          </div>

          {/* Interactive Scorecard */}
          <h2 id="scorecard" style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 8 }}>Cover Letter Tailoring Scorecard</h2>
          <p style={{ fontSize: 15, color: muted, marginBottom: 24 }}>Check every item you've completed. Hit 8/8 before you send.</p>
          <div id="scorecard-widget" style={{ padding: "28px", borderRadius: 18, background: surface, border: `1px solid ${border}`, marginBottom: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span id="score-label" style={{ fontSize: 22, fontWeight: 900, color: accent }}>0 / 8</span>
              <span id="score-badge" style={{ fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 999, background: "rgba(248,113,113,0.12)", color: red }}>Not ready to send</span>
            </div>
            <div id="progress-bar-bg" style={{ height: 8, borderRadius: 999, background: border, marginBottom: 28, overflow: "hidden" }}>
              <div id="progress-bar-fill" style={{ height: "100%", width: "0%", background: accent, borderRadius: 999, transition: "width 0.3s ease" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Extracted 5–8 priority keywords from the job description",
                "Mapped each keyword to a specific, quantified achievement",
                "Rewrote the opening paragraph to address the company's top priority",
                "Used the exact language from the job posting (not paraphrased)",
                "Every achievement includes a number, percentage, or timeframe",
                "Removed all generic phrases ('hard worker', 'team player', 'passionate')",
                "Addressed the hiring manager by name (or used the correct team name)",
                "Cover letter is under one page (250–350 words)",
              ].map((item, i) => (
                <label key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, cursor: "pointer" }}>
                  <input type="checkbox" data-score-item className="score-cb" style={{ marginTop: 3, accentColor: accent, width: 16, height: 16, flexShrink: 0 }} onChange={() => {}} />
                  <span style={{ fontSize: 14, lineHeight: 1.6, color: text }}>{item}</span>
                </label>
              ))}
            </div>
          </div>
          <script dangerouslySetInnerHTML={{ __html: `
            (function() {
              function updateScore() {
                var cbs = document.querySelectorAll('.score-cb');
                var checked = Array.from(cbs).filter(function(cb) { return cb.checked; }).length;
                var total = cbs.length;
                var pct = Math.round((checked / total) * 100);
                document.getElementById('score-label').textContent = checked + ' / ' + total;
                document.getElementById('progress-bar-fill').style.width = pct + '%';
                var badge = document.getElementById('score-badge');
                if (checked === total) {
                  badge.textContent = 'Ready to send!';
                  badge.style.background = 'rgba(52,211,153,0.12)';
                  badge.style.color = '#34d399';
                  document.getElementById('progress-bar-fill').style.background = '#34d399';
                } else if (checked >= 5) {
                  badge.textContent = 'Almost there';
                  badge.style.background = 'rgba(245,158,11,0.12)';
                  badge.style.color = '#f59e0b';
                  document.getElementById('progress-bar-fill').style.background = '#f59e0b';
                } else {
                  badge.textContent = 'Not ready to send';
                  badge.style.background = 'rgba(248,113,113,0.12)';
                  badge.style.color = '#f87171';
                  document.getElementById('progress-bar-fill').style.background = '#6366f1';
                }
              }
              document.querySelectorAll('.score-cb').forEach(function(cb) {
                cb.addEventListener('change', updateScore);
              });
            })();
          `}} />

          {/* Case Study */}
          <h2 id="case-study" style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 20 }}>Case Study: From 45 Minutes to 8 Minutes Per Application</h2>
          <div style={{ padding: "26px 28px", borderRadius: 16, background: surface, border: `1px solid ${border}`, marginBottom: 48 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: accentDim, border: `2px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: accent }}>S</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "white", margin: 0 }}>Sarah, Digital Marketing Manager</p>
                <p style={{ fontSize: 12, color: muted, margin: 0 }}>London, UK — 3-month job search, 2026</p>
              </div>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: text, marginBottom: 14 }}>
              Sarah was sending 10–15 applications per week with a generic cover letter template, spending 45 minutes adapting each one manually. Her interview rate was below 2%. After switching to the 5-step method and ToolStack's AI generator, her process dropped to 8 minutes per application.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              {[
                { label: "Before", stat: "45 min / application", sub: "2% interview rate", color: red },
                { label: "After", stat: "8 min / application", sub: "18% interview rate", color: green },
              ].map((m, i) => (
                <div key={i} style={{ padding: "16px", borderRadius: 12, background: bg, border: `1px solid ${border}`, textAlign: "center" }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{m.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 900, color: m.color, margin: "0 0 4px" }}>{m.stat}</p>
                  <p style={{ fontSize: 13, color: muted, margin: 0 }}>{m.sub}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: muted, margin: 0 }}>
              The key change: Sarah built a 12-item achievements bank on Day 2 and a keyword-to-achievement map for each application. The AI generator handled the prose. She went from 2 interviews in 6 weeks to 4 interviews in 10 days — and landed her role in week 3.
            </p>
          </div>

          {/* Comparison table */}
          <h2 id="comparison" style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 20 }}>Free AI Cover Letter Tools — Full Comparison</h2>
          <div style={{ overflowX: "auto", marginBottom: 48 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  {["Feature", "ToolStack", "Grammarly AI", "Enhancv", "ChatGPT Free"].map((h, i) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: i === 1 ? accent : muted, background: i === 1 ? accentDim : surface, borderBottom: `1px solid ${border}`, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonTools.map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: `1px solid ${border}` }}>
                    <td style={{ padding: "13px 16px", color: muted, fontSize: 13 }}>{row.feature}</td>
                    <td style={{ padding: "13px 16px", color: "white", fontWeight: 700, background: accentDim }}>{row.toolstack}</td>
                    <td style={{ padding: "13px 16px", color: text }}>{row.grammarly}</td>
                    <td style={{ padding: "13px 16px", color: text }}>{row.enhancv}</td>
                    <td style={{ padding: "13px 16px", color: text }}>{row.chatgpt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pros / Cons */}
          <h2 id="pros-cons" style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 20 }}>Pros & Cons of AI-Assisted Tailoring</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}>
            <div style={{ padding: "22px", borderRadius: 14, background: "rgba(52,211,153,0.05)", border: `1px solid rgba(52,211,153,0.2)` }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: green, marginBottom: 16 }}>Pros</p>
              {[
                "Cuts application time from 45+ minutes to under 10",
                "Eliminates blank-page paralysis — you always have a strong draft",
                "Consistent structure and professional tone across every application",
                "Free tools mean no ongoing cost for job seekers",
                "Easily adjustable tone to match company culture",
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <span style={{ color: green, flexShrink: 0, fontWeight: 800 }}>✓</span>
                  <span style={{ fontSize: 14, color: text, lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "22px", borderRadius: 14, background: "rgba(248,113,113,0.05)", border: `1px solid rgba(248,113,113,0.2)` }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: red, marginBottom: 16 }}>Cons</p>
              {[
                "AI output requires personalisation — numbers and specifics must come from you",
                "Generic inputs produce generic output — Steps 1–4 cannot be skipped",
                "AI may hallucinate company details if you don't specify them clearly",
                "Some hiring managers are alert to AI phrasing patterns — always edit",
                "No tool replaces the keyword-matching step — that must be done manually",
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <span style={{ color: red, flexShrink: 0, fontWeight: 800 }}>✕</span>
                  <span style={{ fontSize: 14, color: text, lineHeight: 1.5 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AWeber natural mention */}
          <div style={{ padding: "22px 26px", borderRadius: 14, background: surface, border: `1px solid ${border}`, marginBottom: 48 }}>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: text, margin: 0 }}>
              <strong style={{ color: "white" }}>Managing a high-volume job search?</strong> Many career coaches recommend treating your application process like a marketing campaign — tracking outreach, follow-ups, and response rates. Tools like{" "}
              <a href="https://www.aweber.com/easy-email.htm?id=502593" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>AWeber</a>{" "}
              let you build simple email sequences that automate your follow-up process, track open rates, and keep your pipeline organised — the same way recruiters manage candidate pipelines.
            </p>
          </div>

          {/* 7-Day Action Plan */}
          <h2 id="action-plan" style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 20 }}>Your 7-Day Tailoring System</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 48 }}>
            {actionPlan.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "16px 20px", borderRadius: 12, background: surface, border: `1px solid ${border}`, alignItems: "flex-start" }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: accent, background: accentDim, padding: "4px 12px", borderRadius: 8, whiteSpace: "nowrap", flexShrink: 0 }}>{item.day}</span>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: text, margin: 0 }}>{item.action}</p>
              </div>
            ))}
          </div>

          {/* Future Predictions */}
          <h2 id="predictions" style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 20 }}>What's Coming: Cover Letters in 2027 and Beyond</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
            {predictions.map((p, i) => (
              <div key={i} style={{ padding: "18px 22px", borderRadius: 12, background: surface, border: `1px solid ${border}`, display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: amber, background: "rgba(245,158,11,0.1)", padding: "4px 10px", borderRadius: 8, whiteSpace: "nowrap", flexShrink: 0 }}>{p.date}</span>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: text, margin: 0 }}>{p.text}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ padding: "40px 36px", borderRadius: 20, background: `linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.04))`, border: `1px solid ${accentBorder}`, textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 24, fontWeight: 900, color: "white", marginBottom: 10, letterSpacing: "-0.02em" }}>Stop Sending Generic. Start Getting Interviews.</p>
            <p style={{ fontSize: 15, color: muted, marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
              ToolStack's free cover letter generator is the fastest way to put Steps 1–5 into practice. No account. No paywall. 4 tone modes.
            </p>
            <a href="https://toolstack.tech/tools/cover-letter-generator" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", padding: "16px 40px", borderRadius: 12, background: accent, color: "white", fontWeight: 800, fontSize: 16, textDecoration: "none" }}>
              Generate My Cover Letter Free →
            </a>
            <p style={{ fontSize: 12, color: muted, marginTop: 14 }}>No login required. Works on any device.</p>
          </div>

          {/* Author Bio */}
          <div style={{ padding: "24px 26px", borderRadius: 16, background: surface, border: `1px solid ${border}`, display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 56 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: accentDim, border: `2px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: accent, flexShrink: 0 }}>JP</div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 4px" }}>Justin Pirrie</p>
              <p style={{ fontSize: 12, color: accent, margin: "0 0 10px" }}>Founder, ToolStack · Digital Growth Strategist at <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>AdvertsGPT</a></p>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: muted, margin: 0 }}>
                Justin has tested 50+ AI writing and career tools across 3 years of building free-tool platforms. He built ToolStack to give job seekers, developers, and marketers access to premium-grade tools at zero cost. This guide is based on published hiring manager research, live SERP analysis, and direct testing of the tools compared above.
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                {["50+ AI tools tested", "3 years content & SEO", "ToolStack.tech founder"].map(tag => (
                  <span key={tag} style={{ fontSize: 11, color: muted, background: bg, border: `1px solid ${border}`, padding: "3px 10px", borderRadius: 999 }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <h2 id="faq" style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 20 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 56 }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ borderRadius: 12, border: `1px solid ${border}`, overflow: "hidden" }}>
                <summary style={{ padding: "18px 22px", cursor: "pointer", fontSize: 15, fontWeight: 700, color: "white", background: surface, listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {faq.q}
                  <span style={{ color: accent, fontSize: 18, fontWeight: 400, marginLeft: 12, flexShrink: 0 }}>+</span>
                </summary>
                <div style={{ padding: "18px 22px", fontSize: 14, lineHeight: 1.75, color: text, background: bg, borderTop: `1px solid ${border}` }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          {/* Related Posts */}
          <div style={{ borderTop: `1px solid ${border}`, paddingTop: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: muted, marginBottom: 20 }}>Related Reading</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {[
                { title: "Cover Letter Generator Guide", href: "/blog/cover-letter-generator-guide", tag: "Tool Guide" },
                { title: "Best Free Online Tools 2026", href: "/blog/best-free-online-tools-2026", tag: "Listicle" },
                { title: "AI Writing Tools Ultimate Guide", href: "/blog/ai-writing-tools-ultimate-guide", tag: "Guide" },
              ].map((post) => (
                <Link key={post.href} href={post.href} style={{ padding: "18px 20px", borderRadius: 12, background: surface, border: `1px solid ${border}`, textDecoration: "none", display: "block", transition: "border-color 0.15s" }}>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, display: "block", marginBottom: 8 }}>{post.tag}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: text, lineHeight: 1.4 }}>{post.title}</span>
                </Link>
              ))}
            </div>
          </div>

        </article>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .blog-layout { grid-template-columns: 1fr !important; }
          aside { display: none !important; }
        }
      `}</style>
    </div>
  );
}
