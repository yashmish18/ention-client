"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

const FEATURED_PRODUCTS = [
    {
        id: "01",
        name: "WORKBOOK GEN-01",
        tag: "Engineering Mastery",
        desc: "The ultimate working companion. Engineered for the absolute pursuit of digital sovereignty.",
        image: "/assets/workbook-laptop.png",
        specs: ["CORE i9 14th Gen", "RTX PRO 4080", "64GB DDR5"]
    },
    {
        id: "02",
        name: "NUCLEUS CORE",
        tag: "Sovereign Compute",
        desc: "Industrial performance meets secure architectural depth. Bharat's professional workstation redefined.",
        image: "/assets/market-pc.png",
        specs: ["RYZEN THREADRIPPER", "QUADRO RTX 6000", "128GB ECC RAM"]
    },
    {
        id: "03",
        name: "ELITE PERIPHERAL",
        tag: "Precision Tactility",
        desc: "A minimalist extension of your creative intent. High-frequency response in an architectural shell.",
        image: "/assets/lappy.png",
        specs: ["8000Hz POLLING", "PTFE BASE", "TITANIUM CLICKS"]
    }
];

export default function ProductHero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % FEATURED_PRODUCTS.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + FEATURED_PRODUCTS.length) % FEATURED_PRODUCTS.length);

    const current = FEATURED_PRODUCTS[currentIndex];

    return (
        <section className="relative h-[90vh] bg-[#141414] overflow-hidden flex items-center justify-center">

            {/* Background Narrative (Large vertical ID) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-12 pointer-events-none select-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="text-[40vw] font-serif font-bold italic tracking-tighter text-white/50 flex justify-center items-center opacity-10"
                    >
                        {current.id}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Layout Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0 grid grid-cols-12 h-full w-full">
                    {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white" />)}
                </div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Column: Product Spec Panel (Lg:3) */}
                <div className="lg:col-span-3 hidden lg:flex flex-col gap-12 border-l border-white/5 pl-8">
                    <div className="space-y-4">
                        <span className="text-[#F27D26] uppercase tracking-[0.5em] font-black text-[9px]">Technical Blueprint</span>
                        <div className="h-[2px] w-12 bg-[#F27D26]" />
                    </div>
                    <div className="space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="space-y-6"
                            >
                                {current.specs.map((spec, i) => (
                                    <div key={i} className="space-y-1">
                                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{spec.split(" ")[0]}</p>
                                        <p className="text-[12px] font-serif italic text-white/80">{spec.split(" ").slice(1).join(" ")}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Center Column: Main Visual (Lg:6) */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.1, y: -20 }}
                            transition={{ duration: 0.6, ease: "circOut" }}
                            className="relative w-full aspect-square max-w-[500px]"
                        >
                            <Image
                                src={current.image}
                                alt={current.name}
                                fill
                                className="object-contain filter drop-shadow-[0_50px_100px_rgba(242,125,38,0.1)]"
                                priority
                                quality={100}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Centered Controls */}
                    <div className="flex items-center gap-12 border-t border-white/5 pt-8 w-full justify-center">
                        <button
                            onClick={prev}
                            className="p-4 text-white/40 hover:text-[#F27D26] transition-colors active:scale-90"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <div className="flex gap-2">
                            {FEATURED_PRODUCTS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 w-12 rounded-full transition-all duration-500 ${i === currentIndex ? "bg-[#F27D26] w-20" : "bg-white/10"}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={next}
                            className="p-4 text-white/40 hover:text-[#F27D26] transition-colors active:scale-90"
                        >
                            <ArrowRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Right Column: Narrative Panel (Lg:3) */}
                <div className="lg:col-span-3 space-y-12 border-r border-white/5 pr-8 text-right lg:text-left">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-8"
                        >
                            <div className="space-y-2">
                                <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-[9px]">{current.tag}</span>
                                <h2 className="text-5xl md:text-6xl font-serif font-bold italic text-white tracking-tighter leading-[0.8]">{current.name}</h2>
                            </div>
                            <p className="text-lg font-serif italic text-white/60 leading-relaxed">
                                {current.desc}
                            </p>
                            <Link href="/products">
                                <button className="bg-white text-[#141414] px-10 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#F27D26] hover:text-white transition-all rounded-sm shadow-2xl">
                                    Discover More <ArrowUpRight size={14} className="inline ml-2" />
                                </button>
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Identifier */}
            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center opacity-20 text-white pointer-events-none">
                <span className="text-[8px] uppercase tracking-[0.6em] font-black italic">Ention Operational Catalog // System Reveal</span>
                <span className="text-[10px] items-center gap-4 hidden md:flex">
                    <span className="w-12 h-[1px] bg-white" />
                    <span>BHARAT MASTERED DATA</span>
                </span>
            </div>
        </section>
    );
};
