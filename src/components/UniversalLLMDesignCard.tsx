import { motion } from "framer-motion";
import openaiLogo from "../assets/openai.png";
import claudeLogo from "../assets/claude.png";
import geminiLogo from "../assets/gemini.webp";

export default function UniversalLLMDesignCard() {
    return (
        <div className="w-full flex items-center justify-center 
            bg-[#eef0f4] 
            rounded-[36px] overflow-hidden aspect-auto h-auto md:aspect-[6/5] pt-8 px-6 md:pt-12 md:px-12 pb-0 relative group hover:shadow-lg transition-all duration-300">

            {/* Ambient radial glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -bottom-20 -right-20 w-[420px] h-[420px] 
                    bg-blue-400/20 blur-[120px] rounded-full" />
                <div className="absolute -top-20 -left-20 w-[300px] h-[300px] 
                    bg-indigo-300/20 blur-[120px] rounded-full" />
            </div>

            {/* Soft inner vignette */}
            <div className="absolute inset-0 rounded-[36px] 
                shadow-[inset_0_0_140px_rgba(30,41,59,0.06)] pointer-events-none" />

            <div className="relative w-full h-full flex flex-col justify-between">

                {/* Heading */}
                <div className="space-y-4 max-w-[85%]">
                    <h3 className="text-[28px] md:text-[38px] leading-[1.1] font-semibold tracking-[-0.02em] text-[#2b3445]">
                        Universal LLM Interface
                    </h3>
                    <p className="text-[16px] md:text-[18px] text-[#7b8596] leading-[1.5] font-medium">
                        Invoke, orchestrate, and monitor multiple AI providers through one refined surface.
                    </p>
                </div>

                {/* Main Clay Card */}
                <div className="relative flex-1 mt-8 perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, y: 40, rotateX: 5 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                            mass: 1
                        }}
                        className="relative w-full h-[120%] 
                            rounded-t-[32px] 
                            p-6 flex flex-col gap-6"
                        style={{
                            background: "linear-gradient(180deg, #f7f8fb 0%, #eceff5 100%)",
                            boxShadow: "inset 6px 6px 12px rgba(163,177,198,0.25), inset -6px -6px 12px rgba(255,255,255,0.8)"
                        }}>

                        {/* Top Row - Header/Status */}
                        <div className="flex items-center justify-between pb-4 border-b border-black/5">
                            <div className="flex items-center gap-2.5 bg-white/60 px-3 py-1.5 rounded-full shadow-sm border border-white/50">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                                <span className="text-[11px] md:text-[13px] font-semibold text-neutral-600">3 Models Active</span>
                            </div>

                            {/* Add Key Button - Premium Blue Jelly Style */}
                            <motion.button
                                whileHover={{ scale: 1.05, translateY: -1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="relative px-5 py-2 rounded-full flex items-center gap-2.5 
                                    bg-gradient-to-br from-blue-400 to-blue-600 
                                    shadow-[0_8px_20px_rgba(37,99,235,0.35)] 
                                    border border-white/20 
                                    text-white text-[13px] font-semibold tracking-wide overflow-hidden group/btn">

                                {/* Inner Gloss Effect */}
                                <div className="absolute top-0.5 left-2 right-2 h-[45%] rounded-full bg-gradient-to-b from-white/70 to-white/5 blur-[0.5px] pointer-events-none" />

                                <span className="relative drop-shadow-sm">+ Add Key</span>
                            </motion.button>
                        </div>

                        {/* LLM Rows */}
                        <div className="space-y-3">
                            {[
                                { name: "OpenAI", model: "GPT-5.2", logo: openaiLogo, connected: true },
                                { name: "Anthropic", model: "Sonnet 4.5", logo: claudeLogo, connected: true },
                                { name: "Google", model: "Gemini 3 Pro", logo: geminiLogo, connected: true },
                            ].map((provider, i) => (
                                <motion.div
                                    key={provider.name}
                                    initial={{ opacity: 0, x: -15, y: 10 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: i * 0.08,
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 12
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 4px 10px -3px rgba(0, 0, 0, 0.01)"
                                    }}
                                    className="flex items-center justify-between 
                                        rounded-[22px]
                                        bg-white/60
                                        border border-white/80
                                        pl-4 pr-4 py-3.5
                                        shadow-[0_1px_2px_rgba(0,0,0,0.02),inset_0_0_0_1px_rgba(255,255,255,0.5)]
                                        cursor-pointer
                                        group/item">

                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-2xl bg-white 
                                            flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.8)] 
                                            overflow-hidden p-2 ring-1 ring-black/5">
                                            <img
                                                src={provider.logo}
                                                alt={provider.name}
                                                className="w-full h-full object-contain filter group-hover/item:brightness-110 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-[15px] font-bold text-[#2f3542] leading-tight mb-0.5">
                                                {provider.name}
                                            </div>
                                            <div className="text-[12px] font-medium text-[#8890a0]">
                                                {provider.model}
                                            </div>
                                        </div>
                                    </div>

                                    {provider.connected ? (
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="px-3 py-1.5 rounded-full bg-[#f1f3f7] text-[#64748b] text-[11px] font-bold tracking-wide hover:bg-[#e2e6ea] transition-colors">
                                            Connect
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}
