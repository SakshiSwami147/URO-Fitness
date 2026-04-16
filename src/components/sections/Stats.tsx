"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration  = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span
      ref={ref}
      className="font-bebas text-yellow leading-none tracking-wide"
      style={{ fontSize: "clamp(3.5rem, 6vw, 6rem)" }}
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <div className="bg-[#0d0d0d] border-t border-b border-[#1e1e1e]">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            className="relative py-20 px-12 text-center group overflow-hidden
              border-b md:border-b-0 md:border-r border-[#1e1e1e] last:border-0
              hover:bg-yellow/[0.03] transition-colors duration-300"
          >
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-yellow
              scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            <Counter target={stat.number} suffix={stat.suffix} />
            <div className="font-condensed text-[0.8rem] tracking-[4px] text-[#666] uppercase mt-2">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
