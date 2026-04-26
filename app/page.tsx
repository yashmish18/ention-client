"use client";

import React from "react";
import { Laptop, ShoppingCart, GraduationCap, ArrowRight, Code, Brain, Settings, ShieldCheck, Zap, Globe, Building2, Truck, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Ticker } from "@/components/Ticker";
import { HeroCarousel } from "@/components/HeroCarousel";
import { LetterAnimation } from "@/components/LetterAnimation";
import { MainHeroCarousel } from "@/components/MainHeroCarousel";
import { VideoScrollCanvas } from "@/components/VideoScrollCanvas";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import FormModal from "@/components/FormModal";
import LeadSalesForm from "@/components/forms/LeadSalesForm";
import ProgramApplicationForm from "@/components/forms/ProgramApplicationForm";

// --- GLOBAL ANIMATION UTILS ---
const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- 1. HERO [INK] — 6-Slide Dynamic Showcase ---
const Hero = () => (
  <MainHeroCarousel />
);

// --- 2. VISION STATEMENT [BG] ---
const VisionStatement = () => {
  return (
    <section className="px-8 py-16 lg:py-24 bg-bg text-ink relative overflow-hidden border-t border-ink/5">
      <div className="max-w-[1200px] mx-auto text-center space-y-24">
        <FadeUp className="space-y-6">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black italic tracking-tighter leading-tight overflow-hidden">
            <motion.span initial={{ y: "100%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }} className="block">Building India’s </motion.span>
            <motion.span initial={{ y: "100%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="block">Computing Ecosystem</motion.span>
          </h2>
          <p className="text-sm md:text-base font-sans opacity-60 max-w-xl mx-auto leading-relaxed">
            From system integration today to indigenous hardware, OS, and AI stack—we are building long-term capability, not just products.
          </p>
        </FadeUp>
      </div>
    </section>
  );
};

const SectionHeader = ({ num, title, subtitle }: { num?: string, title: string, subtitle?: string }) => (
  <div className="flex justify-between items-end mb-12 border-b border-current/10 pb-4">
    <div>
      {num && <span className="font-mono text-xs opacity-50">— {num} / {title.toUpperCase()}</span>}
      <h2 className="text-4xl md:text-5xl mt-2 font-bold font-serif">{title}</h2>
    </div>
    {subtitle && <span className="font-mono text-[10px] opacity-40 uppercase tracking-[0.4em]">{subtitle}</span>}
  </div>
);

// --- 3. MODELS [INK] ---
const Models = () => (
  <section id="machine" className="px-8 py-16 lg:py-24 bg-ink text-bg border-t border-white/5 perspective-1000">
    <FadeUp>
      <SectionHeader title="Models we make" />
    </FadeUp>
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      <FadeUp delay={0.1} className="group relative bg-white/5 p-12 overflow-hidden border border-white/5 flex flex-col justify-between min-h-[550px] transition-all duration-700 hover:border-accent/40 shadow-2xl">
        <div className="z-10 relative">
          <h2 className="text-5xl font-serif text-bg italic mb-6">For Students</h2>
          <p className="text-bg/60 max-w-sm leading-relaxed font-sans text-sm">
            Affordable, Lightweight, durable, and built to support your learning on the go. Engineered for the next generation of Bharat.
          </p>
        </div>
        <div className="absolute inset-0 pointer-events-none scale-110 opacity-30 group-hover:opacity-40 group-hover:scale-100 transition-all duration-[1.5s] grayscale">
          <Image src="/assets/landing_page/stud.png" fill className="object-fit" alt="Student Series" unoptimized />
        </div>
        <div className="z-10 relative pt-12 mt-12">
          <Link href="/products" className="flex items-center gap-4 bg-accent text-bg px-10 py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-ink transition-all rounded-sm w-max group/btn">
            <span>Shop Now</span> <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
          </Link>
        </div>
      </FadeUp>

      <FadeUp delay={0.2} className="group relative bg-white/10 p-12 overflow-hidden border border-white/10 flex flex-col justify-between min-h-[550px] transition-all duration-700 hover:border-accent/50 shadow-2xl">
        <div className="z-10 relative">
          <h2 className="text-5xl font-serif text-bg italic mb-6">For Professionals</h2>
          <p className="text-bg/70 max-w-sm leading-relaxed font-sans text-sm">
            Customizable, seamlessly switch from work tasks to meetings with reliable performance. A powerful machine ready for code, design, or research.
          </p>
        </div>
        <div className="absolute inset-0 pointer-events-none scale-110 opacity-30 group-hover:opacity-40 group-hover:scale-100 transition-all duration-[1.5s] grayscale">
          <Image src="/assets/landing_page/prof.png" fill className="object-fit" alt="Professional Series" unoptimized />
        </div>
        <div className="z-10 relative pt-12 mt-12">
          <Link href="/products" className="flex items-center gap-4 bg-bg text-ink px-10 py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-accent hover:text-white transition-all rounded-sm shadow-xl w-max group/btn">
            <span>Explore Pro</span> <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
          </Link>
        </div>
      </FadeUp>
    </div>
  </section>
);

// --- 4. LAPTOP SOLUTIONS [BG] ---
const LaptopSolutions = ({ onLeadClick }: { onLeadClick: () => void }) => (
  <section className="px-8 py-16 lg:py-24 bg-bg text-ink border-t border-ink/5">
    <FadeUp>
      <SectionHeader title="Laptop Solutions for Every Need" />
    </FadeUp>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: "Developers’ Solution", subtitle: "Build, test, and deploy faster", features: ["Optimized for coding and virtualization", "Expandable RAM and SSD", "Linux compatibility"], btn: "Explore Developer Laptops", href: "/products" },
        { title: "Enterprise Solution", subtitle: "Deploy and manage infrastructure at scale", features: ["Bulk custom hardware configurations", "IT deployment support", "AMC services"], btn: "Request Enterprise Quote", isLead: true },
        { title: "Educational Solution", subtitle: "Enable modern, scalable learning environments", features: ["Performance meets affordability", "Smart device control & management", "Institutional branding options"], btn: "View Education Models", href: "/products" },
      ].map((card, i) => (
        <FadeUp key={i} delay={i * 0.1} className="bg-white text-ink p-12 flex flex-col justify-between group overflow-hidden border border-ink/10 shadow-2xl transition-all duration-700 hover:border-accent hover:-translate-y-4">
          <div className="z-10 mb-12">
            <h3 className="text-3xl font-serif font-bold italic mb-4">{card.title}</h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-8">{card.subtitle}</p>
            <ul className="space-y-4">
              {card.features.map((f, j) => (
                <li key={j} className="flex items-start gap-4 text-sm opacity-80 font-medium tracking-wide">
                  <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          {card.isLead ? (
            <button onClick={onLeadClick} className="flex items-center gap-4 bg-ink/5 border border-ink/10 px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold mt-auto transition-colors duration-500 hover:bg-accent hover:text-white w-max">
              {card.btn} <ArrowRight size={14} />
            </button>
          ) : (
            <Link href={card.href || "#"} className="flex items-center gap-4 bg-ink/5 border border-ink/10 px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold mt-auto transition-colors duration-500 hover:bg-accent hover:text-white w-max">
              {card.btn} <ArrowRight size={14} />
            </Link>
          )}
        </FadeUp>
      ))}
    </div>
  </section>
);

// --- 5. PROGRAMS ECOSYSTEM [INK] ---
const ProgramsEcosystem = ({ onProgramClick }: { onProgramClick: (name: string) => void }) => (
  <section className="px-8 py-16 lg:py-24 bg-ink text-bg border-t border-white/5">
    <FadeUp className="text-center max-w-3xl mx-auto mb-20 space-y-6">
      <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter text-bg leading-tight">
        Beyond Devices — Build with Our Ecosystem
      </h2>
      <p className="text-bg/60 max-w-xl mx-auto text-lg leading-relaxed pt-6">
        We don’t just sell laptops. We help you build labs, enable startups, and create innovation ecosystems.
      </p>
    </FadeUp>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { title: "Innovation Labs & Institutional Programs", desc: "Build future-ready labs for learning and research", btn: "Build Your Lab" },
        { title: "Startup Ecosystem Partnerships", desc: "Empower startups with access to infrastructure", btn: "Partner With Us" },
        { title: "Campus Ambassador Program", desc: "Lead innovation on your campus", btn: "Join Program" },
        { title: "Co-Creation & Shared Innovation", desc: "Collaborate to build next-gen solutions", btn: "Start Collaboration" }
      ].map((item, i) => (
        <FadeUp key={i} delay={i * 0.1}>
          <div onClick={() => onProgramClick(item.title)} className="p-10 border border-white/5 group transition-all duration-700 hover:bg-bg hover:border-bg hover:text-ink hover:-translate-y-2 bg-white/5 flex flex-col items-start min-h-[350px] shadow-sm hover:shadow-2xl block w-full h-full cursor-pointer">
            <h3 className="text-2xl font-serif font-bold italic mb-6 leading-tight group-hover:text-ink transition-colors duration-700">{item.title}</h3>
            <p className="text-xs opacity-60 font-mono leading-relaxed mb-8 group-hover:opacity-80 transition-colors duration-700 mt-auto">{item.desc}</p>
            <div className="mt-auto flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.2em] text-accent cursor-pointer group-hover:text-ink transition-colors duration-700">
              {item.btn} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  </section>
);

// --- 6. CUSTOM OEM [BG] ---
const CustomOEM = ({ onLeadClick }: { onLeadClick: () => void }) => {
  return (
    <section className="px-8 py-16 lg:py-24 bg-bg text-ink border-t border-ink/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="z-10 relative">
          <FadeUp>
            <div className="flex justify-between items-end mb-12 border-b border-ink/10 pb-4">
              <div>
                <h2 className="text-4xl md:text-5xl mt-2 font-bold font-serif leading-tight">Custom Hardware &<br />White-Label Solutions</h2>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.1} className="space-y-12">
            <p className="text-xl md:text-2xl opacity-70 font-sans leading-relaxed">Launch your own brand or build tailored hardware with us.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mb-16">
              {[
                { title: "Custom Configurations", desc: "Build endpoints tailored to your exact workforce needs." },
                { title: "White-Label Laptops", desc: "Brand indigenous machines natively with your logo." },
                { title: "Dedicated Batches", desc: "Secure production queues for bulk delivery." }
              ].map((f, i) => (
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <div>
                    <h4 className="font-bold text-ink mb-2">{f.title}</h4>
                    <p className="text-xs text-ink/60 font-sans leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button onClick={onLeadClick} className="bg-ink text-bg px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all shadow-xl hover:-translate-y-2 rounded-sm group flex items-center gap-4 w-max">
              Contact Our Team <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} className="relative w-full aspect-square lg:aspect-[4/5] bg-ink/5 p-4 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-4 border border-ink/20 z-10 pointer-events-none max-w-full" />
          <div className="absolute inset-0 bg-ink/5" />
          <Image src="/assets/landing_page/b2b.png" alt="Hardware Manufacturing" fill className="object-cover  opacity-90  hover:scale-100 hover:grayscale-0 transition-all duration-[2s] ease-[0.16,1,0.3,1]" unoptimized />
        </FadeUp>
      </div>
    </section>
  )
};

// --- 7. CHOOSE LAPTOP (Grid + Text Reveals) [INK] ---
const ChooseLaptop = () => {
  return (
    <section className="px-8 py-16 lg:py-24 bg-ink text-bg border-t border-white/5 relative">
      <FadeUp className="text-center mb-24 space-y-6">
        <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter text-bg">Choose Your Laptop</h2>
        <p className="opacity-50 max-w-xl mx-auto font-sans leading-relaxed text-lg">Designed for different needs, performance levels, and budgets.</p>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1200px] mx-auto min-h-[500px]">
        {/* Card 1 */}
        <FadeUp delay={0.1} className="h-full">
          <div className="p-12 border border-ink/10 bg-bg text-ink shadow-[0_0_50px_rgba(255,255,255,0.05)] hover:-translate-y-2 transition-transform duration-700 flex flex-col h-full rounded-sm">
            <h3 className="text-4xl lg:text-5xl font-serif italic mb-4 font-bold text-ink tracking-tight overflow-hidden">
              <motion.span initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="block"><span className="text-accent underline decoration-1 underline-offset-4">Workbook</span></motion.span>
              <motion.span initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="block">Series</motion.span>
            </h3>
            <p className="text-ink/60 mb-8 border-b border-ink/10 pb-8 text-sm max-w-md font-sans">Versatile and reliable for professionals, students, and developers</p>
            <ul className="space-y-4 font-mono text-[11px] uppercase tracking-widest text-ink/70 mb-12 flex-1">
              <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex gap-4 items-center">• <span className="opacity-90 font-bold">Intel i7 / i5 / N100 / N95</span></motion.li>
              <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex gap-4 items-center">• <span className="opacity-90 font-bold">Windows 11 ready</span></motion.li>
              <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex gap-4 items-center">• <span className="opacity-100 text-accent font-bold">Best for: Productivity, learning, development</span></motion.li>
            </ul>
            <Link href="/products" className="bg-ink text-bg px-8 py-5 text-center text-[10px] uppercase tracking-widest font-bold hover:bg-accent hover:text-white transition-colors duration-500 mt-auto shadow-2xl">View Details</Link>
          </div>
        </FadeUp>

        {/* Card 2 */}
        <FadeUp delay={0.2} className="h-full">
          <div className="p-12 border border-white/10 flex flex-col bg-white/5 text-bg relative overflow-hidden group hover:-translate-y-2 transition-transform duration-700 h-full shadow-2xl rounded-sm">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(242,125,38,0.1),transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <h3 className="text-4xl lg:text-5xl font-serif italic mb-4 font-bold relative z-10 tracking-tight overflow-hidden">
              <motion.span initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="block">Swapbook</motion.span>
              <motion.span initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="block">Series</motion.span>
            </h3>
            <p className="text-bg/60 mb-8 border-b border-white/10 pb-8 text-sm relative z-10 max-w-md font-sans">High-performance machines for creators and advanced users</p>
            <ul className="space-y-4 font-mono text-[11px] uppercase tracking-widest text-bg/70 mb-12 flex-1 relative z-10">
              <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex gap-4 items-center">• <span className="opacity-90 font-bold">Intel i9 processors</span></motion.li>
              <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex gap-4 items-center">• <span className="opacity-90 font-bold">RTX graphics</span></motion.li>
              <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex gap-4 items-center">• <span className="opacity-100 text-accent font-bold">Best for: Design, gaming, heavy workloads</span></motion.li>
            </ul>
            <Link href="/products" className="bg-bg text-ink px-8 py-5 text-center text-[10px] uppercase tracking-widest font-bold hover:bg-accent hover:text-white transition-colors duration-500 mt-auto relative z-10 shadow-xl">View Details</Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// --- 8. VIDEO CANVAS (Anatomy of Power) [BG] ---
// Handled by component VideoScrollCanvas

// --- 9. SYNE ARCHITECTURE (ENGINEERING) [INK] ---



// --- 10. WHY ENTION [BG] --- 
const WhyEntion = () => (
  <section id="craft" className="px-8 py-16 lg:py-24 bg-bg text-ink border-t border-ink/5 relative z-10">
    <FadeUp>
      <SectionHeader title="Trust" subtitle="Philosophy" />
    </FadeUp>

    <div className="grid grid-cols-1 md:grid-cols-3 border border-ink/10 mb-32 shadow-2xl rounded-sm bg-white">
      {[
        { id: "01", title: "Craftsmanship", desc: "Every machine is hand-assembled with obsessive attention to detail, ensuring a level of precision that mass production cannot match." },
        { id: "02", title: "Materials", desc: "We source only the finest aerospace-grade alloys and sustainable components, built to last a lifetime of rigorous professional use." },
        { id: "03", title: "Support", desc: "Our white-glove concierge support ensures that your creative flow is never interrupted, with 24/7 priority hardware assistance." },
      ].map((item, i) => (
        <FadeUp key={i} delay={i * 0.1}>
          <div className="p-16 border-b md:border-b-0 md:border-r border-ink/10 relative group h-full flex flex-col justify-center transition-all duration-700 bg-white hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] z-10 overflow-hidden">
            <span className="text-[120px] font-serif text-ink opacity-[0.03] group-hover:opacity-10 transition-opacity select-none italic absolute -top-8 -right-4 font-black">{item.id}</span>
            <h3 className="text-3xl mt-8 mb-6 font-bold text-ink relative tracking-tight">{item.title}</h3>
            <p className="text-sm md:text-base opacity-70 leading-relaxed font-sans text-ink relative">{item.desc}</p>
            <div className="mt-12 h-[2px] w-8 bg-accent group-hover:w-[150%] transition-all duration-[1.5s] ease-[0.16,1,0.3,1] relative -ml-4" />
          </div>
        </FadeUp>
      ))}
    </div>

    <div className="pt-12 mb-12 pb-12">
      <FadeUp className="text-center mb-16 space-y-6 flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter text-ink leading-none">
          Why Choose <span className="italic font-normal text-accent block mt-2">Us?</span>
        </h2>
      </FadeUp>
      <div className="max-w-4xl mx-auto">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 text-sm md:text-base font-bold text-ink/90 leading-relaxed font-sans">
          {[
            "Built specifically for Indian users and environments",
            "Flexible customization (unlike mass OEM brands)",
            "Lower total cost of ownership",
            "Focused on long-term indigenous innovation"
          ].map((point, i) => (
            <FadeUp key={i} delay={i * 0.1} className="flex items-start gap-6 group hover:-translate-y-1 transition-transform">
              <div className="mt-1 w-6 h-6 rounded-full border border-accent/30 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                <CheckCircle2 size={12} className="text-accent group-hover:text-white" />
              </div>
              <span className="text-lg tracking-tight">{point}</span>
            </FadeUp>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

// --- 11. TRUSTED STATS [INK] ---
const TrustedStats = () => {
  return (
    <section className="px-8 py-16 lg:py-24 bg-ink text-bg text-center border-t border-white/5 relative z-10 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none origin-center">
        <Globe size={1200} strokeWidth={0.2} />
      </div>

      <div className="max-w-[1200px] mx-auto z-10 relative">
        <FadeUp>
          <h2 className="text-5xl md:text-8xl font-serif font-black italic tracking-tighter text-bg mb-6 leading-none">Growing with Institutions, Startups & Innovators</h2>
          <p className="text-accent font-mono uppercase tracking-widest mb-32 mt-8 text-xs font-bold bg-white/5 px-6 py-2 rounded-full w-max mx-auto">Trusted by Emerging Ecosystems</p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 border-t border-b border-white/10 py-24">
          {[
            { stat: "XX+", label: "Devices Deployed" },
            { stat: "XX+", label: "Institutions Engaged" },
            { stat: "XX+", label: "Startups Supported" },
          ].map((s, i) => (
            <FadeUp delay={i * 0.2} key={i} className="flex flex-col gap-6 items-center px-4 group">
              <span className="text-[5rem] md:text-[8rem] font-black text-bg tracking-tighter mix-blend-screen group-hover:-translate-y-4 transition-transform duration-[1s] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">{s.stat}</span>
              <div className="h-[1px] w-12 bg-white/10 group-hover:w-full group-hover:bg-accent transition-all duration-700" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-bg/60 font-bold group-hover:text-accent transition-colors">{s.label}</span>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 12. ROADMAP [BG] ---
const Roadmap = () => (
  <section className="px-8 py-16 lg:py-24 bg-bg text-ink border-t border-ink/5 relative overflow-hidden">
    <div className="max-w-4xl mx-auto space-y-32 z-10 relative">
      <FadeUp className="text-center border-b border-ink/10 pb-20">
        <h2 className="text-7xl md:text-9xl font-serif font-black italic tracking-tighter text-ink mb-12 leading-[0.80] drop-shadow-sm">Solving Today.<br />Building Tomorrow.</h2>
        <p className="opacity-70 text-xl font-sans max-w-2xl mx-auto leading-relaxed">We are addressing immediate computing needs while building India’s long-term technology foundation.</p>
      </FadeUp>

      <div className="space-y-16 pl-8 md:pl-24 border-l-2 border-ink/10 relative max-w-3xl mx-auto">
        {[
          { time: "Today", text: "System Integration & Deployment", active: true },
          { time: "Next", text: "Optimization & Control Layer", active: false },
          { time: "Future", text: "Indigenous Hardware, OS & AI Stack", active: false }
        ].map((r, i) => (
          <FadeUp key={i} delay={i * 0.15} className="relative group cursor-default">
            <div className={`absolute -left-[38px] md:-left-[103px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-bg transition-all duration-700 shadow-xl ${r.active ? 'bg-accent scale-150' : 'bg-ink/20 group-hover:bg-accent/50 group-hover:scale-125'}`} />
            <div className="pl-4 md:pl-16 flex flex-col items-start gap-3">
              <div className="text-[11px] font-mono tracking-[0.4em] font-bold uppercase text-ink/50 bg-ink/5 px-4 py-1 rounded-sm">{r.time}</div>
              <div className={`text-3xl md:text-5xl font-serif italic font-bold transition-all duration-700 tracking-tight ${r.active ? 'text-ink' : 'text-ink/30 group-hover:text-ink/60 group-hover:translate-x-4'}`}>{r.text}</div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>

    <div className="absolute top-1/2 -translate-y-1/2 left-0 opacity-[0.02] pointer-events-none -translate-x-1/2">
      <Brain size={1200} strokeWidth={0.2} className="text-ink" />
    </div>
  </section>
);

// --- 13. ACCESS [INK] ---  
const Access = () => (
  <section id="order" className="px-8 py-16 lg:py-24 bg-ink text-bg border-t border-white/5 relative z-10">
    <FadeUp>
      <SectionHeader title="Availability" subtitle="Channels" />
    </FadeUp>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { icon: Laptop, title: "Website", desc: "Browse our full catalog and configure your custom machine online." },
        { icon: ShoppingCart, title: "E-commerce", desc: "Available through select premium retail partners across the globe." },
        { icon: GraduationCap, title: "Campus", desc: "Special education pricing and workshops for students and faculty." },
      ].map((item, i) => (
        <FadeUp key={i} delay={i * 0.15}>
          <div className="p-16 bg-white/5 border border-white/10 shadow-2xl flex flex-col items-center text-center rounded-sm group transition-all duration-[0.8s] ease-out hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(242,125,38,0.05)] hover:border-accent/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(242,125,38,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            <item.icon size={64} strokeWidth={0.5} className="mb-10 opacity-30 group-hover:opacity-100 transition-all text-accent duration-1000 group-hover:scale-110 relative z-10 group-hover:-translate-y-2" />
            <h3 className="text-3xl mb-4 font-bold text-bg relative z-10 tracking-tight">{item.title}</h3>
            <p className="text-[11px] opacity-50 uppercase tracking-[0.2em] leading-relaxed font-bold group-hover:opacity-90 transition-opacity duration-1000 text-bg relative z-10 max-w-[200px]">{item.desc}</p>
          </div>
        </FadeUp>
      ))}
    </div>
  </section>
);

// --- 14. EXPERIENCE PROGRAM [BG] ---
const ExperienceProgram = ({ onProgramClick }: { onProgramClick: (name: string) => void }) => {
  return (
    <section className="px-8 py-16 lg:py-24 bg-bg text-ink overflow-hidden relative border-t border-ink/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center z-10 relative cursor-default">
        <div className="space-y-16">
          <FadeUp>
            <h2 className="text-6xl md:text-8xl font-serif font-black text-ink uppercase leading-[0.85] tracking-tighter">
              Laptop <br />
              <span className="italic font-normal text-accent/80 normal-case block mt-2">Experience Program</span>
            </h2>
          </FadeUp>
          <div className="space-y-8 pl-4 border-l-2 border-ink/10">
            {[
              { icon: Globe, title: "Zero Obligation", desc: "Test the hardware in your environment with no purchase commitment." },
              { icon: Truck, title: "On-Site Delivery", desc: "Free sample delivery directly to your office within 48 hours." },
              { icon: Building2, title: "Corporate Offers", desc: "Exclusive pricing and white-glove support for enterprise teams." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.15} className="flex gap-8 items-start group hover:-translate-y-1 transition-transform">
                <div className="mt-1 w-6 h-6 rounded-full border border-accent/50 flex items-center justify-center group-hover:bg-accent transition-colors duration-500 shadow-xl shrink-0">
                  <CheckCircle2 size={12} className="text-accent group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-ink text-sm md:text-base font-bold uppercase tracking-widest mb-2 transition-colors group-hover:text-accent">{item.title}</h3>
                  <p className="text-ink/60 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em]">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.4} className="pt-12 flex flex-col sm:flex-row gap-8 items-center border-t border-ink/10">
            <p className="text-ink/50 text-[10px] font-mono uppercase tracking-[0.3em] max-w-xs text-center sm:text-left font-bold">
              Let your team test the performance first-hand before making the switch.
            </p>
            <button onClick={() => onProgramClick("Experience Program")} className="bg-ink text-bg px-14 py-6 text-xs font-bold uppercase tracking-[0.4em] transition-all hover:bg-accent rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:-translate-y-2 group/btn">
              Book Now <ArrowRight size={14} className="inline ml-3 group-hover/btn:translate-x-2 transition-transform" />
            </button>
          </FadeUp>
        </div>
        <FadeUp delay={0.2} className="relative w-full h-[500px] lg:h-[700px] group hidden md:block overflow-hidden rounded-sm border border-ink/5">
          <div className="absolute inset-0 bg-accent/5 blur-[40px] group-hover:bg-accent/10 transition-colors duration-1000" />
          <div className="absolute inset-4 z-10 border border-ink/10 pointer-events-none mix-blend-overlay" />
          <Image src="/assets/landing_page/exp.png" alt="Corporate Experience" fill className="object-cover grayscale opacity-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[2s] ease-[0.16,1,0.3,1]" unoptimized />
        </FadeUp>
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[linear-gradient(45deg,transparent_25%,rgba(242,125,38,0.03)_50%,transparent_75%)] pointer-events-none" />
    </section>
  );
};

// --- 15. FINAL CTA [INK] ---
const FinalCTA = () => {
  return (
    <section className="relative min-h-[90vh] bg-ink text-bg flex items-center justify-center overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <Image src="/assets/landing_page/final-cta.png" alt="Experience Ention" fill className="object-cover opacity-[0.5] grayscale" unoptimized />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink z-0 pointer-events-none" />

      <div className="z-10 text-center px-4 max-w-5xl">
        <FadeUp>
          <h2 className="text-6xl md:text-8xl text-bg font-serif mb-8 italic leading-[0.85] tracking-tighter drop-shadow-2xl">Ready to Build, Scale, or Upgrade?</h2>
          <p className="text-bg/60 mb-20 text-xl md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">Whether you need laptops, labs, or ecosystem partnerships—we’re ready to work with you.</p>
        </FadeUp>
        <FadeUp delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link href="/products" className="bg-accent text-bg px-14 py-6 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-ink transition-colors duration-500 rounded-sm w-full sm:w-auto shadow-[0_20px_50px_rgba(242,125,38,0.2)] hover:-translate-y-2">
            Explore Laptops
          </Link>
          <Link href="/support" className="bg-transparent text-bg border border-bg/20 px-14 py-6 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-ink transition-colors duration-500 rounded-sm w-full sm:w-auto shadow-sm hover:-translate-y-2 text-center">
            Contact Team
          </Link>
        </FadeUp>
      </div>
    </section>
  );
};

export default function HomePage() {
  const [activeForm, setActiveForm] = React.useState<"LEAD" | "PROGRAM" | null>(null);
  const [programName, setProgramName] = React.useState("");

  const openProgramForm = (name: string) => {
    setProgramName(name);
    setActiveForm("PROGRAM");
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white bg-bg overflow-x-hidden">
      <FormModal isOpen={activeForm !== null} onClose={() => setActiveForm(null)}>
        {activeForm === "LEAD" && <LeadSalesForm source="Homepage Quote Request" onSuccess={() => setActiveForm(null)} />}
        {activeForm === "PROGRAM" && <ProgramApplicationForm programName={programName} onSuccess={() => setActiveForm(null)} />}
      </FormModal>

      <BlurFadeIn delay={0.1}>
        <main>
          <Ticker />
          <Hero /> {/* INK */}
          <VisionStatement /> {/* BG */}
          <LaptopSolutions onLeadClick={() => setActiveForm("LEAD")} /> {/* BG */}
          <Models /> {/* INK */}
          <ProgramsEcosystem onProgramClick={openProgramForm} /> {/* INK */}
          <CustomOEM onLeadClick={() => setActiveForm("LEAD")} /> {/* BG */}
          <ChooseLaptop /> {/* INK */}
          <VideoScrollCanvas videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" /> {/* BG */}

          <WhyEntion /> {/* BG */}
          <TrustedStats /> {/* INK */}
          <Roadmap /> {/* BG */}
          <Access /> {/* INK */}
          <ExperienceProgram onProgramClick={openProgramForm} /> {/* BG */}
          <FinalCTA /> {/* INK */}
        </main>
      </BlurFadeIn>
    </div>
  );
}
