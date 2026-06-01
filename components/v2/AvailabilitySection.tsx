"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, ShoppingCart, GraduationCap } from "lucide-react";

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function AvailabilitySection() {
  const cards = [
    {
      num: "01",
      title: "Website",
      desc: "Browse our full catalog, compare specs, and configure your custom machine directly online.",
      tag: "ention.in",
      icon: Globe,
    },
    {
      num: "02",
      title: "E-commerce",
      desc: "Available through select retail partners across India and select global markets.",
      tag: "Retail Partners",
      icon: ShoppingCart,
    },
    {
      num: "03",
      title: "Campus",
      desc: "Special education pricing, hands-on workshops, and direct support for students and faculty.",
      tag: "Education Program",
      icon: GraduationCap,
    },
  ];

  return (
    <section id="order" className="px-8 py-20 lg:py-32 bg-ink text-bg border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto space-y-20">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <FadeUp>
            <span className="font-mono text-xs text-accent uppercase tracking-[0.4em] font-bold block mb-2">
              — Availability
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter leading-tight text-bg">
              How to Acquire
            </h2>
            <p className="text-lg opacity-60 font-sans leading-relaxed text-bg mt-4">
              Access the Ention ecosystem online, through verified retail channels, or via our campus network.
            </p>
          </FadeUp>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="group relative flex flex-col items-center text-center p-10 bg-white/5 border border-white/5 rounded-sm hover:border-accent/40 hover:bg-white/10 transition-all duration-500 min-h-[320px] justify-between shadow-lg">
                  {/* Top Index Badge */}
                  <span className="absolute top-6 left-6 font-mono text-[10px] text-white/20 tracking-wider">
                    {card.num}
                  </span>

                  {/* Top Icon */}
                  <div className="mt-4 p-4 rounded-full bg-accent/15 border border-accent/25 group-hover:scale-110 transition-transform duration-500">
                    <Icon size={32} className="text-accent" />
                  </div>

                  {/* Body Content */}
                  <div className="space-y-4 my-6">
                    <h3 className="text-2xl font-serif font-bold italic text-bg tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-bold">
                      {card.tag}
                    </p>
                    <p className="text-sm text-bg/60 leading-relaxed font-sans max-w-xs">
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom Line */}
                  <div className="h-[1px] w-12 bg-white/10 group-hover:w-full group-hover:bg-accent transition-all duration-500 mt-2" />
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
