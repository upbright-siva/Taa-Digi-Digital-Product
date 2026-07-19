import React from "react";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { painPoints } from "../data";

export function PainSection() {
  return (
    <section className="pain">
      <div className="wrap">
        <Reveal className="eyebrow">THE PROBLEM</Reveal>
        <Reveal delay={1}>
          <h2 className="section-title">Every day without good ads costs you customers</h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="section-sub">
            Most business owners lose sales not because their product is weak — but
            because their posts don&apos;t stop the scroll. Sound familiar?
          </p>
        </Reveal>

        <div className="pain-grid">
          {painPoints.map((point, i) => (
            <Reveal key={point.title} delay={(i + 1) as 1 | 2 | 3} className="pain-card">
              <div className="ico">
                <Icon name={point.icon as any} size={22} />
              </div>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={4} className="pain-arrow">
          ↓ Here&apos;s the fix, ready in 1000+ templates ↓
        </Reveal>
      </div>
    </section>
  );
}
