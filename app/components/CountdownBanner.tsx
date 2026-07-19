import React from "react";
import { useCountdown } from "../hooks/useCountdown";
import { PRICE } from "../config";

interface CountdownBannerProps {
  onJoinClick: () => void;
}

/** Fixed top offer bar: urgency copy + live countdown + a Join button. */
export function CountdownBanner({ onJoinClick }: CountdownBannerProps) {
  const time = useCountdown();

  return (
    <div className="countdown-banner">
      <div className="countdown-banner-inner">
        <span className="dot" />
        <span className="countdown-banner-text">
          Special Launch Price ends in{" "}
          <span className="countdown-badge">{time}</span>
          <b className="countdown-banner-sub">
            &nbsp;· Only a few licenses left at {PRICE.currency} {PRICE.current}
          </b>
        </span>
        <button type="button" onClick={onJoinClick} className="countdown-banner-cta">
          Buy Now
        </button>
      </div>
    </div>
  );
}
