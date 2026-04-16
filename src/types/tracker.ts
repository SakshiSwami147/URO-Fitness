// ─── Tracker Data Types ───────────────────────────────────────

export interface TrackerEntry {
  id:          string;
  uid:         string;
  date:        string;      // "YYYY-MM-DD"
  weight?:     number;      // kg
  calories?:   number;      // kcal
  workout?:    string;      // free text description
  duration?:   number;      // minutes
  createdAt:   string;      // ISO timestamp
}

export type TrackerTab = "log" | "weight" | "calories" | "workouts";
