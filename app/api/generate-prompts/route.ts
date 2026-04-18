import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { topic, model = "ChatGPT", framework, category, tone, count = 10 } = await request.json();

        if (!topic?.trim()) {
            return NextResponse.json({ error: "Topic is required" }, { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY?.trim();
        if (!apiKey) return NextResponse.json({ error: "Service unavailable" }, { status: 500 });

        const frameworkInstructions: Record<string, string> = {
            "RISEN": "Use the RISEN framework: Role (assign an expert role), Instructions (clear task), Steps (break into steps), End Goal (define outcome), Narrowing (add constraints/format).",
            "Chain-of-Thought": "Use Chain-of-Thought prompting: instruct the AI to think step by step, reason through the problem, and show its reasoning before answering.",
            "Few-Shot": "Use Few-Shot prompting: include 2-3 clear examples of the desired input/output format within the prompt itself.",
            "STAR": "Use the STAR framework: Situation (context), Task (what needs doing), Action (how to approach it), Result (desired outcome).",
            "Zero-Shot": "Use Zero-Shot prompting: clear, direct instruction with no examples — rely on the model's knowledge with precise role and output format.",
            "APE": "Use APE framework: Action (what to do), Purpose (why), Expectation (what a great answer looks like).",
        };

        const frameworkGuide = frameworkInstructions[framework] || frameworkInstructions["RISEN"];

        const modelInstructions: Record<string, string> = {
            "ChatGPT":    "Optimise each prompt for ChatGPT (GPT-4o). Use clear system-style role assignments. Leverage GPT-4o's strength at structured, multi-step reasoning and formatted output.",
            "Claude":     "Optimise each prompt for Anthropic Claude. Use XML tags where helpful (e.g. <context>, <task>, <format>). Claude excels at nuanced, long-form reasoning — write prompts that lean into that. Avoid overly rigid formatting constraints.",
            "Gemini":     "Optimise each prompt for Google Gemini. Gemini handles multimodal and conversational prompts well. Use natural, flowing language. Include hints at structured output using markdown or tables where relevant.",
            "Perplexity": "Optimise each prompt for Perplexity AI, which has real-time web access. Prompts should direct it to cite sources, reference current data, and use its search capabilities. Include instructions like 'search for the latest...' or 'cite at least 3 sources'.",
            "Grok":       "Optimise each prompt for Grok by xAI. Grok has access to real-time X (Twitter) data and has a direct, witty personality. Prompts should be punchy, direct, and may reference current events or social trends. Avoid overly formal structure.",
            "Copilot":    "Optimise each prompt for Microsoft Copilot. Focus on productivity, Microsoft 365 integrations (Word, Excel, Outlook, Teams), and professional business use cases. Prompts should reference specific tools or document types where relevant.",
        };

        const modelGuide = modelInstructions[model] || modelInstructions["ChatGPT"];

        const systemPrompt = `You are the world's best prompt engineer. You create prompts that produce genuinely outstanding AI outputs. Your prompts are specific, use proven frameworks, and get real results. Return ONLY valid JSON — no markdown, no explanation.`;

        const userPrompt = `Create exactly ${count} world-class prompts for the AI model: ${model}
Topic: "${topic}"
Category focus: ${category || "General"}
Tone: ${tone || "Professional"}
Framework: ${frameworkGuide}
Model optimisation: ${modelGuide}

Rules:
- Every prompt must start with an expert role assignment ("You are a...", "Act as a...", "Pretend you are...")
- Be hyper-specific — no vague generic prompts
- Each prompt should produce a genuinely different, valuable output
- Include output format instructions (e.g. "Return as a numbered list", "Format as a table", "Write in markdown")
- Include constraints (word count, audience, style, etc.)
- Rate each prompt 1-100 for effectiveness based on specificity, clarity, and value
- Assign a complexity level

Return EXACTLY this JSON (array at top level, no wrapper):
[
  {
    "prompt": "full prompt text here",
    "category": "one word",
    "complexity": "beginner|intermediate|advanced",
    "strength": 85,
    "hook": "5 word description of what this prompt does",
    "framework_used": "${framework || "RISEN"}"
  }
]`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                max_tokens: 4000,
                temperature: 0.85,
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("[generate-prompts]", response.status, err);
            return NextResponse.json({ error: "AI error — try again" }, { status: 500 });
        }

        const data = await response.json();
        let content = data.choices[0]?.message?.content || "[]";

        // Strip markdown code blocks if present
        content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

        let prompts;
        try {
            const parsed = JSON.parse(content);
            prompts = Array.isArray(parsed) ? parsed : (parsed.prompts || parsed.data || []);
        } catch {
            // Try to extract JSON array from response
            const match = content.match(/\[[\s\S]*\]/);
            if (match) {
                try { prompts = JSON.parse(match[0]); } catch { prompts = []; }
            } else { prompts = []; }
        }

        return NextResponse.json({ prompts, topic, count: prompts.length });
    } catch (error) {
        console.error("[generate-prompts] error:", error);
        return NextResponse.json({ error: "Request failed" }, { status: 500 });
    }
}
