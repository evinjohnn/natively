"use client";
import { useState, useRef, memo } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Brain, Mic2, Globe, FileText, Building2, Target, Layers, Scan, TrendingUp, UserCheck, Database, ArrowUpRight } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const PROMO = "INSIDER25";

const plans = [
  {
    id: "standard",
    name: "Standard",
    price: 8,
    ai: 500, stt: 200, search: 20,
    includesPro: false,
    url: "https://checkout.dodopayments.com/buy/pdt_0NbFixGmD8CSeawb5qvVl",
  },
  {
    id: "pro",
    name: "Pro",
    price: 15,
    ai: 1000, stt: 500, search: 100,
    includesPro: true,
    url: "https://checkout.dodopayments.com/buy/pdt_0NcM6Aw0IWdspbsgUeCLA",
  },
  {
    id: "max",
    name: "Max",
    price: 25,
    ai: 2000, stt: 1000, search: 200,
    includesPro: true,
    url: "https://checkout.dodopayments.com/buy/pdt_0NcM7JElX4Af6LNVFS1Yf",
  },
  {
    id: "ultra",
    name: "Ultra",
    price: 35,
    ai: 3000, stt: 2000, search: 300,
    includesPro: true,
    url: "https://checkout.dodopayments.com/buy/pdt_0NcM7rC2kAb69TFKsZnUU",
  },
] as const;

type Plan = typeof plans[number];

const proFeatures = [
  { icon: Layers,    label: "Modes Manager",               desc: "7 expert personas that hard-override the LLM — Technical Interview, Sales, Recruiting, Lecture & more." },
  { icon: UserCheck, label: "Resume Intelligence",         desc: "AI ingests your full resume so every answer is grounded in your lived experience, not generic MDN docs." },
  { icon: Database,  label: "Custom Context Intelligence", desc: "Provide any custom files or documentation to ground the AI completely in your specific domain knowledge." },
  { icon: TrendingUp,label: "Negotiation Assistance",      desc: "Live salary coaching with real-time counters and anchor strategies based on current market bands." },
  { icon: Scan,      label: "System Design",               desc: "Chain screenshots for architecture questions. OCR extracts diagrams and renders answers in the invisible overlay.", comingSoon: true },
  { icon: Target,    label: "Mock Interviews",             desc: "Strict hiring-manager persona with STAR coaching and live gap analysis against your identity graph.", comingSoon: true },
  { icon: FileText,  label: "JD Intelligence",             desc: "Paste any job description. AI gap-analyzes your profile against the role and surfaces exactly what to highlight." },
  { icon: Building2, label: "Company Research",            desc: "Real-time intel on culture, market positioning, and salary bands before you walk in." },
];

/* ─────────────────────────────────────────────────────────────
   SpotlightCard — cursor-aware radial glow on card border.
   Uses useMotionValue so mouse tracking NEVER triggers re-render.
   Isolated with memo to prevent parent re-render cascade.
───────────────────────────────────────────────────────────── */
const SpotlightCard = memo(function SpotlightCard({
  children,
  className = "",
  style,
  onClick,
  isDark = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isDark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Dark cards: soft white glow. Light cards: soft dark shadow.
  const glow = useMotionTemplate`radial-gradient(
    240px circle at ${mouseX}px ${mouseY}px,
    ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)"},
    transparent 80%
  )`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`relative group overflow-hidden cursor-pointer ${className}`}
      style={style}
    >
      {/* Spotlight overlay — GPU-composited opacity transition only */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: glow,
          borderRadius: "inherit",
          transition: "opacity 350ms cubic-bezier(0.23,1,0.32,1)",
        }}
      />
      {children}
    </motion.div>
  );
});

/* ─────────────────────────────────────────────────────────────
   AmbientGlow — isolated perpetual motion for BYOK dark bg.
   Memo-isolated so it NEVER causes parent re-renders.
   GPU-only: only animates transform (scale/rotate), never layout.
───────────────────────────────────────────────────────────── */
const AmbientGlow = memo(function AmbientGlow() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(250,204,21,0.045) 0%, transparent 65%)",
          top: "-25%", right: "-12%",
          willChange: "transform",
        }}
        animate={{ scale: [1, 1.12, 1], rotate: [0, 6, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 65%)",
          bottom: "0%", left: "0%",
          willChange: "transform",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />
    </div>
  );
});

/* ─── Stagger orchestration variants ─────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1] } },
};
const fadeUpFast = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] } },
};

/* ─────────────────────────────────────────────────────────────
   PricingSection
───────────────────────────────────────────────────────────── */
export default function PricingSection() {
  const [selected, setSelected] = useState<Plan>(plans[1]);

  return (
    <section className="bg-white" id="pricing">

      {/* ── 1. Heading ──────────────────────────────────────── */}
      <div className="max-content pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h2
              className="hero-headline !text-black leading-[1.0] mb-5"
              style={{ fontSize: "clamp(40px, 8vw, 96px)", letterSpacing: "-0.038em" }}
            >
              Simple pricing.
            </h2>
            <p className="text-[18px] text-[#6B7280] font-geist leading-relaxed" style={{ maxWidth: "46ch" }}>
              Start free with your own keys, or let us run the infrastructure.
            </p>
          </div>

          {/* Promo badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="shrink-0 flex items-center gap-4 px-6 py-4 rounded-2xl self-start md:self-end"
            style={{ background: "#FEFCE8", border: "1px solid #FEF08A" }}
          >
            <div>
              <p className="text-[10px] font-semibold text-[#92400E] uppercase tracking-widest mb-0.5">Promo code</p>
              <p className="text-[20px] font-bold font-mono text-[#78350F] tracking-widest">{PROMO}</p>
            </div>
            <div className="text-right">
              <p className="text-[28px] font-bold text-[#CA8A04] leading-none">25%</p>
              <p className="text-[11px] text-[#92400E] font-medium mt-0.5">off any plan</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 2. API Plans ────────────────────────────────────── */}
      <div className="max-content pb-16 md:pb-24">
        <div className="rounded-[40px] p-6 md:p-8" style={{ background: "#f5f5f7" }}>

          <div className="mb-7">
            <p className="text-[12px] font-semibold text-[#9CA3AF] uppercase tracking-widest mb-1.5">
              Managed API Plans
            </p>
            <p className="text-[15px] text-[#4B5563] font-geist">
              AI generation, speech-to-text, and web search — fully hosted. No setup.
            </p>
          </div>

          {/* Stagger grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {plans.map((plan) => {
              const isSelected = selected.id === plan.id;
              return (
                <motion.div key={plan.id} variants={fadeUp} className="relative">
                  {/* "Most Popular" floating badge */}
                  {plan.id === "pro" && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full
                      text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300
                      ${isSelected ? "bg-emerald-400 text-black" : "bg-[#111827] text-white"}`}>
                      Most Popular
                    </div>
                  )}

                  <SpotlightCard
                    isDark={isSelected}
                    onClick={() => setSelected(plan)}
                    className="flex flex-col text-left p-6 rounded-[28px] h-full transition-all duration-300"
                    style={{
                      background: isSelected ? "#111827" : "#ffffff",
                      boxShadow: isSelected
                        ? "0 24px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)"
                        : "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Name + Pro badge */}
                    <div className="flex items-center gap-2 mb-5">
                      <span className={`text-[14px] font-semibold tracking-tight transition-colors duration-300
                        ${isSelected ? "text-white/65" : "text-[#6B7280]"}`}>
                        {plan.name}
                      </span>
                      {plan.includesPro && (
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border transition-colors duration-300
                          ${isSelected
                            ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-400"
                            : "bg-emerald-50 border-emerald-100 text-emerald-700"}`}>
                          + Pro
                        </span>
                      )}
                    </div>

                    {/* Price — tight tracked number */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`font-semibold leading-none tabular-nums transition-colors duration-300
                            ${isSelected ? "text-white" : "text-[#111827]"}`}
                          style={{ fontSize: "clamp(38px, 5vw, 50px)", letterSpacing: "-0.04em" }}
                        >
                          ${plan.price}
                        </span>
                        <span className={`text-[13px] ml-0.5 transition-colors duration-300
                          ${isSelected ? "text-white/30" : "text-[#9CA3AF]"}`}>/mo</span>
                      </div>
                    </div>

                    {/* Quotas */}
                    <div className="space-y-2.5 mb-7 flex-1">
                      {([
                        { Icon: Brain, label: `${plan.ai.toLocaleString()} AI requests` },
                        { Icon: Mic2,  label: `${plan.stt} min speech-to-text` },
                        { Icon: Globe, label: `${plan.search} web searches` },
                      ] as const).map(({ Icon, label }) => (
                        <div key={label} className="flex items-center gap-2.5">
                          <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 transition-colors duration-300
                            ${isSelected ? "bg-white/10" : "bg-[#F3F4F6]"}`}>
                            <Icon size={9} className={`transition-colors duration-300 ${isSelected ? "text-white/50" : "text-[#9CA3AF]"}`} />
                          </div>
                          <span className={`text-[12px] font-geist transition-colors duration-300 ${isSelected ? "text-white/50" : "text-[#6B7280]"}`}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA — inverts with selected state */}
                    <motion.a
                      href={plan.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileTap={{ scale: 0.97, transition: { duration: 0.1, ease: EASE_OUT } }}
                      className={`w-full py-3 min-h-[48px] md:min-h-0 rounded-[14px] text-[13px] font-semibold text-center flex justify-center items-center
                        transition-colors duration-200
                        ${isSelected
                          ? "bg-white text-[#111827] hover:bg-white/90"
                          : "bg-[#F0F0F2] text-[#111827] hover:bg-[#E5E5EA]"
                        }`}
                    >
                      Get {plan.name}
                    </motion.a>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Free trial strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5, ease: EASE_OUT }}
            className="mt-5 inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-2.5 rounded-[14px]"
            style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.85)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[12px] text-[#6B7280] font-geist">
              Free trial · 10 AI req · 10 min STT · 2 searches · No card required
            </span>
            <span className="hidden md:inline text-[11px] font-mono font-semibold text-[#92400E]">{PROMO}</span>
            <span className="hidden md:inline text-[11px] text-[#9CA3AF]">for 25% off</span>
          </motion.div>
        </div>
      </div>

      {/* ── 3. Pro — editorial dark section ─────────────────── */}
      <div className="relative overflow-hidden" style={{ background: "#171717" }}>
        <AmbientGlow />

        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.045]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Amber horizon line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)" }}
        />

        <div className="max-content py-16 lg:py-24 relative">

          {/* ── Hero heading ── */}
          <motion.div
            className="mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
          >
            <p className="text-[10px] font-bold text-amber-400/50 uppercase tracking-[0.3em] mb-4 font-geist">
              Natively Pro
            </p>
            <h2
              className="text-white mb-6"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(42px, 6vw, 84px)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                fontWeight: 400,
              }}
            >
              Built to get<br />
              <em style={{ color: "#f59e0b", fontStyle: "italic" }}>the offer.</em>
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <p className="text-[15px] text-white/35 font-geist leading-relaxed" style={{ maxWidth: "46ch" }}>
                Connect your own API keys. One payment unlocks all 7 modes — no subscription, no metering.
              </p>
              <a
                href="https://natively.software/pro"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center min-h-[48px] md:min-h-0 gap-1.5 text-[11px] font-bold uppercase tracking-wider
                  text-[#fbbf24] px-5 py-2 md:px-4 rounded-full transition-all duration-300 group
                  hover:bg-[#fbbf24]/20 hover:border-[#fbbf24]/40"
                style={{
                  background: "rgba(245,158,11,0.08)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)"
                }}
              >
                See Pro in action
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>
          </motion.div>

          {/* ── Body ── */}
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-10 items-stretch lg:items-center">

            {/* Left — feature tile grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              {proFeatures.map((f) => (
                <motion.div key={f.label} variants={fadeUpFast} className="h-full">
                  <SpotlightCard
                    isDark={true}
                    className="flex items-start gap-3.5 p-4 rounded-[20px] h-full"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      backdropFilter: "blur(12px)"
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.02) 100%)",
                        border: "1px solid rgba(245,158,11,0.15)",
                        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
                      }}
                    >
                      <f.icon size={15} style={{ color: "#fbbf24", opacity: 0.9 }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-[14px] font-semibold text-white/90 font-geist tracking-tight">{f.label}</p>
                        {('comingSoon' in f && f.comingSoon) && (
                          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full border bg-amber-400/10 border-amber-400/20 text-amber-400/80 uppercase tracking-wider">
                            Soon
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-white/40 font-geist leading-snug line-clamp-2" title={f.desc}>{f.desc}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Right — license cards */}
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
            >

              {/* $NAT Token Holder Access */}
              <motion.a
                href="https://app.printr.money/trade/0xba1e50273ec14ca52b3fa64a5054c39470c2835392c6ecd06876f5bccd597d7b"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                className="block"
              >
                <SpotlightCard
                  isDark={true}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-3 p-5 sm:p-4 rounded-[20px] cursor-pointer transition-all duration-300 hover:bg-white/[0.04] overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(6,182,212,0.04) 100%)",
                    border: "1px solid rgba(139,92,246,0.25)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Top shimmer line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(6,182,212,0.4), transparent)" }}
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p
                        className="transition-colors"
                        style={{ fontFamily: "'Instrument Serif', serif", fontSize: "20px", fontWeight: 400, color: "#ffffff" }}
                      >
                        $NAT Token Holder
                      </p>
                      <span
                        className="text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                        style={{
                          background: "linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(6,182,212,0.15) 100%)",
                          border: "1px solid rgba(139,92,246,0.3)",
                          color: "#a78bfa",
                        }}
                      >
                        Crypto
                      </span>
                    </div>
                    <p className="text-[12px] font-geist" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Hold the required $NAT threshold · Pro unlocks automatically.
                    </p>
                  </div>
                  <div
                    className="shrink-0 px-4 sm:px-3.5 py-2.5 sm:py-2 rounded-[12px] sm:rounded-[10px] text-[13px] sm:text-[12px] font-semibold whitespace-nowrap transition-all duration-300 text-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(6,182,212,0.1) 100%)",
                      border: "1px solid rgba(139,92,246,0.25)",
                      color: "#a78bfa",
                    }}
                  >
                    Buy $NAT →
                  </div>
                </SpotlightCard>
              </motion.a>

              {/* Yearly */}
              <motion.a
                href="https://checkout.dodopayments.com/buy/pdt_0NcM4QBwy0CDcPV9CXaNP"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                className="block"
              >
                <SpotlightCard
                  isDark={true}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-3 p-5 sm:p-4 rounded-[20px] cursor-pointer transition-all duration-300 hover:bg-white/[0.04]"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                >
                  <div>
                    <p
                      className="text-white mb-0.5 tracking-tight group-hover:text-amber-100 transition-colors"
                      style={{ fontFamily: "'Instrument Serif', serif", fontSize: "20px", fontWeight: 400 }}
                    >
                      Yearly License
                    </p>
                    <p className="text-[12px] text-white/40 font-geist">All Pro features. Renews annually.</p>
                  </div>
                  <div
                    className="shrink-0 px-4 sm:px-3.5 py-2.5 sm:py-2 rounded-[12px] sm:rounded-[10px] text-[13px] sm:text-[12px] font-semibold text-white/60
                      whitespace-nowrap transition-all duration-300 text-center
                      group-hover:text-white group-hover:bg-white/[0.12] group-hover:border-white/[0.15]"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    Get Yearly →
                  </div>
                </SpotlightCard>
              </motion.a>

              {/* Lifetime — hero (Peak-End Rule) */}
              <motion.a
                href="https://checkout.dodopayments.com/buy/pdt_0NbHo6EnXlNPqNcZ14OTi"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                className="block"
              >
                <SpotlightCard
                  isDark={true}
                  className="group relative flex flex-col gap-5 p-6 rounded-[24px] cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                  style={{
                    background: "linear-gradient(165deg, rgba(245,158,11,0.08) 0%, rgba(10,10,10,0.5) 100%)",
                    border: "1px solid rgba(245,158,11,0.25)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 25px 50px -12px rgba(245,158,11,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Top specular line */}
                  <div className="absolute top-0 left-0 right-0 h-px pointer-events-none opacity-60"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.8), transparent)" }} />

                  {/* Corner glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-amber-500/20 blur-3xl pointer-events-none group-hover:bg-amber-500/30 transition-colors duration-500" />

                  <div className="flex items-start justify-between gap-3 relative z-10 w-full">
                    <div className="pr-2">
                      <p
                        className="mb-1"
                        style={{ fontFamily: "'Instrument Serif', serif", fontSize: "28px", fontWeight: 400, color: "#fbbf24", fontStyle: "italic", lineHeight: 1 }}
                      >
                        Lifetime License
                      </p>
                      <p className="text-[11px] sm:text-[12px] text-white/40 font-geist leading-snug">One payment. All future updates included.</p>
                    </div>
                    <span
                      className="shrink-0 text-[8px] sm:text-[9px] font-bold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full uppercase tracking-[0.1em] mt-1
                        group-hover:bg-amber-500/20 group-hover:border-amber-400/40 transition-all duration-300"
                      style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", color: "#fbbf24" }}
                    >
                      Best value
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2.5 relative z-10">
                    {["Resume & JD context awareness", "Live negotiation coaching", "7 expert interview modes", "All future updates"].map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-[12px] text-white/70 font-geist font-medium">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                          style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}
                        >
                          <svg width="7" height="7" viewBox="0 0 10 10" fill="none">
                            <path d="M2.5 5l2 2 3-3" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="w-full py-3.5 rounded-[14px] text-[14px] font-bold text-[#0a0a0a] text-center relative z-10
                      transition-all duration-300 group-hover:brightness-110 group-hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)",
                      boxShadow: "0 8px 32px rgba(245,158,11,0.4), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)",
                    }}
                  >
                    Get Lifetime →
                  </div>

                  <p className="text-center text-[10px] text-white/30 font-geist -mt-1.5 relative z-10">
                    One-time purchase · No subscription · yours forever
                  </p>
                </SpotlightCard>
              </motion.a>

            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
