"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LMS_API_URL = process.env.LMS_API_URL ?? "https://www.upbright.ai/api/ezycourse/webhooks/register-student-with-enrollment/GIxxdRsPeI7huaSNSGZYpC9peWtkLjHj";
const PRODUCT_ID = Number(process.env.LMS_PRODUCT_ID ?? "14584");
const PRODUCT_TYPE = process.env.LMS_PRODUCT_TYPE ?? "digital_product";
const PRICE_ID = Number(process.env.LMS_PRICE_ID ?? "298937");
const PRICE = { current: 999, currency: "Rs" };

type Status = "loading" | "success" | "already_enrolled" | "error";

export default function PaymentSuccessPage() {
  const [status, setStatus] = useState<Status>("loading");
  const [userEmail, setUserEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [displayPrice, setDisplayPrice] = useState(0);

  useEffect(() => {
    const raw = sessionStorage.getItem("checkout_user");
    if (!raw) {
      setStatus("success");
      return;
    }

    let userData: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      phone_country_code: string;
      password: string;
      password_confirmation: string;
    };

    try {
      userData = JSON.parse(raw);
      setUserEmail(userData.email);
    } catch {
      setStatus("error");
      setErrorMsg("Could not read your session. Please contact support.");
      return;
    }

    const enroll = async () => {
      try {
        const res = await fetch(LMS_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            phone_number: userData.phone_number,
            phone_country_code: userData.phone_country_code,
            password: userData.password,
            password_confirmation: userData.password_confirmation,
            product_type: PRODUCT_TYPE,
            product_id: PRODUCT_ID,
            price_id: PRICE_ID,
          }),
        });

        if (res.ok) {
          sessionStorage.removeItem("checkout_user");
          setStatus("success");
        } else {
          const data = await res.json().catch(() => ({}));
          if (res.status === 409 || (data?.message ?? "").toLowerCase().includes("already")) {
            sessionStorage.removeItem("checkout_user");
            setStatus("already_enrolled");
          } else {
            setErrorMsg(data?.message ?? "Enrollment failed. Please contact support.");
            setStatus("error");
          }
        }
      } catch {
        setErrorMsg("Network error during enrollment. Please contact support.");
        setStatus("error");
      }
    };

    enroll();
  }, []);

  // Animate the price counting up to PRICE.current once enrollment succeeds
  useEffect(() => {
    if (status !== "success" && status !== "already_enrolled") return;

    let raf: number;
    const duration = 700;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayPrice(Math.round(eased * PRICE.current));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">

        {status === "loading" && (
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center animate-pulse">
              <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-700">Setting up your access…</h2>
            <p className="text-slate-500 text-sm">This will only take a moment.</p>
          </div>
        )}

        {(status === "success" || status === "already_enrolled") && (
          <div className="bg-white rounded-3xl shadow-xl shadow-emerald-100 border border-emerald-100 p-10 space-y-6">

            {/* Checkmark */}
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">Payment Successful!</h1>
              <p className="text-slate-500 text-sm mt-2">
                {status === "already_enrolled"
                  ? "Your account already has access to this product."
                  : "You're now enrolled in the TAADIGI Complete Bundle."}
              </p>
            </div>

            {/* Animated price confirmation */}
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-sm font-semibold text-slate-400">{PRICE.currency}</span>
              <span className="text-4xl font-black text-emerald-600 tabular-nums">{displayPrice}</span>
              <span className="text-xs font-semibold text-slate-400 ml-1">paid</span>
            </div>

            {/* Email notification banner */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-start gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-green-800 font-semibold text-sm">Check your inbox!</p>
                <p className="text-green-700 text-xs mt-1 leading-relaxed">
                  Your login credentials and access link have been sent to{" "}
                  {userEmail
                    ? <span className="font-semibold">{userEmail}</span>
                    : "your email address"
                  }. Check your spam folder if you don't see it within a few minutes.
                </p>
              </div>
            </div>

            {/* Credentials info box */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2">
              <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide">What's in your email</p>
              <ul className="space-y-1.5">
                {[
                  "Your Upbright account login link",
                  "Your email & default password to sign in",
                  "Direct link to the TAADIGI Complete Bundle",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                    <svg className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Product badge */}
            <div className="bg-indigo-50 rounded-2xl p-4 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">TAADIGI Complete Bundle</p>
                <p className="text-slate-500 text-xs">{userEmail || "Full access granted"}</p>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://www.upbright.ai/login"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
              >
                Go to My Course →
              </a>
              <Link
                href="/"
                className="block w-full text-slate-500 hover:text-slate-700 font-medium py-2 text-sm transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="bg-white rounded-3xl shadow-xl shadow-red-50 border border-red-100 p-10 space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Enrollment Issue</h1>
              <p className="text-slate-500 text-sm mt-2">
                Your payment was received but we encountered an issue granting access.
              </p>
              {errorMsg && (
                <p className="text-red-500 text-xs mt-3 bg-red-50 rounded-lg px-4 py-2">{errorMsg}</p>
              )}
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-left">
              <p className="text-amber-800 text-xs font-medium">
                Don't worry — your payment was captured. Please contact{" "}
                <a href="mailto:support@upbright.ai" className="underline">support@upbright.ai</a>{" "}
                with your email address and we'll sort it out within 24 hours.
              </p>
            </div>
            <Link
              href="/"
              className="block w-full text-slate-500 hover:text-slate-700 font-medium py-2 text-sm transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}