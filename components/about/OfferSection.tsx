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
                    <h2 className="text-4xl md:text-5xl font-serif font-bold italic leading-none tracking-tighter">What we build.</h2>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Products Card (Simplified) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 md:p-12 border border-black/5 rounded-sm flex flex-col md:flex-row items-center gap-12 shadow-md hover:shadow-xl transition-shadow duration-700"
                    >
                        <div className="relative w-full md:w-1/2 aspect-[4/3] flex items-center justify-center bg-[#FAF9F6] rounded-sm p-8">
                            <div className="relative w-full h-full max-w-[300px]">
                                <Image
                                    src="/assets/workbook-laptop.png"
                                    alt="Hardware Render"
                                    fill
                                    className="object-contain filter drop-shadow-xl"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="space-y-6 w-full md:w-1/2">
                            <div className="space-y-2">
                                <span className="text-black/30 uppercase tracking-[0.4em] font-black text-[10px]">Engineering</span>
                                <h3 className="text-4xl font-serif font-bold italic">The Hardware.</h3>
                            </div>
                            <p className="text-sm opacity-70 font-serif leading-relaxed">
                                High-performance hardware meticulously designed for creators. Bharat's answer to global technical excellence.
                            </p>
                            
                            <hr className="border-black/5" />
                            
                            <Link href="/products" className="inline-block">
                                <button className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-white bg-[#141414] px-8 py-4 rounded-sm hover:bg-[#F27D26] transition-colors group/btn">
                                    Configure Machine <ArrowUpRight size={14} />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
