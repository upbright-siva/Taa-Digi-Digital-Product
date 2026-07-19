"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SECTION_ID = "trust-credentials";

const CRED_IMAGES = [
//   { src: "/review.png",            large: true,  accent: "#eab308", tagBg: "bg-yellow-500 text-black", overlay: "from-black/75 via-black/30 to-transparent", key: 1, title: "Google Reviews",       sub: "4.9★ rated by students", tag: "⭐ Verified"    },
  { src: "/behindbood.PNG",        large: false, accent: "#3b82f6", tagBg: "bg-blue-500 text-white",   overlay: "from-black/80 via-black/30 to-transparent", key: 2, title: "Behindwood Interview", sub: "Interview 2024",          tag: "🏆 Interview"  },
  { src: "/bestelearning1.jpg",    large: false, accent: "#eab308", tagBg: "bg-yellow-500 text-black", overlay: "from-black/80 via-black/30 to-transparent", key: 3, title: "Best E-Learning",      sub: "Award 2024",              tag: "🏆 Award"      },
  { src: "/anniversary.png",       large: false, accent: "#f97316", tagBg: "bg-orange-500 text-white", overlay: "from-black/80 via-black/30 to-transparent", key: 4, title: "5th Anniversary",      sub: "2020 - 2025",             tag: "🎖️ Milestone" },
  { src: "/university_seminor.jpg",large: false, accent: "#22c55e", tagBg: "bg-green-500 text-white",  overlay: "from-black/80 via-black/30 to-transparent", key: 5, title: "Fiverr Class - ICST",  sub: "13-March-2024",           tag: "🎓 Proven"     },
  { src: "/esoft_seminor.jfif",    large: false, accent: "#a855f7", tagBg: "bg-purple-500 text-white", overlay: "from-black/80 via-black/30 to-transparent", key: 6, title: "Workshop at Esoft",    sub: "08-April-2025",           tag: "🌍 Workshop"   },
];

const STAT_VALS   = ["19K+", "7K+", "4.9★", "4"];
const STAT_ICONS  = ["📣",   "🎓",  "⭐",    "🌍"];
const STAT_LABELS = ["Telegram Members", "Students Taught", "Google Rating", "Countries Registered"];
const STAT_COLORS = ["text-blue-400", "text-green-400", "text-yellow-400", "text-purple-400"];
const STAT_BG     = ["bg-blue-500/10 border-blue-500/20", "bg-green-500/10 border-green-500/20", "bg-yellow-500/10 border-yellow-500/20", "bg-purple-500/10 border-purple-500/20"];

const MOBILE_BADGES = [
  { icon: "🏛️", label: "Govt. Registered" },
  { icon: "📜", label: "Award-Winning Institute" },
  { icon: "🌐", label: "19,000+ Member Community" },
  { icon: "⭐", label: "4.9★ Google Rating" },
];

const DESKTOP_BADGES = [
  { icon: "🏛️", label: "Govt. Registered — 4 Countries" },
  { icon: "📜", label: "Award-Winning Institute" },
  { icon: "🌐", label: "19,000+ Member Community" },
  { icon: "⭐", label: "4.9★ Google Rating" },
];

// ── Credential card ───────────────────────────────────────────────────────────
function CredentialCard({ src, large, accent, tagBg, overlay, tag, title, sub, index, compact = false }:
  { src:string; large:boolean; accent:string; tagBg:string; overlay:string;
    tag:string; title:string; sub:string; index:number; compact?:boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93, y: 14 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.07, type: "spring", stiffness: 200 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative overflow-hidden rounded-2xl border cursor-pointer group transition-all duration-300 bg-gray-800/80
        ${compact ? "w-48 shrink-0 aspect-[3/4]" : "aspect-[4/3]"}
        ${large && !compact ? "md:col-span-2 md:aspect-[16/7]" : ""}`}
      style={{
        borderColor: hovered ? `${accent}55` : "rgba(255,255,255,0.08)",
        boxShadow:   hovered ? `0 0 28px ${accent}22, 0 8px 32px rgba(0,0,0,0.5)` : "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      <motion.img src={src} alt={title} animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.5 }} className="absolute inset-0 w-full h-full object-cover"/>
      <div className={`absolute inset-0 bg-gradient-to-t ${overlay}`}/>
      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent"
        initial={{ x: "-100%" }} animate={hovered ? { x: "200%" } : { x: "-100%" }}
        transition={{ duration: 0.65, ease: "easeInOut" }}/>
      <div className="absolute top-2.5 right-2.5 z-10">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagBg}`}>{tag}</span>
      </div>
      <motion.div animate={{ scaleX: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}/>
      <div className="absolute bottom-0 left-0 right-0 px-3 py-3 z-10">
        <motion.p animate={{ y: hovered ? -2 : 0 }}
          className={`text-white font-bold leading-tight ${compact ? "text-xs" : large ? "text-lg md:text-xl" : "text-sm md:text-base"}`}>
          {title}
        </motion.p>
        <motion.p animate={{ opacity: hovered ? 1 : 0.65 }}
          className="text-gray-300 text-[10px] mt-0.5 leading-tight">{sub}</motion.p>
      </div>
      <motion.div animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: `inset 0 0 36px ${accent}18` }}/>
    </motion.div>
  );
}

// ── Scroll dots ───────────────────────────────────────────────────────────────
function ScrollDots({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-3">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div key={i} animate={{ width: i === active ? 20 : 6, opacity: i === active ? 1 : 0.35 }}
          transition={{ duration: 0.25 }} className="h-1.5 rounded-full bg-green-400"/>
      ))}
    </div>
  );
}

// ── Swipe hint ────────────────────────────────────────────────────────────────
function SwipeHint() {
  const [visible, setVisible] = useState(true);
  useEffect(() => { const t = setTimeout(() => setVisible(false), 3000); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="flex items-center justify-center gap-1.5 mt-2">
          <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="text-gray-600 text-xs">←</motion.span>
          <span className="text-gray-600 text-[10px]">Swipe to see more</span>
          <motion.span animate={{ x: [0, -6, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="text-gray-600 text-xs">→</motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function TrustCredentials() {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const el = scrollRef.current; if (!el) return;
    const h = () => setActiveCard(Math.round(el.scrollLeft / (192 + 12)));
    el.addEventListener("scroll", h, { passive: true });
    return () => el.removeEventListener("scroll", h);
  }, []);

  return (
    <section id={SECTION_ID}
      className="relative py-16 md:py-24 bg-gradient-to-b from-slate-900 to-gray-950 text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 blur-3xl rounded-full pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-500/5 blur-3xl rounded-full pointer-events-none"/>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent pointer-events-none"/>

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-8 md:mb-12 px-5">
          <motion.span initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block text-[10px] font-bold tracking-widest uppercase bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 px-4 py-1.5 rounded-full mb-4">
            🏆 Trust & Credentials
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight">
            Why 7,000+ Students{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Trust UPBRIGHT
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="mt-3 text-gray-400 text-sm max-w-md mx-auto">
            Government registered. Award-winning. Globally recognised.
          </motion.p>
        </div>

        {/* ════════════════ MOBILE ════════════════ */}
        <div className="md:hidden">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-2 gap-2.5 px-4 mb-5">
            {STAT_VALS.map((val, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, type: "spring", stiffness: 260 }}
                className={`flex items-center gap-2.5 border rounded-xl px-3 py-3 ${STAT_BG[i]}`}>
                <span className="text-xl leading-none shrink-0">{STAT_ICONS[i]}</span>
                <div className="min-w-0">
                  <p className={`text-lg font-black leading-none ${STAT_COLORS[i]}`}>{val}</p>
                  <p className="text-gray-500 text-[10px] mt-0.5 leading-tight">{STAT_LABELS[i]}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mx-4 mb-4">
            <div className="relative w-full rounded-2xl overflow-hidden border border-gray-700/60" style={{ aspectRatio: "16/7" }}>
              <img src={CRED_IMAGES[0].src} alt={CRED_IMAGES[0].title} className="absolute inset-0 w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"/>
              <div className="absolute top-3 right-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${CRED_IMAGES[0].tagBg}`}>{CRED_IMAGES[0].tag}</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 px-4 py-3">
                <p className="text-white font-bold text-base leading-tight">{CRED_IMAGES[0].title}</p>
                <p className="text-gray-300 text-xs mt-0.5">{CRED_IMAGES[0].sub}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${CRED_IMAGES[0].accent}, transparent)` }}/>
            </div>
          </motion.div>

          <div ref={scrollRef} className="flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {CRED_IMAGES.slice(1).map((c, i) => (
              <div key={i} className="snap-start shrink-0">
                <CredentialCard {...c} index={i + 1} compact/>
              </div>
            ))}
          </div>

          <ScrollDots total={CRED_IMAGES.length - 1} active={activeCard}/>
          <SwipeHint/>

          <div className="flex gap-2 overflow-x-auto px-4 mt-5 pb-1" style={{ scrollbarWidth: "none" }}>
            {MOBILE_BADGES.map((b, i) => (
              <div key={i} className="shrink-0 flex items-center gap-1.5 text-xs text-gray-400 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-full whitespace-nowrap">
                <span className="text-sm">{b.icon}</span>
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════ TABLET + DESKTOP ════════════════ */}
        <div className="hidden md:block px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.15 }} className="flex flex-wrap justify-center gap-6 mb-10">
            {STAT_VALS.map((val, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.07, type: "spring", stiffness: 280 }}
                className="text-center">
                <p className={`text-2xl font-black ${STAT_COLORS[i]}`}>{val}</p>
                <p className="text-xs text-gray-500 mt-0.5 tracking-wide">{STAT_LABELS[i]}</p>
            </motion.div>
            ))}
        </motion.div>

        {/* ── Credential grid (all 6 images, proper grid layout) ── */}
        <div className="grid grid-cols-3 gap-4">
            {CRED_IMAGES.map((c, i) => {
            const { key: _key, ...rest } = c;
            return (
                <CredentialCard key={_key} {...rest} index={i} compact={false} />
            );
            })}
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }} className="mt-10 flex flex-wrap justify-center gap-3">
            {DESKTOP_BADGES.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-400 bg-gray-900 border border-gray-800 px-4 py-2 rounded-full">
                <span>{b.icon}</span>
                <span>{b.label}</span>
            </div>
            ))}
        </motion.div>
        </div>

      </div>
    </section>
  );
}