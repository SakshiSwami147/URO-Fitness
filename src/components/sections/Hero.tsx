"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
const [showModal, setShowModal] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleSignup = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      membership: "free",
      createdAt: new Date(),
    });

    alert("Membership created successfully");
    setShowModal(false);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0">
        {/* ⚙️ Replace the URL below with your own hero image */}
        <div
          className="absolute inset-0 animate-hero-zoom"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.6) 50%, rgba(5,5,5,0.25) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 60%, #050505 100%)",
          }}
        />
        {/* Yellow light leak */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 30%, rgba(245,197,24,0.12) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 px-[5vw] max-w-[900px]">

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 font-condensed text-[0.75rem] font-bold tracking-[6px] text-yellow uppercase mb-6"
        >
          <span className="w-10 h-0.5 bg-yellow block" />
          Elite Performance Training
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-bebas text-white leading-[0.9]"
          style={{ fontSize: "clamp(5rem, 14vw, 13rem)", letterSpacing: "-2px" }}
        >
          BUILT
          <br />
          <em className="text-yellow not-italic">DIFFERENT</em>
          <br />
          <span
            style={{
              WebkitTextStroke: "2px rgba(255,255,255,0.15)",
              color: "transparent",
            }}
          >
            STRONGER
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-barlow font-light text-[1.1rem] text-white/60 max-w-[420px] my-8 leading-relaxed tracking-wide"
        >
          Where elite athletes are forged. Premium training, cutting-edge
          equipment, and results that redefine your limits.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-4 flex-wrap"
        >
         <button
           onClick={() => setShowModal(true)}
              className="clip-btn bg-yellow text-black font-condensed font-bold text-[0.85rem]
                 tracking-[3px] uppercase px-10 py-4 no-underline
                transition-all duration-300 hover:bg-white hover:-translate-y-0.5"
              >
               Join Now
         </button>
          <Link
            href="/about"
            className="clip-btn border border-white/25 text-white font-condensed font-semibold
              text-[0.85rem] tracking-[3px] uppercase px-10 py-4 no-underline
              transition-all duration-300 hover:border-yellow hover:text-yellow"
          >
            Explore Programs
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-condensed text-[0.65rem] tracking-[4px] text-[#666] uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-yellow to-transparent animate-scroll-pulse" />
      </motion.div>
      {showModal && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    
    <div className="bg-white p-8 rounded-lg w-[320px] text-black">

      <h2 className="text-xl mb-4 font-bold">
        Join URO Fitness
      </h2>

      <input
        type="email"
        placeholder="Enter Email"
        className="border p-2 w-full mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        className="border p-2 w-full mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="bg-yellow text-black px-4 py-2 w-full mb-2"
      >
        Create Account
      </button>

      <button
        onClick={() => setShowModal(false)}
        className="text-red-500 w-full"
      >
        Cancel
      </button>

    </div>

  </div>
)}
    </section>
  );
}
