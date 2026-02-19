import { Play, CheckCircle, FileCheck } from "lucide-react";
import startNativelyImg from "@/assets/startnatively.webp";
import endNativelyImg from "@/assets/endnatively.webp";
import notesImg from "@/assets/notes.webp";

const steps = [
  {
    number: "01",
    icon: Play,
    title: "Start Natively",
    description: "Open Natively before your meeting starts. It works with Zoom, Meet, and Teams.",
    image: startNativelyImg,
    imageClass: "w-full h-full object-cover scale-125 translate-y-5 translate-x-[-2px]",
  },
  {
    number: "02",
    icon: CheckCircle,
    title: "End Meeting",
    description: "Stop the recording when your meeting finishes to process the transcript.",
    image: endNativelyImg,
    imageClass: "w-full h-full object-cover scale-125 translate-x-3",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Get Notes",
    description: "Receive your structured notes and action items instantly in your inbox.",
    image: notesImg,
    imageClass: " object-cover translate-y-12",
  },
];

const StepsSection = () => {
  return (
    <section className="section-spacing bg-white">
      <div className="max-w-[1350px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="hero-headline !text-[#111827] text-[32px] md:text-[80px] leading-tight mb-4 mx-auto text-center">Meeting notes in 3 steps</h2>
          <p className="text-[20px] text-[#6B7280] font-normal font-geist">The easiest way to get beautiful, shareable meeting notes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12 relative">
          {/* Arrow 1 */}
          <div className="hidden md:block absolute top-[25%] left-[28%] w-24 h-12 z-10 opacity-40 pointer-events-none">
            <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" className="text-gray-400 w-full h-full transform rotate-[-5deg]">
              <path d="M10,20 Q50,5 90,20" strokeWidth="2" fill="none" />
              <path d="M85,15 L90,20 L85,25" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Arrow 2 */}
          <div className="hidden md:block absolute top-[25%] right-[28%] w-24 h-12 z-10 opacity-40 pointer-events-none">
            <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" className="text-gray-400 w-full h-full transform rotate-[-5deg]">
              <path d="M10,20 Q50,5 90,20" strokeWidth="2" fill="none" />
              <path d="M85,15 L90,20 L85,25" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col text-left group"
            >
              {/* Image Container */}
              <div className="w-full aspect-[5/4] bg-[#EEF2FF] rounded-2xl mb-8 relative overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  decoding="async"
                  className={step.imageClass}
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-3 px-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-[#9CA3AF] text-[24px] font-normal leading-none font-geist">{i + 1}</span>
                  <h3 className="text-[24px] font-medium text-[#111827] leading-none font-geist">{step.title}</h3>
                </div>

                <p className="text-[#6B7280] text-[16px] leading-relaxed font-geist font-normal">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
