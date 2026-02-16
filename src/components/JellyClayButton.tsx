import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface JellyClayButtonProps {
    href: string;
    className?: string;
    children?: React.ReactNode;
}

export default function JellyClayButton({ href, className, children }: JellyClayButtonProps) {
    const [os, setOS] = useState<'mac' | 'windows' | 'linux'>('mac');

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.includes("win")) {
            setOS('windows');
        } else if (userAgent.includes("linux")) {
            setOS('linux');
        } else {
            setOS('mac');
        }
    }, []);

    const icons = {
        mac: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M16.365 1.43c0 1.14-.465 2.185-1.23 2.94-.795.795-1.965 1.38-3.105 1.29-.135-1.11.39-2.295 1.17-3.075.78-.78 2.055-1.365 3.165-1.155zM21.75 16.53c-.51 1.14-.765 1.65-1.425 2.67-.93 1.41-2.235 3.18-3.84 3.195-1.425.015-1.8-.93-3.735-.915-1.935.015-2.34.93-3.765.9-1.605-.03-2.835-1.62-3.765-3.03-2.61-3.96-2.88-8.61-1.275-11.115.93-1.47 2.43-2.4 3.84-2.4 1.44 0 2.34.93 3.735.93 1.365 0 2.205-.93 3.72-.93 1.275 0 2.61.69 3.54 1.875-3.12 1.71-2.61 6.21.27 7.815z" />
            </svg>
        ),
        windows: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M0 3.449L9.75 2.1v9.451H0V3.449zm10.949-1.673L24 0v11.023h-13.051V1.776zm-10.949 11.226H9.75v8.711L0 20.551v-7.549zM10.949 13.002H24v9.222l-13.051-1.776v-7.446z" />
            </svg>
        ),
        linux: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12.75 0c-4.437 0-6.075 2.502-6.075 2.502S4.8 1.968 4.8 5.166c0 3.864 2.1 6.579 2.1 6.579s-.9.45-1.05.9c-.15.45-.6 2.1.3 3.45.6 1.05.6 4.65.6 4.65s-.6 2.25 2.55 3.15c2.4.675 6.15.525 8.7-1.35 1.5-1.05 2.1-3.15 2.1-3.15s1.2-.75.75-3.45c-.3-2.1-1.5-3.15-1.5-3.15s3.9-1.95 3.9-6.3c0-3.3-2.25-5.25-2.25-5.25S19.5 0 12.75 0z" />
            </svg>
        )
    };

    const labels = {
        mac: "Get for Mac",
        windows: "Get for Windows",
        linux: "Get for Linux"
    };

    const defaultContent = (
        <span className="relative z-10 flex items-center gap-3">
            {icons[os]}
            {labels[os]}
        </span>
    );

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={cn(
                "relative px-10 py-4 text-xl font-medium text-white rounded-3xl",
                "bg-gradient-to-br from-blue-400 to-blue-600",
                "shadow-[0_12px_30px_rgba(37,99,235,0.35)]",
                "active:shadow-[0_6px_16px_rgba(37,99,235,0.25)]",
                "backdrop-blur-xl overflow-hidden inline-flex items-center justify-center cursor-pointer",
                className
            )}
        >
            {/* Gloss highlight */}
            <span className="absolute top-1 left-4 right-4 h-1/2 rounded-2xl
                       bg-gradient-to-b from-white/70 to-white/10
                       blur-sm pointer-events-none" />

            {children || defaultContent}
        </motion.a>
    );
}
