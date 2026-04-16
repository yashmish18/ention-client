"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        title: "Innovation in Every Layer",
        description: "Our engineering process focuses on thermal efficiency and structural integrity.",
        image: "/assets/about-manufacturing.png",
    },
    {
        title: "Bharat's Professional Choice",
        description: "Designed for the modern Indian professional who demands reliability.",
        image: "/assets/about-studio.png",
    },
    {
        title: "Future of Bharat Computing",
        description: "Join us in redefining what a domestic tech brand can achieve for the world.",
        image: "/assets/workbook-laptop.png",
    }
];

export default function VisionCarousel() {
    const [index, setIndex] = useState(1); // Start with the center slide

    const next = () => setIndex((prev) => (prev + 1) % slides.length);
    const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="bg-[#E4E3E0] py-32 px-12 overflow-hidden relative">
            <div className="max-w-7xl mx-auto space-y-12 mb-24">
                <div className="flex items-end justify-between border-b border-black/5 pb-12">
                    <div className="space-y-4">
                        <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-xs">Our Vision</span>
                        <h2 className="text-6xl md:text-8xl font-serif font-bold italic tracking-tighter leading-none">In Motion.</h2>
                    </div>
                    <div className="flex gap-4 mb-2">
                        <button
                            onClick={prev}
                            className="p-5 border border-black/10 rounded-full hover:bg-[#F27D26] hover:text-white transition-all group"
                        >
                            <ChevronLeft size={24} className="group-active:scale-90 transition-transform" />
                        </button>
                        <button
                            onClick={next}
                            className="p-5 border border-black/10 rounded-full hover:bg-[#F27D26] hover:text-white transition-all group"
                        >
                            <ChevronRight size={24} className="group-active:scale-90 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Lens Carousel Main Area */}
            <div className="relative h-[600px] flex items-center justify-center">
                <div className="flex items-center gap-12 w-full max-w-[1400px]">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {slides.map((slide, i) => {
                            // Calculate position relative to index
                            let position = i - index;
                            if (position < -1) position += slides.length;
                            if (position > 1) position -= slides.length;

                            const isActive = position === 0;
                            const isPrev = position === -1;
                            const isNext = position === 1;

                            if (!isActive && !isPrev && !isNext) return null;

                            return (
                                <motion.div
                                    key={slide.title}
                                    initial={{ opacity: 0, scale: 0.8, x: position * 100 }}
                                    animate={{
                                        opacity: isActive ? 1 : 0.3,
                                        scale: isActive ? 1.1 : 0.8,
                                        x: position * 350,
                                        zIndex: isActive ? 10 : 0,
                                        filter: isActive ? "blur(0px)" : "blur(4px)"
                                    }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] cursor-pointer"
                                    onClick={() => setIndex(i)}
                                >
                                    <div className="relative w-full h-full rounded-sm overflow-hidden shadow-2xl border border-black/5">
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            className="object-cover"
                                        />

                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent flex flex-col justify-end p-16 text-[#E4E3E0]"
                                            >
                                                <h3 className="text-4xl md:text-5xl font-serif font-bold italic mb-4">{slide.title}</h3>
                                                <p className="text-sm md:text-lg opacity-70 font-serif max-w-md">{slide.description}</p>
                                            </motion.div>
                                        )}
                                    </div>

                                    {!isActive && (
                                        <div className="absolute inset-0 bg-black/20" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center gap-3 mt-12">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 transition-all duration-500 rounded-full ${index === i ? "w-12 bg-[#F27D26]" : "w-3 bg-black/10 hover:bg-black/20"}`}
                    />
                ))}
            </div>
        </section>
    );
};
