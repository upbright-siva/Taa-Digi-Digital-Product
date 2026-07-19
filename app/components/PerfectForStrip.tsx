import React from "react";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { perfectFor } from "../data";

export function PerfectForStrip() {
  return (
    <section className="strip">
      <div className="wrap">
        <Reveal as="span" className="strip-title">
          🎯 PERFECT FOR
        </Reveal>
        {perfectFor.map((item, i) => (
          <Reveal
            key={item.label}
            as="span"
            delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
            className="strip-item"
          >
            <Icon name={item.icon as any} size={19} />
            {item.label}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
