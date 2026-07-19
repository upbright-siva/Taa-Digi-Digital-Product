// -----------------------------------------------------------------------
// Central place to configure the funnel.
// -----------------------------------------------------------------------

// Where "Buy Now" sends people to complete payment online.
// Set NEXT_PUBLIC_CHECKOUT_URL in your env if this isn't a local route.
export const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL || "/checkout";

export const BUY_LINK =
  "https://wa.me/94700000000?text=" +
  encodeURIComponent(
    "Hi! I want to buy the Taadigi 1000+ Meta Ad Templates bundle for Rs 999."
  );

// Separate, optional contact channel — NOT used for buying, only for
// pre-sale questions (powers the floating WhatsApp chat button).
export const WHATSAPP_CONTACT_LINK =
  "https://wa.me/94700000000?text=" +
  encodeURIComponent("Hi! I have a question about the Taadigi 1000+ Meta Ad Templates bundle.");

export const PRICE = {
  current: 999,
  original: 2999,
  currency: "Rs",
  discountLabel: "SAVE 67%",
};

export const OFFER_WINDOW_MS = 1000 * 60 * 60 * 2; // 2-hour countdown window