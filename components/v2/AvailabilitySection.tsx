"use client";

import React from "react";
import Image from "next/image";
import { Globe, ShoppingCart, GraduationCap, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const CHANNELS = [
  {
    title: "Website",
    desc: "Browse our catalog and configure your custom machine online with worldwide shipping.",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
    href: "/products",
    linkText: "Configure Now",
    yOffset: "translate-y-0",
  },
  {
    title: "E-commerce",
    desc: "Available through premium authorized online retailers and regional e-com hubs.",
    icon: ShoppingCart,
    image: "/assets/landing_page/slide-3.png", // Using high-quality local slide asset
    href: "#",
    linkText: "Find Retailer",
    yOffset: "md:translate-y-12",
  },
  {
    title: "Campus",
    desc: "Access student discounts, developer grants, and direct institutional sales.",
    icon: GraduationCap,
    image: "/assets/landing_page/stud.png", // Using student photo local asset
    href: "#",
    linkText: "Apply Pricing",
    yOffset: "md:translate-y-24",
  },
];

export default function AvailabilitySection() {
  return (
    <section
      id="order"
      className="px-6 md:px-12 lg:px-20 py-24 lg:py-40 bg-ink text-bg border-t border-white/5 relative overflow-hidden"
    >
      {/* Decorative vertical grid lines */}
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-white/[0.03] pointer-events-none" />
      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/[0.03] pointer-events-none" />
      <div className="absolute inset-y-0 left-3/4 w-[1px] bg-white/[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Side: Typography Intro */}
        <div className="w-full lg:w-[28%] flex flex-col justify-start text-left space-y-6 lg:sticky lg:top-32">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter text-white leading-tight">
            Availability
          </h2>
          <p className="text-white/50 font-sans leading-relaxed text-sm max-w-sm">
            Ention systems are distributed through official channels, select regional e-commerce partners, and specialized campus ambassador networks.
          </p>
          <div className="h-[2px] w-16 bg-accent/50 pt-0.5" />
        </div>

        {/* Right Side: Staggered Full-Opacity Image Cards */}
        <div className="w-full lg:w-[72%] grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-6 md:pb-28">
          {CHANNELS.map((channel, i) => {
            const Icon = channel.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                className={`flex flex-col bg-neutral-900/60 border border-white/5 hover:border-accent/30 transition-all duration-700 group overflow-hidden ${channel.yOffset}`}
              >
                {/* 1. Full-Opacity Crisp Image on Top */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-950">
                  <Image
                    src={channel.image}
                    alt={channel.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    unoptimized
                  />
                  {/* Subtle top/bottom shadow for visual balance */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40 pointer-events-none" />
                </div>

                {/* 2. Clean Detailed Text Content Below */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-6 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon size={16} className="text-accent shrink-0" />
                      <h3 className="text-lg md:text-xl font-serif font-bold italic text-white tracking-tight leading-none">
                        {channel.title}
                      </h3>
                    </div>
                    
                    <p className="text-xs text-white/60 font-sans leading-relaxed min-h-[48px]">
                      {channel.desc}
                    </p>
                  </div>

                  <a
                    href={channel.href}
                    className="group/btn flex items-center justify-between text-[10px] font-mono tracking-widest font-black uppercase text-accent border-t border-white/5 pt-4 hover:text-white transition-colors duration-300"
                  >
                    <span>{channel.linkText}</span>
                    <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
