import React, { useEffect, useRef, useState } from "react";

interface CountUpStatProps {
  target: number;
  suffix?: string;
  label: string;
}

export function CountUpStat({ target, suffix = "", label }: CountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            let cur = 0;
            const step = Math.max(target / 60, 0.05);
            const id = window.setInterval(() => {
              cur += step;
              if (cur >= target) {
                cur = target;
                window.clearInterval(id);
              }
              setValue(cur);
            }, 20);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  const display = Number.isInteger(target) ? Math.round(value) : value.toFixed(1);

  return (
    <div className="stat" ref={ref}>
      <b>
        {display}
        {suffix}
      </b>
      <span>{label}</span>
    </div>
  );
}
