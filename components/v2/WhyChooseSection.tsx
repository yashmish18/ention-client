"use client";

import React from "react";
import Image from "next/image";
import { Sliders, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const BENEFITS = [
  {
    title: "Customization & Affordability",
    desc: "Get personalized hardware configurations without the enterprise price tag.",
    icon: Sliders,
    points: [
      "Affordable customizable configurations built-to-order",
      "Tailored to your specific compute & memory needs",
      "No compromise on thermals or hardware performance",
    ],
  },
  {
    title: "Integrated Ecosystem",
    desc: "Full stack hardware, software, and community partnerships working in synergy.",
    icon: Layers,
    points: [
      "Unified hardware, localized deployment, and program support",
      "Ecosystem resources updated continuously with direct engineering loops",
      "Designed to scale fluidly as your lab or enterprise expands",
    ],
  },
  {
    title: "Trust & Reliability",
    desc: "Rigorous thermal testing, localized maintenance support, and robust quality guarantees.",
    icon: ShieldCheck,
    points: [
      "Obsessively engineered for sustained consistent performance",
      "Premium support channels and direct developer access",
      "18-Month Warranty & Premium build quality guarantee",
    ],
  },
];

export default function WhyChooseSection() {
  return (
    <section
      id="why-choose"
      className="px-6 md:px-12 lg:px-20 py-24 lg:py-36 bg-ink text-bg border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* 1. Large Top Widescreen Visual Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-[320px] md:h-[480px] overflow-hidden border border-white/10 bg-neutral-900 group"
        >
          <Image
            src="/assets/landing_page/slide-2.png" // Gorgeous laptop workspace photo
            alt="Ention Hardware Assembly and Craftsmanship"
            fill
            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
          
          {/* Banner content */}
          <div className="absolute bottom-10 left-8 right-8 md:left-12 md:right-12 text-left space-y-3 z-10">
            <h2 className="text-4xl md:text-6xl font-serif font-black italic tracking-tighter text-white leading-none">
              Why Choose Ention?
            </h2>
            <p className="text-white/60 font-sans text-sm md:text-base max-w-2xl leading-relaxed">
              We engineer our systems with direct feedback loops from developers and researchers, sourcing premium materials and offering localized warranty support without compromise.
            </p>
          </div>
        </motion.div>

        {/* 2. Bottom 3-Column Typographic Benefits Grid (No Background Images) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-6">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col space-y-6 text-left border-t border-white/10 pt-8 relative group"
              >
                {/* Visual top bar indicator on hover */}
                <div className="absolute top-[-1px] left-0 w-12 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 group-hover:w-full transition-all duration-500 origin-left" />

                <div className="flex items-center justify-between">
                  <div className="text-accent/60 group-hover:text-accent transition-colors duration-300">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-serif font-bold italic text-white tracking-tight leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-white/50 font-sans leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>

                <ul className="space-y-3 pt-2">
                  {benefit.points.map((pt, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-xs text-white/75 font-sans leading-relaxed"
                    >
                      <CheckCircle2 size={12} className="text-accent shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
