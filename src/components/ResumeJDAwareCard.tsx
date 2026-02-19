import { motion } from "framer-motion";

export default function ResumeJDAwareCard() {
    return (
        <div className="w-full h-auto min-h-[330px] flex items-center justify-center bg-[#eef0f4] rounded-[36px] overflow-hidden relative group hover:shadow-lg transition-all duration-300">
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full flex items-center justify-center p-4"
            >
                <div className="w-full max-w-[500px] h-auto min-h-[310px] px-6 sm:px-12 pt-10 pb-10 flex flex-col justify-between">
                    {/* Header */}
                    <div className="space-y-4 sm:space-y-5">
                        <div className="space-y-2">
                            <div className="text-[12px] tracking-[0.2em] uppercase text-[#7b8596] font-semibold font-geist">
                                Context Intelligence
                            </div>

                            <h2 className="text-[26px] sm:text-[30px] font-semibold tracking-[-0.02em] text-[#2f3542] leading-snug font-geist">
                                Resume Aware
                                Responses
                            </h2>
                        </div>

                        <p className="text-[#64748b] text-sm leading-relaxed font-medium max-w-[90%]">
                            Analyzes your resume and the job description to provide tailored answers.
                        </p>
                    </div>

                    {/* Visual Clay Surface */}
                    <div className="relative translate-y-8 ">
                        <motion.div

                            transition={{ type: "spring", stiffness: 180, damping: 18 }}
                            className="w-full h-[130px] rounded-[24px] p-5 sm:p-7 space-y-3 sm:space-y-4"
                            style={{
                                background:
                                    "linear-gradient(180deg, #f7f8fb 0%, #eceff5 100%)",
                                boxShadow:
                                    "inset 6px 6px 12px rgba(163,177,198,0.25), inset -6px -6px 12px rgba(255,255,255,0.8)",
                            }}
                        >
                            <div className="h-2.5 sm:h-3 w-1/3 rounded-full bg-[#dde2ec]" />
                            <div className="h-2.5 sm:h-3 w-full rounded-full bg-[#e3e7ef]" />
                            <div className="h-2.5 sm:h-3 w-4/5 rounded-full bg-[#e3e7ef]" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
