"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function OfferSection() {
    return (
        <section className="bg-[#E4E3E0] py-24 px-12 text-[#141414] relative overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Section Header */}
                <div className="space-y-4">
                    <span className="text-[#F27D26] uppercase tracking-[0.5em] font-black text-[9px] block">01. Our Ecosystem</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold italic leading-none tracking-tighter">What we build.</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                    {/* Products Card (Small Integrated) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-10 border border-black/5 rounded-sm flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow duration-700 min-h-[550px]"
                    >
                        <div className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <span className="text-black/20 uppercase tracking-[0.4em] font-black text-[8px]">Engineering</span>
                                <h3 className="text-3xl font-serif font-bold italic">The Hardware.</h3>
                            </div>
                            <p className="text-xs opacity-60 font-serif leading-relaxed line-clamp-2 max-w-sm">
                                High-performance hardware meticulously designed for creators. Bharat's answer to global technical excellence.
                            </p>
                        </div>

                        {/* Integrated Image Area with Blueprint Background */}
                        <div className="relative flex-1 flex items-center justify-center my-8 bg-[#FAF9F6] rounded-sm overflow-hidden p-6 border border-black/[0.02]">
                            {/* Blueprint Grid Overlay */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                                <div className="absolute inset-0 grid grid-cols-4 h-full w-full">
                                    {[...Array(4)].map((_, i) => <div key={i} className="border-r border-black" />)}
                                </div>
                                <div className="absolute inset-0 grid grid-rows-4 h-full w-full">
                                    {[...Array(4)].map((_, i) => <div key={i} className="border-b border-black" />)}
                                </div>
                            </div>

                            <div className="relative w-full aspect-square max-w-[280px] group-hover:scale-105 transition-transform duration-1000 ease-in-out">
                                <Image
                                    src="/assets/workbook-laptop.png"
                                    alt="Integrated Hardware Render"
                                    fill
                                    className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                                    priority
                                />
                            </div>
                            <div className="absolute bottom-3 right-4 text-[6px] font-black tracking-widest text-[#F27D26]/30 uppercase">ENTI.ON // BRT-01</div>
                        </div>

                        <div className="pt-6 border-t border-black/5 flex justify-between items-end mt-auto">
                            <div className="flex gap-4">
                                {["i7/i9", "RTX Pro"].map((s) => (
                                    <span key={s} className="text-[7px] uppercase font-black tracking-widest text-[#F27D26]">{s}</span>
                                ))}
                            </div>
                            <Link href="/products">
                                <button className="flex items-center gap-2 text-[8px] uppercase font-black tracking-widest hover:text-[#F27D26] transition-colors group/btn">
                                    Configure <ArrowUpRight size={12} />
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Consultancy Card (Small Architectural) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-10 border border-black/5 rounded-sm flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow duration-700 min-h-[550px]"
                    >
                        <div className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <span className="text-black/20 uppercase tracking-[0.4em] font-black text-[8px]">Strategic Growth</span>
                                <h3 className="text-3xl font-serif font-bold italic">Consultancy.</h3>
                            </div>
                            <p className="text-xs opacity-60 font-serif leading-relaxed line-clamp-2 max-w-sm">
                                Strategic support for Bharat's tech pioneers. Navigate regulatory landscapes with precision.
                            </p>
                        </div>

                        <div className="flex-1 flex flex-col justify-center space-y-8 py-8">
                            {[
                                { title: "Taxation & Compliance", desc: "Sovereign tax planning and audits." },
                                { title: "Certification Hub", desc: "Management of licenses and filings." },
                                { title: "Growth Strategy", desc: "Strategic operational scaling." }
                            ].map((service, i) => (
                                <div key={i} className="group border-l border-black/5 hover:border-[#F27D26] transition-colors pl-6">
                                    <h4 className="text-[9px] uppercase font-black tracking-widest text-black/80 group-hover:text-black transition-colors mb-1">{service.title}</h4>
                                    <p className="text-[9px] opacity-40 font-serif leading-relaxed line-clamp-1">{service.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-black/5 flex justify-between items-center mt-auto">
                            <span className="text-[8px] uppercase font-black tracking-[0.3em] opacity-20">Sovereign Experts</span>
                            <Link href="/about#contact">
                                <button className="px-8 py-3 bg-[#141414] text-white text-[8px] uppercase font-black tracking-widest hover:bg-[#F27D26] transition-all">
                                    Connect Now
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
