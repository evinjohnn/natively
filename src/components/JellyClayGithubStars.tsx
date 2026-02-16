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
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchStars}
                className="flex items-center gap-2 group"
            >
                <div className="relative flex items-center justify-center">
                    <Star
                        className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                    />
                    <motion.div
                        className="absolute inset-0 bg-yellow-400/20 blur-md rounded-full"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>

                {loading ? (
                    <span className="text-white/80 text-sm font-medium">...</span>
                ) : (
                    <span className="text-white font-medium text-sm drop-shadow-sm">
                        {stars !== null ? stars.toLocaleString() : "—"}
                    </span>
                )}
            </motion.button>
        </div>
    );
}
