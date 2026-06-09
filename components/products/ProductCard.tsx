"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    const displayPrice = `₹${product.basePrice.toLocaleString("en-IN")}`;

    return (
        <Link 
            href={`/products/${product.slug || product.id}`} 
            className="block group h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col h-full space-y-4">
                {/* Product Image Container */}
                <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-[#EDE8DF]/40 rounded-sm overflow-hidden p-8 transition-colors duration-500 group-hover:bg-[#EDE8DF]/60">
                    <motion.div
                        animate={{
                            scale: isHovered ? 1.04 : 1,
                            y: isHovered ? -6 : 0
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        <Image
                            src={product.images?.[0] || "/products/laptop-placeholder.png"}
                            alt={product.name}
                            fill
                            className="object-contain max-w-full max-h-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
                            sizes="(max-w-7xl) 33vw, 100vw"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Details Footer */}
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-baseline gap-2">
                            <span className="text-[9px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
                                {product.model || "Workbook Series"}
                            </span>
                            <span className="text-xs font-mono text-black/30 text-[9px] uppercase tracking-wider">
                                {product.stock && product.stock > 0 ? "Available" : "Out of Stock"}
                            </span>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                            <h3 className="f-serif italic text-2xl md:text-3xl font-bold text-[#1A1714]">
                                {product.name}
                            </h3>
                            <span className="text-sm font-semibold text-[#1A1714] whitespace-nowrap mt-1">
                                {displayPrice}
                            </span>
                        </div>
                    </div>

                    {product.specs && (
                        <div className="text-[10px] text-[#6B6258] space-y-1 font-light pt-3 border-t border-[#C8BFB0]/30 mt-auto">
                            <div className="flex justify-between gap-4">
                                <span className="font-semibold text-[#1A1714] uppercase tracking-wider text-[8px]">Processor</span>
                                <span className="truncate max-w-[70%] font-mono">{product.specs.cpu}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="font-semibold text-[#1A1714] uppercase tracking-wider text-[8px]">Graphics</span>
                                <span className="truncate max-w-[70%] font-mono">{product.specs.gpu}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="font-semibold text-[#1A1714] uppercase tracking-wider text-[8px]">Storage</span>
                                <span className="truncate max-w-[70%] font-mono">{product.specs.storage}</span>
                            </div>
                        </div>
                    )}

                    <div className="pt-2 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#1A1714] group-hover:text-[#C5A059] transition-colors">
                        <span>Configure & Buy</span>
                        <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
