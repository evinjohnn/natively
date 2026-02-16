import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function JellyClayGithubStars() {
    const [repo] = useState("evinjohnn/natively-cluely-ai-assistant");
    const [stars, setStars] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchStars = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://api.github.com/repos/${repo}`);
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setStars(data.stargazers_count ?? 0);
        } catch (err) {
            setStars(null);
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 group cursor-pointer"
            >
                <div className="relative flex items-center justify-center">
                    <Star
                        className="w-8 h-8 text-yellow-500 fill-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                    />
                    <motion.div
                        className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full"
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>

                {loading ? (
                    <span className="text-amber-900/80 text-lg font-bold">...</span>
                ) : (
                    <span className="text-amber-900 font-bold text-xl drop-shadow-sm font-sans tracking-tight">
                        {stars !== null ? stars.toLocaleString() : "—"}
                    </span>
                )}
            </motion.a>
        </div>
    );
}
