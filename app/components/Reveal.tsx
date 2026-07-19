import React, { JSX, useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

const DELAY_CLASS: Record<number, string> = {
  0: "",
  1: "d1",
  2: "d2",
  3: "d3",
  4: "d4",
  5: "d5",
  6: "d6",
};

/**
 * Fades + slides content in once it scrolls into view.
 * Wraps the original page's `.reveal` / `.reveal.in` CSS classes in a
 * reusable component driven by IntersectionObserver + React state.
 */
export function Reveal({ children, delay = 0, as = "div", className = "", style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as any;
  const classes = ["reveal", DELAY_CLASS[delay], visible ? "in" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} style={style}>
      {children}
    </Tag>
  );
}
