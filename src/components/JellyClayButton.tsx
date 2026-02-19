import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { CONFIG } from "@/config/app";
import { detectPlatform, type OSType } from "@/utils/os";
import { trackEvent } from "@/utils/analytics";
import DownloadModal from "./DownloadModal";

// --- Components ---

interface LinuxModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function LinuxModal({ isOpen, onClose }: LinuxModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-[#111827] border border-white/10 rounded-2xl p-6 z-50 shadow-2xl"
                    >
                        <h3 className="text-xl font-semibold text-white mb-2">Linux Support Coming Soon</h3>
                        <p className="text-gray-400 mb-6">
                            We're actively working on a Linux build. Stay tuned for updates!
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full py-2.5 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            Close
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// --- Icons ---
const Icons = {
    apple: (
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
    ),
};

/**
 * Generates the download info based on detected platform
 */
function getDownloadInfo(platform: OSType) {
    const { BASE_URL, MACOS, WINDOWS } = CONFIG.DOWNLOADS;

    switch (platform) {
        case 'mac-arm64':
            return {
                url: `${BASE_URL}/v${MACOS.VERSION}/${MACOS.ARM64}`,
                text: "Get for Mac",
                secondaryUrl: `${BASE_URL}/v${MACOS.VERSION}/${MACOS.INTEL}`,
                secondaryText: "Using Intel Mac? Download Intel version",
                fileName: MACOS.ARM64
            };
        case 'mac-intel':
            return {
                url: `${BASE_URL}/v${MACOS.VERSION}/${MACOS.INTEL}`,
                text: "Get for Mac",
                secondaryUrl: null,
                secondaryText: null,
                fileName: MACOS.INTEL
            };
        case 'windows':
            return {
                url: `${BASE_URL}/v${WINDOWS.VERSION}/${WINDOWS.INSTALLER}`,
                text: "Get for Windows",
                secondaryUrl: `${BASE_URL}/v${WINDOWS.VERSION}/${WINDOWS.PORTABLE}`,
                secondaryText: "Download portable version",
                fileName: WINDOWS.INSTALLER
            };
        case 'linux':
            return {
                url: "#", // Handled by modal
                text: "Get for Linux",
                secondaryUrl: null,
                secondaryText: null,
                fileName: "linux-source"
            };
        default:
            return {
                url: `${BASE_URL}/v${MACOS.VERSION}/${MACOS.ARM64}`,
                text: "Get for Mac",
                secondaryUrl: `${BASE_URL}/v${MACOS.VERSION}/${MACOS.INTEL}`,
                secondaryText: "Using Intel Mac? Download Intel version",
                fileName: MACOS.ARM64
            };
    }
}

interface JellyClayButtonProps {
    className?: string;
    children?: React.ReactNode;
    href?: string; // Allow override for CTA section
}

export default function JellyClayButton({ className, children, href }: JellyClayButtonProps) {
    const [platform, setPlatform] = useState<OSType>('mac-arm64');
    const [downloadInfo, setDownloadInfo] = useState(getDownloadInfo('mac-arm64'));
    const [isLinuxModalOpen, setIsLinuxModalOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);

    useEffect(() => {
        detectPlatform().then((detectedPlatform) => {
            setPlatform(detectedPlatform);
            setDownloadInfo(getDownloadInfo(detectedPlatform));
        });
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Prevent default initially for all types to handle tracking + delays
        e.preventDefault();

        // 1. LINUX CASE
        if (platform === 'linux') {
            trackEvent("linux_download_attempt", {
                status: "coming_soon_shown",
                page_path: window.location.pathname
            });
            setIsLinuxModalOpen(true);
            return;
        }

        // 2. WINDOWS & MAC CASES
        // Determine file name and URL
        const targetUrl = href || downloadInfo.url;
        const fileName = downloadInfo.fileName;
        const isWindows = platform === 'windows';
        const isMac = platform === 'mac-arm64' || platform === 'mac-intel';

        // Fire generic "download_click"
        trackEvent("download_click", {
            os: platform,
            architecture: platform === 'mac-arm64' ? 'arm64' : (platform === 'mac-intel' ? 'x86' : 'unknown'),
            file_name: fileName,
            version: CONFIG.APP_VERSION,
            page_path: window.location.pathname,
            referrer: document.referrer || "direct"
        });

        // Fire specific "windows_download_type" if applicable
        if (isWindows) {
            trackEvent("windows_download_type", {
                type: "installer", // Main button is installer
                version: CONFIG.APP_VERSION
            });
        }

        // Add 150ms delay before navigation to ensure GA4 event is sent
        setTimeout(() => {
            if (href) {
                window.location.href = href;
            } else {
                window.location.href = targetUrl;
            }

            // Show modal for Mac users after download starts
            if (isMac) {
                setIsDownloadModalOpen(true);
            }

            // Show Intel fallback if on ARM64
            if (platform === 'mac-arm64') {
                setHasClicked(true);
            }
        }, 150);
    };

    const icon = platform === 'windows' ? Icons.windows : platform === 'linux' ? Icons.linux : Icons.apple;

    return (
        <>
            <motion.a
                href={href || downloadInfo.url}
                onClick={handleClick}
                // We handle navigation manually via setTimeout, but keep target blank for standard behavior if JS fails (though preventDefault stops it)
                // Actually, for download links, usually same tab is fine or it triggers download.
                // Keeping it simple: we preventDefault, so href is just for hover status bar.
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

                <span className="relative z-10 flex items-center gap-3">
                    {icon}
                    {children || downloadInfo.text}
                </span>
            </motion.a>

            <AnimatePresence>
                {hasClicked && platform === 'mac-arm64' && downloadInfo.secondaryUrl && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="flex flex-col items-center justify-center w-full overflow-hidden"
                    >
                        <a
                            href={downloadInfo.secondaryUrl}
                            onClick={(e) => {
                                // Default behavior implies navigation, but we track it too
                                trackEvent("download_click", {
                                    os: platform,
                                    architecture: 'x86', // Fallback is Intel
                                    file_name: downloadInfo.secondaryUrl?.split('/').pop() || "unknown",
                                    version: CONFIG.APP_VERSION,
                                    page_path: window.location.pathname,
                                    referrer: document.referrer || "direct"
                                });
                            }}
                            className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors underline decoration-dotted underline-offset-4 text-center whitespace-nowrap px-4 py-1"
                        >
                            {downloadInfo.secondaryText}
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            <LinuxModal isOpen={isLinuxModalOpen} onClose={() => setIsLinuxModalOpen(false)} />
            <DownloadModal
                isOpen={isDownloadModalOpen}
                onClose={() => setIsDownloadModalOpen(false)}
                onDownloadAgain={() => {
                    const targetUrl = href || downloadInfo.url;
                    window.location.href = targetUrl;
                }}
            />
        </>
    );
}


