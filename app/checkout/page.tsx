"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { posterImage } from "../posterImage";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  phone_country_code: string;
  password: string;
  password_confirmation: string;
}

interface FormErrors {
  [key: string]: string;
}

const COUNTRY_OPTIONS = [
  { code: "LK", dial: "+94", flag: "🇱🇰", label: "LK +94" },
  { code: "IN", dial: "+91", flag: "🇮🇳", label: "IN +91" },
  { code: "UK", dial: "+44", flag: "🇬🇧", label: "UK +44" },
];

const DEFAULT_PASSWORD = "Upbright@1234";

const PRICE = { current: 999, original: 2999, currency: "Rs" };

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "redirecting">("form");
  const [form, setForm] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    phone_country_code: "LK",
    password: DEFAULT_PASSWORD,
    password_confirmation: DEFAULT_PASSWORD,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (form.first_name.length < 3 || form.first_name.length > 50)
      e.first_name = "First name must be 3–50 characters.";
    if (form.last_name.length < 3 || form.last_name.length > 50)
      e.last_name = "Last name must be 3–50 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (form.email.length > 50)
      e.email = "Email must be 50 characters or fewer.";
    if (!form.phone_number) e.phone_number = "Phone number is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    sessionStorage.setItem("checkout_user", JSON.stringify(form));
    setStep("redirecting");

    const country = COUNTRY_OPTIONS.find((c) => c.code === form.phone_country_code);
    const dialCode = country?.dial ?? "+94";

    const base = process.env.NEXT_PUBLIC_PAYHERE_PAYMENT_LINK!;
    const params = new URLSearchParams({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: `${dialCode}${form.phone_number}`,
    });

    window.location.href = `${base}?${params.toString()}`;
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 rounded-xl border-2 text-[15px] font-medium text-[#1a1418] placeholder-gray-400 transition-all duration-200 outline-none bg-white
    ${
      errors[field]
        ? "border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-50"
        : "border-gray-200 focus:border-[#E31E24] focus:ring-4 focus:ring-red-50 hover:border-gray-300"
    }`;

  // ── Redirecting screen ──────────────────────────────────────────────────
  if (step === "redirecting") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff8f0] via-white to-red-50 px-4">
        <div className="text-center space-y-6">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-[#E31E24]/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#E31E24] to-[#A80F16] flex items-center justify-center shadow-xl shadow-red-200">
              <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-[#1a1418] font-semibold text-lg">Taking you to secure payment</p>
            <p className="text-gray-500 text-sm mt-1">Redirecting to PayHere…</p>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24] animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24] animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24] animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  // ── Checkout form ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/40 px-4 py-10 sm:py-14">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="fixed left-4 top-4 sm:left-6 sm:top-6 z-20 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/90 px-4 py-2.5 text-[13px] font-semibold text-[#1a1418] shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="mx-auto w-full max-w-5xl">
        {/* Brand */}
        <div className="flex flex-col items-center mb-10">
          <img src="/1024.png" alt="Taadigi" className="w-14 h-14 rounded-2xl mb-3 shadow-lg shadow-red-200/50" />
          <span className="text-[#1a1418] font-['Montserrat',sans-serif] font-extrabold text-2xl tracking-tight">
            taa<span className="text-[#E31E24]">digi</span>
          </span>
          <p className="text-gray-400 text-[11px] mt-1.5 tracking-[0.2em] uppercase font-semibold">
            Secure Checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 lg:gap-8 items-start">
          {/* ── Left: order summary (sticky on desktop) ── */}
          <div className="lg:sticky lg:top-10 space-y-5">
            <div className="rounded-2xl overflow-hidden shadow-xl shadow-red-200/40 bg-[#0c0c0d]">
              <div className="relative h-40">
                <img
                  src={posterImage}
                  alt="Taadigi 1000+ Meta Ad Templates"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, rgba(12,12,13,0.95) 0%, rgba(12,12,13,0.25) 55%, transparent 80%)",
                  }}
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#E31E24]/45 bg-[#E31E24]/90 px-3 py-1.5 text-[11px] font-extrabold tracking-wide text-white shadow-lg">
                  🔥 Limited-time price
                </span>
              </div>

              <div className="p-6 text-white">
                <p className="font-['Montserrat',sans-serif] font-extrabold text-[15px] uppercase tracking-wide mb-1">
                  Taadigi Complete Bundle
                </p>
                <p className="text-white/60 text-xs mb-5">1000+ Meta Ad Templates + Digital Products</p>

                <div className="flex items-end justify-between pt-5 border-t border-white/15">
                  <span className="text-white/50 text-xs">One-time payment</span>
                  <div className="text-right">
                    <div className="flex items-baseline gap-2 font-['Montserrat',sans-serif] font-extrabold text-3xl text-[#FFC72C]">
                      {PRICE.currency} {PRICE.current}
                    </div>
                    <span className="text-white/40 text-xs line-through">
                      {PRICE.currency} {PRICE.original}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <ul className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-3">
              {[
                "1000+ editable Canva templates",
                "8+ business categories covered",
                "Instant access after payment",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[#1a1418] font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#e9fbee] text-[#16a34a] flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secured by PayHere · Central Bank Approved Payment Gateway
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-9">
            <div className="flex items-center gap-3 mb-7">
              <span className="w-7 h-7 rounded-full bg-[#E31E24] text-white text-xs font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h2 className="text-[15px] font-bold text-[#1a1418]">Your Details</h2>
                <p className="text-xs text-gray-400 mt-0.5">We&apos;ll send your download link here</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">First Name</label>
                  <input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    className={inputClass("first_name")}
                  />
                  {errors.first_name && (
                    <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1">
                      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.first_name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Last Name</label>
                  <input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    className={inputClass("last_name")}
                  />
                  {errors.last_name && (
                    <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1">
                      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={inputClass("email")}
                />
                {errors.email && (
                  <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1">
                    <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Phone Number</label>
                <div className="flex gap-2">
                  <select
                    name="phone_country_code"
                    value={form.phone_country_code}
                    onChange={handleChange}
                    className="px-3 py-3.5 rounded-xl border-2 border-gray-200 text-[15px] font-medium text-[#1a1418] bg-white focus:border-[#E31E24] focus:ring-4 focus:ring-red-50 hover:border-gray-300 outline-none w-32 transition-all duration-200"
                  >
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.label}
                      </option>
                    ))}
                  </select>
                  <input
                    name="phone_number"
                    value={form.phone_number}
                    onChange={handleChange}
                    placeholder="77 123 4567"
                    className={`flex-1 ${inputClass("phone_number")}`}
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1">
                    <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {errors.phone_number}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-3 bg-gradient-to-r from-[#E31E24] to-[#ff4d52] hover:from-[#c41118] hover:to-[#e83e43] active:scale-[0.99] text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-red-200 text-[15px]"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Proceed to Payment · {PRICE.currency} {PRICE.current}
              </button>

              <p className="lg:hidden text-center text-[11px] text-gray-400 font-medium mt-2 flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secured by PayHere · Central Bank Approved
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}