
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wand2, ArrowRight, Play } from "lucide-react";

const SAMPLE_THUMBNAILS = [
  {
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad", // money struggle
    text: "I TRIED LIVING ON $1 FOR 30 DAYS",
    tag: "Finance",
    accent: "text-orange-300",
  },
  {
    image: "https://i.ytimg.com/vi/2ePf9rue1Ao/maxresdefault.jpg",
    text: "10 AI TOOLS THAT WILL REPLACE YOUR JOB",
    tag: "Tech",
    accent: "text-violet-300",
  },
  {
    image: "https://i.ytimg.com/vi/SAaESb4wTCM/maxresdefault.jpg",
    text: "SOLO TRIP TO THE MOST REMOTE PLACE ON EARTH",
    tag: "Travel",
    accent: "text-cyan-300",
  },
  {
    image: "https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
    text: "I BROKE THE WORLD RECORD",
    tag: "Gaming",
    accent: "text-emerald-300",
  },
  {
    image: "https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg",
    text: "24 HOURS WITHOUT INTERNET (FAILED)",
    tag: "Challenge",
    accent: "text-pink-300",
  },
];

export default function Hero() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-24 pb-20 overflow-hidden">

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none opacity-100" />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-violet-500/10 blur-[120px]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-500/5 blur-[80px]" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-violet-500/5 blur-[80px]" />

      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center text-center">

        {/* Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-xs font-mono tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Powered by Advanced AI Vision Models
          </span>
        </div>

        {/* Headline */}
        <div className="mb-5">
          <h1 className="font-black text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] tracking-tight">
            <span className="text-white block">Generate Viral</span>
            <span className="block mt-1 bg-gradient-to-r from-white via-violet-300 to-violet-500 text-transparent bg-clip-text">
              Thumbnails Instantly
            </span>
          </h1>
        </div>

        {/* Sub */}
        <div className="mb-10">
          <p className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed font-medium">
            Describe your video. Our AI generates{" "}
            <span className="text-white/70">8 click-worthy thumbnails</span> in under 10 seconds — optimized for CTR.
          </p>
        </div>

        {/* Prompt box */}
        <div className="w-full max-w-2xl mb-4">
          <div className="relative group">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-violet-500/40 to-purple-500/40 opacity-0 group-focus-within:opacity-100 blur-sm transition" />

            <div className="relative flex items-center gap-3 p-2 pl-5 rounded-2xl bg-[#13131A] border border-white/10 group-focus-within:border-violet-400/40">

              <Wand2 className="w-4 h-4 text-violet-300 shrink-0" />

              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="e.g. Finance video about saving $10,000 in 1 year..."
                className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none font-medium py-2"
              />

             <Button
                variant="default"
                size="sm"
                onClick={handleGenerate}
                disabled={loading}
                className="relative overflow-hidden rounded-xl px-4 py-2 text-white font-medium border-0 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/60 hover:scale-[1.03] transition-all duration-300"
                >
                {/* glow animation layer */}
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)] opacity-40" />

                {/* shimmer line */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_2.5s_infinite]" />

                <span className="relative flex items-center gap-2">
                    {loading ? (
                    <>
                        <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Generating...
                    </>
                    ) : (
                    <>
                       ✨ Generate
                    </>
                    )}
                </span>
                </Button>
            </div>
          </div>

          <p className="text-center text-white/20 font-mono text-[10px] tracking-widest mt-3 uppercase">
            3 free generations · No credit card required
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
        {/* Primary Blue Button */}
     <Button
        size="lg"
        asChild
        className="relative rounded-xl px-6 py-6 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.03] transition-all duration-300 border-0"
        >
        <a href="/sign-up" className="flex items-center gap-2">
          Start Creating Free <ArrowRight className="w-4 h-4" />
        </a>
        </Button>

        {/* Outline Blue Button */}
      <Button
        size="lg"
        asChild
        className="rounded-xl px-6 py-6 border border-violet-500/40 text-violet-300 hover:bg-violet-500/10 hover:scale-[1.03] transition-all duration-300"
        >
        <a href="#how-it-works" className="flex items-center gap-2">
            <Play className="w-4 h-4" /> Watch Demo
        </a>
        </Button>
        </div>

        {/* Thumbnails */}
        <div className="w-full">
          <p className="text-white/20 font-mono text-[10px] tracking-[0.2em] uppercase text-center mb-5">
            — AI Generated Examples —
          </p>

     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[120px] md:auto-rows-[160px]">
        {SAMPLE_THUMBNAILS.map((t, i) => {
          const isBig = i === 0;
          return (
            <div
              key={i}
              className={`group relative rounded-xl overflow-hidden border border-white/10 hover:border-violet-400/40 transition hover:scale-[1.02]
              ${isBig ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}
              `}
            >
              {/* Image */}
             <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${t.image})` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-3">
                <span
                  className={`self-end font-mono text-[8px] px-2 py-0.5 rounded-full bg-black/50 ${t.accent}`}
                >
                  {t.tag}
                </span>
               <p className="font-extrabold text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] 
                text-[11px] md:text-sm">
                {t.text}
              </p>
              </div>
              {/* Hover glow */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-violet-500/10 transition" />
            </div>
          );
        })}
      </div>
      </div>
      </div>
    </section>
  );
}