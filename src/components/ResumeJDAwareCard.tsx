import { motion } from "framer-motion";

export default function ResumeJDAwareCard() {
    return (
        <div className="w-full h-[330px] flex items-center justify-center bg-[#eef0f4] rounded-[36px] overflow-hidden relative group hover:shadow-lg transition-all duration-300">
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full flex items-center justify-center p-4"
            >
                <div
                    className="relative w-full max-w-[500px] h-[310px] rounded-[24px] px-8 sm:px-12 pt-10 pb-10 flex flex-col justify-between overflow-hidden transform transition-transform duration-500 hover:scale-[1.02]"
                    style={{
                        background:
                            "linear-gradient(145deg, rgba(255,255,255,0.85), rgba(220,224,235,0.6))",
                        boxShadow:
                            "20px 20px 60px rgba(163,177,198,0.35), -20px -20px 60px rgba(255,255,255,0.8)",
                    }}
                >
                    {/* Header */}
                    <div className="space-y-4 sm:space-y-5">
                        <div className="text-[12px] tracking-[0.2em] uppercase text-[#7b8596] font-semibold font-geist">
                            Context Intelligence
                        </div>

                        <h2 className="text-[26px] sm:text-[30px] font-semibold tracking-[-0.02em] text-[#2f3542] leading-snug font-geist">
                            Resume & JD Aware
                            <br />
                            Responses
                        </h2>
                    </div>

                    {/* Visual Clay Surfaces */}
                    <div className="relative flex items-end justify-between gap-4 translate-y-4">
                        {/* Resume Clay Card */}
                        <motion.div
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 180, damping: 18 }}
                            className="flex-1 h-[130px] rounded-[24px] p-5 sm:p-7 space-y-3 sm:space-y-4"
                            style={{
                                background:
                                    "linear-gradient(145deg, #ffffff, #e9edf5)",
                                boxShadow:
                                    "8px 8px 18px rgba(163,177,198,0.35), -8px -8px 18px rgba(255,255,255,0.9)",
                            }}
                        >
                            <div className="h-2.5 sm:h-3 w-20 rounded-full bg-[#dde2ec]" />
                            <div className="h-2.5 sm:h-3 w-full rounded-full bg-[#e3e7ef]" />
                            <div className="h-2.5 sm:h-3 w-4/5 rounded-full bg-[#e3e7ef]" />
                        </motion.div>

                        {/* Soft Connection Glow / Decoration */}
                        {/* Kept minimal or removed to match the clean clay aesthetic */}

                        {/* JD Clay Card */}
                        <motion.div
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 180, damping: 18 }}
                            className="flex-1 h-[130px] rounded-[24px] p-5 sm:p-7 space-y-3 sm:space-y-4"
                            style={{
                                background:
                                    "linear-gradient(145deg, #ffffff, #e9edf5)",
                                boxShadow:
                                    "8px 8px 18px rgba(163,177,198,0.35), -8px -8px 18px rgba(255,255,255,0.9)",
                            }}
                        >
                            <div className="h-2.5 sm:h-3 w-24 rounded-full bg-[#dde2ec]" />
                            <div className="h-2.5 sm:h-3 w-full rounded-full bg-[#e3e7ef]" />
                            <div className="h-2.5 sm:h-3 w-3/4 rounded-full bg-[#e3e7ef]" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
