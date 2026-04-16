"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, HardDrive, Zap, ShoppingBag, ArrowRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/store/useCart";



interface WorkbookPDPProps {
    product: any;
    images: string[];
}

export default function WorkbookPDP({ product, images }: WorkbookPDPProps) {
    // Extract variants from product specs
    const variants = product.specs?.variants || {
        processors: [{ name: "Standard Configuration", priceModifier: 0 }],
        ram: ["Standard RAM"],
        storage: ["Standard Storage"]
    };

    const [selections, setSelections] = useState({
        processor: variants.processors[0]?.name || "Standard",
        ram: variants.ram[0] || "Standard",
        storage: variants.storage[0] || "Standard"
    });

    const [activeImage, setActiveImage] = useState(0);
    const { addItem } = useCart();

    const getExtraPrice = () => {
        const proc = variants.processors.find((p: any) => p.name === selections.processor);
        const pPrice = proc?.priceModifier || 0;
        // Simple mock pricing for RAM/SSD if not explicitly in variants (can be expanded later)
        const ramPrice = variants.ram.indexOf(selections.ram) * 4000;
        const ssdPrice = variants.storage.indexOf(selections.storage) * 3000;
        return pPrice + ramPrice + ssdPrice;
    };

    const totalPrice = (product.basePrice || 0) + getExtraPrice();

    const handleAddToCart = () => {
        addItem({
            id: `${product.id}-${JSON.stringify(selections)}`,
            name: product.name,
            price: totalPrice,
            image: images[activeImage] || product.images?.[0] || "/products/laptop-placeholder.png",
            quantity: 1,
            configuration: {
                processor: selections.processor,
                ram: selections.ram,
                storage: selections.storage,
            }
        });
    };

    return (
        <div className="bg-white relative overflow-hidden">
            {/* Blueprint Overlay Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
                <div className="absolute inset-0 grid grid-cols-12 h-full w-full border-l border-black">
                    {[...Array(12)].map((_, i) => <div key={i} className="border-r border-black" />)}
                </div>
                <div className="absolute inset-0 grid grid-rows-12 h-full w-full border-t border-black">
                    {[...Array(12)].map((_, i) => <div key={i} className="border-b border-black" />)}
                </div>
            </div>

            {/* Hyper-Compact Header Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-8 space-y-4">
                <div className="flex items-center justify-between border-b border-black/5 pb-6">
                    <div className="space-y-1">
                        <span className="text-[#F27D26] uppercase tracking-[0.5em] font-black text-[9px] block">Engineering Architecture</span>
                        <div className="flex items-center gap-3">
                            <h1 className="text-5xl lg:text-7xl font-serif font-bold italic tracking-tighter leading-none">{product.model}.</h1>
                            <span className="h-2 w-2 rounded-full bg-[#F27D26] animate-pulse" />
                        </div>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-black/20">Serial // {product.id?.slice(-8).toUpperCase()}</p>
                        <div className="flex gap-0.5 text-[#F27D26] justify-end">
                            {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                        </div>
                    </div>
                </div>
                <p className="text-lg font-serif italic text-black/60 leading-relaxed max-w-3xl pt-4">
                    {product.description || "A masterclass in domestic engineering, built for the most demanding professional workflows."}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-black/5 min-h-[60vh]">
                {/* Left: Gallery (Hyper-Compact) */}
                <div className="lg:col-span-7 bg-[#FAF9F6] relative p-6 lg:p-10 flex flex-col items-center justify-center border-r border-black/[0.03]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeImage}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-full aspect-[16/10] max-w-[450px] z-10"
                        >
                            <Image
                                src={images[activeImage]}
                                alt={product.name}
                                fill
                                className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-8 flex gap-3 z-20">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`w-12 h-12 border transition-all overflow-hidden p-1 ${activeImage === idx ? "border-[#F27D26] bg-white shadow-md scale-110" : "border-black/5 bg-white/40 hover:border-black/20"
                                    }`}
                            >
                                <Image src={img} alt="thumb" width={48} height={48} className="object-contain" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Configurator (Ultra-Compact) */}
                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-white">
                    <div className="space-y-6">
                        {/* Processors */}
                        <div className="space-y-3 border-b border-black/5 pb-6">
                            <span className="text-[8px] uppercase font-black tracking-widest text-black/30">Select Processor</span>
                            <div className="grid grid-cols-1 gap-2">
                                {variants.processors.map((p: any) => (
                                    <button
                                        key={p.name}
                                        onClick={() => setSelections(s => ({ ...s, processor: p.name }))}
                                        className={`p-3 border text-left transition-all flex justify-between items-center group ${selections.processor === p.name ? "border-[#F27D26] bg-[#F27D26]/5" : "border-black/5 hover:border-black/20"}`}
                                    >
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] font-mono font-bold leading-tight uppercase tracking-widest">{p.name}</p>
                                            {p.priceModifier > 0 && <p className="text-[8px] text-[#F27D26]">+ ₹{p.priceModifier.toLocaleString()}</p>}
                                        </div>
                                        {selections.processor === p.name && <CheckCircle2 size={12} className="text-[#F27D26]" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RAM */}
                        <div className="space-y-3 border-b border-black/5 pb-6">
                            <span className="text-[8px] uppercase font-black tracking-widest text-black/30">Memory Module</span>
                            <div className="grid grid-cols-2 gap-2">
                                {variants.ram.map((r: string) => (
                                    <button
                                        key={r}
                                        onClick={() => setSelections(s => ({ ...s, ram: r }))}
                                        className={`p-3 border text-left transition-all flex justify-between items-center group ${selections.ram === r ? "border-[#F27D26] bg-[#F27D26]/5" : "border-black/5 hover:border-black/20"}`}
                                    >
                                        <p className="text-[10px] font-mono font-bold leading-tight uppercase tracking-widest">{r}</p>
                                        {selections.ram === r && <CheckCircle2 size={12} className="text-[#F27D26]" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Storage */}
                        <div className="space-y-3 border-b border-black/5 pb-6">
                            <span className="text-[8px] uppercase font-black tracking-widest text-black/30">Storage Drive</span>
                            <div className="grid grid-cols-2 gap-2">
                                {variants.storage.map((s: string) => (
                                    <button
                                        key={s}
                                        onClick={() => setSelections(sState => ({ ...sState, storage: s }))}
                                        className={`p-3 border text-left transition-all flex justify-between items-center group ${selections.storage === s ? "border-[#F27D26] bg-[#F27D26]/5" : "border-black/5 hover:border-black/20"}`}
                                    >
                                        <p className="text-[10px] font-mono font-bold leading-tight uppercase tracking-widest">{s}</p>
                                        {selections.storage === s && <CheckCircle2 size={12} className="text-[#F27D26]" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t-2 border-black space-y-4">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <p className="text-[8px] uppercase tracking-[0.4em] font-black text-black/20">Final Assembly Quote</p>
                                <h2 className="text-4xl font-serif font-bold italic tracking-tight">₹{totalPrice.toLocaleString()}</h2>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] font-mono text-black/20 uppercase">Incl. GST @ 18%</p>
                                <p className="text-[10px] font-black text-[#F27D26] uppercase tracking-widest">Sovereign Grade</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={handleAddToCart}
                                className="bg-[#141414] text-white py-4 text-[10px] font-black uppercase tracking-[0.4em] rounded-sm hover:bg-[#F27D26] transition-all flex items-center justify-center gap-3"
                            >
                                Buy Now <ArrowRight size={14} />
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="border-2 border-black text-black py-4 text-[10px] font-black uppercase tracking-[0.4em] rounded-sm hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3"
                            >
                                + Cart <ShoppingBag size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ENGINEERING NARRATIVE SECTIONS */}
            <div className="bg-[#141414] text-white py-40 px-12 space-y-40">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <span className="text-[#F27D26] uppercase tracking-[0.6em] font-black text-[10px]">Architecture // Thermal</span>
                            <h2 className="text-6xl md:text-7xl font-serif font-bold italic tracking-tighter leading-none">Dual-Vapor <br />Chamber Strategy.</h2>
                        </div>
                        <p className="text-lg font-serif italic text-white/50 leading-relaxed max-w-xl">
                            Our proprietary cooling solution utilizes dual-vapor chambers and liquid-metal interface, achieving a -15°C operational delta compared to industry standards. Pure thermal silence.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                            <div>
                                <p className="text-[8px] uppercase tracking-widest font-black text-white/20 mb-2">Max Delta</p>
                                <p className="text-3xl font-serif font-bold italic text-[#F27D26]">-15°C</p>
                            </div>
                            <div>
                                <p className="text-[8px] uppercase tracking-widest font-black text-white/20 mb-2">Blade Config</p>
                                <p className="text-3xl font-serif font-bold italic">S-Blades</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-video bg-white/5 rounded-sm overflow-hidden flex items-center justify-center p-12 border border-white/10 group">
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <div className="absolute inset-0 grid grid-cols-6 h-full w-full border-l border-white/20">
                                {[...Array(6)].map((_, i) => <div key={i} className="border-r border-white/20" />)}
                            </div>
                        </div>
                        <Cpu className="w-32 h-32 text-white/10 animate-pulse" strokeWidth={0.5} />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="order-2 lg:order-1 relative aspect-video bg-white/5 rounded-sm overflow-hidden flex items-center justify-center p-12 border border-white/10 group">
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <div className="absolute inset-0 grid grid-rows-6 h-full w-full border-t border-white/20">
                                {[...Array(6)].map((_, i) => <div key={i} className="border-b border-white/20" />)}
                            </div>
                        </div>
                        <Zap className="w-32 h-32 text-[#F27D26]/20" strokeWidth={0.5} />
                    </div>
                    <div className="order-1 lg:order-2 space-y-12 lg:pl-12">
                        <div className="space-y-6">
                            <span className="text-[#F27D26] uppercase tracking-[0.6em] font-black text-[10px]">Material Science</span>
                            <h2 className="text-6xl md:text-7xl font-serif font-bold italic tracking-tighter leading-none">Aeronautical <br />Grade T6.</h2>
                        </div>
                        <p className="text-lg font-serif italic text-white/50 leading-relaxed max-w-xl">
                            Each chassis is precision CNC-milled from a single block of T6 Aeronautical-grade aluminum. Strategic weight reduction meets structural absolute.
                        </p>
                        <Link href="/about">
                            <button className="flex items-center gap-4 text-[#F27D26] uppercase tracking-[0.4em] font-black text-[10px] hover:text-white transition-colors group">
                                Explore Metallurgy <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* TECHNICAL INVENTORY */}
            <div className="bg-[#FAF9F6] py-32 px-12 border-t border-black/5">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <span className="text-[#F27D26] uppercase tracking-[0.5em] font-black text-[9px] block">04 // Logistics</span>
                            <h3 className="text-5xl font-serif font-bold italic tracking-tighter">The Unboxing Protocol.</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { item: "Workbook Device", desc: "The industrial machine unit, calibrated and authenticated.", serial: "ENT-SYS-01" },
                                { item: "96W Sovereign Auth", desc: "High-speed charging cell with braided composite cable.", serial: "ENT-PWR-96" },
                                { item: "Blueprint Manual", desc: "Technical documentation and ownership certificate.", serial: "ENT-DOC-BRT" }
                            ].map((box, i) => (
                                <div key={i} className="bg-white p-10 border border-black/5 rounded-sm space-y-6 group hover:shadow-xl transition-all h-full">
                                    <div className="flex justify-between items-start">
                                        <p className="text-[12px] font-serif font-bold italic">{box.item}</p>
                                        <CheckCircle2 size={16} className="text-[#F27D26]" />
                                    </div>
                                    <p className="text-[10px] font-serif italic text-black/40 leading-relaxed">{box.desc}</p>
                                    <div className="pt-4 border-t border-black/[0.03]">
                                        <p className="text-[7px] font-mono font-black text-black/20 uppercase tracking-[0.4em]">{box.serial}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
