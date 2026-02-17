import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

// ============================================================================
// CENTRALIZED DOWNLOAD CONFIGURATION
// ============================================================================
const DOWNLOAD_CONFIG = {
    macOS: {
        version: "1.1.6",
        arm64: {
            filename: "Natively-1.1.6-arm64-mac.zip",
            url: "https://github.com/evinjohnn/natively-cluely-ai-assistant/releases/download/v1.1.6/Natively-1.1.6-arm64-mac.zip"
        },
        intel: {
            filename: "Natively-1.1.6-mac.zip",
            url: "https://github.com/evinjohnn/natively-cluely-ai-assistant/releases/download/v1.1.6/Natively-1.1.6-mac.zip"
        }
    },
    windows: {
        version: "1.1.2",
        installer: {
            filename: "Natively-Setup-1.1.2.exe",
            url: "https://github.com/evinjohnn/natively-cluely-ai-assistant/releases/download/v1.1.2/Natively-Setup-1.1.2.exe"
        },
        portable: {
            filename: "Natively-1.1.2.exe",
            url: "https://github.com/evinjohnn/natively-cluely-ai-assistant/releases/download/v1.1.2/Natively-1.1.2.exe"
        }
    },
    linux: {
        comingSoon: true
    }
} as const;

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
interface JellyClayButtonProps {
    href?: string;
    className?: string;
    children?: React.ReactNode;
}

type OSType = 'mac-arm64' | 'mac-intel' | 'windows' | 'linux';

// ============================================================================
// PLATFORM DETECTION
// ============================================================================
/**
 * Detects the user's operating system and macOS architecture
 * Uses modern User-Agent Client Hints API with fallback to legacy userAgent parsing
 */
async function detectPlatform(): Promise<OSType> {
    // Try modern User-Agent Client Hints API first (Chromium-based browsers)
    if ('userAgentData' in navigator && (navigator as any).userAgentData) {
        try {
            const uaData = await (navigator as any).userAgentData.getHighEntropyValues([
                'platform',
                'architecture'
            ]);

            const platform = (uaData.platform || '').toLowerCase();
            const architecture = (uaData.architecture || '').toLowerCase();

            // Windows detection
            if (platform.includes('win')) {
                return 'windows';
            }

            // Linux detection
            if (platform.includes('linux') && !platform.includes('android')) {
                return 'linux';
            }

            // macOS detection with architecture
            if (platform.includes('mac')) {
                // Architecture can be: 'arm', 'arm64', 'x86', 'x86_64', etc.
                if (architecture.includes('arm')) {
                    return 'mac-arm64';
                } else if (architecture.includes('x86')) {
                    return 'mac-intel';
                }
                // Default to ARM64 for modern Macs if architecture is unclear
                return 'mac-arm64';
            }
        } catch (error) {
            console.warn('User-Agent Client Hints failed, falling back to userAgent parsing:', error);
        }
    }

    // Fallback to legacy userAgent parsing (Safari and older browsers)
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.includes('win')) {
        return 'windows';
    }

    if (userAgent.includes('linux') && !userAgent.includes('android')) {
        return 'linux';
    }

    if (userAgent.includes('mac')) {
        // Try to detect Apple Silicon from userAgent
        // Safari on Apple Silicon may include "Macintosh; Intel Mac OS X" even on ARM
        // More reliable: check for specific ARM indicators
        if (userAgent.includes('arm64') || userAgent.includes('aarch64')) {
            return 'mac-arm64';
        }

        // Default to ARM64 for modern Macs (most Macs sold since 2020 are Apple Silicon)
        return 'mac-arm64';
    }

    // Ultimate fallback
    return 'mac-arm64';
}

/**
 * Generates the download URL based on detected platform
 */
function getDownloadURL(platform: OSType): string {
    switch (platform) {
        case 'mac-arm64':
            return DOWNLOAD_CONFIG.macOS.arm64.url;
        case 'mac-intel':
            return DOWNLOAD_CONFIG.macOS.intel.url;
        case 'windows':
            return DOWNLOAD_CONFIG.windows.installer.url;
        case 'linux':
            return '#'; // Linux shows modal instead
        default:
            return DOWNLOAD_CONFIG.macOS.arm64.url;
    }
}

// ============================================================================
// MAIN DOWNLOAD BUTTON COMPONENT
// ============================================================================
export default function JellyClayButton({ href, className, children }: JellyClayButtonProps) {
    const [platform, setPlatform] = useState<OSType>('mac-arm64');
    const [downloadURL, setDownloadURL] = useState<string>('');
    const [showLinuxModal, setShowLinuxModal] = useState(false);

    useEffect(() => {
        detectPlatform().then((detectedPlatform) => {
            setPlatform(detectedPlatform);
            setDownloadURL(getDownloadURL(detectedPlatform));
        });
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (platform === 'linux') {
            e.preventDefault();
            setShowLinuxModal(true);
        }
    };

    const icons = {
        'mac-arm64': (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M16.365 1.43c0 1.14-.465 2.185-1.23 2.94-.795.795-1.965 1.38-3.105 1.29-.135-1.11.39-2.295 1.17-3.075.78-.78 2.055-1.365 3.165-1.155zM21.75 16.53c-.51 1.14-.765 1.65-1.425 2.67-.93 1.41-2.235 3.18-3.84 3.195-1.425.015-1.8-.93-3.735-.915-1.935.015-2.34.93-3.765.9-1.605-.03-2.835-1.62-3.765-3.03-2.61-3.96-2.88-8.61-1.275-11.115.93-1.47 2.43-2.4 3.84-2.4 1.44 0 2.34.93 3.735.93 1.365 0 2.205-.93 3.72-.93 1.275 0 2.61.69 3.54 1.875-3.12 1.71-2.61 6.21.27 7.815z" />
            </svg>
        ),
        'mac-intel': (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M16.365 1.43c0 1.14-.465 2.185-1.23 2.94-.795.795-1.965 1.38-3.105 1.29-.135-1.11.39-2.295 1.17-3.075.78-.78 2.055-1.365 3.165-1.155zM21.75 16.53c-.51 1.14-.765 1.65-1.425 2.67-.93 1.41-2.235 3.18-3.84 3.195-1.425.015-1.8-.93-3.735-.915-1.935.015-2.34.93-3.765.9-1.605-.03-2.835-1.62-3.765-3.03-2.61-3.96-2.88-8.61-1.275-11.115.93-1.47 2.43-2.4 3.84-2.4 1.44 0 2.34.93 3.735.93 1.365 0 2.205-.93 3.72-.93 1.275 0 2.61.69 3.54 1.875-3.12 1.71-2.61 6.21.27 7.815z" />
            </svg>
        ),
        'windows': (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M0 3.449L9.75 2.1v9.451H0V3.449zm10.949-1.673L24 0v11.023h-13.051V1.776zm-10.949 11.226H9.75v8.711L0 20.551v-7.549zM10.949 13.002H24v9.222l-13.051-1.776v-7.446z" />
            </svg>
        ),
        'linux': (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12.75 0c-4.437 0-6.075 2.502-6.075 2.502S4.8 1.968 4.8 5.166c0 3.864 2.1 6.579 2.1 6.579s-.9.45-1.05.9c-.15.45-.6 2.1.3 3.45.6 1.05.6 4.65.6 4.65s-.6 2.25 2.55 3.15c2.4.675 6.15.525 8.7-1.35 1.5-1.05 2.1-3.15 2.1-3.15s1.2-.75.75-3.45c-.3-2.1-1.5-3.15-1.5-3.15s3.9-1.95 3.9-6.3c0-3.3-2.25-5.25-2.25-5.25S19.5 0 12.75 0z" />
            </svg>
        )
    };

    const labels = {
        'mac-arm64': "Get for Mac",
        'mac-intel': "Get for Mac",
        'windows': "Get for Windows",
        'linux': "Get for Linux"
    };

    const defaultContent = (
        <span className="relative z-10 flex items-center gap-3">
            {icons[platform]}
            {labels[platform]}
        </span>
    );

    // Use custom href if provided, otherwise use detected download URL
    const finalHref = href || downloadURL;

    return (
        <>
            <motion.a
                href={finalHref}
                onClick={handleClick}
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

            {/* Linux Modal */}
            <LinuxComingSoonModal
                isOpen={showLinuxModal}
                onClose={() => setShowLinuxModal(false)}
            />
        </>
    );
}

// ============================================================================
// FALLBACK LINKS
// ============================================================================

/**
 * Fallback link component for Intel Mac users
 * Only shown when Apple Silicon is detected (as a safety net)
 */
export function IntelMacFallbackLink() {
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        detectPlatform().then((platform) => {
            // Only show fallback link if we detected ARM64 Mac
            setShowFallback(platform === 'mac-arm64');
        });
    }, []);

    if (!showFallback) return null;

    return (
        <motion.a
            href={DOWNLOAD_CONFIG.macOS.intel.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline decoration-dotted underline-offset-4"
        >
            Using Intel Mac? Download Intel version
        </motion.a>
    );
}

/**
 * Portable version link for Windows users
 * Always shown for Windows platform
 */
export function WindowsPortableLink() {
    const [showLink, setShowLink] = useState(false);

    useEffect(() => {
        detectPlatform().then((platform) => {
            setShowLink(platform === 'windows');
        });
    }, []);

    if (!showLink) return null;

    return (
        <motion.a
            href={DOWNLOAD_CONFIG.windows.portable.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline decoration-dotted underline-offset-4"
        >
            Download portable version
        </motion.a>
    );
}

// ============================================================================
// LINUX MODAL COMPONENT
// ============================================================================

interface LinuxComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function LinuxComingSoonModal({ isOpen, onClose }: LinuxComingSoonModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-br from-blue-400 to-blue-600 px-8 py-6">
                                <h2 className="text-2xl font-bold text-white">Linux Support Coming Soon</h2>
                            </div>

                            {/* Content */}
                            <div className="px-8 py-6">
                                <p className="text-gray-700 text-base leading-relaxed mb-6">
                                    We're actively working on a Linux build. Stay tuned for updates!
                                </p>

                                {/* Close Button */}
                                <motion.button
                                    onClick={onClose}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-6 py-3 bg-gradient-to-br from-blue-400 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    Close
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
