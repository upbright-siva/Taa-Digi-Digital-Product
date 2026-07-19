import { useEffect, useState, type RefObject } from "react";

/** Returns true once the page has been scrolled past `threshold` pixels. */
export function useScrollPast(threshold: number): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return past;
}

/** Returns true once the page has been scrolled past a fraction of a given
 * element's height — used to reveal the sticky bar only after the hero. */
export function useScrollPastElement(ref: RefObject<HTMLElement>, fraction = 0.8): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      setPast(window.scrollY > el.offsetHeight * fraction);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, fraction]);

  return past;
}