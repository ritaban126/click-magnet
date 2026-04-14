"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

// ─── Utils ────────────────────────────────────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Shadcn Button ────────────────────────────────────────────────────────────
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40 hover:from-violet-500 hover:to-violet-400",
        outline:
          "border border-white/10 bg-transparent text-white/60 hover:bg-white/5 hover:text-white hover:border-white/20",
        ghost: "text-white/40 hover:text-white hover:bg-white/5",
        secondary:
          "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-10 px-4",
        lg: "h-12 px-6 text-base rounded-xl",
        icon: "h-9 w-9 rounded-lg",
        "icon-sm": "h-7 w-7 rounded-md",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

// ─── Types ────────────────────────────────────────────────────────────────────
type ThumbnailItem = {
  id: string;
  prompt: string;
  createdAt: string;
  gradient: string;
  style: string;
  ctr: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  type: "text" | "thumbnails";
  content: string;
  thumbnails?: ThumbnailItem[];
  generating?: boolean;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const GRADIENTS = [
  "from-orange-950 via-red-900 to-zinc-950",
  "from-violet-950 via-purple-900 to-zinc-950",
  "from-cyan-950 via-sky-900 to-zinc-950",
  "from-emerald-950 via-green-900 to-zinc-950",
  "from-rose-950 via-pink-900 to-zinc-950",
  "from-amber-950 via-yellow-900 to-zinc-950",
  "from-blue-950 via-indigo-900 to-zinc-950",
  "from-teal-950 via-cyan-900 to-zinc-950",
  "from-fuchsia-950 via-pink-900 to-zinc-950",
  "from-lime-950 via-green-900 to-zinc-950",
  "from-red-950 via-rose-900 to-zinc-950",
  "from-slate-800 via-slate-900 to-zinc-950",
];
const STYLES = ["Bold", "Cinematic", "Minimal", "Neon", "Retro", "Editorial", "Dark", "Vibrant", "Dramatic", "Clean", "Intense", "Sharp"];
const CTRS   = ["7.2%", "8.4%", "5.9%", "9.1%", "6.6%", "7.8%", "8.2%", "6.3%", "9.4%", "7.0%", "8.8%", "6.1%"];

const HISTORY_DATA = [
  { group: "Today", items: [
    { id: "h1", prompt: "Finance video about saving $50K by age 25", time: "2h ago", grad: "from-orange-950 to-red-950" },
    { id: "h2", prompt: "Top 10 AI tools replacing jobs in 2025", time: "4h ago", grad: "from-violet-950 to-indigo-950" },
    { id: "h3", prompt: "Solo hiking trip across the Himalayas", time: "6h ago", grad: "from-cyan-950 to-sky-950" },
  ]},
  { group: "Yesterday", items: [
    { id: "h4", prompt: "Secret Minecraft speedrun world record", time: "Yesterday", grad: "from-emerald-950 to-green-950" },
    { id: "h5", prompt: "Morning routine that changed my life", time: "Yesterday", grad: "from-amber-950 to-yellow-950" },
  ]},
  { group: "Last 7 Days", items: [
    { id: "h6", prompt: "Living on $5 a day for a whole month", time: "3 days ago", grad: "from-rose-950 to-pink-950" },
    { id: "h7", prompt: "Building a SaaS app in 24 hours", time: "5 days ago", grad: "from-blue-950 to-indigo-950" },
    { id: "h8", prompt: "How I got 100K subscribers on YouTube", time: "6 days ago", grad: "from-teal-950 to-cyan-950" },
  ]},
];

const SUGGESTION_PROMPTS = [
  { icon: "💰", text: "Finance video — I saved $50,000 by age 25" },
  { icon: "🎮", text: "Gaming video — I broke the world speedrun record" },
  { icon: "🤖", text: "Tech video — 10 AI tools replacing your job" },
  { icon: "✈️", text: "Travel vlog — Solo trip to 5 countries in 30 days" },
];

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const SparklesIcon  = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3l1.09 2.78 2.78 1.09-2.78 1.09L12 10.74l-1.09-2.78-2.78-1.09 2.78-1.09L12 3zM5 15l.77 1.97 1.97.77-1.97.77L5 20.47l-.77-1.97-1.97-.77 1.97-.77L5 15zM19 13l.77 1.97 1.97.77-1.97.77L19 18.47l-.77-1.97-1.97-.77 1.97-.77L19 13z"/></svg>;
const PlusIcon      = ({ size = 15 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const SearchIcon    = ({ size = 13 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const SendIcon      = ({ size = 15 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const MenuIcon      = ({ size = 16 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const BellIcon      = ({ size = 15 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const DownloadIcon  = ({ size = 13 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const EyeIcon       = ({ size = 13 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const WandIcon      = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5"/></svg>;
const SettingsIcon  = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>;
const HistoryIcon   = ({ size = 14 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.54"/></svg>;
const RefreshIcon   = ({ size = 13 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>;

// ─── Typing Dots ──────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-violet-400 block"
          animate={{ y: [0, -6, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Thumbnail Card ───────────────────────────────────────────────────────────
function ThumbCard({ thumb, index }: { thumb: ThumbnailItem; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-xl overflow-hidden border border-white/5 hover:border-violet-500/40 cursor-pointer transition-colors"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className={`aspect-video bg-gradient-to-br ${thumb.gradient} relative flex flex-col justify-between p-3`}>
        <span className="self-end text-[8px] font-mono px-2 py-0.5 rounded-full bg-black/50 text-white/55">
          {thumb.style}
        </span>
        <p className="text-white font-bold text-[9px] leading-snug drop-shadow-lg line-clamp-2">
          {thumb.prompt}
        </p>
        <AnimatePresence>
          {hov && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-black/55 flex items-center justify-center gap-2"
            >
              {[EyeIcon, DownloadIcon, RefreshIcon].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-violet-500/50 border border-white/10 flex items-center justify-center text-white transition-colors"
                >
                  <Icon />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <span className="absolute top-2 left-2 text-[8px] font-mono text-white/30 bg-black/40 px-1.5 py-0.5 rounded-md">
          #{index + 1}
        </span>
      </div>
      <div className="px-3 py-2 bg-[#101018] flex items-center justify-between">
        <span className="text-[8px] font-mono text-white/20">{thumb.createdAt}</span>
        <span className="text-[9px] font-mono text-emerald-400">↑ {thumb.ctr}</span>
      </div>
    </motion.div>
  );
}

// ─── Message ──────────────────────────────────────────────────────────────────
function ChatMessage({ msg }: { msg: Message }) {
  if (msg.role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.28 }}
        className="flex justify-end"
      >
        <div className="max-w-[72%] px-4 py-2.5 rounded-2xl rounded-tr-sm bg-violet-600/18 border border-violet-500/22 text-white/85 text-sm leading-relaxed">
          {msg.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28 }}
      className="flex gap-3 items-start"
    >
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-violet-500/20">
        <SparklesIcon size={14} />
      </div>

      <div className="flex-1 min-w-0">
        {msg.generating ? (
          <div className="flex flex-col gap-1.5">
            <p className="text-[11px] font-mono text-white/35">Clickmagnet is generating…</p>
            <div className="inline-flex px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.07]">
              <TypingDots />
            </div>
          </div>
        ) : msg.type === "thumbnails" && msg.thumbnails ? (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-white/80 leading-relaxed">{msg.content}</p>
              <p className="text-[10px] font-mono text-white/30 mt-0.5">
                {msg.thumbnails.length} variants · Hover any thumbnail to download
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {msg.thumbnails.map((t, i) => (
                <ThumbCard key={t.id} thumb={t} index={i} />
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
                <DownloadIcon /> Download All
              </Button>
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                <RefreshIcon /> Regenerate
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.07] text-sm text-white/75 leading-relaxed">
            {msg.content}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Welcome ──────────────────────────────────────────────────────────────────
function WelcomeView({ onSuggestion }: { onSuggestion: (p: string) => void }) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45 }}
      className="flex flex-col items-center justify-center h-full gap-8 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-5"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center shadow-2xl shadow-violet-500/25"
          >
            <SparklesIcon size={28} />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-2 rounded-3xl bg-violet-500/10 -z-10"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            What shall I create today?
          </h2>
          <p className="text-white/40 text-sm font-mono max-w-sm">
            Describe your video and I'll generate scroll-stopping thumbnails in seconds
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl"
      >
        {SUGGESTION_PROMPTS.map((s, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.07 }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSuggestion(s.text)}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] hover:border-violet-500/25 text-left transition-all group"
          >
            <span className="text-xl">{s.icon}</span>
            <span className="text-xs text-white/55 group-hover:text-white/80 transition-colors line-clamp-1">
              {s.text}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [messages, setMessages]         = useState<Message[]>([]);
  const [input, setInput]               = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen]   = useState(true);
  const [searchQuery, setSearchQuery]   = useState("");
  const [activeHistory, setActiveHistory] = useState<string | null>(null);
  const [variantCount, setVariantCount] = useState(8);
  const [platform, setPlatform]         = useState("YouTube (16:9)");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generate = (prompt: string) => {
    if (!prompt.trim() || isGenerating) return;

    const userMsg: Message = { id: `u${Date.now()}`, role: "user", type: "text", content: prompt };
    const thinkingMsg: Message = { id: `t${Date.now()}`, role: "assistant", type: "text", content: "", generating: true };

    setMessages((prev) => [...prev, userMsg, thinkingMsg]);
    setInput("");
    setIsGenerating(true);

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    setTimeout(() => {
      const thumbs: ThumbnailItem[] = Array.from({ length: variantCount }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        prompt: prompt.length > 48 ? prompt.slice(0, 48) + "…" : prompt,
        createdAt: "Just now",
        gradient: GRADIENTS[i % GRADIENTS.length],
        style: STYLES[i % STYLES.length],
        ctr: CTRS[i % CTRS.length],
      }));

      const resultMsg: Message = {
        id: `r${Date.now()}`,
        role: "assistant",
        type: "thumbnails",
        content: `Here are ${variantCount} thumbnail variants for your video. Each uses a different visual style and layout to maximise your click-through rate.`,
        thumbnails: thumbs,
      };

      setMessages((prev) => [...prev.filter((m) => !m.generating), resultMsg]);
      setIsGenerating(false);
    }, 2800);
  };

  const handleSubmit = () => generate(input);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const filteredHistory = HISTORY_DATA
    .map((g) => ({ ...g, items: g.items.filter((i) => i.prompt.toLowerCase().includes(searchQuery.toLowerCase())) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="flex h-screen bg-[#09090E] overflow-hidden text-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── SIDEBAR ────────────────────────────────────────────────────────────*/}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col h-full w-[258px] bg-[#0B0B13] border-r border-white/[0.06] shrink-0 overflow-hidden"
          >
            {/* Logo row */}
            <div className="h-[56px] flex items-center justify-between px-4 border-b border-white/[0.06] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center shadow-md shadow-violet-500/20">
                  <SparklesIcon size={13} />
                </div>
                <Link href="/">
                <span className="font-bold text-[15px] tracking-tight">
                  Click<span className="text-violet-400">magnet</span>
                </span>
                </Link>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => { setMessages([]); setInput(""); }}
                title="New session"
                className="text-white/25 hover:text-white"
              >
                <PlusIcon />
              </Button>
            </div>

            {/* New generation button */}
            <div className="px-3 pt-3 pb-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setMessages([]); setInput(""); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-violet-500/10 hover:bg-violet-500/18 border border-violet-500/20 text-violet-400 text-[13px] font-medium transition-all"
              >
                <PlusIcon size={14} /> New Generation
              </motion.button>
            </div>

            {/* Search */}
            <div className="px-3 pb-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:border-white/10 transition-colors group">
                <span className="text-white/25 group-focus-within:text-white/50 transition-colors">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search history…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[12px] text-white placeholder-white/20 outline-none"
                />
              </div>
            </div>

            {/* History list */}
            <div className="flex-1 overflow-y-auto px-2 py-1 space-y-4">
              {filteredHistory.map((group) => (
                <div key={group.group}>
                  <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/20 px-2 mb-1.5">
                    {group.group}
                  </p>
                  <ul className="space-y-0.5">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <motion.button
                          whileHover={{ x: 2 }}
                          onClick={() => setActiveHistory(item.id)}
                          className={cn(
                            "group w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all",
                            activeHistory === item.id
                              ? "bg-white/[0.07] text-white/90"
                              : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                          )}
                        >
                          <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${item.grad} shrink-0`} />
                          <span className="truncate text-[12px]">{item.prompt}</span>
                        </motion.button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {filteredHistory.length === 0 && searchQuery && (
                <div className="px-4 py-8 text-center">
                  <p className="text-xs text-white/25 font-mono">No results for "{searchQuery}"</p>
                </div>
              )}
            </div>

            {/* Sidebar footer */}
            <div className="border-t border-white/[0.06] p-2 space-y-0.5 shrink-0">
              {[
                { icon: <HistoryIcon />, label: "View all history" },
                { icon: <SettingsIcon />, label: "Settings" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white/30 hover:text-white/65 hover:bg-white/[0.04] transition-all text-[12px]"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── MAIN ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">

        {/* Navbar */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-[56px] border-b border-white/[0.06] bg-[#09090E]/90 backdrop-blur-xl flex items-center gap-3 px-4 shrink-0"
        >
          {/* Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white/35 shrink-0"
          >
            <MenuIcon />
          </Button>

          {/* Dynamic title */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <AnimatePresence mode="wait">
              {hasMessages ? (
                <motion.p
                  key="prompt-title"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-[13px] font-semibold text-white/80 truncate"
                >
                  {messages.find((m) => m.role === "user")?.content.slice(0, 65)}
                  {(messages.find((m) => m.role === "user")?.content.length ?? 0) > 65 ? "…" : ""}
                </motion.p>
              ) : (
                <motion.div
                  key="brand-title"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-[13px] font-semibold text-white/50">
                    Thumb<span className="text-violet-400">AI</span>
                  </span>
                  <span className="text-[11px] text-white/20 font-mono hidden sm:inline">
                    AI Thumbnail Generator
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Credits */}
            <motion.div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-violet-500/8 border border-violet-500/15"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span className="text-[10px] font-mono text-violet-400/80">127 left</span>
            </motion.div>

            {/* Bell */}
            <Button variant="ghost" size="icon" className="text-white/30 relative">
              <BellIcon />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-violet-400" />
            </Button>

            {/* User */}
            <button className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-xl hover:bg-white/[0.05] transition-colors">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                RK
              </div>
              <div className="hidden md:block text-left">
                <p className="text-[12px] font-semibold text-white/80 leading-none">Rohan Kumar</p>
                <p className="text-[9px] font-mono text-white/30 mt-0.5">Creator Plan</p>
              </div>
            </button>
          </div>
        </motion.header>

        {/* Chat viewport */}
        <div className="flex-1 overflow-y-auto scroll-smooth">
          <AnimatePresence mode="wait">
            {!hasMessages ? (
              <WelcomeView
                key="welcome"
                onSuggestion={(p) => { setInput(p); textareaRef.current?.focus(); }}
              />
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="max-w-4xl mx-auto w-full px-4 py-6 space-y-7"
              >
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} msg={msg} />
                ))}
                <div ref={bottomRef} className="h-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input area */}
        <div className="border-t border-white/[0.06] bg-[#09090E]/95 backdrop-blur-xl px-4 py-4 shrink-0">
          <div className="max-w-4xl mx-auto w-full space-y-2.5">
            {/* Options strip */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono text-white/20">Variants:</span>
              {[4, 8, 12].map((n) => (
                <motion.button
                  key={n}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setVariantCount(n)}
                  className={cn(
                    "text-[10px] font-mono px-2.5 py-1 rounded-md border transition-all",
                    variantCount === n
                      ? "bg-violet-500/18 border-violet-500/40 text-violet-300"
                      : "border-white/[0.08] text-white/25 hover:border-white/20 hover:text-white/55"
                  )}
                >
                  {n}
                </motion.button>
              ))}

              <div className="flex items-center gap-1.5 ml-auto">
                <span className="text-[10px] font-mono text-white/20">Platform:</span>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="text-[10px] font-mono bg-white/[0.04] border border-white/[0.07] rounded-md px-2 py-1 text-white/40 outline-none hover:border-white/15 transition-colors cursor-pointer"
                >
                  <option>YouTube (16:9)</option>
                  <option>Instagram (1:1)</option>
                  <option>Twitter Card</option>
                  <option>Instagram Story</option>
                </select>
              </div>
            </div>

            {/* Input box */}
            <div
              className={cn(
                "relative flex items-end gap-3 px-4 py-3.5 rounded-2xl border transition-all duration-300",
                isGenerating
                  ? "border-violet-500/30 bg-violet-500/[0.04]"
                  : "border-white/[0.09] bg-white/[0.04] hover:border-white/[0.15] focus-within:border-violet-500/45 focus-within:bg-violet-500/[0.03]"
              )}
            >
              {/* Wand icon */}
              <div className="w-7 h-7 rounded-lg bg-violet-500/12 flex items-center justify-center shrink-0 mb-0.5">
                <WandIcon size={13} />
              </div>

              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                disabled={isGenerating}
                placeholder={
                  isGenerating
                    ? "Generating your thumbnails…"
                    : "Describe your video to generate thumbnails… (e.g. Finance video, shocked face, red text)"
                }
                className="flex-1 bg-transparent text-[13px] text-white placeholder-white/22 outline-none resize-none leading-relaxed max-h-40 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minHeight: "22px" }}
              />

              {/* Send button */}
              <motion.button
                whileHover={input.trim() && !isGenerating ? { scale: 1.08 } : {}}
                whileTap={input.trim() && !isGenerating ? { scale: 0.93 } : {}}
                onClick={handleSubmit}
                disabled={!input.trim() || isGenerating}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200",
                  input.trim() && !isGenerating
                    ? "bg-gradient-to-br from-violet-600 to-violet-400 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/45"
                    : "bg-white/[0.05] text-white/20 cursor-not-allowed"
                )}
              >
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </motion.svg>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <SendIcon />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Hint */}
            <p className="text-center text-[10px] font-mono text-white/12">
              <kbd className="px-1 py-0.5 rounded border border-white/10 text-white/18">Enter</kbd> to generate ·{" "}
              <kbd className="px-1 py-0.5 rounded border border-white/10 text-white/18">Shift+Enter</kbd> for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}