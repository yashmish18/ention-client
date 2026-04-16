"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, Shield, Cpu, Maximize } from "lucide-react";

const FEATURES = [
    {
        icon: Cpu,
        title: "Silicon Mastery",
        desc: "Equipped with the latest Intel and AMD architectures, tailored for high-frequency workflows."
    },
    {
        icon: Shield,
        title: "Sovereign Security",
        desc: "Hardware-level encryption and secure boot protocols designed in Bharat."
    },
    {
        icon: Zap,
        title: "Instant Response",
        desc: "LPDDR5x memory and Gen4 NVMe storage for zero-latency creative execution."
    },
    {
        icon: Maximize,
        title: "Infinite Vision",
        desc: "ProMotion OLED displays with 100% DCI-P3 coverage for architectural precision."
    }
];

export default function ProjectDetails({ product }: { product: any }) {
    return (
        <section className="bg-white py-32 px-8 md:px-12 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                    {/* Left: Narrative */}
                    <div className="lg:col-span-5 space-y-16">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-[2px] w-12 bg-[#F27D26]" />
                                <span className="text-[#F27D26] uppercase tracking-[0.6em] font-black text-[10px]">Architectural Depth</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-serif font-bold italic tracking-tighter leading-[0.9] text-[#141414]">
                                Engineered for <br />
                                <span className="text-[#F27D26]">Excellence.</span>
                            </h2>
                            <p className="text-lg font-serif italic text-black/50 leading-relaxed max-w-md">
                                "The machine is no longer just a tool; it is an extension of the professional intent."
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-8 border-t border-black/5">
                            {FEATURES.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="space-y-4 group"
                                >
                                    <div className="w-10 h-10 bg-black/5 flex items-center justify-center rounded-sm group-hover:bg-[#F27D26] group-hover:text-white transition-colors duration-500">
                                        <feature.icon size={20} strokeWidth={1} />
                                    </div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#141414]">{feature.title}</h3>
                                    <p className="text-[11px] font-mono uppercase tracking-wider text-black/40 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Immersive Image with Technical Overlay */}
                    <div className="lg:col-span-7 relative">
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-video bg-black/5 rounded-sm overflow-hidden"
                        >
                            <Image
                                src="/assets/Ention-Laptop-E3-Catalogue-design-2.png"
                                alt="Technical Blueprint"
                                fill
                                className="object-cover opacity-60 mix-blend-multiply transition-transform duration-1000 hover:scale-105"
                            />

                            {/* Decorative Accent Line */}
                            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#F27D26]/30 z-20" />

                            {/* Decorative Technical Labels */}
                            <div className="absolute top-8 right-8 text-right space-y-1 z-10">
                                <p className="text-[8px] font-mono text-black/40 uppercase tracking-[0.5em]">System Revision</p>
                                <p className="text-[10px] font-mono font-bold text-[#F27D26] uppercase tracking-widest">v2.0 // INDUSTRIAL</p>
                            </div>
                        </motion.div>

                        {/* Floating Spec Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-12 -left-12 bg-[#141414] text-white p-8 rounded-sm shadow-2xl z-30 hidden md:block"
                        >
                            <div className="space-y-4">
                                <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-[8px]">Performance Metric</span>
                                <div className="flex items-center gap-12">
                                    <div className="space-y-1">
                                        <p className="text-4xl font-serif font-black italic">14<span className="text-lg">TH GEN</span></p>
                                        <p className="text-[9px] font-mono opacity-40 uppercase tracking-widest">Peak Silicon</p>
                                    </div>
                                    <div className="h-12 w-[1px] bg-white/10" />
                                    <div className="space-y-1">
                                        <p className="text-4xl font-serif font-black italic">64<span className="text-lg">GB</span></p>
                                        <p className="text-[9px] font-mono opacity-40 uppercase tracking-widest">X-Memory</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
