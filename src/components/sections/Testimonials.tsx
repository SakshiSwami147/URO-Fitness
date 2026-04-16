"use client";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import SectionTag from "@/components/ui/SectionTag";

export default function Testimonials() {
  return (
    <section className="py-32 px-[5vw] bg-[#050505]">
      <SectionTag>Testimonials</SectionTag>
      <h2
        className="font-bebas leading-none tracking-wide text-white mb-16"
        style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
      >
        THEY TRAINED.{" "}
        <em className="text-yellow not-italic">THEY CONQUERED.</em>
      </h2>

      <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative min-w-[380px] bg-[#111] border border-[#1e1e1e] p-10
              snap-start flex-shrink-0 hover:border-yellow/30 hover:-translate-y-1
              transition-all duration-300"
          >
            {/* Decorative quote */}
            <span className="absolute -top-4 left-6 font-bebas text-[8rem] text-yellow/[0.06]
              leading-none pointer-events-none select-none">
              "
            </span>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, s) => (
                <span key={s} className="text-yellow text-lg">★</span>
              ))}
            </div>

            <p className="text-[1rem] leading-[1.8] text-white/80 italic mb-8">
              {t.text}
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-yellow/30 bg-[#1e1e1e]
                flex items-center justify-center font-bebas text-xl text-yellow flex-shrink-0">
                {t.initials}
              </div>
              <div>
                <h4 className="font-condensed text-[1rem] font-bold tracking-wide uppercase text-white">
                  {t.name}
                </h4>
                <span className="text-[0.75rem] text-[#666] tracking-wide">{t.role}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#1e1e1e] font-condensed text-[0.85rem]
              tracking-[2px] text-yellow uppercase">
              {t.result}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
