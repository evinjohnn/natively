import React from "react";
import { motion } from "framer-motion";

export default function PremiumMeetingNotesCard() {
    return (
        <div className="w-full h-[330px] flex items-center justify-center bg-[#eef0f4] rounded-[24px] overflow-hidden relative group border border-[#E5E7EB] hover:shadow-lg transition-all duration-300">
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full h-full flex items-center justify-center p-4 translate-y-6"
            >
                <div
                    className="w-full max-w-[500px] h-[280px] rounded-[24px] p-[2px] transform transition-transform duration-500 hover:scale-[1.02]"
                    style={{
                        background:
                            "linear-gradient(145deg, rgba(255,255,255,0.85), rgba(220,224,235,0.6))",
                        boxShadow:
                            "20px 20px 60px rgba(163,177,198,0.35), -20px -20px 60px rgba(255,255,255,0.8)",
                    }}
                >
                    <div
                        className="w-full h-full rounded-[22px] px-6 py-5 flex flex-col gap-4 overflow-hidden"
                        style={{
                            background:
                                "linear-gradient(180deg, #f7f8fb 0%, #eceff5 100%)",
                            boxShadow:
                                "inset 6px 6px 12px rgba(163,177,198,0.25), inset -6px -6px 12px rgba(255,255,255,0.8)",
                        }}
                    >
                        {/* Participants Section */}
                        <div
                            className="rounded-xl p-3 flex flex-col gap-3"
                            style={{
                                background:
                                    "linear-gradient(145deg, #ffffff, #e9edf5)",
                                boxShadow:
                                    "8px 8px 18px rgba(163,177,198,0.35), -8px -8px 18px rgba(255,255,255,0.9)",
                            }}
                        >
                            {/* Person 1 */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <img
                                        src="https://api.dicebear.com/7.x/lorelei/svg?seed=Evin"
                                        alt="Evin"
                                        className="w-8 h-8 rounded-lg object-cover shadow-md bg-white"
                                    />
                                    <div>
                                        <p className="text-xs font-semibold text-[#2f3542]">
                                            Evin
                                        </p>
                                        <div className="w-24 h-1.5 mt-1.5 rounded-full bg-[#dde2ec]" />
                                    </div>
                                </div>
                                <div className="w-6 h-6 rounded-lg bg-[#eef1f6] shadow-inner" />
                            </div>

                            <div className="h-[1px] bg-[#e4e8f0] rounded-full" />

                            {/* Person 2 */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <img
                                        src="https://api.dicebear.com/7.x/lorelei/svg?seed=Savio"
                                        alt="Savio"
                                        className="w-8 h-8 rounded-lg object-cover shadow-md bg-white"
                                    />
                                    <div>
                                        <p className="text-xs font-semibold text-[#2f3542]">
                                            Savio
                                        </p>
                                        <div className="w-20 h-1.5 mt-1.5 rounded-full bg-[#dde2ec]" />
                                    </div>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-6 h-6 rounded-lg bg-[#eef1f6] shadow-inner" />
                                    <div className="w-6 h-6 rounded-lg bg-[#eef1f6] shadow-inner" />
                                </div>
                            </div>
                        </div>

                        {/* Notes Section */}
                        <div className="flex flex-col gap-1.5">
                            <p className="text-[10px] text-[#9aa3b2] font-medium uppercase tracking-wider">
                                Meeting notes
                            </p>
                            <h2 className="text-lg font-semibold text-[#2f3542]">
                                Opening and Introductions
                            </h2>
                            <div className="w-full h-1.5 mt-1 rounded-full bg-[#dde2ec]" />
                            <div className="w-4/5 h-1.5 rounded-full bg-[#e3e7ef]" />
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-center mt-auto opacity-0 md:opacity-100 transition-opacity">
                            <span className="text-[10px] text-[#9aa3b2]">
                                Beautiful meeting notes
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
