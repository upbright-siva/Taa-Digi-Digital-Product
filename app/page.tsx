"use client";

import { useState } from "react";
import "./taadigi-funnel.css";

// ── Funnel sections ───────────────────────────────────────────────────────────
import { CountdownBanner } from "./components/CountdownBanner";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PainSection } from "./components/PainSection";
import { CategoriesSection } from "./components/CategoriesSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { PerfectForStrip } from "./components/PerfectForStrip";
import { OfferSection } from "./components/OfferSection";
import { ProofSection } from "./components/ProofSection";
import { FaqSection } from "./components/FaqSection";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { PaymentModal } from "./components/PaymentModal";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TaadigiFunnelPage() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const openPaymentModal = () => setPaymentModalOpen(true);
  const closePaymentModal = () => setPaymentModalOpen(false);

  return (
    <>
      {/* Payment method modal — shared across all CTAs */}
      <PaymentModal open={paymentModalOpen} onClose={closePaymentModal} />

      {/* Fixed offer bar + fixed nav */}
      <CountdownBanner onJoinClick={openPaymentModal} />
      <Navbar onJoinClick={openPaymentModal} />

      {/* ── TOP OF FUNNEL ── */}
      <Hero onJoinClick={openPaymentModal} />

      {/* ── PROBLEM / AGITATION ── */}
      {/* <PainSection /> */}

      {/* ── WHAT'S INCLUDED ── */}
      <CategoriesSection />
      <FeaturesSection />
      <PerfectForStrip />

      {/* ── OFFER / PRICING ── */}
      <OfferSection onJoinClick={openPaymentModal} />

      {/* ── SOCIAL PROOF ── */}
      <ProofSection />

      {/* ── FINAL PUSH ── */}
      <FinalCta onJoinClick={openPaymentModal} />

      <Footer />

      {/* <WhatsAppButton /> */}
    </>
  );
}
