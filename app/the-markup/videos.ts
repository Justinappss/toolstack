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
    slug: "silk-pajamas-cost-vs-price",
    youtubeId: "",
    title: "Your $280 Silk Pajamas Cost $22 to Make",
    kicker: "Sleepwear",
    hook: "The other $258 isn't buying better silk. It's buying the brand. Here's the real math behind the set.",
    published: "2026-08-05",
    read: "4 min read",
    article: [
      "A $280 silk pajama set costs about $22 to make. Not a guess — that's the mulberry silk, the cut-and-sew labor, the trim, the box, and the freight, added up. Everything else on that price tag is paying for something other than the two pieces of fabric on the hanger.",
      "Break the $22 down and it thins out fast: roughly $11 for 2.6 yards of 22-momme mulberry silk, $6.50 for cut-and-sew labor at an offshore garment factory, $1.50 for buttons, piping and thread, $1.50 for the gift box and tissue paper, and $1.50 to ship it. A single cutting table can turn out a finished set in under twenty minutes once the pattern's set.",
      "Push the momme count up and the story barely changes. Go from a mid-weight 19-momme set to a heavier 25-momme charmeuse and the fabric bill climbs maybe $4–5 more — the weight you feel when you pick it up off the shelf is real, but it isn't why the price tag jumps by hundreds.",
      "That's sleepwear's version of the same open secret as everywhere else in apparel: a 10–15x markup from factory cost to shelf price is standard once a set carries real brand equity. Direct-to-consumer silk labels that skip the department-store markup and sell straight off their own site typically land between $80 and $150 for the same construction — still profitable, just with fewer hands taking a cut on the way to your cart.",
      "So what does the other $258 actually buy? Not better silk — the momme count on a $280 set and an $80 set is often within a couple of points of each other. It buys the name on the label, the flagship-store lease, the ad campaign, and a box designed to feel like an event. None of that is a scam — it's just not the pajamas. Once you can see the split, you get to decide which part you're actually paying for.",
    ],
  },
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
