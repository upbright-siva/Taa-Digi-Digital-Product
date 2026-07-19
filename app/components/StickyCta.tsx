import React, { RefObject } from "react";
import { useScrollPastElement } from "../hooks/useScrollPast";
import { PRICE } from "../config";

interface StickyCtaProps {
  heroRef: RefObject<HTMLElement>;
  onJoinClick: () => void;
}

/** Bottom bar that appears once the hero has scrolled past — opens the
 * shared PaymentModal, same as every other "Buy Now" on the page. */
export function StickyCta({ heroRef, onJoinClick }: StickyCtaProps) {
  const show = useScrollPastElement(heroRef, 0.8);

  return (
    <div className={`sticky-cta${show ? " show" : ""}`}>
      <div className="info">
        <b>
          {PRICE.currency} {PRICE.current}
        </b>
        <span className="old d">
          {PRICE.currency} {PRICE.original}
        </span>
      </div>
      <button type="button" onClick={onJoinClick} className="btn btn-primary">
        Buy Now
      </button>
    </div>
  );
}