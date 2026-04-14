const STEPS = [
  {
    num: "01",
    title: "Describe Your Video",
    desc: "Type a natural language prompt about your video — topic, emotion, style, target audience. No design jargon needed.",
    detail: "\"Finance video about how I saved $50k at 25, shocked expression, red and black\"",
  },
  {
    num: "02",
    title: "AI Generates 8 Variants",
    desc: "Our model produces 8 distinct thumbnails across different layouts, colors, and styles in seconds.",
    detail: "Different compositions, text placements, emotional tones — all in ~10 seconds.",
  },
  {
    num: "03",
    title: "Pick, Tweak & Export",
    desc: "Select your favorite. Adjust text, colors, or layout in our editor.",
    detail: "Export in 1280×720 (YouTube), 1:1 (Instagram), or custom sizes.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-5 relative bg-[#0D0D12]">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-[11px] tracking-[0.3em] text-violet-400 uppercase mb-4">
            How It Works
          </span>

          <h2 className="font-black text-4xl md:text-5xl text-white leading-tight">
            From idea to thumbnail
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
              in 3 simple steps
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

          {/* connector line */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

          {STEPS.map((step, i) => (
            <div
              key={i}
              className="relative group p-7 rounded-2xl bg-[#13131A] border border-white/5 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10"
            >
              {/* Number badge */}
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <span className="text-violet-400 font-bold text-sm">
                  {step.num}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-lg mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                {step.desc}
              </p>

              {/* Detail box */}
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <p className="text-white/30 text-[11px] font-mono italic leading-relaxed">
                  {step.detail}
                </p>
              </div>

              {/* hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-violet-500/5 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}