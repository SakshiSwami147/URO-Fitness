"use client";
import { motion } from "framer-motion";
import { PROGRAMS } from "@/lib/constants";
import SectionTag from "@/components/ui/SectionTag";

export default function Programs() {
  return (
    <section className="py-32 px-[5vw] bg-[#050505]">
      {/* Header */}
      <div className="flex justify-between items-end mb-16 flex-wrap gap-8">
        <div>
          <SectionTag>Our Programs</SectionTag>
          <h2
            className="font-bebas leading-none tracking-wide text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            TRAIN WITH <em className="text-yellow not-italic">PURPOSE</em>
          </h2>
        </div>
        <p className="max-w-[300px] text-[#666] text-[0.9rem] leading-relaxed">
          Every program is designed by world-class coaches to deliver maximum results.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e1e1e]">
        {PROGRAMS.map((program, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative bg-[#111] p-14 overflow-hidden group cursor-pointer
              hover:-translate-y-1 transition-transform duration-400"
          >
            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow/[0.08] to-transparent
              opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

            {/* Big background number */}
            <span className="absolute top-4 right-8 font-bebas text-[5rem] text-yellow/[0.06]
              leading-none pointer-events-none select-none
              group-hover:text-yellow/[0.14] transition-colors duration-400">
              {program.number}
            </span>

            {/* Icon box */}
            <div className="relative z-10 clip-btn-sm w-[50px] h-[50px] mb-8 flex items-center justify-center
              text-2xl bg-yellow/10 border border-yellow/20
              group-hover:bg-yellow/20 group-hover:border-yellow transition-all duration-300">
              {program.icon}
            </div>

            <h3 className="relative z-10 font-condensed text-[1.8rem] font-bold tracking-[2px] uppercase text-white mb-4">
              {program.name}
            </h3>
            <p className="relative z-10 text-[0.9rem] leading-relaxed text-[#666] mb-8">
              {program.desc}
            </p>
            <div className="relative z-10 font-condensed text-[0.75rem] tracking-[3px] uppercase text-yellow
              flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
              View Program <span>→</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
