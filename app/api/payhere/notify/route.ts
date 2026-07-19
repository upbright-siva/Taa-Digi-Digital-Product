import { NextRequest, NextResponse } from "next/server";

/**
 * PayHere sandbox makes a GET request to notify_url from the browser
 * before the actual POST webhook. This handler silences the 405 error.
 */
export async function GET() {
  return NextResponse.json({ received: true }, { status: 200 });
}

const LMS_API_URL = process.env.LMS_API_URL ?? "https://www.upbright.ai/api/ezycourse/webhooks/register-student-with-enrollment/GIxxdRsPeI7huaSNSGZYpC9peWtkLjHj";
const PRODUCT_ID = Number(process.env.LMS_PRODUCT_ID ?? "14584");
const PRODUCT_TYPE = process.env.LMS_PRODUCT_TYPE ?? "digital_product";
const PRICE_ID = Number(process.env.LMS_PRICE_ID ?? "298937");
const DEFAULT_PASSWORD = "Upbright@123";

/**
 * PayHere sends a POST to this endpoint when a payment is confirmed.
 * It includes: merchant_id, order_id, payment_id, payhere_amount,
 *              payhere_currency, status_code, md5sig, custom_1 (we store user JSON here),
 *              and standard customer fields.
 *
 * status_code = 2  → Success
 * status_code = 0  → Pending
 * status_code = -1 → Cancelled
 * status_code = -2 → Failed
 * status_code = -3 → Chargebacked
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const statusCode = body.get("status_code");
    const custom1 = body.get("custom_1") as string | null; // We pass user JSON in custom_1

    // Only process successful payments
    if (statusCode !== "2") {
      console.log(`[PayHere] Non-success status_code: ${statusCode}`);
      return NextResponse.json({ received: true, enrolled: false });
    }

    let userData: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      phone_country_code: string;
      password: string;
      password_confirmation: string;
    } | null = null;

    // Try to parse user data from custom_1 field
    if (custom1) {
      try {
        userData = JSON.parse(custom1);
      } catch {
        console.error("[PayHere] Failed to parse custom_1:", custom1);
      }
    }

    // Fallback: use PayHere's own customer fields if custom_1 is unavailable
    if (!userData) {
      const email = body.get("email") as string;
      const firstName = body.get("first_name") as string;
      const lastName = body.get("last_name") as string;
      if (!email || !firstName || !lastName) {
        console.error("[PayHere] Missing required customer fields in webhook");
        return NextResponse.json({ error: "Missing customer data" }, { status: 400 });
      }
      userData = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: "",
        phone_country_code: "LK",
        password: DEFAULT_PASSWORD ,
        password_confirmation: DEFAULT_PASSWORD ,
      };
    }

    // Register & enroll the student in the LMS
    const lmsPayload = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      phone_number: userData.phone_number,
      phone_country_code: "LK",
      password: DEFAULT_PASSWORD,
      password_confirmation: DEFAULT_PASSWORD,
      product_type: PRODUCT_TYPE,
      product_id: PRODUCT_ID,
      price_id: PRICE_ID,
    };

    console.log("[PayHere] Enrolling student:", userData.email);

    const lmsRes = await fetch(LMS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lmsPayload),
    });

    if (!lmsRes.ok) {
      const errorText = await lmsRes.text();
      console.error("[LMS] Enrollment failed:", lmsRes.status, errorText);
      // Return 200 to PayHere so it doesn't retry, but log the error
      return NextResponse.json({ received: true, enrolled: false, error: errorText });
    }

    const lmsData = await lmsRes.json();
    console.log("[LMS] Enrollment success:", lmsData);

    return NextResponse.json({ received: true, enrolled: true });
  } catch (err) {
    console.error("[PayHere webhook] Unhandled error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}