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
                        Invoke, orchestrate, and monitor multiple AI providers through one refined surface.
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

                        {/* Top Row */}
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="h-3 w-44 bg-neutral-300/60 rounded-full mb-3" />
                                <div className="h-3 w-32 bg-neutral-300/50 rounded-full" />
                            </div>

                            {/* Jelly Button */}
                            <motion.button
                                transition={{ type: "spring", stiffness: 220, damping: 15 }}
                                className="relative px-7 py-2.5 rounded-full text-white 
                                    text-[14px] font-medium
                                    bg-gradient-to-br from-[#7bb3ff] to-[#4f8dfc]
                                    shadow-[0_15px_35px_rgba(79,141,252,0.45)]
                                    overflow-hidden">

                                <span className="relative z-10">Invoke</span>

                                {/* Gloss highlight */}
                                <div className="absolute top-0 left-0 w-full h-1/2 
                                    bg-white/40 blur-md opacity-60" />

                                {/* Inner glow */}
                                <div className="absolute inset-0 rounded-full 
                                    shadow-[inset_0_-4px_10px_rgba(0,0,0,0.2)]" />
                            </motion.button>
                        </div>

                        {/* LLM Rows */}
                        <div className="space-y-5 mt-4">
                            {[1, 2, 3, 4].map((item) => (
                                <motion.div
                                    key={item}
                                    className="flex items-center justify-between 
                                        rounded-[28px]
                                        bg-gradient-to-br from-white to-[#f7f9ff]
                                        border border-white/80
                                        px-6 py-5
                                        shadow-[0_20px_40px_rgba(30,41,59,0.12),
                                                0_4px_12px_rgba(255,255,255,0.6)_inset]">

                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-full 
                                            bg-gradient-to-br from-[#eef2ff] to-[#dbe4ff]
                                            shadow-inner" />
                                        <div>
                                            <div className="h-3 w-32 bg-neutral-300/60 rounded-full mb-2" />
                                            <div className="h-2 w-20 bg-neutral-300/50 rounded-full" />
                                        </div>
                                    </div>

                                    <div className="h-8 w-16 rounded-full 
                                        bg-gradient-to-br from-[#e4e8f3] to-[#d8deec]
                                        shadow-inner" />
                                </motion.div>
                            ))}
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}
