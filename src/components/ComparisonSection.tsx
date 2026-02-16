import { ShieldCheck, Eye, X } from "lucide-react";

const ComparisonSection = () => {
  return (
    <section className="section-spacing bg-white" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-content">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="hero-headline !text-black text-[56px] leading-[1.1] mb-4">No meeting bots.<br />100% Undetectable.</h2>
          <p className="text-[#3B82F6] font-medium mb-4">WORKS WITH ALL PLATFORMS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Other Tools - Dark Blue Card */}
          <div className="bg-[#1E293B] rounded-[24px] p-8 relative overflow-hidden text-white/90">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <X size={16} className="text-red-400" />
              </div>
              <h3 className="text-[18px] font-medium font-geist">Other AI Notetakers</h3>
            </div>

            <div className="bg-[#0F172A] rounded-[16px] p-6 border border-white/5 space-y-4 shadow-inner">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="w-8 h-8 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center">
                  <span className="text-xs">🤖</span>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white font-geist">Notetaker Bot</p>
                  <p className="text-[10px] text-white/50 font-geist">Joined as a participant</p>
                </div>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed font-geist">
                "Wait, why is there a bot recording this meeting?"
              </p>
            </div>
          </div>

          {/* Natively - Dark Gray/Black Card */}
          <div className="bg-[#111827] rounded-[24px] p-8 relative overflow-hidden text-white/90">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <ShieldCheck size={16} className="text-[#4ADE80]" />
              </div>
              <h3 className="text-[18px] font-medium font-geist">Natively</h3>
            </div>

            <div className="bg-[#0F172A] rounded-[16px] p-6 border border-white/5 space-y-4 shadow-inner">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="w-8 h-8 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold">C</span>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white font-geist">Natively Active</p>
                  <p className="text-[10px] text-green-400 font-geist">Private & Invisible</p>
                </div>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed italic font-geist">
                No bots. No announcements. Just smooth AI assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
