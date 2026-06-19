"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Brain, Cpu, GraduationCap, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Ticker } from "@/components/Ticker";
import { MainHeroCarousel } from "@/components/MainHeroCarousel";
import FormModal from "@/components/FormModal";
import LeadSalesForm from "@/components/forms/LeadSalesForm";
import ProgramApplicationForm from "@/components/forms/ProgramApplicationForm";
import AvailabilitySection from "@/components/v2/AvailabilitySection";
import WhyChooseSection from "@/components/v2/WhyChooseSection";
import ShowcaseSection from "@/components/v2/ShowcaseSection";
import { ExperienceProgram } from "@/components/ExperienceProgram";
import { InquirySource } from "@/lib/inquiry-sources";
import FAQSection from "@/components/v2/FAQSection";

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
const Hero = () => <MainHeroCarousel />;

// ─────────────────────────────────────────────
// LAPTOP SOLUTIONS — Sleek Typographic Icon Cards
// ─────────────────────────────────────────────
const LaptopSolutions = () => {
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
      icon: Cpu,
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
      icon: Terminal,
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
      icon: GraduationCap,
    },
  ];

  return (
    <section className="px-8 py-24 lg:py-32 bg-bg text-ink border-t border-ink/5">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-20 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter leading-tight py-2 text-center"
        >
          Laptop Solutions for Every Need
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 max-w-7xl mx-auto px-4 items-stretch">
        {/* Editorial vertical image column */}
        <div className="relative overflow-hidden group min-h-[320px] lg:h-auto border border-ink/10 flex flex-col justify-end p-8 lg:p-10 text-left bg-neutral-900 shadow-sm">
          <Image
            src="/assets/landing_page/prof.png"
            alt="Professional workspace solutions"
            fill
            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <h3 className="text-2xl font-serif font-black italic tracking-tighter text-white leading-tight">
              Engineered for Purpose
            </h3>
            <p className="text-xs text-white/70 font-sans leading-relaxed">
              Discover tailor-made computing configurations built around real professional workflows.
            </p>
          </div>
        </div>

        {/* 3 cards grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.85, delay: i * 0.1, ease: "easeOut" }}
                className="bg-white text-ink border border-ink/10 transition-all duration-700 hover:border-accent hover:shadow-2xl flex flex-col justify-between rounded-none p-8 relative min-h-[380px] group overflow-hidden select-none text-left"
              >
                {/* Background decorative element */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-accent/5 to-transparent rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="z-10">
                  {/* Glowing Icon Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 flex items-center justify-center bg-accent/5 border border-accent/10 rounded-sm text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm shadow-accent/10">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-serif font-bold italic mb-2 tracking-tight text-ink leading-tight">
                    {card.title}
                  </h3>
                  <p className="font-sans text-xs font-semibold text-ink/40 mb-6">{card.subtitle}</p>
                  
                  <ul className="space-y-3">
                    {card.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs font-medium tracking-wide text-ink/75 leading-relaxed">
                        <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="z-10 mt-auto pt-6 border-t border-ink/5">
                  <Link
                    href={card.href}
                    className="relative overflow-hidden z-10 bg-transparent border border-ink/20 text-ink hover:text-white px-6 py-3.5 text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-3 w-max transition-colors duration-500 group/btn"
                  >
                    <span className="absolute inset-0 bg-accent -z-10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <span className="relative z-10">{card.btn}</span>
                    <ArrowRight size={12} className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// CHOOSE LAPTOP — Specifications Showcase (Workbook & Swapbook)
// ─────────────────────────────────────────────
const ChooseLaptop = () => {
  return (
    <div className="w-full flex flex-col relative">
      {/* PART 1: CHOOSE YOUR ENTION (Dark Showcase Image Only) */}
      <section className="w-full min-h-[450px] md:min-h-[600px] relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/landing_page/slide-1.png"
            alt="Ention Showcase Background"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* PART 2: SPECIFICATIONS GRID (Light-Grey Section, 2 Columns for Workbook & Swapbook) */}
      <section className="w-full bg-[#efeeea] text-ink py-20 px-6 md:px-12 lg:px-20 border-t border-ink/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-ink/10 items-stretch">
          
          {/* Column 1: WORKBOOK */}
          <div className="flex flex-col text-left justify-between space-y-8 w-full py-8 lg:py-0 lg:pr-16">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-sans font-black tracking-tight uppercase">
                WORKBOOK SERIES
              </h3>
              <p className="text-xs md:text-sm font-sans font-medium text-ink/60 leading-relaxed min-h-[60px]">
                The Ention Workbook series is meticulously engineered to provide the perfect balance of performance, durability and modern aesthetics.
              </p>
              <div className="w-12 h-[1px] bg-ink/15 pt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full">
              {/* Specs & CTA on Left */}
              <div className="md:col-span-7 space-y-8 relative z-10">
                {/* Brand Logos Row */}
                <div className="flex flex-nowrap items-center gap-3 w-full">
                  <div className="w-10 h-10 shrink-0 select-none bg-gradient-to-br from-[#00c6ff] to-[#0072ff] flex flex-col justify-between p-1.5 text-white font-sans">
                    <span className="text-[6px] font-black tracking-tight leading-none uppercase">intel</span>
                    <span className="text-[8px] font-black tracking-tighter leading-none text-right">CORE i5</span>
                  </div>
                  <div className="w-10 h-10 shrink-0 select-none bg-gradient-to-br from-[#00c6ff] to-[#0072ff] flex flex-col justify-between p-1.5 text-white font-sans">
                    <span className="text-[6px] font-black tracking-tight leading-none uppercase">intel</span>
                    <span className="text-[8px] font-black tracking-tighter leading-none text-right">CORE i7</span>
                  </div>
                  <div className="w-10 h-10 shrink-0 select-none bg-[#0071c5] flex flex-col items-center justify-center p-1.5 text-white font-sans relative overflow-hidden">
                    <div className="absolute inset-0 border border-white/20 scale-125 -translate-y-2 translate-x-2" />
                    <span className="text-[5px] font-medium opacity-80 leading-none lowercase">intel</span>
                    <span className="text-[7px] font-bold leading-none uppercase tracking-wide">inside</span>
                  </div>
                  {/* Windows 11 */}
                  <div className="flex items-center gap-1.5 ml-2 shrink-0 whitespace-nowrap">
                    <svg className="w-4 h-4 text-[#0078d4] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 0h11.5v11.5H0zM12.5 0H24v11.5H12.5zM0 12.5h11.5V24H0zM12.5 12.5H24V24H12.5z" />
                    </svg>
                    <span className="text-[10px] font-sans font-bold tracking-wider text-ink/75 uppercase">Windows 11</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/products/e4"
                    className="border border-ink/20 hover:border-accent hover:text-accent rounded-md px-6 py-2.5 text-[10px] font-sans font-bold uppercase tracking-wider transition-all duration-300 w-max flex items-center gap-2 group"
                  >
                    View Workbook Series <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Laptop Image on Right */}
              <div className="md:col-span-5 relative w-full h-[280px] md:h-[380px] lg:h-[420px] pointer-events-none overflow-visible flex items-center justify-center z-0">
                <Image
                  src="/assets/images/e4/E4 laptop photo transparent background png/2.png"
                  alt="Workbook"
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-transform duration-500"
                  style={{ transform: 'scale(2.35)', transformOrigin: 'center' }}
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Column 2: SWAPBOOK */}
          <div className="flex flex-col text-left justify-between space-y-8 w-full py-8 lg:py-0 lg:pl-16">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-sans font-black tracking-tight uppercase">
                SWAPBOOK SERIES
              </h3>
              <p className="text-xs md:text-sm font-sans font-medium text-ink/60 leading-relaxed min-h-[60px]">
                The Ention Swapbook series is purpose-built for designers, gamers, and creators who require uncompromising rendering performance.
              </p>
              <div className="w-12 h-[1px] bg-ink/15 pt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full">
              {/* Specs & CTA on Left */}
              <div className="md:col-span-7 space-y-8 relative z-10">
                {/* Brand Logos Row */}
                <div className="flex flex-nowrap items-center gap-3 w-full">
                  <div className="w-10 h-10 shrink-0 select-none bg-gradient-to-br from-[#00c6ff] to-[#0072ff] flex flex-col justify-between p-1.5 text-white font-sans">
                    <span className="text-[6px] font-black tracking-tight leading-none uppercase">intel</span>
                    <span className="text-[8px] font-black tracking-tighter leading-none text-right">CORE i7</span>
                  </div>
                  <div className="w-10 h-10 shrink-0 select-none bg-gradient-to-br from-[#1e3c72] to-[#2a5298] flex flex-col justify-between p-1.5 text-white font-sans border border-yellow-500/30">
                    <span className="text-[6px] font-black tracking-tight leading-none uppercase">intel</span>
                    <span className="text-[8px] font-black tracking-tighter leading-none text-right text-yellow-400">CORE i9</span>
                  </div>
                  <div className="w-14 h-10 shrink-0 select-none bg-black flex flex-col justify-between p-1.5 text-white font-sans border-l-2 border-[#76b900]">
                    <span className="text-[5px] font-medium text-[#76b900] leading-none uppercase tracking-wider">GEFORCE</span>
                    <span className="text-[8px] font-black leading-none tracking-tighter text-right">RTX</span>
                  </div>
                  {/* Windows 11 */}
                  <div className="flex items-center gap-1.5 ml-2 shrink-0 whitespace-nowrap">
                    <svg className="w-4 h-4 text-[#0078d4] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 0h11.5v11.5H0zM12.5 0H24v11.5H12.5zM0 12.5h11.5V24H0zM12.5 12.5H24V24H12.5z" />
                    </svg>
                    <span className="text-[10px] font-sans font-bold tracking-wider text-ink/75 uppercase">Windows 11</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/products/s1"
                    className="border border-ink/20 hover:border-accent hover:text-accent rounded-md px-6 py-2.5 text-[10px] font-sans font-bold uppercase tracking-wider transition-all duration-300 w-max flex items-center gap-2 group"
                  >
                    View Swapbook Series <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Laptop Image on Right */}
              <div className="md:col-span-5 relative w-full h-[280px] md:h-[380px] lg:h-[420px] pointer-events-none overflow-visible flex items-center justify-center z-0">
                <Image
                  src="/assets/images/s1/S1 gaming laptop transparent background png/12.png"
                  alt="Swapbook"
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-transform duration-500"
                  style={{ transform: 'scaleX(-2.35) scaleY(2.35)', transformOrigin: 'center' }}
                  unoptimized
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

// ─────────────────────────────────────────────
// PROGRAMS ECOSYSTEM — Checkerboard Grid
// ─────────────────────────────────────────────
const ProgramsEcosystem = ({ onProgramClick }: { onProgramClick: (name: string, source: InquirySource) => void }) => {
  const items = [
    {
      title: "Innovation Labs & Institutional Programs",
      desc: "Build future-ready labs for learning and research. We customize systems and configurations to fit academic needs.",
      btn: "Build Your Lab",
      source: "homepage_build_lab" as InquirySource,
      isImage: false,
    },
    {
      title: "Startup Ecosystem Partnerships",
      desc: "Empower rising startups with access to local computing resources and developer support.",
      btn: "Partner With Us",
      source: "homepage_experience_program" as InquirySource,
      isImage: true,
      image: "/assets/landing_page/exp.png",
    },
    {
      title: "Campus Ambassador Program",
      desc: "Lead technology innovation directly on your campus, run workshops, and receive exclusive student grants.",
      btn: "Join Program",
      source: "homepage_experience_program" as InquirySource,
      isImage: false,
    },
    {
      title: "Co-Creation & Shared Innovation",
      desc: "Collaborate directly with Ention engineers to customize hardware designs and software layers.",
      btn: "Start Collaboration",
      source: "homepage_experience_program" as InquirySource,
      isImage: true,
      image: "/assets/landing_page/stud.png",
    },
  ];

  return (
    <section className="px-8 py-24 lg:py-36 bg-ink text-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header Block */}
        <div className="text-left max-w-2xl space-y-4">
          <h2 className="text-4xl md:text-6xl font-serif font-black italic tracking-tighter text-white leading-tight">
            Beyond Devices.<br />Build With Us.
          </h2>
          <p className="text-white/50 font-sans leading-relaxed text-sm max-w-xl">
            We configure labs, enable startups, and co-create innovation infrastructure.
          </p>
        </div>

        {/* Alternating Checkerboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {items.map((item, i) => {
            if (!item.isImage) {
              return (
                <div
                  key={i}
                  className="border border-white/10 bg-neutral-900/40 p-8 flex flex-col justify-between min-h-[380px] text-left relative group rounded-none"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-serif italic font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => onProgramClick(item.title, item.source)}
                    className="w-full relative overflow-hidden z-10 bg-accent text-white border border-accent px-6 py-3.5 text-[9px] uppercase font-bold tracking-[0.2em] transition-all duration-500 flex items-center justify-between rounded-none group-hover:bg-white group-hover:text-black group-hover:border-white cursor-pointer"
                  >
                    <span>{item.btn}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-500" />
                  </button>
                </div>
              );
            } else {
              return (
                <div
                  key={i}
                  onClick={() => onProgramClick(item.title, item.source)}
                  className="relative border border-white/10 group cursor-pointer overflow-hidden flex flex-col justify-end min-h-[380px] p-8 text-left rounded-none select-none"
                >
                  <Image
                    src={item.image!}
                    alt={item.title}
                    fill
                    className="object-cover opacity-50 group-hover:scale-105 group-hover:opacity-75 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none z-0" />
                  
                  <div className="relative z-10 space-y-3">
                    <h3 className="text-xl font-serif italic font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-[80px] overflow-hidden">
                      {item.desc}
                    </p>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-accent border-b border-accent/20 pb-0.5 inline-flex items-center gap-1.5 pt-2 group-hover:text-white group-hover:border-white transition-colors duration-300">
                      {item.btn} <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// CUSTOM OEM — Interactive Dashboard
// ─────────────────────────────────────────────
const CustomOEM = ({ onLeadClick }: { onLeadClick: () => void }) => {
  const [activeOEM, setActiveOEM] = React.useState(0);

  const cards = [
    {
      title: "Tailored Configurations",
      desc: "Customize memory, storage, and processors specifically for your workload requirements.",
      image: "/assets/landing_page/b2b.png",
    },
    {
      title: "Dedicated Production Batches",
      desc: "Specially prepared assembly batches with rigorous quality assurance checks.",
      image: "/assets/ention_packaging.png",
    },
    {
      title: "Dedicated Deployment Support",
      desc: "Direct integration assistance, custom network configurations, and rapid onboarding.",
      image: "/assets/landing_page/exp.png",
    },
    {
      title: "Dedicated After-Sales Service",
      desc: "Fast-tracked repair requests, dedicated engineering hotlines, and onsite technical support.",
      image: "/assets/service_technician.png",
    },
  ];

  return (
    <section className="px-8 py-24 lg:py-36 bg-bg text-ink relative border-t border-ink/10 overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold italic leading-tight text-ink text-center py-2">
            Custom Hardware &<br />White-Label Solutions
          </h2>
        </div>

        {/* Interactive Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Pane */}
          <div className="w-full lg:col-span-5 flex justify-center">
            <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-[480px] h-auto overflow-hidden border border-ink/10 bg-neutral-900 group shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOEM}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={cards[activeOEM].image}
                    alt={cards[activeOEM].title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/30" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/30" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/30" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/30" />

              <div className="absolute bottom-6 left-6 right-6 text-left z-10">
                <h4 className="text-lg font-serif italic text-white font-bold">
                  {cards[activeOEM].title}
                </h4>
              </div>
            </div>
          </div>

          {/* Right Pane */}
          <div className="w-full lg:col-span-7 flex flex-col space-y-4">
            {cards.map((card, i) => {
              const isActive = activeOEM === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveOEM(i)}
                  className={`p-6 border cursor-pointer transition-all duration-500 text-left select-none rounded-none flex items-start gap-4 ${
                    isActive
                      ? "bg-white shadow-xl border-accent/30 translate-x-2"
                      : "bg-neutral-50/50 hover:bg-neutral-50 border-ink/5 hover:border-ink/10"
                  }`}
                >
                  <span className={`font-mono text-xs font-bold shrink-0 ${isActive ? "text-accent" : "text-ink/20"}`}>
                    0{i + 1}
                  </span>
                  <div className="space-y-1">
                    <h4 className={`font-sans font-bold text-base uppercase tracking-tight leading-none transition-colors duration-300 ${
                      isActive ? "text-accent" : "text-ink"
                    }`}>
                      {card.title}
                    </h4>
                    <p className="text-xs text-ink/65 font-sans leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <button
            onClick={onLeadClick}
            className="relative overflow-hidden z-10 bg-transparent border border-accent text-accent hover:text-white px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 rounded-none group/btn flex items-center gap-4 cursor-pointer shadow-none"
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
// ROADMAP — Horizontal Scroll
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
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
    },
    {
      time: "Next",
      text: "Optimization & Control Layer",
      desc: "Building our own firmware optimizations, device control configurations, and deep software integrations.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=600&auto=format&fit=crop",
    },
    {
      time: "Future",
      text: "Indigenous Hardware, OS & AI Stack",
      desc: "Designing indigenous motherboards, customizing OS layers, and creating our native AI ecosystem.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-bg border-t border-ink/5">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex gap-20 md:gap-32 items-center px-[10vw] min-w-max">
          <div className="w-[85vw] md:w-[45vw] shrink-0 space-y-6 pr-12 border-r border-ink/10 flex flex-col justify-center text-left">
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic tracking-tighter text-ink leading-tight text-left">
              Solving Today.<br />Building Tomorrow.
            </h2>
            <p className="opacity-70 text-lg md:text-xl font-sans leading-relaxed max-w-md text-left">
              We are addressing immediate computing needs while building a resilient, long-term technology foundation.
            </p>
          </div>

          <div className="flex gap-16 md:gap-24 items-center">
            {steps.map((r, i) => {
              const isStepActive =
                (i === 0 && scrollProgress > 0.15) ||
                (i === 1 && scrollProgress > 0.45) ||
                (i === 2 && scrollProgress > 0.75);
              return (
                <div key={i} className="w-[80vw] md:w-[32vw] shrink-0 flex flex-col gap-5 relative group text-left">
                  {i > 0 && (
                    <div className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 w-12 md:w-16 h-[1px] bg-ink/15" />
                  )}

                  {/* Visual theme card */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden border border-ink/10 bg-neutral-100/50 mb-2 group-hover:shadow-lg transition-shadow duration-500">
                    <Image
                      src={r.image}
                      alt={r.text}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      unoptimized
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-3.5 h-3.5 rounded-full border border-bg shadow-sm transition-all duration-500 ${isStepActive ? "bg-accent scale-125" : "bg-ink/20 group-hover:bg-accent/50 group-hover:scale-110"}`} />
                    <span className="font-sans text-[10px] tracking-[0.4em] font-bold uppercase text-ink/50 bg-ink/5 px-3 py-1 rounded-sm">
                      {r.time}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-serif italic font-bold tracking-tight text-ink text-left">{r.text}</h3>
                  <p className="text-sm md:text-base font-sans text-ink/75 leading-relaxed max-w-sm text-left">{r.desc}</p>
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
// ECOSYSTEM GALLERY — Infinite loop
// ─────────────────────────────────────────────
const EcosystemGallery = () => {
  const slides = [
    {
      label: "IIT Bombay Showcase",
      sub: "Innovation & Demo Day",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
    },
    {
      label: "Startup India Summit",
      sub: "Ecosystem Partnerships",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
    },
    {
      label: "Campus Lab Setup",
      sub: "Institutional Deployment",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop",
    },
    {
      label: "Founders Meet 2024",
      sub: "Product Experience",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
    },
    {
      label: "NASSCOM Pavilion",
      sub: "Industry Collaboration",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    },
    {
      label: "IIT Madras Research Park",
      sub: "Institutional Collaboration",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
    },
    {
      label: "Bangalore Founders Meet",
      sub: "Product Demo",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600&auto=format&fit=crop",
    },
    {
      label: "Delhi Incubation Center",
      sub: "Startup Support",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
    },
    {
      label: "BHU Tech Expo",
      sub: "Ecosystem Showcase",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop",
    },
    {
      label: "Hyderabad Tech Hub",
      sub: "Ecosystem Partnerships",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-ink text-bg border-t border-white/5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 mb-14 text-center flex flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-serif font-bold text-bg leading-tight mb-4 text-center py-2"
          >
            Building With the Ecosystem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-bg/50 text-base font-sans max-w-2xl leading-relaxed mt-4 text-center"
          >
            Ention is actively engaging with the startup and innovation ecosystem—collaborating
            with incubators, institutions, and emerging founders. From product showcase to ecosystem
            partnerships, we are building real-world momentum.
          </motion.p>
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
                  className="relative shrink-0 w-[500px] md:w-[640px] h-[320px] md:h-[400px] overflow-hidden bg-neutral-900 group cursor-default border border-white/5"
                >
                  {/* Slide Image */}
                  <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                    <Image
                      src={slide.image}
                      alt={slide.label}
                      fill
                      className="object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-700"
                      unoptimized
                    />
                  </div>

                  {/* Subtle color tint overlay */}
                  <div
                    className="absolute inset-0 mix-blend-color opacity-25 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, hsl(${(origIndex * 37 + 20) % 360},60%,40%) 0%, hsl(${(origIndex * 37 + 60) % 360},50%,30%) 100%)`
                    }}
                  />

                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 z-1" />

                  <span className="absolute top-5 left-5 font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase z-10">{formattedIndex}</span>
                  <div className="absolute bottom-0 left-0 p-6 text-left z-10">
                    <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-accent mb-2">{slide.sub}</p>
                    <h4 className="text-xl font-serif font-bold text-white leading-snug">{slide.label}</h4>
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
// FINAL CTA
// ─────────────────────────────────────────────
const FinalCTA = () => {
  return (
    <section className="relative min-h-[90vh] bg-ink text-bg flex items-center justify-center overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <Image src="/assets/landing_page/final-cta.png" alt="Experience Ention" fill className="object-cover opacity-[0.5] grayscale" unoptimized />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink z-0 pointer-events-none" />
      <div className="z-10 text-center px-4 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl text-bg font-serif mb-8 italic leading-none tracking-tighter py-2 text-center"
        >
          Ready to Build,<br />Scale, or Upgrade?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-bg/60 mb-20 text-xl md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed text-center"
        >
          Whether you need laptops, labs, or ecosystem partnerships—we&apos;re ready to work with you.
        </motion.p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link
            href="/products"
            className="bg-accent text-bg px-14 py-6 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-ink transition-colors duration-500 rounded-none w-full sm:w-auto text-center"
          >
            Explore Laptops
          </Link>
          <Link
            href="/support"
            className="bg-transparent text-bg border border-bg/20 px-14 py-6 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-ink transition-colors duration-500 rounded-none w-full sm:w-auto text-center"
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
  const [programSource, setProgramSource] = React.useState<InquirySource>("homepage_experience_program");

  const openProgramForm = (name: string, source: InquirySource = "homepage_experience_program") => {
    setProgramName(name);
    setProgramSource(source);
    setActiveForm("PROGRAM");
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white bg-bg">
      <FormModal isOpen={activeForm !== null} onClose={() => setActiveForm(null)}>
        {activeForm === "LEAD" && <LeadSalesForm source="homepage_request_quote" onSuccess={() => setActiveForm(null)} />}
        {activeForm === "PROGRAM" && <ProgramApplicationForm programName={programName} source={programSource} onSuccess={() => setActiveForm(null)} />}
      </FormModal>

      <main>
        <Ticker />
        <Hero />
        <LaptopSolutions />
        <ChooseLaptop />
        <ProgramsEcosystem onProgramClick={openProgramForm} />
        <CustomOEM onLeadClick={() => setActiveForm("LEAD")} />
        <WhyChooseSection />
        <ShowcaseSection />
        <Roadmap />
        <AvailabilitySection />
        <ExperienceProgram onProgramClick={openProgramForm} />
        <EcosystemGallery />
        <FAQSection />
        <FinalCTA />
      </main>
    </div>
  );
}
