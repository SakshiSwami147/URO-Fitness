"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursor.current) {
        cursor.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const grow = () => {
      if (cursor.current) {
        cursor.current.style.transform += " scale(1.6)";
      }
    };

    const shrink = () => {
      if (cursor.current) {
        cursor.current.style.transform =
          cursor.current.style.transform.replace(" scale(1.6)", "");
      }
    };

    document.addEventListener("mousemove", move);

    const items = document.querySelectorAll("button, a");
    items.forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      ref={cursor}
      className="fixed pointer-events-none z-[99999] 
      w-3 h-3 rounded-full bg-yellow 
      -translate-x-1/2 -translate-y-1/2
      transition-transform duration-150"
    />
  );
}