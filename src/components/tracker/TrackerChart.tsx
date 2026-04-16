"use client";
import { useMemo } from "react";
import { TrackerEntry } from "@/types/tracker";

interface Props {
  entries: TrackerEntry[];
  type: "weight" | "calories" | "duration";
}

const LABELS: Record<Props["type"], { label: string; unit: string; color: string }> = {
  weight:   { label: "Weight",   unit: "kg",   color: "#F5C518" },
  calories: { label: "Calories", unit: "kcal", color: "#e05c2a" },
  duration: { label: "Duration", unit: "min",  color: "#4fa3e0" },
};

export default function TrackerChart({ entries, type }: Props) {
  const meta = LABELS[type];

  // Sort by date, take last 14 entries
  const sorted = useMemo(
    () =>
      [...entries]
        .filter((e) => e[type] !== undefined && e[type] !== null)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-14),
    [entries, type]
  );

  if (sorted.length < 2) {
    return (
      <div className="flex items-center justify-center h-[200px] text-[#444] font-barlow text-sm">
        Log at least 2 entries to see your {meta.label.toLowerCase()} trend.
      </div>
    );
  }

  // Chart dimensions
  const W = 600, H = 220;
  const PL = 52, PR = 20, PT = 20, PB = 40;
  const chartW = W - PL - PR;
  const chartH = H - PT - PB;

  const values = sorted.map((e) => e[type] as number);
  const minV   = Math.min(...values);
  const maxV   = Math.max(...values);
  const range  = maxV - minV || 1;

  const xStep  = chartW / (sorted.length - 1);

  const points = sorted.map((e, i) => ({
    x: PL + i * xStep,
    y: PT + chartH - ((( (e[type] as number) - minV) / range) * chartH),
    date: e.date.slice(5),        // "MM-DD"
    val:  e[type] as number,
  }));

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Y-axis ticks
  const ticks = 5;
  const yTicks = Array.from({ length: ticks }, (_, i) => {
    const fraction = i / (ticks - 1);
    return {
      y:   PT + chartH - fraction * chartH,
      val: minV + fraction * range,
    };
  });

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        style={{ maxHeight: 260 }}
      >
        {/* Grid lines */}
        {yTicks.map((t, i) => (
          <g key={i}>
            <line
              x1={PL} y1={t.y} x2={W - PR} y2={t.y}
              stroke="#1e1e1e" strokeWidth="1"
            />
            <text
              x={PL - 8} y={t.y + 4}
              textAnchor="end"
              fill="#555"
              fontSize="10"
              fontFamily="Barlow, sans-serif"
            >
              {Math.round(t.val)}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <defs>
          <linearGradient id={`grad-${type}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={meta.color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={meta.color} stopOpacity="0"    />
          </linearGradient>
        </defs>
        <polygon
          points={`${points[0].x},${PT + chartH} ${polyline} ${points[points.length - 1].x},${PT + chartH}`}
          fill={`url(#grad-${type})`}
        />

        {/* Line */}
        <polyline
          points={polyline}
          fill="none"
          stroke={meta.color}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Dots + tooltips */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill={meta.color} />
            {/* Hover tooltip via title */}
            <title>{`${p.date}: ${p.val} ${meta.unit}`}</title>

            {/* X-axis label every other point to prevent crowding */}
            {i % 2 === 0 && (
              <text
                x={p.x}
                y={H - PB + 16}
                textAnchor="middle"
                fill="#555"
                fontSize="9"
                fontFamily="Barlow, sans-serif"
              >
                {p.date}
              </text>
            )}
          </g>
        ))}

        {/* Unit label */}
        <text
          x={PL - 4}
          y={PT - 6}
          fill="#666"
          fontSize="10"
          fontFamily="Barlow Condensed, sans-serif"
          letterSpacing="1"
        >
          {meta.unit}
        </text>
      </svg>
    </div>
  );
}
