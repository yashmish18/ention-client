"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Brain } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Ticker } from "@/components/Ticker";
import { MainHeroCarousel } from "@/components/MainHeroCarousel";
import FormModal from "@/components/FormModal";
import LeadSalesForm from "@/components/forms/LeadSalesForm";
import ProgramApplicationForm from "@/components/forms/ProgramApplicationForm";
import AvailabilitySection from "@/components/v2/AvailabilitySection";
import WhyChooseSection from "@/components/v2/WhyChooseSection";
import ShowcaseSection from "@/components/v2/ShowcaseSection";
import { ExperienceProgram } from "@/components/ExperienceProgram";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
const Hero = () => <MainHeroCarousel />;

// ─────────────────────────────────────────────
// LAPTOP SOLUTIONS [BG] — clip reveals + stagger
// ─────────────────────────────────────────────
const LaptopSolutions = ({ onLeadClick }: { onLeadClick?: () => void }) => {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Heading words: each word in its own overflow-hidden, slides up
      const words = sectionRef.current!.querySelectorAll(".ls-word");
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, {
        yPercent: 0,
        stagger: 0.07,
        duration: 1.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Cards: clip-path reveal from bottom, staggered
      const cards = sectionRef.current!.querySelectorAll(".ls-card");
      gsap.set(cards, { clipPath: "inset(100% 0 0 0)" });
      gsap.to(cards, {
        clipPath: "inset(0% 0 0 0)",
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
          toggleActions: "play none none none",
        },
      });

      // Card inner content stagger reveal
      const inners = sectionRef.current!.querySelectorAll(".ls-inner");
      gsap.set(inners, { opacity: 0, y: 24 });
      gsap.to(inners, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cards = [
    {
      title: "High Performance Solutions",
      subtitle: "Gaming, graphic design, rendering, research",
      features: [
        "High-performance CPU & GPU options",
        "RTX graphics support",
        "Designed for rendering and intensive workloads",
      ],
      btn: "Explore Laptops",
      href: "/products/s1",
    },
    {
      title: "Developers' Solution",
      subtitle: "Build, test, and deploy faster",
      features: [
        "Optimized for coding and virtualization",
        "Expandable RAM and SSD",
        "Linux compatibility",
      ],
      btn: "Explore Laptops",
      href: "/products/e4",
    },
    {
      title: "Educational Solution",
      subtitle: "Enable modern, scalable learning environments",
      features: [
        "Performance meets affordability",
        "Smart device control & management",
        "Institutional branding options",
      ],
      btn: "Explore Laptops",
      href: "/products/e1",
    },
  ];

  return (
    <section ref={sectionRef} className="px-8 py-16 lg:py-24 bg-bg text-ink border-t border-ink/5">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-16 border-b border-current/10 pb-6 max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter leading-tight">
          {["Laptop", "Solutions", "for", "Every", "Need"].map((w, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0"
            >
              <span className="ls-word inline-block">{w}</span>
            </span>
          ))}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {cards.map((card, i) => (
          <div
            key={i}
            className="ls-card bg-white text-ink overflow-hidden border border-ink/10 shadow-2xl transition-all duration-700 hover:border-accent hover:-translate-y-4"
          >
            <div className="ls-inner p-12 flex flex-col justify-between h-full min-h-[380px]">
              <div className="mb-12">
                <h3 className="text-xl md:text-2xl font-serif font-bold italic mb-4 whitespace-nowrap">
                  {card.title}
                </h3>
                <p className="font-sans text-xs font-semibold text-accent mb-8">{card.subtitle}</p>
                <ul className="space-y-4">
                  {card.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-4 text-sm opacity-80 font-medium tracking-wide">
                      <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={card.href}
                className="relative overflow-hidden z-10 bg-transparent border border-ink/20 text-ink hover:text-white px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-4 w-max transition-colors duration-500 group/btn"
              >
                <span className="absolute inset-0 bg-accent -z-10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10">{card.btn}</span>
                <ArrowRight size={14} className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// CHOOSE LAPTOP [BG] — cards enter from opposite sides
// ─────────────────────────────────────────────
const ChooseLaptop = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Heading words clip up
      const words = sectionRef.current!.querySelectorAll(".cl-word");
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, {
        yPercent: 0,
        stagger: 0.06,
        duration: 1.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Sub text
      const sub = sectionRef.current!.querySelector(".cl-sub") as HTMLElement;
      if (sub) {
        gsap.set(sub, { opacity: 0, y: 18 });
        gsap.to(sub, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Left card enters from left, right card from right
      const cardL = sectionRef.current!.querySelector(".cl-card-l") as HTMLElement;
      const cardR = sectionRef.current!.querySelector(".cl-card-r") as HTMLElement;
      if (cardL && cardR) {
        gsap.set(cardL, { x: -60, opacity: 0 });
        gsap.set(cardR, { x: 60, opacity: 0 });
        const st = {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        };
        gsap.to(cardL, { x: 0, opacity: 1, duration: 1.1, ease: "power3.out", scrollTrigger: st });
        gsap.to(cardR, { x: 0, opacity: 1, duration: 1.1, delay: 0.1, ease: "power3.out", scrollTrigger: st });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-8 py-16 lg:py-24 bg-bg text-ink border-t border-ink/5 relative overflow-hidden">
      <div className="text-center mb-20 space-y-6">
        <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter text-ink leading-tight">
          {["Choose", "Your", "Ention", "Laptop"].map((w, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0"
            >
              <span className="cl-word inline-block">{w}</span>
            </span>
          ))}
        </h2>
        <p className="cl-sub opacity-50 max-w-xl mx-auto font-sans leading-relaxed text-lg">
          Designed for different needs, performance levels, and budgets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
        {/* Workbook */}
        <div className="cl-card-l h-full">
          <div className="p-8 lg:p-10 border border-ink/10 bg-white text-ink shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-ink/30 hover:-translate-y-1 transition-all duration-700 flex flex-col h-full rounded-sm min-h-[280px] justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold italic tracking-tight text-ink uppercase mb-3">
                Workbook Series
              </h3>
              <p className="text-ink/60 mb-6 text-sm font-sans leading-relaxed">
                Versatile and reliable for professionals, students, and developers.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="bg-[#0066cc] text-white px-2 py-0.5 flex flex-col justify-center items-center rounded-sm font-sans font-bold leading-none select-none w-10 h-8 border border-[#0052a3]">
                  <span className="text-[5px] font-normal tracking-wider opacity-90 uppercase">intel</span>
                  <span className="text-[7px] font-black tracking-tighter mt-0.5">inside</span>
                </div>
                <div className="bg-gradient-to-br from-[#0066cc] to-[#0099ff] text-white px-2 py-0.5 flex flex-col justify-center items-center rounded-sm font-sans font-bold leading-none select-none w-10 h-8 border border-[#0052a3]">
                  <span className="text-[4px] font-normal tracking-wider opacity-90 uppercase">intel</span>
                  <span className="text-[6px] font-black tracking-tight mt-0.5">CORE</span>
                  <span className="text-[5px] font-bold mt-0.5 opacity-90">i5</span>
                </div>
                <div className="bg-gradient-to-br from-[#0066cc] to-[#0099ff] text-white px-2 py-0.5 flex flex-col justify-center items-center rounded-sm font-sans font-bold leading-none select-none w-10 h-8 border border-[#0052a3]">
                  <span className="text-[4px] font-normal tracking-wider opacity-90 uppercase">intel</span>
                  <span className="text-[6px] font-black tracking-tight mt-0.5">CORE</span>
                  <span className="text-[5px] font-bold mt-0.5 opacity-90">i7</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 bg-white border border-[#e0e0e0] rounded-sm select-none h-8 shadow-sm">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M0 0H7.5V7.5H0V0Z" fill="#0078D4" />
                    <path d="M8.5 0H16V7.5H8.5V0Z" fill="#0078D4" />
                    <path d="M0 8.5H7.5V16H0V8.5Z" fill="#0078D4" />
                    <path d="M8.5 8.5H16V16H8.5V8.5Z" fill="#0078D4" />
                  </svg>
                  <span className="font-sans font-semibold text-[9px] text-[#333333] tracking-tight">Windows 11</span>
                </div>
              </div>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-transparent text-ink border-b border-ink/20 pb-1.5 hover:border-accent hover:text-accent text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 w-max group/btn"
            >
              <span>View Details</span>
              <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Swapbook */}
        <div className="cl-card-r h-full">
          <div className="p-8 lg:p-10 border border-ink/10 bg-white text-ink shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-ink/30 hover:-translate-y-1 transition-all duration-700 flex flex-col h-full rounded-sm min-h-[280px] justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold italic tracking-tight text-ink uppercase mb-3">
                Swapbook Series
              </h3>
              <p className="text-ink/60 mb-6 text-sm font-sans leading-relaxed">
                High-performance machines for creators and advanced users.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="bg-[#0066cc] text-white px-2 py-0.5 flex flex-col justify-center items-center rounded-sm font-sans font-bold leading-none select-none w-10 h-8 border border-[#0052a3]">
                  <span className="text-[5px] font-normal tracking-wider opacity-90 uppercase">intel</span>
                  <span className="text-[7px] font-black tracking-tighter mt-0.5">inside</span>
                </div>
                <div className="bg-gradient-to-br from-[#0066cc] to-[#0099ff] text-white px-2 py-0.5 flex flex-col justify-center items-center rounded-sm font-sans font-bold leading-none select-none w-10 h-8 border border-[#0052a3]">
                  <span className="text-[4px] font-normal tracking-wider opacity-90 uppercase">intel</span>
                  <span className="text-[6px] font-black tracking-tight mt-0.5">CORE</span>
                  <span className="text-[5px] font-bold mt-0.5 opacity-90">i9</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-black border border-white/10 rounded-sm select-none h-8 shadow-sm">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#76B900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M12 2a10 10 0 0 0-10 10c0 5.52 4.48 10 10 10a10 10 0 0 0 10-10" />
                    <path d="M12 6a6 6 0 0 0-6 6c0 3.31 2.69 6 6 6a6 6 0 0 0 6-6" />
                    <path d="M12 10a2 2 0 0 0-2 2" />
                  </svg>
                  <span className="font-sans font-bold text-[7px] text-[#76B900] tracking-widest uppercase">NVIDIA RTX</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 bg-white border border-[#e0e0e0] rounded-sm select-none h-8 shadow-sm">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M0 0H7.5V7.5H0V0Z" fill="#0078D4" />
                    <path d="M8.5 0H16V7.5H8.5V0Z" fill="#0078D4" />
                    <path d="M0 8.5H7.5V16H0V8.5Z" fill="#0078D4" />
                    <path d="M8.5 8.5H16V16H8.5V8.5Z" fill="#0078D4" />
                  </svg>
                  <span className="font-sans font-semibold text-[9px] text-[#333333] tracking-tight">Windows 11</span>
                </div>
              </div>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-transparent text-ink border-b border-ink/20 pb-1.5 hover:border-accent hover:text-accent text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 w-max group/btn"
            >
              <span>View Details</span>
              <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// PROGRAMS ECOSYSTEM [INK] — heading lines + grid stagger
// ─────────────────────────────────────────────
const ProgramsEcosystem = ({ onProgramClick }: { onProgramClick: (name: string) => void }) => {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Heading lines clip up
      const lines = sectionRef.current!.querySelectorAll(".pe-line");
      gsap.set(lines, { yPercent: 105 });
      gsap.to(lines, {
        yPercent: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Sub
      const sub = sectionRef.current!.querySelector(".pe-sub") as HTMLElement;
      if (sub) {
        gsap.set(sub, { opacity: 0, y: 24 });
        gsap.to(sub, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      // Grid cards: scale up + fade in, stagger
      const cards = sectionRef.current!.querySelectorAll(".pe-card");
      gsap.set(cards, { opacity: 0, y: 48, scale: 0.97 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.09,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const items = [
    { title: "Innovation Labs & Institutional Programs", desc: "Build future-ready labs for learning and research", btn: "Build Your Lab" },
    { title: "Startup Ecosystem Partnerships", desc: "Empower startups with access to infrastructure", btn: "Partner With Us" },
    { title: "Campus Ambassador Program", desc: "Lead innovation on your campus", btn: "Join Program" },
    { title: "Co-Creation & Shared Innovation", desc: "Collaborate to build next-gen solutions", btn: "Start Collaboration" },
  ];

  return (
    <section ref={sectionRef} className="px-8 py-16 lg:py-24 bg-ink text-bg border-t border-white/5">
      <div className="text-center max-w-6xl mx-auto mb-20 space-y-6">
        <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter text-bg leading-tight">
          <span className="block overflow-hidden py-1">
            <span className="pe-line block">Beyond Devices.</span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="pe-line block">Build with the Ention Ecosystem</span>
          </span>
        </h2>
        <p className="pe-sub text-bg/60 max-w-xl mx-auto text-lg leading-relaxed pt-6">
          We don't just sell laptops. We help you build labs, enable startups, and create innovation ecosystems.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => onProgramClick(item.title)}
            className="pe-card p-10 border border-white/5 group transition-all duration-700 hover:bg-bg hover:border-bg hover:text-ink hover:-translate-y-2 bg-white/5 flex flex-col items-start min-h-[350px] shadow-sm hover:shadow-2xl cursor-pointer rounded-sm"
          >
            <div className="min-h-[3.25rem] md:min-h-[3.75rem] flex items-center w-full mb-6">
              <h3 className="text-lg md:text-xl font-serif font-bold italic leading-tight group-hover:text-ink transition-colors duration-700">
                {item.title}
              </h3>
            </div>
            <p className="text-sm opacity-80 font-sans leading-relaxed mb-8 group-hover:opacity-90 transition-colors duration-700 mt-auto">
              {item.desc}
            </p>
            <div className="mt-auto w-full relative overflow-hidden z-10 bg-accent text-white border border-accent px-6 py-3.5 text-[10px] uppercase font-bold tracking-[0.2em] transition-colors duration-500 flex items-center justify-between rounded-sm shadow-md">
              <span className="absolute inset-0 bg-ink -z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative z-10">{item.btn}</span>
              <ArrowRight size={12} className="relative z-10 group-hover:translate-x-1 transition-transform duration-500" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// CUSTOM OEM [BG] — existing GSAP preserved
// ─────────────────────────────────────────────
const CustomOEM = ({ onLeadClick }: { onLeadClick: () => void }) => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const lineTopRef = React.useRef<HTMLDivElement>(null);
  const lineBottomRef = React.useRef<HTMLDivElement>(null);
  const colsWrapperRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current || !gridRef.current || !headingRef.current || !lineTopRef.current || !lineBottomRef.current || !colsWrapperRef.current) return;

    const sectionEl = sectionRef.current;
    const gridEl = gridRef.current;
    const headingEl = headingRef.current;
    const lineTopEl = lineTopRef.current;
    const lineBottomEl = lineBottomRef.current;
    const colsEl = colsWrapperRef.current;
    const btnEl = buttonRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Grid radial reveal
      tl.fromTo(gridEl,
        { clipPath: "circle(0% at 50% 50%)" },
        { clipPath: "circle(100% at 50% 50%)", ease: "power2.out", duration: 0.8 }
      );

      // Divider lines draw simultaneously
      tl.fromTo([lineTopEl, lineBottomEl],
        { scaleX: 0 },
        { scaleX: 1, ease: "power2.out", duration: 0.6 },
        "-=0.5"
      );

      // Heading mask reveal
      const headingLines = headingEl.querySelectorAll(".heading-line");
      if (headingLines.length > 0) {
        tl.to(headingLines, { y: "0%", ease: "power3.out", duration: 0.55, stagger: 0.1 }, "-=0.4");
      }

      // Feature text stagger
      const featureTexts = colsEl.querySelectorAll(".feature-reveal-text");
      if (featureTexts.length > 0) {
        tl.fromTo(featureTexts,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.45, stagger: 0.07 },
          "-=0.3"
        );
      }

      // Vertical separators
      const separators = colsEl.querySelectorAll(".vertical-separator");
      if (separators.length > 0) {
        tl.fromTo(separators,
          { scaleY: 0 },
          { scaleY: 1, ease: "power2.out", duration: 0.35, stagger: 0.06 },
          "<"
        );
      }

      // CTA button wipe
      if (btnEl) {
        tl.fromTo(btnEl,
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0, y: 15 },
          { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, y: 0, ease: "power2.out", duration: 0.45 },
          "-=0.35"
        );
      }
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  const features = [
    "Tailored Configurations",
    "Dedicated Production Batches",
    "Dedicated Deployment Support",
    "Dedicated After-sales Service",
  ];

  return (
    <section ref={sectionRef} className="px-8 py-24 lg:py-36 bg-bg text-ink relative border-t border-ink/10 overflow-hidden">
      <div ref={gridRef} className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" style={{ clipPath: "circle(0% at 50% 50%)" }}>
        <svg width="100%" height="100%">
          <pattern id="custom-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#custom-grid)" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto space-y-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto select-none overflow-hidden">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold italic leading-tight text-ink"
          >
            <span className="block overflow-hidden py-1">
              <span className="heading-line block transform translate-y-[110%]">Custom Hardware &</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="heading-line block transform translate-y-[110%]">White-Label Solutions</span>
            </span>
          </h2>
        </div>

        <div className="space-y-12">
          <div ref={lineTopRef} className="h-[2px] bg-ink/40 w-full scale-x-0 origin-center" />

          <div ref={colsWrapperRef} className="flex flex-col lg:flex-row items-stretch justify-between py-6 gap-y-8 lg:gap-y-0">
            {features.map((feature, i) => (
              <React.Fragment key={i}>
                <div className="feature-col flex-1 px-8 py-12 flex flex-col justify-center items-start text-left cursor-pointer select-none group relative overflow-hidden rounded-sm transition-all duration-500 hover:bg-ink/[0.02]">
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out" />
                  <div className="w-full overflow-hidden py-1">
                    <h4 className="feature-reveal-text font-sans font-bold text-lg lg:text-xl uppercase tracking-tight text-ink leading-tight pointer-events-none transition-all duration-500 group-hover:text-accent group-hover:translate-x-1 block transform">
                      {feature}
                    </h4>
                  </div>
                </div>
                {i < features.length - 1 && (
                  <div className="hidden lg:block w-[2px] bg-ink/40 self-stretch scale-y-0 origin-center vertical-separator" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div ref={lineBottomRef} className="h-[2px] bg-ink/40 w-full scale-x-0 origin-center" />
        </div>

        <div className="flex justify-center">
          <button
            ref={buttonRef}
            onClick={onLeadClick}
            className="relative overflow-hidden z-10 bg-transparent border border-accent text-accent hover:text-white px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 rounded-sm group/btn flex items-center gap-4 cursor-pointer shadow-xl"
            style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 }}
          >
            <span className="absolute inset-0 bg-accent -z-10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative z-10">Discuss Your Requirements</span>
            <ArrowRight size={14} className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// ROADMAP [BG — HORIZONTAL SCROLL]
// Framer Motion horizontal scroll preserved, heading gets GSAP
// ─────────────────────────────────────────────
const Roadmap = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [scrollProgress, setScrollProgress] = React.useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => setScrollProgress(latest));

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", isMobile ? "-230vw" : "-115vw"]);

  const steps = [
    {
      time: "Today",
      text: "System Integration & Deployment",
      desc: "Setting up native assembly, deploying tailored devices, and establishing our baseline quality.",
    },
    {
      time: "Next",
      text: "Optimization & Control Layer",
      desc: "Building our own firmware optimizations, device control configurations, and deep software integrations.",
    },
    {
      time: "Future",
      text: "Indigenous Hardware, OS & AI Stack",
      desc: "Designing indigenous motherboards, customizing OS layers, and creating our native AI ecosystem.",
    },
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-bg border-t border-ink/5">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex gap-20 md:gap-32 items-center px-[10vw] min-w-max">
          <div className="w-[85vw] md:w-[45vw] shrink-0 space-y-6 pr-12 border-r border-ink/10 flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic tracking-tighter text-ink leading-tight">
              Solving Today.<br />Building Tomorrow.
            </h2>
            <p className="opacity-70 text-lg md:text-xl font-sans leading-relaxed max-w-md">
              We are addressing immediate computing needs while building India's long-term technology foundation.
            </p>
          </div>

          <div className="flex gap-16 md:gap-24 items-center">
            {steps.map((r, i) => {
              const isStepActive =
                (i === 0 && scrollProgress > 0.15) ||
                (i === 1 && scrollProgress > 0.45) ||
                (i === 2 && scrollProgress > 0.75);
              return (
                <div key={i} className="w-[80vw] md:w-[32vw] shrink-0 flex flex-col gap-6 relative group">
                  {i > 0 && (
                    <div className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 w-12 md:w-16 h-[1px] bg-ink/15" />
                  )}
                  <div className="flex items-center gap-3">
                    <div className={`w-3.5 h-3.5 rounded-full border border-bg shadow-sm transition-all duration-500 ${isStepActive ? "bg-accent scale-125" : "bg-ink/20 group-hover:bg-accent/50 group-hover:scale-110"}`} />
                    <span className="font-sans text-[10px] tracking-[0.4em] font-bold uppercase text-ink/50 bg-ink/5 px-3 py-1 rounded-sm">
                      {r.time}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-serif italic font-bold tracking-tight text-ink">{r.text}</h3>
                  <p className="text-sm md:text-base font-sans text-ink/75 leading-relaxed max-w-sm">{r.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-[0.015] pointer-events-none">
        <Brain size={800} strokeWidth={0.2} className="text-ink" />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ECOSYSTEM GALLERY [INK] — heading clip + infinite strip
// ─────────────────────────────────────────────
const EcosystemGallery = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Heading lines clip up
      const lines = sectionRef.current!.querySelectorAll(".eg-line");
      gsap.set(lines, { yPercent: 105 });
      gsap.to(lines, {
        yPercent: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Sub
      const sub = sectionRef.current!.querySelector(".eg-sub") as HTMLElement;
      if (sub) {
        gsap.set(sub, { opacity: 0, y: 20 });
        gsap.to(sub, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.45,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const slides = [
    { label: "IIT Bombay Showcase", sub: "Innovation & Demo Day" },
    { label: "Startup India Summit", sub: "Ecosystem Partnerships" },
    { label: "Campus Lab Setup", sub: "Institutional Deployment" },
    { label: "Founders Meet 2024", sub: "Product Experience" },
    { label: "NASSCOM Pavilion", sub: "Industry Collaboration" },
    { label: "IIT Madras Research Park", sub: "Institutional Collaboration" },
    { label: "Bangalore Founders Meet", sub: "Product Demo" },
    { label: "Delhi Incubation Center", sub: "Startup Support" },
    { label: "BHU Tech Expo", sub: "Ecosystem Showcase" },
    { label: "Hyderabad Tech Hub", sub: "Ecosystem Partnerships" },
  ];

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-ink text-bg border-t border-white/5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 mb-14 text-center flex flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-bg leading-tight mb-4">
            <span className="block overflow-hidden"><span className="eg-line block">Building With the Ecosystem</span></span>
          </h2>
          <p className="eg-sub text-bg/50 text-base font-sans max-w-2xl leading-relaxed">
            Ention is actively engaging with India's startup and innovation ecosystem—collaborating
            with incubators, institutions, and emerging founders. From product showcase to ecosystem
            partnerships, we are building real-world momentum.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-0 w-full overflow-hidden">
        <div className="w-full overflow-hidden flex py-1">
          <motion.div
            className="flex flex-nowrap gap-0 shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 70, repeat: Infinity }}
          >
            {[...slides, ...slides].map((slide, i) => {
              const origIndex = i % slides.length;
              const num = origIndex + 1;
              const formattedIndex = num < 10 ? `0${num}` : `${num}`;
              return (
                <div
                  key={i}
                  className="relative shrink-0 w-[500px] md:w-[640px] h-[320px] md:h-[400px] overflow-hidden bg-white/5 group cursor-default"
                >
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, hsl(${(origIndex * 37 + 20) % 360},12%,12%) 0%, hsl(${(origIndex * 37 + 60) % 360},8%,8%) 100%)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-5 left-5 font-mono text-[9px] text-white/25 tracking-[0.3em] uppercase">{formattedIndex}</span>
                  <div className="absolute bottom-0 left-0 p-6 text-left">
                    <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-accent mb-2">{slide.sub}</p>
                    <h4 className="text-xl font-serif font-bold text-bg leading-snug">{slide.label}</h4>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// FINAL CTA [INK] — cinematic reveal
// ─────────────────────────────────────────────
const FinalCTA = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Heading lines clip up
      const lines = sectionRef.current!.querySelectorAll(".cta-line");
      gsap.set(lines, { yPercent: 110 });
      gsap.to(lines, {
        yPercent: 0,
        stagger: 0.1,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Sub text
      const sub = sectionRef.current!.querySelector(".cta-sub") as HTMLElement;
      if (sub) {
        gsap.set(sub, { opacity: 0, y: 24 });
        gsap.to(sub, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      // Buttons: clip-path wipe from left
      const btns = sectionRef.current!.querySelectorAll(".cta-btn");
      gsap.set(btns, { clipPath: "inset(0 100% 0 0)" });
      gsap.to(btns, {
        clipPath: "inset(0 0% 0 0)",
        stagger: 0.13,
        duration: 0.9,
        delay: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] bg-ink text-bg flex items-center justify-center overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <Image src="/assets/landing_page/final-cta.png" alt="Experience Ention" fill className="object-cover opacity-[0.5] grayscale" unoptimized />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink z-0 pointer-events-none" />
      <div className="z-10 text-center px-4 max-w-5xl">
        <h2 className="text-6xl md:text-8xl text-bg font-serif mb-8 italic leading-[0.85] tracking-tighter drop-shadow-2xl">
          {["Ready to Build,", "Scale, or Upgrade?"].map((line, i) => (
            <span key={i} className="block overflow-hidden py-1">
              <span className="cta-line inline-block">{line}</span>
            </span>
          ))}
        </h2>
        <p className="cta-sub text-bg/60 mb-20 text-xl md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
          Whether you need laptops, labs, or ecosystem partnerships—we're ready to work with you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link
            href="/products"
            className="cta-btn bg-accent text-bg px-14 py-6 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-ink transition-colors duration-500 rounded-sm w-full sm:w-auto shadow-[0_20px_50px_rgba(242,125,38,0.2)] hover:-translate-y-2"
          >
            Explore Laptops
          </Link>
          <Link
            href="/support"
            className="cta-btn bg-transparent text-bg border border-bg/20 px-14 py-6 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-ink transition-colors duration-500 rounded-sm w-full sm:w-auto shadow-sm hover:-translate-y-2 text-center"
          >
            Contact Team
          </Link>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// HOME PAGE ASSEMBLY
// ─────────────────────────────────────────────
export default function HomePage() {
  const [activeForm, setActiveForm] = React.useState<"LEAD" | "PROGRAM" | null>(null);
  const [programName, setProgramName] = React.useState("");

  const openProgramForm = (name: string) => {
    setProgramName(name);
    setActiveForm("PROGRAM");
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white bg-bg">
      <FormModal isOpen={activeForm !== null} onClose={() => setActiveForm(null)}>
        {activeForm === "LEAD" && <LeadSalesForm source="Homepage Quote Request" onSuccess={() => setActiveForm(null)} />}
        {activeForm === "PROGRAM" && <ProgramApplicationForm programName={programName} onSuccess={() => setActiveForm(null)} />}
      </FormModal>

      <main>
        <Ticker />
        <Hero />
        <LaptopSolutions onLeadClick={() => setActiveForm("LEAD")} />
        <ChooseLaptop />
        <ProgramsEcosystem onProgramClick={openProgramForm} />
        <CustomOEM onLeadClick={() => setActiveForm("LEAD")} />
        <WhyChooseSection />
        <ShowcaseSection />
        <Roadmap />
        <AvailabilitySection />
        <ExperienceProgram onProgramClick={openProgramForm} />
        <EcosystemGallery />
        <FinalCTA />
      </main>
    </div>
  );
}
