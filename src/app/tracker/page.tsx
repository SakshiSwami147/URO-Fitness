"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ added
import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/layout/Footer";
import AuthModal from "@/components/auth/AuthModal";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function TrackerPage() {

  const { user, loading } = useAuth();
  const router = useRouter(); // ✅ added

  const [entries, setEntries] = useState<any[]>([]);
  const [showAuth, setShowAuth] = useState(false);

  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [workout, setWorkout] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  // ✅ FIX: redirect to home after logout
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!loading && !user) {
      setShowAuth(true);
    }
  }, [user, loading]);

  const fetchEntries = async () => {

    if (!user) return;

    const q = query(
      collection(db, "tracker"),
      where("uid", "==", user.uid),
      orderBy("date", "asc")
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, [user]);

  const calculateCaloriesBurned = () => {

    const metValues: any = {
      running: 7,
      walking: 3.5,
      cycling: 6,
      gym: 5,
      yoga: 3,
      skipping: 8,
      strength: 5
    };

    const met = metValues[workout.toLowerCase()] || 4;

    return Math.round((met * Number(weight) * Number(duration)) / 60);
  };

  const handleSave = async () => {

    if (!user) return;

    const caloriesBurned = calculateCaloriesBurned();

    await addDoc(collection(db, "tracker"), {
      uid: user.uid,
      weight: Number(weight),
      calories: Number(calories),
      protein: Number(protein),
      workout,
      duration: Number(duration),
      caloriesBurned,
      date
    });

    alert("Tracker saved successfully");

    setWeight("");
    setCalories("");
    setProtein("");
    setWorkout("");
    setDuration("");
    setDate("");

    fetchEntries();
  };

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white">

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      <div className="px-[5vw] py-20 max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          Fitness Tracker Dashboard
        </h1>

        {/* Form */}

        <div className="grid md:grid-cols-2 gap-10 mb-16">

          <div className="space-y-4">

            <input
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-4 bg-black border border-gray-700"
            />

            <input
              placeholder="Calories eaten today"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full p-4 bg-black border border-gray-700"
            />

            <input
              placeholder="Protein intake (g)"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="w-full p-4 bg-black border border-gray-700"
            />

            <input
              placeholder="Workout (running, gym, yoga)"
              value={workout}
              onChange={(e) => setWorkout(e.target.value)}
              className="w-full p-4 bg-black border border-gray-700"
            />

            <input
              placeholder="Workout duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-4 bg-black border border-gray-700"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-4 bg-black border border-gray-700"
            />

            <button
              onClick={handleSave}
              className="bg-yellow text-black px-6 py-4 w-full font-bold"
            >
              Save Tracker
            </button>

          </div>

          {/* Summary */}

          <div className="bg-black p-6 border border-gray-800">

            <h2 className="text-2xl mb-6">Today's Summary</h2>

            <p>Weight: {weight || 0} kg</p>
            <p>Calories eaten: {calories || 0}</p>
            <p>Protein: {protein || 0} g</p>
            <p>Workout: {workout || "-"}</p>
            <p>Duration: {duration || 0} min</p>
            <p className="text-yellow mt-4 text-xl">
              Calories Burned: {calculateCaloriesBurned() || 0}
            </p>

          </div>

        </div>

        {/* Graph */}

        <div className="bg-black p-6 border border-gray-800 mb-16 rounded-xl">

          <h2 className="text-2xl mb-2 font-bold">
            Daily Fitness Progress
          </h2>

          <p className="text-gray-400 mb-6">
            Track calories eaten, protein intake, calories burned and workout time daily
          </p>

          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={entries}>

              <defs>

                <linearGradient id="calories" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#facc15" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                </linearGradient>

                <linearGradient id="protein" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>

                <linearGradient id="burned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>

                <linearGradient id="duration" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>

              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#333" />

              <XAxis dataKey="date" stroke="#aaa" />
              <YAxis stroke="#aaa" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #333",
                  color: "#fff"
                }}
              />

              <Legend />

              <Area type="monotone" dataKey="calories"
                stroke="#facc15" fillOpacity={1} fill="url(#calories)" name="Calories Eaten" />

              <Area type="monotone" dataKey="protein"
                stroke="#22c55e" fillOpacity={1} fill="url(#protein)" name="Protein Intake" />

              <Area type="monotone" dataKey="caloriesBurned"
                stroke="#f97316" fillOpacity={1} fill="url(#burned)" name="Calories Burned" />

              <Area type="monotone" dataKey="duration"
                stroke="#3b82f6" fillOpacity={1} fill="url(#duration)" name="Workout Time" />

            </AreaChart>
          </ResponsiveContainer>

        </div>

        {/* History */}

        <div className="bg-black p-6 border border-gray-800">

          <h2 className="text-2xl mb-6">
            Workout History
          </h2>

          {entries.map((entry, index) => (
            <div key={index} className="border-b border-gray-700 py-4">
              <p>Date: {entry.date}</p>
              <p>Weight: {entry.weight} kg</p>
              <p>Calories: {entry.calories}</p>
              <p>Protein: {entry.protein} g</p>
              <p>Workout: {entry.workout}</p>
              <p>Duration: {entry.duration} min</p>
              <p className="text-yellow">
                Calories Burned: {entry.caloriesBurned}
              </p>
            </div>
          ))}

        </div>

      </div>

      <Footer />
    </div>
  );
}