import { Sparkles } from "lucide-react";

const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "API"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  Support: ["Documentation", "Discord Community", "Twitter", "Status"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0D0D12] px-5 pt-20 pb-10">
      <div className="max-w-6xl mx-auto">

        {/* TOP GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">

          {/* Brand - LEFT */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Sparkles className="w-4 h-4 text-white"/>
              </div>

              <span className="font-bold text-[18px] text-white">
                Click<span className="text-violet-400">Magnet</span>
              </span>
            </a>

            <p className="text-white/30 text-[12px] leading-relaxed max-w-xs">
              AI-powered thumbnail generator for modern content creators.
            </p>
          </div>

          {/* Product - LEFT */}
          <div className="text-left">
            <h4 className="text-white/70 font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.Product.map((link) => (
                <li key={link}>
                  <a className="text-white/30 text-sm text-[12px] hover:text-violet-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company - RIGHT */}
          <div className="text-right md:text-left">
            <h4 className="text-white/70 font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.Company.map((link) => (
                <li key={link}>
                  <a className="text-white/30 text-sm text-[12px] hover:text-violet-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal - RIGHT */}
          <div className="text-right md:text-left">
            <h4 className="text-white/70 font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.Legal.map((link) => (
                <li key={link}>
                  <a className="text-white/30 text-sm text-[12px] hover:text-violet-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support - LEFT */}
          <div className="col-span-2 md:col-span-1 text-left">
            <h4 className="text-white/70 font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.Support.map((link) => (
                <li key={link}>
                  <a className="text-white/30 text-sm text-[12px] hover:text-violet-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/5 flex justify-between items-center text-[11px]">

          <p className="text-white/25 text-sm">
            © 2025 ThumbAI. All rights reserved.
          </p>

          <p className="text-white/20 text-sm">
            Made with <span className="text-red-400">♥</span> for creators
          </p>
        </div>
      </div>
    </footer>
  );
}