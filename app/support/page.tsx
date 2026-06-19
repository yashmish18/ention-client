"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Search, Wrench, Package, ShieldCheck, Truck, BookOpen, 
    FileText, HelpCircle, MessageSquare, Mail, Phone, 
    ArrowRight, Loader2, CheckCircle2, AlertCircle, ChevronRight 
} from "lucide-react";
import SmartSupportForm from "@/components/forms/SmartSupportForm";
import QuickCallbackForm from "@/components/forms/QuickCallbackForm";

export default function SupportPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showCallbackForm, setShowCallbackForm] = useState(false);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Searching support articles for: "${searchQuery}"`);
    };

    const assistCards = [
        { 
            title: "Service Request", 
            desc: "Request repairs or upgrades", 
            image: "/assets/service_technician.png", 
            icon: Wrench 
        },
        { 
            title: "Service Status", 
            desc: "Track existing repairs in real time", 
            image: "/assets/support_hero_desk.png", 
            icon: Package 
        },
        { 
            title: "Warranty Status", 
            desc: "Verify Ention Care coverage", 
            image: "/assets/landing_page/stud.png", 
            icon: ShieldCheck 
        },
        { 
            title: "Track Your Order", 
            desc: "Check shipping and delivery times", 
            image: "/assets/ention_packaging.png", 
            icon: Truck 
        }
    ];

    return (
        <main className="min-h-screen bg-bg text-ink overflow-x-hidden pt-32 pb-24 selection:bg-accent selection:text-white relative">
            
            {/* ── 1. HERO SECTION (Support Header & Overlapping Photo Collage) ─────────────────────── */}
            <section className="px-8 lg:px-16 pb-20 relative z-10 max-w-[1200px] mx-auto">
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0">
                    <svg width="100%" height="100%">
                        <pattern id="grid-hero" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid-hero)" />
                    </svg>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                    {/* Left Column: Title & Search */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent block font-bold">
                            Support and Contact
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black italic tracking-tighter leading-none text-ink">
                            How can we help today?
                        </h1>
                        <p className="text-ink/70 text-sm font-sans max-w-lg leading-relaxed">
                            Search our knowledge base for setup guides, warranty info, driver downloads, or submit a support ticket to our engineers directly.
                        </p>
                        
                        <form onSubmit={handleSearchSubmit} className="pt-4 max-w-xl">
                            <div className="relative flex items-center border border-ink/15 bg-white shadow-sm hover:border-accent/40 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/10 transition-all duration-300 rounded-sm">
                                <Search size={16} className="absolute left-5 text-ink/40" />
                                <input
                                    required
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search support articles, warranty, or product help..."
                                    className="w-full bg-transparent pl-12 pr-28 py-4 text-xs font-sans placeholder-ink/30 outline-none text-ink"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 bg-ink text-bg hover:bg-accent hover:text-white px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest rounded-sm transition-all duration-500 cursor-pointer"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Dynamic Overlapping Photo Collage */}
                    <div className="lg:col-span-5 relative h-[380px] w-full flex items-center justify-center lg:justify-end">
                        {/* Layer 1: Base Background Image */}
                        <div className="absolute top-4 right-4 w-[80%] h-[70%] rounded-sm overflow-hidden border border-ink/10 shadow-md grayscale opacity-30 pointer-events-none">
                            <img
                                src="/assets/ention_packaging.png"
                                alt="Ention packaging detail"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Layer 2: Middle Overlapping Offset Image */}
                        <div className="absolute top-12 right-12 w-[80%] h-[70%] rounded-sm overflow-hidden border border-ink/10 shadow-lg grayscale opacity-55 pointer-events-none">
                            <img
                                src="/assets/service_technician.png"
                                alt="Technician diagnostic check"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Layer 3: Front Focus Active Image */}
                        <div className="absolute bottom-4 left-4 lg:left-0 w-[80%] h-[70%] rounded-sm overflow-hidden border border-ink/10 shadow-2xl z-10">
                            <img
                                src="/assets/support_hero_desk.png"
                                alt="Ention support command center"
                                className="w-full h-full object-cover opacity-95 hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {/* Glowing Active Status Tag */}
                            <div className="absolute bottom-3 left-3 bg-black/80 px-3 py-1.5 rounded-sm border border-white/10 backdrop-blur-sm flex items-center gap-2 text-[8px] font-mono uppercase tracking-wider text-white select-none">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                <span>Support Center Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. VISUAL ASSISTANCE PHOTOGRAPHY GRID (How can we assist you?) ─────────── */}
            <section className="py-24 px-8 lg:px-16 border-t border-ink/10 bg-[#FAF7F2]/45">
                <div className="max-w-[1200px] mx-auto space-y-16 text-center">
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black italic tracking-tighter text-ink uppercase">
                            How can we assist you today?
                        </h2>
                        <p className="text-xs font-sans text-ink/60 max-w-xl mx-auto">
                            Find quick answers, track your orders, or request expert technical support in just a few clicks.
                        </p>
                    </div>

                    {/* Image Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {assistCards.map((card, idx) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={idx}
                                    className="relative h-72 rounded-sm overflow-hidden group cursor-pointer border border-ink/10 shadow-md flex flex-col justify-end p-6 hover:border-accent/30 transition-all duration-500"
                                >
                                    {/* Image Container with Zoom & Overlay */}
                                    <div className="absolute inset-0 z-0 bg-ink">
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                        />
                                        {/* Dynamic Gradient mask */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10 transition-colors duration-500 group-hover:from-black/90" />
                                    </div>

                                    {/* Foreground Card elements */}
                                    <div className="relative z-20 space-y-2 text-left">
                                        <div className="w-8 h-8 rounded-sm bg-white/10 border border-white/20 flex items-center justify-center text-accent mb-2 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                            <Icon size={16} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-lg font-serif font-black italic text-white tracking-tight leading-tight">
                                            {card.title}
                                        </h3>
                                        <p className="text-[10px] font-sans text-white/70 leading-relaxed uppercase tracking-wider group-hover:text-accent transition-colors duration-300">
                                            {card.desc}
                                        </p>
                                        <div className="pt-2 flex items-center gap-1 text-[9px] font-mono uppercase tracking-[0.25em] text-white/40 group-hover:text-white transition-colors duration-300">
                                            <span>Access Portal</span>
                                            <ChevronRight size={10} className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 3. DETAILED SUPPORT & TICKET SYSTEM ─────────────────────────────────── */}
            <section className="py-24 px-8 lg:px-16 border-t border-ink/10">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
                    
                    {/* Left Column: Visual Resource Rows & Live Indicators */}
                    <div className="lg:col-span-5 space-y-12 text-left">
                        <div className="space-y-4">
                            <p className="text-sm font-sans text-ink/70 leading-relaxed">
                                Browse guides, manuals, and FAQs — or reach us directly through your preferred channel.
                            </p>
                        </div>

                        {/* Restructured Resource Rows (Image + Text layout) */}
                        <div className="space-y-6">
                            {[
                                { 
                                    title: "Troubleshooting Guides", 
                                    desc: "Step-by-step solutions for common device issues.", 
                                    icon: BookOpen,
                                    image: "/assets/service_technician.png"
                                },
                                { 
                                    title: "User Manuals & Docs", 
                                    desc: "Download setup guides, specs, and product manuals.", 
                                    icon: FileText,
                                    image: "/assets/ention_packaging.png"
                                },
                                { 
                                    title: "Detailed FAQs", 
                                    desc: "Instant answers to product, shipping, and service questions.", 
                                    icon: HelpCircle,
                                    image: "/assets/support_hero_desk.png"
                                }
                            ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="p-4 border border-ink/10 bg-white hover:border-accent/35 rounded-sm shadow-sm transition-all duration-300 flex items-center justify-between group cursor-pointer gap-5"
                                    >
                                        <div className="flex gap-4 items-center w-full">
                                            {/* Accent Thumbnail Image Block */}
                                            <div className="w-24 h-16 bg-[#FAF7F2] rounded-sm overflow-hidden border border-ink/5 relative shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                            </div>

                                            <div className="space-y-1">
                                                <h4 className="font-sans font-bold text-xs text-ink group-hover:text-accent transition-colors duration-300 flex items-center gap-1.5">
                                                    <Icon size={12} strokeWidth={1.5} />
                                                    {item.title}
                                                </h4>
                                                <p className="text-[10px] text-ink/65 font-sans leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRight size={14} className="text-ink/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Direct Support */}
                        <div className="space-y-4 pt-6 border-t border-ink/10">
                            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent font-bold block">
                                Direct Support
                            </span>
                            
                            <div className="space-y-3">
                                {/* Live Chat */}
                                <div className="p-4 border border-ink/5 bg-white/40 flex items-center justify-between rounded-sm shadow-sm hover:border-ink/10 transition-colors duration-300">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare size={16} className="text-accent shrink-0" strokeWidth={1.5} />
                                        <div>
                                            <h5 className="font-sans font-bold text-xs text-ink leading-tight">
                                                Live Chat
                                            </h5>
                                            <p className="text-[10px] text-ink/60 font-sans leading-tight mt-0.5">
                                                Avg. 2 min response
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span>Online</span>
                                    </div>
                                </div>

                                {/* Email Support */}
                                <div className="p-4 border border-ink/5 bg-white/40 flex items-center justify-between rounded-sm shadow-sm hover:border-ink/10 transition-colors duration-300">
                                    <div className="flex items-center gap-3">
                                        <Mail size={16} className="text-accent shrink-0" strokeWidth={1.5} />
                                        <div>
                                            <h5 className="font-sans font-bold text-xs text-ink leading-tight">
                                                Email Support
                                            </h5>
                                            <p className="text-[10px] text-ink/60 font-sans leading-tight mt-0.5">
                                                support@ention.in
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span>Online</span>
                                    </div>
                                </div>

                                {/* Request Callback with Accordion */}
                                <div className="space-y-4">
                                    <div
                                        onClick={() => setShowCallbackForm(!showCallbackForm)}
                                        className="p-4 border border-ink/5 bg-white/40 flex items-center justify-between rounded-sm shadow-sm hover:border-ink/10 hover:border-accent/25 transition-all duration-300 cursor-pointer select-none"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Phone size={16} className="text-accent shrink-0" strokeWidth={1.5} />
                                            <div>
                                                <h5 className="font-sans font-bold text-xs text-ink leading-tight">
                                                    Request Callback
                                                </h5>
                                                <p className="text-[10px] text-ink/60 font-sans leading-tight mt-0.5">
                                                    Talk to an expert
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                <span>Online</span>
                                            </div>
                                            <ChevronRight size={12} className={`text-ink/35 transition-transform duration-300 ${showCallbackForm ? 'rotate-95' : ''}`} />
                                        </div>
                                    </div>
                                    
                                    <AnimatePresence>
                                        {showCallbackForm && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-2">
                                                    <QuickCallbackForm source="support_page_callback" onSuccess={() => setShowCallbackForm(false)} />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Ticket Form */}
                    <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-ink/10 pt-12 lg:pt-0 lg:pl-16 relative overflow-hidden text-left">
                        <SmartSupportForm source="support_page" />
                    </div>

                </div>
            </section>
        </main>
    );
}
