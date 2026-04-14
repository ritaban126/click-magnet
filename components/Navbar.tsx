"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

  const hoverStyle =
    "rounded-lg border border-transparent text-white/70 hover:text-white " +
    "hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-violet-500/30 " +
    "hover:border-violet-400/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] " +
    "transition-all duration-300";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0D0D12]/80 backdrop-blur-2xl border-b border-white/5 shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-violet-400 flex items-center justify-center shadow-lg shadow-brand/30 group-hover:shadow-brand/50 transition-shadow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-[20px] tracking-tight text-white">
            Click<span className="text-brand-light">Magnet</span>
          </span>
        </a>

        {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2 flex-1 justify-center ml-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-4 py-2 text-xl text-sm font-medium ${hoverStyle}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

    {/* Desktop CTA — shadcn Buttons */}
 <div className="hidden md:flex items-center gap-2">
  {
    isSignedIn ? (
        <UserButton
        appearance={{
          elements: {
            avatarBox: "w-10 h-10 border border-white/10 hover:border-violet-400/40 transition-all",
          },
        }}
      />
    ) : (
      <>
      <SignInButton mode="modal">
        <Button variant="ghost" size="lg" className={hoverStyle}>
          Sign In
        </Button>
      </SignInButton>
      <SignUpButton mode="modal">
        <Button variant="ghost" size="lg" className={hoverStyle}>
          Sign Up
        </Button>
      </SignUpButton>
      </>
       )}
  </div>

    {/* Mobile burger */}
        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

       {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#13131A] border-b border-white/5 px-5 py-4 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-xl text-white/60 hover:text-white rounded-md hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}

            {/* 👇 ONLY CHANGED PART */}
            <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-white/5">
            {isSignedIn ?   <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-10 border border-white/10 hover:border-violet-400/40 transition-all",
                    },
                  }}
                />: (
                <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="lg" className={`w-full bg-black ${hoverStyle}`}>
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="ghost" size="lg" className={hoverStyle}>
                    Sign Up
                  </Button>
                </SignUpButton>
                </>
                )}
            </div>
          </div>
        )}
    </header>
  );
}