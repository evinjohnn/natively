"use client";
import { useState, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import { motion, useMotionValue, useMotionTemplate } from "@/lib/motion";
import { Brain, Mic2, Globe, FileText, Building2, Target, Layers, Scan, TrendingUp, UserCheck, Database, ArrowUpRight } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const PROMO = "INSIDER20";

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
  { icon: Layers,    key: "modes",        comingSoon: false },
  { icon: UserCheck, key: "resume",       comingSoon: false },
  { icon: Database,  key: "context",      comingSoon: false },
  { icon: TrendingUp,key: "negotiation",  comingSoon: false },
  { icon: Scan,      key: "system",       comingSoon: true },
  { icon: Target,    key: "mock",         comingSoon: true },
  { icon: FileText,  key: "jd",           comingSoon: false },
  { icon: Building2, key: "company",      comingSoon: false },
] as const;

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
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 animate-duration-300"
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
          background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 65%)",
          top: "-25%", right: "-12%",
          willChange: "transform",
        }}
        animate={{ scale: [1, 1.12, 1], rotate: [0, 6, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 65%)",
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
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Plan>(plans[1]);

  return (
    <section className="bg-white" id="pricing">

      {/* ── 1. Heading ──────────────────────────────────────── */}
      <div className="max-content pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h2
              className="hero-headline !text-black leading-[1.0] mb-5 tracking-tight"
              style={{ fontSize: "clamp(40px, 8vw, 96px)", letterSpacing: "-0.038em" }}
            >
              {t('pricing.title')}
            </h2>
            <p className="text-[18px] text-[#6B7280] font-geist leading-relaxed" style={{ maxWidth: "46ch" }}>
              {t('pricing.subtitle')}
            </p>
          </div>

          {/* Promo badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="shrink-0 flex items-center gap-5 px-6 py-4 rounded-2xl self-start md:self-end backdrop-blur-md transition-all duration-300"
            style={{ 
              background: "linear-gradient(135deg, rgba(254,240,138,0.25) 0%, rgba(254,240,138,0.08) 100%)", 
              border: "1px solid rgba(250,204,21,0.35)",
              boxShadow: "0 8px 30px rgba(250,204,21,0.06), inset 0 1px 0 rgba(255,255,255,0.7)"
            }}
          >
            <div>
              <p className="text-[10px] font-bold text-[#92400E] uppercase tracking-widest mb-0.5">{t('pricing.promo_code')}</p>
              <p className="text-[20px] font-bold font-mono text-[#78350F] tracking-widest">{PROMO}</p>
            </div>
            <div className="text-right">
              <p className="text-[28px] font-bold text-[#CA8A04] leading-none">20%</p>
              <p className="text-[11px] text-[#92400E] font-semibold mt-0.5">{t('pricing.promo_discount')}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 2. API Plans ────────────────────────────────────── */}
      <div className="max-content pb-16 md:pb-24">
        <div 
          className="rounded-[40px] p-6 md:p-8 border border-black/5" 
          style={{ 
            background: "linear-gradient(180deg, #F9F9FB 0%, #F4F4F7 100%)",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.8)"
          }}
        >

          <div className="mb-7">
            <p className="text-[12px] font-semibold text-[#9CA3AF] uppercase tracking-widest mb-1.5">
              {t('pricing.plans_title')}
            </p>
            <p className="text-[15px] text-[#4B5563] font-geist">
              {t('pricing.plans_subtitle')}
            </p>
          </div>

          {/* Stagger grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {plans.map((plan) => {
              const isSelected = selected.id === plan.id;
              
              const planThemeColor = plan.id === "standard"
                ? "#3b82f6"
                : plan.id === "pro"
                ? "#10b981"
                : plan.id === "max"
                ? "#8b5cf6"
                : "#f59e0b";

              return (
                <motion.div key={plan.id} variants={fadeUp} className="relative">
                  {/* "Most Popular" floating badge */}
                  {plan.id === "pro" && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full
                      text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300
                      ${isSelected ? "bg-emerald-400 text-black shadow-[0_4px_12px_rgba(16,185,129,0.3)]" : "bg-[#111827] text-white"}`}>
                      {t('pricing.popular_badge')}
                    </div>
                  )}

                  <SpotlightCard
                    isDark={isSelected}
                    onClick={() => setSelected(plan)}
                    className="flex flex-col text-left p-6 rounded-[28px] h-full transition-all duration-300 relative border border-transparent"
                    style={{
                      background: isSelected ? "#0F121D" : "rgba(255,255,255,0.75)",
                      backdropFilter: isSelected ? undefined : "blur(12px)",
                      border: isSelected ? `1px solid ${planThemeColor}35` : "1px solid rgba(0,0,0,0.04)",
                      boxShadow: isSelected
                        ? `0 20px 45px ${planThemeColor}12, inset 0 1px 0 rgba(255,255,255,0.06)`
                        : "0 4px 14px rgba(0,0,0,0.02)",
                    }}
                  >
                    {/* Glowing bleeding-down background for selected cards */}
                    {isSelected && (
                      <div
                        className="absolute top-0 left-0 right-0 h-40 pointer-events-none opacity-45 rounded-t-[28px]"
                        style={{
                          background: `radial-gradient(130px circle at 50% 0%, ${planThemeColor}50, transparent)`
                        }}
                      />
                    )}

                    {/* Name + Pro badge */}
                    <div className="flex items-center gap-2 mb-5 relative z-10">
                      <span className={`text-[14px] font-semibold tracking-tight transition-colors duration-300
                        ${isSelected ? "text-white/65" : "text-[#6B7280]"}`}>
                        {plan.name}
                      </span>
                      {plan.includesPro && (
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border transition-colors duration-300
                          ${isSelected
                            ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-400"
                            : "bg-emerald-50 border-emerald-100 text-emerald-700"}`}>
                          {t('pricing.pro_badge')}
                        </span>
                      )}
                    </div>

                    {/* Price — tight tracked number */}
                    <div className="mb-6 relative z-10">
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`font-semibold leading-none tabular-nums transition-colors duration-300
                            ${isSelected ? "text-white" : "text-[#111827]"}`}
                          style={{ fontSize: "clamp(38px, 5vw, 50px)", letterSpacing: "-0.04em" }}
                        >
                          ${plan.price}
                        </span>
                        <span className={`text-[13px] ml-0.5 transition-colors duration-300
                          ${isSelected ? "text-white/30" : "text-[#9CA3AF]"}`}>{t('pricing.per_month')}</span>
                      </div>
                    </div>

                    {/* Quotas */}
                    <div className="space-y-2.5 mb-7 flex-1 relative z-10">
                      {([
                        { Icon: Brain, label: t('pricing.ai_requests', { count: plan.ai.toLocaleString() }) },
                        { Icon: Mic2,  label: t('pricing.stt_minutes', { count: plan.stt }) },
                        { Icon: Globe, label: t('pricing.web_searches', { count: plan.search }) },
                      ] as const).map(({ Icon, label }) => (
                        <div key={label} className="flex items-center gap-2.5">
                          <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 transition-colors duration-300
                            ${isSelected ? "bg-white/5" : "bg-[#F3F4F6]"}`}>
                            <Icon size={9} className="transition-colors duration-300" style={{ color: isSelected ? planThemeColor : "#9CA3AF" }} />
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
                      className={`w-full py-3 min-h-[48px] md:min-h-0 rounded-[14px] text-[13px] font-bold text-center flex justify-center items-center
                        transition-all duration-300 relative z-10
                        ${isSelected
                          ? "text-black hover:brightness-110 shadow-lg"
                          : "bg-[#F0F0F2] text-[#111827] hover:bg-[#E5E5EA]"
                        }`}
                      style={{
                        background: isSelected
                          ? `linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%)`
                          : undefined,
                        boxShadow: isSelected
                          ? `0 6px 18px ${planThemeColor}20`
                          : undefined
                      }}
                    >
                      {t('pricing.get_plan', { name: plan.name })}
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
            className="mt-5 inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-2.5 rounded-[14px] border border-black/[0.03]"
            style={{ background: "rgba(255,255,255,0.75)", boxShadow: "0 2px 6px rgba(0,0,0,0.01)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[12px] text-[#6B7280] font-geist">
              {t('pricing.free_trial')}
            </span>
            <span className="hidden md:inline text-[11px] font-mono font-semibold text-[#92400E]">{PROMO}</span>
            <span className="hidden md:inline text-[11px] text-[#9CA3AF]">{t('pricing.insider_discount')}</span>
          </motion.div>
        </div>
      </div>

      {/* ── 3. Pro — editorial premium light section ─────────────────── */}
      <div className="relative overflow-hidden border-t border-slate-100" style={{ background: "#F8FAFC" }}>
        <AmbientGlow />

        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Indigo horizon line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[1px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.15), transparent)" }}
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
            {/* Jelly Clay badge instead of outdated label */}
            <div className="mb-5">
              <span className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full text-[10px] font-bold text-white shadow-[0_4px_12px_rgba(99,102,241,0.2),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden">
                <div className="absolute top-0.5 left-1 right-1 h-[45%] rounded-full bg-gradient-to-b from-white/50 to-white/5 blur-[0.3px] pointer-events-none" />
                <span className="relative z-10 drop-shadow-sm uppercase tracking-[0.15em]">{t('pricing.pro_label')}</span>
              </span>
            </div>
            
            <h2
              className="text-slate-900 mb-6"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(42px, 6vw, 84px)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                fontWeight: 400,
              }}
            >
              {t('pricing.pro_title_main')}<br />
              <span className="italic font-serif bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                {t('pricing.pro_title_accent')}
              </span>
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-6">
              <p className="text-[15px] text-slate-500 font-geist leading-relaxed" style={{ maxWidth: "46ch" }}>
                {t('pricing.pro_subtitle')}
              </p>
              <a
                href="/pro"
                className="shrink-0 inline-flex items-center justify-center min-h-[48px] md:min-h-0 gap-1.5 text-[11px] font-bold uppercase tracking-wider
                  text-indigo-600 px-5 py-2.5 md:px-4 rounded-full transition-all duration-300 group
                  hover:bg-indigo-50 border border-indigo-200/60 bg-white shadow-sm"
              >
                {t('pricing.pro_cta')}
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
              {proFeatures.map((f) => {
                const title = t(`pricing.features.${f.key}.title`);
                const desc = t(`pricing.features.${f.key}.desc`);
                return (
                  <motion.div key={f.key} variants={fadeUpFast} className="h-full">
                    <SpotlightCard
                      isDark={false}
                      className="flex items-start gap-3.5 p-4 rounded-[20px] h-full transition-all duration-300 border border-slate-200/40 hover:border-indigo-500/20 hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)]"
                      style={{
                        background: "#F2F4F8",
                        boxShadow: [
                          "inset 0 1px 0 rgba(255,255,255,1)",
                          "inset 0 -1.5px 0 rgba(0,0,0,0.03)",
                          "inset 1px 0 0 rgba(255,255,255,0.8)",
                          "0 1px 2px rgba(0,0,0,0.02)"
                        ].join(", ")
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.02) 100%)",
                          border: "1px solid rgba(99,102,241,0.18)",
                          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.8)",
                        }}
                      >
                        <f.icon size={15} style={{ color: "#6366f1", opacity: 0.9 }} className="transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-[14px] font-semibold text-slate-900 font-geist tracking-tight">{title}</p>
                          {f.comingSoon && (
                            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full border bg-indigo-500/10 border-indigo-500/20 text-indigo-600 uppercase tracking-wider">
                              Soon
                            </span>
                          )}
                        </div>
                        <p className="text-[12px] text-slate-500 font-geist leading-snug line-clamp-2" title={desc}>{desc}</p>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Right — license cards */}
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
            >


              {/* Yearly */}
              <motion.a
                href="https://checkout.dodopayments.com/buy/pdt_0NcM4QBwy0CDcPV9CXaNP"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                className="block"
              >
                <SpotlightCard
                  isDark={false}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-3 p-5 sm:p-4 rounded-[20px] cursor-pointer transition-all duration-300 border border-slate-200/50 hover:border-indigo-500/30 hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)]"
                  style={{
                    background: "#F2F4F8",
                    boxShadow: [
                      "inset 0 1px 0 rgba(255,255,255,1)",
                      "inset 0 -1.5px 0 rgba(0,0,0,0.03)",
                      "inset 1px 0 0 rgba(255,255,255,0.8)",
                      "0 1px 2px rgba(0,0,0,0.02)"
                    ].join(", ")
                  }}
                >
                  <div>
                    <p
                      className="text-slate-900 mb-0.5 tracking-tight group-hover:text-indigo-600 transition-colors"
                      style={{ fontFamily: "'Instrument Serif', serif", fontSize: "20px", fontWeight: 400 }}
                    >
                      {t('pricing.yearly_title')}
                    </p>
                    <p className="text-[12px] text-slate-500 font-geist">{t('pricing.yearly_desc')}</p>
                  </div>
                  <div
                    className="shrink-0 px-4 sm:px-3.5 py-2.5 sm:py-2 rounded-[12px] sm:rounded-[10px] text-[13px] sm:text-[12px] font-semibold text-slate-600
                      whitespace-nowrap transition-all duration-300 text-center
                      group-hover:text-indigo-600 group-hover:bg-indigo-50 group-hover:border-indigo-200/40"
                    style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    {t('pricing.yearly_cta')}
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
                  isDark={false}
                  className="group relative flex flex-col gap-5 p-6 rounded-[24px] cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(99,102,241,0.15)]"
                  style={{
                    background: "linear-gradient(165deg, rgba(99,102,241,0.06) 0%, rgba(255,255,255,0.9) 100%)",
                    border: "1px solid rgba(99,102,241,0.22)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 20px 45px -12px rgba(99,102,241,0.06), inset 0 1.5px 0 rgba(255,255,255,1)",
                  }}
                >
                  {/* Top specular line */}
                  <div className="absolute top-0 left-0 right-0 h-px pointer-events-none opacity-60"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />

                  {/* Corner glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-500" />

                  <div className="flex items-start justify-between gap-3 relative z-10 w-full">
                    <div className="pr-2">
                      <p
                        className="mb-1"
                        style={{ fontFamily: "'Instrument Serif', serif", fontSize: "28px", fontWeight: 400, color: "#4f46e5", fontStyle: "italic", lineHeight: 1 }}
                      >
                        {t('pricing.lifetime_title')}
                      </p>
                      <p className="text-[11px] sm:text-[12px] text-slate-500 font-geist leading-snug">{t('pricing.lifetime_desc')}</p>
                    </div>
                    <span
                      className="shrink-0 text-[8px] sm:text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-[0.1em] mt-1
                        bg-indigo-50 border border-indigo-100 text-indigo-600
                        group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-all duration-300"
                    >
                      {t('pricing.lifetime_badge')}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2.5 relative z-10">
                    {[
                      t('pricing.lifetime_feat1'),
                      t('pricing.lifetime_feat2'),
                      t('pricing.lifetime_feat3'),
                      t('pricing.lifetime_feat4')
                    ].map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-[12px] text-slate-700 font-geist font-medium">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 shadow-[0_2px_6px_rgba(99,102,241,0.1)]"
                          style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}
                        >
                          <svg width="7" height="7" viewBox="0 0 10 10" fill="none">
                            <path d="M2.5 5l2 2 3-3" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="w-full py-3.5 rounded-[14px] text-[14px] font-bold text-white text-center relative z-10 overflow-hidden
                      transition-all duration-300 group-hover:brightness-110 group-hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)",
                      boxShadow: "0 8px 24px rgba(99,102,241,0.3), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)",
                    }}
                  >
                    {/* Gloss specular shine inside jelly button */}
                    <span className="absolute top-0.5 left-2 right-2 h-1/2 rounded-full bg-gradient-to-b from-white/60 to-white/5 blur-[0.5px] pointer-events-none" />
                    
                    <span className="relative z-10 drop-shadow-sm">{t('pricing.lifetime_cta')}</span>
                  </div>

                  <p className="text-center text-[10px] text-slate-400 font-geist -mt-1.5 relative z-10">
                    {t('pricing.lifetime_footer')}
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
