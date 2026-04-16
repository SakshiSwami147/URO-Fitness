import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const PROGRAMS = ["Strength & Power", "Fat Loss Elite", "CrossFit WOD", "Personal Training"];
const COMPANY  = [["Home", "/"], ["About", "/about"], ["Contact", "/contact"]] as const;

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-[#1e1e1e] pt-20 pb-8 px-[5vw]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* Brand */}
        <div>
          <div className="font-playfair italic font-black text-2xl tracking-widest text-yellow mb-4">
            URO FITNESS
          </div>
          <p className="text-[0.9rem] text-[#666] leading-relaxed max-w-[280px]">
            {SITE_CONFIG.description} Built different. Train different. Live different.
          </p>
          <div className="flex gap-3 mt-6">
            {Object.entries(SITE_CONFIG.socials).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={key}
                className="clip-btn-sm w-9 h-9 bg-[#1e1e1e] flex items-center justify-center
                  text-[0.65rem] font-condensed font-bold uppercase text-[#666] no-underline
                  transition-all duration-300 hover:bg-yellow hover:text-black"
              >
                {key.slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div>
          <h4 className="font-condensed text-[0.75rem] tracking-[4px] uppercase text-[#666] mb-6">
            Programs
          </h4>
          <ul className="flex flex-col gap-3 list-none">
            {PROGRAMS.map((p) => (
              <li key={p}>
                <Link
                  href="/contact"
                  className="text-[0.9rem] text-white/50 hover:text-yellow transition-colors duration-300 no-underline"
                >
                  {p}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-condensed text-[0.75rem] tracking-[4px] uppercase text-[#666] mb-6">
            Company
          </h4>
          <ul className="flex flex-col gap-3 list-none">
            {COMPANY.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[0.9rem] text-white/50 hover:text-yellow transition-colors duration-300 no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-condensed text-[0.75rem] tracking-[4px] uppercase text-[#666] mb-6">
            Contact
          </h4>
          <ul className="flex flex-col gap-3 list-none text-[0.9rem] text-white/50">
            <li className="leading-relaxed">{SITE_CONFIG.address}</li>
            <li>{SITE_CONFIG.phone}</li>
            <li>{SITE_CONFIG.email}</li>
            <li>Mon–Sun: 5AM–11PM</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1e1e1e] pt-8 flex flex-wrap justify-between items-center gap-4">
        <p className="text-[0.8rem] text-[#666] tracking-wide">
          © 2026 URO FITNESS. All rights reserved.
        </p>
        <div className="flex gap-8">
          <Link href="#" className="text-[0.8rem] text-[#666] hover:text-yellow transition-colors no-underline">
            Privacy Policy
          </Link>
          <Link href="#" className="text-[0.8rem] text-[#666] hover:text-yellow transition-colors no-underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
