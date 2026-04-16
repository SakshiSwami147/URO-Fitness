"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { SITE_CONFIG, BUSINESS_HOURS } from "@/lib/constants";
import SectionTag from "@/components/ui/SectionTag";

const PROGRAM_OPTIONS = [
  "Strength & Power",
  "Fat Loss Elite",
  "CrossFit WOD",
  "Personal Training",
  "General Membership",
];

type FormState = {
  fname: string; lname: string; email: string;
  phone: string; program: string; goal: string;
};

const INITIAL: FormState = { fname:"", lname:"", email:"", phone:"", program:"", goal:"" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const sendToWhatsApp = () => {
    if (!form.fname.trim()) { alert("Please enter your first name."); return; }
    if (!form.phone.trim()) { alert("Please enter your phone number."); return; }

    const msg =
      `🏋️ *New Enquiry — URO FITNESS*\n\n` +
      `*Name:* ${form.fname} ${form.lname}\n` +
      `*Phone:* ${form.phone}\n` +
      (form.email   ? `*Email:* ${form.email}\n`       : "") +
      (form.program ? `*Program:* ${form.program}\n`   : "") +
      (form.goal    ? `\n*Fitness Goal:*\n${form.goal}` : "");

    window.open(
      `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputCls =
    "w-full bg-[#111] border border-[#1e1e1e] text-white font-barlow text-[0.95rem] " +
    "px-4 py-3.5 outline-none transition-all duration-300 " +
    "focus:border-yellow focus:bg-yellow/[0.02] placeholder:text-[#444]";

  return (
    <div className="bg-[#050505] grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-24 px-[5vw] py-32">

      {/* ── Form ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionTag>Join The Elite</SectionTag>
        <h2 className="font-bebas text-5xl tracking-wide text-white mb-2">
          Start Your Journey
        </h2>
        <p className="text-[#666] mb-10 font-barlow">
          Fill in your details and we'll reply on WhatsApp within 1 hour.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="font-condensed text-[0.7rem] tracking-[3px] uppercase text-[#666]">First Name</label>
            <input name="fname" value={form.fname} onChange={handleChange}
              placeholder="Arjun" className={inputCls} />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="font-condensed text-[0.7rem] tracking-[3px] uppercase text-[#666]">Last Name</label>
            <input name="lname" value={form.lname} onChange={handleChange}
              placeholder="Kapoor" className={inputCls} />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="font-condensed text-[0.7rem] tracking-[3px] uppercase text-[#666]">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="arjun@email.com" className={inputCls} />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="font-condensed text-[0.7rem] tracking-[3px] uppercase text-[#666]">Phone Number</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange}
              placeholder="+91 98765 43210" className={inputCls} />
          </div>

          {/* Program */}
          <div className="flex flex-col gap-2 col-span-full">
            <label className="font-condensed text-[0.7rem] tracking-[3px] uppercase text-[#666]">Interested Program</label>
            <select name="program" value={form.program} onChange={handleChange} className={inputCls}>
              <option value="">Select a program</option>
              {PROGRAM_OPTIONS.map((p) => (
                <option key={p} style={{ background: "#111" }}>{p}</option>
              ))}
            </select>
          </div>

          {/* Goal */}
          <div className="flex flex-col gap-2 col-span-full">
            <label className="font-condensed text-[0.7rem] tracking-[3px] uppercase text-[#666]">Your Fitness Goal</label>
            <textarea name="goal" value={form.goal} onChange={handleChange} rows={5}
              placeholder="Tell us about your current fitness level and what you want to achieve..."
              className={`${inputCls} resize-y min-h-[140px]`} />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={sendToWhatsApp}
          className={`clip-btn mt-6 w-full flex items-center justify-center gap-3 font-condensed font-bold
            text-[0.9rem] tracking-[3px] uppercase py-5 text-white transition-all duration-300
            hover:-translate-y-0.5
            ${sent ? "bg-[#1fba58]" : "bg-[#25D366] hover:bg-[#1fba58]"}`}
          style={{ boxShadow: "0 8px 30px rgba(37,211,102,0.2)" }}
        >
          <span className="text-xl">💬</span>
          {sent ? "✅ Opening WhatsApp..." : "Send via WhatsApp"}
        </button>
        <p className="text-center font-condensed text-[0.75rem] tracking-wide uppercase text-[#555] mt-3">
          📲 Opens WhatsApp with your details pre-filled — we reply within 1 hour
        </p>
      </motion.div>

      {/* ── Info Panel ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="pt-2"
      >
        <h3 className="font-bebas text-3xl tracking-wide text-white mb-6">Find Us</h3>

        {[
          { label: "Location", value: "Plot 42, Industrial Estate\nPimpri, Pune — 411018\nMaharashtra, India" },
          { label: "Phone",    value: SITE_CONFIG.phone  },
          { label: "Email",    value: SITE_CONFIG.email  },
        ].map((item) => (
          <div key={item.label} className="border-b border-[#1e1e1e] py-5">
            <div className="font-condensed text-[0.65rem] tracking-[4px] uppercase text-yellow mb-1">
              {item.label}
            </div>
            <div className="text-[0.95rem] text-white/80 leading-relaxed whitespace-pre-line font-barlow">
              {item.value}
            </div>
          </div>
        ))}

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-[#25D366] text-white font-condensed font-bold
            text-[0.85rem] tracking-[2px] uppercase px-6 py-4 mt-6 w-full no-underline
            hover:bg-[#1fba58] transition-colors duration-300"
        >
          <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
            💬
          </span>
          Chat on WhatsApp — Quick Response
        </a>

        {/* Business Hours */}
        <div className="mt-10">
          <h3 className="font-bebas text-2xl tracking-wide text-white mb-2">Hours</h3>
          <div className="flex flex-col">
            {BUSINESS_HOURS.map((h, i) => (
              <div
                key={i}
                className={`flex justify-between py-3 font-barlow
                  ${i < BUSINESS_HOURS.length - 1 ? "border-b border-[#1e1e1e]" : ""}`}
              >
                <span className="font-condensed tracking-wide text-[#666]">{h.day}</span>
                <span className={`text-[0.9rem] ${h.today ? "text-yellow" : "text-white"}`}>
                  {h.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Google Map */}
        {/*
          ⚙️ TO UPDATE MAP: Go to maps.google.com → search your address
          → Click Share → Embed a map → copy the src URL and replace below
        */}
        <div className="w-full mt-8 overflow-hidden border border-[#1e1e1e]" style={{ aspectRatio: "16/9" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.0!2d73.7850!3d18.4590!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sURO%20FITNESS%20CLUB%20NANDED%20CITY!5e0!3m2!1sen!2sin!4v1700000000000&q=URO+FITNESS+CLUB+NANDED+CITY,+Karle+Plaza,+Barangani+Rd,+near+Nanded+Hospital,+Nanded,+Maharashtra+411068"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(0.75)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="URO FITNESS CLUB — Nanded City, Pune"
          />
        </div>
      </motion.div>
    </div>
  );
}
