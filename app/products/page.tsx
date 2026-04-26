"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

import ProductGrid from "@/components/products/ProductGrid";
import CartDrawer from "@/components/products/CartDrawer";
import { BlurFadeIn } from "@/components/BlurFadeIn";

const CAROUSEL_ITEMS = [
    {
        id: "slide1",
        image: "/assets/all_product_page/slide1.png"
    },
    {
        id: "slide2",
        image: "/assets/all_product_page/slide2.png"
    },
    {
        id: "slide3",
        image: "/assets/all_product_page/slide3.png"
    },
    {
        id: "slide4",
        image: "/assets/all_product_page/slide4.png"
    }
];

const HeroCarouselModule = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <section className="relative w-full max-w-[1920px] mx-auto bg-ink overflow-hidden group aspect-[1942/809] md:aspect-[1942/809] flex items-center justify-center">
            {/* Full-bleed Image Stage */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={CAROUSEL_ITEMS[currentIndex].image}
                        alt={`Ention Product Slide ${currentIndex + 1}`}
                        fill
                        className="object-contain"
                        unoptimized
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button 
                onClick={prev} 
                className="absolute left-8 z-30 p-4 rounded-full bg-black/20 hover:bg-black/40 text-white/50 hover:text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 top-1/2 -translate-y-1/2"
            >
                <ChevronLeft size={32} />
            </button>
            <button 
                onClick={next} 
                className="absolute right-8 z-30 p-4 rounded-full bg-black/20 hover:bg-black/40 text-white/50 hover:text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 top-1/2 -translate-y-1/2"
            >
                <ChevronRight size={32} />
            </button>

            {/* Tracking Dots */}
            <div className="absolute bottom-6 left-0 right-0 z-30 flex gap-4 items-center justify-center">
                {CAROUSEL_ITEMS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-[2px] transition-all duration-500 ${i === currentIndex ? 'w-16 bg-accent' : 'w-4 bg-white/20 hover:bg-white/60'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Structural Overlays */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-12 opacity-[0.05] z-10">
                {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white h-full" />)}
            </div>
        </section>
    );
};

const TransitionSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
    const yTransform = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={ref} className="h-[80vh] bg-ink flex items-center justify-center overflow-hidden border-t border-white/5 relative z-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none" />
            
            <motion.div style={{ scale, opacity, y: yTransform }} className="relative z-10 text-center flex flex-col items-center">
                <p className="text-xs font-mono uppercase tracking-[0.8em] text-bg/30 mb-8 border-b border-bg/10 pb-4">
                    Phase 02 / The Vanguard
                </p>
                <h2 className="text-[20vw] font-serif font-black italic text-bg tracking-tighter leading-[0.8] mix-blend-screen drop-shadow-[0_0_80px_rgba(242,125,38,0.2)]">
                    REDEFINE.
                </h2>
                <div className="h-[100px] w-[1px] bg-bg/20 mt-12" />
            </motion.div>
        </section>
    );
};

const ValuePropositionSection = () => (
    <section className="py-24 md:py-40 px-4 md:px-16 bg-bg text-ink relative border-t border-ink/5">
        <div className="max-w-[80rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 relative z-10">
            <div className="space-y-6">
                <span className="text-accent uppercase font-mono tracking-[0.4em] text-[10px] pb-4 border-b border-ink/10 block w-full">01 / Assurance</span>
                <h3 className="text-3xl lg:text-4xl font-serif font-black italic tracking-tight">Uncompromising Quality.</h3>
                <p className="text-ink/60 font-serif leading-relaxed text-sm md:text-base pt-2">
                    Every Ention device undergoes rigorous stress-testing to guarantee peak performance under demanding professional workloads. We build for endurance, meaning fewer repairs and a vastly superior multi-year lifespan.
                </p>
            </div>
            
            <div className="space-y-6">
                <span className="text-accent uppercase font-mono tracking-[0.4em] text-[10px] pb-4 border-b border-ink/10 block w-full">02 / Architecture</span>
                <h3 className="text-3xl lg:text-4xl font-serif font-black italic tracking-tight">Sovereign Design.</h3>
                <p className="text-ink/60 font-serif leading-relaxed text-sm md:text-base pt-2">
                    Engineered from the ground up to empower Bharat's professionals. Our hardware philosophy emphasizes extreme reliability, customizability, and future-proof adaptability in a rapidly changing technical landscape.
                </p>
            </div>
            
            <div className="space-y-6">
                <span className="text-accent uppercase font-mono tracking-[0.4em] text-[10px] pb-4 border-b border-ink/10 block w-full">03 / Lifecycle</span>
                <h3 className="text-3xl lg:text-4xl font-serif font-black italic tracking-tight">End-to-End Support.</h3>
                <p className="text-ink/60 font-serif leading-relaxed text-sm md:text-base pt-2">
                    We don't simply sell devices—we provide dedicated institutional lifecycle management. From massive enterprise deployments to continuous IT upgrades and support, Ention remains your long-term technology partner.
                </p>
            </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-[0.02] overflow-hidden whitespace-nowrap w-full flex justify-center text-[15vw] font-serif font-black italic select-none">
            COMMITMENT.
        </div>
    </section>
);

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-bg selection:bg-accent selection:text-bg">
            <BlurFadeIn delay={0.1}>
                <HeroCarouselModule />
                <TransitionSection />

                <div className="bg-bg relative z-30">
                    <ProductGrid />
                </div>

                <ValuePropositionSection />

                <CartDrawer />
            </BlurFadeIn>
        </main>
    );
}
