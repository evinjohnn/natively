import { motion } from "framer-motion";

export default function UniversalLLMDesignCard() {
    return (
        <div className="w-full flex items-center justify-center 
            bg-gradient-to-br from-[#f6f7fb] via-[#eef1f7] to-[#e8ebf4] 
            rounded-[36px] overflow-hidden aspect-[6/5] pt-12 px-12 pb-0 relative">

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
                <div className="space-y-4 max-w-[75%]">
                    <h3 className="text-[42px] leading-[1.08] font-semibold tracking-[-0.02em] text-[#2b3445]">
                        Universal LLM Interface
                    </h3>
                    <p className="text-[20px] text-[#7b8596] leading-[1.5]">
                        Bring your own keys for OpenAI, Claude, Gemini, and more. A model-agnostic workspace for total control.
                    </p>
                </div>

                {/* Main Jelly Card */}
                <div className="relative flex-1 overflow-hidden mt-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            y: {
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="relative w-full h-[115%] 
                            rounded-t-[24px] rounded-b-none
                            bg-gradient-to-br from-white/80 to-white/60
                            backdrop-blur-xl
                            border border-white/70
                            shadow-[0_40px_80px_rgba(30,41,59,0.15),
                                    0_8px_20px_rgba(255,255,255,0.6)_inset]
                            p-6 flex flex-col gap-6">

                        {/* Top Row - Header/Status */}
                        <div className="flex items-center justify-between pb-2 border-b border-black/5">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse" />
                                <span className="text-sm font-medium text-neutral-600">3 Models Active</span>
                            </div>

                            {/* Add Key Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-4 py-1.5 rounded-full text-white 
                                    text-[13px] font-medium
                                    bg-[#2b3445]
                                    shadow-[0_4px_12px_rgba(43,52,69,0.2)]">
                                + Add Key
                            </motion.button>
                        </div>

                        {/* LLM Rows */}
                        <div className="space-y-3">
                            {[
                                { name: "OpenAI", model: "GPT-4o", color: "bg-black", connected: true },
                                { name: "Anthropic", model: "Claude 3.5 Sonnet", color: "bg-[#d97757]", connected: true },
                                { name: "Google", model: "Gemini 1.5 Pro", color: "bg-[#4285F4]", connected: false },
                                { name: "Groq", model: "Llama 3 70B", color: "bg-[#f55036]", connected: false },
                            ].map((provider, i) => (
                                <motion.div
                                    key={provider.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center justify-between 
                                        rounded-[20px]
                                        bg-white/50
                                        border border-white/60
                                        pl-4 pr-3 py-3
                                        hover:bg-white/80 transition-colors duration-300">

                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl ${provider.color} 
                                            flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>
                                            {provider.name[0]}
                                        </div>
                                        <div>
                                            <div className="text-[15px] font-semibold text-slate-700 leading-tight">
                                                {provider.name}
                                            </div>
                                            <div className="text-[12px] font-medium text-slate-400">
                                                {provider.model}
                                            </div>
                                        </div>
                                    </div>

                                    {provider.connected ? (
                                        <div className="px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200/50 text-emerald-700 text-[11px] font-semibold">
                                            Connected
                                        </div>
                                    ) : (
                                        <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[11px] font-semibold">
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
