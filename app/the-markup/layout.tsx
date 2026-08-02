import type { Metadata } from "next";
import Link from "next/link";

const YT = "#"; // TODO: real channel URL once created

export const metadata: Metadata = {
  title: { default: "The Markup — What It Costs. What You Pay.", template: "%s · The Markup" },
  description:
    "The Markup breaks down the real manufacturing cost behind everyday purchases versus what you actually pay for them. Calm, evidence-led, no hype.",
  metadataBase: new URL("https://toolstack.tech"),
  alternates: { canonical: "https://toolstack.tech/the-markup" },
  openGraph: {
    title: "The Markup — What It Costs. What You Pay.",
    description: "The real manufacturing cost behind everyday purchases, versus what you actually pay.",
    url: "https://toolstack.tech/the-markup",
    siteName: "The Markup",
    type: "website",
  },
};

export default function TheMarkupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tm-root">
      <style>{TM_CSS}</style>
      <header className="tm-header">
        <Link href="/the-markup" className="tm-brand">
          <span className="tm-mark">$</span>THE MARKUP
        </Link>
        <nav className="tm-nav">
          <Link href="/the-markup" className="tm-navlink">Episodes</Link>
          <span className="tm-navlink tm-soon">Shop · soon</span>
          <a href={YT} target="_blank" rel="noopener noreferrer" className="tm-sub">Subscribe ▶</a>
        </nav>
      </header>

      {children}

      <footer className="tm-footer">
        <div className="tm-foot-brand"><span className="tm-mark">$</span>THE MARKUP</div>
        <p className="tm-foot-tag">What it costs. What you pay.</p>
        <div className="tm-foot-links">
          <a href={YT} target="_blank" rel="noopener noreferrer">YouTube</a>
          <Link href="/the-markup">All episodes</Link>
          <span className="tm-soon">Shop (coming soon)</span>
        </div>
        <p className="tm-foot-fine">© The Markup · part of ToolStack</p>
      </footer>
    </div>
  );
}

const TM_CSS = `
.tm-root{--ground:#14171C;--panel:#1B1F26;--paper:#EDE9E0;--paper2:#B9B4A6;--muted:#7A7668;--gold:#C9A227;--vermillion:#E8462F;--line:rgba(237,233,224,.12);--line2:rgba(237,233,224,.22);
  background:var(--ground);color:var(--paper);min-height:100vh;
  font-family:Georgia,"Iowan Old Style","Times New Roman",serif;line-height:1.65;-webkit-font-smoothing:antialiased;}
.tm-root ::selection{background:var(--vermillion);color:#fff}
.tm-mono{font-family:"JetBrains Mono","Fira Code","Courier New",monospace}
.tm-mark{color:var(--vermillion);margin-right:.4em;font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-weight:700}
.tm-header{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;
  padding:16px clamp(18px,5vw,54px);backdrop-filter:blur(8px);background:rgba(20,23,28,.86);border-bottom:1px solid var(--line)}
.tm-brand{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-weight:700;font-size:19px;letter-spacing:.06em;color:var(--paper);text-decoration:none}
.tm-nav{display:flex;align-items:center;gap:clamp(12px,2.4vw,26px)}
.tm-navlink{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-weight:600;font-size:13px;letter-spacing:.02em;color:var(--paper2);text-decoration:none}
.tm-navlink:hover{color:var(--gold)}
.tm-soon{color:var(--muted);font-weight:600;font-size:12.5px}
.tm-sub{background:var(--vermillion);color:#fff;font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-weight:700;font-size:13px;letter-spacing:.02em;padding:9px 18px;border-radius:4px;text-decoration:none}
.tm-sub:hover{background:#d13a24}
.tm-wrap{max-width:1120px;margin:0 auto;padding:0 clamp(18px,5vw,40px)}

/* hero */
.tm-hero{position:relative;max-width:1120px;margin:0 auto;padding:clamp(54px,9vw,104px) clamp(18px,5vw,40px) clamp(30px,5vw,54px);border-bottom:1px solid var(--line)}
.tm-eyebrow{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-size:12.5px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.tm-h1{font-family:Georgia,"Iowan Old Style",serif;font-weight:700;font-size:clamp(38px,7vw,76px);line-height:1.03;letter-spacing:-.01em;margin:.24em 0 0;max-width:16ch;text-wrap:balance}
.tm-u{position:relative;color:var(--vermillion)}
.tm-lede{font-family:-apple-system,"Segoe UI",system-ui,sans-serif;font-size:clamp(16px,2.2vw,19px);color:var(--paper2);max-width:62ch;margin:22px 0 0}
.tm-hero-cta{margin-top:30px;display:flex;gap:12px;flex-wrap:wrap}
.tm-btn{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;background:var(--vermillion);color:#fff;font-weight:700;font-size:14.5px;letter-spacing:.02em;padding:14px 24px;border-radius:4px;text-decoration:none}
.tm-btn:hover{background:#d13a24}
.tm-btn-ghost{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;background:transparent;color:var(--paper);border:1px solid var(--line2);font-weight:700;font-size:14.5px;letter-spacing:.02em;padding:14px 22px;border-radius:4px;text-decoration:none}
.tm-btn-ghost:hover{border-color:var(--gold);color:var(--gold)}

/* section head */
.tm-sec{max-width:1120px;margin:0 auto;padding:clamp(30px,5vw,56px) clamp(18px,5vw,40px)}
.tm-sec-h{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-weight:700;font-size:clamp(18px,2.6vw,22px);letter-spacing:.06em;text-transform:uppercase;margin:0 0 4px;color:var(--paper)}
.tm-sec-sub{font-family:-apple-system,"Segoe UI",system-ui,sans-serif;color:var(--muted);font-weight:500;font-size:14.5px;margin:0 0 22px}

/* featured */
.tm-feat{display:grid;grid-template-columns:1.15fr 1fr;gap:26px;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:22px}
@media(max-width:760px){.tm-feat{grid-template-columns:1fr}}
.tm-thumb{position:relative;display:block;border-radius:6px;overflow:hidden;aspect-ratio:16/9;border:1px solid var(--line);background:#0e1014}
.tm-thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease;opacity:.88}
.tm-thumb:hover img{transform:scale(1.03)}
.tm-play{position:absolute;inset:0;display:grid;place-items:center}
.tm-play span{width:60px;height:60px;border-radius:50%;background:rgba(232,70,47,.95);display:grid;place-items:center;box-shadow:0 10px 30px rgba(0,0,0,.5)}
.tm-play span::after{content:"";border-left:20px solid #fff;border-top:12px solid transparent;border-bottom:12px solid transparent;margin-left:5px}
.tm-ribbon{position:absolute;top:14px;left:14px;background:var(--gold);color:#14171C;font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-weight:700;font-size:11px;letter-spacing:.08em;text-transform:uppercase;padding:6px 12px;border-radius:3px}
.tm-kick{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-size:11.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}
.tm-feat h3{font-family:Georgia,"Iowan Old Style",serif;font-weight:700;font-size:clamp(21px,2.8vw,30px);line-height:1.1;margin:8px 0 10px}
.tm-feat p{font-family:-apple-system,"Segoe UI",system-ui,sans-serif;color:var(--paper2);font-size:15.5px;margin:0 0 16px}
.tm-readmore{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-weight:700;font-size:13.5px;color:var(--vermillion);text-decoration:none}

/* grid */
.tm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:22px}
.tm-card{background:var(--panel);border:1px solid var(--line);border-radius:8px;overflow:hidden;display:flex;flex-direction:column;transition:transform .18s ease,border-color .18s ease;text-decoration:none;color:inherit}
.tm-card:hover{transform:translateY(-3px);border-color:var(--line2)}
.tm-card .tm-body{padding:16px 18px 18px;display:flex;flex-direction:column;gap:7px;flex:1}
.tm-card h4{font-family:Georgia,"Iowan Old Style",serif;font-weight:700;font-size:18px;line-height:1.16;margin:0;color:var(--paper)}
.tm-card .ex{font-family:-apple-system,"Segoe UI",system-ui,sans-serif;font-size:13.5px;color:var(--paper2);flex:1}
.tm-card .rd{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-size:11.5px;color:var(--muted);font-weight:600}

/* email + shop */
.tm-band{max-width:1120px;margin:0 auto;padding:0 clamp(18px,5vw,40px)}
.tm-email{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:clamp(28px,5vw,44px);text-align:center}
.tm-email h3{font-family:Georgia,"Iowan Old Style",serif;font-weight:700;font-size:clamp(22px,3.6vw,32px);margin:0 0 8px;color:var(--paper)}
.tm-email p{font-family:-apple-system,"Segoe UI",system-ui,sans-serif;margin:0 auto 18px;max-width:52ch;color:var(--paper2)}
.tm-shop{margin-top:22px;background:transparent;border:1px dashed var(--line2);border-radius:8px;padding:22px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.tm-shop b{font-family:Georgia,"Iowan Old Style",serif;font-size:17px;color:var(--paper)}
.tm-shop span{font-family:-apple-system,"Segoe UI",system-ui,sans-serif;color:var(--muted);font-size:13.5px}
.tm-tag-soon{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;background:rgba(201,162,39,.12);color:var(--gold);font-weight:700;font-size:11px;letter-spacing:.04em;padding:5px 12px;border-radius:3px;border:1px solid var(--line2)}

/* footer */
.tm-footer{max-width:1120px;margin:clamp(40px,6vw,72px) auto 0;padding:34px clamp(18px,5vw,40px) 54px;border-top:1px solid var(--line);text-align:center}
.tm-foot-brand{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-weight:700;font-size:16px;letter-spacing:.05em;color:var(--paper)}
.tm-foot-tag{font-family:-apple-system,"Segoe UI",system-ui,sans-serif;color:var(--paper2);margin:6px 0 16px;font-size:14px}
.tm-foot-links{display:flex;gap:22px;justify-content:center;flex-wrap:wrap;font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-weight:600;font-size:12.5px}
.tm-foot-links a{color:var(--paper2);text-decoration:none}.tm-foot-links a:hover{color:var(--gold)}
.tm-foot-fine{font-family:-apple-system,"Segoe UI",system-ui,sans-serif;color:var(--muted);font-size:12px;margin-top:18px}

/* article page */
.tm-article{max-width:740px;margin:0 auto;padding:clamp(24px,5vw,44px) clamp(18px,5vw,26px) 20px}
.tm-crumb{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-size:12px;font-weight:600;color:var(--muted);margin-bottom:16px}
.tm-crumb a{color:var(--muted);text-decoration:none}.tm-crumb a:hover{color:var(--gold)}
.tm-atitle{font-family:Georgia,"Iowan Old Style",serif;font-weight:700;font-size:clamp(28px,5vw,46px);line-height:1.08;letter-spacing:-.01em;margin:.1em 0 .2em;text-wrap:balance}
.tm-ameta{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;color:var(--muted);font-size:12.5px;font-weight:600;margin-bottom:22px}
.tm-embed{position:relative;aspect-ratio:16/9;border-radius:8px;overflow:hidden;border:1px solid var(--line);margin-bottom:12px;background:#0e1014}
.tm-embed iframe,.tm-embed video{position:absolute;inset:0;width:100%;height:100%;border:0}
.tm-embed-soon{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;padding:20px}
.tm-embed-soon img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.35}
.tm-embed-soon .tm-inner{position:relative;z-index:1;font-family:"JetBrains Mono","Fira Code","Courier New",monospace}
.tm-embed-soon .tm-tag{background:var(--gold);color:#14171C;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:6px 14px;border-radius:3px}
.tm-embed-soon p{margin:10px 0 0;color:var(--paper2);font-size:13.5px}
.tm-watch{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;display:inline-block;margin:4px 0 26px;font-weight:700;font-size:13.5px;color:var(--vermillion);text-decoration:none}
.tm-prose p{font-family:Georgia,"Iowan Old Style",serif;font-size:clamp(17px,2.1vw,19px);color:var(--paper);margin:0 0 20px;line-height:1.75}
.tm-cta-card{margin:36px 0;background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:24px;text-align:center}
.tm-cta-card h4{font-family:Georgia,"Iowan Old Style",serif;font-weight:700;font-size:20px;margin:0 0 12px;color:var(--paper)}
.tm-related{border-top:1px solid var(--line);padding-top:26px;margin-top:10px}
.tm-related h4{font-family:"JetBrains Mono","Fira Code","Courier New",monospace;font-weight:700;font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;margin:0 0 16px}
`;
