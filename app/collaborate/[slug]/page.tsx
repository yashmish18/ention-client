"use client";

import React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { CheckCircle2, ArrowRight, Users, Package, TrendingUp, ArrowLeft, Network, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import { PROGRAMS, getProgramBySlug } from "@/lib/programs-data";

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

export default function ProgramDetailPage() {
    const params = useParams();
    const slug = typeof params.slug === 'string' ? params.slug : '';
    const program = getProgramBySlug(slug);

    if (!program) notFound();

    return (
        <main className="bg-bg text-ink min-h-screen selection:bg-accent selection:text-bg">

            {/* ── 1. HERO [INK] ─────────────────────────────────────────── */}
            <section className="relative min-h-[80vh] bg-ink text-bg flex flex-col justify-end px-8 md:px-16 pb-24 pt-40 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
                    <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-serif font-black italic opacity-[0.02] select-none pointer-events-none whitespace-nowrap z-0">
                    {program.emoji}
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto w-full space-y-12">
                    <Link href="/collaborate" className="inline-flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-accent hover:text-white transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Programs
                    </Link>
                    
                    <FadeUp className="space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="text-accent font-mono text-[10px] uppercase tracking-[0.5em] font-black">{program.badge}</span>
                            <div className="h-[1px] w-12 bg-accent/40" />
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black italic tracking-tighter leading-[0.85] max-w-5xl uppercase">
                            {program.hero}
                        </h1>
                        <p className="text-xl md:text-2xl font-serif italic text-white/50 leading-relaxed max-w-3xl">
                            {program.heroSub}
                        </p>
                    </FadeUp>

                    <FadeUp delay={0.4} className="pt-8">
                        <Link
                            href="/support"
                            className="bg-accent text-bg px-14 py-6 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-ink transition-all rounded-sm flex items-center gap-4 w-max shadow-2xl"
                        >
                            {program.ctaLabel} <ArrowRight size={18} />
                        </Link>
                    </FadeUp>
                </div>
            </section>

            {/* ── 2. AUDIENCE [BG] ─────────────────────────────────────── */}
            <section className="py-40 px-8 md:px-16 bg-bg text-ink border-b border-ink/5">
                <div className="max-w-[1400px] mx-auto">
                    <FadeUp>
                        <SectionHeader num="01" title="Strategic Alignment" subtitle="Who this is for" />
                    </FadeUp>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mt-20 items-center">
                        <FadeUp delay={0.1} className="space-y-12">
                            <h2 className="text-5xl md:text-7xl font-serif italic font-black uppercase tracking-tighter leading-none">Built for <br/><span className="text-accent">Leaders</span> like you.</h2>
                            <p className="font-mono text-xs uppercase tracking-[0.4em] opacity-40 leading-relaxed max-w-lg">We target high-impact stakeholders who are ready to transform their regional computing landscape.</p>
                        </FadeUp>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/10 border border-ink/5">
                            {program.for.map((f, i) => (
                                <FadeUp key={i} delay={i * 0.1} className="bg-white p-10 flex gap-6 items-start hover:bg-ink hover:text-bg transition-colors duration-500 group">
                                    <Users size={18} className="text-accent shrink-0 mt-1" />
                                    <span className="font-serif italic text-lg opacity-80 leading-snug">{f}</span>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. DELIVERABLES [INK] ────────────────────────────────── */}
            <section className="py-40 px-8 md:px-16 bg-ink text-bg border-b border-white/5 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-32 opacity-[0.05] pointer-events-none">
                     <Package size={400} strokeWidth={0.5} />
                </div>

                <div className="max-w-[1400px] mx-auto relative z-10">
                    <FadeUp>
                        <SectionHeader num="02" title="The Delivery" subtitle="What you get" />
                    </FadeUp>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mt-20">
                        <div className="lg:col-span-4 space-y-12">
                            <FadeUp className="space-y-6">
                                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Program Overview</span>
                                <p className="text-2xl font-serif italic text-white/60 leading-relaxed">{program.overview}</p>
                            </FadeUp>
                            
                            <FadeUp delay={0.2} className="space-y-6 border-t border-white/10 pt-12">
                                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-bold">In Numbers</span>
                                <div className="space-y-8">
                                    {program.outcomes.map((o, i) => (
                                        <div key={i} className="flex gap-6 items-center">
                                            <TrendingUp size={20} className="text-accent shrink-0" />
                                            <span className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40">{o}</span>
                                        </div>
                                    ))}
                                </div>
                            </FadeUp>
                        </div>

                        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {program.deliverables.map((d, i) => (
                                <FadeUp key={i} delay={i * 0.1} className="bg-white/5 border border-white/10 p-12 flex flex-col justify-between hover:bg-white/10 transition-colors group">
                                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center font-mono text-xs opacity-40 group-hover:bg-accent group-hover:text-bg group-hover:opacity-100 transition-all duration-500">
                                        0{i + 1}
                                    </div>
                                    <p className="font-serif italic text-2xl mt-12 opacity-80 leading-snug">{d}</p>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. BENEFITS [BG] ─────────────────────────────────────── */}
            <section className="py-40 px-8 md:px-16 bg-bg text-ink border-b border-ink/5">
                <div className="max-w-[1400px] mx-auto">
                    <FadeUp>
                        <SectionHeader num="03" title="Strategic Value" subtitle="Key Benefits" />
                    </FadeUp>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20">
                        <div className="space-y-4">
                            {program.benefits.map((b, i) => (
                                <FadeUp key={i} delay={i * 0.1} className="p-10 border border-ink/5 bg-white flex gap-8 items-center hover:border-accent/40 shadow-sm transition-all group">
                                     <div className="w-12 h-12 bg-bg flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                                        <ShieldCheck size={20} className="text-ink group-hover:text-bg" />
                                     </div>
                                     <span className="font-serif italic text-2xl font-black uppercase tracking-tighter opacity-80">{b}</span>
                                </FadeUp>
                            ))}
                        </div>

                        <div className="bg-ink text-bg p-16 flex flex-col justify-between h-full group relative overflow-hidden">
                            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="space-y-12 relative z-10">
                                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Commercial Model</span>
                                <ul className="space-y-6">
                                    {program.commercialModel.map((m, i) => (
                                        <li key={i} className="flex flex-col gap-2">
                                            <span className="font-mono text-[8px] uppercase tracking-widest opacity-30">Option 0{i+1}</span>
                                            <span className="font-serif italic text-3xl font-black uppercase tracking-tighter opacity-90">{m}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="pt-24 relative z-10">
                                <Zap size={40} className="text-accent animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. FINAL ACTION [INK] ────────────────────────────────── */}
            <section className="py-40 px-8 md:px-16 bg-ink text-bg text-center border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                    <div className="w-full h-full bg-[size:100px_100px] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]" />
                </div>
                
                <FadeUp className="max-w-4xl mx-auto space-y-12 relative z-10">
                    <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-black">{program.cta}</span>
                    <h2 className="text-5xl md:text-8xl font-serif font-black italic tracking-tighter leading-[0.85] uppercase">
                        Let's redefine <br /> the <span className="text-accent">future.</span>
                    </h2>
                    <div className="pt-8">
                        <Link href="/support" className="bg-accent text-bg px-14 py-6 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-ink transition-all rounded-sm shadow-2xl flex items-center justify-center gap-4 w-max mx-auto group">
                            {program.ctaLabel} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </FadeUp>
            </section>

        </main>
    );
}
