"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    MessageSquare, Mail, Phone, MapPin, ArrowRight,
    Search, Download, Book, ShieldCheck, CheckCircle2, ChevronDown, Wrench, Package, Monitor, Cpu
} from "lucide-react";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import { createSupportTicket } from "@/lib/api";
import SmartSupportForm from "@/components/forms/SmartSupportForm";

const FAQS = [
    { q: "What is the warranty on Ention devices?", a: "All Ention devices come with an 18-month standard warranty. Warranty extension options are also available at the time of purchase." },
    { q: "How long does delivery take?", a: "Standard delivery across India takes 5–7 business days. Express delivery options are available at checkout." },
    { q: "Are custom configurations supported?", a: "Yes. All Ention Workbook and Swapbook models support custom CPU, RAM, and storage configurations. Select your specs directly on the product page." },
    { q: "Do you offer No-Cost EMI?", a: "Yes — No-Cost EMI schemes are available on select products. Options are shown at checkout based on your bank." },
    { q: "Can I get bulk pricing for labs or institutions?", a: "Absolutely. Reach out via the form below or email contact@ention.in with your requirements for institutional pricing." },
    { q: "Is Linux supported on Ention devices?", a: "All Ention devices ship with Windows 11. Linux compatibility is supported on Workbook E4 and Swapbook S1 models." },
];

function FAQItem({ faq }: { faq: typeof FAQS[0] }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-white/10 last:border-none">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center py-6 text-left group"
            >
                <span className="font-serif italic text-lg font-bold group-hover:text-[#F27D26] transition-colors">{faq.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-white/30 transition-transform ${open ? "rotate-180 text-[#F27D26]" : ""}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="font-mono text-[11px] leading-relaxed opacity-50 pb-6 pr-8 uppercase tracking-widest">{faq.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function SupportPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [subject, setSubject] = useState("technical");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const data = new FormData(e.currentTarget);

        try {
            const desc = data.get("description") as string;
            const sn = data.get("serialNumber") as string;
            await createSupportTicket({
                subject: `Technical Support Request: ${subject.toUpperCase()}`,
                description: sn ? `[Serial: ${sn}] ${desc}` : desc,
                category: subject,
                priority: 'MEDIUM'
            });
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-ink text-bg overflow-x-hidden">
            
            {/* ── SEARCH HERO ────────────────────────────────────────────── */}
            <section className="relative pt-40 pb-20 px-8 md:px-16 border-b border-white/10 bg-ink overflow-hidden flex flex-col items-center justify-center text-center space-y-12">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>
                
                <BlurFadeIn delay={0.1} className="relative z-10 w-full max-w-4xl space-y-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#F27D26] font-black">Ention Support Hub</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter leading-tight">
                        How can we help you?
                    </h1>
                    
                    <div className="relative max-w-2xl mx-auto shadow-2xl">
                        <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40" />
                        <input 
                            type="text" 
                            placeholder="Search for models, drivers, or articles..." 
                            className="w-full bg-white/5 border border-white/20 pl-16 pr-8 py-6 rounded-sm font-mono text-sm uppercase tracking-widest focus:outline-none focus:border-[#F27D26] focus:bg-white/10 transition-all text-white placeholder-white/30"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#F27D26] text-white px-6 py-3 font-mono text-[9px] uppercase font-bold tracking-widest rounded-sm hover:bg-[#d9631a] transition-colors">
                            Search
                        </button>
                    </div>
                </BlurFadeIn>
            </section>

            {/* ── QUICK ACTIONS GRID ───────────────────────────────────── */}
            <section className="px-8 md:px-16 -mt-10 relative z-20">
                <div className="max-w-[90rem] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: Download, title: "Drivers & Downloads", desc: "Get latest firmware", href: "#" },
                        { icon: Book, title: "Manuals & Docs", desc: "User guides & specs", href: "#" },
                        { icon: ShieldCheck, title: "Warranty Status", desc: "Check Ention Care", href: "#" },
                        { icon: Wrench, title: "Repair & Service", desc: "Log a service request", href: "#" }
                    ].map((item, i) => (
                        <Link href={item.href} key={i} className="bg-[#1C1C1C] border border-white/10 p-8 rounded-sm hover:-translate-y-2 hover:border-[#F27D26]/50 hover:shadow-2xl transition-all group flex flex-col items-center text-center space-y-4">
                            <div className="w-12 h-12 bg-white/5 group-hover:bg-[#F27D26]/10 rounded-full flex items-center justify-center transition-colors">
                                <item.icon size={20} className="text-white/60 group-hover:text-[#F27D26]" />
                            </div>
                            <div>
                                <h3 className="font-serif font-bold italic text-white/90 text-lg">{item.title}</h3>
                                <p className="font-mono text-[9px] uppercase tracking-widest text-white/40 mt-2">{item.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── PRODUCT CATEGORIES ───────────────────────────────────── */}
            <BlurFadeIn delay={0.2}>
                <section className="py-24 px-8 md:px-16">
                    <div className="max-w-[90rem] mx-auto space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-serif font-black italic tracking-tighter">Browse by Category</h2>
                            <div className="w-16 h-[1px] bg-[#F27D26] mx-auto" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Workbook Series", icon: Monitor, tag: "Laptops & Notebooks" },
                                { title: "Swapbook Series", icon: Cpu, tag: "High-End Systems" },
                                { title: "Ecosystem Accessories", icon: Package, tag: "Peripherals" },
                            ].map((cat, i) => (
                                <div key={i} className="bg-[#141414] text-white p-10 flex flex-col justify-between min-h-[250px] group cursor-pointer hover:border-[#F27D26]/50 transition-all border border-white/10 rounded-sm">
                                    <div className="space-y-4">
                                        <cat.icon size={32} className="text-[#F27D26]" strokeWidth={1.5} />
                                        <p className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold">{cat.tag}</p>
                                        <h3 className="text-2xl font-serif font-black italic">{cat.title}</h3>
                                    </div>
                                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#F27D26] flex items-center gap-2 mt-8">
                                        View Support <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </BlurFadeIn>

            {/* ── TICKET SYSTEM & FAQS ─────────────────────────────────── */}
            <BlurFadeIn delay={0.3}>
                <section className="py-24 px-8 md:px-16 border-t border-white/10 bg-[#141414]">
                    <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Left: FAQs */}
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#F27D26] font-bold">Knowledge Base</span>
                                <h2 className="text-4xl font-serif font-black italic tracking-tighter leading-none">Frequently Asked.</h2>
                            </div>
                            <div className="space-y-0 divide-y divide-white/10 border-t border-white/10">
                                {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} />)}
                            </div>
                        </div>

                        {/* Right: Support Ticket Form */}
                        <div className="bg-[#1C1C1C] border border-white/10 rounded-sm p-1 shadow-sm relative overflow-hidden">
                            <SmartSupportForm initialCategory="General Inquiry" source="support_page" />
                        </div>
                    </div>
                </section>
            </BlurFadeIn>

            {/* ── CONTACT METHODS ──────────────────────────────────────── */}
            <section className="py-20 px-8 md:px-16 border-t border-white/10 bg-[#141414]">
                <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="space-y-2 max-w-xl">
                        <h2 className="text-3xl font-serif font-black italic">Need immediate assistance?</h2>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">Our engineers are available Monday to Saturday, 9 AM to 7 PM IST.</p>
                    </div>
                    <div className="flex flex-wrap gap-8">
                        <a href="mailto:contact@ention.in" className="flex items-center gap-4 group">
                            <Mail size={24} className="text-white/40 group-hover:text-[#F27D26] transition-colors" />
                            <div className="space-y-1">
                                <p className="font-mono text-[8px] uppercase tracking-[0.3em] opacity-40">Email Us</p>
                                <p className="font-mono text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">contact@ention.in</p>
                            </div>
                        </a>
                        <a href="tel:+910000000000" className="flex items-center gap-4 group">
                            <Phone size={24} className="text-white/40 group-hover:text-[#F27D26] transition-colors" />
                            <div className="space-y-1">
                                <p className="font-mono text-[8px] uppercase tracking-[0.3em] opacity-40">Call Support</p>
                                <p className="font-mono text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">+91 00000 00000</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
