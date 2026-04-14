import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for testing the waters",
    cta: "Get Started Free",
    ctaVariant: "outline" as const,
    href: "/sign-up",
    features: [
      "3 thumbnail generations / month",
      "4 variants per generation",
      "Standard quality export (720p)",
      "Basic style presets",
      "Community support",
    ],
    popular: false,
    badge: null,
  },
  {
    name: "Creator",
    price: "$19",
    period: "/month",
    desc: "For serious content creators",
    cta: "Start 7-Day Free Trial",
    ctaVariant: "default" as const, // ✅ FIXED (removed gradient)
    href: "/sign-up?plan=creator",
    features: [
      "150 thumbnail generations / month",
      "8 variants per generation",
      "4K quality export",
      "All 80+ style presets",
      "Brand kit (colors + logo)",
      "A/B test analytics",
      "Priority generation queue",
      "Email support",
    ],
    popular: true,
    badge: "Most Popular",
  },
  {
    name: "Studio",
    price: "$59",
    period: "/month",
    desc: "For agencies and power users",
    cta: "Start 7-Day Free Trial",
    ctaVariant: "default" as const,
    href: "/sign-up?plan=studio",
    features: [
      "Unlimited generations",
      "12 variants per generation",
      "4K quality export",
      "All style presets + custom styles",
      "5 brand kits",
      "Advanced A/B analytics",
      "API access",
      "Dedicated account manager",
      "Slack support",
    ],
    popular: false,
    badge: null,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 px-5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-[11px] tracking-[0.25em] text-violet-300 uppercase mb-4">
            Pricing
          </span>

          <h2 className="font-black text-4xl md:text-5xl text-white mb-4 leading-tight">
            Simple, transparent pricing
          </h2>

          <p className="text-white/40 max-w-sm mx-auto text-sm">
            Start free. Upgrade when your channel grows. No hidden fees.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 items-start">

          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-violet-500/10 to-[#13131A] border-violet-500/40 shadow-xl shadow-violet-500/10"
                  : "bg-[#13131A] border-white/5 hover:border-white/10"
              }`}
            >

              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-violet-500 text-white text-[11px] font-mono shadow-lg">
                    <Zap className="w-3 h-3" /> {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-7">

                {/* Title */}
                <div className="mb-6">
                  <h3 className="font-bold text-white text-xl mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-white/40 text-xs">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-7">
                  <span className="text-5xl font-black text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-white/40 text-sm">
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* Button */}
                <Button
                  variant={plan.ctaVariant}
                  size="lg"
                  className="w-full rounded-xl mb-7"
                  asChild
                >
                  <a href={plan.href}>{plan.cta}</a>
                </Button>

                {/* Divider */}
                <div className="h-px bg-white/5 mb-6" />

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="w-4 h-4 mt-0.5 rounded-full bg-white/5 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white/40" />
                      </span>
                      <span className="text-white/50 text-xs">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-white/20 text-[11px] mt-8">
          All plans include SSL security · Cancel anytime
        </p>
      </div>
    </section>
  );
}