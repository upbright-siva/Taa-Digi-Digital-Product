import React from "react";
import { useCountdown } from "../hooks/useCountdown";

export function TopBar() {
  const time = useCountdown();

  return (
    <div className="topbar">
      <span className="dot" />
      <span>
        Special Launch Price ends in <span className="countdown-badge">{time}</span>
      </span>
      <b>&nbsp;· Only a few licenses left at Rs 999</b>
    </div>
  );
}
