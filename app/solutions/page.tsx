"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Code2, GraduationCap, Rocket, Building2,
    ArrowRight, Settings2, Network, CheckCircle2, HelpCircle, ShieldCheck
} from "lucide-react";
import FormModal from "@/components/FormModal";
import LeadSalesForm from "@/components/forms/LeadSalesForm";
import ProgramApplicationForm from "@/components/forms/ProgramApplicationForm";

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

export default function SolutionsPage() {
    const [activeForm, setActiveForm] = React.useState<"LEAD" | "PROGRAM" | null>(null);
    const [programName, setProgramName] = React.useState("");

    const openProgramForm = (name: string) => {
        setProgramName(name);
        setActiveForm("PROGRAM");
    };

    return (
        <main className="min-h-screen bg-bg text-ink overflow-x-hidden selection:bg-accent selection:text-bg">
            <FormModal isOpen={activeForm !== null} onClose={() => setActiveForm(null)}>
                {activeForm === "LEAD" && <LeadSalesForm source="Solutions Page Inquiry" onSuccess={() => setActiveForm(null)} />}
                {activeForm === "PROGRAM" && <ProgramApplicationForm programName={programName} onSuccess={() => setActiveForm(null)} />}
            </FormModal>


            {/* ── 1. HERO [INK] ─────────────────────────────────────────── */}
            <section className="relative min-h-screen bg-black text-bg flex flex-col items-center justify-center px-8 md:px-16 pt-32 pb-24 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/solutions/eco.png"
                        alt="Ecosystem Background"
                        className="w-full h-full object-cover opacity-100 scale-105 transition-opacity duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>

                {/* Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] whitespace-nowrap z-0">
                    <span className="text-[20vw] font-serif font-black italic uppercase tracking-widest leading-none">
                        SOLUTIONS
                    </span>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto w-full space-y-12 flex flex-col items-center text-center">
                    <FadeUp>
                        <span className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] font-bold block mb-4">Ention Enterprise Division</span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black italic tracking-tighter leading-[0.85] uppercase">
                            Built for <br />
                            <span className="text-accent not-italic">Every Stage.</span>
                        </h1>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] opacity-50 max-w-2xl leading-relaxed italic">
                            From individual users to institutions and enterprises — Ention provides tailored computing solutions that scale with your needs.
                        </p>
                    </FadeUp>

                    <FadeUp delay={0.4} className="flex flex-col sm:flex-row gap-8 items-center pt-8">
                        <button onClick={() => setActiveForm("LEAD")} className="bg-accent text-bg px-12 py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-ink transition-all rounded-sm shadow-2xl flex items-center gap-4">
                            Find Your Solution <ArrowRight size={16} />
                        </button>
                        <button onClick={() => setActiveForm("LEAD")} className="bg-transparent text-bg border border-white/20 px-12 py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-ink transition-all rounded-sm flex items-center gap-4">
                            Talk to Our Team
                        </button>
                    </FadeUp>
                </div>
            </section>

            {/* ── 2. DEVELOPERS [BG] ───────────────────────────────────── */}
            <section id="audiences" className="py-40 px-8 md:px-16 bg-bg text-ink border-t border-ink/5 overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <FadeUp>
                        <SectionHeader num="01" title="For Developers & Pros" subtitle="Technical Infrastructure" />
                    </FadeUp>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mt-20 items-center">
                        <FadeUp delay={0.1} className="space-y-12 order-2 lg:order-1">
                            <div className="space-y-6">
                                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-4 block">Tagline</span>
                                <h3 className="text-4xl md:text-6xl font-serif italic font-black leading-[1.1] uppercase tracking-tighter">
                                    Build, Test, and <br /> Scale Without <br /> Limitations.
                                </h3>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                                {[
                                    "High-performance laptops for coding & development",
                                    "Linux-compatible systems",
                                    "Expandable RAM & storage",
                                    "Optimized for virtualization & testing"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 font-mono text-[9px] uppercase tracking-widest opacity-50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex gap-8 items-center pt-8 border-t border-ink/5">
                                <Link href="/products" className="bg-ink text-bg px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-accent transition-all flex items-center gap-4">
                                    Explore Dev Solutions <ArrowRight size={14} />
                                </Link>
                                <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">Ideal for: Engineers, Freelancers</span>
                            </div>
                        </FadeUp>
                        <FadeUp delay={0.2} className="relative aspect-square lg:order-2">
                            <div className="absolute inset-0 bg-ink/5 p-4">
                                <div className="w-full h-full border border-ink/10 flex items-center justify-center relative overflow-hidden group">
                                    <Code2 size={120} strokeWidth={0.5} className="text-ink/10 group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* ── 3. EDUCATION [INK] ───────────────────────────────────── */}
            <section className="py-40 px-8 md:px-16 bg-ink text-bg border-t border-white/5 overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <FadeUp>
                        <SectionHeader num="02" title="For Students & Institutions" subtitle="Academic Enablement" />
                    </FadeUp>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mt-20 items-center">
                        <FadeUp delay={0.2} className="relative aspect-square order-2 lg:order-1">
                            <div className="absolute inset-0 bg-white/5 p-4">
                                <div className="w-full h-full border border-white/10 flex items-center justify-center relative overflow-hidden group">
                                    <GraduationCap size={120} strokeWidth={0.5} className="text-white/10 group-hover:scale-110 transition-transform duration-1000" />
                                </div>
                            </div>
                        </FadeUp>

                        <FadeUp delay={0.1} className="space-y-12 order-1 lg:order-2">
                            <div className="space-y-6">
                                <span className="text-accent font-mono text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Tagline</span>
                                <h3 className="text-4xl md:text-6xl font-serif italic font-black leading-[1.1] uppercase tracking-tighter">
                                    Enable Modern <br /> Learning with <br /> Scalable Tech.
                                </h3>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                                {[
                                    "Affordable performance laptops",
                                    "Smart device management",
                                    "Institutional branding options",
                                    "Lab-ready configurations"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 font-mono text-[9px] uppercase tracking-widest opacity-50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-white/10">
                                <Link href="/products" className="bg-bg text-ink px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-accent hover:text-bg transition-all flex items-center justify-center gap-4">
                                    View Models
                                </Link>
                                <button onClick={() => openProgramForm("Innovation Labs")} className="bg-transparent text-bg border border-white/20 px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-accent hover:border-accent transition-all flex items-center justify-center gap-4">
                                    Build Your Lab
                                </button>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* ── 4. STARTUPS [BG] ─────────────────────────────────────── */}
            <section className="py-40 px-8 md:px-16 bg-bg text-ink border-t border-ink/5 overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <FadeUp>
                        <SectionHeader num="03" title="For Startups & MSMEs" subtitle="Ecosystem Partner" />
                    </FadeUp>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mt-20 items-center">
                        <FadeUp delay={0.1} className="space-y-12 order-2 lg:order-1">
                            <div className="space-y-6">
                                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-4 block">Tagline</span>
                                <h3 className="text-4xl md:text-6xl font-serif italic font-black leading-[1.1] uppercase tracking-tighter">
                                    Scale Faster <br /> with Flexible <br /> Infrastructure.
                                </h3>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                                {[
                                    "Cost-efficient device access",
                                    "Leasing & financing options",
                                    "Scalable deployment",
                                    "Startup-friendly pricing"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 font-mono text-[9px] uppercase tracking-widest opacity-50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-8 border-t border-ink/5">
                                <Link href="/collaborate/startup-ecosystem" className="bg-ink text-bg px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-accent transition-all flex items-center justify-center lg:w-max gap-4">
                                    Enable Your Ecosystem <ArrowRight size={14} />
                                </Link>
                            </div>
                        </FadeUp>
                        <FadeUp delay={0.2} className="relative aspect-square lg:order-2">
                            <div className="absolute inset-0 bg-ink/5 p-4">
                                <div className="w-full h-full border border-ink/10 flex items-center justify-center relative overflow-hidden group">
                                    <Rocket size={120} strokeWidth={0.5} className="text-ink/10 group-hover:rotate-12 transition-all duration-[2s]" />
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* ── 5. ENTERPRISE [INK] ──────────────────────────────────── */}
            <section className="py-40 px-8 md:px-16 bg-ink text-bg border-t border-white/5 overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <FadeUp>
                        <SectionHeader num="04" title="For Enterprises" subtitle="Organizational Infra" />
                    </FadeUp>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mt-20 items-center">
                        <FadeUp delay={0.2} className="relative aspect-square order-2 lg:order-1">
                            <div className="absolute inset-0 bg-white/5 p-4">
                                <div className="w-full h-full border border-white/10 flex items-center justify-center relative overflow-hidden group">
                                    <Building2 size={120} strokeWidth={0.5} className="text-white/10 group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                            </div>
                        </FadeUp>

                        <FadeUp delay={0.1} className="space-y-12 order-1 lg:order-2">
                            <div className="space-y-6">
                                <span className="text-accent font-mono text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Tagline</span>
                                <h3 className="text-4xl md:text-6xl font-serif italic font-black leading-[1.1] uppercase tracking-tighter">
                                    Reliable Infra <br /> for Your <br /> Growing Team.
                                </h3>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                                {[
                                    "Experience program: try before buy",
                                    "Bulk device deployment",
                                    "Custom hardware configurations",
                                    "IT support & lifecycle management",
                                    "AMC & service support"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 font-mono text-[9px] uppercase tracking-widest opacity-50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-8 border-t border-white/10">
                                <button onClick={() => setActiveForm("LEAD")} className="bg-bg text-ink px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-accent hover:text-bg transition-all flex items-center justify-center lg:w-max gap-4">
                                    Request Enterprise Solution <ArrowRight size={14} />
                                </button>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* ── 6. CUSTOM SOLUTIONS [BG] ─────────────────────────────── */}
            <section id="custom-solutions" className="py-40 px-8 md:px-16 bg-bg text-ink border-t border-ink/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[linear-gradient(45deg,transparent_25%,rgba(242,125,38,0.03)_50%,transparent_75%)] pointer-events-none" />

                <div className="max-w-[1400px] mx-auto">
                    <FadeUp>
                        <SectionHeader num="05" title="Custom Solutions" subtitle="Build Your Own" />
                    </FadeUp>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mt-20">
                        <FadeUp delay={0.1} className="space-y-12">
                            <h2 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter leading-none uppercase">Need Something <br /> <span className="text-accent">Custom?</span></h2>
                            <p className="font-mono text-xs uppercase tracking-[0.4em] opacity-40 leading-relaxed max-w-lg">Every organization is different. We provide flexible, customizable computing solutions tailored to your exact requirements.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/5 border border-ink/5 mt-12">
                                {["Hardware configurations", "Operating system (Win/Linux)", "Branding & white-label", "Deployment scale & support"].map((item, i) => (
                                    <div key={i} className="p-8 bg-white space-y-4">
                                        <Settings2 size={16} className="text-accent" />
                                        <p className="font-mono text-[9px] font-black uppercase tracking-widest leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeUp>

                        <FadeUp delay={0.2} className="bg-ink p-1 shadow-sm relative">
                            <LeadSalesForm source="Solutions: Custom Request" />
                        </FadeUp>
                    </div>
                </div>
            </section>

        </main>
    );
}
