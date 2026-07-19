import React, { useRef } from "react";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { PRICE } from "../config";
import { posterImage } from "../posterImage";

interface HeroProps {
  onJoinClick: () => void;
}

export function Hero({ onJoinClick }: HeroProps) {
  const visualRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const visual = visualRef.current;
    const card = cardRef.current;
    if (!visual || !card) return;
    const r = visual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${-8 + x * 10}deg) rotateX(${3 - y * 10}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <Reveal>
            <div className="badge-pill">
              <Icon name="lightning" size={14} />
              CREATE HIGH-CONVERTING ADS IN MINUTES
            </div>
          </Reveal>

          <Reveal>
            <h1>
              1000+ <span className="accent">META AD</span>
              <br />
              <span className="grad">TEMPLATES</span> &amp; DIGITAL PRODUCTS
            </h1>
          </Reveal>

          <Reveal delay={1}>
            <p className="hero-sub">
              A complete, fully-editable Canva bundle built for Sri Lankan businesses —
              food, fashion, real estate, offers, courses and more. Stop paying a
              designer Rs 3,000+ per post. Open Canva, drop your product, publish today.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="trust-row">
              <div className="trust-item">
                <Icon name="shield" size={17} />
                100% Editable in Canva
              </div>
              <div className="trust-item">
                <Icon name="shield" size={17} />
                Instant Download
              </div>
              <div className="trust-item">
                <Icon name="shield" size={17} />
                2,300+ Businesses Using It
              </div>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div className="price-block">
              <div className="price-now">
                <sup>{PRICE.currency}</sup>
                {PRICE.current}
              </div>
              <div className="price-old">
                {PRICE.currency} {PRICE.original}
              </div>
              <div className="save-tag">{PRICE.discountLabel}</div>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div className="cta-row">
              <button type="button" onClick={onJoinClick} className="btn btn-primary">
                <Icon name="cart" size={18} />
                Buy Now — Get Instant Access
              </button>
              <a href="#included" className="btn btn-ghost">
                See what&apos;s inside
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={2} className="hero-visual-wrapper">
          <div
            className="hero-visual"
            ref={visualRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="chip chip1">
              <span className="dotc" /> 1000+ Templates Included
            </div>
            <div className="chip chip2">
              <span className="dotc" /> ⭐ 4.9/5 from buyers
            </div>
            <div className="chip chip3">
              <span className="dotc" /> Instant Download
            </div>
            <div className="poster-card" ref={cardRef}>
              <img src={posterImage} alt="Taadigi 1000+ Meta Ad Templates poster" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
