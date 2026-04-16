"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, HardDrive, Zap, Info } from "lucide-react";
import { useCart } from "@/store/useCart";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        model?: string;
        slug?: string;
        basePrice: number;
        images?: string[];
        specs?: {
            cpu: string;
            gpu: string;
            storage: string;
        };
        stock?: number;
    }
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { addItem } = useCart();

    const handleQuickBuy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price: product.basePrice,
            image: product.images?.[0] || "/products/laptop-placeholder.png",
            quantity: 1,
            configuration: {
                processor: "Standard",
                ram: "Standard",
                storage: "Standard"
            }
        });
    };

    const stock = product.stock ?? 10; // Default to 10 if not provided
    const displayPrice = `₹${product.basePrice.toLocaleString()}`;

    return (
        <Link href={`/products/${product.slug || product.id}`} className="block h-full group">
            <motion.div
                layout
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative bg-white border border-black/5 rounded-sm overflow-hidden flex flex-col transition-all duration-1000 min-h-[500px]"
            >
                {/* Top Bar: Technical Metadata */}
                <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-20 border-b border-black/[0.03] bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black tracking-[0.4em] text-[#F27D26]">WORKBOOK</span>
                        <span className="text-[8px] font-mono text-black/20 uppercase tracking-widest hidden md:block">{product.model || "// BRT-SYS-2026"}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-serif font-bold italic text-black/40">{displayPrice}</span>
                        <Info size={14} className="text-black/10 group-hover:text-[#F27D26] transition-colors" />
                    </div>
                </div>

                {/* Product Image */}
                <div className="flex-1 relative flex items-center justify-center p-12 lg:p-20 bg-[#FAF9F6]">
                    <motion.div
                        animate={{
                            scale: isHovered ? 1.02 : 1,
                            y: isHovered ? -10 : 0
                        }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-full min-h-[300px] flex items-center justify-center"
                    >
                        <Image
                            src={product.images?.[0] || "/products/laptop-placeholder.png"}
                            alt={product.name}
                            width={1200}
                            height={800}
                            className="object-contain w-auto h-auto max-w-full max-h-full filter drop-shadow-[0_40px_80px_rgba(0,0,0,0.08)]"
                            quality={100}
                            priority
                        />
                    </motion.div>
                </div>

                {/* Detailed Spec Reveal */}
                <AnimatePresence>
                    {isHovered && product.specs && (
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 bg-[#141414] z-30 p-12 flex flex-col justify-between text-white"
                        >
                            <div className="space-y-12">
                                <div className="space-y-4">
                                    <span className="text-[#F27D26] uppercase tracking-[0.4em] font-black text-[9px] block">Technical Architecture</span>
                                    <h3 className="text-5xl font-serif font-bold italic tracking-tighter leading-none">{product.name}</h3>
                                </div>

                                <div className="space-y-8">
                                    {[
                                        { icon: Cpu, label: "Processing Hub", value: product.specs.cpu },
                                        { icon: Zap, label: "Surface Compute", value: product.specs.gpu },
                                        { icon: HardDrive, label: "Solid State Cell", value: product.specs.storage }
                                    ].map((item, i) => (
                                        <div key={i} className="group/item flex items-start gap-8 border-l border-white/10 hover:border-[#F27D26] pl-8 transition-colors">
                                            <item.icon size={24} className="text-white/10 group-hover/item:text-[#F27D26] transition-colors mt-1" />
                                            <div className="space-y-2">
                                                <p className="text-[9px] uppercase tracking-widest font-black text-white/20">{item.label}</p>
                                                <p className="text-[14px] font-mono text-white/90 font-medium">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleQuickBuy}
                                className="w-full bg-[#F27D26] text-white py-6 text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-white hover:text-[#141414] transition-all flex items-center justify-center gap-4"
                            >
                                Add to Cart <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom Panel */}
                <div className="p-10 bg-white border-t border-black/5 flex justify-between items-end">
                    <div className="space-y-3">
                        <h3 className="text-3xl font-serif font-bold italic tracking-tighter leading-none">{product.name}</h3>
                        <div className="flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-[#F27D26]" />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">Made in Bharat</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                        <span className="text-[8px] font-mono text-black/20 uppercase font-black">Stock Status</span>
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${stock > 0 ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                            <span className="text-[10px] font-black uppercase text-black">{stock > 0 ? "Available" : "Out of Stock"}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
