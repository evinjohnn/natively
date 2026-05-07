import { memo, useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Coins, Crown, Zap, Shield, Users, ArrowUpRight, Copy, Check, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const mockChartData = [
  { time: '10:00', price: 0.0240 },
  { time: '10:15', price: 0.0245 },
  { time: '10:30', price: 0.0252 },
  { time: '10:45', price: 0.0248 },
  { time: '11:00', price: 0.0260 },
  { time: '11:15', price: 0.0275 },
  { time: '11:30', price: 0.0282 },
  { time: '11:45', price: 0.0310 },
  { time: '12:00', price: 0.0345 },
  { time: '12:15', price: 0.0380 },
  { time: '12:30', price: 0.0370 },
  { time: '12:45', price: 0.0395 },
  { time: '13:00', price: 0.0410 },
  { time: '13:15', price: 0.0428 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-xl shadow-lg border border-black/5" style={{ fontFamily: "Geist, sans-serif" }}>
        <p className="text-[12px] font-medium text-black/40 mb-0.5">{payload[0].payload.time}</p>
        <p className="text-[14px] font-semibold text-[#111111]">${payload[0].value.toFixed(4)}</p>
      </div>
    );
  }
  return null;
};

const PRINTR_URL =
  "https://app.printr.money/trade/0xba1e50273ec14ca52b3fa64a5054c39470c2835392c6ecd06876f5bccd597d7b";

const CONTRACT =
  "0xba1e50273ec14ca52b3fa64a5054c39470c2835392c6ecd06876f5bccd597d7b";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const FLUID_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1]; // High-end agency curve

/* ── Ambient background glows ───────────────────────────────── */
const TokenGlow = memo(function TokenGlow() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%)",
          top: "-20%", left: "-10%", willChange: "transform",
        }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 60%)",
          bottom: "-10%", right: "-5%", willChange: "transform",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />
    </div>
  );
});

/* ── The "Double-Bezel" Architecture Card ────────────────────── */
const DoubleBezelCard = memo(function DoubleBezelCard({
  children,
  className = "",
  innerClassName = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(139,92,246,0.08), transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      className={`relative group rounded-[2rem] p-1.5 sm:p-2 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${className} ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}`}
      style={{
        background: "rgba(0,0,0,0.02)",
        border: "1px solid rgba(0,0,0,0.04)",
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: glow, borderRadius: "inherit" }}
      />
      <div
        className={`relative z-10 rounded-[calc(2rem-0.5rem)] h-full overflow-hidden transition-all duration-700 ${innerClassName}`}
        style={{
          background: "linear-gradient(165deg, #FFFFFF 0%, #FAFAFA 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,1), 0 20px 40px -20px rgba(0,0,0,0.06)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
});

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: FLUID_EASE } },
};

const benefits = [
  { icon: Crown, title: "Pro Access", desc: "Hold the threshold, unlock all modes automatically.", color: "#d97706" },
  { icon: Zap, title: "Instant Verify", desc: "Your balance is checked live. Zero waiting time.", color: "#7c3aed" },
  { icon: Shield, title: "Non-Custodial", desc: "Your tokens stay securely in your own wallet.", color: "#0891b2" },
  { icon: Users, title: "Governance", desc: "Holders shape the future of Natively.", color: "#059669" },
];

export default function TokenSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40"
      id="nat-token"
      style={{ background: "#FDFBF7" }}
    >
      <TokenGlow />

      {/* Noise Overlay applied safely */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-[1] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-content relative z-10">
        
        {/* ── The Editorial Split ────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch mb-16">
          
          {/* Left: Typography & CTAs */}
          <motion.div 
            className="w-full lg:w-[45%] flex flex-col justify-center py-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {/* Eyebrow Tags */}
            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium"
                style={{
                  background: "rgba(139,92,246,0.08)",
                  border: "1px solid rgba(139,92,246,0.15)",
                  color: "#6d28d9"
                }}
              >
                <Coins size={12} strokeWidth={1.5} className="text-violet-600" />
                Token Live
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium"
                style={{
                  background: "rgba(245,158,11,0.08)",
                  border: "1px solid rgba(245,158,11,0.15)",
                  color: "#d97706"
                }}
              >
                Pro Integration: Coming Soon
              </span>
            </motion.div>

            {/* Massive Heading */}
            <motion.h2 
              variants={fadeUp}
              className="text-[#111111] mb-6"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(48px, 8vw, 96px)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                fontWeight: 400,
              }}
            >
              The power of <br />
              <em className="italic block mt-3" style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                $NAT
              </em>
            </motion.h2>

            <motion.p 
              variants={fadeUp}
              className="text-[16px] leading-relaxed mb-10"
              style={{ color: "rgba(0,0,0,0.6)", fontFamily: "Geist, sans-serif", maxWidth: "42ch" }}
            >
              Natively's native utility token. Once fully integrated, holding the required balance will instantly unlock <strong className="text-black font-semibold">Natively Pro</strong>. No subscriptions, no credit cards.
            </motion.p>

            {/* Contract Address Pill */}
            <motion.div variants={fadeUp} className="mb-10">
              <div 
                onClick={handleCopy}
                className="group flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-black/[0.02]"
                style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-black/5">
                    <TrendingUp size={14} strokeWidth={1.25} className="text-black/40" />
                  </div>
                  <div className="truncate">
                    <p className="text-[10px] uppercase tracking-widest text-black/40 mb-0.5">Contract Address</p>
                    <p className="text-[13px] font-mono text-black/80 truncate">
                      {CONTRACT.slice(0, 16)}...{CONTRACT.slice(-12)}
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-black/5 group-hover:bg-violet-500/10 transition-colors">
                  {copied ? <Check size={14} strokeWidth={1.5} className="text-emerald-500" /> : <Copy size={14} strokeWidth={1.25} className="text-black/50 group-hover:text-violet-600" />}
                </div>
              </div>
            </motion.div>

            {/* Nested CTA Button */}
            <motion.div variants={fadeUp}>
              <a
                href={PRINTR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 bg-[#111111] text-white px-1.5 py-1.5 pr-6 rounded-full font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] hover:bg-black"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-105 group-hover:bg-white/20">
                  <ArrowUpRight size={18} strokeWidth={1.25} className="text-white" />
                </div>
                <span className="text-[15px] tracking-tight">Trade on Printr</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: The Live Interactive Chart */}
          <motion.div 
            className="w-full lg:w-[55%] min-h-[400px] lg:min-h-0 flex flex-col"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: FLUID_EASE, delay: 0.2 }}
          >
            <DoubleBezelCard className="w-full flex-1 flex flex-col min-h-[400px]" innerClassName="p-0 bg-white relative flex flex-col">
              {/* Chart Header (Stats) */}
              <div className="absolute top-0 left-0 w-full p-6 sm:p-8 flex items-start justify-between z-10 pointer-events-none">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[14px] font-semibold text-[#111111] uppercase tracking-widest">NAT / USD</h3>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-600 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[32px] sm:text-[40px] font-light tracking-tight text-[#111111]" style={{ fontFamily: "Geist, sans-serif" }}>
                      $0.0428
                    </span>
                    <span className="text-[14px] font-medium text-emerald-600">+24.5%</span>
                  </div>
                </div>
                
                {/* Natively Logo inline SVG replica */}
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-sm border border-black/5">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect width="100" height="100" fill="#081326" />
                    <circle cx="50" cy="50" r="32" stroke="white" strokeWidth="9" fill="none" />
                    <mask id="n-mask">
                      <circle cx="50" cy="50" r="28" fill="white" />
                    </mask>
                    <g mask="url(#n-mask)">
                      <path d="M 32 10 L 32 90 M 68 10 L 68 90 M 32 10 L 68 90" stroke="white" strokeWidth="9" strokeLinejoin="miter" strokeLinecap="butt" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* The Recharts Area Graph */}
              <div className="w-full h-full flex-1 mt-auto absolute bottom-0 left-0 pt-24">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip 
                      content={<CustomTooltip />} 
                      cursor={{ stroke: 'rgba(0,0,0,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#7c3aed" 
                      strokeWidth={1.5}
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                      animationDuration={2000}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </DoubleBezelCard>
          </motion.div>

        </div>

        {/* ── Asymmetrical Bento Grid ────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {benefits.map((b) => (
            <motion.div key={b.title} variants={fadeUp} className="h-full">
              <DoubleBezelCard className="h-full" innerClassName="p-6 flex flex-col gap-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${b.color}15 0%, ${b.color}05 100%)`,
                    border: `1px solid ${b.color}25`,
                    boxShadow: `inset 0 1px 1px rgba(255,255,255,0.8), 0 0 15px ${b.color}10`,
                  }}
                >
                  <b.icon size={22} strokeWidth={1.25} style={{ color: b.color }} />
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-[#111111] mb-2 tracking-tight" style={{ fontFamily: "Geist, sans-serif" }}>
                    {b.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "Geist, sans-serif" }}>
                    {b.desc}
                  </p>
                </div>
              </DoubleBezelCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center mt-16 text-[12px] uppercase tracking-widest font-medium"
          style={{ color: "rgba(0,0,0,0.3)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Crypto assets are highly volatile. Not financial advice.
        </motion.p>
      </div>
    </section>
  );
}
