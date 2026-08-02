import Link from "next/link";
import { VIDEOS } from "./videos";

const YT = "#"; // TODO: real channel URL once created
const thumb = (id: string) => (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "/the-markup/ep1-still.jpg");

export default function TheMarkupHub() {
  const feat = VIDEOS[0];
  const rest = VIDEOS.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="tm-hero">
        <div className="tm-eyebrow">What it costs · what you pay · every week</div>
        <h1 className="tm-h1">The real math behind<br />the price on the shelf.</h1>
        <p className="tm-lede">
          The Markup takes an everyday product apart — what the materials and manufacturing actually cost, versus what
          you hand over at the till. No outrage, no conspiracy. Just the receipts, laid out plainly.
        </p>
        <div className="tm-hero-cta">
          <a href="#episodes" className="tm-btn">See the breakdowns</a>
          <a href={YT} target="_blank" rel="noopener noreferrer" className="tm-btn-ghost">Subscribe on YouTube ▶</a>
        </div>
      </section>

      {/* Featured */}
      <section className="tm-sec">
        <h2 className="tm-sec-h">Latest breakdown</h2>
        <p className="tm-sec-sub">The newest cost-vs-price teardown.</p>
        <div className="tm-feat">
          <Link href={`/the-markup/${feat.slug}`} className="tm-thumb" aria-label={feat.title}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(feat.youtubeId)} alt={feat.title} />
            {feat.youtubeId || feat.localVideo ? <span className="tm-play"><span /></span> : <span className="tm-ribbon">Coming soon</span>}
          </Link>
          <div>
            <div className="tm-kick">{feat.kicker}</div>
            <h3>{feat.title}</h3>
            <p>{feat.hook}</p>
            <Link href={`/the-markup/${feat.slug}`} className="tm-readmore">Read the breakdown →</Link>
          </div>
        </div>
      </section>

      {/* Grid */}
      {rest.length > 0 && (
        <section id="episodes" className="tm-sec">
          <h2 className="tm-sec-h">Every breakdown</h2>
          <p className="tm-sec-sub">What it costs, what you pay, item by item.</p>
          <div className="tm-grid">
            {rest.map((v) => (
              <Link key={v.slug} href={`/the-markup/${v.slug}`} className="tm-card">
                <span className="tm-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb(v.youtubeId)} alt={v.title} />
                  {v.youtubeId || v.localVideo ? <span className="tm-play"><span /></span> : <span className="tm-ribbon">Coming soon</span>}
                </span>
                <div className="tm-body">
                  <div className="tm-kick">{v.kicker}</div>
                  <h4>{v.title}</h4>
                  <p className="ex">{v.hook}</p>
                  <span className="rd">{v.read}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Email + shop */}
      <section className="tm-band">
        <div className="tm-email">
          <h3>Get a new breakdown every week</h3>
          <p>New episode, new product taken apart — cost vs. price, straight to your inbox.</p>
          <a href={YT} target="_blank" rel="noopener noreferrer" className="tm-btn">Subscribe on YouTube ▶</a>
        </div>
        <div className="tm-shop">
          <div>
            <b>The Markup merch is coming.</b><br />
            <span>Wear the receipts. Notify me when it drops.</span>
          </div>
          <span className="tm-tag-soon">Shop · coming soon</span>
        </div>
      </section>
    </>
  );
}
