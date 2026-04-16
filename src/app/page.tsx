import Hero         from "@/components/sections/Hero";
import Stats        from "@/components/sections/Stats";
import Programs     from "@/components/sections/Programs";
import Testimonials from "@/components/sections/Testimonials";
import Marquee      from "@/components/ui/Marquee";
import Footer       from "@/components/layout/Footer";
import Link         from "next/link";
import { MARQUEE_HOME } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_HOME} />
      <Stats />
      <Programs />
      <Testimonials />

      {/* ── CTA ── */}
      <section className="relative py-40 px-[5vw] text-center overflow-hidden bg-[#050505]">
        {/* Glow */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(245,197,24,0.06) 0%, transparent 70%)" }}
          />
        </div>

        <h2
          className="font-bebas leading-[0.95] text-white mb-8 relative z-10"
          style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
        >
          YOUR TRANSFORMATION
          <em className="text-yellow not-italic block">STARTS NOW</em>
        </h2>
        <p className="text-[#666] max-w-[400px] mx-auto mb-12 leading-relaxed relative z-10 font-barlow">
          Stop settling for ordinary. Join URO FITNESS and experience what elite training truly feels like.
        </p>
        <div className="flex gap-4 justify-center flex-wrap relative z-10">
          <Link
            href="/contact"
            className="clip-btn bg-yellow text-black font-condensed font-bold text-[0.85rem]
              tracking-[3px] uppercase px-12 py-4 no-underline
              transition-all duration-300 hover:bg-white hover:-translate-y-0.5"
          >
            Start Your Journey
          </Link>
          <Link
            href="/about"
            className="clip-btn border border-white/25 text-white font-condensed font-semibold
              text-[0.85rem] tracking-[3px] uppercase px-12 py-4 no-underline
              transition-all duration-300 hover:border-yellow hover:text-yellow"
          >
            Learn More
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
