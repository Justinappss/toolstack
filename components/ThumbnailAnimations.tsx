"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimProps {
    accent: string;
    accentRgb: string;
}

const stripBase = (rgb: string): React.CSSProperties => ({
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "9px 13px",
    background: "rgba(6,6,12,0.85)",
    backdropFilter: "blur(12px)",
    borderRadius: 12,
    border: `1px solid rgba(${rgb},0.4)`,
    boxShadow: `0 8px 24px rgba(${rgb},0.15)`,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
});

const slideInProps = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: "spring" as const, stiffness: 90, damping: 16, delay: 0.25 },
};

// 1) PASSWORD / SCRAMBLE — for password, UUID, Base64, JWT
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
function rand() { return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]; }

export function ScrambleOverlay({ accent, accentRgb, length = 16, label = "SECURE" }: AnimProps & { length?: number; label?: string }) {
    const [val, setVal] = useState<string>("•".repeat(length));
    useEffect(() => {
        const tick = () => setVal(Array.from({ length }, rand).join(""));
        tick();
        const id = setInterval(tick, 95);
        return () => clearInterval(id);
    }, [length]);
    return (
        <motion.div {...slideInProps} style={stripBase(accentRgb)}>
            <motion.span animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontSize: 14, lineHeight: 1, filter: `drop-shadow(0 0 6px rgba(${accentRgb},0.6))` }}>🔒</motion.span>
            <span style={{ fontSize: 12, fontWeight: 700, color: accent, letterSpacing: "0.05em", flex: 1, overflow: "hidden", whiteSpace: "nowrap", textShadow: `0 0 12px rgba(${accentRgb},0.45)` }}>{val}</span>
            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontSize: 8.5, fontWeight: 900, color: accent, letterSpacing: "0.12em", padding: "3px 7px", borderRadius: 999, background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.3)` }}>{label}</motion.span>
        </motion.div>
    );
}

// 2) TYPING — for writing/AI tools (cursor + word stream)
export function TypingOverlay({ accent, accentRgb, label = "AI WRITING" }: AnimProps & { label?: string }) {
    const phrases = [
        "Generating ideas",
        "Optimising tone",
        "Crafting hook",
        "Polishing draft",
        "Adding clarity",
        "Refining output",
    ];
    const [idx, setIdx] = useState(0);
    const [text, setText] = useState("");
    useEffect(() => {
        const phrase = phrases[idx];
        let i = 0;
        const typer = setInterval(() => {
            i++;
            setText(phrase.slice(0, i));
            if (i >= phrase.length) {
                clearInterval(typer);
                setTimeout(() => setIdx((idx + 1) % phrases.length), 1100);
            }
        }, 45);
        return () => clearInterval(typer);
    }, [idx]);
    return (
        <motion.div {...slideInProps} style={stripBase(accentRgb)}>
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity }}
                style={{ fontSize: 13, color: accent }}>✦</motion.span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.9)", flex: 1, whiteSpace: "nowrap", overflow: "hidden", letterSpacing: "0.01em" }}>
                {text}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ color: accent, marginLeft: 1 }}>|</motion.span>
            </span>
            <span style={{ fontSize: 8.5, fontWeight: 900, color: accent, letterSpacing: "0.12em", padding: "3px 7px", borderRadius: 999, background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.3)` }}>{label}</span>
        </motion.div>
    );
}

// 3) COUNTER — for calculators (numbers ticking)
export function CounterOverlay({ accent, accentRgb, prefix = "£", min = 100, max = 9999, label = "LIVE" }: AnimProps & { prefix?: string; min?: number; max?: number; label?: string }) {
    const [val, setVal] = useState(min);
    useEffect(() => {
        const tick = () => setVal(Math.floor(min + Math.random() * (max - min)));
        const id = setInterval(tick, 850);
        return () => clearInterval(id);
    }, [min, max]);
    return (
        <motion.div {...slideInProps} style={stripBase(accentRgb)}>
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ fontSize: 14, color: accent }}>⚙</motion.span>
            <div style={{ flex: 1, display: "flex", alignItems: "baseline", gap: 6, overflow: "hidden", whiteSpace: "nowrap" }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>Total</span>
                <motion.span key={val} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.25 }}
                    style={{ fontSize: 14, fontWeight: 800, color: accent, letterSpacing: "-0.01em", textShadow: `0 0 12px rgba(${accentRgb},0.45)` }}>
                    {prefix}{val.toLocaleString()}
                </motion.span>
            </div>
            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.6, repeat: Infinity }}
                style={{ fontSize: 8.5, fontWeight: 900, color: accent, letterSpacing: "0.12em", padding: "3px 7px", borderRadius: 999, background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.3)` }}>{label}</motion.span>
        </motion.div>
    );
}

// 4) FORMAT — for code/data formatters (line indicator + status)
export function FormatOverlay({ accent, accentRgb, label = "FORMATTED" }: AnimProps & { label?: string }) {
    const [pct, setPct] = useState(0);
    useEffect(() => {
        let p = 0;
        const id = setInterval(() => {
            p = (p + 4) % 110;
            setPct(p > 100 ? 100 : p);
        }, 60);
        return () => clearInterval(id);
    }, []);
    return (
        <motion.div {...slideInProps} style={stripBase(accentRgb)}>
            <span style={{ fontSize: 13, color: accent, fontWeight: 800 }}>{`{ }`}</span>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.65)", fontWeight: 600, letterSpacing: "0.02em" }}>
                    Parsing → indenting → done
                </span>
                <div style={{ height: 3, borderRadius: 99, background: `rgba(${accentRgb},0.15)`, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: accent, boxShadow: `0 0 10px rgba(${accentRgb},0.7)`, transition: "width 0.06s linear" }} />
                </div>
            </div>
            <span style={{ fontSize: 8.5, fontWeight: 900, color: accent, letterSpacing: "0.12em", padding: "3px 7px", borderRadius: 999, background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.3)` }}>{label}</span>
        </motion.div>
    );
}

// 5) SCANNER — for lookup/checker tools (scanning beam + status dots)
export function ScannerOverlay({ accent, accentRgb, label = "ONLINE" }: AnimProps & { label?: string }) {
    return (
        <motion.div {...slideInProps} style={{ ...stripBase(accentRgb), gap: 8 }}>
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: "50%", background: accent, boxShadow: `0 0 10px ${accent}` }} />
            <div style={{ flex: 1, position: "relative", height: 14, overflow: "hidden", borderRadius: 4, background: `rgba(${accentRgb},0.08)` }}>
                <motion.div initial={{ x: "-25%" }} animate={{ x: "100%" }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", top: 0, bottom: 0, width: "25%", background: `linear-gradient(90deg, transparent, rgba(${accentRgb},0.6), transparent)` }} />
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: accent, fontWeight: 700, letterSpacing: "0.08em" }}>SCANNING</span>
            </div>
            <span style={{ fontSize: 8.5, fontWeight: 900, color: accent, letterSpacing: "0.12em", padding: "3px 7px", borderRadius: 999, background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.3)` }}>{label}</span>
        </motion.div>
    );
}

// 6) PALETTE — for color/design tools (color cycling swatches)
const PALETTE_COLORS = ["#f43f5e", "#fb923c", "#facc15", "#4ade80", "#22d3ee", "#818cf8", "#a78bfa", "#e879f9"];
export function PaletteOverlay({ accent, accentRgb, label = "PALETTE" }: AnimProps & { label?: string }) {
    const [shift, setShift] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setShift(s => (s + 1) % PALETTE_COLORS.length), 700);
        return () => clearInterval(id);
    }, []);
    return (
        <motion.div {...slideInProps} style={stripBase(accentRgb)}>
            <div style={{ display: "flex", gap: 4, flex: 1 }}>
                {Array.from({ length: 6 }).map((_, i) => {
                    const c = PALETTE_COLORS[(i + shift) % PALETTE_COLORS.length];
                    return (
                        <motion.div key={i}
                            animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
                            style={{ width: 22, height: 22, borderRadius: 6, background: c, border: "1px solid rgba(255,255,255,0.15)", boxShadow: `0 4px 10px ${c}40` }}
                        />
                    );
                })}
            </div>
            <span style={{ fontSize: 8.5, fontWeight: 900, color: accent, letterSpacing: "0.12em", padding: "3px 7px", borderRadius: 999, background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.3)` }}>{label}</span>
        </motion.div>
    );
}

// 7) GENERIC PULSE — fallback (live indicator)
export function PulseOverlay({ accent, accentRgb, label = "LIVE", message = "Ready to use" }: AnimProps & { label?: string; message?: string }) {
    return (
        <motion.div {...slideInProps} style={stripBase(accentRgb)}>
            <motion.div animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: 9, height: 9, borderRadius: "50%", background: accent, boxShadow: `0 0 12px ${accent}` }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.9)", flex: 1, letterSpacing: "0.01em" }}>{message}</span>
            <span style={{ fontSize: 8.5, fontWeight: 900, color: accent, letterSpacing: "0.12em", padding: "3px 7px", borderRadius: 999, background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.3)` }}>{label}</span>
        </motion.div>
    );
}

// MAPPING — slug to overlay
export function ThumbnailAnimation({ href, accent, accentRgb }: { href: string; accent: string; accentRgb: string }) {
    const slug = href.replace("/tools/", "");
    const props = { accent, accentRgb };

    // SCRAMBLE
    if (slug === "password-generator") return <ScrambleOverlay {...props} label="SECURE" />;
    if (slug === "uuid-generator") return <ScrambleOverlay {...props} length={20} label="UUID" />;
    if (slug === "base64-encoder-decoder") return <ScrambleOverlay {...props} length={18} label="BASE64" />;
    if (slug === "jwt-decoder") return <ScrambleOverlay {...props} length={16} label="JWT" />;

    // SCANNER
    if (slug === "ssl-checker") return <ScannerOverlay {...props} label="VALID" />;
    if (slug === "ip-address-lookup") return <ScannerOverlay {...props} label="GEO" />;
    if (slug === "whois-lookup") return <ScannerOverlay {...props} label="DOMAIN" />;
    if (slug === "website-down-checker") return <ScannerOverlay {...props} label="UP" />;

    // FORMAT
    if (slug === "json-formatter") return <FormatOverlay {...props} label="JSON" />;
    if (slug === "sql-formatter") return <FormatOverlay {...props} label="SQL" />;
    if (slug === "regex-tester") return <FormatOverlay {...props} label="REGEX" />;
    if (slug === "code-diff-checker") return <FormatOverlay {...props} label="DIFF" />;
    if (slug === "case-converter") return <FormatOverlay {...props} label="CASE" />;
    if (slug === "markdown-editor") return <FormatOverlay {...props} label="MD" />;
    if (slug === "email-signature-generator") return <FormatOverlay {...props} label="HTML" />;
    if (slug === "pdf-generator") return <FormatOverlay {...props} label="PDF" />;
    if (slug === "favicon-generator") return <FormatOverlay {...props} label="ICO" />;

    // PALETTE
    if (slug === "color-palette-generator") return <PaletteOverlay {...props} label="HEX" />;
    if (slug === "color-contrast-checker") return <PaletteOverlay {...props} label="WCAG" />;
    if (slug === "css-gradient-generator") return <PaletteOverlay {...props} label="CSS" />;

    // COUNTER (calculators)
    if (slug === "vat-calculator") return <CounterOverlay {...props} prefix="£" min={120} max={4980} label="VAT" />;
    if (slug === "tip-calculator") return <CounterOverlay {...props} prefix="$" min={4} max={45} label="TIP" />;
    if (slug === "mortgage-calculator") return <CounterOverlay {...props} prefix="£" min={1200} max={3400} label="/MO" />;
    if (slug === "percentage-calculator") return <CounterOverlay {...props} prefix="" min={5} max={95} label="%" />;
    if (slug === "salary-calculator") return <CounterOverlay {...props} prefix="£" min={2200} max={4800} label="NET" />;
    if (slug === "compound-interest-calculator") return <CounterOverlay {...props} prefix="£" min={12000} max={250000} label="GROW" />;
    if (slug === "age-calculator") return <CounterOverlay {...props} prefix="" min={6500} max={32000} label="DAYS" />;
    if (slug === "invoice-generator") return <CounterOverlay {...props} prefix="£" min={350} max={9800} label="DUE" />;
    if (slug === "unix-timestamp-converter") return <CounterOverlay {...props} prefix="" min={1700000000} max={1900000000} label="UNIX" />;
    if (slug === "online-stopwatch") return <CounterOverlay {...props} prefix="" min={0} max={999} label="SEC" />;
    if (slug === "word-counter") return <CounterOverlay {...props} prefix="" min={120} max={2400} label="WORDS" />;
    if (slug === "character-counter") return <CounterOverlay {...props} prefix="" min={80} max={280} label="CHARS" />;
    if (slug === "card-grading-profit-calculator") return <CounterOverlay {...props} prefix="$" min={45} max={680} label="ROI" />;
    if (slug === "whatnot-seller-fee-calculator") return <CounterOverlay {...props} prefix="$" min={12} max={140} label="FEE" />;
    if (slug === "grading-company-comparison") return <CounterOverlay {...props} prefix="$" min={20} max={150} label="COMP" />;
    if (slug === "card-flip-roi-calculator") return <CounterOverlay {...props} prefix="$" min={25} max={420} label="FLIP" />;
    if (slug === "card-box-break-calculator") return <CounterOverlay {...props} prefix="$" min={80} max={680} label="BREAK" />;
    if (slug === "ebay-best-offer-calculator") return <CounterOverlay {...props} prefix="$" min={15} max={240} label="OFFER" />;
    if (slug === "panini-sticker-calculator") return <CounterOverlay {...props} prefix="" min={120} max={700} label="PACKS" />;
    if (slug === "pack-break-ev-calculator") return <CounterOverlay {...props} prefix="$" min={4} max={42} label="EV" />;
    if (slug === "world-cup-accumulator-calculator") return <CounterOverlay {...props} prefix="£" min={50} max={2400} label="ODDS" />;

    // QR + YT thumbnail (use scanner for "fetching")
    if (slug === "qr-code-generator") return <ScannerOverlay {...props} label="QR" />;
    if (slug === "youtube-thumbnail-downloader") return <ScannerOverlay {...props} label="HD" />;

    // World Cup team finder = typing (quiz personality)
    if (slug === "world-cup-team-finder") return <TypingOverlay {...props} label="QUIZ" />;

    // TYPING (writing/AI tools — default for everything else)
    if (slug === "ai-prompt-generator") return <TypingOverlay {...props} label="AI" />;
    if (slug === "meta-description-generator") return <TypingOverlay {...props} label="SEO" />;
    if (slug === "email-subject-line-tester") return <TypingOverlay {...props} label="A/B" />;
    if (slug === "hashtag-generator") return <TypingOverlay {...props} label="#" />;
    if (slug === "blog-title-generator") return <TypingOverlay {...props} label="TITLES" />;
    if (slug === "paraphrasing-tool") return <TypingOverlay {...props} label="REWRITE" />;
    if (slug === "grammar-checker") return <TypingOverlay {...props} label="GRAMMAR" />;
    if (slug === "text-summarizer") return <TypingOverlay {...props} label="SUMMARY" />;
    if (slug === "lorem-ipsum-generator") return <TypingOverlay {...props} label="LOREM" />;
    if (slug === "cover-letter-generator") return <TypingOverlay {...props} label="LETTER" />;
    if (slug === "business-name-generator") return <TypingOverlay {...props} label="BRAND" />;
    if (slug === "youtube-tag-generator") return <TypingOverlay {...props} label="TAGS" />;
    if (slug === "utm-builder") return <TypingOverlay {...props} label="UTM" />;

    // FALLBACK
    return <PulseOverlay {...props} />;
}
