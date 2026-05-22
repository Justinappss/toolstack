import Image from "next/image";
import Link from "next/link";

const accent = "#06b6d4";
const accentDim = "rgba(6,182,212,0.12)";
const accentBorder = "rgba(6,182,212,0.35)";
const muted = "rgba(255,255,255,0.58)";

const dataFields = [
  { icon: "📍", label: "Geolocation", detail: "Country, region, city (~25 mile radius)" },
  { icon: "🌐", label: "ISP", detail: "Internet Service Provider name" },
  { icon: "🏢", label: "Organisation", detail: "Company or hosting provider" },
  { icon: "🔢", label: "ASN", detail: "Autonomous System Number" },
  { icon: "🕐", label: "Timezone", detail: "Local timezone of the IP" },
  { icon: "🖥️", label: "Hostname", detail: "Reverse DNS name if available" },
  { icon: "🕵️", label: "Proxy / VPN", detail: "Flagged yes/no with type" },
  { icon: "📡", label: "IP Version", detail: "IPv4 or IPv6 protocol" },
];

const steps = [
  {
    number: "01",
    title: "Go to the free IP lookup tool",
    time: "30 seconds",
    content:
      "Head to toolstack.tech/tools/ip-address-lookup. No account, no signup, no download. Your public IP address is detected and displayed automatically the moment you land on the page.",
    tip: "Bookmark it — you'll use this more than you expect.",
  },
  {
    number: "02",
    title: "Read your results",
    time: "1 minute",
    content:
      "You'll see 8 data fields instantly: geolocation, ISP, organisation, ASN, timezone, hostname, and proxy/VPN detection. Each field is labelled clearly. The organisation field is one of the most useful — if it says Amazon Web Services or Google Cloud, you're looking at a server, not a person.",
    tip: "The city shown is where your ISP registered the IP block — not necessarily where you physically are.",
  },
  {
    number: "03",
    title: "Look up any IP address",
    time: "30 seconds",
    content:
      "Paste any public IP address into the input field and hit Look Up. You can investigate a suspicious login IP, check where a website's server is located, or verify whether an IP belongs to a real user or a datacenter.",
    tip: "Private IPs (192.168.x.x, 10.x.x.x) won't return results — they only exist on local networks.",
  },
  {
    number: "04",
    title: "Interpret the data correctly",
    time: "2 minutes",
    content:
      "Country-level accuracy is 99%+. City-level is 50–75%. IP geolocation is not GPS — it shows where an ISP registered the IP range, not a physical street address. For VPN detection, a 'yes' flag with a datacenter organisation name is a strong indicator the IP isn't a real residential user.",
    tip: "Mobile data IPs often geolocate to a cell tower city, not the user's actual location.",
  },
];

const useCases = [
  {
    icon: "🔒",
    title: "Verify Your VPN Is Working",
    desc: "Run a lookup before connecting to your VPN and note your country and ISP. Connect, then run it again. If the country changes, your VPN is routing correctly. If it doesn't, your traffic is still exposed.",
  },
  {
    icon: "🚨",
    title: "Investigate Suspicious Logins",
    desc: "A login from an unexpected country or a datacenter IP is a red flag. Paste the login IP into the tool — if the organisation field shows AWS or DigitalOcean, someone used a server or VPN to access your account.",
  },
  {
    icon: "🤖",
    title: "Identify Bot Traffic",
    desc: "Most automated bots originate from datacenter IPs, not residential connections. If you're seeing suspicious traffic on your website, look up those IPs. A datacenter ASN confirms you're dealing with bots, not real visitors.",
  },
  {
    icon: "💳",
    title: "Catch Payment Fraud",
    desc: "E-commerce teams use IP lookup to flag orders where the billing address country doesn't match the IP country. A UK billing address with a Nigerian IP is a common fraud signal that manual review can catch instantly.",
  },
  {
    icon: "🔧",
    title: "Troubleshoot Network Issues",
    desc: "If you're experiencing connectivity problems, look up the IPs in your traceroute output. Identifying which ISP or ASN controls the problematic hop tells you exactly where to direct a support request.",
  },
];

const mistakes = [
  {
    mistake: "Confusing private IP with public IP",
    fix: "Your private IP (192.168.x.x or 10.x.x.x) is only visible on your local network. IP lookup tools only work with public IPs — the address your ISP assigns you.",
  },
  {
    mistake: "Expecting street-level accuracy",
    fix: "IP geolocation shows the city where your ISP registered the IP block, not your home address. City-level accuracy is 50–75%. Never use it as a substitute for GPS location.",
  },
  {
    mistake: "Assuming a datacenter IP means fraud",
    fix: "Many legitimate users access the internet through corporate proxies, cloud desktops, or VPNs that show datacenter IPs. It's a signal to investigate further, not an automatic fraud verdict.",
  },
  {
    mistake: "Forgetting that mobile IPs rotate",
    fix: "Mobile carriers share IP blocks across thousands of users. A mobile IP may geolocate to a cell tower city miles from the user's actual location, and the same IP may be reused by many different people.",
  },
  {
    mistake: "Looking up IPv6 addresses incorrectly",
    fix: "IPv6 addresses are longer and use colons instead of dots. The tool handles both IPv4 and IPv6 — just paste the full address including all segments.",
  },
];

const accuracyData = [
  { level: "Country", accuracy: 99, color: "#22c55e" },
  { level: "Region / State", accuracy: 85, color: "#84cc16" },
  { level: "City", accuracy: 65, color: "#eab308" },
  { level: "Street", accuracy: 5, color: "#ef4444" },
];

const faqs = [
  {
    q: "What does an IP address lookup show?",
    a: "It reveals the country, region, and city the IP is registered to, the ISP, the organisation or hosting company, the ASN, timezone, hostname, and whether the IP is flagged as a VPN, proxy, or datacenter.",
  },
  {
    q: "How accurate is IP address geolocation?",
    a: "Country-level is 99%+ accurate. Region/state is 80–90%. City is 50–75%. Street-level is not reliable — it shows where an ISP registered an IP block, not the user's physical location.",
  },
  {
    q: "Can I look up someone else's IP address?",
    a: "You can look up any public IP address. Looking up IPs that contacted your server is legal in virtually all jurisdictions. Using IP lookup to track individuals without consent may violate GDPR and other privacy laws.",
  },
  {
    q: "What is the difference between a public and private IP?",
    a: "A private IP (192.168.x.x or 10.x.x.x) exists only on your local network and cannot be looked up externally. A public IP is assigned by your ISP and is what the internet sees. Only public IPs can be looked up.",
  },
  {
    q: "How do I check if my VPN is working?",
    a: "Run a lookup before connecting and note your country and ISP. Connect to the VPN and run it again. If the country and ISP have changed, your VPN is routing correctly.",
  },
  {
    q: "Why does my IP show the wrong city?",
    a: "IP geolocation shows where your ISP registered the IP block, which may differ from your actual location. Mobile data IPs often geolocate to a cell tower city. This is a known limitation of IP-based geolocation.",
  },
  {
    q: "What is an ASN in an IP lookup?",
    a: "ASN stands for Autonomous System Number — it identifies the network that controls a block of IP addresses. If the ASN belongs to AWS or Google Cloud, the IP is almost certainly a server or bot rather than a real person.",
  },
  {
    q: "Is the IP address lookup tool really free?",
    a: "Yes — completely free, no account required. Visit toolstack.tech/tools/ip-address-lookup to look up any IP instantly.",
  },
];

const tocItems = [
  { id: "what-it-shows", label: "What It Shows" },
  { id: "how-to-use", label: "How to Use It" },
  { id: "accuracy", label: "Geolocation Accuracy" },
  { id: "use-cases", label: "5 Use Cases" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "faq", label: "FAQ" },
];

export default function Page() {
  return (
    <div style={{ background: "#0a0b0f", minHeight: "100vh", color: "white", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <style>{`
        .toc-link { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 13px; padding: 6px 12px; border-radius: 6px; display: block; transition: all 0.15s; border-left: 2px solid transparent; }
        .toc-link:hover { color: #06b6d4; background: rgba(6,182,212,0.08); border-left-color: #06b6d4; }
        .step-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; transition: border-color 0.2s; }
        .step-card:hover { border-color: rgba(6,182,212,0.3); }
        .use-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 24px; transition: border-color 0.2s; }
        .use-card:hover { border-color: rgba(6,182,212,0.3); }
        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.08); padding: 20px 0; }
        .faq-item:last-child { border-bottom: none; }
        .mistake-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .mistake-row:last-child { border-bottom: none; }
        .checklist-item { display: flex; align-items: flex-start; gap: 12px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .checklist-item:last-child { border-bottom: none; }
        @media (max-width: 900px) { .layout-grid { flex-direction: column !important; } .sidebar { display: none !important; } .mistake-row { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* Banner placeholder */}
      <div style={{ width: "100%", height: 380, background: "linear-gradient(135deg, #0a0b0f 0%, #0d1117 50%, #091418 100%)", borderBottom: "1px solid rgba(6,182,212,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>Hero Banner Coming Soon</p>
      </div>

      {/* Hero content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 0" }}>
        {/* Breadcrumb */}
        <nav style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: muted, marginBottom: 24 }}>
          <Link href="/" style={{ color: muted, textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/blog" style={{ color: muted, textDecoration: "none" }}>Blog</Link>
          <span>/</span>
          <span style={{ color: accent }}>IP Address Lookup Guide</span>
        </nav>

        {/* Tag */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: accentDim, border: `1px solid ${accentBorder}`, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600, color: accent, marginBottom: 20, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Security & Networking
        </div>

        <h1 style={{ fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 20, color: "white" }}>
          How to Use an IP Address Lookup Tool — Complete Guide 2026
        </h1>

        <p style={{ fontSize: 19, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, marginBottom: 28 }}>
          Your IP address reveals more than you think — geolocation, ISP, VPN status, and whether you're a bot. Here's exactly how to read all of it, and what to do with the information.
        </p>

        {/* Meta bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
          <Image src="/blog/how-to-use-ip-address-lookup/author-avatar.jpg" alt="Justin Pirrie" width={40} height={40} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: `2px solid ${accentBorder}`, flexShrink: 0 }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: "white" }}>Justin Pirrie</span>
          <span style={{ color: muted, fontSize: 13 }}>·</span>
          <span style={{ fontSize: 13, color: muted }}>May 22, 2026</span>
          <span style={{ color: muted, fontSize: 13 }}>·</span>
          <span style={{ fontSize: 13, color: muted }}>8 min read</span>
          <span style={{ color: muted, fontSize: 13 }}>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#22c55e", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 20, padding: "3px 10px" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            Updated 2026
          </span>
        </div>
      </div>

      {/* Main layout */}
      <div className="layout-grid" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px 80px", display: "flex", gap: 48, alignItems: "flex-start" }}>

        {/* Article content */}
        <article style={{ flex: 1, minWidth: 0 }}>

          {/* YouTube embed */}
          <div style={{ marginBottom: 40, borderRadius: 14, overflow: "hidden", border: `1px solid ${accentBorder}`, aspectRatio: "16/9", position: "relative" }}>
            <iframe
              src="https://www.youtube.com/embed/wArK7NN0kg4"
              title="IP Address Lookup: What It Reveals & How to Use It Free (2026)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none", position: "absolute", top: 0, left: 0 }}
            />
          </div>

          {/* Audio overview */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${accentBorder}`, borderRadius: 14, padding: 20, marginBottom: 40, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: accentDim, border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>🎧</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: accent, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Audio Overview</p>
              <p style={{ fontSize: 13, color: muted, margin: "0 0 10px" }}>Why IP Geolocation Isn&apos;t Like GPS — listen while you read</p>
              <audio controls style={{ width: "100%", height: 36 }}>
                <source src="/blog/how-to-use-ip-address-lookup/audio-overview.m4a" type="audio/mp4" />
              </audio>
            </div>
          </div>

          {/* What you'll learn */}
          <div style={{ background: accentDim, border: `1px solid ${accentBorder}`, borderRadius: 14, padding: 24, marginBottom: 48 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 14px" }}>What You&apos;ll Learn</p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {["What every field in an IP address lookup means", "How to run a lookup in 30 seconds — free, no signup", "The truth about IP geolocation accuracy", "5 real-world use cases with step-by-step instructions", "Common mistakes that lead to wrong conclusions"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: "rgba(255,255,255,0.85)" }}>
                  <span style={{ color: accent, flexShrink: 0, marginTop: 1 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Section: What it shows */}
          <section id="what-it-shows" style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16, color: "white" }}>
              What Does an IP Address Lookup Actually Show?
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 28 }}>
              When you run a lookup on any public IP address, you get eight data fields. Each one tells you something different — and knowing how to read them is what separates useful intelligence from misinterpretation.
            </p>

            {/* Infographic - What it reveals */}
            <div style={{ marginBottom: 28, borderRadius: 14, overflow: "hidden", border: `1px solid rgba(255,255,255,0.08)` }}>
              <img src="/blog/how-to-use-ip-address-lookup/infographic-reveals.png" alt="What an IP address lookup reveals — 8 data fields explained" style={{ width: "100%", display: "block" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 28 }}>
              {dataFields.map((f) => (
                <div key={f.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 4px" }}>{f.label}</p>
                    <p style={{ fontSize: 12, color: muted, margin: 0, lineHeight: 1.5 }}>{f.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${accentBorder}`, borderRadius: 12, padding: 20 }}>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.7 }}>
                <strong style={{ color: accent }}>The organisation field</strong> is often the most revealing. If it shows Amazon Web Services, Google Cloud, or DigitalOcean, the IP belongs to a server — not a person sitting at a laptop. That single field can confirm whether you&apos;re dealing with a real user or automated traffic.
              </p>
            </div>
          </section>

          {/* Section: How to use */}
          <section id="how-to-use" style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8, color: "white" }}>
              How to Use the IP Address Lookup Tool
            </h2>
            <p style={{ fontSize: 16, color: muted, marginBottom: 28, lineHeight: 1.7 }}>
              The entire process takes under 5 minutes. Here&apos;s the step-by-step workflow.
            </p>

            {/* Tool screenshot */}
            <div style={{ marginBottom: 32, borderRadius: 14, overflow: "hidden", border: `1px solid rgba(255,255,255,0.08)` }}>
              <img src="/blog/how-to-use-ip-address-lookup/screenshot-tool.png" alt="ToolStack IP Address Lookup tool interface" style={{ width: "100%", display: "block" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {steps.map((step) => (
                <div key={step.number} className="step-card">
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: accentDim, border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 15, fontWeight: 900, color: accent }}>{step.number}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: "white" }}>{step.title}</h3>
                        <span style={{ fontSize: 11, color: accent, background: accentDim, border: `1px solid ${accentBorder}`, borderRadius: 20, padding: "2px 8px", fontWeight: 600, flexShrink: 0 }}>⏱ {step.time}</span>
                      </div>
                      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: "0 0 12px" }}>{step.content}</p>
                      <div style={{ background: "rgba(6,182,212,0.06)", border: `1px solid ${accentBorder}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: accent }}>
                        💡 <strong>Pro tip:</strong> {step.tip}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA after steps */}
            <div style={{ marginTop: 32, background: `linear-gradient(135deg, ${accentDim} 0%, rgba(6,182,212,0.06) 100%)`, border: `1px solid ${accentBorder}`, borderRadius: 16, padding: 28, textAlign: "center" }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: "white", margin: "0 0 8px" }}>Try the Free IP Address Lookup Tool</p>
              <p style={{ fontSize: 14, color: muted, margin: "0 0 18px" }}>No account. No download. Instant results for any IP address.</p>
              <Link href="/tools/ip-address-lookup" style={{ display: "inline-block", background: accent, color: "white", fontWeight: 700, fontSize: 15, padding: "12px 28px", borderRadius: 10, textDecoration: "none", letterSpacing: "-0.01em" }}>
                Look Up an IP Address →
              </Link>
            </div>
          </section>

          {/* Section: Accuracy */}
          <section id="accuracy" style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16, color: "white" }}>
              How Accurate Is IP Geolocation?
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 28 }}>
              IP geolocation is not GPS. The accuracy drops significantly as you zoom in. Here&apos;s what to expect at each level — and why the distinction matters for how you interpret results.
            </p>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28, marginBottom: 28 }}>
              {accuracyData.map((row) => (
                <div key={row.level} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "white" }}>{row.level}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: row.color }}>{row.accuracy}%</span>
                  </div>
                  <div style={{ height: 8, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${row.accuracy}%`, background: row.color, borderRadius: 4, transition: "width 0.8s ease" }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 12, padding: 18 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Reliable For</p>
                <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                  <li>Country-level verification</li>
                  <li>VPN detection</li>
                  <li>Identifying datacenter vs residential</li>
                  <li>ISP and ASN identification</li>
                </ul>
              </div>
              <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: 18 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Not Reliable For</p>
                <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                  <li>Street-level location</li>
                  <li>Exact physical address</li>
                  <li>Mobile user location</li>
                  <li>Legal proof of location</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Use cases */}
          <section id="use-cases" style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8, color: "white" }}>
              5 Real-World Use Cases
            </h2>
            <p style={{ fontSize: 16, color: muted, marginBottom: 28, lineHeight: 1.7 }}>
              These are the most common reasons people run IP lookups — and how to action each one.
            </p>

            {/* Animated infographic */}
            <div style={{ marginBottom: 32, borderRadius: 14, overflow: "hidden", border: `1px solid rgba(255,255,255,0.08)` }}>
              <video autoPlay loop muted playsInline style={{ width: "100%", display: "block" }}>
                <source src="/blog/how-to-use-ip-address-lookup/infographic-animated.mp4" type="video/mp4" />
              </video>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {useCases.map((uc, i) => (
                <div key={uc.title} className="use-card">
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: accentDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{uc.icon}</div>
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 700, color: "white", margin: "0 0 6px" }}><span style={{ color: accent, marginRight: 6 }}>#{i + 1}</span>{uc.title}</p>
                      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.65 }}>{uc.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Infographic uses static */}
            <div style={{ marginTop: 32, borderRadius: 14, overflow: "hidden", border: `1px solid rgba(255,255,255,0.08)` }}>
              <img src="/blog/how-to-use-ip-address-lookup/infographic-uses.png" alt="5 reasons to run an IP address lookup" style={{ width: "100%", display: "block" }} />
            </div>
          </section>

          {/* Section: Common mistakes */}
          <section id="mistakes" style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8, color: "white" }}>
              Common Mistakes (And How to Avoid Them)
            </h2>
            <p style={{ fontSize: 16, color: muted, marginBottom: 28, lineHeight: 1.7 }}>
              Most errors come from misreading what IP geolocation can and can&apos;t tell you. Here&apos;s what trips people up most often.
            </p>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "4px 24px 12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: "14px 0 8px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>❌ The Mistake</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>✅ The Fix</p>
              </div>
              {mistakes.map((m) => (
                <div key={m.mistake} className="mistake-row">
                  <p style={{ fontSize: 14, color: "rgba(239,68,68,0.85)", margin: 0, lineHeight: 1.6 }}>{m.mistake}</p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.6 }}>{m.fix}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive checklist */}
          <section style={{ marginBottom: 56 }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${accentBorder}`, borderRadius: 16, padding: 28 }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: "white", margin: "0 0 4px" }}>IP Lookup Checklist</p>
              <p style={{ fontSize: 14, color: muted, margin: "0 0 20px" }}>Tick each step as you go — track your progress below</p>

              <div id="checklist-items">
                {[
                  "I know my public IP address (not my private 192.168.x.x IP)",
                  "I've looked up my IP and can read all 8 data fields",
                  "I understand that city accuracy is 50–75%, not GPS-level",
                  "I know how to identify a datacenter IP from the organisation field",
                  "I've verified my VPN is working using a before/after lookup",
                  "I understand the difference between IPv4 and IPv6",
                  "I know what ASN means and why it matters for bot detection",
                ].map((item, i) => (
                  <div key={i} className="checklist-item">
                    <input type="checkbox" id={`chk-${i}`} style={{ width: 18, height: 18, accentColor: accent, flexShrink: 0, marginTop: 2, cursor: "pointer" }} />
                    <label htmlFor={`chk-${i}`} style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", cursor: "pointer", lineHeight: 1.5 }}>{item}</label>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(255,255,255,0.04)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden", marginRight: 16 }}>
                  <div id="progress-bar" style={{ height: "100%", width: "0%", background: accent, borderRadius: 4, transition: "width 0.3s ease" }} />
                </div>
                <span id="progress-label" style={{ fontSize: 13, fontWeight: 700, color: accent, flexShrink: 0 }}>0 / 7</span>
              </div>
            </div>
          </section>

          <script dangerouslySetInnerHTML={{ __html: `
            (function() {
              var total = 7;
              function update() {
                var checked = document.querySelectorAll('#checklist-items input[type="checkbox"]:checked').length;
                var pct = Math.round((checked / total) * 100);
                var bar = document.getElementById('progress-bar');
                var label = document.getElementById('progress-label');
                if (bar) bar.style.width = pct + '%';
                if (label) label.textContent = checked + ' / ' + total;
                if (bar) {
                  if (pct === 100) bar.style.background = '#22c55e';
                  else if (pct >= 50) bar.style.background = '#eab308';
                  else bar.style.background = '#06b6d4';
                }
              }
              document.querySelectorAll('#checklist-items input[type="checkbox"]').forEach(function(cb) {
                cb.addEventListener('change', update);
              });
            })();
          ` }} />

          {/* Related tools */}
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20, color: "white" }}>Related Free Tools</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {[
                { name: "SSL Certificate Checker", href: "/tools/ssl-checker", icon: "🔐", desc: "Verify any site's SSL instantly" },
                { name: "WHOIS Lookup", href: "/tools/whois-lookup", icon: "🔎", desc: "Find who owns any domain" },
                { name: "Website Down Checker", href: "/tools/website-down-checker", icon: "🌐", desc: "Is it down for everyone?" },
              ].map((tool) => (
                <Link key={tool.name} href={tool.href} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 18, textDecoration: "none", display: "block", transition: "border-color 0.2s" }}>
                  <span style={{ fontSize: 24, display: "block", marginBottom: 8 }}>{tool.icon}</span>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 4px" }}>{tool.name}</p>
                  <p style={{ fontSize: 12, color: muted, margin: 0 }}>{tool.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 28, color: "white" }}>
              Frequently Asked Questions
            </h2>
            <div>
              {faqs.map((faq) => (
                <div key={faq.q} className="faq-item">
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", margin: "0 0 10px" }}>{faq.q}</h3>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <div style={{ background: `linear-gradient(135deg, ${accentDim} 0%, rgba(6,182,212,0.04) 100%)`, border: `1px solid ${accentBorder}`, borderRadius: 20, padding: 36, textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
              Look Up Any IP Address — Free
            </h2>
            <p style={{ fontSize: 16, color: muted, margin: "0 0 24px", maxWidth: 420, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
              Geolocation, ISP, ASN, VPN detection and more. No account. No limits. Instant results.
            </p>
            <Link href="/tools/ip-address-lookup" style={{ display: "inline-block", background: accent, color: "white", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 12, textDecoration: "none", letterSpacing: "-0.01em" }}>
              Open IP Address Lookup →
            </Link>
          </div>

          {/* Author bio */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, display: "flex", gap: 20, alignItems: "flex-start" }}>
            <Image src="/blog/how-to-use-ip-address-lookup/author-avatar.jpg" alt="Justin Pirrie" width={64} height={64} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: `2px solid ${accentBorder}`, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: "0 0 2px" }}>Justin Pirrie</p>
              <p style={{ fontSize: 13, color: accent, margin: "0 0 10px" }}>Founder, ToolStack</p>
              <p style={{ fontSize: 14, color: muted, margin: 0, lineHeight: 1.7 }}>
                Justin builds free online tools used by 50,000+ people monthly. ToolStack removes the paywall from tools that should never have had one. Follow on{" "}
                <a href="https://www.linkedin.com/in/justin-pirrie/" style={{ color: accent, textDecoration: "none" }}>LinkedIn</a>.
              </p>
            </div>
          </div>
        </article>

        {/* Sidebar TOC */}
        <aside className="sidebar" style={{ width: 220, flexShrink: 0, position: "sticky", top: 100, height: "fit-content" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 12px 12px" }}>On This Page</p>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {tocItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="toc-link">{item.label}</a>
            ))}
          </nav>

          <div style={{ marginTop: 28, background: accentDim, border: `1px solid ${accentBorder}`, borderRadius: 12, padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: accent, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Free Tool</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: "0 0 12px", lineHeight: 1.5 }}>Look up any IP instantly — no signup.</p>
            <Link href="/tools/ip-address-lookup" style={{ display: "block", background: accent, color: "white", fontWeight: 700, fontSize: 13, padding: "10px 14px", borderRadius: 8, textDecoration: "none", textAlign: "center" }}>
              Open Tool →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
