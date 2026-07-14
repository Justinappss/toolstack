// Mindwire video catalog. Add a new entry here and its page + hub card appear automatically.
export type MindwireVideo = {
  slug: string;
  youtubeId: string;
  title: string;
  kicker: string;      // short category label
  hook: string;        // 1–2 sentence teaser (cards + meta description)
  published: string;   // ISO date
  read: string;        // "3 min read"
  article: string[];   // the explainer, paragraph by paragraph (SEO + depth)
};

export const VIDEOS: MindwireVideo[] = [
  {
    slug: "why-you-forget-mid-sentence",
    youtubeId: "M1FagmmdOMQ",
    title: "Why You Forget What You're Saying Mid-Sentence",
    kicker: "Memory glitch",
    hook: "You're mid-sentence and the end just… vanishes. You're not losing it — it's a real, well-studied glitch in how your brain holds a thought.",
    published: "2026-07-14",
    read: "4 min read",
    article: [
      "You're mid-sentence, everyone's looking at you, and the end of your own thought just vanishes into thin air. It's one of the most universal — and most quietly unsettling — glitches your brain pulls on you. And it's not a sign you're losing it. It's a sign of exactly how your mind is built.",
      "To say even one sentence, your brain is juggling an absurd amount at once: the idea you're chasing, the shape of the sentence, the next word, the last word, and a little voice checking it all sounds right. All of that lives in one tiny space called working memory — and working memory is brutally small. It holds only a handful of things, for only a few seconds.",
      "So it doesn't take much to knock it over. A phone buzzes. Someone raises an eyebrow. A better word muscles its way in. Any tiny interruption, and the thing you were holding — 'where was I going with this' — gets bumped out to make room. And once it's gone, there's nothing underneath to catch it. The words stop, because the plan they were running on just got wiped.",
      "There's an even crueler version: the tip-of-the-tongue moment. The word is right there — you can feel its shape, maybe its first letter — you just can't grab it. That's a retrieval glitch: the meaning loaded fine, but the sound of the word didn't come with it. And the harder you reach, the worse it gets, because your brain keeps shoving the wrong, similar words in front of the real one.",
      "The fix is almost funny, because it's the opposite of what you want to do. Don't chase it. Stop. Go quiet for a second, then go back to the start of the sentence — 'we were talking about…' — and the plan usually reloads on its own. Or just let it go completely, and it'll pop back thirty seconds later, uninvited, the moment you stop strangling it.",
      "Which leaves one genuinely strange thought: the ideas you 'have' aren't sitting safely in your head. They're being held, for a few fragile seconds, in a space smaller than you'd ever believe — and your brain will drop them the instant something more urgent walks in. You're always one small interruption away from losing your own train of thought.",
    ],
  },
  {
    slug: "your-brain-deletes-your-phone",
    youtubeId: "zO32jNDAMoQ",
    title: "Your Brain Is Deleting Your Phone Right Now",
    kicker: "Attention glitch",
    hook: "Ever used your phone's flashlight to look for your phone? Your brain literally edits the thing in your hand out of your reality. It's called inattentional blindness.",
    published: "2026-07-07",
    read: "3 min read",
    article: [
      "You've done it — torn the house apart hunting for your phone while it's in your hand. Or the cursed version: using your phone's flashlight to look for your phone. You're not going crazy. You've hit one of the strangest glitches in human attention: inattentional blindness.",
      "Here's the truth your brain doesn't advertise: it doesn't show you reality. It shows you what it's looking for. Every second, your senses fire millions of signals at it, and it can't possibly use them all — so it builds a shortcut. A 'search image' of what you want, and it quietly filters everything else out.",
      "In the most famous version of this experiment, people counted basketball passes in a video and half of them never noticed a person in a gorilla suit stroll right through the middle. Your phone is that gorilla. The second you decide it's lost, your search image says 'out there, somewhere' — so the phone in your hand doesn't match, and your brain leaves it off the screen.",
      "The fix is almost funny: stop, freeze, and look away for three seconds. That breaks the search image. Your brain drops the old template and re-scans the room from scratch — and the phone reappears, exactly where it always was.",
      "Which leaves a genuinely unsettling question: if your brain can hide a phone in your own hand, what else is it filtering out right now?",
    ],
  },
  {
    slug: "why-a-doorway-makes-you-forget",
    youtubeId: "GX_P3uKEdBc",
    title: "Why a Doorway Makes You Forget",
    kicker: "Memory glitch",
    hook: "You walk into a room and… why did you come in here? It's not old age. Doorways literally trigger your brain to wipe the slate. It's called the Doorway Effect.",
    published: "2026-06-19",
    read: "3 min read",
    article: [
      "You get up with a clear mission, walk into the kitchen, and — nothing. Why did you come in here? It happens to everyone, at every age, and it has a name: the Doorway Effect. And it's not a memory failure. It's your brain doing exactly what it's designed to do.",
      "Your mind doesn't record your day as one continuous stream. It slices it into 'events.' And every time something shifts — you change task, you finish a thought, or you walk through a doorway — your brain treats that as a boundary and clears the desk for whatever comes next. The doorway is a full-stop your brain reads as 'new scene, new priorities.'",
      "That's why the memory of your mission — which was being held loosely in working memory, not filed away for keeps — gets flushed at the threshold. Cross back through the doorway, or return to where the thought started, and the old context reloads. Suddenly you remember exactly what you came for.",
      "It's a feature, not a bug. Those event boundaries are how you keep separate moments from blurring into one long, unusable mush. The same mechanism that loses your kitchen mission is the reason you can tell yesterday apart from today.",
    ],
  },
];

export const getVideo = (slug: string) => VIDEOS.find((v) => v.slug === slug);
