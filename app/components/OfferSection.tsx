import React from "react";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { useCountdown } from "../hooks/useCountdown";
import { PRICE } from "../config";
import { valueStack, totalValue } from "../data";

interface OfferSectionProps {
  onJoinClick: () => void;
}

export function OfferSection({ onJoinClick }: OfferSectionProps) {
  const time = useCountdown();

  return (
    <section className="offer" id="buy">
      <div className="wrap" style={{ textAlign: "center" }}>
        <Reveal className="eyebrow" style={{ justifyContent: "center" }}>
          LIMITED-TIME OFFER
        </Reveal>
        <Reveal delay={1}>
          <h2 className="section-title">
            Get the entire bundle for less than a single ad design
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            Offer price ends in <span className="countdown-inline">{time}</span> — price
            returns to {PRICE.currency} {PRICE.original} after.
          </p>
        </Reveal>
      </div>

      <Reveal delay={3} className="offer-box">
        <div className="offer-top">
          <div className="lbl">
            TAADIGI <span>Complete Bundle</span>
          </div>
          <div className="stock">🔥 Only a few left at this price</div>
        </div>

        <div className="value-list">
          {valueStack.map((item) => (
            <div className="value-row" key={item.name}>
              <div className="name">
                <Icon name="checkSmall" size={17} />
                {item.name}
              </div>
              <div className="val">
                {PRICE.currency} {item.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="value-total">
          <span>Total Real Value</span>
          <span className="val">
            {PRICE.currency} {totalValue.toLocaleString()}
          </span>
        </div>

        <div className="final-price">
          <div className="tag">Today only</div>
          <div className="big">
            <sup>{PRICE.currency}</sup>
            {PRICE.current}
            <span className="old">
              {PRICE.currency} {PRICE.original}
            </span>
          </div>
          <div className="off">
            YOU SAVE {PRICE.currency} {(PRICE.original - PRICE.current).toLocaleString()} (67% OFF)
          </div>

          <button type="button" onClick={onJoinClick} className="btn btn-primary offer-cta">
            <Icon name="cart" size={18} />
            Buy Now for {PRICE.currency} {PRICE.current} — Instant Access
          </button>
          <div className="guarantee-row">
            <Icon name="shield" size={15} />
            Safe payment · Delivered instantly · Friendly support if you get stuck
          </div>
        </div>
      </Reveal>
    </section>
  );
}
