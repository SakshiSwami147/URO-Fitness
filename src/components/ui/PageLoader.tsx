"use client";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center">
      <div className="text-center">
        <div className="font-bebas text-6xl tracking-[8px] text-yellow animate-loader-pulse">
          URO
        </div>
        <div className="w-[200px] h-[2px] bg-dark-border mt-8 mx-auto overflow-hidden">
          <div className="h-full bg-yellow animate-load-progress" />
        </div>
      </div>
    </div>
  );
}
