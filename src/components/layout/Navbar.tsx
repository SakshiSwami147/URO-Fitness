"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { BarChart2, LogOut } from "lucide-react";

const BASE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const pathname = usePathname();
  const { user, isMember, logout, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkCls = (href: string) =>
    `font-condensed text-[0.85rem] font-semibold tracking-[3px] uppercase no-underline
     transition-colors duration-300
     ${pathname === href ? "text-yellow" : "text-[#666] hover:text-yellow"}`;

  // 🔥 Prevent navbar showing before auth loads
  if (loading) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] px-[5vw] h-[72px] flex items-center justify-between
        transition-all duration-300
        ${scrolled ? "bg-black/95 backdrop-blur-xl border-b border-[#1e1e1e]" : ""}`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-playfair italic font-black text-2xl tracking-widest text-yellow no-underline leading-none"
        >
          URO{" "}
          <span className="not-italic font-bold text-xl tracking-[4px] text-white">
            FITNESS
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10 list-none items-center">
          {BASE_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkCls(l.href)}>
                {l.label}
              </Link>
            </li>
          ))}

          {user && isMember && (
            <li>
              <Link
                href="/tracker"
                className={`flex items-center gap-1.5 ${linkCls("/tracker")}`}
              >
                <BarChart2 size={13} />
                Tracker
              </Link>
            </li>
          )}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {isMember && (
                <Link
                  href="/tracker"
                  className="flex items-center gap-1.5 clip-btn-sm bg-yellow text-black font-condensed font-bold text-[0.75rem] tracking-[3px] uppercase px-5 py-2.5 no-underline transition-all duration-300 hover:bg-white"
                >
                  <BarChart2 size={12} />
                  My Tracker
                </Link>
              )}

              <button
                onClick={logout}
                title="Log Out"
                className="text-[#555] hover:text-yellow transition-colors duration-300 p-1"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuth(true);
                }}
                className="font-condensed text-[0.75rem] tracking-[3px] uppercase text-[#555] hover:text-yellow transition-colors duration-300"
              >
                Log In
              </button>

              <button
                onClick={() => {
                  setAuthMode("register");
                  setShowAuth(true);
                }}
                className="clip-btn-sm bg-yellow text-black font-condensed font-bold text-[0.8rem] tracking-[3px] uppercase px-7 py-2.5 no-underline transition-all duration-300 hover:bg-white"
              >
                Join Now
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`block w-6 h-0.5 bg-yellow transition-all duration-300 ${
              open ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-yellow transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-yellow transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 top-[72px] z-[999] bg-black/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-300
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {BASE_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-bebas text-5xl tracking-[4px] text-white/50 hover:text-yellow transition-colors duration-300 no-underline"
          >
            {l.label}
          </Link>
        ))}

        {user && isMember && (
          <Link
            href="/tracker"
            className="font-bebas text-5xl tracking-[4px] text-yellow/70 hover:text-yellow transition-colors duration-300 no-underline"
          >
            Tracker
          </Link>
        )}

        {user ? (
          <button
            onClick={logout}
            className="clip-btn mt-4 border border-white/20 text-[#666] font-condensed font-bold text-[0.9rem] tracking-[3px] uppercase px-12 py-4"
          >
            Log Out
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setAuthMode("login");
                setShowAuth(true);
                setOpen(false);
              }}
              className="font-condensed text-[0.9rem] tracking-[3px] uppercase text-[#555] hover:text-yellow"
            >
              Log In
            </button>

            <button
              onClick={() => {
                setAuthMode("register");
                setShowAuth(true);
                setOpen(false);
              }}
              className="clip-btn mt-2 bg-yellow text-black font-condensed font-bold text-[0.9rem] tracking-[3px] uppercase px-12 py-4"
            >
              Join Now
            </button>
          </>
        )}
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          defaultTab={authMode}
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  );
}