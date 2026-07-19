import React from "react";
import { Reveal } from "./Reveal";
import { PRICE } from "../config";

interface FinalCtaProps {
  onJoinClick: () => void;
}

export function FinalCta({ onJoinClick }: FinalCtaProps) {
  return (
    <section className="final">
      <div className="wrap">
        <Reveal as="h2">
          Your next 1000 ads
          <br />
          are already designed.
        </Reveal>
        <Reveal as="p" delay={1}>
          Stop starting from a blank page. Get the full Taadigi bundle today at the
          special launch price — before it goes back to {PRICE.currency} {PRICE.original}.
        </Reveal>
        <button
          type="button"
          onClick={onJoinClick}
          className="btn btn-primary"
          style={{ fontSize: "17px", padding: "20px 34px" }}
        >
          Buy Now — {PRICE.currency} {PRICE.current} Only
        </button>
      </div>
    </section>
  );
}
