"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { LetterAnimation } from "./LetterAnimation";

const products = [
    {
        id: 1,
        image: "/assets/images/e5/E5 new laptop photo transparent background png/3.png",
        name: "Model Series 1",
        edition: "Silver Edition",
    },
    {
        id: 2,
        image: "/assets/images/s1/S1 gaming laptop transparent background png/3.png",
        name: "Model Series 1",
        edition: "Carbon Noir",
    },
    {
        id: 3,
        image: "/assets/images/e4/E4 laptop photo transparent background png/3.png",
        name: "Model Series 1",
        edition: "Lumina Gold",
    },
];

export function HeroCarousel() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="w-full flex flex-col gap-6">
            {/* The Reel: Accordion expanding on hover */}
            <div
                className="flex gap-4 h-[450px] overflow-hidden"
                onMouseLeave={() => setHovered(null)}
            >
                {products.map((product, i) => {
                    const isHovered = hovered === i;
                    const isSomethingHovered = hovered !== null;

                    // Default: if nothing is hovered, the first one is expanded or they are even
                    const isActive = isHovered || (!isSomethingHovered && i === 0);

                    return (
                        <motion.div
                            key={product.id}
                            initial={false}
                            animate={{
                                width: isActive ? "70%" : "15%",
                                opacity: isActive ? 1 : 0.4,
                            }}
                            onMouseEnter={() => setHovered(i)}
                            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                            className="relative h-full overflow-hidden cursor-pointer border border-white/5 group"
                        >
                            <Image
                                src={product.image}
                                alt={product.edition}
                                fill
                                priority={i === 0}
                                className={`object-contain transition-all duration-1000 ${isActive ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0'}`}
                            />

                            {/* Simple Label for Active/Hovered Card */}
                            <div className={`absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent transition-all duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                                <AnimatePresence mode="wait">
                                    {isActive && (
                                        <motion.div 
                                            key={`label-${product.id}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="space-y-1"
                                        >
                                            <span className="text-accent font-mono text-[9px] tracking-[0.5em] uppercase font-black block">
                                                <LetterAnimation 
                                                    type="blur" 
                                                    text={`Ention ${product.name.split(' ').pop()}`} 
                                                />
                                            </span>
                                            <h3 className="text-2xl font-serif text-bg italic font-black uppercase tracking-tighter">
                                                <LetterAnimation 
                                                    type="blur" 
                                                    text={product.edition} 
                                                />
                                            </h3>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Static Visual Indicator */}
            <div className="flex items-center justify-between px-1">
                <div className="flex gap-3">
                    {products.map((_, i) => (
                        <div
                            key={i}
                            className={`h-[2px] transition-all duration-700 ${(hovered === i || (hovered === null && i === 0)) ? "w-16 bg-accent" : "w-6 bg-white/10"}`}
                        />
                    ))}
                </div>
                <div className="text-white/10 font-mono text-[9px] tracking-[0.3em] uppercase flex items-center gap-3 select-none">
                    <span className="text-accent/30 tracking-widest">Interactive Showcase</span>
                    <ChevronRight size={12} className="opacity-50" />
                </div>
            </div>
        </div>
    );
}
