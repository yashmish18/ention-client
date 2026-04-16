"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const products = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000",
        name: "Model Series 1",
        edition: "Silver Edition",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000",
        name: "Model Series 1",
        edition: "Carbon Noir",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1000",
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
                    // Let's go with: if nothing is hovered, they are balanced/equal or first one active
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
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative h-full overflow-hidden cursor-pointer border border-white/5 group"
                        >
                            <Image
                                src={product.image}
                                alt={product.edition}
                                fill
                                className={`object-cover transition-all duration-1000 ${isActive ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0'}`}
                                unoptimized
                            />

                            {/* Simple Label for Active/Hovered Card */}
                            <div className={`absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-ink/90 to-transparent transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                                <span className="text-accent font-mono text-[8px] tracking-[0.4em] uppercase">
                                    {product.name}
                                </span>
                                <h3 className="text-xl font-serif text-bg uppercase mt-1">
                                    {product.edition}
                                </h3>
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
