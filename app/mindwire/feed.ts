// Live pull of the Mindwire channel's latest uploads from YouTube's public RSS feed.
// No API key required. Cached + revalidated so new uploads appear automatically.
const CHANNEL_ID = "UCzoCFvVEoffY6XAdo9fAUgg";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export type FeedVideo = { youtubeId: string; title: string; published: string };

function decodeXml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .trim();
}

export async function getFeedVideos(): Promise<FeedVideo[]> {
  try {
    // Hard timeout so a slow/blocked feed can never hang the build or a request.
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    const res = await fetch(FEED_URL, { next: { revalidate: 21600 }, signal: ctrl.signal }).finally(() =>
      clearTimeout(timer),
    );
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    const out: FeedVideo[] = [];
    for (const e of entries) {
      const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = e.match(/<title>([^<]*)<\/title>/)?.[1];
      const published = e.match(/<published>([^<]+)<\/published>/)?.[1];
      if (id && title && published) {
        out.push({ youtubeId: id, title: decodeXml(title), published });
      }
    }
    return out;
  } catch {
    return []; // graceful fallback: hub still renders the hand-written catalogue
  }
}
