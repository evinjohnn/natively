import JellyClayButton from "@/components/JellyClayButton";
import bottomImg from "@/assets/bottom.jpeg";
import Footer from "./Footer";

const GITHUB_URL = "https://github.com/evinjohnn/natively-cluely-ai-assistant/releases";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden min-h-[800px] flex flex-col justify-between bg-white">
      {/* Background Image - Anchored Bottom */}
      <img
        src={bottomImg}
        alt="Meeting AI Background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Extra smooth blend layer */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

      {/* Main Content Area */}
      <div className="max-content relative z-10 w-full flex-grow flex items-center pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left Content */}
          <div className="text-left">
            <h2 className="font-medium text-[#111827] text-[32px] md:text-[40px] leading-tight mb-4 tracking-tight font-geist">
              Meeting AI that helps during the call, not after.
            </h2>
            <p className="font-geist text-[20px] text-[#64748B] mb-8 font-normal">
              Try Cluely on your next meeting today.
            </p>

            <div className="scale-100 origin-left">
              <JellyClayButton href={GITHUB_URL} />
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block"></div>
        </div>
      </div>

      {/* Embedded Footer */}
      <Footer />
    </section>
  );
};

export default CTASection;
