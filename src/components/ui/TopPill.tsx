import { ChevronUp, ChevronDown } from "lucide-react";
import logo from "../../assets/logo.webp";

interface TopPillProps {
    expanded: boolean;
    onToggle: () => void;
    onQuit: () => void;
    appearance: any; // using any to align with parent interface
    onLogoClick?: () => void;
}

export default function TopPill({
    expanded,
    onToggle,
    onQuit,
    appearance,
    onLogoClick,
}: TopPillProps) {
    return (
        <div className="flex justify-center mt-2 select-none z-[100]">
            <div
                className="
          draggable-area
          flex items-center gap-2
          rounded-full
          bg-[#141418]/96 border border-white/10
          backdrop-blur-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.2),0_1px_4px_rgba(0,0,0,0.12)]
          pl-1.5 pr-1.5 py-1.5
          transition-all duration-300 ease-in-out
        "
                style={appearance?.pillStyle}
            >
                {/* LOGO BUTTON */}
                <button
                    onClick={onLogoClick}
                    className={`
            w-8 h-8
            rounded-full
            bg-transparent hover:bg-white/10
            flex items-center justify-center
            relative overflow-hidden
            transition-colors duration-200
          `}
                    style={appearance?.iconStyle}
                >
                    <img
                        src={logo}
                        alt="Natively"
                        className="w-[18px] h-[18px] object-contain flex-shrink-0"
                        draggable="false"
                        onDragStart={(e) => e.preventDefault()}
                    />
                </button>

                {/* CENTER SEGMENT */}
                <button
                    onClick={onToggle}
                    className={`
            flex items-center gap-2
            group
            px-4 py-1.5
            rounded-full
            backdrop-blur-md
            bg-transparent hover:bg-white/10
            text-white/80 hover:text-white
            text-[12px]
            font-medium tracking-[0.02em]
            border border-transparent hover:border-white/10
            transition-all duration-200
          `}
                    style={appearance?.chipStyle}
                >
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                        {expanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                        )}
                    </span>
                    <span>{expanded ? "Hide" : "Show"}</span>
                </button>

                {/* STOP / QUIT BUTTON */}
                <button
                    onClick={onQuit}
                    className={`
            w-8 h-8
            rounded-full
            bg-transparent
            text-white/50
            flex items-center justify-center
            transition-all duration-200
            hover:bg-red-500/20 hover:text-red-400
          `}
                    style={appearance?.iconStyle}
                >
                    <div className="w-3.5 h-3.5 rounded-[2px] bg-current opacity-90 transition-colors" />
                </button>
            </div>
        </div>
    );
}
