import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VIDEOS, getVideo } from "../videos";

const YT = "https://www.youtube.com/channel/UCzoCFvVEoffY6XAdo9fAUgg";
const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export function generateStaticParams() {
  return VIDEOS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = getVideo(slug);
  if (!v) return { title: "Not found" };
  const url = `https://toolstack.tech/mindwire/${v.slug}`;
  return {
    title: v.title,
    description: v.hook,
    alternates: { canonical: url },
    openGraph: {
      title: v.title, description: v.hook, url, siteName: "Mindwire", type: "article",
      images: [{ url: `https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`, width: 1280, height: 720 }],
    },
  };
}

export default async function MindwireVideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = getVideo(slug);
  if (!v) notFound();
  const related = VIDEOS.filter((x) => x.slug !== v.slug).slice(0, 2);
  const watch = `https://www.youtube.com/watch?v=${v.youtubeId}`;

  return (
    <article className="mw-article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: v.title,
            description: v.hook,
            thumbnailUrl: [`https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`],
            uploadDate: v.published,
            embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
            contentUrl: watch,
            publisher: { "@type": "Organization", name: "Mindwire" },
          }),
        }}
      />
      <div className="mw-crumb"><Link href="/mindwire">Mindwire</Link> / {v.kicker}</div>
      <div className="mw-kick">{v.kicker}</div>
      <h1 className="mw-atitle mw-disp">{v.title}</h1>
      <div className="mw-ameta">By Mindwire · {new Date(v.published).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {v.read}</div>

      <div className="mw-embed">
        <iframe
          src={`https://www.youtube.com/embed/${v.youtubeId}?rel=0`}
          title={v.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <a href={watch} target="_blank" rel="noopener noreferrer" className="mw-watch">▶ Watch on YouTube (and subscribe)</a>

      <div className="mw-prose">
        {v.article.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="mw-cta-card">
        <h4 className="mw-disp">Your brain just did this to you.</h4>
        <a href={YT} target="_blank" rel="noopener noreferrer" className="mw-btn">Subscribe to Mindwire ▶</a>
      </div>

      <div className="mw-related">
        <h4>Keep going down the rabbit hole</h4>
        <div className="mw-grid">
          {related.map((r) => (
            <Link key={r.slug} href={`/mindwire/${r.slug}`} className="mw-card">
              <span className="mw-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(r.youtubeId)} alt={r.title} />
                <span className="mw-play"><span /></span>
              </span>
              <div className="mw-body">
                <div className="mw-kick">{r.kicker}</div>
                <h4>{r.title}</h4>
                <span className="rd">{r.read}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
