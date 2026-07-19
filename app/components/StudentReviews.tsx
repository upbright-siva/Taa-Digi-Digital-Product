"use client";
/**
 * StudentReviews.tsx
 * ─────────────────────────────────────────────
 * The 3 original student review cards — clean, focused, no tabs.
 * Sits directly inside the Testimonials section position.
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const SECTION_ID = "student-reviews";

const REVIEWS = [
  {
    name:    "E.M. Ammar",
    role:    "Frontend Developer",
    message: "It is very difficult to make a living without additional income in the current situation. Making money online is very difficult. They also give us clear guidance about it. Thank you so much for your amazing service🔥💙",
    avatar:  "https://lh3.googleusercontent.com/a-/ALV-UjWuWv40GKhxQCsOn91rO-zsSkxigVi3pYz1JnBF9sEMK_Ptbk4S=w72-h72-p-rp-mo-br100",
    stars:   5,
    earning: "$1,200/mo",
    earningColor: "text-green-400",
  },
  {
    name:    "Vigneswaram",
    role:    "Data Analyst",
    message: "Very believable company. It's very useful to earn money online. They give us the pro apps at the lowest price and also clear guidance about that. Thank you so much for your wonderful service🔥❤️🙏",
    avatar:  "https://lh3.googleusercontent.com/a-/ALV-UjUFCNGNm_mOvUDgSZ_NHQmq5Dn3mWKq78hOj4se0_9bYsZSYC5K=w72-h72-p-rp-mo-br100",
    stars:   5,
    earning: "$2,400/mo",
    earningColor: "text-yellow-400",
  },
  {
    name:    "Sameera",
    role:    "Digital Marketer",
    message: "I'm truly grateful to UPBRIGHT for the opportunity to complete the Fiverr course successfully. The course provided valuable knowledge, practical skills, and clear guidance throughout my learning journey. Thank you, UPBRIGHT!",
    avatar:  "https://lh3.googleusercontent.com/a-/ALV-UjW2Hp1UNCitA9hoIphb5irGoYopHLDPp6mqxfpwOuOjAwZdHlmi=w108-h108-p-rp-mo-br100",
    stars:   5,
    earning: "$900/mo",
    earningColor: "text-blue-400",
  },
];

const STATS = [
    { val: "7000+", label: "Students enrolled", color: "text-green-400" },
    { val: "4.9★", label: "Google rating", color: "text-yellow-400" },
    { val: "92%", label: "Completion rate", color: "text-blue-400" },
    { val: "5+", label: "Years of trust", color: "text-pink-400" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <motion.svg
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 300 }}
          className="w-3.5 h-3.5 text-yellow-400"
          viewBox="0 0 20 20" fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </motion.svg>
      ))}
    </div>
  );
}

export default function StudentReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const enterTimeRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id={SECTION_ID}
      className="relative py-24 bg-gray-950 text-white overflow-hidden"
    >
      {/* Parallax blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div style={{ y: blobY }} className="absolute -top-32 left-1/4 w-[500px] h-[400px] bg-green-500/5 blur-[90px] rounded-full" />
        <motion.div style={{ y: blobY }} className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-emerald-600/4 blur-[80px] rounded-full" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.012]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block text-xs font-semibold tracking-widest uppercase bg-green-500/15 text-green-400 border border-green-500/30 px-4 py-1.5 rounded-full mb-5"
          >
            ✦ Student Reviews
          </motion.span>
          {/* <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 }}
            className="text-4xl md:text-6xl font-black leading-none tracking-tight"
          >
            850+
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              5 star .
            </span>
          </motion.h2> */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
            className="mt-5 text-gray-400 text-lg max-w-xl mx-auto"
          >
            Hear from students who transformed their careers after joining UPBRIGHT.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.18 }}
            className="flex flex-wrap justify-center gap-10 mt-10"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 + i * 0.07, type: "spring", stiffness: 280 }}
                className="text-center"
              >
                <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                <p className="text-xs text-gray-500 mt-0.5 tracking-wide">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Review cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-gray-900 border border-gray-700/60 hover:border-green-500/40 p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300"
              style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
            >
              {/* Hover radial glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(34,197,94,0.07) 0%, transparent 70%)" }} />

              {/* Quote mark */}
              <span className="text-6xl text-green-500/12 font-serif leading-none select-none -mb-2">"</span>

              <Stars count={r.stars} />

              <p className="text-gray-300 text-sm leading-relaxed italic flex-1">{r.message}</p>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />

              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-full border-2 border-green-500/40" />
                  {/* Verified dot */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-2 h-2 fill-white">
                      <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{r.name}</p>
                  <p className="text-gray-500 text-xs truncate">{r.role}</p>
                </div>
                <span className={`text-xs font-bold ${r.earningColor} bg-gray-800 border border-gray-700 px-2.5 py-1 rounded-full shrink-0`}>
                  {r.earning}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          Join 7000+ students who already launched their freelance careers with UPBRIGHT.
        </motion.p>
      </div>
    </section>
  );
}