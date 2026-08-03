// The Markup video catalog. Add a new entry (newest first) and its page + hub card appear automatically.
export type MarkupVideo = {
  slug: string;
  youtubeId: string;
  localVideo?: string;
  title: string;
  kicker: string;
  hook: string;
  published: string;
  read: string;
  article: string[];
};

export const VIDEOS: MarkupVideo[] = [
  {
    slug: "lipstick-cost-vs-price",
    youtubeId: "mP2IcjSb-uk",
    localVideo: "/the-markup/ep1.mp4",
    title: "A $35 Lipstick Costs $2.50 to Make",
    kicker: "Beauty",
    hook: "The other $32.50 isn't buying the product. It's buying the brand. Here's the real math behind the tube.",
    published: "2026-08-02",
    read: "4 min read",
    article: [
      "A $35 lipstick costs about $2.50 to make. Not a guess — that's the pigment, the tube, the brush, and the assembly, added up. Everything else you're paying for is somewhere other than the tube in your hand.",
      "Break the $2.50 down and it's almost insultingly simple: roughly $1 of pigment, $0.70 for the tube and brush, $0.38 for assembly, and $0.10 to ship it. A hot-pour process melts and molds the bullet in seconds. None of it is expensive to make — it's just expensive to sell.",
      "Push the same math upmarket and it gets stranger. An ornate case from a luxury house can carry a $160 price tag on manufacturing costs that don't move much from the $2.50 baseline — roughly a 150x markup once you account for the packaging theatre. The tube didn't get better. The story around it did.",
      "That's the industry's open secret: a standard 10x markup from cost to shelf price is normal across beauty, and everyone in the business already knows it. Brands like Beauty Pie exist specifically to sell you the same $3–4 manufacturing at $25 instead of $35 — still a markup, just an honest one.",
      "So what does the other $30 actually buy? Not better pigment. It buys the brand name, the shelf space, the ad campaign, and the case design. None of that is a scam — it's just not the product. Once you can see the split, you get to decide which part you're actually paying for.",
    ],
  },
];

export const getVideo = (slug: string) => VIDEOS.find((v) => v.slug === slug);
