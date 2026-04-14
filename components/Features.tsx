import {
  Zap,
  Target,
  Palette,
  Type,
  Download,
  RefreshCw,
  TrendingUp,
  Shield,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "10-Second Generation",
    desc: "8 unique thumbnail variants ready before you finish your coffee.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: Target,
    title: "CTR Optimized",
    desc: "Trained on 10M+ viral thumbnails. Our model knows exactly what drives clicks.",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
  {
    icon: Palette,
    title: "80+ Style Presets",
    desc: "Cinematic, minimal, bold, retro, neon — every aesthetic covered.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: Type,
    title: "Smart Text Placement",
    desc: "AI places headlines for max legibility on small screens automatically.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    icon: Download,
    title: "Multi-Platform Export",
    desc: "YouTube, Instagram, Twitter — exported at exact platform specs.",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: RefreshCw,
    title: "Infinite Iterations",
    desc: "Tweak in plain English. Regenerate until it's perfect.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: TrendingUp,
    title: "A/B Testing Ready",
    desc: "Export multiple variants to test performance.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    icon: Shield,
    title: "Brand Kit Support",
    desc: "Lock colors, fonts, and logo. Stay on-brand every time.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 px-5 bg-[#0D0D12]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-[11px] tracking-[0.3em] text-violet-400 uppercase mb-4">
            Features
          </span>

          <h2 className="font-black text-4xl md:text-5xl text-white leading-tight">
            Everything you need to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
              dominate your niche
            </span>
          </h2>

          <p className="text-white/40 max-w-md mx-auto text-sm mt-4">
            Every feature is built around one goal — getting more clicks on your content.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-[#13131A] border border-white/5 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10"
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition`}
              >
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-[15px] mb-2">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-white/35 text-[12px] leading-relaxed">
                {f.desc}
              </p>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-violet-500/5 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
