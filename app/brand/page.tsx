"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Target, Zap, Shield, Hexagon, BookOpen, 
    Palette, Type, ArrowRight, ChevronLeft, ChevronRight,
    Search, Image as ImageIcon, Circle, Square, 
    MousePointer2, MessageSquare, Laptop, Globe
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- CORE UTILS ---
const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

const SectionHeader = ({ num, title, subtitle }: { num: string, title: string, subtitle?: string }) => (
    <div className="flex justify-between items-end mb-16 border-b border-ink/10 pb-6">
        <div className="space-y-2">
            <span className="font-mono text-[10px] opacity-40 uppercase tracking-[0.5em]">0{num} / {title.toUpperCase()}</span>
            <h2 className="text-4xl md:text-6xl font-serif font-black italic tracking-tighter uppercase">{title}</h2>
        </div>
        {subtitle && <span className="font-mono text-[10px] opacity-30 uppercase tracking-[0.5em] hidden md:block">{subtitle}</span>}
    </div>
);

export default function BrandPage() {
    const [activeTab, setActiveTab] = useState("foundation");

    return (
        <main className="min-h-screen bg-bg text-ink selection:bg-accent selection:text-bg">
            
            {/* ── 1. HERO ─────────────────────────────────────────────── */}
            <section className="relative h-[80vh] bg-ink text-bg flex flex-col justify-center px-8 md:px-16 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                    <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>
                
                <div className="relative z-10 max-w-6xl">
                    <FadeUp className="space-y-8">
                        <span className="font-mono text-[10px] text-accent font-black uppercase tracking-[0.8em] block">Official Brand Identity v1.0</span>
                        <h1 className="text-6xl md:text-9xl font-serif font-black italic tracking-tighter leading-none uppercase">
                            Building India’s <br />
                            <span className="text-accent">Computing Future.</span>
                        </h1>
                        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] opacity-40 max-w-2xl leading-relaxed">
                            ENTION is a computing and ecosystem company, not just a laptop brand. Architecture for the next era of Bharat.
                        </p>
                    </FadeUp>
                </div>

                <div className="absolute right-8 md:right-16 bottom-16 hidden md:block">
                     <div className="font-serif italic text-8xl opacity-5 pointer-events-none select-none">ENTION®</div>
                </div>
            </section>

            {/* ── 2. NAVIGATION ────────────────────────────────────────── */}
            <nav className="sticky top-0 z-50 bg-bg border-b border-ink/10 px-8 py-4 overflow-x-auto">
                <div className="flex gap-12 min-w-max mx-auto max-w-[1400px]">
                    {["foundation", "logo", "identity", "voice", "visuals"].map((tab) => (
                        <button 
                            key={tab} 
                            onClick={() => {
                                setActiveTab(tab);
                                document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                            className={`font-mono text-[10px] uppercase font-black tracking-widest transition-all ${activeTab === tab ? "text-accent border-b border-accent pb-1" : "opacity-30 hover:opacity-100"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </nav>

            {/* ── 3. CONTENT ───────────────────────────────────────────── */}
            <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-32 space-y-48">

                {/* --- FOUNDATION --- */}
                <section id="foundation" className="scroll-mt-32">
                    <FadeUp>
                        <SectionHeader num="1" title="Brand Foundation" subtitle="Strategy & Purpose" />
                    </FadeUp>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mt-20">
                        <FadeUp className="space-y-12">
                            <div className="space-y-6">
                                <h3 className="font-serif italic font-black text-3xl uppercase text-accent">Positioning</h3>
                                <p className="text-2xl font-serif leading-relaxed italic opacity-80">"Ention is a computing and ecosystem company, not just a laptop brand."</p>
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-serif italic font-black text-3xl uppercase text-accent">Promise</h3>
                                <p className="font-mono text-xs uppercase tracking-[0.4em] leading-loose opacity-60 italic">Reliable, customizable, and scalable computing solutions — built for real-world needs.</p>
                            </div>
                        </FadeUp>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { t: "Practical", d: "Real-world focused, not hype", i: Target },
                                { t: "Visionary", d: "Long-term ecosystem builder", i: Zap },
                                { t: "Trustworthy", d: "Reliable, transparent", i: Shield },
                                { t: "Indian", d: "Built for India, not copied", i: Globe },
                                { t: "Enabling", d: "Helps users grow", i: BookOpen },
                            ].map((trait, i) => (
                                <FadeUp key={i} delay={i * 0.1} className="p-8 border border-ink/5 bg-white space-y-4 hover:bg-ink hover:text-bg transition-colors group">
                                    <trait.i size={20} className="text-accent group-hover:text-bg transition-colors" />
                                    <div>
                                        <h4 className="font-serif italic font-black text-xl uppercase tracking-tighter">{trait.t}</h4>
                                        <p className="font-mono text-[9px] uppercase tracking-widest opacity-40 font-bold group-hover:opacity-100">{trait.d}</p>
                                    </div>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- LOGO --- */}
                <section id="logo" className="scroll-mt-32">
                    <FadeUp>
                        <SectionHeader num="2" title="Logo Guidelines" subtitle="Usage & Rules" />
                    </FadeUp>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-20">
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white border border-ink/5 p-12 flex flex-col items-center justify-center gap-8 min-h-[300px] group overflow-hidden">
                                <div className="text-4xl font-serif font-black italic tracking-tighter uppercase">ENTION</div>
                                <span className="font-mono text-[8px] uppercase tracking-[0.5em] opacity-30">Primary (Dark)</span>
                            </div>
                            <div className="bg-ink text-bg border border-white/5 p-12 flex flex-col items-center justify-center gap-8 min-h-[300px] group overflow-hidden">
                                <div className="text-4xl font-serif font-black italic tracking-tighter uppercase">ENTION</div>
                                <span className="font-mono text-[8px] uppercase tracking-[0.5em] opacity-30">Secondary (White)</span>
                            </div>
                            <div className="bg-accent text-bg border border-white/5 p-12 flex flex-col items-center justify-center gap-8 min-h-[300px] group overflow-hidden">
                                <div className="text-6xl font-serif font-black italic tracking-tighter uppercase">E</div>
                                <span className="font-mono text-[8px] uppercase tracking-[0.5em] opacity-30">Icon / Symbol</span>
                            </div>
                        </div>
                        <div className="lg:col-span-4 bg-ink text-bg p-12 space-y-12">
                            <div className="space-y-6">
                                <h4 className="font-mono text-[10px] uppercase font-black tracking-[0.5em] text-accent underline underline-offset-8">Usage Rules</h4>
                                <ul className="space-y-4 font-mono text-[10px] uppercase tracking-widest opacity-60">
                                    <li>• Don’t stretch or distort</li>
                                    <li>• Don’t use random colors</li>
                                    <li>• Don’t add shadows/effects</li>
                                    <li>• Don’t change font casually</li>
                                </ul>
                            </div>
                            <div className="pt-12 border-t border-white/10 space-y-4">
                                <div className="font-serif italic text-2xl font-black">Clean. <br /> Minimal. <br /> Strong.</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- IDENTITY (COLORS & FONTS) --- */}
                <section id="identity" className="scroll-mt-32">
                    <FadeUp>
                        <SectionHeader num="3" title="Visual Identity" subtitle="Colors & Typography" />
                    </FadeUp>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mt-20">
                        {/* Colors */}
                        <div className="space-y-12">
                             <h3 className="font-serif italic font-black text-3xl uppercase">Color Palette</h3>
                             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { n: "Core Ink", h: "#141414", c: "bg-ink", t: "text-bg" },
                                    { n: "Industrial", h: "#E4E3E0", c: "bg-bg", t: "text-ink" },
                                    { n: "Saffron", h: "#F27D26", c: "bg-accent", t: "text-bg" },
                                    { n: "Cobalt", h: "#0A2540", c: "bg-[#0A2540]", t: "text-bg" },
                                ].map((c, i) => (
                                    <div key={i} className={`${c.c} ${c.t} p-8 h-48 flex flex-col justify-between border border-ink/5`}>
                                        <div className="font-mono text-[8px] tracking-[0.3em] font-black uppercase opacity-40">{c.n}</div>
                                        <div className="font-serif italic text-xl font-black">{c.h}</div>
                                    </div>
                                ))}
                             </div>
                             <p className="font-mono text-[9px] uppercase tracking-widest opacity-40 leading-relaxed italic">Recommendation: Background: White/Grey | Text: Dark | CTA: Saffron/Cobalt</p>
                        </div>
                        {/* Typography */}
                        <div className="space-y-12">
                             <h3 className="font-serif italic font-black text-3xl uppercase">Typography</h3>
                             <div className="space-y-8 p-10 bg-white border border-ink/5">
                                <div className="space-y-2">
                                     <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-black">Primary: Libre Baskerville</span>
                                     <h4 className="text-4xl font-serif font-black italic tracking-tighter uppercase leading-none">THE HEADLINES.</h4>
                                </div>
                                <div className="space-y-2 border-t border-ink/5 pt-8">
                                     <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-black">Secondary: Inter</span>
                                     <p className="font-sans text-xl font-bold">Standard UI & Body Text.</p>
                                     <p className="font-sans text-sm opacity-60 leading-relaxed">Ention prioritizes clarity and outcome-focused language through industrial-grade typography.</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </section>

                {/* --- VOICE --- */}
                <section id="voice" className="scroll-mt-32">
                    <FadeUp>
                        <SectionHeader num="4" title="Voice & Tone" subtitle="Our Communication Style" />
                    </FadeUp>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10 mt-20">
                        {["Clear", "Direct", "Confident", "Not Overhyped"].map((t, i) => (
                            <FadeUp key={i} delay={i * 0.1} className="bg-bg p-12 flex flex-col items-center text-center gap-6 hover:bg-accent hover:text-bg transition-all duration-700">
                                <MessageSquare size={24} strokeWidth={1} />
                                <span className="font-serif italic font-black text-2xl uppercase tracking-tighter">{t}</span>
                            </FadeUp>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mt-20">
                        <FadeUp className="space-y-8">
                             <h4 className="font-mono text-[10px] uppercase font-black tracking-[0.5em] text-accent">Writing Style</h4>
                             <ul className="space-y-4 font-serif italic text-2xl opacity-80 leading-snug">
                                <li>• Simple sentences.</li>
                                <li>• Outcome-focused language.</li>
                                <li>• No over-promising.</li>
                             </ul>
                        </FadeUp>
                        <FadeUp delay={0.2} className="p-12 bg-ink text-bg/40 space-y-8">
                             <h4 className="font-mono text-[10px] uppercase font-black tracking-[0.5em] text-red-500">The "Never" List</h4>
                             <ul className="space-y-4 font-mono text-[9px] uppercase tracking-[0.4em] font-black">
                                <li>• BUZZWORDS</li>
                                <li>• COMPLICATED JARGON</li>
                                <li>• STOCK-HEAVY VISUALS</li>
                             </ul>
                        </FadeUp>
                    </div>
                </section>

                {/* --- VISUALS --- */}
                <section id="visuals" className="scroll-mt-32">
                    <FadeUp>
                        <SectionHeader num="5" title="Visual Style" subtitle="Direction & UI" />
                    </FadeUp>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-20">
                         <FadeUp className="space-y-8">
                            <ImageIcon size={32} className="text-accent" />
                            <h4 className="font-serif italic font-black text-2xl uppercase">Image Style</h4>
                            <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 leading-relaxed">Real usage (students, labs, teams). Show environment in India context. Avoid stock-heavy feels.</p>
                         </FadeUp>
                         <FadeUp delay={0.1} className="space-y-8">
                            <Laptop size={32} className="text-accent" />
                            <h4 className="font-serif italic font-black text-2xl uppercase">UI Elements</h4>
                            <div className="space-y-8 pt-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-8 bg-accent rounded-sm" />
                                    <span className="font-mono text-[8px] uppercase tracking-widest opacity-40">Buttons (Slight Round)</span>
                                </div>
                                <div className="p-4 bg-white border border-ink/5 shadow-sm h-16 w-32" />
                                <span className="font-mono text-[8px] uppercase tracking-widest opacity-40">Cards (Clear Spacing)</span>
                            </div>
                         </FadeUp>
                         <FadeUp delay={0.2} className="space-y-8">
                            <Hexagon size={32} className="text-accent" />
                            <h4 className="font-serif italic font-black text-2xl uppercase">Icons</h4>
                            <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 leading-relaxed">Simple line icons. Consistent weight. Minimalist geometry.</p>
                         </FadeUp>
                    </div>
                </section>

                {/* --- MULTI-LANGUAGE SECTION (AS REQUESTED) --- */}
                <section id="multi-language" className="py-24 bg-ink text-bg text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                    </div>
                    
                    <FadeUp className="max-w-4xl mx-auto space-y-12 relative z-10">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.8em] text-accent font-black">Brand Signature</h4>
                        <div className="text-4xl md:text-7xl font-serif font-black italic tracking-tighter uppercase space-y-4">
                            <p>ENTION</p>
                            <p className="text-accent opacity-20 hover:opacity-100 transition-opacity cursor-default animate-pulse">एंटियन</p>
                            <p className="opacity-10">என்ஷன்</p>
                        </div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-40">Indigenous • Scalable • Practical</p>
                    </FadeUp>
                </section>

                {/* --- MESSAGING FRAMEWORK --- */}
                <section className="py-40 border-t border-ink/10 text-center">
                    <FadeUp className="space-y-12">
                         <h2 className="text-4xl md:text-7xl font-serif font-black italic tracking-tighter uppercase">
                            Not just a laptop company—<br />
                            <span className="text-accent underline underline-offset-[12px] decoration-ink/10">building a ecosystem.</span>
                         </h2>
                         <div className="flex flex-wrap justify-center gap-12 pt-12">
                            {["Built for India", "Designed for Real Use", "Scalable Solutions", "Long-term Vision"].map((msg, i) => (
                                <span key={i} className="font-mono text-[10px] uppercase tracking-[0.5em] font-black opacity-30 px-6 py-2 border border-ink/10">{msg}</span>
                            ))}
                         </div>
                    </FadeUp>
                </section>

            </div>

            {/* ── 4. FOOTER ACTION ────────────────────────────────────── */}
            <section className="bg-ink py-24 px-8 md:px-16 flex flex-col items-center text-center gap-12">
                 <FadeUp className="space-y-4">
                    <h3 className="text-bg font-serif italic font-black text-3xl uppercase">Ready to scale?</h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-bg/40">Download the full brand assets (v1.0.4)</p>
                 </FadeUp>
                 <Link href="/products" className="bg-accent text-bg px-16 py-6 text-xs font-black uppercase tracking-[0.6em] hover:bg-bg hover:text-ink transition-all flex items-center gap-6 group shadow-2xl">
                    View Portfolio <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                 </Link>
            </section>

        </main>
    );
}
