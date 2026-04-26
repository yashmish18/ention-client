"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { fetchProducts } from "@/lib/api";
import { Cpu, HardDrive, ArrowRight, Zap } from "lucide-react";
import { useCart } from "@/store/useCart";

const ProductBlock = ({ product, index, addItem }: { product: any, index: number, addItem: any }) => {
    const isEven = index % 2 === 0;
    const ref = useRef<HTMLDivElement>(null);

    // Setup Scroll Tracking for this block
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0.2 1", "0.8 0"]
    });

    const imgY = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const watermarkX = useTransform(scrollYProgress, [0, 1], [isEven ? -100 : 100, isEven ? 100 : -100]);
    const opacityFlow = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Mapping high-res catalog images to specific products
    const getProductImage = (name: string, defaultImg: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes("e1")) return "/assets/all_product_page/e1-cat.png";
        if (lowerName.includes("e4")) return "/assets/all_product_page/e4-cat.png";
        if (lowerName.includes("e5")) return "/assets/all_product_page/e5-cat.png";
        if (lowerName.includes("s1")) return "/assets/all_product_page/s1-cat.png";
        return defaultImg || "/products/laptop-placeholder.png";
    };

    const lowerName = product.name.toLowerCase();
    const displayImage = getProductImage(product.name, product.images?.[0]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity: opacityFlow }}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32 relative py-24 min-h-[90vh]`}
        >
            {/* Massive Parallax Backdrop ID Text */}
            <motion.div
                style={{ x: watermarkX }}
                className="absolute top-1/2 left-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] overflow-hidden whitespace-nowrap w-[200%] flex justify-center text-[22vw] font-serif font-black italic select-none"
            >
                {product.name}
            </motion.div>

            {/* Product Image Stage with Parallax */}
            <div className={`w-full lg:w-[55%] relative ${lowerName.includes('s1') ? 'aspect-[1393/1129]' : 'aspect-[1536/1024]'} bg-white flex items-center justify-center border border-ink/5 group overflow-hidden rounded-sm`}>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(242,125,38,0.03)_50%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <motion.div
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src={displayImage}
                        alt={product.name}
                        fill
                        className="object-contain filter drop-shadow-[0_60px_80px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_80px_120px_rgba(242,125,38,0.2)] transition-all duration-1000"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0}
                    />
                </motion.div>
            </div>

            {/* Scroll-Revealed Product Details */}
            <motion.div style={{ y: textY }} className="w-full lg:w-[45%] space-y-12 relative z-10 px-4 lg:px-0">
                <div className="space-y-6">
                    <div className="overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-[10px] font-mono tracking-[0.4em] text-accent uppercase block"
                        >
                            {product.model || `BRT-SYS-${product.id}`}
                        </motion.span>
                    </div>
                </div>

                <div className="overflow-hidden">
                    <motion.h3
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl font-serif font-black italic tracking-tighter text-ink leading-[0.85]"
                    >
                        {product.name}
                    </motion.h3>
                </div>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-3xl font-serif text-ink/50 pt-4 italic"
                >
                    ₹{product.basePrice?.toLocaleString()}
                </motion.p>

                <div className="pt-6 border-y border-ink/10 py-10 space-y-4">
                    <div className="flex gap-4">
                        {[
                            { icon: Cpu, label: product.specs?.cpu },
                            { icon: HardDrive, label: product.specs?.ram },
                            { label: product.specs?.storage }
                        ].map((spec, i) => (
                            <div key={i} className="bg-black/5 px-3 py-1.5 rounded-sm flex items-center gap-2">
                                {spec.icon && <spec.icon size={10} className="text-black/40" />}
                                <span className="text-[9px] font-mono font-bold tracking-widest uppercase">{spec.label || "Configurable"}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-[11px] font-serif italic text-black/60 leading-relaxed line-clamp-3 pb-4">
                        {product.description || "Designed for uncompromised sovereignty and continuous operational compute capability."}
                    </p>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
                >
                    <button
                        onClick={() => {
                            addItem({
                                id: product.id,
                                name: product.name,
                                price: product.basePrice,
                                image: displayImage,
                                quantity: 1,
                                configuration: { processor: "Standard", ram: "Standard", storage: "Standard" }
                            });
                        }}
                        className="w-full sm:w-auto bg-ink text-bg px-10 py-6 text-xs font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all duration-500 flex items-center justify-center gap-4 rounded-sm shadow-2xl hover:shadow-accent/20 group"
                    >
                        Add to Cart <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                    <Link
                        href={`/products/${product.slug || product.id}`}
                        className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-ink/40 hover:text-ink transition-colors pb-1 border-b border-ink/20 hover:border-ink"
                    >
                        Buy Now
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default function ProductGrid() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchProducts();
                setProducts(Array.isArray(data) ? data : []);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const mainCategories = ["Performance", "Business", "Universal", "Mobility"];
    const filteredProducts = products.filter(p => !p.name?.toLowerCase().includes("e3"));

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center space-y-6 opacity-40">
            <div className="w-16 h-16 border-[3px] border-ink/20 border-t-accent rounded-full animate-spin" />
            <p className="font-mono text-xs uppercase tracking-[0.5em]">Fetching Architecture...</p>
        </div>
    );

    return (
        <section className="bg-bg py-32 px-4 md:px-16 text-ink border-t border-ink/5 relative overflow-hidden">
            {/* Animated Grid Line Overlay */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-12 opacity-[0.03] z-0">
                {[...Array(12)].map((_, i) => <div key={i} className="border-r border-ink h-full" />)}
            </div>

            <div className="max-w-[90rem] mx-auto space-y-48 relative z-10">

                {/* Grand Catalog Header */}
                <div className="space-y-6 pt-16">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-ink/10 pb-16">
                        <div className="overflow-hidden">
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="font-mono text-[10px] opacity-60 uppercase tracking-[0.5em] block mb-6 text-accent"
                            >
                                / CATALOGUE_INDEX
                            </motion.span>
                            <motion.h2
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-6xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter leading-none italic"
                            >
                                Choose your <br /> Dominance.
                            </motion.h2>
                        </div>
                    </div>
                </div>

                {/* Ultra-Premium Grouped Scroll Blocks */}
                <div className="space-y-32 flex flex-col pt-16">
                    <AnimatePresence>
                        {mainCategories.map(category => {
                            const group = filteredProducts.filter(p => {
                                const catName = typeof p.category === 'object' ? p.category?.name : p.category;
                                return catName === category;
                            });
                            if (group.length === 0) return null;
                            
                            return (
                                <div key={category} className="space-y-12">
                                    <div className="flex items-center justify-center lg:justify-start gap-4 pb-8 border-b border-ink/5">
                                        <span className="h-[1px] w-12 bg-[#F27D26]" />
                                        <h3 className="text-xl md:text-3xl font-serif italic font-bold tracking-tight text-ink/80">{category}</h3>
                                        <span className="h-[1px] w-12 bg-[#F27D26]" />
                                    </div>
                                    <div className="flex flex-col space-y-32">
                                        {group.map((product, i) => (
                                            <ProductBlock
                                                key={product.id}
                                                product={product}
                                                index={i}
                                                addItem={addItem}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Fallback for products without a matched category */}
                        {(() => {
                            const uncategorized = filteredProducts.filter(p => {
                                const catName = typeof p.category === 'object' ? p.category?.name : p.category;
                                return !mainCategories.includes(catName);
                            });
                            
                            if (uncategorized.length === 0) return null;
                            
                            return (
                                <div className="space-y-12">
                                    <div className="flex items-center justify-center lg:justify-start gap-4 pb-8 border-b border-ink/5">
                                        <span className="h-[1px] w-12 bg-[#F27D26]" />
                                        <h3 className="text-xl md:text-3xl font-serif italic font-bold tracking-tight text-ink/80">Other Systems</h3>
                                        <span className="h-[1px] w-12 bg-[#F27D26]" />
                                    </div>
                                    <div className="flex flex-col space-y-32">
                                        {uncategorized.map((product, i) => (
                                            <ProductBlock
                                                key={product.id}
                                                product={product}
                                                index={i}
                                                addItem={addItem}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
