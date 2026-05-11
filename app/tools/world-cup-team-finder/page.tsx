"use client";
import { useState } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const FAQS = [
  { q: "How does the World Cup 2026 team finder quiz work?", a: "Answer 5 questions about your football preferences \u2014 favourite play style, how you like your team to defend a lead, which region appeals, which player archetype you love, and your attitude to pressure. Your answers are matched against profiles for 24 World Cup 2026 nations and the team with the most matching attributes is revealed as your result." },
  { q: "How many teams are in the 2026 World Cup?", a: "The 2026 FIFA World Cup features 48 teams for the first time, up from 32 in previous tournaments. The tournament is co-hosted by the United States, Canada and Mexico, running from June 11 to July 19, 2026." },
  { q: "Which team is the favourite to win the 2026 World Cup?", a: "Spain, France and England are widely considered the leading favourites heading into the 2026 World Cup, with Brazil and Argentina also among the top contenders. Spain are the reigning European Champions, France have arguably the most complete squad, and England have a golden generation of talent at their peak." },
  { q: "Who should I support if my country did not qualify for the 2026 World Cup?", a: "Take this 5-question quiz \u2014 it will match you to one of 24 nations based on your football personality. Common second-team choices include Brazil (for beautiful football lovers), Morocco (for underdog fans), Japan (for tactical enthusiasts), or whichever team your favourite club player represents." },
  { q: "What makes a good neutral team to follow at the World Cup?", a: "A great neutral team usually has an interesting playing style, a compelling story going into the tournament, and at least one player who is must-watch entertainment. Underdogs like Morocco, Japan and Australia are popular neutral picks because their runs are dramatic. Teams like Spain and Brazil are popular for the quality of football they play." },
  { q: "What is the best World Cup 2026 team finder quiz?", a: "ToolStack" }
];


const ACCENT = "#f59e0b";
const ACCENT_DIM = "rgba(245,158,11,0.1)";
const ACCENT_BORDER = "rgba(245,158,11,0.3)";

const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 20,
    padding: "28px 32px",
    marginBottom: 20,
};

interface Question {
    question: string;
    options: { label: string; desc: string; teams: string[] }[];
}

const QUESTIONS: Question[] = [
    {
        question: "Your ideal World Cup goal is…",
        options: [
            { label: "Tiki-taka perfection", desc: "30 passes, intricate build-up, tap-in finish", teams: ["Spain", "Germany", "Japan", "Croatia"] },
            { label: "Long-range screamer", desc: "A 35-yard rocket into the top corner", teams: ["England", "Netherlands", "Belgium", "Germany"] },
            { label: "Lightning counter-attack", desc: "3 passes, back to net in 6 seconds flat", teams: ["France", "Portugal", "Argentina", "South Korea"] },
            { label: "Set piece header", desc: "Perfect corner delivery, bullet header, done", teams: ["Uruguay", "Morocco", "Poland", "Switzerland"] },
        ],
    },
    {
        question: "Your team is 1-0 up with 10 minutes left. You want them to…",
        options: [
            { label: "Park the bus", desc: "Stack the defence and grind it out", teams: ["Italy", "Uruguay", "Morocco", "Croatia", "Switzerland"] },
            { label: "Go for the kill", desc: "Attack again and put the game to bed", teams: ["Brazil", "Netherlands", "Belgium", "Colombia", "Canada"] },
            { label: "Control possession", desc: "Keep the ball and run the clock down", teams: ["Spain", "Germany", "Japan", "Argentina"] },
            { label: "Hit them on the break", desc: "Absorb pressure and counter at pace", teams: ["France", "Portugal", "South Korea", "Ecuador", "Turkey"] },
        ],
    },
    {
        question: "Which region calls to you?",
        options: [
            { label: "⚽ Europe", desc: "Where football tactics were invented", teams: ["Spain", "France", "England", "Germany", "Netherlands", "Portugal", "Italy", "Belgium", "Croatia", "Switzerland", "Turkey", "Poland"] },
            { label: "🌎 South America", desc: "Passion, ginga, and pure drama", teams: ["Brazil", "Argentina", "Uruguay", "Colombia", "Ecuador"] },
            { label: "🌎 North & Central America", desc: "The hosts and the rising powers", teams: ["USA", "Mexico", "Canada"] },
            { label: "🌍 Africa & Asia", desc: "The rest of the world has fully arrived", teams: ["Morocco", "Senegal", "Japan", "South Korea", "Australia"] },
        ],
    },
    {
        question: "Which player archetype do you love most?",
        options: [
            { label: "The creative playmaker", desc: "Orchestrates everything from midfield", teams: ["Spain", "Croatia", "Germany", "Japan", "Colombia"] },
            { label: "The electric winger", desc: "Takes on three defenders and wins", teams: ["Brazil", "Portugal", "Netherlands", "Belgium", "England"] },
            { label: "The clinical striker", desc: "Only needs one chance, buries every one", teams: ["France", "Argentina", "Uruguay", "Canada", "Poland"] },
            { label: "The defensive wall", desc: "Wins every header, blocks every shot", teams: ["Italy", "Morocco", "Switzerland", "South Korea", "Australia"] },
        ],
    },
    {
        question: "What is your attitude to being the favourite?",
        options: [
            { label: "Love it — pressure is a privilege", desc: "We came here to win, full stop", teams: ["France", "Spain", "Brazil", "Argentina", "England"] },
            { label: "Dark horse — we will surprise everyone", desc: "Nobody takes us seriously. That is fine.", teams: ["Portugal", "Netherlands", "Germany", "Colombia", "USA", "Turkey"] },
            { label: "Pure underdog — every game is a miracle", desc: "We have nothing to lose and everything to gain", teams: ["Japan", "Morocco", "Australia", "Ecuador", "Switzerland"] },
            { label: "True wildcard — who knows what happens", desc: "Unpredictable and proud of it", teams: ["Senegal", "South Korea", "Mexico", "Canada", "Uruguay"] },
        ],
    },
];

interface TeamProfile {
    flag: string;
    name: string;
    tagline: string;
    style: string;
    stars: string;
    desc: string;
    whyYou: string;
    color: string;
}

const TEAMS: Record<string, TeamProfile> = {
    Spain: {
        flag: "🇪🇸", name: "Spain", color: "#dc2626",
        tagline: "The reigning European Champions",
        style: "Technical · Possession-based · Relentless pressing",
        stars: "Pedri, Lamine Yamal, Dani Olmo",
        desc: "Spain play the most beautiful football on the planet right now. Patient, intricate, suffocating — they own the ball and own the game. Their young generation is among the most exciting in world football.",
        whyYou: "You are a football purist who believes the team that controls the ball controls the match.",
    },
    France: {
        flag: "🇫🇷", name: "France", color: "#1d4ed8",
        tagline: "The most clinical squad at the tournament",
        style: "Counter-attacking · Physical · Ruthlessly efficient",
        stars: "Kylian Mbappé, Aurélien Tchouaméni",
        desc: "France do not waste chances. Packed with world-class talent at every position, they are built to win tournaments. Les Bleus are the benchmark for what a complete international squad looks like.",
        whyYou: "You want a team that backs itself to win and does not leave things to chance.",
    },
    England: {
        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "England", color: "#1e40af",
        tagline: "60 years of hurt — could 2026 be the year?",
        style: "Physically strong · Set-piece threats · Improving tactically",
        stars: "Jude Bellingham, Bukayo Saka, Harry Kane",
        desc: "A genuinely brilliant squad with real tournament quality. There is always drama, always tension, and always belief. England have never been closer to ending their wait for a major trophy.",
        whyYou: "You love the hope, the heartbreak, and the belief that this time it is different.",
    },
    Germany: {
        flag: "🇩🇪", name: "Germany", color: "#374151",
        tagline: "The machine is back and rebuilt",
        style: "High-pressing · Organised · Technically excellent",
        stars: "Jamal Musiala, Florian Wirtz, Toni Kroos",
        desc: "Germany went through a rebuild and came out the other side with one of their most exciting squads in years. Fast, technical, relentless pressing — they look like genuine title contenders again.",
        whyYou: "You respect consistency, quality and a nation that always turns up at major tournaments.",
    },
    Netherlands: {
        flag: "🇳🇱", name: "Netherlands", color: "#ea580c",
        tagline: "Total football royalty, back with a vengeance",
        style: "Expansive · Attacking · Direct and clinical",
        stars: "Virgil van Dijk, Xavi Simons, Cody Gakpo",
        desc: "The Dutch are stacked. Van Dijk marshals one of the best defences in the world while Simons and Gakpo provide the attacking spark. They play direct, ambitious football designed to win.",
        whyYou: "You want a team that commits to attacking and makes every single game entertaining.",
    },
    Brazil: {
        flag: "🇧🇷", name: "Brazil", color: "#16a34a",
        tagline: "Five-time champions — the most famous shirt in football",
        style: "Expressive · Attacking · Joyful to watch",
        stars: "Vinicius Jr, Rodrygo, Endrick",
        desc: "There is no team in world football with more history, more passion or more natural talent than Brazil. Vinicius Jr is appointment viewing every time he touches the ball. This is the most storied team at the tournament.",
        whyYou: "You want beautiful football and you back the most iconic team in the history of the sport.",
    },
    Argentina: {
        flag: "🇦🇷", name: "Argentina", color: "#0ea5e9",
        tagline: "World champions defending their crown",
        style: "Tactical · Pragmatic · Lethal on the counter",
        stars: "Lautaro Martínez, Julián Álvarez, Rodrigo De Paul",
        desc: "Argentina are the defending World Champions and they know exactly how to win major tournaments. Organised, resilient and ice-cold when it matters. Since Messi&apos;s crowning moment, this team plays with a champion&apos;s confidence.",
        whyYou: "You love winning more than style and back a team that has a plan and executes it.",
    },
    Portugal: {
        flag: "🇵🇹", name: "Portugal", color: "#b91c1c",
        tagline: "The deepest squad they have ever had",
        style: "Fluid · Technically brilliant · Counter-attacking",
        stars: "Rafael Leão, Bruno Fernandes, Rúben Dias",
        desc: "Portugal have arguably their best-ever squad depth post-Ronaldo. Leão is electric, Fernandes controls everything, and Dias is world class at the back. They have never won a World Cup — could 2026 be the year?",
        whyYou: "You love quality throughout the squad and want to be there when a great team finally writes history.",
    },
    Italy: {
        flag: "🇮🇹", name: "Italy", color: "#1d4ed8",
        tagline: "The masters of winning ugly",
        style: "Tactical · Defensive · Cynically brilliant",
        stars: "Federico Chiesa, Gianluigi Donnarumma, Sandro Tonali",
        desc: "Nobody defends like Italy. Nobody grinds out results like Italy. The Azzurri may not always excite, but they always make you believe they can find a way to win from anywhere.",
        whyYou: "You respect tactics over flair and genuinely believe defence wins championships.",
    },
    Belgium: {
        flag: "🇧🇪", name: "Belgium", color: "#b91c1c",
        tagline: "A new golden generation is emerging",
        style: "Direct · Attacking · Goal-hungry",
        stars: "Romelu Lukaku, Kevin De Bruyne, Lois Openda",
        desc: "Belgium never stopped producing world-class talent. Their new generation combines experience from De Bruyne with the raw power of Lukaku and the pace of Openda. They have been hunting a first major trophy for years.",
        whyYou: "You want end-to-end football and a team that will always try to score rather than defend a lead.",
    },
    USA: {
        flag: "🇺🇸", name: "United States", color: "#b91c1c",
        tagline: "At home and more dangerous than ever",
        style: "Energetic · High-intensity pressing · Rapidly improving",
        stars: "Christian Pulisic, Tyler Adams, Folarin Balogun",
        desc: "The USA will have an entire continent behind them. Their squad is packed with players from Europe&apos;s top clubs and the home advantage factor is real. This is the most exciting USMNT in a generation.",
        whyYou: "You love backing a host nation and watching a country fall completely in love with football in real time.",
    },
    Mexico: {
        flag: "🇲🇽", name: "Mexico", color: "#16a34a",
        tagline: "El Tri at home with a continent behind them",
        style: "Organised · Counter-attacking · Passionate",
        stars: "Santiago Giménez, Hirving Lozano, Edson Álvarez",
        desc: "Mexico have some of the most passionate fans at any World Cup. Playing at home amplifies everything. Tactical, disciplined, and perfectly capable of eliminating any team on their day.",
        whyYou: "You love football played with raw passion and a stadium atmosphere that makes your ears ring.",
    },
    Canada: {
        flag: "🇨🇦", name: "Canada", color: "#b91c1c",
        tagline: "The most improved team in the Americas",
        style: "Direct · Physical · Pressing with belief",
        stars: "Alphonso Davies, Jonathan David, Tajon Buchanan",
        desc: "Canada are on the rise and they know it. Davies is one of the most exciting fullbacks in world football, David is among the most clinical strikers in Europe. Playing at home, they believe they can go all the way.",
        whyYou: "You love backing a rising nation making history on home soil and proving the doubters wrong.",
    },
    Japan: {
        flag: "🇯🇵", name: "Japan", color: "#1d4ed8",
        tagline: "The serial giant-killers of world football",
        style: "Intense pressing · Technical · Tactically disciplined",
        stars: "Takefusa Kubo, Wataru Endo, Kaoru Mitoma",
        desc: "Japan shocked the world in Qatar by beating Germany and Spain in the group stage. They are organised, intense, and capable of stunning absolutely anyone. Every game they play is a tactical masterclass.",
        whyYou: "You love tactical surprise packages and teams that punch far above their weight.",
    },
    "South Korea": {
        flag: "🇰🇷", name: "South Korea", color: "#b91c1c",
        tagline: "Unpredictable, athletic, never give up",
        style: "High-energy · Counter-attacking · Physical",
        stars: "Son Heung-min, Lee Jae-sung, Kim Min-jae",
        desc: "Son Heung-min remains one of the most dangerous forwards in the world. South Korea have a deep squad and a never-say-die mentality. They reached the World Cup semi-finals on home soil in 2002 and always believe they can do it again.",
        whyYou: "You love teams that never stop running and can produce a massive upset at any moment.",
    },
    Morocco: {
        flag: "🇲🇦", name: "Morocco", color: "#16a34a",
        tagline: "Africa&apos;s flag-bearers — the 2022 fairy tale team",
        style: "Defensive · Organised · Devastating on the break",
        stars: "Achraf Hakimi, Hakim Ziyech, Yassine Bounou",
        desc: "Morocco were the story of the 2022 World Cup, reaching the semi-finals and becoming the first African nation to go so far. They play a defensive masterclass combined with rapid, direct counter-attacks. The whole continent of Africa cheers for them.",
        whyYou: "You love a team that makes history and proves to the world that Africa belongs at the top table.",
    },
    Uruguay: {
        flag: "🇺🇾", name: "Uruguay", color: "#0ea5e9",
        tagline: "Gritty, hard-nosed and mentally the toughest team here",
        style: "Physical · Defensive · Clinical when it matters",
        stars: "Darwin Núñez, Federico Valverde, Rodrigo Bentancur",
        desc: "No team competes harder than Uruguay. They defend as a unit, work as a unit, and win as a unit. Valverde and Núñez give them serious quality going forward. Uruguay do not care about being liked — they care about winning.",
        whyYou: "You respect toughness over beauty and believe that mental strength wins more games than flair.",
    },
    Colombia: {
        flag: "🇨🇴", name: "Colombia", color: "#f59e0b",
        tagline: "One of the most exciting squads in South America",
        style: "Attacking · Creative · Fluid and expressive",
        stars: "James Rodríguez, Luis Díaz, Rafael Santos Borré",
        desc: "Colombia play football with a freedom and creativity that is a joy to watch. James Rodríguez is the architect, Díaz the danger man. They are full of Premier League quality and capable of beating anyone when they are on song.",
        whyYou: "You want expressive, creative football from a squad bursting with personality and Premier League flair.",
    },
    Ecuador: {
        flag: "🇪🇨", name: "Ecuador", color: "#f59e0b",
        tagline: "South America&apos;s hard-working underdog",
        style: "Compact · Counter-attacking · Hard-working",
        stars: "Enner Valencia, Moisés Caicedo, Gonzalo Plata",
        desc: "Ecuador are compact, physical and difficult to beat. Caicedo is one of the best midfielders in the Premier League. They punch above their weight and represent the classic underdog story with real quality.",
        whyYou: "You want a genuine underdog story with a team that earns everything they get.",
    },
    Croatia: {
        flag: "🇭🇷", name: "Croatia", color: "#b91c1c",
        tagline: "Small nation, enormous tournament heart",
        style: "Possession · Technical midfield · Tactically astute",
        stars: "Luka Modrić, Mateo Kovačić, Joško Gvardiol",
        desc: "Croatia have reached two consecutive World Cup finals. They play intelligent, possession-based football anchored by Modrić, one of the greatest midfielders of his generation. They know exactly how to navigate a tournament.",
        whyYou: "You admire football intelligence and back teams built on quality, experience and tactical discipline.",
    },
    Switzerland: {
        flag: "🇨🇭", name: "Switzerland", color: "#b91c1c",
        tagline: "The ultimate reliable overachiever",
        style: "Defensive · Organised · Composed under pressure",
        stars: "Granit Xhaka, Manuel Akanji, Breel Embolo",
        desc: "Switzerland always qualify, always reach the knockouts, and always cause problems for bigger teams. They are tactically sound, mentally resilient and never know when they are beaten.",
        whyYou: "You appreciate consistency and a team that quietly keeps punching above its weight tournament after tournament.",
    },
    Senegal: {
        flag: "🇸🇳", name: "Senegal", color: "#16a34a",
        tagline: "Africa&apos;s champions with a point to prove",
        style: "Powerful · Direct · Physically imposing",
        stars: "Sadio Mané, Kalidou Koulibaly, Ismaïla Sarr",
        desc: "Senegal are African champions and they play like it. Physical, powerful and deeply passionate, they have the quality to reach the knockout rounds and the mentality to go even further.",
        whyYou: "You love backing an African giant with star quality and a burning desire to show the world what they can do.",
    },
    Australia: {
        flag: "🇦🇺", name: "Australia", color: "#f59e0b",
        tagline: "The Socceroos — grit, determination, and one massive upset waiting",
        style: "Organised · Physical · Determined to the last",
        stars: "Mathew Leckie, Riley McGree, Aziz Behich",
        desc: "Australia shocked France on penalties in Qatar to reach the quarter-finals. They work as a collective, press endlessly and make life difficult for far more celebrated opponents. They are the ultimate team that could always catch someone cold.",
        whyYou: "You love an underdog who leaves everything on the pitch and never, ever gives up.",
    },
    Turkey: {
        flag: "🇹🇷", name: "Turkey", color: "#b91c1c",
        tagline: "Tactically unpredictable and full of flair",
        style: "Energetic · Counter-attacking · Technically talented",
        stars: "Hakan Çalhanoğlu, Arda Güler, Kerem Aktürkoğlu",
        desc: "Turkey were the revelation of EURO 2024, playing some of the most direct and entertaining football in the tournament. Young, confident and with genuine quality — they are built for the big stage.",
        whyYou: "You love a team that can switch from danger to brilliance in one moment and is never predictable.",
    },
    Poland: {
        flag: "🇵🇱", name: "Poland", color: "#b91c1c",
        tagline: "Built on resilience and a lethal striker",
        style: "Defensive · Direct · Counter-attacking",
        stars: "Robert Lewandowski, Piotr Zieliński, Wojciech Szczęsny",
        desc: "Poland are organised defensively and direct in attack. Lewandowski is one of the greatest strikers of his generation — if he fires, Poland can beat anyone. They are a difficult team to play against and always competitive.",
        whyYou: "You want a team built around a world-class striker and believe one moment of quality can decide any match.",
    },
};

function calculateResult(answers: number[]): string {
    const scores: Record<string, number> = {};
    answers.forEach((ansIdx, qi) => {
        const option = QUESTIONS[qi].options[ansIdx];
        if (!option) return;
        option.teams.forEach(team => {
            scores[team] = (scores[team] || 0) + 1;
        });
    });
    let maxScore = 0;
    let winner = "Brazil";
    Object.entries(scores).forEach(([team, score]) => {
        if (score > maxScore) { maxScore = score; winner = team; }
    });
    return winner;
}

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            name: "World Cup 2026 Team Finder Quiz",
            description: "5-question personality quiz that matches football fans to their ideal World Cup 2026 team from 24 qualified nations.",
            url: "https://toolstack.tech/tools/world-cup-team-finder",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            browserRequirements: "Requires JavaScript",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            featureList: [
                "5-question personality quiz",
                "Matches to one of 24 World Cup 2026 nations",
                "Team profile with play style and star players",
                "Fully free, no signup required",
                "Instant result on completion",
            ],
        },
        {
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "ToolStack", item: "https://toolstack.tech" },
                { "@type": "ListItem", position: 2, name: "Sports", item: "https://toolstack.tech/tools?category=sports" },
                { "@type": "ListItem", position: 3, name: "World Cup 2026 Team Finder", item: "https://toolstack.tech/tools/world-cup-team-finder" },
            ],
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "How does the World Cup 2026 team finder quiz work?",
                    acceptedAnswer: { "@type": "Answer", text: "Answer 5 questions about your football preferences — favourite play style, how you like your team to defend a lead, which region appeals, which player archetype you love, and your attitude to pressure. Your answers are matched against profiles for 24 World Cup 2026 nations and the team with the most matching attributes is revealed as your result." },
                },
                {
                    "@type": "Question",
                    name: "How many teams are in the 2026 World Cup?",
                    acceptedAnswer: { "@type": "Answer", text: "The 2026 FIFA World Cup features 48 teams for the first time, up from 32 in previous tournaments. The tournament is co-hosted by the United States, Canada and Mexico, running from June 11 to July 19, 2026." },
                },
                {
                    "@type": "Question",
                    name: "Which team is the favourite to win the 2026 World Cup?",
                    acceptedAnswer: { "@type": "Answer", text: "Spain, France and England are widely considered the leading favourites heading into the 2026 World Cup, with Brazil and Argentina also among the top contenders. Spain are the reigning European Champions, France have arguably the most complete squad, and England have a golden generation of talent at their peak." },
                },
                {
                    "@type": "Question",
                    name: "Who should I support if my country did not qualify for the 2026 World Cup?",
                    acceptedAnswer: { "@type": "Answer", text: "Take this 5-question quiz — it will match you to one of 24 nations based on your football personality. Common second-team choices include Brazil (for beautiful football lovers), Morocco (for underdog fans), Japan (for tactical enthusiasts), or whichever team your favourite club player represents." },
                },
                {
                    "@type": "Question",
                    name: "What makes a good neutral team to follow at the World Cup?",
                    acceptedAnswer: { "@type": "Answer", text: "A great neutral team usually has an interesting playing style, a compelling story going into the tournament, and at least one player who is must-watch entertainment. Underdogs like Morocco, Japan and Australia are popular neutral picks because their runs are dramatic. Teams like Spain and Brazil are popular for the quality of football they play." },
                },
                {
                    "@type": "Question",
                    name: "What is the best World Cup 2026 team finder quiz?",
                    acceptedAnswer: { "@type": "Answer", text: "ToolStack's World Cup 2026 Team Finder is completely free, requires no signup, and matches you to one of 24 qualified nations based on 5 football personality questions. Each result includes a full team profile with play style, star players and a tailored description of why that team suits you." },
                },
            ],
        },
    ],
};

export default function WorldCupTeamFinderPage() {
    const [step, setStep] = useState<"intro" | number | "result">("intro");
    const [answers, setAnswers] = useState<number[]>([]);

    const currentStep = typeof step === "number" ? step : 0;
    const resultTeam = step === "result" ? TEAMS[calculateResult(answers)] ?? TEAMS["Brazil"] : null;

    function selectAnswer(optionIdx: number) {
        const newAnswers = [...answers, optionIdx];
        setAnswers(newAnswers);
        if (newAnswers.length < QUESTIONS.length) {
            setStep(newAnswers.length);
        } else {
            setStep("result");
        }
    }

    function restart() {
        setStep("intro");
        setAnswers([]);
    }

    return (
        <div style={{ minHeight: "100vh", background: "#080810", color: "white", fontFamily: "'Inter', -apple-system, sans-serif" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Ambient glows */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-20%", right: "10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)", borderRadius: "50%" }} />
                <div style={{ position: "absolute", bottom: "20%", left: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", borderRadius: "50%" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px" }}>

                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 36, flexWrap: "wrap" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>ToolStack</Link>
                    <span>›</span>
                    <Link href="/tools/category/sports" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Sports</Link>
                    <span>›</span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>WC 2026 Team Finder</span>
                </nav>

                {/* Hero */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                        {["⚽ World Cup 2026", "5 Questions", "24 Nations", "Free Forever"].map(b => (
                            <span key={b} style={{ fontSize: 12, fontWeight: 700, color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, borderRadius: 999, padding: "4px 12px" }}>{b}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                        Which World Cup 2026 Team{" "}
                        <span style={{ background: `linear-gradient(135deg, ${ACCENT}, #d97706)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Should You Support?
                        </span>
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 620, margin: 0 }}>
                        Answer 5 questions about your football personality and we&apos;ll match you to the perfect World Cup 2026 team from 24 qualified nations.
                    </p>
                </div>

                {/* Quiz area */}
                {step === "intro" && (
                    <div style={{ ...cardStyle, textAlign: "center" }}>
                        <div style={{ fontSize: 56, marginBottom: 20 }}>⚽</div>
                        <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 12px" }}>Find Your World Cup Team</h2>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", margin: "0 0 32px", lineHeight: 1.7, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
                            Your country didn&apos;t qualify? You want a second team? Or you just want to know which of the 48 nations is truly yours? Five questions, instant result.
                        </p>
                        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
                            {["5 questions", "24 nations covered", "Instant result", "Free forever"].map(f => (
                                <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
                                    <span style={{ color: ACCENT, fontWeight: 700 }}>✓</span> {f}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setStep(0)}
                            style={{
                                padding: "16px 48px", borderRadius: 14, fontSize: 16, fontWeight: 800, cursor: "pointer",
                                background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
                                border: "none", color: "#000", letterSpacing: "-0.01em",
                                transition: "opacity 0.15s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                        >
                            Start the Quiz →
                        </button>
                    </div>
                )}

                {typeof step === "number" && step >= 0 && step < QUESTIONS.length && (
                    <div style={cardStyle}>
                        {/* Progress */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                            <div style={{ display: "flex", gap: 6 }}>
                                {QUESTIONS.map((_, i) => (
                                    <div key={i} style={{
                                        width: i === step ? 24 : 8, height: 8, borderRadius: 999,
                                        background: i < step ? ACCENT : i === step ? ACCENT : "rgba(255,255,255,0.15)",
                                        transition: "all 0.3s",
                                    }} />
                                ))}
                            </div>
                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>Question {currentStep + 1} of {QUESTIONS.length}</span>
                        </div>

                        <h2 style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 900, color: "white", margin: "0 0 28px", lineHeight: 1.3 }}>
                            {QUESTIONS[currentStep].question}
                        </h2>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                            {QUESTIONS[currentStep].options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => selectAnswer(i)}
                                    style={{
                                        padding: "20px 22px", borderRadius: 16, textAlign: "left", cursor: "pointer",
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.09)",
                                        transition: "all 0.15s", color: "white",
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = ACCENT_DIM;
                                        e.currentTarget.style.borderColor = ACCENT_BORDER;
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                >
                                    <p style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 6px", lineHeight: 1.3 }}>{opt.label}</p>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.5 }}>{opt.desc}</p>
                                </button>
                            ))}
                        </div>

                        {step > 0 && (
                            <button
                                onClick={() => { setStep((step as number) - 1); setAnswers(a => a.slice(0, -1)); }}
                                style={{ marginTop: 20, background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer", padding: 0, fontWeight: 600 }}
                            >
                                ← Back
                            </button>
                        )}
                    </div>
                )}

                {step === "result" && resultTeam && (
                    <div>
                        <div style={{
                            background: `linear-gradient(135deg, ${resultTeam.color}20, rgba(255,255,255,0.03))`,
                            border: `1px solid ${resultTeam.color}40`,
                            borderRadius: 24, padding: "36px 36px 32px",
                            marginBottom: 20,
                        }}>
                            <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 16px" }}>Your World Cup 2026 Team</p>
                            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
                                <span style={{ fontSize: 64, lineHeight: 1 }}>{resultTeam.flag}</span>
                                <div>
                                    <h2 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: "white", margin: "0 0 6px", letterSpacing: "-0.03em" }}>{resultTeam.name}</h2>
                                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", margin: 0, fontStyle: "italic" }}>{resultTeam.tagline}</p>
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
                                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 18px" }}>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px" }}>Play Style</p>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.6, fontWeight: 600 }}>{resultTeam.style}</p>
                                </div>
                                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 18px" }}>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px" }}>Watch Out For</p>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.6, fontWeight: 600 }}>{resultTeam.stars}</p>
                                </div>
                            </div>

                            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, margin: "0 0 20px" }}
                                dangerouslySetInnerHTML={{ __html: resultTeam.desc }}
                            />

                            <div style={{ background: `${resultTeam.color}15`, border: `1px solid ${resultTeam.color}30`, borderRadius: 12, padding: "14px 18px" }}>
                                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)", margin: 0 }}>
                                    <span style={{ color: ACCENT }}>Why you: </span>{resultTeam.whyYou}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
                            <button
                                onClick={restart}
                                style={{
                                    padding: "13px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer",
                                    background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT,
                                    transition: "all 0.15s",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,158,11,0.2)"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = ACCENT_DIM; }}
                            >
                                ↺ Take the Quiz Again
                            </button>
                            <Link href="/tools/world-cup-accumulator-calculator" style={{
                                padding: "13px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer",
                                background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e",
                                textDecoration: "none", display: "inline-flex", alignItems: "center",
                            }}>
                                ⚽ Build an Accumulator →
                            </Link>
                        </div>
                    </div>
                )}

                {/* How it works */}
                <div style={{ ...cardStyle, marginTop: 40 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: "white", margin: "0 0 8px" }}>How It Works</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>Five questions, one perfect team</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                        {[
                            { n: "1", title: "Answer 5 questions", desc: "Each question targets a different dimension of your football personality." },
                            { n: "2", title: "Your answers are scored", desc: "Each answer awards points to teams that match your style and preferences." },
                            { n: "3", title: "Your team is revealed", desc: "The nation with the highest score match is matched to you." },
                            { n: "4", title: "Get your full profile", desc: "See your team&apos;s play style, star players and why you&apos;re a perfect match." },
                        ].map(s => (
                            <div key={s.n} style={{ padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14 }}>
                                <div style={{ width: 32, height: 32, borderRadius: "50%", background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: ACCENT, marginBottom: 12 }}>{s.n}</div>
                                <h3 style={{ fontSize: 14, fontWeight: 800, color: "white", margin: "0 0 6px" }}>{s.title}</h3>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: s.desc }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Teams overview */}
                <div style={{ ...cardStyle }}>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: "white", margin: "0 0 8px" }}>24 Nations Covered</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 20px" }}>Every result includes a full team profile — play style, star players and why they suit you</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {Object.values(TEAMS).map(t => (
                            <span key={t.name} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 999, padding: "5px 12px" }}>
                                {t.flag} {t.name}
                            </span>
                        ))}
                    </div>
                </div>


                <FaqPageSchema faqs={FAQS} />

                {/* FAQ */}
                <div style={{ marginTop: 40, marginBottom: 40 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 24px" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            { q: "How does the World Cup 2026 team finder quiz work?", a: "Answer 5 questions about your football preferences — play style, how you want your team to defend a lead, which region appeals, which player archetype you love, and your attitude to being the favourite. Your answers are matched against profiles for 24 World Cup 2026 nations and the team with the most matching attributes is revealed." },
                            { q: "How many teams are in the 2026 World Cup?", a: "The 2026 FIFA World Cup features 48 teams for the first time — up from 32 at previous tournaments. The expanded format means 12 groups of 4, with 32 teams advancing to a knockout round of 32. The tournament is co-hosted by the United States, Canada and Mexico, running from June 11 to July 19, 2026." },
                            { q: "Which team is the favourite to win the 2026 World Cup?", a: "Spain, France and England are the leading favourites heading into 2026. Spain are the reigning European Champions with a brilliant young squad. France have the most complete squad top to bottom. England have a golden generation at their peak. Brazil and Argentina are never far behind as the perennial South American powers." },
                            { q: "Who should I support if my country did not qualify?", a: "This quiz will find you a perfect match based on your football personality. Popular neutral picks include Brazil for lovers of expressive football, Morocco for underdog fans who want a story, Japan for those who love tactical surprises, and Spain for pure football purists." },
                            { q: "What makes a good neutral World Cup team to follow?", a: "A great neutral team usually has an interesting story going into the tournament, an attractive or distinctive style of play, and at least one player who is appointment television. Teams like Morocco, Japan and Australia are popular neutral picks because their runs are dramatic. Spain and Brazil draw neutral support for the quality of football they play." },
                            { q: "What is the best World Cup 2026 team finder quiz?", a: "ToolStack's World Cup 2026 Team Finder is completely free, requires no signup, and matches you to one of 24 qualified nations through 5 targeted football personality questions. Each result includes a full team profile with play style, star players and a personalised description of why that team matches you." },
                        ].map(faq => (
                            <div key={faq.q} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 24px" }}>
                                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{faq.q}</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Authority bridge */}
                <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 16, padding: "24px 28px", marginBottom: 40 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(99,102,241,0.9)", margin: "0 0 8px" }}>⚽ More World Cup Tools</p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 14px", lineHeight: 1.6 }}>
                        Got your team? Now build your{" "}
                        <Link href="/tools/world-cup-accumulator-calculator" style={{ color: "#a5b4fc", textDecoration: "none", fontWeight: 700 }}>World Cup accumulator bet</Link>{" "}
                        or browse our full{" "}
                        <Link href="/tools" style={{ color: "#a5b4fc", textDecoration: "none", fontWeight: 700 }}>free tool collection</Link>.
                    </p>
                </div>

                <MoreTools currentSlug="world-cup-team-finder" />
            </div>
        </div>
    );
}
