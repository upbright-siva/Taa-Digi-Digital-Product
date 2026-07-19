import React from "react";
import { Reveal } from "./Reveal";
import { CountUpStat } from "./CountUpStat";
import { stats, testimonials } from "../data";

export function ProofSection() {
  return (
    <section className="proof">
      <div className="wrap">
        <Reveal className="eyebrow">TRUSTED BY BUSINESS OWNERS ACROSS SRI LANKA</Reveal>
        <Reveal delay={1}>
          <h2 className="section-title">Real results from real buyers</h2>
        </Reveal>

        <div className="stat-row">
          {stats.map((s, i) => (
            <Reveal key={s.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <CountUpStat target={s.target} suffix={s.suffix} label={s.label} />
            </Reveal>
          ))}
        </div>

        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={((i % 3) + 1) as 1 | 2 | 3} className="testi">
              <div className="stars">★★★★★</div>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <div className="testi-user">
                <div className="avatar" style={{ background: t.color }}>
                  {t.initial}
                </div>
                <div className="info">
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
