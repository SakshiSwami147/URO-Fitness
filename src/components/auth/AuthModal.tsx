"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";


interface Props {
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export default function AuthModal({ onClose, defaultTab = "login" }: Props) {
  const { login, register } = useAuth();

  const [tab,      setTab]      = useState<"login" | "register">(defaultTab);
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [busy,     setBusy]     = useState(false);
  const [error,    setError]    = useState("");

  const inputCls =
    "w-full bg-[#0d0d0d] border border-[#2a2a2a] text-white font-barlow text-sm " +
    "px-4 py-3 focus:outline-none focus:border-yellow placeholder:text-[#444] " +
    "transition-colors duration-200";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (tab === "login") {
        await login(email, password);
      } else {
        if (!name.trim()) { setError("Name is required."); setBusy(false); return; }
        await register(name.trim(), email, password);
      }
      onClose();
    } catch (err: unknown) {

  console.log("Firebase Error:", err);

  const msg = (err as { code?: string })?.code || "";

  if (msg.includes("user-not-found") || msg.includes("wrong-password")) {
    setError("Invalid email or password.");
  } else if (msg.includes("email-already-in-use")) {
    setError("Email already registered. Please log in.");
  } else if (msg.includes("weak-password")) {
    setError("Password must be at least 6 characters.");
  } else {
    setError(String((err as any)?.message));
  }
}
       
    finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[1100] bg-black/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-0 z-[1101] flex items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-md bg-[#0a0a0a] border border-[#1e1e1e] p-8 relative">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#555] hover:text-yellow transition-colors"
          >
            <X size={20} />
          </button>

          {/* Logo */}
          <div className="mb-8 text-center">
            <span className="font-playfair italic font-black text-xl tracking-widest text-yellow">
              URO{" "}
              <span className="not-italic font-bold text-lg tracking-[4px] text-white">
                FITNESS
              </span>
            </span>
          </div>

          {/* Tabs */}
          <div className="flex mb-8 border-b border-[#1e1e1e]">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 pb-3 font-condensed text-[0.75rem] tracking-[3px] uppercase
                  transition-colors duration-200 border-b-2 -mb-px
                  ${tab === t
                    ? "border-yellow text-yellow"
                    : "border-transparent text-[#555] hover:text-white"}`}
              >
                {t === "login" ? "Log In" : "Join Now"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "register" && (
              <div>
                <label className="block text-[#888] font-condensed text-xs tracking-[2px] uppercase mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-[#888] font-condensed text-xs tracking-[2px] uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                required
              />
            </div>

            <div>
              <label className="block text-[#888] font-condensed text-xs tracking-[2px] uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder={tab === "register" ? "Min. 6 characters" : "••••••••"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputCls}
                required
                minLength={6}
              />
            </div>

            {error && (
              <p className="text-red-400 font-barlow text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="clip-btn w-full mt-2 bg-yellow text-black font-condensed font-bold
                text-[0.85rem] tracking-[3px] uppercase py-4
                transition-all duration-300 hover:bg-white
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? "Please wait…" : tab === "login" ? "Log In" : "Create Account"}
            </button>
          </form>

          {tab === "register" && (
            <p className="mt-4 text-[#444] font-barlow text-xs text-center leading-relaxed">
              By joining, you get access to the Member Tracker — weight, calories & workout logs.
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
