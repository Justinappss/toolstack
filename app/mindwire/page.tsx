import Link from "next/link";
import { VIDEOS } from "./videos";

const YT = "https://www.youtube.com/channel/UCzoCFvVEoffY6XAdo9fAUgg";
const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export default function MindwireHub() {
  const feat = VIDEOS[0];
  const rest = VIDEOS.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="mw-hero">
        <div className="mw-eyebrow">A new glitch in your head · every week</div>
        <h1 className="mw-h1 mw-disp">Your brain is weird.<br /><span className="mw-u">Here's the proof.</span></h1>
        <p className="mw-lede">
          Every day your own mind quietly glitches on you — hiding your phone in your hand, wiping your thoughts at a doorway,
          deleting your sentence mid-word. Mindwire takes one of these glitches apart every week, in plain English, so you finally understand the strangest machine you own.
        </p>
        <div className="mw-hero-cta">
          <a href="#videos" className="mw-btn">Explore the glitches</a>
          <a href={YT} target="_blank" rel="noopener noreferrer" className="mw-btn-ghost">Subscribe on YouTube ▶</a>
        </div>
      </section>

      {/* Featured */}
      <section className="mw-sec">
        <h2 className="mw-sec-h mw-disp"><span className="mw-spark">✦</span>Latest glitch</h2>
        <p className="mw-sec-sub">The newest one your brain is pulling on you right now.</p>
        <div className="mw-feat">
          <Link href={`/mindwire/${feat.slug}`} className="mw-thumb" aria-label={feat.title}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(feat.youtubeId)} alt={feat.title} />
            <span className="mw-play"><span /></span>
          </Link>
          <div>
            <div className="mw-kick">{feat.kicker}</div>
            <h3 className="mw-disp">{feat.title}</h3>
            <p>{feat.hook}</p>
            <Link href={`/mindwire/${feat.slug}`} className="mw-readmore">Watch &amp; read →</Link>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section id="videos" className="mw-sec">
        <h2 className="mw-sec-h mw-disp"><span className="mw-spark">✦</span>Every glitch, explained</h2>
        <p className="mw-sec-sub">Short, sharp breakdowns of the tricks your own mind plays.</p>
        <div className="mw-grid">
          {rest.map((v) => (
            <Link key={v.slug} href={`/mindwire/${v.slug}`} className="mw-card">
              <span className="mw-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(v.youtubeId)} alt={v.title} />
                <span className="mw-play"><span /></span>
              </span>
              <div className="mw-body">
                <div className="mw-kick">{v.kicker}</div>
                <h4>{v.title}</h4>
                <p className="ex">{v.hook}</p>
                <span className="rd">{v.read}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Email + shop */}
      <section className="mw-band">
        <div className="mw-email">
          <h3 className="mw-disp">Get a new brain glitch every week</h3>
          <p>New video, new way your mind is quietly messing with you — straight to your inbox. No spam, just the good stuff.</p>
          <a href={YT} target="_blank" rel="noopener noreferrer" className="mw-btn">Subscribe on YouTube ▶</a>
        </div>
        <div className="mw-shop">
          <div>
            <b>Mindwire merch is coming.</b><br />
            <span>Wear your favourite brain glitch. Notify me when it drops.</span>
          </div>
          <span className="mw-tag-soon">Shop · coming soon</span>
        </div>
      </section>
    </>
  );
}
