import { motion } from "framer-motion";

export default function ResumeJDAwareCard() {
    return (
        <div className="w-full h-[330px] flex items-center justify-center bg-[linear-gradient(135deg,#f7f8fc,#eef1f7)] rounded-[24px] overflow-hidden relative group border border-[#E5E7EB] hover:shadow-lg transition-all duration-300">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-full h-full rounded-[24px] bg-[#f1f3f9] shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden"
            >
                {/* Soft highlight */}
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/85 via-transparent to-transparent pointer-events-none" />

                <div className="relative h-full w-full px-8 sm:px-12 pt-6 pb-10 flex flex-col justify-between">
                    {/* Header */}
                    <div className="space-y-4 sm:space-y-5">
                        <div className="text-[12px] tracking-[0.28em] uppercase text-neutral-400 font-medium font-geist">
                            Context Intelligence
                        </div>

                        <h2 className="text-[26px] sm:text-[30px] font-semibold tracking-tight text-neutral-800 leading-snug font-geist">
                            Resume & JD Aware
                            <br />
                            Responses
                        </h2>
                    </div>

                    {/* Visual Clay Surfaces */}
                    <div className="relative flex items-end justify-between gap-4">
                        {/* Resume Clay Card */}
                        <motion.div
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 180, damping: 18 }}
                            className="flex-1 h-[110px] sm:h-[130px] rounded-[24px] bg-[#eceff6] p-5 sm:p-7 space-y-3 sm:space-y-4 shadow-[8px_8px_20px_rgba(0,0,0,0.06),-8px_-8px_20px_rgba(255,255,255,0.95)]"
                        >
                            <div className="h-2.5 sm:h-3 w-20 rounded-full bg-neutral-400/40" />
                            <div className="h-2.5 sm:h-3 w-full rounded-full bg-neutral-300/60" />
                            <div className="h-2.5 sm:h-3 w-4/5 rounded-full bg-neutral-300/50" />
                        </motion.div>

                        {/* Soft Connection Glow */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-[50px] sm:bottom-[70px] w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white/60 blur-3xl pointer-events-none" />

                        {/* JD Clay Card */}
                        <motion.div
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 180, damping: 18 }}
                            className="flex-1 h-[110px] sm:h-[130px] rounded-[24px] bg-[#eceff6] p-5 sm:p-7 space-y-3 sm:space-y-4 shadow-[8px_8px_20px_rgba(0,0,0,0.06),-8px_-8px_20px_rgba(255,255,255,0.95)]"
                        >
                            <div className="h-2.5 sm:h-3 w-24 rounded-full bg-neutral-400/40" />
                            <div className="h-2.5 sm:h-3 w-full rounded-full bg-neutral-300/60" />
                            <div className="h-2.5 sm:h-3 w-3/4 rounded-full bg-neutral-300/50" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
