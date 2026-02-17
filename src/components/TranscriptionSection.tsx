import transcriptImg from "@/assets/transcript.png";

const TranscriptionSection = () => {
  return (
    <section className="py-8 bg-white">
      <div className="max-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Transcript Image */}
          <div className="rounded-[40px] overflow-hidden aspect-[4/5] bg-gray-100 relative">
            <img
              src={transcriptImg}
              alt="Live Transcript UI"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover scale-110 translate-y-3 translate-x-2"
            />
          </div>

          {/* Stats Blocks */}
          <div className="flex flex-col pl-4">
            <h2 className="hero-headline !text-black text-[48px] leading-tight mb-6 text-left">Real-time transcription</h2>

            <div className="flex flex-col">
              <div className="flex gap-8 py-6 border-t border-gray-100 first:border-t-0 items-start">
                <div className="w-[140px] shrink-0 text-[48px] font-medium text-[#111827] leading-none font-geist">12+</div>
                <div>
                  <h3 className="text-[24px] font-medium text-[#111827] mb-2 font-geist">Languages</h3>
                  <p className="body-text-geist text-[#6B7280] text-[16px] leading-relaxed">
                    We support over 12 different languages, including English, Chinese, Spanish, and more.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 py-6 border-t border-gray-100 items-start">
                <div className="w-[140px] shrink-0 text-[48px] font-medium text-[#111827] leading-none font-geist">
                  300<span className="text-[24px]">ms</span>
                </div>
                <div>
                  <h3 className="text-[24px] font-medium text-[#111827] mb-2 font-geist">Response time</h3>
                  <p className="body-text-geist text-[#6B7280] text-[16px] leading-relaxed">
                    We have the fastest live transcription available. Test us against any other competitor.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 py-6 border-t border-gray-100 items-start">
                <div className="w-[140px] shrink-0 text-[48px] font-medium text-[#111827] leading-none font-geist">95%</div>
                <div>
                  <h3 className="text-[24px] font-medium text-[#111827] mb-2 font-geist">Transcription accuracy</h3>
                  <p className="body-text-geist text-[#6B7280] text-[16px] leading-relaxed">
                    Trusted by many teams for reliable transcription. All processed with industry-leading accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranscriptionSection;
