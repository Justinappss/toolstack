import type { Metadata } from "next";
import Link from "next/link";

const YT = "https://www.youtube.com/channel/UCzoCFvVEoffY6XAdo9fAUgg";

export const metadata: Metadata = {
  title: { default: "Mindwire — Your Brain Is Weird. Here's Proof.", template: "%s · Mindwire" },
  description:
    "Mindwire explains the strange glitches your own brain runs on you — inattentional blindness, the doorway effect, why you forget mid-sentence. A new one every week.",
  metadataBase: new URL("https://toolstack.tech"),
  alternates: { canonical: "https://toolstack.tech/mindwire" },
  openGraph: {
    title: "Mindwire — Your Brain Is Weird. Here's Proof.",
    description: "The strange glitches your own brain runs on you, explained. A new one every week.",
    url: "https://toolstack.tech/mindwire",
    siteName: "Mindwire",
    type: "website",
  },
};

export default function MindwireLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mw-root">
      <style>{MW_CSS}</style>
      <header className="mw-header">
        <Link href="/mindwire" className="mw-brand">
          <span className="mw-spark">✦</span>MIND<b>WIRE</b>
        </Link>
        <nav className="mw-nav">
          <Link href="/mindwire" className="mw-navlink">Videos</Link>
          <span className="mw-navlink mw-soon">Shop · soon</span>
          <a href={YT} target="_blank" rel="noopener noreferrer" className="mw-sub">Subscribe ▶</a>
        </nav>
      </header>

      {children}

      <footer className="mw-footer">
        <div className="mw-foot-brand"><span className="mw-spark">✦</span>MIND<b>WIRE</b></div>
        <p className="mw-foot-tag">A new glitch in your head, every week.</p>
        <div className="mw-foot-links">
          <a href={YT} target="_blank" rel="noopener noreferrer">YouTube</a>
          <Link href="/mindwire">All videos</Link>
          <span className="mw-soon">Shop (coming soon)</span>
        </div>
        <p className="mw-foot-fine">© Mindwire · part of ToolStack</p>
      </footer>
    </div>
  );
}

const MW_CSS = `
.mw-root{--paper:#FAF6EC;--paper2:#FFFDF6;--ink:#1D1912;--ink2:#4B4436;--muted:#8B8271;--accent:#F5820D;--accent2:#FFB347;--line:rgba(29,25,18,.12);--line2:rgba(29,25,18,.2);
  background:
    radial-gradient(rgba(29,25,18,.045) 1px, transparent 1px) 0 0/22px 22px,
    var(--paper);
  color:var(--ink);min-height:100vh;
  font-family:-apple-system,"Segoe UI",system-ui,sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased;}
.mw-root ::selection{background:var(--accent);color:#fff}
.mw-disp{font-family:"SF Pro Rounded",ui-rounded,"Segoe UI",system-ui,sans-serif}
.mw-spark{color:var(--accent);margin-right:.32em;font-size:.82em}
.mw-header{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;
  padding:16px clamp(18px,5vw,54px);backdrop-filter:blur(8px);background:rgba(250,246,236,.82);border-bottom:1px solid var(--line)}
.mw-brand{font-family:"SF Pro Rounded",ui-rounded,system-ui;font-weight:800;font-size:22px;letter-spacing:.02em;color:var(--ink);text-decoration:none}
.mw-brand b{color:var(--accent)}
.mw-nav{display:flex;align-items:center;gap:clamp(12px,2.4vw,26px)}
.mw-navlink{font-weight:700;font-size:14.5px;color:var(--ink2);text-decoration:none}
.mw-navlink:hover{color:var(--accent)}
.mw-soon{color:var(--muted);font-weight:600;font-size:13px}
.mw-sub{background:var(--ink);color:var(--paper);font-weight:800;font-size:14px;padding:9px 18px;border-radius:999px;text-decoration:none;box-shadow:0 6px 16px -6px rgba(29,25,18,.5)}
.mw-sub:hover{background:var(--accent);color:#1a0f04}
.mw-wrap{max-width:1120px;margin:0 auto;padding:0 clamp(18px,5vw,40px)}

/* hero */
.mw-hero{max-width:1120px;margin:0 auto;padding:clamp(54px,9vw,104px) clamp(18px,5vw,40px) clamp(30px,5vw,54px);text-align:center}
.mw-eyebrow{font-size:13px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:var(--accent)}
.mw-h1{font-family:"SF Pro Rounded",ui-rounded,system-ui;font-weight:850;font-size:clamp(40px,8vw,86px);line-height:.98;letter-spacing:-.02em;margin:.24em 0 0;text-wrap:balance}
.mw-u{position:relative;white-space:nowrap}
.mw-u::after{content:"";position:absolute;left:-2px;right:-4px;bottom:.06em;height:.36em;z-index:-1;background:var(--accent);opacity:.9;border-radius:45% 55% 50% 50%;transform:rotate(-1.4deg)}
.mw-lede{font-size:clamp(17px,2.4vw,21px);color:var(--ink2);max-width:60ch;margin:22px auto 0}
.mw-hero-cta{margin-top:30px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.mw-btn{background:linear-gradient(92deg,var(--accent),var(--accent2));color:#1a0f04;font-weight:850;font-size:17px;padding:15px 28px;border-radius:14px;text-decoration:none;box-shadow:0 14px 34px -10px var(--accent)}
.mw-btn-ghost{background:var(--paper2);color:var(--ink);border:1px solid var(--line2);font-weight:800;font-size:17px;padding:15px 26px;border-radius:14px;text-decoration:none}

/* section head */
.mw-sec{max-width:1120px;margin:0 auto;padding:clamp(30px,5vw,56px) clamp(18px,5vw,40px)}
.mw-sec-h{font-family:"SF Pro Rounded",ui-rounded,system-ui;font-weight:800;font-size:clamp(22px,3.4vw,30px);margin:0 0 4px;display:flex;align-items:center;gap:12px}
.mw-sec-sub{color:var(--muted);font-weight:600;font-size:15px;margin:0 0 22px}

/* featured */
.mw-feat{display:grid;grid-template-columns:1.15fr 1fr;gap:26px;align-items:center;background:var(--paper2);border:1px solid var(--line);border-radius:22px;padding:22px;box-shadow:0 20px 44px rgba(29,25,18,.08)}
@media(max-width:760px){.mw-feat{grid-template-columns:1fr}}
.mw-thumb{position:relative;display:block;border-radius:16px;overflow:hidden;aspect-ratio:16/9;border:1px solid var(--line)}
.mw-thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease}
.mw-thumb:hover img{transform:scale(1.04)}
.mw-play{position:absolute;inset:0;display:grid;place-items:center}
.mw-play span{width:66px;height:66px;border-radius:50%;background:rgba(245,130,13,.95);display:grid;place-items:center;box-shadow:0 10px 30px rgba(0,0,0,.35)}
.mw-play span::after{content:"";border-left:22px solid #fff;border-top:13px solid transparent;border-bottom:13px solid transparent;margin-left:5px}
.mw-kick{font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
.mw-feat h3{font-family:"SF Pro Rounded",ui-rounded,system-ui;font-weight:800;font-size:clamp(22px,3vw,32px);line-height:1.06;margin:8px 0 10px}
.mw-feat p{color:var(--ink2);font-size:16px;margin:0 0 16px}
.mw-readmore{font-weight:800;color:var(--accent);text-decoration:none}

/* grid */
.mw-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:22px}
.mw-card{background:var(--paper2);border:1px solid var(--line);border-radius:18px;overflow:hidden;box-shadow:0 10px 26px rgba(29,25,18,.06);display:flex;flex-direction:column;transition:transform .18s ease,box-shadow .18s ease;text-decoration:none;color:inherit}
.mw-card:hover{transform:translateY(-4px);box-shadow:0 22px 44px rgba(29,25,18,.12)}
.mw-card .mw-body{padding:16px 18px 18px;display:flex;flex-direction:column;gap:7px;flex:1}
.mw-card h4{font-family:"SF Pro Rounded",ui-rounded,system-ui;font-weight:800;font-size:19px;line-height:1.12;margin:0}
.mw-card .ex{font-size:14px;color:var(--ink2);flex:1}
.mw-card .rd{font-size:12.5px;color:var(--muted);font-weight:700}

/* email + shop */
.mw-band{max-width:1120px;margin:0 auto;padding:0 clamp(18px,5vw,40px)}
.mw-email{background:linear-gradient(180deg,var(--accent),#e8720a);color:#fff;border-radius:22px;padding:clamp(28px,5vw,44px);text-align:center;box-shadow:0 24px 50px -16px var(--accent)}
.mw-email h3{font-family:"SF Pro Rounded",ui-rounded,system-ui;font-weight:850;font-size:clamp(24px,4vw,36px);margin:0 0 8px;color:#fff}
.mw-email p{margin:0 auto 18px;max-width:52ch;color:rgba(255,255,255,.92)}
.mw-email .mw-btn{background:#fff;color:#c1610a}
.mw-shop{margin-top:22px;background:var(--paper2);border:1px dashed var(--line2);border-radius:18px;padding:22px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.mw-shop b{font-family:"SF Pro Rounded",ui-rounded,system-ui;font-size:18px}
.mw-shop span{color:var(--muted);font-size:14px}
.mw-tag-soon{background:var(--accent-soft,rgba(245,130,13,.14));color:var(--accent);font-weight:800;font-size:12px;padding:5px 12px;border-radius:999px;border:1px solid var(--line2)}

/* footer */
.mw-footer{max-width:1120px;margin:clamp(40px,6vw,72px) auto 0;padding:34px clamp(18px,5vw,40px) 54px;border-top:1px solid var(--line);text-align:center}
.mw-foot-brand{font-family:"SF Pro Rounded",ui-rounded,system-ui;font-weight:800;font-size:20px}
.mw-foot-brand b{color:var(--accent)}
.mw-foot-tag{color:var(--ink2);margin:6px 0 16px}
.mw-foot-links{display:flex;gap:22px;justify-content:center;flex-wrap:wrap;font-weight:700;font-size:14px}
.mw-foot-links a{color:var(--ink2);text-decoration:none}.mw-foot-links a:hover{color:var(--accent)}
.mw-foot-fine{color:var(--muted);font-size:12.5px;margin-top:18px}

/* article page */
.mw-article{max-width:760px;margin:0 auto;padding:clamp(24px,5vw,44px) clamp(18px,5vw,26px) 20px}
.mw-crumb{font-size:13px;font-weight:700;color:var(--muted);margin-bottom:16px}
.mw-crumb a{color:var(--muted);text-decoration:none}.mw-crumb a:hover{color:var(--accent)}
.mw-atitle{font-family:"SF Pro Rounded",ui-rounded,system-ui;font-weight:850;font-size:clamp(30px,5.5vw,50px);line-height:1.02;letter-spacing:-.01em;margin:.1em 0 .2em;text-wrap:balance}
.mw- ameta,.mw-ameta{color:var(--muted);font-size:14px;font-weight:600;margin-bottom:22px}
.mw-embed{position:relative;aspect-ratio:16/9;border-radius:18px;overflow:hidden;border:1px solid var(--line);box-shadow:0 20px 44px rgba(29,25,18,.12);margin-bottom:12px}
.mw-embed iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.mw-watch{display:inline-block;margin:4px 0 26px;font-weight:800;color:var(--accent);text-decoration:none}
.mw-prose p{font-size:clamp(17px,2.2vw,19px);color:var(--ink);margin:0 0 20px;line-height:1.7}
.mw-prose p:first-of-type::first-letter{font-family:"SF Pro Rounded",ui-rounded;font-size:3.4em;font-weight:850;float:left;line-height:.8;margin:.05em .12em 0 0;color:var(--accent)}
.mw-cta-card{margin:36px 0;background:var(--paper2);border:1px solid var(--line);border-radius:18px;padding:24px;text-align:center;box-shadow:0 12px 30px rgba(29,25,18,.08)}
.mw-cta-card h4{font-family:"SF Pro Rounded",ui-rounded;font-weight:800;font-size:22px;margin:0 0 12px}
.mw-related{border-top:1px solid var(--line);padding-top:26px;margin-top:10px}
.mw-related h4{font-family:"SF Pro Rounded",ui-rounded;font-weight:800;font-size:16px;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;margin:0 0 16px}
`;
