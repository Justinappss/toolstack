// Merges the live YouTube feed with the hand-written catalogue.
// - Videos with a hand-written article (in videos.ts) get the rich on-site page.
// - Brand-new uploads not yet written up appear automatically, linking straight to YouTube,
//   until an article is added (then they upgrade to a full on-site page under the same slug).
import { VIDEOS } from "./videos";
import { getFeedVideos } from "./feed";

export type Card = {
  youtubeId: string;
  title: string;
  published: string; // YYYY-MM-DD
  kicker: string;
  hook: string;
  slug?: string;
  read?: string;
  hasPage: boolean;
};

export async function getCatalog(): Promise<Card[]> {
  const feed = await getFeedVideos();
  const richById = new Map(VIDEOS.map((v) => [v.youtubeId, v]));
  const seen = new Set<string>();
  const cards: Card[] = [];

  // Long-form Mindwire titles never contain a hashtag; Shorts always do.
  const looksLikeShort = (t: string) => t.includes("#");

  // Live feed first (newest uploads), merged with rich data where we have it.
  for (const f of feed) {
    if (seen.has(f.youtubeId)) continue;
    const rich = richById.get(f.youtubeId);
    // Skip Shorts that we haven't written up (the RSS feed includes them).
    if (!rich && looksLikeShort(f.title)) continue;
    seen.add(f.youtubeId);
    if (rich) {
      cards.push({
        youtubeId: rich.youtubeId, title: rich.title, published: rich.published,
        kicker: rich.kicker, hook: rich.hook, slug: rich.slug, read: rich.read, hasPage: true,
      });
    } else {
      cards.push({
        youtubeId: f.youtubeId, title: f.title, published: f.published.slice(0, 10),
        kicker: "New", hook: "Fresh from the channel — tap to watch it on YouTube.", hasPage: false,
      });
    }
  }

  // Any hand-written videos older than the feed window.
  for (const v of VIDEOS) {
    if (seen.has(v.youtubeId)) continue;
    seen.add(v.youtubeId);
    cards.push({
      youtubeId: v.youtubeId, title: v.title, published: v.published,
      kicker: v.kicker, hook: v.hook, slug: v.slug, read: v.read, hasPage: true,
    });
  }

  cards.sort((a, b) => (a.published < b.published ? 1 : -1));
  return cards;
}
