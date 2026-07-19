import { useEffect, useState } from "react";
import { OFFER_WINDOW_MS } from "../config";

// The countdown is a pure function of wall-clock time (time-since-epoch,
// modulo the window length) rather than a stored "deadline" that gets
// reset when it hits zero. That means:
//  - it never actually "ends" — it just loops forever, seamlessly
//  - every place that calls useCountdown() always shows the exact same
//    time, with no race between separate instances resetting storage
//  - it survives refreshes/new tabs with no extra state to persist
function getRemainingMs(): number {
  const elapsed = Date.now() % OFFER_WINDOW_MS;
  return OFFER_WINDOW_MS - elapsed;
}

function formatMs(diff: number): string {
  const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

/** Returns a live "HH:MM:SS" string that counts down endlessly — it loops
 * back to the top the instant it would hit zero, with no visible reset. */
export function useCountdown(): string {
  const [label, setLabel] = useState(() => formatMs(getRemainingMs()));

  useEffect(() => {
    const tick = () => setLabel(formatMs(getRemainingMs()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return label;
}