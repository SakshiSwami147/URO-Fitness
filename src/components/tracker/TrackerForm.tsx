"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

interface Props {
  onSaved: () => void;
}

export default function TrackerForm({ onSaved }: Props) {
  const { user } = useAuth();

  const today = new Date().toISOString().split("T")[0];

  const [date,     setDate]     = useState(today);
  const [weight,   setWeight]   = useState("");
  const [calories, setCalories] = useState("");
  const [workout,  setWorkout]  = useState("");
  const [duration, setDuration] = useState("");
  const [saving,   setSaving]   = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (!weight && !calories && !workout) {
      setError("Please fill in at least one field.");
      return;
    }
    setSaving(true);
    setError("");

    try {
      // Check if entry for this date already exists → update instead of create
      const q = query(
        collection(db, "tracker"),
        where("uid",  "==", user.uid),
        where("date", "==", date)
      );
      const snap = await getDocs(q);

      const payload = {
        uid:      user.uid,
        date,
        ...(weight   ? { weight:   parseFloat(weight)   } : {}),
        ...(calories ? { calories: parseInt(calories)   } : {}),
        ...(workout  ? { workout                        } : {}),
        ...(duration ? { duration: parseInt(duration)   } : {}),
        updatedAt: serverTimestamp(),
      };

      if (!snap.empty) {
        await updateDoc(doc(db, "tracker", snap.docs[0].id), payload);
      } else {
        await addDoc(collection(db, "tracker"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      setSuccess(true);
      setTimeout(() => { setSuccess(false); onSaved(); }, 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    "w-full bg-[#111] border border-[#2a2a2a] text-white font-barlow text-sm " +
    "rounded-none px-4 py-3 focus:outline-none focus:border-yellow " +
    "placeholder:text-[#444] transition-colors duration-200";

  const labelCls = "block text-[#888] font-condensed text-xs tracking-[2px] uppercase mb-2";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Date */}
      <div>
        <label className={labelCls}>Date</label>
        <input
          type="date"
          value={date}
          max={today}
          onChange={(e) => setDate(e.target.value)}
          className={inputCls}
          style={{ colorScheme: "dark" }}
        />
      </div>

      {/* Row: Weight + Calories */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            min="20"
            max="300"
            placeholder="e.g. 75.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Calories (kcal)</label>
          <input
            type="number"
            min="0"
            max="10000"
            placeholder="e.g. 2200"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* Workout */}
      <div>
        <label className={labelCls}>Workout / Activity</label>
        <input
          type="text"
          placeholder="e.g. Chest + Triceps, Deadlifts 5×5, CrossFit WOD"
          value={workout}
          onChange={(e) => setWorkout(e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Duration */}
      <div>
        <label className={labelCls}>Duration (minutes)</label>
        <input
          type="number"
          min="0"
          max="360"
          placeholder="e.g. 60"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-400 font-barlow text-sm"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={saving || success}
        whileTap={{ scale: 0.97 }}
        className={`clip-btn w-full py-4 font-condensed font-bold text-[0.85rem]
          tracking-[3px] uppercase transition-all duration-300
          ${success
            ? "bg-green-500 text-black"
            : "bg-yellow text-black hover:bg-white"
          }
          disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {saving  ? "Saving…"  :
         success ? "✓ Saved!" :
         "Save Entry"}
      </motion.button>
    </motion.form>
  );
}
