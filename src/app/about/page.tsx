import type { Metadata } from "next";
import Link from "next/link";
import SectionTag  from "@/components/ui/SectionTag";
import Marquee     from "@/components/ui/Marquee";
import Footer      from "@/components/layout/Footer";
import { TRAINERS, EQUIPMENT, WHY_US, MARQUEE_ABOUT } from "@/lib/constants";

export const metadata: Metadata = {
  title:       "About — URO FITNESS",
  description: "The story behind Pune's premium fitness brand. Founded 2018.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <div className="relative flex items-center overflow-hidden mt-[72px]" style={{ height: "70vh", minHeight: "500px" }}>
        {/* ⚙️ Replace URL with your own about-page background image */}
        <div
          className="absolute inset-0 animate-hero-zoom"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3) saturate(0.5)",
          }}
        />
        <div className="relative z-10 px-[5vw]">
          <p className="font-condensed text-[0.7rem] tracking-[5px] uppercase text-[#666] mb-4">
            URO FITNESS / <span className="text-yellow">About</span>
          </p>
          <h1
            className="font-bebas leading-none text-white"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
          >
            WE ARE <em className="text-yellow not-italic">ELITE</em>
          </h1>
          <p className="text-white/50 max-w-[420px] mt-4 leading-relaxed font-barlow">
            The story behind the brand that's redefining premium fitness in India.
          </p>
        </div>
      </div>

      {/* ── Brand Story ── */}
      <section className="py-32 px-[5vw] bg-[#050505] grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        {/* Image */}
        <div className="relative">
          {/* ⚙️ Replace with your own brand/gym photo */}
          <img
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
            alt="URO Fitness Story"
            className="w-full object-cover"
            style={{
              aspectRatio: "4/5",
              filter: "grayscale(20%) brightness(0.8)",
              clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)",
            }}
          />
          {/* Year badge */}
          <div
            className="absolute bottom-12 right-0 lg:-right-8 bg-yellow text-black p-8 text-center"
            style={{ clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
          >
            <div className="font-bebas text-5xl leading-none">2012</div>
            <div className="font-condensed text-[0.65rem] tracking-[3px] uppercase font-bold">EST.</div>
          </div>
        </div>

        {/* Text */}
        <div>
          <SectionTag>Our Story</SectionTag>
          <h2
            className="font-bebas leading-none text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            FROM PASSION
            <em className="text-yellow not-italic block">TO LEGACY</em>
          </h2>
          <p className="text-white/60 leading-relaxed mb-6 font-barlow font-light">
            URO FITNESS was born from a simple belief: that everyone deserves access to
            real, results-driven training without the fancy extras. Founded in Pune in 2012
            by certified coach Nilesh Phulare, URO started with a clear vision — no gimmicks,
            just pure, structured workout that delivers actual results.
          </p>
          <blockquote className="border-l-[3px] border-yellow pl-6 text-[1.1rem] italic text-white/80 leading-relaxed my-8 font-barlow">
            "No fancy! Pure workout! We built URO FITNESS for people who are serious about
            their fitness — not the aesthetics of a gym."
          </blockquote>
          <p className="text-white/60 leading-relaxed font-barlow font-light">
            Today, URO FITNESS CLUB is located in Nanded City, Pune — a well-equipped facility
            with certified coaches, separate sections for ladies and gents, and programs ranging
            from strength and CrossFit to Zumba, Yoga, and AB's batches. Cost-effective,
            clean, and community-driven.
          </p>
        </div>
      </section>

      <Marquee items={MARQUEE_ABOUT} />

      {/* ── Trainers ── */}
      <section className="py-32 px-[5vw] bg-[#0d0d0d]">
        <SectionTag>The Team</SectionTag>
        <h2
          className="font-bebas leading-none text-white mb-16"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          MEET YOUR <em className="text-yellow not-italic">COACHES</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e1e1e]">
          {TRAINERS.map((trainer, i) => (
            <div key={i} className="bg-[#111] overflow-hidden relative group cursor-pointer">
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                {/* ⚙️ Change trainer.image in src/lib/constants.ts */}
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover transition-all duration-700
                    group-hover:scale-110"
                  style={{ filter: "grayscale(40%) brightness(0.7)" }}
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-8"
                  style={{ background: "linear-gradient(to top, rgba(5,5,5,0.95) 30%, transparent 70%)" }}
                >
                  <div className="font-condensed text-[0.7rem] tracking-[3px] text-yellow uppercase mb-1">
                    {trainer.specialty}
                  </div>
                  <div className="font-condensed text-[1.6rem] font-bold tracking-wide uppercase text-white mb-1">
                    {trainer.name}
                  </div>
                  <div className="text-[0.8rem] text-[#666] font-barlow">{trainer.exp}</div>
                  <div className="flex gap-3 mt-4 opacity-0 translate-y-2
                    group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                    {["IG", "YT"].map((s) => (
                      <div
                        key={s}
                        className="w-8 h-8 bg-yellow/15 border border-yellow/30 flex items-center justify-center
                          text-[0.75rem] text-yellow cursor-pointer font-condensed font-bold
                          hover:bg-yellow hover:text-black transition-all duration-300"
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Equipment ── */}
      <section className="py-32 px-[5vw] bg-[#050505]">
        <SectionTag>World-Class Facilities</SectionTag>
        <h2
          className="font-bebas leading-none text-white mb-16"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          EQUIPMENT THAT <em className="text-yellow not-italic">PERFORMS</em>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1e1e1e]">
          {EQUIPMENT.map((item, i) => (
            <div
              key={i}
              className="bg-[#111] p-10 text-center hover:bg-yellow/[0.05]
                transition-colors duration-300 cursor-pointer"
            >
              <span className="text-4xl block mb-4">{item.emoji}</span>
              <div className="font-condensed text-[1rem] font-bold tracking-[2px] uppercase text-white mb-2">
                {item.name}
              </div>
              <div className="text-[0.8rem] text-[#666] leading-relaxed font-barlow font-light">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why URO ── */}
      <section className="py-32 px-[5vw] bg-[#0d0d0d]">
        <SectionTag>Why URO</SectionTag>
        <h2
          className="font-bebas leading-none text-white mb-16"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          THE URO <em className="text-yellow not-italic">DIFFERENCE</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1e1e]">
          {WHY_US.map((item, i) => (
            <div
              key={i}
              className="bg-[#111] p-12 flex gap-6 group hover:bg-yellow/[0.03]
                transition-colors duration-300"
            >
              <span className="font-bebas text-5xl text-yellow/30 leading-none flex-shrink-0
                group-hover:text-yellow/80 transition-colors duration-300">
                {item.num}
              </span>
              <div>
                <h3 className="font-condensed text-[1.2rem] font-bold tracking-[2px] uppercase text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-[0.9rem] text-[#666] leading-relaxed font-barlow font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-40 px-[5vw] text-center bg-[#050505]">
        <h2
          className="font-bebas leading-[0.95] text-white mb-8"
          style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
        >
          READY TO TRAIN
          <em className="text-yellow not-italic block">AT THE TOP?</em>
        </h2>
        <p className="text-[#666] max-w-[380px] mx-auto mb-12 leading-relaxed font-barlow">
          Your elite fitness journey begins with a single decision. Make it today.
        </p>
        <Link
          href="/contact"
          className="clip-btn inline-block bg-yellow text-black font-condensed font-bold
            text-[0.85rem] tracking-[3px] uppercase px-12 py-4 no-underline
            transition-all duration-300 hover:bg-white hover:-translate-y-0.5"
        >
          Join URO Today
        </Link>
      </section>

      <Footer />
    </>
  );
}
