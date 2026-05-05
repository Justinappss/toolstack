"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { MoreTools } from "@/components/MoreTools";

type Mode = "stopwatch" | "countdown";
interface Lap { t: number; split: number; }

function pad(n: number) { return String(n).padStart(2, "0"); }
function fmt(ms: number, forceFull = false): string {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600), m = Math.floor((total % 3600) / 60), s = total % 60;
  const cs = Math.floor((ms % 1000) / 10);
  if (h > 0 || forceFull) return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(cs)}`;
  return `${pad(m)}:${pad(s)}.${pad(cs)}`;
}
function getDigits(ms: number, showHours = false) {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600), m = Math.floor((total % 3600) / 60), s = total % 60;
  const cs = Math.floor((ms % 1000) / 10);
  if (showHours || h > 0) return { d1: pad(h), d2: pad(m), d3: pad(s), labels: ["Hours", "Minutes", "Seconds"] };
  return { d1: pad(m), d2: pad(s), d3: pad(cs), labels: ["Minutes", "Seconds", "Milliseconds"] };
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
.sw-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(900px 600px at 18% 10%,rgba(34,233,233,.10),transparent 60%),radial-gradient(900px 600px at 85% 85%,rgba(99,102,241,.10),transparent 60%),linear-gradient(180deg,#04070c,#070b14 60%,#05080f)}
.sw-bg::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(34,233,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(34,233,233,.05) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(ellipse 80% 60% at 50% 40%,#000 40%,transparent 85%)}
.sw-bg::after{content:"";position:absolute;inset:0;opacity:.5;background-image:radial-gradient(1.2px 1.2px at 20% 30%,rgba(34,233,233,.6),transparent 50%),radial-gradient(1px 1px at 70% 60%,rgba(47,139,255,.5),transparent 50%),radial-gradient(1px 1px at 40% 80%,rgba(99,102,241,.5),transparent 50%),radial-gradient(1.2px 1.2px at 85% 20%,rgba(34,233,233,.5),transparent 50%);background-size:400px 400px,500px 500px,350px 350px,450px 450px}
.sw-wrap{position:relative;z-index:2;max-width:1100px;margin:0 auto;padding:80px 28px 120px}
.sw-breadcrumb{display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(234,246,255,.38);margin-bottom:18px}
.sw-breadcrumb a{color:rgba(234,246,255,.6);text-decoration:none}
.sw-breadcrumb .cur{color:#22e9e9}
.sw-hero{margin-bottom:22px}
.sw-badges{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
.sw-badge{font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:5px 10px;border-radius:999px;color:#22e9e9;background:rgba(34,233,233,.08);border:1px solid rgba(34,233,233,.25)}
.sw-hero h1{font-weight:900;font-size:42px;margin:0;letter-spacing:-0.02em;line-height:1.05;color:#eaf6ff}
.sw-grad{background:linear-gradient(135deg,#22e9e9,#2f8bff 60%,#6366f1);-webkit-background-clip:text;background-clip:text;color:transparent!important}
.sw-hero p{margin:10px 0 0;color:rgba(234,246,255,.6);font-size:15px;max-width:560px;line-height:1.55}
.sw-modes{display:inline-flex;gap:4px;padding:4px;border-radius:14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);margin:20px 0 22px}
.sw-modes button{border:none;background:transparent;color:rgba(234,246,255,.6);cursor:pointer;padding:10px 20px;border-radius:10px;font-weight:700;font-size:13px;display:inline-flex;align-items:center;gap:8px;transition:all .18s;font-family:inherit}
.sw-modes button.active{color:#041820;background:linear-gradient(135deg,#22e9e9,#6af3ff);box-shadow:0 0 24px rgba(34,233,233,.35)}
.sw-scene{position:relative;min-height:460px;padding:20px 0 60px}
.sw-watch{position:absolute;left:0;top:-10px;width:min(460px,52%);aspect-ratio:1/1.15;z-index:1}
.sw-crown{position:absolute;left:50%;top:0;transform:translateX(-50%);width:22%;height:13%;z-index:6;cursor:pointer}
.sw-crown-stem{position:absolute;left:50%;top:44%;transform:translateX(-50%);width:54%;height:56%;border-radius:3px 3px 5px 5px;background:linear-gradient(90deg,#1a2330 0%,#4a5968 20%,#2a3442 50%,#4a5968 80%,#1a2330 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.25),inset 0 -2px 5px rgba(0,0,0,.7),0 2px 4px rgba(0,0,0,.5)}
.sw-crown-stem::before{content:"";position:absolute;inset:0;border-radius:inherit;background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.35) 0 1px,transparent 1px 3px);opacity:.7}
.sw-crown-cap{position:absolute;left:50%;top:0;transform:translate(-50%,0);width:100%;height:62%;border-radius:14px 14px 6px 6px;background:radial-gradient(ellipse at 50% 25%,#c8fbff 0%,#4af0ff 18%,#22e9e9 38%,#0d6e7c 72%,#041a20 100%);box-shadow:0 0 28px rgba(34,233,233,.7),0 8px 14px rgba(0,0,0,.6),inset 0 2px 4px rgba(255,255,255,.6),inset 0 -4px 6px rgba(0,0,0,.5);will-change:transform,box-shadow;transition:transform .09s ease-out,box-shadow .12s ease-out}
.sw-crown-cap::before{content:"";position:absolute;inset:10% 18% 40% 18%;border-radius:10px;background:linear-gradient(180deg,rgba(255,255,255,.75),rgba(255,255,255,0));filter:blur(2px)}
.sw-push-hint{position:absolute;left:50%;top:-28px;transform:translateX(-50%);white-space:nowrap;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;letter-spacing:.12em;color:#22e9e9;text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:2px;pointer-events:none;animation:sw-hint-bob 2s ease-in-out infinite}
.sw-push-hint::after{content:"↓";font-size:11px;color:#22e9e9;opacity:.8}
@keyframes sw-hint-bob{0%,100%{transform:translateX(-50%) translateY(0);opacity:.9}50%{transform:translateX(-50%) translateY(-3px);opacity:1}}
.sw-crown.pressed .sw-crown-cap{transform:translate(-50%,5px) scale(.97);box-shadow:0 0 40px rgba(34,233,233,1),0 2px 4px rgba(0,0,0,.8),inset 0 2px 4px rgba(255,255,255,.35)}
.sw-lug{position:absolute;top:13%;width:16%;height:11%;cursor:pointer;z-index:5}
.sw-lug.left{left:-2%;transform:rotate(-30deg);transform-origin:right center}
.sw-lug.right{right:-2%;transform:rotate(30deg);transform-origin:left center}
.sw-lug-stem{position:absolute;inset:28% 16% 0 16%;border-radius:3px;background:linear-gradient(180deg,#182230,#0a1220);box-shadow:inset 0 1px 0 rgba(255,255,255,.18),inset 0 -2px 5px rgba(0,0,0,.7),0 3px 6px rgba(0,0,0,.5)}
.sw-lug-cap{position:absolute;left:50%;top:-6%;transform:translateX(-50%);width:94%;height:56%;border-radius:10px 10px 4px 4px;background:radial-gradient(ellipse at 50% 30%,#f0f7fb 0%,#b4c5d4 30%,#6a7a8a 60%,#2a323e 90%,#0e141c 100%);box-shadow:0 6px 12px rgba(0,0,0,.6),inset 0 2px 3px rgba(255,255,255,.75),inset 0 -3px 4px rgba(0,0,0,.45);transition:transform .09s,box-shadow .12s}
.sw-lug.pressed .sw-lug-cap{transform:translate(-50%,5px) scale(.96);box-shadow:0 2px 4px rgba(0,0,0,.75),inset 0 1px 2px rgba(255,255,255,.45),0 0 18px rgba(34,233,233,.55)}
.sw-case{position:absolute;left:4%;top:8%;width:92%;height:92%;filter:drop-shadow(0 40px 50px rgba(0,0,0,.6))}
.sw-led{position:absolute;left:4%;top:8%;width:92%;height:92%;pointer-events:none;border-radius:50%;box-shadow:inset 0 0 60px rgba(34,233,233,0);transition:box-shadow .3s ease;mix-blend-mode:screen}
.sw-led.running{box-shadow:inset 0 0 80px rgba(34,233,233,.3)}
.sw-led.finished{box-shadow:inset 0 0 80px rgba(52,211,153,.35)}
.sw-led.warn{box-shadow:inset 0 0 80px rgba(255,93,115,.35)}
.sw-readout{position:relative;z-index:3;margin-left:23%;width:78%;max-width:820px;padding:28px 36px;border-radius:26px;background:linear-gradient(180deg,rgba(10,18,28,.62),rgba(6,10,18,.72));border:1px solid rgba(34,233,233,.15);box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 80px rgba(34,233,233,.1),inset 0 1px 0 rgba(255,255,255,.06);backdrop-filter:blur(16px) saturate(1.1);-webkit-backdrop-filter:blur(16px) saturate(1.1)}
.sw-readout-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;gap:16px}
.sw-readout-title{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.3em;color:rgba(234,246,255,.6);text-transform:uppercase}
.sw-cur-row{display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:12px;color:rgba(234,246,255,.6)}
.sw-cur-row .bolt{color:#22e9e9;font-size:13px}
.sw-cur-row .val{color:#22e9e9;font-weight:700}
.sw-digits{font-family:'Orbitron','JetBrains Mono',monospace;font-weight:900;font-size:clamp(56px,9vw,108px);line-height:1;letter-spacing:-0.02em;display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:baseline;gap:0;background:linear-gradient(180deg,#6af3ff 0%,#22e9e9 40%,#2f8bff 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 18px rgba(34,233,233,.4));font-variant-numeric:tabular-nums;text-align:center}
.sw-digits .seg{text-align:center}
.sw-digits .colon{color:#22e9e9;opacity:.7;padding:0 6px}
.sw-digits.warn{background:linear-gradient(180deg,#ffb4c0,#ff5d73);-webkit-background-clip:text;background-clip:text;filter:drop-shadow(0 0 16px rgba(255,93,115,.45))}
.sw-digits.finished{background:linear-gradient(180deg,#aef8d8,#34d399);-webkit-background-clip:text;background-clip:text;filter:drop-shadow(0 0 16px rgba(52,211,153,.45))}
.sw-dlabels{display:grid;grid-template-columns:1fr 1fr 1fr;margin-top:10px;font-size:13px;color:rgba(234,246,255,.45);font-weight:500}
.sw-dlabels span{text-align:center}
.sw-dlabels span:first-child{text-align:left;padding-left:4px}
.sw-dlabels span:last-child{text-align:right;padding-right:4px}
.sw-cd-inputs{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:baseline;gap:0;font-family:'Orbitron',monospace;font-weight:900;font-size:clamp(56px,9vw,108px)}
.sw-cd-inputs input{width:100%;background:transparent;border:none;outline:none;text-align:center;font:inherit;color:#22e9e9;font-variant-numeric:tabular-nums;padding:0;-moz-appearance:textfield}
.sw-cd-inputs input::-webkit-outer-spin-button,.sw-cd-inputs input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
.sw-cd-inputs input:focus{background:rgba(34,233,233,.06);border-radius:10px}
.sw-cd-inputs .colon{color:rgba(34,233,233,.6);padding:0 6px}
.sw-presets{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px;justify-content:center}
.sw-presets button{background:rgba(34,233,233,.06);border:1px solid rgba(34,233,233,.2);color:#22e9e9;font-size:11px;font-weight:700;padding:6px 12px;border-radius:8px;cursor:pointer;font-family:'JetBrains Mono',monospace;letter-spacing:.05em}
.sw-presets button:hover{background:rgba(34,233,233,.12)}
.sw-bottom{position:relative;z-index:3;margin-top:18px;margin-left:23%;width:78%;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.sw-ctrl-bar{display:inline-flex;gap:10px;flex-wrap:wrap}
.sw-ctrl{position:relative;display:inline-flex;align-items:center;gap:10px;padding:12px 22px;border-radius:14px;font-weight:800;font-size:14px;background:linear-gradient(180deg,rgba(18,26,38,.9),rgba(8,14,22,.9));color:#eaf6ff;border:1px solid rgba(255,255,255,.1);box-shadow:0 3px 0 rgba(0,0,0,.45),0 8px 16px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.08);cursor:pointer;user-select:none;transition:transform .08s,box-shadow .12s,background .12s,border-color .12s;font-family:inherit}
.sw-ctrl .kbd{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;padding:2px 7px;border-radius:5px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:rgba(234,246,255,.6)}
.sw-ctrl:hover{border-color:rgba(34,233,233,.25);box-shadow:0 3px 0 rgba(0,0,0,.45),0 8px 22px rgba(34,233,233,.15),inset 0 1px 0 rgba(255,255,255,.08)}
.sw-ctrl.primary{background:linear-gradient(180deg,#5af3ff 0%,#22e9e9 50%,#0aa9be 100%);color:#041820;border-color:rgba(255,255,255,.35);box-shadow:0 3px 0 rgba(0,50,60,.7),0 10px 30px rgba(34,233,233,.35),inset 0 1px 0 rgba(255,255,255,.55),inset 0 -6px 10px rgba(0,50,60,.35)}
.sw-ctrl.primary .kbd{background:rgba(0,0,0,.18);border-color:rgba(0,0,0,.25);color:#041820}
.sw-ctrl.primary.running{background:linear-gradient(180deg,#ffb4c0,#ff5d73 60%,#9e2a3a);color:#200406;box-shadow:0 3px 0 rgba(90,0,10,.5),0 10px 30px rgba(255,93,115,.35),inset 0 1px 0 rgba(255,255,255,.5),inset 0 -6px 10px rgba(90,0,10,.3)}
.sw-ctrl.primary.running .kbd{background:rgba(0,0,0,.18);color:#200406}
.sw-ctrl.pressed{transform:translateY(3px);box-shadow:0 0 0 rgba(0,0,0,0),0 4px 12px rgba(0,0,0,.3),inset 0 2px 4px rgba(0,0,0,.35)}
.sw-ctrl.disabled{opacity:.4;cursor:not-allowed;filter:grayscale(.6)}
.sw-laps-chip{display:inline-flex;align-items:center;gap:14px;padding:14px 22px;border-radius:16px;background:linear-gradient(180deg,rgba(10,18,28,.7),rgba(6,10,18,.78));border:1px solid rgba(34,233,233,.18);box-shadow:0 10px 30px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.05),0 0 30px rgba(34,233,233,.08);backdrop-filter:blur(10px)}
.sw-laps-chip h3{margin:0;font-family:'Orbitron',sans-serif;font-weight:900;font-size:18px;letter-spacing:.1em;color:#eaf6ff}
.sw-laps-chip .count{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;letter-spacing:.1em;color:rgba(234,246,255,.6);padding:3px 8px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);text-transform:uppercase}
.sw-laps-chip .curlap{font-family:'JetBrains Mono',monospace;font-size:11px;color:#22e9e9;padding:4px 9px;border-radius:6px;background:rgba(34,233,233,.08);border:1px solid rgba(34,233,233,.22)}
.sw-laps-wrap{margin-top:32px}
.sw-laps-head{display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap}
.sw-laps-head h3{margin:0;font-family:'Orbitron',sans-serif;font-weight:900;font-size:16px;letter-spacing:.1em;color:#eaf6ff}
.sw-chip2{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;padding:4px 10px;border-radius:999px;color:rgba(234,246,255,.6);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);letter-spacing:.1em}
.sw-laps-list{border:1px solid rgba(255,255,255,.07);border-radius:16px;background:linear-gradient(180deg,rgba(8,14,22,.7),rgba(4,8,14,.8));padding:10px;display:flex;flex-direction:column;gap:6px;max-height:320px;overflow-y:auto}
.sw-lap-row{display:grid;grid-template-columns:100px 1fr 130px 130px;align-items:center;padding:12px 14px;border-radius:10px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);font-family:'JetBrains Mono',monospace}
.sw-lap-row.best{background:rgba(52,211,153,.07);border-color:rgba(52,211,153,.25)}
.sw-lap-row.worst{background:rgba(255,93,115,.06);border-color:rgba(255,93,115,.2)}
.sw-lap-row.latest{background:rgba(34,233,233,.08);border-color:rgba(34,233,233,.25);box-shadow:0 0 20px rgba(34,233,233,.08)}
.sw-lap-row .num{color:rgba(234,246,255,.45);font-size:12px;display:flex;align-items:center;gap:6px}
.sw-lap-row .bar{height:6px;border-radius:3px;background:rgba(255,255,255,.05);position:relative;overflow:hidden;margin:0 14px}
.sw-lap-row .bar i{position:absolute;inset:0 auto 0 0;border-radius:3px;background:linear-gradient(90deg,#22e9e9,#2f8bff);box-shadow:0 0 10px rgba(34,233,233,.5)}
.sw-lap-row.best .bar i{background:linear-gradient(90deg,#34d399,#0ea5a5)}
.sw-lap-row.worst .bar i{background:linear-gradient(90deg,#ffb4c0,#ff5d73)}
.sw-lap-row .split{color:rgba(234,246,255,.6);font-size:13px;text-align:right;font-weight:600}
.sw-lap-row .total{color:#eaf6ff;font-size:14px;text-align:right;font-weight:700}
.sw-lap-row .tag{font-size:9px;font-weight:800;letter-spacing:.1em;padding:2px 6px;border-radius:999px}
.sw-lap-row.best .tag{background:rgba(52,211,153,.15);color:#34d399}
.sw-lap-row.worst .tag{background:rgba(255,93,115,.12);color:#ff5d73}
.sw-empty{padding:26px;text-align:center;color:rgba(234,246,255,.38);font-size:13px}
.sw-section{margin-top:64px}
.sw-section h2{font-weight:900;font-size:28px;letter-spacing:-0.02em;margin:0 0 8px;color:#fff}
.sw-kicker{color:rgba(234,246,255,.6);font-size:14px;margin:0 0 22px}
.sw-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:860px){.sw-cards{grid-template-columns:1fr}}
.sw-card{padding:20px;border-radius:18px;background:linear-gradient(180deg,rgba(12,20,30,.55),rgba(6,10,16,.55));border:1px solid rgba(255,255,255,.07)}
.sw-card .ic{width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;background:linear-gradient(135deg,rgba(34,233,233,.15),rgba(47,139,255,.15));border:1px solid rgba(34,233,233,.25);color:#22e9e9}
.sw-card h3{margin:0 0 6px;font-size:15px;font-weight:800;color:#fff}
.sw-card p{margin:0;color:rgba(234,246,255,.6);font-size:13px;line-height:1.6}
.sw-faq{display:flex;flex-direction:column;gap:10px}
.sw-faq details{border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:14px 18px;background:linear-gradient(180deg,rgba(12,20,30,.55),rgba(6,10,16,.55))}
.sw-faq summary{font-weight:700;font-size:14px;color:#fff;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center}
.sw-faq summary::-webkit-details-marker{display:none}
.sw-faq summary::after{content:"+";color:#22e9e9;font-family:'JetBrains Mono',monospace;font-weight:900}
.sw-faq details[open] summary::after{content:"−"}
.sw-faq p{margin:10px 0 0;color:rgba(234,246,255,.6);font-size:13px;line-height:1.65}
.sw-mini-btn{border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);color:rgba(234,246,255,.6);border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit}
footer{position:relative;z-index:1}
@media(max-width:860px){
  .sw-scene{padding-bottom:20px;min-height:0}
  .sw-watch{position:relative;width:min(280px,62vw);margin:0 auto 16px;top:0}
  .sw-readout{margin-left:0;width:100%;padding:18px 14px}
  .sw-readout-top{flex-direction:column;gap:6px}
  .sw-digits{font-size:clamp(28px,11vw,52px)}
  .sw-cd-inputs{font-size:clamp(28px,11vw,52px)}
  .sw-bottom{margin-left:0;width:100%;justify-content:center}
  .sw-ctrl-bar{justify-content:center}
  .sw-laps-chip{flex-wrap:wrap;justify-content:center}
  .sw-hero h1{font-size:32px}
  .sw-lap-row{grid-template-columns:70px 1fr 90px 90px}
}
`;

export default function OnlineStopwatch() {
  const [mode, setMode] = useState<Mode>("stopwatch");
  const [pressed, setPressed] = useState<string | null>(null);

  const [swRunning, setSwRunning] = useState(false);
  const [swElapsed, setSwElapsed] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const swStartRef = useRef(0);
  const swAccRef = useRef(0);
  const swRafRef = useRef(0);

  const [cdHours, setCdHours] = useState(0);
  const [cdMinutes, setCdMinutes] = useState(5);
  const [cdSeconds, setCdSeconds] = useState(0);
  const [cdRunning, setCdRunning] = useState(false);
  const [cdRemaining, setCdRemaining] = useState(0);
  const [cdTotal, setCdTotal] = useState(0);
  const [cdFinished, setCdFinished] = useState(false);
  const [cdSet, setCdSet] = useState(false);
  const cdStartRef = useRef(0);
  const cdInitRef = useRef(0);
  const cdRafRef = useRef(0);

  function pressBtn(name: string) {
    setPressed(name);
    setTimeout(() => setPressed(p => p === name ? null : p), 160);
  }

  useEffect(() => {
    if (!swRunning) { cancelAnimationFrame(swRafRef.current); return; }
    const tick = () => {
      setSwElapsed(swAccRef.current + (performance.now() - swStartRef.current));
      swRafRef.current = requestAnimationFrame(tick);
    };
    swStartRef.current = performance.now();
    swRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(swRafRef.current);
  }, [swRunning]);

  useEffect(() => {
    if (!cdRunning) { cancelAnimationFrame(cdRafRef.current); return; }
    const tick = () => {
      const remaining = Math.max(0, cdInitRef.current - (performance.now() - cdStartRef.current));
      setCdRemaining(remaining);
      if (remaining <= 0) { setCdRunning(false); setCdFinished(true); return; }
      cdRafRef.current = requestAnimationFrame(tick);
    };
    cdStartRef.current = performance.now();
    cdRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(cdRafRef.current);
  }, [cdRunning]);

  const toggleSw = useCallback((fromCrown = true) => {
    if (fromCrown) pressBtn("crown"); pressBtn("start");
    setSwRunning(r => {
      if (r) { swAccRef.current += performance.now() - swStartRef.current; return false; }
      swStartRef.current = performance.now(); return true;
    });
  }, []);

  const resetSw = useCallback((fromLug = true) => {
    if (fromLug) pressBtn("lugR"); pressBtn("reset");
    setSwRunning(false); cancelAnimationFrame(swRafRef.current);
    swAccRef.current = 0; setSwElapsed(0); setLaps([]);
  }, []);

  const doLap = useCallback((fromLug = true) => {
    if (fromLug) pressBtn("lugL"); pressBtn("lap");
    setLaps(prev => {
      const prevT = prev.length ? prev[prev.length - 1].t : 0;
      return [...prev, { t: swElapsed, split: swElapsed - prevT }];
    });
  }, [swElapsed]);

  const toggleCd = useCallback((fromCrown = true) => {
    if (fromCrown) pressBtn("crown"); pressBtn("start");
    if (cdFinished) { resetCd(false); return; }
    if (!cdSet) {
      const total = (cdHours * 3600 + cdMinutes * 60 + cdSeconds) * 1000;
      if (total <= 0) return;
      cdInitRef.current = total;
      setCdTotal(total); setCdRemaining(total); setCdSet(true); setCdRunning(true);
    } else {
      setCdRunning(r => {
        if (!r) { cdInitRef.current = cdRemaining; cdStartRef.current = performance.now(); return true; }
        cdInitRef.current = cdRemaining; return false;
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cdFinished, cdSet, cdHours, cdMinutes, cdSeconds, cdRemaining]);

  const resetCd = useCallback((fromLug = true) => {
    if (fromLug) pressBtn("lugR"); pressBtn("reset");
    setCdRunning(false); cancelAnimationFrame(cdRafRef.current);
    setCdSet(false); setCdFinished(false); setCdTotal(0); setCdRemaining(0);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      if (e.code === "Space") { e.preventDefault(); mode === "stopwatch" ? toggleSw() : toggleCd(); }
      else if (e.code === "KeyR") { e.preventDefault(); mode === "stopwatch" ? resetSw() : resetCd(); }
      else if (e.code === "KeyL") { e.preventDefault(); if (mode === "stopwatch" && swRunning) doLap(); }
      else if (e.code === "KeyM") { e.preventDefault(); handleSetMode(mode === "stopwatch" ? "countdown" : "stopwatch"); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  function handleSetMode(m: Mode) {
    if (m === mode) return;
    setSwRunning(false); cancelAnimationFrame(swRafRef.current);
    setCdRunning(false); cancelAnimationFrame(cdRafRef.current);
    setMode(m);
    if (m === "stopwatch") { swAccRef.current = 0; setSwElapsed(0); setLaps([]); }
    else { setCdSet(false); setCdFinished(false); setCdTotal(0); setCdRemaining(0); }
  }

  const isRunning = mode === "stopwatch" ? swRunning : cdRunning;
  const warn = mode === "countdown" && !cdFinished && cdRemaining < 10000 && cdRemaining > 0;
  const C = 2 * Math.PI * 162;
  let handRotation = 0, arcDashOffset = C;
  if (mode === "stopwatch") {
    const secFrac = (swElapsed / 1000) % 60;
    handRotation = (secFrac / 60) * 360;
    arcDashOffset = C - (secFrac / 60) * C;
  } else if (cdTotal > 0) {
    const prog = (cdTotal - cdRemaining) / cdTotal;
    handRotation = -prog * 360;
    arcDashOffset = C - (1 - prog) * C;
  }

  const currentMs = mode === "stopwatch" ? swElapsed : cdRemaining;
  const showHours = mode === "countdown" ? cdTotal >= 3600000 : Math.floor(currentMs / 1000) >= 3600;
  const { d1, d2, d3, labels: digitLabels } = getDigits(currentMs, showHours);
  const ledClass = cdFinished ? "finished" : warn ? "warn" : isRunning ? "running" : "";
  const digitsClass = `sw-digits${warn ? " warn" : cdFinished ? " finished" : ""}`;
  const startLabel = isRunning ? "Pause" : (mode === "stopwatch" ? (swElapsed > 0 ? "Resume" : "Start") : (cdSet ? "Resume" : "Start"));

  const minSplit = laps.length > 1 ? Math.min(...laps.map(l => l.split)) : -1;
  const maxSplit = laps.length > 1 ? Math.max(...laps.map(l => l.split)) : -1;
  const maxBar = laps.length ? Math.max(...laps.map(l => l.split), 1) : 1;

  const bezelNumbers = Array.from({ length: 12 }, (_, i) => {
    const value = i === 0 ? 60 : i * 5;
    const a = (i * 30) * Math.PI / 180;
    const x = 250 + 220 * Math.sin(a), y = 250 - 220 * Math.cos(a) + 6;
    const isMajor = i % 3 === 0;
    let fill = isMajor ? "rgba(234,246,255,0.95)" : "rgba(234,246,255,0.55)";
    if (value === 45) fill = "rgb(232,54,18)";
    if (value === 30) fill = "rgb(234,57,14)";
    if (value === 60) fill = "rgb(234,41,10)";
    return { x, y, fill, fontSize: isMajor ? "20" : "14", value };
  });

  const minuteTicks = Array.from({ length: 60 }, (_, i) => {
    const major = i % 5 === 0;
    const r1 = major ? 172 : 176, a = i * 6 * Math.PI / 180;
    return {
      x1: 250 + r1 * Math.sin(a), y1: 250 - r1 * Math.cos(a),
      x2: 250 + 182 * Math.sin(a), y2: 250 - 182 * Math.cos(a),
      stroke: major ? "rgba(234,246,255,0.75)" : "rgba(234,246,255,0.22)",
      strokeWidth: major ? 2.5 : 1,
    };
  });

  return (
    <div style={{ background: "#04070c", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="sw-bg" />
      <div className="sw-wrap">

        <nav className="sw-breadcrumb">
          <a href="/">ToolStack</a><span>/</span>
          <a href="/tools?category=utility">Utility</a><span>/</span>
          <span className="cur">Online Stopwatch</span>
        </nav>

        <div className="sw-hero">
          <div className="sw-badges">
            {["Free Forever", "No Signup", "Millisecond Accurate", "Keyboard Shortcuts"].map(b => (
              <span key={b} className="sw-badge">{b}</span>
            ))}
          </div>
          <h1>Free Online <span className="sw-grad">Stopwatch</span></h1>
          <p>A precision titanium chronograph with lap times and a countdown timer. Press the cyan crown or use the buttons — accurate to the centisecond.</p>
        </div>

        <div className="sw-modes">
          {(["stopwatch", "countdown"] as Mode[]).map(m => (
            <button key={m} className={mode === m ? "active" : ""} onClick={() => handleSetMode(m)}>
              {m === "stopwatch"
                ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/></svg>Stopwatch</>
                : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 2h4"/><circle cx="12" cy="14" r="8"/></svg>Countdown</>}
            </button>
          ))}
        </div>

        <div className="sw-scene">
          {/* Watch */}
          <div className="sw-watch">
            <div className={`sw-crown${pressed === "crown" ? " pressed" : ""}`}
              onClick={() => mode === "stopwatch" ? toggleSw() : toggleCd()}>
              {!isRunning && swElapsed === 0 && !cdSet && <div className="sw-push-hint">push me</div>}
              <div className="sw-crown-stem" /><div className="sw-crown-cap" />
            </div>
            <div className={`sw-lug left${pressed === "lugL" ? " pressed" : ""}`}
              onClick={() => { if (mode === "stopwatch" && swRunning) doLap(); }}>
              <div className="sw-lug-stem" /><div className="sw-lug-cap" />
            </div>
            <div className={`sw-lug right${pressed === "lugR" ? " pressed" : ""}`}
              onClick={() => mode === "stopwatch" ? resetSw() : resetCd()}>
              <div className="sw-lug-stem" /><div className="sw-lug-cap" />
            </div>

            <svg className="sw-case" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="sw-caseOuter" cx="50%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#e8eff5"/><stop offset="22%" stopColor="#9aaab9"/>
                  <stop offset="48%" stopColor="#4a5866"/><stop offset="72%" stopColor="#1c2632"/><stop offset="100%" stopColor="#05090f"/>
                </radialGradient>
                <linearGradient id="sw-bezelRing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dbe8f2"/><stop offset="20%" stopColor="#5a6a7a"/>
                  <stop offset="50%" stopColor="#2a3442"/><stop offset="80%" stopColor="#b0c0d0"/><stop offset="100%" stopColor="#40505e"/>
                </linearGradient>
                <radialGradient id="sw-faceGrad" cx="50%" cy="25%" r="80%">
                  <stop offset="0%" stopColor="#18283a"/><stop offset="40%" stopColor="#0a1624"/>
                  <stop offset="85%" stopColor="#040810"/><stop offset="100%" stopColor="#020509"/>
                </radialGradient>
                <linearGradient id="sw-arcGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22e9e9"/><stop offset="100%" stopColor="#2f8bff"/>
                </linearGradient>
                <radialGradient id="sw-glassHi" cx="35%" cy="25%" r="60%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.5)"/><stop offset="40%" stopColor="rgba(255,255,255,0.08)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                </radialGradient>
                <linearGradient id="sw-handMetal" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#eaf4fb"/><stop offset="50%" stopColor="#a8b8c8"/><stop offset="100%" stopColor="#3a4654"/>
                </linearGradient>
                <filter id="sw-softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <pattern id="sw-brush" x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="2" y2="0" stroke="rgba(255,255,255,0.03)" strokeWidth=".5"/>
                </pattern>
              </defs>
              <circle cx="250" cy="252" r="232" fill="#000" opacity=".55" filter="url(#sw-softGlow)"/>
              <circle cx="250" cy="250" r="230" fill="url(#sw-caseOuter)"/>
              <circle cx="250" cy="250" r="230" fill="url(#sw-brush)" opacity=".4"/>
              <circle cx="250" cy="250" r="210" fill="none" stroke="url(#sw-bezelRing)" strokeWidth="16"/>
              <circle cx="250" cy="250" r="200" fill="none" stroke="rgba(0,0,0,0.9)" strokeWidth="2"/>
              <circle cx="250" cy="250" r="197" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <g fontFamily="'JetBrains Mono',monospace" fontWeight="700" textAnchor="middle">
                {bezelNumbers.map(({ x, y, fill, fontSize, value }) => (
                  <text key={value} x={x} y={y} fontSize={fontSize} style={{ fill }}>{value}</text>
                ))}
              </g>
              <circle cx="250" cy="250" r="188" fill="url(#sw-faceGrad)"/>
              <circle cx="250" cy="250" r="188" fill="url(#sw-brush)" opacity=".25"/>
              {/* TAG Heuer dial branding */}
              <text x="250" y="148" textAnchor="middle" fontFamily="'Arial Black','Arial',sans-serif" fontWeight="900" fontSize="18" letterSpacing="6" fill="rgba(234,246,255,0.92)">TAG HEUER</text>
              <line x1="210" y1="155" x2="290" y2="155" stroke="rgba(234,246,255,0.2)" strokeWidth="0.75"/>
              <text x="250" y="170" textAnchor="middle" fontFamily="'Arial','Helvetica',sans-serif" fontWeight="400" fontSize="10" letterSpacing="4" fill="rgba(234,246,255,0.45)">CHRONOGRAPH</text>
              <text x="250" y="338" textAnchor="middle" fontFamily="'Arial','Helvetica',sans-serif" fontWeight="400" fontSize="9" letterSpacing="4" fill="rgba(234,246,255,0.38)">SWISS MADE</text>
              <line x1="225" y1="342" x2="275" y2="342" stroke="rgba(234,233,233,0.15)" strokeWidth="0.6"/>
              <g>
                {minuteTicks.map((t, i) => (
                  <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                    stroke={t.stroke} strokeWidth={t.strokeWidth} strokeLinecap="round"/>
                ))}
              </g>
              <circle cx="250" cy="250" r="162" fill="none" stroke="rgba(34,233,233,0.08)" strokeWidth="3"/>
              <circle cx="250" cy="250" r="162" fill="none" stroke="url(#sw-arcGrad)" strokeWidth="4"
                strokeLinecap="round" strokeDasharray={C} strokeDashoffset={arcDashOffset}
                transform="rotate(-90 250 250)" filter="url(#sw-softGlow)"/>
              <g transform={`rotate(${handRotation} 250 250)`}>
                <rect x="246" y="250" width="8" height="60" rx="2" style={{ fill: "rgb(247,16,16)" }}/>
                <path d="M 248 82 L 252 82 L 254 250 L 246 250 Z" style={{ fill: "rgb(219,19,59)" }}/>
                <circle cx="250" cy="105" r="6" fill="#22e9e9" filter="url(#sw-softGlow)" opacity=".95"/>
                <circle cx="250" cy="105" r="3" fill="#ffffff"/>
              </g>
              <circle cx="250" cy="250" r="10" fill="#2a3442" stroke="rgba(255,255,255,0.2)"/>
              <circle cx="250" cy="250" r="6" fill="#eaf4fb"/>
              <circle cx="250" cy="250" r="2.5" fill="#22e9e9" filter="url(#sw-softGlow)"/>
              <circle cx="250" cy="250" r="188" fill="url(#sw-glassHi)" pointerEvents="none"/>
              <path d="M 120 180 Q 200 120 310 130" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" pointerEvents="none" filter="url(#sw-softGlow)"/>
            </svg>
            <div className={`sw-led ${ledClass}`} />
          </div>

          {/* Glass readout */}
          <div className="sw-readout">
            <div className="sw-readout-top">
              <span className="sw-readout-title">{mode === "stopwatch" ? "ONLINE STOPWATCH" : "COUNTDOWN"}</span>
              <span className="sw-cur-row">
                <span className="bolt">⚡</span>Current:&nbsp;
                <span className="val">{fmt(currentMs, true).slice(0, 8)}</span>
              </span>
            </div>
            {mode === "countdown" && !cdSet ? (
              <>
                <div className="sw-cd-inputs">
                  <input type="text" value={pad(cdHours)} maxLength={2}
                    onChange={e => setCdHours(Math.min(23, Math.max(0, parseInt(e.target.value.replace(/\D/g,"")) || 0)))}
                    onFocus={e => e.target.select()}
                    onBlur={e => setCdHours(Math.min(23, Math.max(0, parseInt(e.target.value) || 0)))} />
                  <span className="colon">:</span>
                  <input type="text" value={pad(cdMinutes)} maxLength={2}
                    onChange={e => setCdMinutes(Math.min(59, Math.max(0, parseInt(e.target.value.replace(/\D/g,"")) || 0)))}
                    onFocus={e => e.target.select()}
                    onBlur={e => setCdMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))} />
                  <span className="colon">:</span>
                  <input type="text" value={pad(cdSeconds)} maxLength={2}
                    onChange={e => setCdSeconds(Math.min(59, Math.max(0, parseInt(e.target.value.replace(/\D/g,"")) || 0)))}
                    onFocus={e => e.target.select()}
                    onBlur={e => setCdSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))} />
                </div>
                <div className="sw-presets">
                  {([[60,"1 min"],[180,"3 min"],[300,"5 min"],[600,"10 min"],[1500,"25 min"],[3600,"1 hr"]] as [number,string][]).map(([secs, label]) => (
                    <button key={secs} onClick={() => {
                      setCdHours(Math.floor(secs / 3600));
                      setCdMinutes(Math.floor((secs % 3600) / 60));
                      setCdSeconds(secs % 60);
                    }}>{label}</button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className={digitsClass}>
                  <span className="seg">{d1}</span>
                  <span className="colon">:</span>
                  <span className="seg">{d2}</span>
                  <span className="colon">:</span>
                  <span className="seg">{d3}</span>
                </div>
                <div className="sw-dlabels">
                  {digitLabels.map(l => <span key={l}>{l}</span>)}
                </div>
              </>
            )}
          </div>

          {/* Bottom controls + LAP TIMES chip */}
          <div className="sw-bottom">
            <div className="sw-ctrl-bar">
              <button
                className={["sw-ctrl primary", isRunning ? "running" : "", pressed === "start" ? "pressed" : ""].filter(Boolean).join(" ")}
                onClick={() => mode === "stopwatch" ? toggleSw(false) : toggleCd(false)}>
                {isRunning
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6z M14 4h4v16h-4z"/></svg>
                  : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>}
                {startLabel} <span className="kbd">Space</span>
              </button>
              <button
                className={["sw-ctrl", (!swRunning || mode !== "stopwatch") ? "disabled" : "", pressed === "lap" ? "pressed" : ""].filter(Boolean).join(" ")}
                onClick={() => { if (swRunning && mode === "stopwatch") doLap(false); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                Lap <span className="kbd">L</span>
              </button>
              <button
                className={["sw-ctrl", pressed === "reset" ? "pressed" : ""].filter(Boolean).join(" ")}
                onClick={() => mode === "stopwatch" ? resetSw(false) : resetCd(false)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
                Reset <span className="kbd">R</span>
              </button>
            </div>
            <div className="sw-laps-chip">
              <h3>LAP TIMES</h3>
              <span className="count">{laps.length} LAP{laps.length !== 1 ? "S" : ""}</span>
              <span className="curlap">Current: {fmt(swElapsed)}</span>
            </div>
          </div>
        </div>

        {/* Full lap list */}
        <div className="sw-laps-wrap">
          <div className="sw-laps-head">
            <h3>Splits</h3>
            <span className="sw-chip2">{laps.length} LAP{laps.length !== 1 ? "S" : ""}</span>
            <span style={{ flex: 1 }} />
            <button className="sw-mini-btn" onClick={() => {
              if (!laps.length) return;
              navigator.clipboard?.writeText(laps.map((l, i) => `Lap ${i+1}\t${fmt(l.t)}\t+${fmt(l.split)}`).join("\n"));
            }}>Copy</button>
            <button className="sw-mini-btn" onClick={() => setLaps([])}>Clear</button>
          </div>
          <div className="sw-laps-list">
            {laps.length === 0 ? (
              <div className="sw-empty">No laps yet. Press the <b style={{ color: "#22e9e9" }}>LAP</b> button while the stopwatch is running.</div>
            ) : [...laps].reverse().map((l, revIdx) => {
              const idx = laps.length - 1 - revIdx;
              const isLatest = idx === laps.length - 1;
              const isBest = laps.length > 1 && l.split === minSplit;
              const isWorst = laps.length > 1 && l.split === maxSplit && minSplit !== maxSplit;
              const pct = (l.split / maxBar) * 100;
              return (
                <div key={idx} className={["sw-lap-row", isLatest ? "latest" : "", isBest ? "best" : "", isWorst ? "worst" : ""].filter(Boolean).join(" ")}>
                  <span className="num">
                    Lap {pad(idx + 1)}
                    {isBest && <span className="tag">BEST</span>}
                    {isWorst && <span className="tag">SLOW</span>}
                  </span>
                  <div className="bar"><i style={{ width: `${pct}%` }} /></div>
                  <span className="split">+{fmt(l.split)}</span>
                  <span className="total">{fmt(l.t)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <section className="sw-section">
          <h2>How to Use the Online Stopwatch</h2>
          <p className="sw-kicker">Two modes, zero learning curve.</p>
          <div className="sw-cards">
            {[
              { title: "Stopwatch Mode", body: "Press the cyan crown, the Start button, or hit Space to begin. Left pusher records a lap; right pusher resets.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/></svg> },
              { title: "Countdown Timer", body: "Switch modes, type any duration up to 23:59:59 or pick a preset. The case flashes red for the final 10 seconds.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 2h4"/><circle cx="12" cy="14" r="8"/></svg> },
              { title: "Keyboard Shortcuts", body: "Space starts & pauses, L records a lap, R resets, M switches mode. Each keypress physically depresses the button.", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 16h10"/></svg> },
            ].map(({ title, body, icon }) => (
              <div key={title} className="sw-card">
                <div className="ic">{icon}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sw-section">
          <h2>Frequently Asked Questions</h2>
          <p className="sw-kicker">Answers to the questions we get most often.</p>
          <div className="sw-faq">
            {[
              { q: "How accurate is this online stopwatch?", a: "It uses the browser's high-resolution Performance API and is accurate to the centisecond — 1/100th of a second. For everyday use such as cooking, workouts, meetings and presentations, this is more than sufficient." },
              { q: "Does the stopwatch keep running if I switch tabs?", a: "Yes. Elapsed time is calculated from timestamps rather than tick counts, so switching tabs or minimising the browser does not affect accuracy." },
              { q: "How do I record lap times?", a: "Press the left pusher on the watch, the Lap button, or press L. Fastest lap is highlighted green, slowest in red. You can copy all splits to clipboard." },
              { q: "Can I set a countdown timer for any duration?", a: "Yes. Switch to Countdown mode, enter any combination of hours, minutes and seconds up to 23:59:59, or pick a quick preset." },
              { q: "What are the keyboard shortcuts?", a: "Space starts and pauses. R resets. L records a lap in stopwatch mode. M switches between stopwatch and countdown." },
              { q: "What is the best online stopwatch?", a: "ToolStack's Online Stopwatch offers millisecond accuracy, lap recording with split times, a built-in countdown timer, and full keyboard control — free with no signup." },
              { q: "Does this work on mobile?", a: "Yes. The layout is fully responsive and all buttons are large tap targets." },
            ].map((f, i) => (
              <details key={i}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </section>

        {/* SEO Description */}
        <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Online Stopwatch: Free Online Tool</h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              Whether you're timing a presentation, measuring a workout interval, timing a recipe in the kitchen, or tracking how long a task takes you at work, you need a stopwatch that works without downloading an app or installing anything. Our Online Stopwatch works in any browser on any device — just open it and go. Lap times, keyboard shortcuts, and countdown timer mode included.
            </p>
            <p style={{ marginBottom: 16 }}>
              Open the page and the stopwatch is ready immediately — no setup required. Hit Lap to record lap times shown in a list below, pause to stop, and reset to start fresh. Switch to countdown timer mode and set any duration. Keyboard shortcuts (Space to start/pause, L for lap, R for reset) make it easy to use without touching your mouse.
            </p>
            <p style={{ marginBottom: 16 }}>
              Common uses include timing presentations and speeches to stay within allocated time slots, tracking workout intervals and rest periods, timing cooking and baking processes, measuring how long specific work tasks take for time tracking, and running speed challenge drills with recorded lap splits.
            </p>
            <p style={{ marginBottom: 0 }}>
              Most stopwatch apps require installation, show ads, or lack keyboard shortcuts. Ours is genuinely free with no signup, works offline once loaded, supports keyboard shortcuts for hands-free use, and includes lap times with delta comparisons. The large display is readable from across a room. Free, no download required.
            </p>
          </div>
        </section>

        <MoreTools currentSlug="online-stopwatch" />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        { "@context": "https://schema.org", "@type": "WebApplication", "name": "Online Stopwatch", "description": "Free online stopwatch with lap times and countdown timer. Accurate to the centisecond. No download or signup needed.", "url": "https://toolstack.tech/tools/online-stopwatch", "applicationCategory": "UtilityApplication", "operatingSystem": "Web", "browserRequirements": "Requires JavaScript", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "featureList": ["Stopwatch with lap times", "Countdown timer", "Keyboard shortcuts", "Centisecond accuracy", "Mobile friendly", "No signup required"] },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" }, { "@type": "ListItem", "position": 2, "name": "Utility", "item": "https://toolstack.tech/tools?category=utility" }, { "@type": "ListItem", "position": 3, "name": "Online Stopwatch", "item": "https://toolstack.tech/tools/online-stopwatch" }] },
        { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "How accurate is this online stopwatch?", "acceptedAnswer": { "@type": "Answer", "text": "Accurate to the centisecond using the browser's high-resolution Performance API — sufficient for workouts, cooking, meetings and presentations." } }, { "@type": "Question", "name": "Does the stopwatch keep running if I switch tabs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Elapsed time is calculated from timestamps rather than tick counts, so switching tabs or minimising the browser does not affect accuracy." } }, { "@type": "Question", "name": "How do I record lap times?", "acceptedAnswer": { "@type": "Answer", "text": "Press the left pusher on the watch, the Lap button, or press L. Fastest lap is highlighted green, slowest in red." } }, { "@type": "Question", "name": "Can I set a countdown timer for any duration?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Switch to Countdown mode, enter any combination of hours, minutes and seconds up to 23:59:59, or pick a quick preset." } }, { "@type": "Question", "name": "What are the keyboard shortcuts?", "acceptedAnswer": { "@type": "Answer", "text": "Space starts and pauses. R resets. L records a lap in stopwatch mode. M switches between stopwatch and countdown." } }, { "@type": "Question", "name": "What is the best online stopwatch?", "acceptedAnswer": { "@type": "Answer", "text": "ToolStack's Online Stopwatch offers millisecond accuracy, lap recording with split times, a built-in countdown timer, and full keyboard control — free with no signup." } }] },
      ]) }} />
    </div>
  );
}
