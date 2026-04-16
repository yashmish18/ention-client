"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/lib/api";

const CATEGORIES = ["All Systems", "Laptops", "Workstations"];

export default function ProductGrid() {
    const [products, setProducts] = useState<any[]>([]);
    const [activeCategory, setActiveCategory] = useState("All Systems");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchProducts();
                if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    throw new Error("Empty data");
                }
            } catch (err) {
                console.error("Failed to load products", err);
                const fallback = [
                    { id: 'e3', name: 'Workbook E3 // Basic', model: 'WORKBOOK-E3', slug: 'e3', basePrice: 24999, category: 'Laptops', images: ['/assets/product_/e3/1.jpg'], specs: { variants: { processors: [{ name: "Celeron N4020", priceModifier: 0 }], ram: ["8GB"], storage: ["256GB"] } } },
                    { id: 'e4', name: 'Workbook E4 // Elite', model: 'WORKBOOK-E4', slug: 'e4', basePrice: 68999, category: 'Laptops', images: ['/assets/0N1A1389.png'], specs: { variants: { processors: [{ name: "i5-13420H", priceModifier: 0 }, { name: "i7-13620H", priceModifier: 12000 }], ram: ["16GB", "32GB"], storage: ["512GB", "1TB"] } } },
                    { id: 'e5', name: 'Workbook E5 // Smart', model: 'WORKBOOK-E5', slug: 'e5', basePrice: 31999, category: 'Workstations', images: ['/assets/Ention-Laptop-E3-Catalogue-design-2.png'], specs: { variants: { processors: [{ name: "N5095", priceModifier: 0 }, { name: "N95", priceModifier: 3000 }], ram: ["16GB", "32GB"], storage: ["512GB", "1TB"] } } }
                ];
                setProducts(fallback);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const filteredProducts = products.filter(p =>
        activeCategory === "All Systems" || p.category?.name === activeCategory || p.category === activeCategory
    );

    if (loading) return (
        <div className="h-96 flex flex-col items-center justify-center space-y-4 opacity-20">
            <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin" />
            <p className="font-mono text-[10px] uppercase tracking-[0.4em]">Fetching Schematics...</p>
        </div>
    );

    return (
        <section className="bg-white py-32 px-12 text-[#141414]">
            <div className="max-w-7xl mx-auto space-y-32">
                {/* Architectural Header */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-[2px] w-12 bg-[#F27D26]" />
                        <span className="text-[#F27D26] uppercase tracking-[0.6em] font-black text-[10px]">Product Catalog</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                        <h2 className="text-6xl md:text-8xl font-serif font-bold italic tracking-tighter leading-none">Workbook Series.</h2>
                        <div className="flex flex-wrap gap-x-12 gap-y-6 justify-start lg:justify-end">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`text-[10px] uppercase font-black tracking-widest transition-all relative pb-4 border-b-2 ${activeCategory === cat ? "text-[#F27D26] border-[#F27D26]" : "text-black/20 border-transparent hover:text-black"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Industrial Staggered Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-8">
                    <AnimatePresence mode="wait">
                        {filteredProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={i % 3 === 1 ? "lg:-translate-y-24" : i % 3 === 2 ? "lg:translate-y-12" : ""}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Industrial Filler Module */}
                    <div className="lg:col-span-1 bg-[#141414] p-12 flex flex-col justify-between text-white rounded-sm h-[500px]">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <span className="text-[#F27D26] uppercase tracking-[0.5em] font-black text-[9px]">Sovereign Quality</span>
                                <h4 className="text-4xl font-serif font-bold italic leading-tight">Beyond the <br />Standard.</h4>
                            </div>
                            <p className="text-[12px] font-serif leading-relaxed opacity-40 italic">
                                "Every circuit is a commitment. Every chassis is a fortress. We don't just build electronics."
                            </p>
                        </div>
                        <div className="pt-8 border-t border-white/5 space-y-4">
                            <p className="text-[8px] uppercase tracking-[0.4em] font-black text-white/20">Manufacturing Grade: A+++</p>
                            <div className="w-full h-1 bg-white/5 relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    className="absolute h-full bg-[#F27D26]/40"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
