"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sliders, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";

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

const WarrantyBadge = () => (
  <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-4 py-3 rounded-md shadow-inner select-none transition-colors duration-300 hover:border-accent/40">
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" className="text-accent shrink-0">
      <rect width="40" height="40" rx="8" fill="#F27D26" fillOpacity="0.08" />
      <path d="M20 5.5L31.5 9.5V19.5C31.5 26.5 26.6 33 20 35C13.4 33 8.5 26.5 8.5 19.5V9.5L20 5.5Z" stroke="#F27D26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 19.5L18.5 23L25 15.5" stroke="#F27D26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <div className="flex flex-col items-start">
      <span className="text-[10px] font-black font-mono tracking-wider leading-none text-white">18-MONTH</span>
      <span className="text-[7.5px] font-black font-mono tracking-widest text-accent uppercase mt-1">WARRANTY</span>
    </div>
  </div>
);

const MadeInIndiaBadge = () => (
  <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-4 py-3 rounded-md shadow-inner select-none transition-colors duration-300 hover:border-accent/40">
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" className="text-accent shrink-0">
      <rect width="40" height="40" rx="8" fill="#F27D26" fillOpacity="0.08" />
      {/* Elegant Chakra wheel representation */}
      <circle cx="20" cy="20" r="10" stroke="#F27D26" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="20" cy="20" r="4" stroke="#F27D26" strokeWidth="1.5" />
      <path d="M20 10V30M10 20H30" stroke="#F27D26" strokeWidth="0.75" />
      <path d="M13 13L27 27M13 27L27 13" stroke="#F27D26" strokeWidth="0.75" />
    </svg>
    <div className="flex flex-col items-start">
      <span className="text-[10px] font-black font-mono tracking-wider leading-none text-white">MADE IN INDIA</span>
      <span className="text-[7.5px] font-black font-mono tracking-widest text-[#50c878] uppercase mt-1">INDIGENOUS TECH</span>
    </div>
  </div>
);

export default function WhyChooseSection() {
  const cards = [
    {
      num: "01",
      title: "Customization & Affordability",
      desc: "Get personalized hardware configurations without the enterprise price tag.",
      icon: Sliders,
      points: [
        "Affordable customizable solutions",
        "Tailored to your specific needs",
        "Without compromising quality or performance"
      ]
    },
    {
      num: "02",
      title: "Integrated Ecosystem",
      desc: "Full stack hardware, software, and community partnerships working in synergy.",
      icon: Layers,
      points: [
        "Hardware, ecosystem, and program support",
        "Continuously evolving with innovation",
        "Built to scale as your needs grow"
      ]
    },
    {
      num: "03",
      title: "Trust & Reliability",
      desc: "Rigorous thermal testing, localized maintenance support, and robust quality guarantees.",
      icon: ShieldCheck,
      points: [
        "Engineered for consistent performance",
        "Built with reliability you can depend on"
      ],
      showBadges: true
    }
  ];

  return (
    <section id="why-choose" className="px-8 py-20 lg:py-32 bg-ink text-bg border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto space-y-20">
        
        {/* Header Block */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <FadeUp>
            <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter leading-tight text-bg">
              Why Choose Ention?
            </h2>
            <p className="text-lg opacity-60 font-sans leading-relaxed text-bg max-w-2xl mx-auto mt-4">
              We build with obsession, source with integrity, and support without compromise to deliver computing tailored for Bharat.
            </p>
          </FadeUp>
        </div>

        {/* 3-Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <FadeUp key={i} delay={i * 0.1} className="h-full">
                <div className="group bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-sm hover:border-accent/40 hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between h-full shadow-2xl relative">
                  
                  {/* Top Header details */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-accent/50 tracking-wider">
                        — {card.num}
                      </span>
                      <Icon size={24} className="text-accent opacity-80 group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl md:text-3xl font-serif font-bold italic tracking-tight text-bg">
                        {card.title}
                      </h3>
                      <p className="text-xs text-bg/40 font-sans leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] bg-white/5 w-full my-6" />

                    {/* Points list */}
                    <ul className="space-y-4">
                      {card.points.map((pt, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                          <span className="text-sm text-bg/85 leading-relaxed font-sans font-medium">
                            {pt}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Badges/Logos for Box 3 */}
                  {card.showBadges && (
                    <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/5">
                      <WarrantyBadge />
                      <MadeInIndiaBadge />
                    </div>
                  )}

                  {/* Aesthetic card glow */}
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5 group-hover:bg-accent transition-all duration-500" />

                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
