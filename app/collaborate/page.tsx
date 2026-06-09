"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, Beaker, Rocket, GraduationCap, Handshake, Network, Globe } from "lucide-react";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import { PROGRAMS } from "@/lib/programs-data";

// --- GLOBAL ANIMATION UTILS (Cloned from homepage for consistency) ---
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
    <div className="flex justify-between items-end mb-12 border-b border-current/10 pb-4">
        <div>
            <span className="font-mono text-xs opacity-50">— {num} / {title.toUpperCase()}</span>
            <h2 className="text-4xl md:text-5xl mt-2 font-bold font-serif">{title}</h2>
        </div>
        {subtitle && <span className="font-mono text-[10px] opacity-40 uppercase tracking-[0.4em]">{subtitle}</span>}
    </div>
);

const ICON_MAP: Record<string, React.ComponentType<any>> = {
    "innovation-labs": Beaker,
    "startup-ecosystem": Rocket,
    "campus-ambassador": GraduationCap,
    "co-creation": Handshake,
};

export default function CollaboratePage() {
    const [activeProgram, setActiveProgram] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-bg text-ink overflow-x-hidden selection:bg-accent selection:text-bg">

            {/* ── 1. HERO [INK] ─────────────────────────────────────────── */}
            <section className="relative min-h-screen bg-ink text-bg flex flex-col items-center justify-center px-8 md:px-16 pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
                    <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>
                
                {/* Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] whitespace-nowrap z-0">
                    <span className="text-[20vw] font-serif font-black italic uppercase tracking-widest leading-none">
                        ECOSYSTEM
                    </span>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto w-full space-y-12 flex flex-col items-center text-center">
                    <FadeUp>
                        <span className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] font-bold block mb-4">Innovation Network & Partnerships</span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black italic tracking-tighter leading-[0.85] uppercase">
                            Build <br />
                            <span className="text-accent not-italic">Ecosystems.</span>
                        </h1>
                    </FadeUp>
                    
                    <FadeUp delay={0.2}>
                        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] opacity-50 max-w-2xl leading-relaxed italic">
                            Ention enables institutions, startups, and organizations with ready-to-deploy computing infrastructure, innovation programs, and continuous support.
                        </p>
                    </FadeUp>

                    <FadeUp delay={0.4} className="flex flex-col sm:flex-row gap-8 items-center pt-8">
                        <Link href="#programs" className="bg-accent text-bg px-12 py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-ink transition-all rounded-sm shadow-2xl flex items-center gap-4">
                            Explore Programs <ArrowRight size={16} />
                        </Link>
                        <Link href="/support" className="bg-transparent text-bg border border-white/20 px-12 py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-ink transition-all rounded-sm flex items-center gap-4">
                            Join Network
                        </Link>
                    </FadeUp>
                </div>
            </section>

            {/* ── 2. METRICS [BG] ──────────────────────────────────────── */}
            <section className="py-24 px-8 md:px-16 bg-bg border-b border-ink/5">
                <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 border border-ink/5">
                    {[
                        { n: "500+", label: "Devices Deployed", icon: Globe },
                        { n: "4", label: "Active Programs", icon: Network },
                        { n: "100%", label: "Made in India", icon: Beaker },
                        { n: "24/7", label: "Partner Support", icon: Handshake },
                    ].map((s, i) => (
                        <FadeUp key={i} delay={i * 0.1} className="bg-bg p-12 flex flex-col gap-4 group hover:bg-ink hover:text-bg transition-colors duration-500">
                             <s.icon size={20} className="text-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                             <div className="space-y-1">
                                <span className="text-4xl font-serif font-black italic text-ink group-hover:text-accent transition-colors">{s.n}</span>
                                <span className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-40 font-bold block">{s.label}</span>
                             </div>
                        </FadeUp>
                    ))}
                </div>
            </section>

            {/* ── 3. PROGRAM INDEX [BG] ────────────────────────────────── */}
            <section id="programs" className="py-40 px-8 md:px-16 bg-bg text-ink relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <FadeUp>
                        <SectionHeader num="01" title="Our Programs" subtitle="Innovation Pathways" />
                    </FadeUp>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
                        {PROGRAMS.map((program, i) => {
                            const Icon = ICON_MAP[program.slug] || Beaker;
                            return (
                                <FadeUp key={program.id} delay={i * 0.1}>
                                    <div className="group relative border border-ink/10 bg-white p-12 h-full flex flex-col justify-between hover:border-accent/40 transition-all duration-700 min-h-[500px] shadow-sm hover:shadow-2xl">
                                        <div className="space-y-8 relative z-10">
                                            <div className="flex justify-between items-start">
                                                <div className="w-16 h-16 bg-bg border border-ink/5 flex items-center justify-center group-hover:bg-accent group-hover:text-bg transition-colors duration-500">
                                                    <Icon size={28} strokeWidth={1} />
                                                </div>
                                                <span className="font-mono text-[9px] uppercase tracking-[0.4em] font-black p-2 border border-ink/5 opacity-40">{program.badge}</span>
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-4xl font-serif italic font-black uppercase tracking-tighter leading-none">{program.title}</h3>
                                                <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 leading-relaxed max-w-sm">{program.subtitle}</p>
                                            </div>
                                        </div>

                                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity flex items-center justify-center">
                                             <Icon size={300} strokeWidth={0.5} />
                                        </div>

                                        <div className="pt-12 relative z-10 border-t border-ink/5 mt-12 flex items-center gap-6">
                                            <Link
                                                href={`/collaborate/${program.slug}`}
                                                className="flex-1 bg-ink text-bg px-8 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-accent transition-all flex items-center justify-center gap-4"
                                            >
                                                {program.ctaLabel} <ArrowRight size={14} />
                                            </Link>
                                            <button 
                                                onClick={() => setActiveProgram(activeProgram === program.slug ? null : program.slug)}
                                                className="p-5 border border-ink/10 hover:border-accent/30 transition-colors"
                                            >
                                                <ChevronDown size={18} className={`transition-transform duration-500 ${activeProgram === program.slug ? "rotate-180" : ""}`} />
                                            </button>
                                        </div>

                                        {/* Quick Info Drawer */}
                                        <AnimatePresence>
                                            {activeProgram === program.slug && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden bg-ink text-bg mt-6"
                                                >
                                                    <div className="p-8 grid grid-cols-2 gap-8 border-t border-white/10">
                                                        <div className="space-y-4">
                                                            <span className="font-mono text-[8px] uppercase tracking-widest text-accent font-black block underline">Who it's for</span>
                                                            <ul className="space-y-2 opacity-70">
                                                                {program.for.slice(0, 3).map((f, idx) => (
                                                                    <li key={idx} className="font-serif italic text-sm">{f}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <span className="font-mono text-[8px] uppercase tracking-widest text-accent font-black block underline">Key Benefit</span>
                                                            <ul className="space-y-2 opacity-70">
                                                                {program.benefits.slice(0, 3).map((b, idx) => (
                                                                    <li key={idx} className="font-serif italic text-sm">✓ {b}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </FadeUp>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 4. PARTNERSHIP CTA [INK] ─────────────────────────────── */}
            <section className="py-40 px-8 md:px-16 bg-ink text-bg text-center relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(242,125,38,0.1)_0%,transparent_70%)]" />
                </div>
                
                <FadeUp className="max-w-4xl mx-auto space-y-12 relative z-10">
                    <h2 className="text-5xl md:text-8xl font-serif font-black italic tracking-tighter leading-[0.85] uppercase">
                        Ready to Build <br /> With <span className="text-accent italic">Ention?</span>
                    </h2>
                    <p className="font-mono text-xs uppercase tracking-[0.4em] opacity-40 max-w-2xl mx-auto leading-relaxed">Join a network of educational institutions, startups, and enterprises building India's native computing ecosystem.</p>
                    <div className="pt-8">
                        <Link href="/support" className="bg-bg text-ink px-14 py-6 text-xs font-bold uppercase tracking-[0.4em] hover:bg-accent hover:text-bg transition-all rounded-sm shadow-2xl flex items-center justify-center gap-4 w-max mx-auto group">
                            Start a Conversation <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </FadeUp>
            </section>

        </main>
    );
}
