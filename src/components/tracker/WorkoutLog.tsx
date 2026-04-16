"use client";
import { motion } from "framer-motion";
import { TrackerEntry } from "@/types/tracker";

interface Props {
  entries: TrackerEntry[];
}

export default function WorkoutLog({ entries }: Props) {
  const workouts = [...entries]
    .filter((e) => e.workout)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 20);

  if (workouts.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-[#444] font-barlow text-sm">
        No workouts logged yet. Add your first session above!
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 scrollbar-none">
      {workouts.map((e, i) => (
        <motion.div
          key={e.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          className="flex items-start gap-4 p-4 border border-[#1e1e1e] bg-[#0a0a0a] hover:border-yellow/30 transition-colors duration-200"
        >
          {/* Date pill */}
          <div className="shrink-0 text-center">
            <div className="text-yellow font-condensed font-bold text-xs tracking-[2px]">
              {new Date(e.date + "T00:00:00").toLocaleDateString("en-IN", { month: "short" }).toUpperCase()}
            </div>
            <div className="text-white font-bebas text-2xl leading-none">
              {new Date(e.date + "T00:00:00").getDate()}
            </div>
          </div>

          {/* Divider */}
          <div className="w-px self-stretch bg-[#1e1e1e]" />

          {/* Details */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-barlow text-sm leading-snug truncate">
              {e.workout}
            </p>
            <div className="flex gap-4 mt-1.5 flex-wrap">
              {e.duration && (
                <span className="text-[#555] font-condensed text-xs tracking-[1px]">
                  ⏱ {e.duration} min
                </span>
              )}
              {e.calories && (
                <span className="text-[#555] font-condensed text-xs tracking-[1px]">
                  🔥 {e.calories} kcal
                </span>
              )}
              {e.weight && (
                <span className="text-[#555] font-condensed text-xs tracking-[1px]">
                  ⚖️ {e.weight} kg
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
