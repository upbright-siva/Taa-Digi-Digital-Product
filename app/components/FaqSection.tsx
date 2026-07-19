import React, { useState } from "react";
import { Reveal } from "./Reveal";
import { faqItems } from "../data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq">
      <div className="wrap" style={{ textAlign: "center" }}>
        <Reveal className="eyebrow" style={{ justifyContent: "center" }}>
          QUESTIONS
        </Reveal>
        <Reveal delay={1}>
          <h2 className="section-title">Before you go — a few quick answers</h2>
        </Reveal>
      </div>

      <div className="faq-list">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal
              key={item.q}
              delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
              className={`faq-item${isOpen ? " open" : ""}`}
            >
              <div
                className="faq-q"
                role="button"
                tabIndex={0}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setOpenIndex(isOpen ? null : i);
                }}
              >
                {item.q} <span className="plus">+</span>
              </div>
              <div
                className="faq-a"
                style={{ maxHeight: isOpen ? "400px" : "0px" }}
              >
                <p>{item.a}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
