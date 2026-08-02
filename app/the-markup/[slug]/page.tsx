import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VIDEOS, getVideo } from "../videos";

const YT = "#"; // TODO: real channel URL once created
const thumb = (id: string) => (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "/the-markup/ep1-still.jpg");

export function generateStaticParams() {
  return VIDEOS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = getVideo(slug);
  if (!v) return { title: "Not found" };
  const url = `https://toolstack.tech/the-markup/${v.slug}`;
  const image = v.youtubeId
    ? { url: `https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`, width: 1280, height: 720 }
    : { url: "https://toolstack.tech/the-markup/ep1-still.jpg", width: 1920, height: 1080 };
  return {
    title: v.title,
    description: v.hook,
    alternates: { canonical: url },
    openGraph: {
      title: v.title, description: v.hook, url, siteName: "The Markup", type: "video.other",
      images: [image],
    },
  };
}

export default async function TheMarkupVideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = getVideo(slug);
  if (!v) notFound();
  const related = VIDEOS.filter((x) => x.slug !== v.slug).slice(0, 2);
  const watch = v.youtubeId ? `https://www.youtube.com/watch?v=${v.youtubeId}` : null;

  return (
    <article className="tm-article">
      {v.youtubeId && (
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
              publisher: {
                "@type": "Organization",
                name: "The Markup",
                logo: { "@type": "ImageObject", url: "https://toolstack.tech/the-markup/logo.png" },
              },
            }),
          }}
        />
      )}
      <div className="tm-crumb"><Link href="/the-markup">The Markup</Link> / {v.kicker}</div>
      <div className="tm-kick">{v.kicker}</div>
      <h1 className="tm-atitle">{v.title}</h1>
      <div className="tm-ameta">By The Markup · {new Date(v.published).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {v.read}</div>

      <div className="tm-embed">
        {v.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${v.youtubeId}?rel=0`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : v.localVideo ? (
          <video controls poster={thumb(v.youtubeId)} preload="metadata" aria-label={v.title}>
            <source src={v.localVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="tm-embed-soon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(v.youtubeId)} alt={v.title} />
            <div className="tm-inner">
              <span className="tm-tag">Coming soon</span>
              <p>This episode hasn't been published to YouTube yet.</p>
            </div>
          </div>
        )}
      </div>
      {watch && (
        <a href={watch} target="_blank" rel="noopener noreferrer" className="tm-watch">▶ Watch on YouTube (and subscribe)</a>
      )}

      <div className="tm-prose">
        {v.article.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="tm-cta-card">
        <h4>Get the next breakdown.</h4>
        <a href={YT} target="_blank" rel="noopener noreferrer" className="tm-btn">Subscribe to The Markup ▶</a>
      </div>

      {related.length > 0 && (
        <div className="tm-related">
          <h4>More breakdowns</h4>
          <div className="tm-grid">
            {related.map((r) => (
              <Link key={r.slug} href={`/the-markup/${r.slug}`} className="tm-card">
                <span className="tm-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb(r.youtubeId)} alt={r.title} />
                  {r.youtubeId || r.localVideo ? <span className="tm-play"><span /></span> : <span className="tm-ribbon">Coming soon</span>}
                </span>
                <div className="tm-body">
                  <div className="tm-kick">{r.kicker}</div>
                  <h4>{r.title}</h4>
                  <span className="rd">{r.read}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
