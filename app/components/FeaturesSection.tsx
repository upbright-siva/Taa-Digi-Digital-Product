import React from "react";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { features } from "../data";

export function FeaturesSection() {
  return (
    <section className="features">
      <div className="wrap">
        <Reveal className="eyebrow">WHY BUSINESSES CHOOSE TAADIGI</Reveal>
        <Reveal delay={1}>
          <h2 className="section-title">Built to save you time, not add to it</h2>
        </Reveal>

        <div className="feat-grid">
          {features.map((f, i) => (
            <Reveal key={f.label} delay={((i % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6} className="feat">
              <div className="fico">
                <Icon name={f.icon as any} size={26} />
              </div>
              <span>{f.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
