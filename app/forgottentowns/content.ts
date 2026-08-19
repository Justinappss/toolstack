// Verbatim Forgotten Towns merch site HTML (tested standalone), served raw.
export const FORGOTTEN_TOWNS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FORGOTTEN TOWNS — The Archive Store</title>
<style>
:root {
  --void:   #080508;
  --abyss:  #0f0b10;
  --crater: #1a1118;
  --blood:  #6b1a14;
  --ember:  #9c2a1a;
  --fire:   #c43a1e;
  --amber:  #d4892a;
  --gold:   #e8b84b;
  --bone:   #e2d5b8;
  --ghost:  #a89f8e;
  --fog:    #4a4248;
  --serif:  Georgia, "Palatino Linotype", "Book Antiqua", serif;
  --display: "Impact", "Franklin Gothic Heavy", "Arial Black", sans-serif;
  --mono:   "Courier New", Courier, monospace;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
a { color: inherit; text-decoration: none; }

body {
  background: var(--void);
  color: var(--bone);
  font-family: var(--serif);
  line-height: 1.65;
  overflow-x: hidden;
}

/* ── Grain overlay ───────────────────────────────── */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 900;
  pointer-events: none;
  opacity: 0.55;
  mix-blend-mode: screen;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='0.07'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 300px;
}

/* ── Nav ─────────────────────────────────────────── */
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 800;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 2.5rem;
  border-bottom: 1px solid rgba(107,26,20,0.3);
  background: rgba(8,5,8,0.88);
  backdrop-filter: blur(8px);
}
.nav-mark {
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--ghost);
}
.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-links a {
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--fog);
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--fire); }

/* ── Hero ────────────────────────────────────────── */
#hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 7rem 2rem 5rem;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 80%, rgba(107,26,20,0.25) 0%, transparent 55%),
    radial-gradient(ellipse 60% 40% at 20% 20%, rgba(156,42,26,0.08) 0%, transparent 50%),
    linear-gradient(180deg, #100810 0%, #080508 55%, #0a0305 100%);
}

/* Distressed horizontal rule lines */
.hero-rules {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.hero-rules::before {
  content: '';
  position: absolute;
  top: 22%;
  left: -5%; right: -5%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(107,26,20,0.4) 20%, rgba(107,26,20,0.6) 50%, rgba(107,26,20,0.4) 80%, transparent);
  transform: rotate(-0.3deg);
}
.hero-rules::after {
  content: '';
  position: absolute;
  bottom: 28%;
  left: -5%; right: -5%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(107,26,20,0.25) 30%, rgba(107,26,20,0.4) 50%, rgba(107,26,20,0.25) 70%, transparent);
  transform: rotate(0.2deg);
}

/* Red spotlight from above */
.hero-spot {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 600px;
  background: radial-gradient(ellipse at center, rgba(156,42,26,0.14) 0%, transparent 65%);
  pointer-events: none;
}

/* Moon — parallax layer 1 */
.moon {
  position: absolute;
  top: 9%;
  left: 50%;
  transform: translateX(-50%);
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #f3e6c8 0%, #d4892a 55%, transparent 78%);
  box-shadow: 0 0 90px rgba(212,137,42,0.35), 0 0 220px rgba(212,137,42,0.15);
  opacity: 0.5;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.2s ease-out;
}

/* Drifting fog — parallax layer 3 */
.hero-fog {
  position: absolute;
  left: -20%; right: -20%;
  height: 240px;
  bottom: 0;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(to top, rgba(74,66,72,0.4), rgba(74,66,72,0.08) 60%, transparent);
  filter: blur(10px);
}
.hero-fog.f1 { bottom: 60px; opacity: 0.55; animation: drift 24s ease-in-out infinite; }
.hero-fog.f2 { bottom: 20px; opacity: 0.4; height: 180px; animation: drift 34s ease-in-out infinite reverse; }
@keyframes drift {
  0%, 100% { transform: translateX(-3%); }
  50%      { transform: translateX(4%); }
}

/* Broken black wood fence — foreground layer */
.wood-fence {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 84px;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  z-index: 4;
  pointer-events: none;
  filter: drop-shadow(0 -6px 24px rgba(0,0,0,0.6));
}
.plank {
  flex: 1;
  height: 88%;
  position: relative;
  background:
    repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0 1px, transparent 1px 11px),
    linear-gradient(180deg, #1b130d 0%, #0c0805 55%, #030201 100%);
  box-shadow: inset 0 0 18px rgba(0,0,0,0.85);
}
.plank:nth-child(3n)   { height: 74%; transform: rotate(-1.4deg); }
.plank:nth-child(4n)   { height: 96%; }
.plank:nth-child(5n+1) { height: 65%; transform: rotate(1.1deg); }
.plank.crack::before {
  content: '';
  position: absolute;
  top: 8%; bottom: 15%;
  left: 55%;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(196,58,30,0.35), transparent);
  transform: rotate(5deg);
}
.plank.snapped {
  height: 40% !important;
  transform: rotate(-6deg) !important;
  align-self: flex-end;
}

/* SVG silhouette strip */
.hero-silhouette {
  transition: transform 0.2s ease-out;
}
.hero-silhouette g {
  animation: flicker 6s ease-in-out infinite;
}
.hero-silhouette g rect:nth-child(3n) { animation-delay: -1.4s; }
.hero-silhouette g rect:nth-child(5n) { animation-delay: -3.1s; }
@keyframes flicker {
  0%, 92%, 100% { opacity: 1; }
  94%           { opacity: 0.35; }
  96%           { opacity: 0.9; }
  97%           { opacity: 0.25; }
}
.hero-silhouette {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 320px;
  pointer-events: none;
}

.hero-vignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 95% 85% at 50% 50%, transparent 35%, rgba(8,5,8,0.7) 100%);
  pointer-events: none;
}

/* Hero content */
.hero-eyebrow {
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: var(--ember);
  margin-bottom: 1.4rem;
  position: relative;
  z-index: 2;
  animation: fadeUp 1s ease 0.2s both;
}
.hero-eyebrow::before,
.hero-eyebrow::after {
  content: ' — ';
  color: var(--blood);
}

.hero-title {
  position: relative;
  z-index: 2;
  margin-bottom: 0.5rem;
  animation: fadeUp 1s ease 0.45s both;
}
.hero-title-word {
  display: block;
  font-family: var(--display);
  font-size: clamp(4.5rem, 12vw, 10rem);
  font-weight: 900;
  letter-spacing: 0.04em;
  line-height: 0.88;
  text-transform: uppercase;
  color: var(--bone);
  text-shadow:
    0 0 120px rgba(196,58,30,0.22),
    0 2px 60px rgba(0,0,0,0.9),
    4px 4px 0 rgba(107,26,20,0.3);
}
.hero-title-word.red {
  color: var(--fire);
  text-shadow:
    0 0 80px rgba(196,58,30,0.5),
    0 2px 40px rgba(0,0,0,0.8),
    4px 4px 0 rgba(60,8,4,0.6);
}

.hero-slash {
  display: block;
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--blood), var(--ember), var(--blood), transparent);
  margin: 1.4rem auto;
  position: relative;
  z-index: 2;
  animation: fadeUp 1s ease 0.65s both;
}

.hero-sub {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: var(--ghost);
  max-width: 400px;
  margin: 0 auto 2.5rem;
  line-height: 1.9;
  position: relative;
  z-index: 2;
  animation: fadeUp 1s ease 0.8s both;
}

.hero-cta {
  display: inline-block;
  position: relative;
  z-index: 2;
  padding: 1rem 2.8rem;
  background: var(--blood);
  border: 1px solid var(--ember);
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--bone);
  transition: all 0.3s;
  animation: fadeUp 1s ease 1s both;
}
.hero-cta:hover {
  background: var(--ember);
  border-color: var(--fire);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 40px rgba(107,26,20,0.5);
}

.hero-coords {
  position: relative;
  z-index: 2;
  margin-top: 3.5rem;
  font-family: var(--mono);
  font-size: 0.5rem;
  letter-spacing: 0.25em;
  color: var(--fog);
  animation: fadeUp 1s ease 1.2s both;
}

/* ── Ticker ──────────────────────────────────────── */
.ticker-wrap {
  position: relative;
  overflow: hidden;
  background: var(--blood);
  padding: 0.55rem 0;
  border-top: 1px solid rgba(196,58,30,0.4);
  border-bottom: 1px solid rgba(196,58,30,0.4);
}
.ticker-wrap::before,
.ticker-wrap::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: 60px;
  z-index: 2;
  pointer-events: none;
}
.ticker-wrap::before { left: 0; background: linear-gradient(to right, var(--blood), transparent); }
.ticker-wrap::after  { right: 0; background: linear-gradient(to left, var(--blood), transparent); }
.ticker-track {
  display: flex;
  width: max-content;
  animation: ticker 38s linear infinite;
}
@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.ticker-item {
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(226,213,184,0.85);
  padding: 0 1.5rem;
  white-space: nowrap;
}
.ticker-sep {
  color: rgba(226,213,184,0.35);
  font-size: 0.45rem;
  padding: 0 0.25rem;
}

/* ── Section base ────────────────────────────────── */
section { position: relative; z-index: 1; }
.wrap { max-width: 1120px; margin: 0 auto; padding: 5rem 2rem; }

.sec-header { margin-bottom: 3.5rem; }
.eyebrow {
  display: block;
  font-family: var(--mono);
  font-size: 0.55rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--ember);
  margin-bottom: 0.75rem;
}
.sec-title {
  font-family: var(--display);
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--bone);
  line-height: 0.95;
  margin-bottom: 0.75rem;
}
.sec-rule {
  width: 40px;
  height: 2px;
  background: var(--blood);
  margin: 1rem 0;
}
.sec-sub {
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  color: var(--ghost);
  max-width: 440px;
  line-height: 1.8;
}

/* ── Product Grid ────────────────────────────────── */
#shop { background: linear-gradient(180deg, var(--void) 0%, var(--abyss) 50%, var(--void) 100%); }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1px;
  border: 1px solid rgba(107,26,20,0.4);
  background: rgba(107,26,20,0.25);
}

.card {
  background: var(--abyss);
  position: relative;
  overflow: hidden;
  transition: all 0.32s ease;
  cursor: pointer;
  display: block;
  color: inherit;
}
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 30%, rgba(107,26,20,0.12), transparent 60%);
  opacity: 0;
  transition: opacity 0.32s;
}
.card:hover {
  background: var(--crater);
  transform: scale(1.015);
  z-index: 2;
  box-shadow: 0 0 0 1px var(--ember), 0 20px 60px rgba(0,0,0,0.8);
}
.card:hover::before { opacity: 1; }

/* Card image area — CSS-crafted */
.card-img {
  width: 100%;
  aspect-ratio: 3/2;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-img img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(0.35) sepia(0.25) contrast(1.05) brightness(0.75);
  transition: transform 0.5s ease, filter 0.5s ease;
}
.card:hover .card-img img {
  transform: scale(1.06);
  filter: grayscale(0.15) sepia(0.2) contrast(1.05) brightness(0.85);
}
.card-img::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, var(--abyss) 100%);
}
.card-glyph {
  font-size: 4rem;
  opacity: 0.2;
  position: relative;
  z-index: 1;
  filter: grayscale(1) sepia(0.5);
  transition: opacity 0.32s, transform 0.32s;
}
.card:hover .card-glyph { opacity: 0.35; transform: scale(1.1); }
.card-img:has(img) .card-glyph { display: none; }

.bg-1 { background: radial-gradient(ellipse at center, #1c0e0b, #0a0406); }
.bg-2 { background: radial-gradient(ellipse at 70% 30%, #121008, #060504); }
.bg-3 { background: radial-gradient(ellipse at 30% 70%, #0e0c12, #050407); }
.bg-4 { background: radial-gradient(ellipse at center, #150e06, #070503); }
.bg-5 { background: radial-gradient(ellipse at 60% 40%, #090e0b, #040605); }
.bg-6 { background: radial-gradient(ellipse at center, #100c14, #060409); }
.bg-7 { background: radial-gradient(ellipse at 40% 60%, #140a0a, #070304); }
.bg-8 { background: radial-gradient(ellipse at 50% 30%, #0c1108, #050604); }
.bg-9 { background: radial-gradient(ellipse at 60% 60%, #0f0c08, #060504); }
.bg-10 { background: radial-gradient(ellipse at 35% 45%, #0d0a12, #050408); }
.bg-11 { background: radial-gradient(ellipse at center, #110b09, #060403); }

.video-grid { grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); }
.video-card { cursor: pointer; }
.video-card .card-name { font-size: 0.92rem; }
.video-card .card-img iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.video-card .play-badge {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.video-card .play-badge::after {
  content: '▶';
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(8, 5, 8, 0.55);
  border: 1px solid var(--gold);
  color: var(--bone);
  font-size: 1.1rem;
  padding-left: 3px;
  transition: transform 0.25s ease, background 0.25s ease;
}
.video-card:hover .play-badge::after {
  transform: scale(1.12);
  background: var(--fire);
}
.video-card .card-img.playing .play-badge { display: none; }

/* Card body */
.card-body { padding: 1.25rem 1.5rem 1.5rem; }

.card-no {
  font-family: var(--mono);
  font-size: 0.48rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--ember);
  display: block;
  margin-bottom: 0.4rem;
}
.card-name {
  font-family: var(--display);
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--bone);
  line-height: 1.15;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}
.card:hover .card-name { color: #fff; }
.card-desc {
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  color: var(--ghost);
  line-height: 1.75;
  margin-bottom: 1.1rem;
}
.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(107,26,20,0.35);
  padding-top: 0.85rem;
}
.card-price {
  font-family: var(--mono);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  color: var(--gold);
}
.card-btn {
  font-family: var(--mono);
  font-size: 0.52rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ember);
  border: 1px solid rgba(107,26,20,0.55);
  background: none;
  padding: 0.42rem 0.85rem;
  cursor: pointer;
  transition: all 0.22s;
}
.card-btn:hover, .card:hover .card-btn {
  border-color: var(--fire);
  color: var(--bone);
  background: rgba(107,26,20,0.3);
}

/* ── Archive (About) ─────────────────────────────── */
#archive {
  background: linear-gradient(180deg, var(--void) 0%, #0d090e 100%);
  border-top: 1px solid rgba(107,26,20,0.25);
}

.archive-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.archive-text .eyebrow { color: var(--fire); }
.archive-text p {
  font-size: 0.92rem;
  color: var(--ghost);
  margin-bottom: 1.25rem;
  line-height: 1.95;
}
.archive-text strong { color: var(--bone); font-weight: 400; }

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  border: 1px solid rgba(107,26,20,0.35);
  background: rgba(107,26,20,0.2);
}
.stat {
  background: var(--abyss);
  padding: 1.75rem 1.5rem;
  position: relative;
}
.stat::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px; height: 100%;
  background: linear-gradient(to bottom, var(--fire), transparent);
}
.stat-n {
  font-family: var(--display);
  font-size: 2.8rem;
  font-weight: 900;
  color: var(--fire);
  letter-spacing: 0.02em;
  line-height: 1;
  margin-bottom: 0.3rem;
}
.stat-l {
  font-family: var(--mono);
  font-size: 0.52rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--ghost);
}

.yt-link {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 2rem;
  padding: 0.95rem 2rem;
  border: 1px solid rgba(107,26,20,0.6);
  background: rgba(107,26,20,0.12);
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--bone);
  transition: all 0.3s;
}
.yt-link svg { width: 16px; height: 16px; fill: var(--fire); flex-shrink: 0; }
.yt-link:hover {
  background: rgba(107,26,20,0.28);
  border-color: var(--ember);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
}

/* ── Field Dispatch ──────────────────────────────── */
#dispatch {
  background: var(--void);
  border-top: 1px solid rgba(107,26,20,0.2);
  border-bottom: 1px solid rgba(107,26,20,0.2);
}

.dispatch-inner { max-width: 700px; margin: 0 auto; }

.postcard {
  border: 1px solid rgba(107,26,20,0.5);
  background: var(--abyss);
  position: relative;
  overflow: hidden;
}
.postcard::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='0.05'/%3E%3C/svg%3E") repeat;
  background-size: 200px;
  opacity: 0.5;
  pointer-events: none;
}
.postcard-head {
  border-bottom: 1px solid rgba(107,26,20,0.35);
  padding: 1.25rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.postcard-head-left .eyebrow { margin-bottom: 0.2rem; }
.postcard-head-left p {
  font-family: var(--mono);
  font-size: 0.56rem;
  letter-spacing: 0.12em;
  color: var(--fog);
}
.stamp {
  width: 56px; height: 70px;
  border: 1px solid rgba(107,26,20,0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 1.4rem;
  color: var(--fog);
  flex-shrink: 0;
}
.stamp span {
  font-family: var(--mono);
  font-size: 0.38rem;
  letter-spacing: 0.15em;
  color: var(--ember);
}
.postcard-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}
.postcard-msg {
  padding: 1.75rem;
  border-right: 1px solid rgba(107,26,20,0.3);
}
.postcard-msg p {
  font-size: 0.85rem;
  color: var(--ghost);
  line-height: 1.9;
  margin-bottom: 0.85rem;
  font-style: italic;
}
.dispatch-form { display: flex; margin-top: 1.25rem; }
.dispatch-input {
  flex: 1;
  background: rgba(8,5,8,0.8);
  border: 1px solid rgba(107,26,20,0.45);
  border-right: none;
  padding: 0.7rem 0.9rem;
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: var(--bone);
  outline: none;
  transition: border-color 0.2s;
}
.dispatch-input::placeholder { color: var(--fog); }
.dispatch-input:focus { border-color: var(--ember); }
.dispatch-btn {
  background: var(--blood);
  border: 1px solid var(--ember);
  padding: 0.7rem 1.1rem;
  font-family: var(--mono);
  font-size: 0.56rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--bone);
  cursor: pointer;
  transition: all 0.22s;
  white-space: nowrap;
}
.dispatch-btn:hover { background: var(--ember); border-color: var(--fire); }
.postcard-addr {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.postcard-addr p {
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  line-height: 2.1;
  color: var(--ghost);
}
.postcard-addr .to { color: var(--fog); }

/* ── Footer ──────────────────────────────────────── */
footer {
  background: var(--void);
  border-top: 1px solid rgba(107,26,20,0.2);
  position: relative;
  z-index: 1;
  padding: 3.5rem 2rem 2rem;
}
.footer-inner { max-width: 1120px; margin: 0 auto; }
.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(107,26,20,0.2);
  margin-bottom: 2rem;
}
.footer-brand {
  font-family: var(--display);
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bone);
  margin-bottom: 0.75rem;
  line-height: 1;
}
.footer-desc {
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  color: var(--ghost);
  line-height: 1.85;
  max-width: 280px;
}
.footer-col-head {
  font-family: var(--mono);
  font-size: 0.52rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--ember);
  display: block;
  margin-bottom: 1rem;
}
.footer-list { list-style: none; }
.footer-list li { margin-bottom: 0.65rem; }
.footer-list a {
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  color: var(--ghost);
  transition: color 0.2s;
}
.footer-list a:hover { color: var(--fire); }
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-copy {
  font-family: var(--mono);
  font-size: 0.52rem;
  letter-spacing: 0.15em;
  color: var(--fog);
}
.footer-coords {
  font-family: var(--mono);
  font-size: 0.52rem;
  letter-spacing: 0.15em;
  color: var(--fog);
}
.footer-coords b { color: var(--blood); }

/* ── Animations ──────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.in { opacity: 1; transform: translateY(0); }
.d1 { transition-delay: 0.1s; }
.d2 { transition-delay: 0.2s; }
.d3 { transition-delay: 0.3s; }
.d4 { transition-delay: 0.4s; }

/* ── Responsive ──────────────────────────────────── */
@media (max-width: 900px) {
  nav { padding: 1rem 1.5rem; }
  .nav-links { gap: 1.25rem; }
  .archive-layout { grid-template-columns: 1fr; gap: 3rem; }
  .footer-top { grid-template-columns: 1fr; gap: 2rem; }
  .postcard-body { grid-template-columns: 1fr; }
  .postcard-msg { border-right: none; border-bottom: 1px solid rgba(107,26,20,0.3); }
}
@media (max-width: 600px) {
  .nav-links { display: none; }
  .hero-title-word { font-size: clamp(3.5rem, 16vw, 6rem); }
  .grid { grid-template-columns: 1fr 1fr; }
  .stats { grid-template-columns: 1fr 1fr; }
  .footer-bottom { flex-direction: column; gap: 0.75rem; text-align: center; }
  .dispatch-form { flex-direction: column; }
  .dispatch-input { border-right: 1px solid rgba(107,26,20,0.45); border-bottom: none; }
}
@media (max-width: 400px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
</head>
<body>

<!-- Nav -->
<nav>
  <span class="nav-mark">Forgotten Towns — Field Store</span>
  <ul class="nav-links">
    <li><a href="#shop">Shop</a></li>
    <li><a href="#archive">Archive</a></li>
    <li><a href="#videos">Episodes</a></li>
    <li><a href="#dispatch">Dispatch</a></li>
    <li><a href="https://www.youtube.com/@TheForgottenTowns" target="_blank" rel="noopener">Channel ↗</a></li>
  </ul>
</nav>

<!-- Hero -->
<section id="hero">
  <div class="hero-bg"></div>
  <div class="hero-rules"></div>
  <div class="hero-spot"></div>
  <div class="moon"></div>

  <!-- Silhouette: one abandoned farmhouse on a hill, path + gate, dead trees -->
  <svg class="hero-silhouette" viewBox="0 0 1400 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <radialGradient id="horizonGlow" cx="50%" cy="55%" r="55%">
        <stop offset="0%" stop-color="rgba(212,137,42,0.24)"/>
        <stop offset="45%" stop-color="rgba(196,58,30,0.10)"/>
        <stop offset="100%" stop-color="rgba(196,58,30,0)"/>
      </radialGradient>
    </defs>

    <!-- moonlit sky glow behind the hill, this is what makes the silhouette pop -->
    <ellipse cx="700" cy="185" rx="440" ry="230" fill="url(#horizonGlow)"/>

    <!-- ground + hill mound the house sits on -->
    <path fill="#050305" d="M0,320 L0,304 Q200,296 400,302 Q460,304 480,300
      C540,258 578,214 618,196 Q660,180 700,176 Q740,180 782,196
      C822,214 860,258 920,300 Q940,304 1000,302 Q1200,296 1400,304 L1400,320 Z"/>

    <!-- path winding up the hill to the front door -->
    <path d="M700,320 C650,286 656,262 692,244 C726,226 672,214 700,198" fill="none"
      stroke="rgba(120,104,84,0.28)" stroke-width="15" stroke-linecap="round"/>
    <path d="M700,320 C650,286 656,262 692,244 C726,226 672,214 700,198" fill="none"
      stroke="rgba(212,137,42,0.10)" stroke-width="26" stroke-linecap="round"/>

    <!-- broken gate at the base of the path -->
    <g stroke="#050305" stroke-width="4" stroke-linecap="square" fill="none">
      <path d="M672,302 L672,262 M672,266 L706,266 M706,302 L706,258"/>
      <path d="M676,266 L694,280"/>
    </g>

    <!-- dead tree, left -->
    <g stroke="#050305" stroke-width="3" stroke-linecap="round" fill="none">
      <path d="M300,306 L292,232"/>
      <path d="M292,232 L266,192"/>
      <path d="M292,232 L312,186"/>
      <path d="M312,186 L298,150"/>
      <path d="M312,186 L332,166"/>
      <path d="M266,192 L250,164"/>
      <path d="M266,192 L276,160"/>
    </g>

    <!-- dead tree, right -->
    <g stroke="#050305" stroke-width="3" stroke-linecap="round" fill="none">
      <path d="M1090,308 L1100,222"/>
      <path d="M1100,222 L1128,180"/>
      <path d="M1100,222 L1078,178"/>
      <path d="M1078,178 L1092,136"/>
      <path d="M1078,178 L1054,154"/>
      <path d="M1128,180 L1150,146"/>
    </g>

    <!-- collapsing lean-to / porch, attached left of the house -->
    <path fill="#050305" stroke="rgba(212,137,42,0.14)" stroke-width="1"
      d="M600,198 L606,138 L624,126 L636,118 L636,198 Z"/>

    <!-- main house body + broken, jagged roofline -->
    <path fill="#050305" stroke="rgba(212,137,42,0.14)" stroke-width="1"
      d="M636,198 L636,104 L668,58 L684,74 L700,42 L714,50 L728,34
         L748,78 L736,88 L760,62 L784,104 L784,198 Z"/>

    <!-- leaning chimney -->
    <path fill="#050305" d="M742,80 L750,2 L762,5 L756,84 Z"/>

    <!-- Glowing broken windows -->
    <g fill="rgba(212,137,42,0.34)" filter="url(#glow)">
      <rect x="654" y="132" width="16" height="24"/>
      <rect x="706" y="142" width="11" height="17"/>
      <rect x="612" y="158" width="9" height="12"/>
    </g>
  </svg>

  <div class="hero-vignette"></div>

  <div class="hero-fog f1"></div>
  <div class="hero-fog f2"></div>

  <div class="wood-fence" aria-hidden="true">
    <div class="plank"></div>
    <div class="plank crack"></div>
    <div class="plank"></div>
    <div class="plank snapped"></div>
    <div class="plank crack"></div>
    <div class="plank"></div>
    <div class="plank"></div>
    <div class="plank crack"></div>
    <div class="plank"></div>
    <div class="plank snapped"></div>
    <div class="plank"></div>
    <div class="plank crack"></div>
    <div class="plank"></div>
    <div class="plank"></div>
    <div class="plank crack"></div>
    <div class="plank"></div>
    <div class="plank snapped"></div>
    <div class="plank"></div>
    <div class="plank crack"></div>
    <div class="plank"></div>
  </div>

  <p class="hero-eyebrow">The Official Archive Store</p>
  <h1 class="hero-title">
    <span class="hero-title-word">FORGOTTEN</span>
    <span class="hero-title-word red">TOWNS</span>
  </h1>
  <div class="hero-slash"></div>
  <p class="hero-sub">Gear for those who remember.<br>Official merch from the channel exploring<br>America's most haunted, abandoned places.</p>
  <a href="#shop" class="hero-cta">Enter the Archive</a>
  <p class="hero-coords">38°12′N · 119°00′W &nbsp;·&nbsp; BODIE, CALIFORNIA</p>
</section>

<!-- Ticker -->
<div class="ticker-wrap" aria-hidden="true">
  <div class="ticker-track">
    <span class="ticker-item">Bodie</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Centralia</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Bannack</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Rhyolite</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">St. Elmo</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Garnet</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Calico</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Chloride</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Cerro Gordo</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Ruby</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Goldfield</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Cahawba</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Bodie</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Centralia</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Bannack</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Rhyolite</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">St. Elmo</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Garnet</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Calico</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Chloride</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Cerro Gordo</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Ruby</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Goldfield</span><span class="ticker-sep">✦</span>
    <span class="ticker-item">Cahawba</span><span class="ticker-sep">✦</span>
  </div>
</div>

<!-- Shop -->
<section id="shop">
  <div class="wrap">
    <div class="sec-header reveal">
      <span class="eyebrow">The Collection</span>
      <h2 class="sec-title">Shop the Archive</h2>
      <div class="sec-rule"></div>
      <p class="sec-sub">Every piece documents a place the world walked away from. Limited runs. Built to last.</p>
    </div>

    <div class="grid">

      <!-- 001 — AFFILIATE: Vintage LED Hurricane Lantern (Black), amazon.com/dp/B07HR9PNKZ -->
      <a href="https://amzn.to/3SlEFFw" class="card reveal d1" data-affiliate="live" data-amazon="https://www.amazon.com/dp/B07HR9PNKZ">
        <div class="card-img bg-1"><img src="https://m.media-amazon.com/images/I/61p+A4nMthL._AC_SL1000_.jpg" alt="Hurricane Field Lantern" loading="lazy"><span class="card-glyph">🏮</span></div>
        <div class="card-body">
          <span class="card-no">FILE NO. 001</span>
          <h3 class="card-name">Hurricane Field Lantern</h3>
          <p class="card-desc">Battery-powered, black-cast housing. Flicker-mode flame. What you'd carry through the door of a place you shouldn't.</p>
          <div class="card-foot">
            <span class="card-price">$25</span>
            <button class="card-btn">Claim It</button>
          </div>
        </div>
      </a>

      <!-- 002 — AFFILIATE: Wall Art Impact 34x24 Topographic Map of the US (framed poster), amazon.com/dp/B0DPK7M5LP -->
      <a href="https://amzn.to/4geMHb6" class="card reveal d2" data-affiliate="live" data-amazon="https://www.amazon.com/dp/B0DPK7M5LP">
        <div class="card-img bg-2"><img src="https://m.media-amazon.com/images/I/81reZaqKh6L._AC_SL1200_.jpg" alt="Topographic Wall Map" loading="lazy"><span class="card-glyph">🗺️</span></div>
        <div class="card-body">
          <span class="card-no">FILE NO. 002</span>
          <h3 class="card-name">Topographic Wall Map</h3>
          <p class="card-desc">34×24" laminated relief map of the continental US. Every ridge and basin a town could vanish behind.</p>
          <div class="card-foot">
            <span class="card-price">$40</span>
            <button class="card-btn">Claim It</button>
          </div>
        </div>
      </a>

      <!-- 003 — AFFILIATE: COOFANDY Men's Flannel Plaid Shirt, Dark Grey, amazon.com/dp/B0DDY559QN -->
      <a href="https://amzn.to/4ghUoxd" class="card reveal d3" data-affiliate="live" data-amazon="https://www.amazon.com/dp/B0DDY559QN">
        <div class="card-img bg-3"><img src="https://m.media-amazon.com/images/I/81jz+CKsUmL._AC_SL1500_.jpg" alt="Dark Plaid Field Shirt" loading="lazy"><span class="card-glyph">🧥</span></div>
        <div class="card-body">
          <span class="card-no">FILE NO. 003</span>
          <h3 class="card-name">Dark Plaid Field Shirt</h3>
          <p class="card-desc">Heavyweight flannel, ash and charcoal check. Built for cold porches and longer walks than planned.</p>
          <div class="card-foot">
            <span class="card-price">$40</span>
            <button class="card-btn">Claim It</button>
          </div>
        </div>
      </a>

      <!-- 004 — AFFILIATE: Ghost Towns of the American West by Raymond Bial, amazon.com/dp/0618065571 -->
      <a href="https://amzn.to/4wDOUTL" class="card reveal d1" data-affiliate="live" data-amazon="https://www.amazon.com/dp/0618065571">
        <div class="card-img bg-4"><img src="https://m.media-amazon.com/images/I/51-zVMR9qoL._AC_.jpg" alt="Ghost Towns of the West" loading="lazy"><span class="card-glyph">📕</span></div>
        <div class="card-body">
          <span class="card-no">FILE NO. 004</span>
          <h3 class="card-name">Ghost Towns of the West</h3>
          <p class="card-desc">Full photographic survey of the towns America walked away from. Coffee table stock, field-guide research.</p>
          <div class="card-foot">
            <span class="card-price">$20</span>
            <button class="card-btn">Claim It</button>
          </div>
        </div>
      </a>

      <!-- 005 — AFFILIATE: Vintage-Style Brass Compass with Chain and Leather Case, amazon.com/dp/B0DVBYG9SQ -->
      <a href="https://amzn.to/45vXPLX" class="card reveal d2" data-affiliate="live" data-amazon="https://www.amazon.com/dp/B0DVBYG9SQ">
        <div class="card-img bg-5"><img src="https://m.media-amazon.com/images/I/71g1hVjphfL._AC_SL1500_.jpg" alt="Brass Survey Compass" loading="lazy"><span class="card-glyph">🧭</span></div>
        <div class="card-body">
          <span class="card-no">FILE NO. 005</span>
          <h3 class="card-name">Brass Survey Compass</h3>
          <p class="card-desc">Antiqued brass, leather case, working needle. For finding a place — or admitting you're already lost.</p>
          <div class="card-foot">
            <span class="card-price">$22</span>
            <button class="card-btn">Claim It</button>
          </div>
        </div>
      </a>

      <!-- 006 — AFFILIATE: Robrasim Leather Journal Cover for Field Notes, amazon.com/dp/B07CGCLFG9 -->
      <a href="https://amzn.to/4hIkBri" class="card reveal d3" data-affiliate="live" data-amazon="https://www.amazon.com/dp/B07CGCLFG9">
        <div class="card-img bg-6"><img src="https://m.media-amazon.com/images/I/71KrzFrUWHL._AC_SL1200_.jpg" alt="Leather Field Journal" loading="lazy"><span class="card-glyph">📖</span></div>
        <div class="card-body">
          <span class="card-no">FILE NO. 006</span>
          <h3 class="card-name">Leather Field Journal</h3>
          <p class="card-desc">Hand-stitched leather cover, refillable ruled inserts. Write down what you find out there.</p>
          <div class="card-foot">
            <span class="card-price">$19</span>
            <button class="card-btn">Claim It</button>
          </div>
        </div>
      </a>

      <!-- 007 — AFFILIATE: Ghost Towns: America's Abandoned Sites and Settlements, amazon.com/dp/1639386238 -->
      <a href="https://amzn.to/3U7D7PZ" class="card reveal d1" data-affiliate="live" data-amazon="https://www.amazon.com/dp/1639386238">
        <div class="card-img bg-7"><img src="https://m.media-amazon.com/images/I/91yoCDBEGdL._SL1500_.jpg" alt="Abandoned Sites & Settlements" loading="lazy"><span class="card-glyph">📚</span></div>
        <div class="card-body">
          <span class="card-no">FILE NO. 007</span>
          <h3 class="card-name">Abandoned Sites & Settlements</h3>
          <p class="card-desc">Old photographs and desolate contemporary images — what happens when bustling towns reach the end of their lifespan. Every page a town that's gone.</p>
          <div class="card-foot">
            <span class="card-price">$26</span>
            <button class="card-btn">Claim It</button>
          </div>
        </div>
      </a>

      <!-- 008 — AFFILIATE: Abandoned Railroad Ghost Town Bodie California Photo Poster 18x12, amazon.com/dp/B07G18D7W5 -->
      <a href="https://amzn.to/4wEBYwT" class="card reveal d2" data-affiliate="live" data-amazon="https://www.amazon.com/dp/B07G18D7W5">
        <div class="card-img bg-8"><img src="https://m.media-amazon.com/images/I/71CSLp--z-L._AC_SL1024_.jpg" alt="Bodie, CA — Photo Print" loading="lazy"><span class="card-glyph">🖼️</span></div>
        <div class="card-body">
          <span class="card-no">FILE NO. 008</span>
          <h3 class="card-name">Bodie, CA — Photo Print</h3>
          <p class="card-desc">18×12" photographic print of Bodie's abandoned railroad district. One of the most intact ghost towns left in the American West.</p>
          <div class="card-foot">
            <span class="card-price">$14</span>
            <button class="card-btn">Claim It</button>
          </div>
        </div>
      </a>

      <!-- 009 — AFFILIATE: Rustic Western Canvas Art Print, Cowboy Wall Decor, amazon.com/dp/B0F3GC2Z67 -->
      <a href="https://amzn.to/4g6ST6d" class="card reveal d3" data-affiliate="live" data-amazon="https://www.amazon.com/dp/B0F3GC2Z67">
        <div class="card-img bg-9"><img src="https://m.media-amazon.com/images/I/81+yPUqA23L._AC_SL1500_.jpg" alt="Western Ghost Town Canvas" loading="lazy"><span class="card-glyph">🌵</span></div>
        <div class="card-body">
          <span class="card-no">FILE NO. 009</span>
          <h3 class="card-name">Western Ghost Town Canvas</h3>
          <p class="card-desc">Distressed sepia-brown canvas print of an abandoned Southwestern main street. The kind of quiet that has weight.</p>
          <div class="card-foot">
            <span class="card-price">$38</span>
            <button class="card-btn">Claim It</button>
          </div>
        </div>
      </a>

      <!-- 010 — AFFILIATE: Rustic Skeleton Cowboy Western Gothic Skull Ceramic Mug, amazon.com/dp/B0G12DH3GY -->
      <a href="https://amzn.to/4hDkwFd" class="card reveal d1" data-affiliate="live" data-amazon="https://www.amazon.com/dp/B0G12DH3GY">
        <div class="card-img bg-10"><img src="https://m.media-amazon.com/images/I/71PhgOUIHNL._AC_SL1500_.jpg" alt="Skeleton Cowboy Mug" loading="lazy"><span class="card-glyph">☕</span></div>
        <div class="card-body">
          <span class="card-no">FILE NO. 010</span>
          <h3 class="card-name">Skeleton Cowboy Mug</h3>
          <p class="card-desc">Black-and-white ceramic. Skeleton in a hat. Drink from something that knows where you've been.</p>
          <div class="card-foot">
            <span class="card-price">$18</span>
            <button class="card-btn">Claim It</button>
          </div>
        </div>
      </a>

      <!-- 011 — AFFILIATE: Distressed Vintage Fleece Hoodie, amazon.com/dp/B0H7LWFVMS -->
      <a href="https://amzn.to/4ihd6HU" class="card reveal d2" data-affiliate="live" data-amazon="https://www.amazon.com/dp/B0H7LWFVMS">
        <div class="card-img bg-11"><img src="https://m.media-amazon.com/images/I/71sI-+Gb+iL._AC_SL1500_.jpg" alt="Mineral Wash Expedition Hoodie" loading="lazy"><span class="card-glyph">🧥</span></div>
        <div class="card-body">
          <span class="card-no">FILE NO. 011</span>
          <h3 class="card-name">Mineral Wash Expedition Hoodie</h3>
          <p class="card-desc">Faded, distressed, vintage-washed. Looks like it's already been somewhere. Goes with everything dark.</p>
          <div class="card-foot">
            <span class="card-price">$32</span>
            <button class="card-btn">Claim It</button>
          </div>
        </div>
      </a>

    </div>
  </div>
</section>

<!-- Archive -->
<section id="archive">
  <div class="wrap">
    <div class="archive-layout">

      <div class="archive-text reveal">
        <span class="eyebrow">The Channel</span>
        <h2 class="sec-title">America's Lost Places</h2>
        <div class="sec-rule"></div>
        <p><strong>Forgotten Towns</strong> goes back to the places everyone else left. Ghost towns, abandoned streets, buildings that still hold the shape of whoever lived there last.</p>
        <p>No narrators. No Hollywood treatment. One state per episode. Fully documented, fully real. 34 towns down. 50 states to go.</p>
        <a href="https://www.youtube.com/@TheForgottenTowns" target="_blank" rel="noopener" class="yt-link">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5a3.02 3.02 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3.02 3.02 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3.02 3.02 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5v-7l6.3 3.5-6.3 3.5z"/></svg>
          Subscribe to the Channel
        </a>
      </div>

      <div class="stats reveal d2">
        <div class="stat">
          <div class="stat-n">34</div>
          <div class="stat-l">Episodes in the archive</div>
        </div>
        <div class="stat">
          <div class="stat-n">22K</div>
          <div class="stat-l">Subscribers</div>
        </div>
        <div class="stat">
          <div class="stat-n">47</div>
          <div class="stat-l">Towns documented</div>
        </div>
        <div class="stat">
          <div class="stat-n">50</div>
          <div class="stat-l">State mission</div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- All Episodes -->
<section id="videos">
  <div class="wrap">
    <div class="sec-header reveal">
      <span class="eyebrow">The Archive</span>
      <h2 class="sec-title">Every Episode</h2>
      <div class="sec-rule"></div>
      <p class="sec-sub">34 towns down. Every episode of Forgotten Towns, filed and indexed — watch any of them right here.</p>
    </div>
    <div class="grid video-grid">
            <div class="card video-card reveal" data-vid="QTuVcb7gwmc" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/QTuVcb7gwmc/hqdefault.jpg" alt="13 Upstate New York Ghost Towns I Bet You Don't Know EXIST!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 034</span>
                <h3 class="card-name">13 Upstate New York Ghost Towns I Bet You Don't Know EXIST!!</h3>
                <div class="card-foot">
                  <span class="card-price">22:59</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d2" data-vid="Z6j3BqP0Ufk" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/Z6j3BqP0Ufk/hqdefault.jpg" alt="12 Ghost Towns in Arizona They Don't Want You to Find!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 033</span>
                <h3 class="card-name">12 Ghost Towns in Arizona They Don't Want You to Find!!</h3>
                <div class="card-foot">
                  <span class="card-price">19:56</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d3" data-vid="V35hoReabNc" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/V35hoReabNc/hqdefault.jpg" alt="12 Oregon Ghost Towns I Bet You Don't Know EXIST!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 032</span>
                <h3 class="card-name">12 Oregon Ghost Towns I Bet You Don't Know EXIST!!</h3>
                <div class="card-foot">
                  <span class="card-price">21:39</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal" data-vid="Ih-ii_Y1Ljk" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/Ih-ii_Y1Ljk/hqdefault.jpg" alt="12 Missouri Ghost Towns No One Was Supposed to Find!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 031</span>
                <h3 class="card-name">12 Missouri Ghost Towns No One Was Supposed to Find!!</h3>
                <div class="card-foot">
                  <span class="card-price">22:59</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d2" data-vid="UlOzUTNATo0" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/UlOzUTNATo0/hqdefault.jpg" alt="12 Ghost Towns in Ohio They Don't Want You to Find!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 030</span>
                <h3 class="card-name">12 Ghost Towns in Ohio They Don't Want You to Find!!</h3>
                <div class="card-foot">
                  <span class="card-price">21:33</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d3" data-vid="YOZkgaRiGN4" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/YOZkgaRiGN4/hqdefault.jpg" alt="12 Forgotten Michigan Towns That Will Give You Chills" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 029</span>
                <h3 class="card-name">12 Forgotten Michigan Towns That Will Give You Chills</h3>
                <div class="card-foot">
                  <span class="card-price">21:39</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal" data-vid="P6xvIVJS8Jo" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/P6xvIVJS8Jo/hqdefault.jpg" alt="13 Kansas Ghost Towns I Bet You Don't Know Exist!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 028</span>
                <h3 class="card-name">13 Kansas Ghost Towns I Bet You Don't Know Exist!!</h3>
                <div class="card-foot">
                  <span class="card-price">21:26</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d2" data-vid="1nE7wiYk4m4" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/1nE7wiYk4m4/hqdefault.jpg" alt="12 NC Ghost Towns You're Not Supposed to Know About!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 027</span>
                <h3 class="card-name">12 NC Ghost Towns You're Not Supposed to Know About!!</h3>
                <div class="card-foot">
                  <span class="card-price">23:04</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d3" data-vid="a7pU0FYaO9I" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/a7pU0FYaO9I/hqdefault.jpg" alt="13 Ghost Towns in Georgia They Don't Want You to Find!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 026</span>
                <h3 class="card-name">13 Ghost Towns in Georgia They Don't Want You to Find!!</h3>
                <div class="card-foot">
                  <span class="card-price">23:03</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal" data-vid="hggWOXSjfLw" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/hggWOXSjfLw/hqdefault.jpg" alt="12 Florida Places I Bet You Didn't Know Exist!!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 025</span>
                <h3 class="card-name">12 Florida Places I Bet You Didn't Know Exist!!!</h3>
                <div class="card-foot">
                  <span class="card-price">21:05</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d2" data-vid="nLDgQEDm5j4" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/nLDgQEDm5j4/hqdefault.jpg" alt="13 California Ghost Towns I Bet You Don't Know Exist!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 024</span>
                <h3 class="card-name">13 California Ghost Towns I Bet You Don't Know Exist!!</h3>
                <div class="card-foot">
                  <span class="card-price">24:31</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d3" data-vid="lkpMgvMBCxI" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/lkpMgvMBCxI/hqdefault.jpg" alt="12 Indiana Ghost Towns You're Not Supposed to Find!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 023</span>
                <h3 class="card-name">12 Indiana Ghost Towns You're Not Supposed to Find!!</h3>
                <div class="card-foot">
                  <span class="card-price">22:39</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal" data-vid="FOnzijSr_es" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/FOnzijSr_es/hqdefault.jpg" alt="12 Maryland Ghost Towns You Were NEVER Meant to Find!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 022</span>
                <h3 class="card-name">12 Maryland Ghost Towns You Were NEVER Meant to Find!!</h3>
                <div class="card-foot">
                  <span class="card-price">20:05</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d2" data-vid="f04r5CCC7qY" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/f04r5CCC7qY/hqdefault.jpg" alt="12 Illinois Ghost Towns You're Not Supposed to Know About!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 021</span>
                <h3 class="card-name">12 Illinois Ghost Towns You're Not Supposed to Know About!!</h3>
                <div class="card-foot">
                  <span class="card-price">21:38</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d3" data-vid="mWlHKcaL-xg" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/mWlHKcaL-xg/hqdefault.jpg" alt="12 Yellowstone Ghost Towns You Won't Believe Exist!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 020</span>
                <h3 class="card-name">12 Yellowstone Ghost Towns You Won't Believe Exist!!</h3>
                <div class="card-foot">
                  <span class="card-price">23:57</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal" data-vid="yxoiGQrwtas" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/yxoiGQrwtas/hqdefault.jpg" alt="13 Louisiana Ghost Towns They Don't Want You to Find!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 019</span>
                <h3 class="card-name">13 Louisiana Ghost Towns They Don't Want You to Find!!</h3>
                <div class="card-foot">
                  <span class="card-price">19:14</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d2" data-vid="9PMG2_W29Po" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/9PMG2_W29Po/hqdefault.jpg" alt="12 Appalachia Ghost Towns I Bet You Don't Know EXIST!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 018</span>
                <h3 class="card-name">12 Appalachia Ghost Towns I Bet You Don't Know EXIST!!</h3>
                <div class="card-foot">
                  <span class="card-price">20:16</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d3" data-vid="2ehjCH8X0Do" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/2ehjCH8X0Do/hqdefault.jpg" alt="12 Alaska Ghost Towns They Don't Want You to Find!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 017</span>
                <h3 class="card-name">12 Alaska Ghost Towns They Don't Want You to Find!!</h3>
                <div class="card-foot">
                  <span class="card-price">23:14</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal" data-vid="pE0CD5NxFzM" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/pE0CD5NxFzM/hqdefault.jpg" alt="9 Most Disturbing Zillow Listings That Buyers Stay Away From" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 016</span>
                <h3 class="card-name">9 Most Disturbing Zillow Listings That Buyers Stay Away From</h3>
                <div class="card-foot">
                  <span class="card-price">17:57</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d2" data-vid="CFUT9L8ihdk" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/CFUT9L8ihdk/hqdefault.jpg" alt="13 WILD WEST Ghost Towns You Didn't Know Still Exist!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 015</span>
                <h3 class="card-name">13 WILD WEST Ghost Towns You Didn't Know Still Exist!!</h3>
                <div class="card-foot">
                  <span class="card-price">23:59</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d3" data-vid="pkbYcEGXakc" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/pkbYcEGXakc/hqdefault.jpg" alt="9 Smoky Mountain Ghost Towns I Bet You Don't Know Exist!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 014</span>
                <h3 class="card-name">9 Smoky Mountain Ghost Towns I Bet You Don't Know Exist!!</h3>
                <div class="card-foot">
                  <span class="card-price">20:06</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal" data-vid="OS2BqmzPplM" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/OS2BqmzPplM/hqdefault.jpg" alt="13 Oklahoma Ghost Towns You're Not Supposed to See!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 013</span>
                <h3 class="card-name">13 Oklahoma Ghost Towns You're Not Supposed to See!!</h3>
                <div class="card-foot">
                  <span class="card-price">21:35</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d2" data-vid="gELufUoh_CQ" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/gELufUoh_CQ/hqdefault.jpg" alt="12 Kentucky Ghost Towns You Won't Believe Are Still There!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 012</span>
                <h3 class="card-name">12 Kentucky Ghost Towns You Won't Believe Are Still There!</h3>
                <div class="card-foot">
                  <span class="card-price">21:52</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d3" data-vid="cQrtZnfl0Yw" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/cQrtZnfl0Yw/hqdefault.jpg" alt="12 Massachusetts Ghost Towns They Don't Want You to Find!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 011</span>
                <h3 class="card-name">12 Massachusetts Ghost Towns They Don't Want You to Find!!</h3>
                <div class="card-foot">
                  <span class="card-price">20:06</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal" data-vid="EdIGphQum-Q" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/EdIGphQum-Q/hqdefault.jpg" alt="13 Alabama Ghost Towns They Don't Want You to Find!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 010</span>
                <h3 class="card-name">13 Alabama Ghost Towns They Don't Want You to Find!!</h3>
                <div class="card-foot">
                  <span class="card-price">24:58</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d2" data-vid="48kSTPR8E80" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/48kSTPR8E80/hqdefault.jpg" alt="10 Abandoned Places in West Virginia I Bet You Don't Know" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 009</span>
                <h3 class="card-name">10 Abandoned Places in West Virginia I Bet You Don't Know</h3>
                <div class="card-foot">
                  <span class="card-price">22:38</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d3" data-vid="kG-k_9O1OTE" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/kG-k_9O1OTE/hqdefault.jpg" alt="13 Wisconsin REAL Ghost Towns You've Never Heard Of!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 008</span>
                <h3 class="card-name">13 Wisconsin REAL Ghost Towns You've Never Heard Of!!</h3>
                <div class="card-foot">
                  <span class="card-price">20:44</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal" data-vid="dBu9SJ9uPl0" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/dBu9SJ9uPl0/hqdefault.jpg" alt="13 South Carolina Places I Bet You Didn't Know Exist!!!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 007</span>
                <h3 class="card-name">13 South Carolina Places I Bet You Didn't Know Exist!!!</h3>
                <div class="card-foot">
                  <span class="card-price">21:24</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d2" data-vid="UA3B8MN5UrI" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/UA3B8MN5UrI/hqdefault.jpg" alt="12 Tennessee Places You Were NEVER Meant to Find" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 006</span>
                <h3 class="card-name">12 Tennessee Places You Were NEVER Meant to Find</h3>
                <div class="card-foot">
                  <span class="card-price">17:55</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d3" data-vid="DWe_zZjDZt8" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/DWe_zZjDZt8/hqdefault.jpg" alt="12 Most Isolated Towns in the USA (They Refuse to Leave)" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 005</span>
                <h3 class="card-name">12 Most Isolated Towns in the USA (They Refuse to Leave)</h3>
                <div class="card-foot">
                  <span class="card-price">20:30</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal" data-vid="PczCb0nRCHY" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/PczCb0nRCHY/hqdefault.jpg" alt="12 Texas Towns That Completely Vanished" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 004</span>
                <h3 class="card-name">12 Texas Towns That Completely Vanished</h3>
                <div class="card-foot">
                  <span class="card-price">20:46</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d2" data-vid="O5o19MoARvo" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/O5o19MoARvo/hqdefault.jpg" alt="13 Ghost Towns in Minnesota You're Not Supposed to Know!" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 003</span>
                <h3 class="card-name">13 Ghost Towns in Minnesota You're Not Supposed to Know!</h3>
                <div class="card-foot">
                  <span class="card-price">19:36</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal d3" data-vid="wXksASHOAM4" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/wXksASHOAM4/hqdefault.jpg" alt="13 New Jersey Towns That Were Slowly Abandoned" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 002</span>
                <h3 class="card-name">13 New Jersey Towns That Were Slowly Abandoned</h3>
                <div class="card-foot">
                  <span class="card-price">19:48</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>
            <div class="card video-card reveal" data-vid="X9BOTlF_MxE" role="button" tabindex="0">
              <div class="card-img"><img src="https://i.ytimg.com/vi/X9BOTlF_MxE/hqdefault.jpg" alt="12 California Towns That Don't Exist Anymore (Abandoned)" loading="lazy"><span class="play-badge"></span></div>
              <div class="card-body">
                <span class="card-no">EP. 001</span>
                <h3 class="card-name">12 California Towns That Don't Exist Anymore (Abandoned)</h3>
                <div class="card-foot">
                  <span class="card-price">31:36</span>
                  <button class="card-btn">▶ Play</button>
                </div>
              </div>
            </div>

    </div>
  </div>
</section>

<!-- Field Dispatch -->
<section id="dispatch">
  <div class="wrap">
    <div class="dispatch-inner">
      <div class="sec-header reveal" style="text-align:center">
        <span class="eyebrow" style="justify-content:center;display:block">Field Dispatch</span>
        <h2 class="sec-title">Letters from the Road</h2>
        <div class="sec-rule" style="margin:1rem auto"></div>
        <p class="sec-sub" style="margin:0 auto">New episode alerts, first access to merch drops, and field notes from towns we haven't published yet.</p>
      </div>

      <div class="postcard reveal d2">
        <div class="postcard-head">
          <div class="postcard-head-left">
            <span class="eyebrow">Vol. I — Filed from Bodie</span>
            <p>Postmarked: Mono County, CA · 38°12′N · 119°00′W</p>
          </div>
          <div class="stamp">✉<span>FILED</span></div>
        </div>
        <div class="postcard-body">
          <div class="postcard-msg">
            <p>Three buildings still standing on Main Street. Someone left a calendar open to October, 1942. The wind moves through like it still belongs there.</p>
            <p>More from Nevada next month. First in, first notified.</p>
            <div class="dispatch-form">
              <input class="dispatch-input" type="email" placeholder="your@email.com" aria-label="Email address"/>
              <button class="dispatch-btn" type="button">Send It</button>
            </div>
          </div>
          <div class="postcard-addr">
            <p>FORGOTTEN TOWNS</p>
            <p>Field Dispatch — Vol. I</p>
            <p class="to" style="margin-top:0.5rem">To: The Curious</p>
            <p class="to">Every Ghost Town</p>
            <p class="to">America, USA</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Footer -->
<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div class="footer-brand">Forgotten Towns</div>
        <p class="footer-desc">Documenting ghost towns and abandoned places across America — one state at a time.</p>
      </div>
      <div>
        <span class="footer-col-head">Navigate</span>
        <ul class="footer-list">
          <li><a href="#shop">Shop the Archive</a></li>
          <li><a href="#archive">About</a></li>
          <li><a href="#videos">All Episodes</a></li>
          <li><a href="#dispatch">Field Dispatch</a></li>
          <li><a href="https://www.youtube.com/@TheForgottenTowns" target="_blank" rel="noopener">YouTube ↗</a></li>
        </ul>
      </div>
      <div>
        <span class="footer-col-head">Support</span>
        <ul class="footer-list">
          <li><a href="#">Shipping & Returns</a></li>
          <li><a href="#">Size Guide</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">© 2026 Forgotten Towns. All rights reserved.</span>
      <span class="footer-coords"><b>38°12′N</b> · 119°00′W · Bodie, CA</span>
    </div>
  </div>
</footer>

<script>
// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Hero parallax — cursor-driven depth
const heroEl = document.getElementById('hero');
if (heroEl) {
  const moon = heroEl.querySelector('.moon');
  const sil = heroEl.querySelector('.hero-silhouette');
  const fog1 = heroEl.querySelector('.hero-fog.f1');
  const fog2 = heroEl.querySelector('.hero-fog.f2');
  heroEl.addEventListener('mousemove', (e) => {
    const r = heroEl.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (moon) moon.style.transform = \`translateX(calc(-50% + \${x * 16}px)) translateY(\${y * 12}px)\`;
    if (sil)  sil.style.transform  = \`translateX(\${x * -10}px)\`;
    if (fog1) fog1.style.transform = \`translateX(\${x * 24}px)\`;
    if (fog2) fog2.style.transform = \`translateX(\${x * -16}px)\`;
  });
}

// Newsletter
document.querySelector('.dispatch-btn').addEventListener('click', function() {
  const inp = document.querySelector('.dispatch-input');
  if (inp.value && inp.value.includes('@')) {
    inp.value = '';
    inp.placeholder = 'Filed. Watch your inbox.';
    this.textContent = '✓ Done';
    this.style.cssText += 'background:#2a3a20;border-color:#4a6a30;';
  } else {
    inp.style.borderColor = 'var(--fire)';
    inp.placeholder = 'Enter a valid email address';
    inp.focus();
    setTimeout(() => { inp.style.borderColor = ''; inp.placeholder = 'your@email.com'; }, 2000);
  }
});

// Video cards: click-to-play / click-to-stop (swap thumbnail for a youtube-nocookie iframe and back)
document.querySelectorAll('.video-card').forEach(card => {
  const vid = card.dataset.vid;
  const imgWrap = card.querySelector('.card-img');
  const btn = card.querySelector('.card-btn');
  const originalMarkup = imgWrap.innerHTML;

  const play = () => {
    imgWrap.classList.add('playing');
    imgWrap.innerHTML = \`<iframe src="https://www.youtube-nocookie.com/embed/\${vid}?autoplay=1&rel=0" title="Forgotten Towns episode" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\`;
    if (btn) btn.textContent = '✕ Stop';
  };
  const stop = () => {
    imgWrap.classList.remove('playing');
    imgWrap.innerHTML = originalMarkup;
    if (btn) btn.textContent = '▶ Play';
  };
  const toggle = () => { imgWrap.classList.contains('playing') ? stop() : play(); };

  card.addEventListener('click', toggle);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
});
</script>
</body>
</html>
`;
