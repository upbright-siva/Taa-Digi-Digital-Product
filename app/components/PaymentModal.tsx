import React, { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { CHECKOUT_URL, PRICE } from "../config";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Order-summary modal shown before checkout. Buying only happens online —
 * "Proceed to Checkout" sends the person to CHECKOUT_URL (defaults to
 * "/checkout") to complete payment.
 *
 * Styled entirely with Tailwind utility classes. Brand colors are passed
 * as Tailwind arbitrary values (e.g. bg-[#E31E24]) so this drops into any
 * Tailwind project without extra theme config — swap them for `red-600`
 * etc., or add them to tailwind.config as custom colors, if you'd rather
 * reference your own design tokens.
 */
export function PaymentModal({ open, onClose }: PaymentModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!open) {
      setMounted(false);
      return;
    }
    const raf = requestAnimationFrame(() => setMounted(true));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm transition-opacity duration-200 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
        onClick={(e) => e.stopPropagation()}
        className={`p-3 relative w-full max-w-[400px] overflow-hidden rounded-[22px] bg-white shadow-[0_44px_100px_rgba(0,0,0,0.45)] transition-all duration-200 ${
          mounted ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xl leading-none text-white backdrop-blur-sm transition-all duration-200 hover:rotate-90 hover:bg-white/25"
        >
          ×
        </button>

        {/* Dark gradient header */}
        <div
          className="px-7 pb-7 pt-9 text-center text-white"
          style={{
            backgroundImage:
              "radial-gradient(220px 140px at 50% -20%, rgba(227,30,36,0.35), transparent 65%), linear-gradient(165deg, #170a12, #0c0c0d)",
          }}
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#E31E24]/45 bg-[#E31E24]/15 px-3 py-1.5 text-[11px] font-extrabold tracking-wide text-[#ff8a8e]">
            🔥 Limited-time price
          </span>

          <div className="mb-3 flex items-baseline justify-center gap-2 font-['Montserrat',sans-serif] text-[40px] font-extrabold leading-none text-[#FFC72C]">
            <span className="relative -top-2 text-[17px] text-white">{PRICE.currency}</span>
            {PRICE.current}
            <span className="text-[15px] font-semibold text-white/40 line-through">
              {PRICE.currency} {PRICE.original}
            </span>
          </div>

          <h3
            id="payment-modal-title"
            className="mb-1.5 font-['Montserrat',sans-serif] text-[18px] font-extrabold text-white"
          >
            TAADIGI Complete Bundle
          </h3>
          <p className="text-[13px] text-white/60">1000+ templates, all categories, lifetime access.</p>
        </div>

        {/* What's included */}
        <ul className="flex flex-col gap-2.5 px-7 py-5">
          {[
            "1000+ editable Canva templates",
            "Lifetime access",
            "Delivered instantly after payment",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-[#1a1418]">
              <Icon name="checkSmall" size={14} className="shrink-0 rounded-full bg-[#e9fbee] p-0.5 text-[#16a34a]" />
              {item}
            </li>
          ))}
        </ul>

        {/* Checkout CTA */}
        <a href={CHECKOUT_URL} target="_blank"
          className="mx-7  flex items-center justify-center gap-2.5 rounded-[13px] bg-gradient-to-r from-[#E31E24] to-[#ff4d52] py-[17px] text-[15.5px] font-extrabold text-white shadow-[0_14px_30px_rgba(227,30,36,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(227,30,36,0.5)] active:translate-y-0 active:scale-[0.99]"
        >
          <Icon name="cart" size={18} />
          Proceed to Checkout
        </a>

        {/* Trust footer */}
        <div className="flex flex-wrap items-center justify-center gap-2 px-7 pb-6 pt-5 text-[11.5px] font-semibold text-[#8a8189]">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="shield" size={13} />
            Secure payment
          </span>
          <span className="text-[#d8d1d6]">·</span>
          <span>Instant delivery</span>
          {/* <span className="text-[#d8d1d6]">·</span>
          <span>7-day support</span> */}
        </div>
      </div>
    </div>
  );
}