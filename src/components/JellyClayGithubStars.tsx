import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

function Digit({ value, index }: { value: number; index: number }) {
    const iterations = 3;
    const numberArray = Array.from({ length: 10 * iterations }).map((_, i) => i % 10);

    const targetIndex = (iterations - 1) * 10 + value;
    const digitHeight = 28;
    const targetY = targetIndex * -digitHeight;

    return (
        <div className="relative w-[0.65em] h-[28px] overflow-hidden font-mono">
            {/* Soft vertical fade mask */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    maskImage:
                        "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
                }}
            />

            <motion.div
                className="flex flex-col items-center"
                initial={{ y: 0 }}
                animate={{ y: targetY }}
                transition={{
                    duration: 1.2 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {numberArray.map((num, i) => {
                    const isActive = i === targetIndex;
                    return (
                        <div
                            key={i}
                            className="h-[28px] flex items-center justify-center"
                            style={{
                                opacity: isActive ? 1 : 0.18,
                                transition: "opacity 0.3s ease",
                            }}
                        >
                            {num}
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}

function RollingNumber({ value }: { value: number }) {
    const digits = value.toString().split("").map(Number);

    return (
        <div className="flex items-center">
            {digits.map((digit, index) => (
                <Digit key={index} value={digit} index={index} />
            ))}
        </div>
    );
}

export default function JellyClayGithubStars() {
    const [repo] = useState("evinjohnn/natively-cluely-ai-assistant");
    const [stars, setStars] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const fetchStars = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://api.github.com/repos/${repo}`);
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setStars(data.stargazers_count ?? 0);
        } catch {
            setStars(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStars();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative z-50">
            <motion.a
                href={`https://github.com/${repo}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 cursor-pointer"
            >
                <div className="relative flex items-center justify-center">
                    {/* SVG Gradient Definition */}
                    <svg width="0" height="0" className="absolute">
                        <defs>
                            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FDE68A" /> {/* Light Gold */}
                                <stop offset="50%" stopColor="#F59E0B" /> {/* Standard Gold */}
                                <stop offset="100%" stopColor="#B45309" /> {/* Dark Amber */}
                            </linearGradient>
                            <filter id="glow-shadow" x="-50%" y="-50%" width="200%" height="200%">
                                <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#F59E0B" floodOpacity="0.5" />
                            </filter>
                        </defs>
                    </svg>

                    <Star
                        className="w-7 h-7 text-transparent"
                        fill="url(#gold-gradient)"
                        style={{ filter: "url(#glow-shadow)" }}
                    />

                    <motion.div
                        className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full"
                        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {loading ? (
                    <span className="text-white/60 text-lg font-semibold">...</span>
                ) : (
                    <div className="text-white font-semibold text-xl tracking-tight flex items-center">
                        <RollingNumber value={stars} />
                    </div>
                )}
            </motion.a>
        </div>
    );
}
