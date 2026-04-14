import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Brandon K.",
    handle: "@brandonkreates",
    role: "2.1M Subscribers",
    avatar: "BK",
    color: "from-orange-500 to-red-600",
    quote:
      "ThumbAI literally doubled my CTR in the first month. I was spending 4 hours per thumbnail in Photoshop — now it's 5 minutes. Game changer.",
    stars: 5,
    metric: "+104% CTR",
  },
  {
    name: "Priya Sharma",
    handle: "@techwithpriya",
    role: "Tech Creator · 890K subs",
    avatar: "PS",
    color: "from-violet-500 to-purple-700",
    quote:
      "The AI actually understands context. I tell it I'm making a video about GPT-5 and it creates thumbnails that feel relevant, not generic.",
    stars: 5,
    metric: "+67% Views",
  },
  {
    name: "Kevin O.",
    handle: "@cryptohustlerkev",
    role: "Finance Channel",
    avatar: "KO",
    color: "from-emerald-500 to-teal-700",
    quote:
      "Up 34% CTR since switching. The CTR-optimized layouts are legit. Our revenue went up $3,200/mo just from better thumbnails.",
    stars: 5,
    metric: "+34% CTR",
  },
   {
    name: "Ana Vieira",
    handle: "@solotravelsana",
    role: "Travel Vlogger · 450K",
    avatar: "AV",
    color: "from-cyan-500 to-blue-600",
    quote: "Cinematic style outputs look incredible. My subscribers keep asking who designs my thumbnails — they think I have a whole creative team!",
    stars: 5,
    metric: "3× Impressions",
  },
  {
    name: "Jordan Lee",
    handle: "@gamebeastjordan",
    role: "Gaming Creator · 1.3M",
    avatar: "JL",
    color: "from-pink-500 to-rose-600",
    quote: "I generated 8 thumbnails in 12 seconds. Then A/B tested them — the ThumbAI version outperformed my hand-made one by 2.4x. Insane.",
    stars: 5,
    metric: "2.4× CTR vs manual",
  },
  {
    name: "Noor Ahmad",
    handle: "@studywithnoor",
    role: "Education Creator",
    avatar: "NA",
    color: "from-amber-500 to-orange-600",
    quote: "Clean, professional, and on-brand every single time. I set up my brand kit once and now every thumbnail looks cohesive automatically.",
    stars: 5,
    metric: "+89% Subscribers",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28 px-5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-[11px] tracking-[0.25em] text-violet-300 uppercase mb-4">
            Testimonials
          </span>

          <h2 className="font-black text-4xl md:text-5xl text-white leading-tight">
            50,000+ creators
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-pink-400">
              already love ThumbAI
            </span>
          </h2>

          <p className="text-white/40 max-w-sm mx-auto text-sm mt-4">
            Real results from real creators — not cherry-picked.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="group relative p-[1px] rounded-2xl bg-gradient-to-r from-white/10 to-white/5 hover:from-violet-500/40 hover:to-pink-500/30 transition"
            >
              <div className="bg-[#13131A] rounded-2xl p-5 h-full flex flex-col gap-4 hover:translate-y-[-4px] transition duration-300">

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-white fill-white"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/70 text-sm leading-relaxed">
                  “{t.quote}”
                </p>

                {/* Metric */}
                <div className="self-start px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                  <span className="text-violet-300 text-[11px] font-mono">
                    {t.metric}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center`}
                  >
                    <span className="text-white text-xs font-bold">
                      {t.avatar}
                    </span>
                  </div>

                  <div>
                    <p className="text-white font-semibold text-sm">
                      {t.name}
                    </p>
                    <p className="text-white/40 text-[11px]">{t.role}</p>
                  </div>

                  <span className="ml-auto text-white/30 text-[11px]">
                    {t.handle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}