"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface Props {
  planId:    string;
  planName:  string;
  amount:    number;          // in INR (e.g. 999)
  onSuccess?: () => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function RazorpayButton({ planId, planName, amount, onSuccess }: Props) {
  const { user, refreshProfile } = useAuth();
  const [loading, setLoading]    = useState(false);
  const [error,   setError]      = useState("");

  const loadScript = (): Promise<boolean> =>
    new Promise((resolve) => {
      if (document.getElementById("razorpay-sdk")) return resolve(true);
      const s  = document.createElement("script");
      s.id     = "razorpay-sdk";
      s.src    = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  const handlePayment = async () => {
    if (!user) { setError("Please log in first."); return; }
    setLoading(true);
    setError("");

    try {
      // 1. Load Razorpay SDK
      const loaded = await loadScript();
      if (!loaded) throw new Error("Razorpay SDK failed to load.");

      // 2. Create order on backend
      const orderRes = await fetch("/api/razorpay/create-order", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ amount, planId, planName }),
      });
      const orderData = await orderRes.json();
      if (!orderData.orderId) throw new Error("Failed to create order.");

      // 3. Open Razorpay checkout
      const options = {
        key:         process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:      orderData.amount,
        currency:    "INR",
        name:        "URO FITNESS",
        description: planName,
        order_id:    orderData.orderId,
        prefill: {
          name:  user.displayName || "",
          email: user.email       || "",
        },
        theme: { color: "#F5C518" },
        modal: {
          ondismiss: () => setLoading(false),
        },
        handler: async (response: {
          razorpay_order_id:   string;
          razorpay_payment_id: string;
          razorpay_signature:  string;
        }) => {
          // 4. Verify on backend
          const verifyRes = await fetch("/api/razorpay/verify-payment", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              uid:      user.uid,
              planId,
              planName,
              amount,
            }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            await refreshProfile();
            onSuccess?.();
          } else {
            setError("Payment verification failed. Contact support.");
          }
          setLoading(false);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setError(String((err as Error).message));
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="clip-btn w-full bg-yellow text-black font-condensed font-bold
          text-[0.85rem] tracking-[3px] uppercase py-4
          transition-all duration-300 hover:bg-white hover:-translate-y-0.5
          disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Processing…" : "Get Started →"}
      </button>
      {error && (
        <p className="text-red-400 font-barlow text-xs text-center">{error}</p>
      )}
    </div>
  );
}