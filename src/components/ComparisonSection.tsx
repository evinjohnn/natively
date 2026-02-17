import { Check, X, Bot, ChevronsLeftRight, Sparkles, Pencil, Share2, MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import logo from "@/assets/logo.png";
import otherAI from "@/assets/otherai.png";
import nativelyNote from "@/assets/nativelynote.png";

const ComparisonSection = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      const percentage = Math.min(Math.max((x / width) * 100, 15), 85);
      setSliderPosition(percentage);
    }
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);

  return (
    <section className="py-24 bg-white">
      <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 flex flex-col items-center">
          <p className="text-[#3B82F6] font-medium mb-4 uppercase tracking-wider">Works with all platforms</p>
          <h2 className="hero-headline !text-black text-[56px] leading-[1.1] mb-4 text-center mx-auto max-w-4xl">
            No meeting bots.<br />100% Undetectable.
          </h2>
        </div>

        <div className="w-full max-w-[1055px] grid grid-cols-1 lg:grid-cols-2 h-[520px] rounded-[32px] overflow-hidden">

          {/* Left Side - Competitors */}
          <div className="bg-gray-50/80 pt-12 flex flex-col items-center text-center relative overflow-hidden group">

            <div className="relative z-10 flex flex-col items-center">
              <h3 className="text-[32px] font-semibold text-gray-900 mb-4 font-geist tracking-tight">
                Other AI Notetakers
              </h3>
              <div className="flex items-center gap-2 text-gray-400 font-medium">
                <div className="bg-gray-200 rounded-full p-0.5">
                  <X className="w-3 h-3 text-gray-500" />
                </div>
                <span className="text-[15px]">Joins as an invasive participant</span>
              </div>
            </div>

            {/* Other AI Image Backdrop */}
            <img
              src={otherAI}
              alt="Other AI Notetaker Background"
              loading="lazy"
              decoding="async"
              className="scale-150 translate-y-[-14%] translate-x-[-2%]"
              style={{ height: 'auto', maxHeight: '80%' }}
            />

            {/* Inner Blue Box */}
            <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[280px] bg-[#3B5998] rounded-[32px] shadow-2xl flex flex-col justify-between p-6 z-20">
              {/* Center Logo */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                  <Bot className="w-10 h-10 text-[#3B5998]" />
                </div>
              </div>

              {/* Bottom Left Text */}
              <div className="flex items-center gap-2 text-white/90">
                <span className="text-lg font-medium">Roy's AI Notetaker</span>
                <div className="bg-white/20 p-1 rounded-md">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Side - Natively */}
          <div className="bg-gray-50/80 pt-12 flex flex-col items-center text-center relative overflow-hidden group">
            {/* Background Gradient/Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none z-10" />

            {/* Natively Image Backdrop */}
            <img
              src={nativelyNote}
              alt="Natively Notetaker Interface"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover z-0 translate-y-[5%] scale-110"
            />

            {/* Inner Split Box */}
            <div
              ref={containerRef}
              className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[280px] rounded-[32px] overflow-hidden z-20 cursor-ew-resize select-none"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >

              {/* Left Side - Visible (Absolute, clipped by width) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden bg-[#4B4859]/90 backdrop-blur-xl"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="w-[420px] h-full pt-6 px-6 pb-5 flex flex-col relative">
                  {/* Badge */}
                  <div className="self-start bg-white text-black text-[12px] font-bold px-3 py-1.5 rounded-full mb-4 shadow-sm">
                    Visible to you
                  </div>
                  {/* Skeleton UI */}
                  <div className="space-y-2 mb-4 animate-breathe">
                    <div className="h-3 w-full bg-white rounded-full" />
                    <div className="h-3 w-[85%] bg-white rounded-full" />
                    <div className="h-3 w-[95%] bg-white rounded-full" />
                    <div className="h-3 w-[75%] bg-white rounded-full" />
                    <div className="h-3 w-[60%] bg-white rounded-full" />
                  </div>

                  {/* Bottom Tools Skeleton */}
                  <div className="mt-auto space-y-2 animate-pulse-visible">
                    {/* Tool Pills */}
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 bg-white/10">
                        <Sparkles className="w-3 h-3 text-white/90" />
                        <div className="h-1.5 w-8 bg-white/40 rounded-full" />
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 bg-white/10">
                        <Pencil className="w-3 h-3 text-white/90" />
                        <div className="h-1.5 w-8 bg-white/40 rounded-full" />
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 bg-white/10">
                        <Share2 className="w-3 h-3 text-white/90" />
                        <div className="h-1.5 w-8 bg-white/40 rounded-full" />
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 bg-white/10">
                        <MoreHorizontal className="w-3 h-3 text-white/90" />
                        <div className="h-1.5 w-4 bg-white/40 rounded-full" />
                      </div>
                    </div>
                    {/* Bottom Bar */}
                    <div className="h-8 w-full rounded-full border border-white/20 bg-white/10 flex items-center px-3">
                      <div className="h-2 w-full bg-white/20 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Invisible (Absolute, clipped by width) */}
              <div
                className="absolute inset-y-0 right-0 overflow-hidden bg-gray-900/20 backdrop-blur-sm"
                style={{ width: `${100 - sliderPosition}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-[420px] h-full p-6 flex flex-col items-end">
                  {/* Diagonal Stripes Pattern */}
                  <div className="absolute inset-0 opacity-[0.15]"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)'
                    }}
                  />

                  {/* Badge */}
                  <div className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[12px] font-medium px-3 py-1.5 rounded-full mb-6 relative z-10 transition-transform">
                    Invisible to others
                  </div>
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white z-30 cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 active:scale-95">
                  <ChevronsLeftRight className="w-4 h-4 text-gray-900" />
                </div>
              </div>

            </div>

            <div className="relative z-10 flex flex-col items-center w-full">
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Natively Logo" className="w-8 h-8 brightness-0 invert" />
                <h3 className="text-[32px] font-semibold text-white font-geist tracking-tight">
                  Natively
                </h3>
              </div>

              <div className="flex items-center gap-2 text-white/90 mb-12 font-medium">
                <div className="bg-white/20 rounded-full p-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-[15px]">Undetectable to screen share, visible to you</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
