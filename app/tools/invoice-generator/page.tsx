"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const CURRENCIES = [
  { code: "GBP", symbol: "£", label: "GBP — British Pound" },
  { code: "USD", symbol: "$", label: "USD — US Dollar" },
  { code: "EUR", symbol: "€", label: "EUR — Euro" },
  { code: "AUD", symbol: "A$", label: "AUD — Australian Dollar" },
  { code: "CAD", symbol: "C$", label: "CAD — Canadian Dollar" },
  { code: "CHF", symbol: "CHF", label: "CHF — Swiss Franc" },
  { code: "SEK", symbol: "kr", label: "SEK — Swedish Krona" },
  { code: "NOK", symbol: "kr", label: "NOK — Norwegian Krone" },
  { code: "DKK", symbol: "kr", label: "DKK — Danish Krone" },
  { code: "SGD", symbol: "S$", label: "SGD — Singapore Dollar" },
  { code: "AED", symbol: "د.إ", label: "AED — UAE Dirham" },
  { code: "INR", symbol: "₹", label: "INR — Indian Rupee" },
];

type CountryConfig = {
  code: string; name: string; flag: string; currency: string;
  taxLabel: string; defaultRate: string; dateFormat: string;
  bizAddrPlaceholder: string; clientAddrPlaceholder: string; phonePlaceholder: string;
};

const COUNTRIES: CountryConfig[] = [
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", taxLabel: "VAT", defaultRate: "20", dateFormat: "DD/MM/YYYY", bizAddrPlaceholder: "123 High Street\nLondon, SW1A 1AA", clientAddrPlaceholder: "456 Client Road\nManchester, M1 1AA", phonePlaceholder: "+44 7700 900000" },
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD", taxLabel: "Sales Tax", defaultRate: "", dateFormat: "MM/DD/YYYY", bizAddrPlaceholder: "123 Main St\nNew York, NY 10001", clientAddrPlaceholder: "456 Client Ave\nLos Angeles, CA 90001", phonePlaceholder: "+1 (555) 000-0000" },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD", taxLabel: "GST", defaultRate: "10", dateFormat: "DD/MM/YYYY", bizAddrPlaceholder: "123 Collins St\nMelbourne VIC 3000", clientAddrPlaceholder: "456 George St\nSydney NSW 2000", phonePlaceholder: "+61 4 0000 0000" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", taxLabel: "GST/HST", defaultRate: "5", dateFormat: "MM/DD/YYYY", bizAddrPlaceholder: "123 Main Street\nToronto, ON M5H 1N1", clientAddrPlaceholder: "456 Rue Saint-Catherine\nMontréal, QC H3B 1B9", phonePlaceholder: "+1 (416) 000-0000" },
  { code: "IE", name: "Ireland", flag: "🇮🇪", currency: "EUR", taxLabel: "VAT", defaultRate: "23", dateFormat: "DD/MM/YYYY", bizAddrPlaceholder: "123 O'Connell Street\nDublin 1, D01 T6F0", clientAddrPlaceholder: "456 Patrick Street\nCork, T12 AH01", phonePlaceholder: "+353 87 000 0000" },
  { code: "DE", name: "Germany", flag: "🇩🇪", currency: "EUR", taxLabel: "MwSt", defaultRate: "19", dateFormat: "DD.MM.YYYY", bizAddrPlaceholder: "Hauptstraße 123\n10115 Berlin", clientAddrPlaceholder: "Musterstraße 456\n80331 München", phonePlaceholder: "+49 151 00000000" },
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR", taxLabel: "TVA", defaultRate: "20", dateFormat: "DD/MM/YYYY", bizAddrPlaceholder: "123 Rue de Rivoli\n75001 Paris", clientAddrPlaceholder: "456 Rue de la Paix\n69001 Lyon", phonePlaceholder: "+33 6 00 00 00 00" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", currency: "EUR", taxLabel: "BTW", defaultRate: "21", dateFormat: "DD/MM/YYYY", bizAddrPlaceholder: "Herengracht 123\n1017 BT Amsterdam", clientAddrPlaceholder: "Coolsingel 456\n3011 AD Rotterdam", phonePlaceholder: "+31 6 0000 0000" },
  { code: "AE", name: "UAE", flag: "🇦🇪", currency: "AED", taxLabel: "VAT", defaultRate: "5", dateFormat: "DD/MM/YYYY", bizAddrPlaceholder: "Office 1201, Al Maqam Tower\nAbu Dhabi", clientAddrPlaceholder: "Suite 802, DIFC\nDubai", phonePlaceholder: "+971 50 000 0000" },
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", taxLabel: "GST", defaultRate: "18", dateFormat: "DD/MM/YYYY", bizAddrPlaceholder: "123 MG Road\nBangalore, Karnataka 560001", clientAddrPlaceholder: "456 Nariman Point\nMumbai, Maharashtra 400021", phonePlaceholder: "+91 98765 43210" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", currency: "SGD", taxLabel: "GST", defaultRate: "9", dateFormat: "DD/MM/YYYY", bizAddrPlaceholder: "123 Orchard Road\n#12-01 Singapore 238858", clientAddrPlaceholder: "456 Raffles Place\n#08-01 Singapore 048616", phonePlaceholder: "+65 8123 4567" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", currency: "CHF", taxLabel: "MwSt", defaultRate: "8.1", dateFormat: "DD.MM.YYYY", bizAddrPlaceholder: "Bahnhofstrasse 123\n8001 Zürich", clientAddrPlaceholder: "Rue du Rhône 456\n1204 Genève", phonePlaceholder: "+41 79 000 00 00" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", currency: "SEK", taxLabel: "Moms", defaultRate: "25", dateFormat: "YYYY-MM-DD", bizAddrPlaceholder: "Drottninggatan 123\n111 60 Stockholm", clientAddrPlaceholder: "Avenyn 456\n411 36 Göteborg", phonePlaceholder: "+46 70 000 00 00" },
  { code: "NO", name: "Norway", flag: "🇳🇴", currency: "NOK", taxLabel: "MVA", defaultRate: "25", dateFormat: "DD.MM.YYYY", bizAddrPlaceholder: "Karl Johans gate 123\n0162 Oslo", clientAddrPlaceholder: "Bryggen 456\n5003 Bergen", phonePlaceholder: "+47 900 00 000" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", currency: "DKK", taxLabel: "Moms", defaultRate: "25", dateFormat: "DD/MM/YYYY", bizAddrPlaceholder: "Strøget 123\n1100 København K", clientAddrPlaceholder: "Ryesgade 456\n8000 Aarhus C", phonePlaceholder: "+45 20 00 00 00" },
];

type LineItem = { id: number; desc: string; qty: string; rate: string };

const FAQS = [
  {
    q: "Is this invoice generator really free?",
    a: "Yes, 100% free. No signup, no subscription, no watermark, no hidden fees. Create as many invoices as you want and download them as PDFs at no cost. ToolStack invoice generator is free forever.",
  },
  {
    q: "How do I download my invoice as a PDF?",
    a: "Click the 'Download PDF' button after filling in your invoice details. Your browser's print dialog will open — select 'Save as PDF' from the destination/printer dropdown, then click Save. This produces a clean, professional PDF with no branding or watermarks.",
  },
  {
    q: "Is my invoice data private?",
    a: "Completely. All invoice data is processed entirely in your browser — nothing is sent to any server. Your client names, amounts, and business details never leave your device. You can even use this tool offline once the page has loaded.",
  },
  {
    q: "Can I add VAT to my invoice?",
    a: "Yes. Enter your VAT/tax rate percentage in the Tax field (e.g. 20 for UK standard rate, 23 for Irish standard rate). The tool automatically calculates the tax amount and adds it to the total. You can also apply a discount percentage before tax.",
  },
  {
    q: "Which currencies does the invoice generator support?",
    a: "The tool supports 12 currencies: GBP (£), USD ($), EUR (€), AUD, CAD, CHF, SEK, NOK, DKK, SGD, AED and INR. Select your currency from the dropdown and all amounts will display with the correct symbol.",
  },
  {
    q: "Can I save my invoice template for reuse?",
    a: "The invoice generator runs entirely in your browser — there is no account system to save templates server-side. As a workaround, save the filled-in page as a browser bookmark with the page state, or download the PDF and keep it as a reference for your next invoice. A template save feature is on the roadmap.",
  },
  {
    q: "What is the best free invoice generator?",
    a: "ToolStack's invoice generator stands out because it requires no signup, adds no watermarks, runs 100% in your browser (your data stays private), supports 12 currencies, handles VAT and discounts, and produces a clean professional PDF. Unlike FreshBooks, Wave, or Invoice Simple — which all require account creation — ToolStack is instant and completely free.",
  },
];

const fmt = (n: number, symbol: string) =>
  `${symbol}${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatDate = (isoDate: string, dateFmt: string): string => {
  const parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  const [y, m, d] = parts;
  if (dateFmt === "MM/DD/YYYY") return `${m}/${d}/${y}`;
  if (dateFmt === "DD.MM.YYYY") return `${d}.${m}.${y}`;
  if (dateFmt === "YYYY-MM-DD") return isoDate;
  return `${d}/${m}/${y}`;
};

let nextId = 4;

export default function InvoiceGeneratorPage() {
  // Business info
  const [bizName, setBizName] = useState("");
  const [bizAddress, setBizAddress] = useState("");
  const [bizEmail, setBizEmail] = useState("");
  const [bizPhone, setBizPhone] = useState("");

  // Client info
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  // Country
  const [countryCode, setCountryCode] = useState("GB");
  const [taxLabel, setTaxLabel] = useState("VAT");

  const countryData = COUNTRIES.find(c => c.code === countryCode) ?? COUNTRIES[0];

  const handleCountryChange = useCallback((code: string) => {
    const c = COUNTRIES.find(x => x.code === code);
    if (!c) return;
    setCountryCode(code);
    setCurrencyCode(c.currency);
    setTaxLabel(c.taxLabel);
    setTaxRate(c.defaultRate);
  }, []);

  // Invoice meta
  const [invoiceNum, setInvoiceNum] = useState("INV-001");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  });
  const [currencyCode, setCurrencyCode] = useState("GBP");
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState("Payment due within 30 days of invoice date.");

  // Line items
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, desc: "", qty: "1", rate: "" },
    { id: 2, desc: "", qty: "1", rate: "" },
    { id: 3, desc: "", qty: "1", rate: "" },
  ]);

  // Calculations
  const [discount, setDiscount] = useState("");
  const [taxRate, setTaxRate] = useState("");

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const currency = CURRENCIES.find(c => c.code === currencyCode) ?? CURRENCIES[0];

  const subtotal = items.reduce((acc, item) => {
    const q = parseFloat(item.qty) || 0;
    const r = parseFloat(item.rate) || 0;
    return acc + q * r;
  }, 0);
  const discountAmt = subtotal * ((parseFloat(discount) || 0) / 100);
  const afterDiscount = subtotal - discountAmt;
  const taxAmt = afterDiscount * ((parseFloat(taxRate) || 0) / 100);
  const total = afterDiscount + taxAmt;

  const addItem = () => {
    setItems(prev => [...prev, { id: nextId++, desc: "", qty: "1", rate: "" }]);
  };
  const removeItem = (id: number) => {
    if (items.length <= 1) return;
    setItems(prev => prev.filter(i => i.id !== id));
  };
  const updateItem = (id: number, field: keyof LineItem, value: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const handleDownload = useCallback(() => {
    const sym = currency.symbol;
    const itemRows = items.map(item => {
      const q = parseFloat(item.qty) || 0;
      const r = parseFloat(item.rate) || 0;
      const amount = q * r;
      if (!item.desc && !r) return "";
      return `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;color:#1a1a2e;font-size:14px;">${item.desc || "—"}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;text-align:center;color:#555;font-size:14px;">${q}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;text-align:right;color:#555;font-size:14px;">${fmt(r, sym)}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;text-align:right;color:#1a1a2e;font-size:14px;font-weight:600;">${fmt(amount, sym)}</td>
        </tr>`;
    }).join("");

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Invoice ${invoiceNum}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: white; color: #1a1a2e; padding: 48px; max-width: 800px; margin: 0 auto; }
  @media print { body { padding: 24px; } @page { margin: 0.5in; } }
</style>
</head><body>
  <!-- Header -->
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px;">
    <div>
      <div style="font-size:32px;font-weight:900;color:#1a1a2e;letter-spacing:-0.03em;">${bizName || "Your Business"}</div>
      ${bizAddress ? `<div style="font-size:13px;color:#666;margin-top:6px;white-space:pre-line;">${bizAddress}</div>` : ""}
      ${bizEmail ? `<div style="font-size:13px;color:#666;margin-top:2px;">${bizEmail}</div>` : ""}
      ${bizPhone ? `<div style="font-size:13px;color:#666;margin-top:2px;">${bizPhone}</div>` : ""}
    </div>
    <div style="text-align:right;">
      <div style="font-size:28px;font-weight:900;color:#6366f1;letter-spacing:-0.02em;">INVOICE</div>
      <div style="font-size:14px;color:#666;margin-top:4px;">${invoiceNum}</div>
    </div>
  </div>

  <!-- Dates + client -->
  <div style="display:flex;justify-content:space-between;margin-bottom:40px;gap:32px;">
    <div style="flex:1;">
      <div style="font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#999;margin-bottom:8px;">Bill To</div>
      <div style="font-size:15px;font-weight:700;color:#1a1a2e;">${clientName || "Client Name"}</div>
      ${clientAddress ? `<div style="font-size:13px;color:#666;margin-top:4px;white-space:pre-line;">${clientAddress}</div>` : ""}
      ${clientEmail ? `<div style="font-size:13px;color:#666;margin-top:2px;">${clientEmail}</div>` : ""}
    </div>
    <div style="text-align:right;">
      <table style="font-size:13px;border-collapse:collapse;margin-left:auto;">
        <tr><td style="color:#999;padding:3px 12px 3px 0;">Issue Date</td><td style="color:#1a1a2e;font-weight:600;">${formatDate(issueDate, countryData.dateFormat)}</td></tr>
        <tr><td style="color:#999;padding:3px 12px 3px 0;">Due Date</td><td style="color:#1a1a2e;font-weight:600;">${formatDate(dueDate, countryData.dateFormat)}</td></tr>
        <tr><td style="color:#999;padding:3px 12px 3px 0;">Currency</td><td style="color:#1a1a2e;font-weight:600;">${currencyCode}</td></tr>
      </table>
    </div>
  </div>

  <!-- Line items -->
  <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
    <thead>
      <tr style="background:#f7f7fb;">
        <th style="padding:12px 16px;text-align:left;font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#999;border-bottom:2px solid #e8e8f0;">Description</th>
        <th style="padding:12px 16px;text-align:center;font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#999;border-bottom:2px solid #e8e8f0;">Qty</th>
        <th style="padding:12px 16px;text-align:right;font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#999;border-bottom:2px solid #e8e8f0;">Unit Price</th>
        <th style="padding:12px 16px;text-align:right;font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#999;border-bottom:2px solid #e8e8f0;">Amount</th>
      </tr>
    </thead>
    <tbody>${itemRows}</tbody>
  </table>

  <!-- Totals -->
  <div style="display:flex;justify-content:flex-end;margin-bottom:40px;">
    <table style="font-size:14px;border-collapse:collapse;min-width:240px;">
      <tr>
        <td style="padding:6px 16px 6px 0;color:#666;">Subtotal</td>
        <td style="padding:6px 0;text-align:right;color:#1a1a2e;font-weight:600;">${fmt(subtotal, sym)}</td>
      </tr>
      ${discountAmt > 0 ? `<tr><td style="padding:6px 16px 6px 0;color:#666;">Discount (${discount}%)</td><td style="padding:6px 0;text-align:right;color:#10b981;font-weight:600;">−${fmt(discountAmt, sym)}</td></tr>` : ""}
      ${taxAmt > 0 ? `<tr><td style="padding:6px 16px 6px 0;color:#666;">${taxLabel} (${taxRate}%)</td><td style="padding:6px 0;text-align:right;color:#1a1a2e;font-weight:600;">${fmt(taxAmt, sym)}</td></tr>` : ""}
      <tr>
        <td colspan="2" style="padding-top:10px;border-top:2px solid #e8e8f0;"></td>
      </tr>
      <tr>
        <td style="padding:8px 16px 8px 0;font-size:17px;font-weight:900;color:#1a1a2e;">Total Due</td>
        <td style="padding:8px 0;text-align:right;font-size:17px;font-weight:900;color:#6366f1;">${fmt(total, sym)}</td>
      </tr>
    </table>
  </div>

  ${notes || terms ? `
  <!-- Notes / Terms -->
  <div style="border-top:1px solid #f0f0f0;padding-top:24px;display:flex;gap:32px;">
    ${notes ? `<div style="flex:1;"><div style="font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#999;margin-bottom:8px;">Notes</div><div style="font-size:13px;color:#555;line-height:1.6;">${notes}</div></div>` : ""}
    ${terms ? `<div style="flex:1;"><div style="font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#999;margin-bottom:8px;">Terms &amp; Conditions</div><div style="font-size:13px;color:#555;line-height:1.6;">${terms}</div></div>` : ""}
  </div>` : ""}

  <div style="margin-top:48px;text-align:center;font-size:11px;color:#ccc;">Generated with ToolStack.tech · Free invoice generator</div>
</body></html>`;

    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    setTimeout(() => { w.focus(); w.print(); }, 300);
  }, [bizName, bizAddress, bizEmail, bizPhone, clientName, clientAddress, clientEmail, invoiceNum, issueDate, dueDate, currencyCode, notes, terms, items, subtotal, discountAmt, taxAmt, total, discount, taxRate, currency, taxLabel, countryData]);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.09)",
    background: "rgba(255,255,255,0.04)", color: "white",
    fontSize: 14, outline: "none",
    fontFamily: "inherit",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
    textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
    display: "block", marginBottom: 6,
  };
  const sectionCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 18, padding: "24px 24px",
    marginBottom: 16,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#06060c" }}>
      {/* Glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "0%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "120px 20px 80px" }}>

        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org", "@type": "WebApplication",
            "name": "Invoice Generator",
            "description": "Free invoice generator by ToolStack. Create professional invoices and download as PDF — no watermark, no signup. Supports 15 countries with automatic VAT, GST and Sales Tax. Free forever.",
            "url": "https://toolstack.tech/tools/invoice-generator",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "featureList": ["Watermark-free PDF download", "15 country tax profiles (VAT, GST, Sales Tax)", "100% browser-based — private", "Discount and line-item support", "No signup required"],
          },
          {
            "@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
              { "@type": "ListItem", "position": 2, "name": "Financial Tools", "item": "https://toolstack.tech/tools/category/finance" },
              { "@type": "ListItem", "position": 3, "name": "Invoice Generator", "item": "https://toolstack.tech/tools/invoice-generator" },
            ],
          },
          ]) }} />

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>All Tools</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Invoice Generator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#c7d2fe" }}>✓ Free Invoice Generator · No Watermark · No Signup</span>
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Free Invoice<br /><span style={{ background: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Generator.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", maxWidth: 540, lineHeight: 1.6 }}>
            Create professional invoices and download as PDF — no watermark, no signup, no subscription. Supports 15 countries with automatic currency, tax label and date format. Free forever.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["🔒 100% private", "📄 No watermark", "💸 No signup", "🌍 15 countries", "🧮 Tax & discounts"].map(b => (
              <span key={b} style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>{b}</span>
            ))}
          </div>
        </div>

        {/* ── COUNTRY PICKER ── */}
        <div style={{ ...sectionCard, marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 4px" }}>Where are you based?</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: "0 0 16px" }}>Sets your currency, tax label and address format automatically.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {COUNTRIES.map(c => {
              const isActive = c.code === countryCode;
              return (
                <button
                  key={c.code}
                  onClick={() => handleCountryChange(c.code)}
                  style={{
                    padding: "7px 14px", borderRadius: 999,
                    border: `1px solid ${isActive ? "rgba(99,102,241,0.55)" : "rgba(255,255,255,0.09)"}`,
                    background: isActive ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.03)",
                    color: isActive ? "#c7d2fe" : "rgba(255,255,255,0.55)",
                    fontSize: 13, fontWeight: isActive ? 700 : 500,
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                    transition: "all 0.15s",
                  }}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── FORM ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 16 }}>

          {/* Your Business */}
          <div style={sectionCard}>
            <p style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 16px" }}>Your Business</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label htmlFor="biz-name" style={labelStyle}>Business Name</label>
                <input id="biz-name" style={inputStyle} value={bizName} onChange={e => setBizName(e.target.value)} placeholder="Acme Ltd" />
              </div>
              <div>
                <label htmlFor="biz-address" style={labelStyle}>Address</label>
                <textarea id="biz-address" style={{ ...inputStyle, resize: "none", height: 72 }} value={bizAddress} onChange={e => setBizAddress(e.target.value)} placeholder={countryData.bizAddrPlaceholder} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label htmlFor="biz-email" style={labelStyle}>Email</label>
                  <input id="biz-email" style={inputStyle} value={bizEmail} onChange={e => setBizEmail(e.target.value)} placeholder="hello@you.com" type="email" />
                </div>
                <div>
                  <label htmlFor="biz-phone" style={labelStyle}>Phone</label>
                  <input id="biz-phone" style={inputStyle} value={bizPhone} onChange={e => setBizPhone(e.target.value)} placeholder={countryData.phonePlaceholder} />
                </div>
              </div>
            </div>
          </div>

          {/* Client */}
          <div style={sectionCard}>
            <p style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 16px" }}>Bill To (Client)</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label htmlFor="client-name" style={labelStyle}>Client Name</label>
                <input id="client-name" style={inputStyle} value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client Company Ltd" />
              </div>
              <div>
                <label htmlFor="client-address" style={labelStyle}>Address</label>
                <textarea id="client-address" style={{ ...inputStyle, resize: "none", height: 72 }} value={clientAddress} onChange={e => setClientAddress(e.target.value)} placeholder={countryData.clientAddrPlaceholder} />
              </div>
              <div>
                <label htmlFor="client-email" style={labelStyle}>Email</label>
                <input id="client-email" style={inputStyle} value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="client@company.com" type="email" />
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Meta */}
        <div style={sectionCard}>
          <p style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 16px" }}>Invoice Details</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            <div>
              <label htmlFor="inv-num" style={labelStyle}>Invoice #</label>
              <input id="inv-num" style={inputStyle} value={invoiceNum} onChange={e => setInvoiceNum(e.target.value)} />
            </div>
            <div>
              <label htmlFor="issue-date" style={labelStyle}>Issue Date</label>
              <input id="issue-date" style={{ ...inputStyle, colorScheme: "dark" }} type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="due-date" style={labelStyle}>Due Date</label>
              <input id="due-date" style={{ ...inputStyle, colorScheme: "dark" }} type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="currency" style={labelStyle}>Currency</label>
              <select id="currency" style={{ ...inputStyle, cursor: "pointer" }} value={currencyCode} onChange={e => setCurrencyCode(e.target.value)}>
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div style={sectionCard}>
          <p style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 16px" }}>Line Items</p>

          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 120px 100px 36px", gap: 8, marginBottom: 8 }}>
            <span style={labelStyle}>Description</span>
            <span style={{ ...labelStyle, textAlign: "center" }}>Qty</span>
            <span style={{ ...labelStyle, textAlign: "right" }}>Unit Price</span>
            <span style={{ ...labelStyle, textAlign: "right" }}>Amount</span>
            <span />
          </div>

          {items.map(item => {
            const q = parseFloat(item.qty) || 0;
            const r = parseFloat(item.rate) || 0;
            const amount = q * r;
            return (
              <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 80px 120px 100px 36px", gap: 8, marginBottom: 8, alignItems: "center" }}>
                <input aria-label="Item description" style={inputStyle} value={item.desc} onChange={e => updateItem(item.id, "desc", e.target.value)} placeholder="Service or product description" />
                <input aria-label="Quantity" style={{ ...inputStyle, textAlign: "center" }} value={item.qty} onChange={e => updateItem(item.id, "qty", e.target.value)} type="number" min="0" step="0.01" />
                <input aria-label="Unit price" style={{ ...inputStyle, textAlign: "right" }} value={item.rate} onChange={e => updateItem(item.id, "rate", e.target.value)} type="number" min="0" step="0.01" placeholder="0.00" />
                <div style={{ textAlign: "right", fontSize: 14, fontWeight: 700, color: amount > 0 ? "#a5b4fc" : "rgba(255,255,255,0.25)", padding: "10px 14px" }}>
                  {amount > 0 ? fmt(amount, currency.symbol) : "—"}
                </div>
                <button onClick={() => removeItem(item.id)} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                  aria-label="Remove line item">×</button>
              </div>
            );
          })}

          <button onClick={addItem} style={{ marginTop: 8, padding: "8px 18px", borderRadius: 10, border: "1px dashed rgba(99,102,241,0.35)", background: "rgba(99,102,241,0.06)", color: "#a5b4fc", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            + Add line item
          </button>
        </div>

        {/* Totals + Notes */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 16 }}>

          {/* Discount + Tax */}
          <div style={sectionCard}>
            <p style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 16px" }}>Adjustments</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label htmlFor="discount" style={labelStyle}>Discount (%)</label>
                <input id="discount" style={inputStyle} value={discount} onChange={e => setDiscount(e.target.value)} type="number" min="0" max="100" step="0.1" placeholder="0" />
              </div>
              <div>
                <label htmlFor="tax-rate" style={labelStyle}>{taxLabel} (%)</label>
                <input id="tax-rate" style={inputStyle} value={taxRate} onChange={e => setTaxRate(e.target.value)} type="number" min="0" max="100" step="0.1" placeholder="0" />
              </div>
            </div>

            {/* Totals summary */}
            <div style={{ marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Subtotal</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{fmt(subtotal, currency.symbol)}</span>
              </div>
              {discountAmt > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Discount ({discount}%)</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#34d399" }}>−{fmt(discountAmt, currency.symbol)}</span>
                </div>
              )}
              {taxAmt > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{taxLabel} ({taxRate}%)</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{fmt(taxAmt, currency.symbol)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 12, marginTop: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 900, color: "white" }}>Total Due</span>
                <span style={{ fontSize: 18, fontWeight: 900, color: "#818cf8" }}>{fmt(total, currency.symbol)}</span>
              </div>
            </div>
          </div>

          {/* Notes + Terms */}
          <div style={sectionCard}>
            <p style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 16px" }}>Notes & Terms</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label htmlFor="inv-notes" style={labelStyle}>Notes (optional)</label>
                <textarea id="inv-notes" style={{ ...inputStyle, resize: "none", height: 80 }} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Thank you for your business!" />
              </div>
              <div>
                <label htmlFor="inv-terms" style={labelStyle}>Payment Terms</label>
                <textarea id="inv-terms" style={{ ...inputStyle, resize: "none", height: 80 }} value={terms} onChange={e => setTerms(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Download button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 64 }}>
          <button onClick={handleDownload} style={{
            padding: "16px 40px", borderRadius: 14,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: "none", cursor: "pointer",
            fontSize: 16, fontWeight: 800, color: "white",
            boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
            transition: "transform 0.15s, box-shadow 0.15s",
            display: "flex", alignItems: "center", gap: 10,
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(99,102,241,0.55)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(99,102,241,0.4)"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
            Download PDF — Free, No Watermark
          </button>
        </div>

        {/* HOW IT WORKS */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Create an invoice in 60 seconds</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { step: "01", title: "Enter your details", desc: "Fill in your business name, address and contact details — and the same for your client.", color: "#6366f1", rgb: "99,102,241" },
              { step: "02", title: "Add line items", desc: "List every service or product with quantity and unit price. The tool calculates line totals automatically.", color: "#34d399", rgb: "52,211,153" },
              { step: "03", title: "Set tax & discounts", desc: "Enter your VAT or tax rate (e.g. 20% for UK) and any discount. The total updates instantly.", color: "#a78bfa", rgb: "167,139,250" },
              { step: "04", title: "Download PDF", desc: "Click Download PDF. Your browser opens a clean professional invoice — save it as PDF with no watermark.", color: "#fbbf24", rgb: "251,191,36" },
            ].map(s => (
              <div key={s.step} style={{ padding: "24px 22px", borderRadius: 18, background: `rgba(${s.rgb},0.06)`, border: `1px solid rgba(${s.rgb},0.15)` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>STEP <span style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.step}</span></div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>FEATURES</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Everything you need, nothing you don&apos;t</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { icon: "📄", title: "PDF download, no watermark", desc: "Download a clean, professional PDF invoice. No branding, no watermark, no 'Created with...' footer forcing your client to see ads.", color: "#6366f1" },
              { icon: "🔒", title: "100% private", desc: "All data stays in your browser. Your business name, client name, amounts and bank details are never sent to any server.", color: "#34d399" },
              { icon: "🌍", title: "15 countries supported", desc: "Pick your country — UK, US, Australia, Canada, Germany, France and more. Currency, tax label (VAT / GST / Sales Tax / MwSt) and date format all update automatically.", color: "#a78bfa" },
              { icon: "🧮", title: "Tax support for every country", desc: "UK VAT 20%, US Sales Tax, Australian GST 10%, German MwSt 19%, Irish VAT 23% — the correct label and default rate are set for your country automatically.", color: "#fbbf24" },
              { icon: "💸", title: "Discount support", desc: "Apply a percentage discount before tax is calculated. Discounts are shown as a line in the invoice total so clients can see exactly what they're saving.", color: "#f472b6" },
              { icon: "♾️", title: "Unlimited invoices", desc: "Create as many invoices as you need. No monthly limit, no credit system, no upgrade required. Genuinely free, forever.", color: "#38bdf8" },
            ].map(f => (
              <div key={f.title} style={{ padding: "24px 22px", borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 24, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEO CONTENT */}
        <div style={{ marginTop: 64, padding: "36px 40px", borderRadius: 24, background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.18)" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>What makes a professional invoice — and what free tools get wrong</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 24 }}>
            An <strong style={{ color: "white" }}>invoice</strong> is a formal billing document that records a transaction between a seller and a buyer. A professional invoice must include the seller&apos;s business name and address, the buyer&apos;s details, a unique invoice number, the issue and due dates, a line-item breakdown of services or products, any applicable tax (VAT, GST, Sales Tax), and the total amount due. Most countries have legal requirements about what invoices must contain to be tax-compliant.
          </p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 24 }}>
            Most free invoice generators either add a watermark to the PDF, require an account, or send your business and client data to their servers. ToolStack&apos;s invoice generator runs entirely in your browser — nothing is transmitted. The PDF is generated client-side and downloaded directly to your device. Your business name, client name, bank details and invoice amounts never leave your machine.
          </p>

          <div style={{ overflowX: "auto", margin: "20px 0 32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                  <th style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#818cf8" }}>Feature</th>
                  <th style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>ToolStack</th>
                  <th style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Most free alternatives</th>
                </tr>
              </thead>
              <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                <tr>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "white" }}>Watermark-free PDF</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#34d399" }}>✓ Always</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Paid upgrade required</td>
                </tr>
                <tr style={{ background: "rgba(99,102,241,0.05)" }}>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "white" }}>Account required</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#34d399" }}>No signup ever</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Usually required</td>
                </tr>
                <tr>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "white" }}>Data privacy</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#34d399" }}>100% browser — never sent to server</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Stored on provider servers</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
             <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>VAT, GST, Sales Tax — handled automatically</h3>
             <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.85 }}>
               Tax requirements differ by country. The UK charges 20% standard VAT. Australia has 10% GST. Germany uses 19% MwSt. Ireland charges 23% VAT. The UAE has 5% VAT. When you select your country in this tool, the correct tax label and default rate are set automatically — so your invoice uses the right terminology and calculation for your jurisdiction. You can always override the rate manually for non-standard cases.
             </p>
          </div>
        </div>

        <FaqPageSchema faqs={FAQS} />
        {/* FAQ */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>FAQ</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.025)", overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "18px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left" as const }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0, lineHeight: 1.4 }}>{faq.q}</h3>
                  <span style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s" }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 18px", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 64 }}>
          {/* SEO Description */}
          <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Invoice Generator: Free Online Tool</h2>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>
                Every freelancer and small business needs to send invoices — but paying $10-30/month for invoicing software when you only send a few invoices a month doesn't make sense. Our Invoice Generator creates fully professional, customizable PDF invoices in your browser, with no watermarks, no signup, and no subscription. Add your logo, customize colors, add line items, tax, discounts, and payment terms.
              </p>
              <p style={{ marginBottom: 16 }}>
                Enter your business name, logo, address, and contact details. Add your client's details, line items with descriptions and prices, tax rate, any discounts, and payment terms. The preview updates in real-time. Download as a print-ready PDF or send directly via email link. Your details are saved in the browser so you don't have to re-enter them.
              </p>
              <p style={{ marginBottom: 16 }}>
                Common uses include creating invoices for freelance clients without paying for accounting software, generating pro forma invoices before work begins, sending refund receipts or credit memos, generating quotes that can be converted to invoices later, and producing receipts for one-time purchases without a POS system.
              </p>
              <p style={{ marginBottom: 0 }}>
                Most free invoice generators either watermark the PDF, require account creation, or lock features behind a paywall. Ours is genuinely free and fully featured: no watermark, no signup, your branding on every invoice, tax calculations, discounts, multiple currencies, and payment terms. Free, unlimited invoices.
              </p>
            </div>
          </section>

          <MoreTools currentSlug="invoice-generator" />
        </div>
        
      </div>
    </div>
  );
}
