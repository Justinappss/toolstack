import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

function extractVideoId(input: string): string | null {
  const patterns = [
    /(?:v=|\/embed\/|\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const re of patterns) {
    const m = input.match(re);
    if (m) return m[1];
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { url, timestamps } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    const videoId = extractVideoId(url.trim());
    if (!videoId) return NextResponse.json({ error: "Could not find a valid YouTube video ID in that URL." }, { status: 400 });

    // Fetch metadata via oEmbed (no API key needed)
    let title = "YouTube Video";
    let author = "";
    try {
      const meta = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (meta.ok) {
        const data = await meta.json();
        title = data.title ?? title;
        author = data.author_name ?? "";
      }
    } catch { /* oEmbed optional */ }

    const segments = await YoutubeTranscript.fetchTranscript(videoId);

    const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s.toString().padStart(2, "0")}`;
    };

    // Build markdown
    const lines: string[] = [
      `# ${title}`,
      "",
      `**Channel:** ${author}`,
      `**URL:** https://www.youtube.com/watch?v=${videoId}`,
      "",
      "## Transcript",
      "",
    ];

    let fullText = "";
    for (const seg of segments) {
      const text = seg.text.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
      if (!text) continue;
      if (timestamps) {
        lines.push(`[${formatTime(seg.offset / 1000)}] ${text}`);
      } else {
        fullText += (fullText ? " " : "") + text;
      }
    }

    if (!timestamps && fullText) {
      // Wrap into ~80-word paragraphs for readability
      const words = fullText.split(" ");
      const chunks: string[] = [];
      for (let i = 0; i < words.length; i += 80) {
        chunks.push(words.slice(i, i + 80).join(" "));
      }
      lines.push(...chunks.flatMap(c => [c, ""]));
    }

    const markdown = lines.join("\n");
    const wordCount = segments.reduce((acc, s) => acc + s.text.split(" ").length, 0);
    const readMinutes = Math.ceil(wordCount / 200);

    return NextResponse.json({ markdown, title, author, videoId, wordCount, readMinutes });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch transcript";
    const friendly = msg.includes("Could not get") || msg.includes("disabled")
      ? "This video has no transcript available. Try a video with captions enabled."
      : msg;
    return NextResponse.json({ error: friendly }, { status: 500 });
  }
}
