import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-28 px-5 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] rounded-full bg-violet-500/10 blur-[140px]" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative">

        {/* Icon */}
        <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 items-center justify-center mb-8 shadow-xl shadow-violet-500/30">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        {/* Heading */}
        <h2 className="font-black text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-white mb-6 tracking-tight">
          Your next viral video
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-pink-400">
            starts with the thumbnail
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed mb-10">
          Join 50,000+ creators who use ThumbAI to grow their channels.
          Start free — no credit card, no design skills, no excuses.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Primary Button (replaced gradient variant) */}
          <Button
            asChild
            className="rounded-2xl px-8 py-6 text-base font-medium bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-500/20 transition"
          >
            <a href="/sign-up" className="flex items-center gap-2">
              Start Creating for Free <ArrowRight className="w-5 h-5" />
            </a>
          </Button>

          {/* Secondary Button */}
          <Button
            asChild
            variant="ghost"
            className="rounded-2xl px-6 py-6 text-white/70 hover:text-white hover:bg-white/5"
          >
            <a href="/sign-in">Already have an account?</a>
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
          {["No credit card", "3 free generations", "Cancel anytime", "4.9★ rated"].map((b) => (
            <div key={b} className="flex items-center gap-1.5">
              <span className="text-violet-400 text-xs">✓</span>
              <span className="font-mono text-[11px] text-white/25 tracking-wider">
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}