"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search, AlertTriangle } from "lucide-react";
import { LetterAnimation } from "@/components/LetterAnimation";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-ink text-bg flex flex-col items-center justify-center px-8 relative overflow-hidden">
            {/* Background Glitch Effect */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] whitespace-nowrap z-0">
                <span className="text-[40vw] font-serif font-black italic uppercase leading-none">
                    404
                </span>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-12 max-w-2xl">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-24 h-24 border border-accent/30 rounded-full flex items-center justify-center mb-8"
                >
                    <AlertTriangle size={40} className="text-accent animate-pulse" />
                </motion.div>

                <div className="space-y-4">
                    <span className="font-mono text-[10px] text-accent uppercase tracking-[1em] font-bold block">
                        System Boundary Exceeded
                    </span>
                    <h1 className="text-6xl md:text-9xl font-serif font-black italic tracking-tighter leading-none uppercase">
                        <LetterAnimation text="Lost in" type="reveal" delay={0.2} />
                        <br />
                        <span className="text-accent">
                            <LetterAnimation text="Transition." type="reveal" delay={0.6} />
                        </span>
                    </h1>
                </div>

                <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] opacity-40 leading-relaxed max-w-lg italic">
                    The coordinate you are looking for has been moved, archived, or never existed in the current ecosystem.
                </p>

                <div className="flex flex-col sm:flex-row gap-8 items-center pt-8">
                    <Link href="/" className="bg-accent text-bg px-14 py-6 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-ink transition-all rounded-sm flex items-center gap-4 shadow-2xl group">
                        <Home size={16} /> Return to Core
                    </Link>
                    <Link href="/support" className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] font-bold hover:text-accent transition-colors border-b border-white/20 hover:border-accent pb-1 flex items-center gap-3 group">
                        <Search size={14} className="group-hover:rotate-12 transition-transform" /> Search Support
                    </Link>
                </div>
            </div>

            {/* Bottom Status bar */}
            <div className="absolute bottom-12 w-full px-12 flex flex-col md:flex-row justify-between items-center opacity-20 font-mono text-[8px] uppercase tracking-[0.5em] gap-4">
                <span>Error Code: 0x404_VOID_ACCESS</span>
                <span>ENTION Industrial OS v3.1_DEV_BUILD</span>
            </div>
        </main>
    );
}
