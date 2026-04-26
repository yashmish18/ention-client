"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, HardDrive, Zap, ShoppingBag, ArrowRight, CheckCircle2, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { useRouter } from "next/navigation";
import FormModal from "@/components/FormModal";
import LeadSalesForm from "@/components/forms/LeadSalesForm";
import ProgramApplicationForm from "@/components/forms/ProgramApplicationForm";
import SmartSupportForm from "@/components/forms/SmartSupportForm";
import { LifeBuoy, HelpCircle } from "lucide-react";



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
    const router = useRouter();

    const [activeForm, setActiveForm] = useState<"LEAD" | "PROGRAM" | "SUPPORT" | null>(null);

    const handleBuyNow = () => {
        setActiveForm("LEAD");
    };

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

    const handleNextImage = () => {
        setActiveImage((prev) => (prev + 1) % images.length);
    };

    const handlePrevImage = () => {
        setActiveImage((prev) => (prev - 1 + images.length) % images.length);
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

                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-black/5 pb-10">
                    <p className="text-lg font-serif italic text-black/60 leading-relaxed max-w-3xl">
                        {product.description || "A professional-grade computing solution built for performance and reliability in demanding environments."}
                    </p>
                    <button 
                        onClick={() => setActiveForm("SUPPORT")}
                        className="flex items-center gap-3 text-accent font-mono text-[10px] uppercase tracking-[0.4em] font-black border border-accent/20 px-6 py-3 hover:bg-accent hover:text-white transition-all w-max whitespace-nowrap"
                    >
                        <HelpCircle size={14} /> Need Help?
                    </button>
                </div>
            </div>

            <FormModal isOpen={activeForm !== null} onClose={() => setActiveForm(null)}>
                {activeForm === "LEAD" && <LeadSalesForm source={`PDP: ${product.name}`} onSuccess={() => setActiveForm(null)} />}
                {activeForm === "PROGRAM" && <ProgramApplicationForm programName="Experience Program" onSuccess={() => setActiveForm(null)} />}
                {activeForm === "SUPPORT" && <SmartSupportForm initialCategory="Product Support" productModel={product.name} onSuccess={() => setActiveForm(null)} />}
            </FormModal>

            <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-black/5 min-h-[60vh]">
                {/* Left: Gallery (Hyper-Compact) */}
                <div className="lg:col-span-7 bg-white relative p-6 lg:p-10 flex flex-col items-center justify-center border-r border-black/[0.03]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeImage}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-full aspect-[4/3] max-w-[850px] z-10 mx-auto"
                        >
                            <Image
                                src={images[activeImage]}
                                alt={product.name}
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Carousel Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white border border-black/10 rounded-full shadow-md text-black/60 hover:text-black hover:scale-105 transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white border border-black/10 rounded-full shadow-md text-black/60 hover:text-black hover:scale-105 transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </>
                    )}

                    <div className="mt-8 flex flex-wrap justify-center gap-3 z-20 w-full max-w-[500px]">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`w-12 h-12 flex-shrink-0 border transition-all overflow-hidden p-0.5 ${activeImage === idx ? "border-[#F27D26] bg-white scale-110 shadow-[0_0_15px_rgba(242,125,38,0.2)]" : "border-black/10 bg-transparent hover:border-black/30 opacity-70 hover:opacity-100"
                                    }`}
                            >
                                <div className="relative w-full h-full">
                                    <Image src={img} alt="thumb" fill className="object-cover" />
                                </div>
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
                                onClick={handleBuyNow}
                                className="bg-[#141414] text-white py-4 text-[10px] font-black uppercase tracking-[0.4em] rounded-sm hover:bg-[#F27D26] transition-all flex items-center justify-center gap-3"
                            >
                                Buy / Enquire <ArrowRight size={14} />
                            </button>
                            <button
                                onClick={() => setActiveForm("PROGRAM")}
                                className="border-2 border-black text-black py-4 text-[10px] font-black uppercase tracking-[0.4em] rounded-sm hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3"
                            >
                                Try Experience <LifeBuoy size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ENGINEERING NARRATIVE SECTIONS */}
            <div className="bg-[#141414] text-white py-40 px-12 space-y-40">

                {/* DYNAMIC NARRATIVE 1 */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <span className="text-[#F27D26] uppercase tracking-[0.6em] font-black text-[10px]">
                                {product.slug === 's1' ? 'Thermal Architecture' :
                                    product.slug === 'e4' ? 'Thermal Architecture' :
                                        product.slug === 'e5' ? 'Smart Controls' :
                                            product.slug === 'e1' ? 'Portability Index' : 'Architecture'}
                            </span>
                            <h2 className="text-6xl md:text-7xl font-serif font-bold italic tracking-tighter leading-none">
                                {product.slug === 's1' ? 'Advanced Cooling System.' :
                                    product.slug === 'e4' ? 'Dual-Cooling Architecture.' :
                                        product.slug === 'e5' ? 'Intuitive Swipe Gestures.' :
                                            product.slug === 'e1' ? 'Uncompromising Mobility.' : 'Engineered Precision.'}
                            </h2>
                        </div>
                        <p className="text-lg font-serif italic text-white/50 leading-relaxed max-w-xl">
                            {product.slug === 's1' ? 'Engineered for advanced computing and 3D rendering. Dissipates thermal loads rapidly, maintaining stable clock speeds during intense use.' :
                                product.slug === 'e4' ? 'Dual heat pipes and high-velocity dual fans rapidly exhaust heavy workloads—designed specifically around the 10-core i7 processor.' :
                                    product.slug === 'e5' ? 'Volume and brightness adjust seamlessly directly via intuitive touch swipe gestures right on the device.' :
                                        product.slug === 'e1' ? 'Lightweight design at 1.3kg, engineered for portability—perfect for daily productive use.' :
                                            'Custom-calibrated hardware architecture ensuring thermal and structural absolute.'}
                        </p>

                        {(product.slug === 's1' || product.slug === 'e4') && (
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                                <div>
                                    <p className="text-[8px] uppercase tracking-widest font-black text-white/20 mb-2">Cooling Output</p>
                                    <p className="text-3xl font-serif font-bold italic text-[#F27D26]">Max Delta</p>
                                </div>
                                <div>
                                    <p className="text-[8px] uppercase tracking-widest font-black text-white/20 mb-2">Thermal Array</p>
                                    <p className="text-3xl font-serif font-bold italic">Dual Fans</p>
                                </div>
                            </div>
                        )}
                        {(product.slug === 'e1') && (
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                                <div>
                                    <p className="text-[8px] uppercase tracking-widest font-black text-white/20 mb-2">Total Weight</p>
                                    <p className="text-3xl font-serif font-bold italic text-[#F27D26]">1.3 KG</p>
                                </div>
                                <div>
                                    <p className="text-[8px] uppercase tracking-widest font-black text-white/20 mb-2">Form Factor</p>
                                    <p className="text-3xl font-serif font-bold italic">Ultra Slim</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative aspect-video bg-[#141414] rounded-sm overflow-hidden flex items-center justify-center border border-white/10 group">
                        {product.slug === 's1' ? (
                            <Image
                                src="/assets/all_product_page/s1-p-2.png"
                                alt="Advanced Cooling System"
                                fill
                                className="object-contain lg:object-cover p-2 lg:p-0 opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                unoptimized
                            />
                        ) : (
                            <>
                                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <div className="absolute inset-0 grid grid-cols-6 h-full w-full border-l border-white/20">
                                        {[...Array(6)].map((_, i) => <div key={i} className="border-r border-white/20" />)}
                                    </div>
                                </div>
                                {product.slug === 'e1' || product.slug === 'e5' ? <Zap className="w-32 h-32 text-[#F27D26]/20 animate-pulse" strokeWidth={0.5} /> : <Cpu className="w-32 h-32 text-white/10 animate-pulse" strokeWidth={0.5} />}
                            </>
                        )}
                    </div>
                </div>

                {/* DYNAMIC NARRATIVE 2 */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="order-2 lg:order-1 relative aspect-video bg-[#141414] rounded-sm overflow-hidden flex items-center justify-center border border-white/10 group">
                        {product.slug === 's1' ? (
                            <Image
                                src="/assets/all_product_page/s1-p.png"
                                alt="RGB Fingerprint Security"
                                fill
                                className="object-contain lg:object-cover p-2 lg:p-0 opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                unoptimized
                            />
                        ) : (
                            <>
                                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <div className="absolute inset-0 grid grid-rows-6 h-full w-full border-t border-white/20">
                                        {[...Array(6)].map((_, i) => <div key={i} className="border-b border-white/20" />)}
                                    </div>
                                </div>
                                <HardDrive className="w-32 h-32 text-[#F27D26]/20" strokeWidth={0.5} />
                            </>
                        )}
                    </div>
                    <div className="order-1 lg:order-2 space-y-12 lg:pl-12">
                        <div className="space-y-6">
                            <span className="text-[#F27D26] uppercase tracking-[0.6em] font-black text-[10px]">
                                {product.slug === 's1' ? 'Input & Security' :
                                    product.slug === 'e4' ? 'Memory & Storage' :
                                        product.slug === 'e1' ? 'Input Interface' : 'Input & Security'}
                            </span>
                            <h2 className="text-6xl md:text-7xl font-serif font-bold italic tracking-tighter leading-none">
                                {product.slug === 's1' ? 'RGB Fingerprint Security.' :
                                    product.slug === 'e4' ? 'Dual Slot Dominance.' :
                                        product.slug === 'e1' ? 'Full Size Numeric.' : 'Secured Processing.'}
                            </h2>
                        </div>
                        <p className="text-lg font-serif italic text-white/50 leading-relaxed max-w-xl">
                            {product.slug === 's1' ? 'Featuring an RGB illuminated keyboard with an integrated Numeric Pad. Instant access granted via Windows Fingerprint Lock and a 2MP HD webcam with manual privacy shutter.' :
                                product.slug === 'e4' ? 'Scale effortlessly. The E4 boasts dual memory and storage expansion slots, flanked by RGB keyboard illumination and a fingerprint lock.' :
                                    product.slug === 'e1' ? 'Despite its 14-inch form, it features an independent numeric keypad and Type-C connectivity, perfectly tuned for rapid data entry.' :
                                        'Features structural biometric sensors including fingerprint lock and secure manual webcam privacy shutters.'}
                        </p>
                        <Link href="/about">
                            <button className="flex items-center gap-4 text-[#F27D26] uppercase tracking-[0.4em] font-black text-[10px] hover:text-white transition-colors group">
                                Learn More <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
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
                                { item: "96W Sovereign Auth", desc: "Rapid charging cell with braided composite cable.", serial: "ENT-PWR-96" },
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
