import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Copy, Check } from "lucide-react";
import { useState } from "react";
import zipImg from "@/assets/zip.webp";
import copyImg from "@/assets/copy.webp";
import errorImg from "@/assets/error.webp";
import terminalImg from "@/assets/terminal.webp";

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDownloadAgain: () => void;
}

export default function DownloadModal({ isOpen, onClose, onDownloadAgain }: DownloadModalProps) {
    const [copied, setCopied] = useState(false);
    const command = "xattr -cr /Applications/Natively.app";

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                            className="pointer-events-auto bg-[#F6F7F9] w-full max-w-[1100px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 bg-transparent hover:bg-black/5 rounded-full transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            {/* Header Section */}
                            <div className="pt-12 pb-8 flex flex-col items-center text-center px-6">
                                <div className="flex items-center gap-2 mb-4 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                                    <CheckCircle2 size={16} className="text-green-500 fill-green-100" />
                                    <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">Downloaded</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                                    How to install Natively
                                </h2>
                            </div>

                            {/* Steps Container */}
                            <div className="px-8 pb-12 flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
                                    {/* Step 1 */}
                                    <div className="flex flex-col gap-5 group relative">
                                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-sm z-20 pointer-events-none">
                                            1
                                        </div>
                                        <div className="relative aspect-[4/3] bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden transition-all duration-300 group-hover:shadow-md">
                                            <div className="w-full h-full p-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                                                <img
                                                    src={zipImg}
                                                    alt="Extract Zip"
                                                    className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 scale-125 group-hover:scale-150"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-center md:text-left px-2">
                                            <h3 className="font-semibold text-gray-900 text-lg">Extract the ZIP file</h3>
                                            <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                                                Open <span className="font-medium text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded text-sm">Natively.zip</span> from your Downloads folder.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex flex-col gap-5 group relative">
                                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm z-20 pointer-events-none">
                                            2
                                        </div>
                                        <div className="relative aspect-[4/3] bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden transition-all duration-300 group-hover:shadow-md">
                                            <div className="w-full h-full p-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                                                <img
                                                    src={copyImg}
                                                    alt="Move to Applications"
                                                    className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 scale-125 group-hover:scale-150"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-center md:text-left px-2">
                                            <h3 className="font-semibold text-gray-900 text-lg">Move to Applications</h3>
                                            <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                                                Drag <span className="font-medium text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded text-sm">Natively.app</span> into your Applications folder.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex flex-col gap-5 group relative">
                                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm z-20 pointer-events-none">
                                            3
                                        </div>
                                        <div className="relative aspect-[4/3] bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden transition-all duration-300 group-hover:shadow-md">
                                            <div className="w-full h-full p-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                                                <img
                                                    src={errorImg}
                                                    alt="Security Warning"
                                                    className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 scale-125 translate-y-4 group-hover:scale-150"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-center md:text-left px-2">
                                            <h3 className="font-semibold text-gray-900 text-lg">If macOS asks...</h3>
                                            <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                                                This is a standard check for unsigned apps. It's safe to proceed.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="flex flex-col gap-5 group relative">
                                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm z-20 shadow-lg pointer-events-none">
                                            4
                                        </div>
                                        <div className="relative aspect-[4/3] bg-[#1E1E1E] rounded-2xl shadow-sm border border-black/5 overflow-hidden flex flex-col transition-all duration-300 group-hover:shadow-md ring-1 ring-black/5">
                                            {/* Terminal Header */}
                                            <div className="h-8 bg-[#2D2D2D] w-full flex items-center gap-1.5 px-3 border-b border-white/5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                                            </div>

                                            {/* Terminal Body */}
                                            <div className="flex-1 p-4 flex flex-col justify-center relative font-mono">
                                                <div className="text-gray-400 text-xs mb-2 select-none">$ Fix "Damaged App"</div>
                                                <div className="bg-black/30 rounded-lg p-2.5 flex items-center justify-between group/cmd border border-white/10 hover:border-white/20 transition-colors">
                                                    <code className="text-[11px] text-green-400 font-mono whitespace-nowrap overflow-x-auto scrollbar-none mr-2">
                                                        {command}
                                                    </code>
                                                    <button
                                                        onClick={handleCopy}
                                                        className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded"
                                                        title="Copy command"
                                                    >
                                                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-center md:text-left px-2">
                                            <h3 className="font-semibold text-gray-900 text-lg">Quick Fix Command</h3>
                                            <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                                                Paste into Terminal, hit Enter, then open the app again.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Section */}
                            <div className="bg-gray-50 border-t border-gray-200 py-5 flex items-center justify-center">
                                <p className="text-[15px] text-gray-500 flex items-center gap-1.5">
                                    Download didn't start?
                                    <button
                                        onClick={onDownloadAgain}
                                        className="text-[#0A84FF] hover:text-[#0070e0] font-medium transition-colors hover:underline decoration-2 underline-offset-2"
                                    >
                                        Try again
                                    </button>
                                </p>
                            </div>

                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}