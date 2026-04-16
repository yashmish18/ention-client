"use client";

import React from "react";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import { Package, Truck, CheckCircle2, Clock, Search } from "lucide-react";

export default function OrdersPage() {
    return (
        <main className="min-h-screen bg-bg text-ink pt-32 pb-24 px-8 md:px-12">
            <BlurFadeIn delay={0.2}>
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="space-y-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Logistics Division</span>
                        <h1 className="text-6xl md:text-8xl font-serif font-black uppercase tracking-tighter italic">
                            Track Order
                        </h1>
                    </div>

                    <div className="bg-white border border-ink/5 p-12 rounded-sm shadow-sm space-y-12">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif font-bold italic text-ink">Identify your shipment</h3>
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-ink/20" size={20} />
                                <input
                                    type="text"
                                    className="w-full bg-ink/5 border border-ink/10 pl-16 pr-6 py-6 font-mono text-sm uppercase tracking-[0.3em] font-bold focus:outline-none focus:border-accent transition-all"
                                    placeholder="ENTION-ORD-XXXXXX"
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-ink text-bg px-8 py-3 font-mono text-[9px] uppercase font-bold tracking-widest hover:bg-accent transition-all">
                                    Locate
                                </button>
                            </div>
                        </div>

                        <div className="border-t border-ink/10 pt-12 space-y-12">
                            <div className="flex flex-col md:flex-row justify-between gap-12">
                                <div className="space-y-4">
                                    <span className="block font-mono text-[9px] uppercase tracking-widest opacity-40 font-bold">Recent History</span>
                                    <div className="space-y-6 font-mono">
                                        {[
                                            { status: "Processing", date: "June 24, 2026", done: true },
                                            { status: "Assembly", date: "June 25, 2026", done: true },
                                            { status: "In Transit", date: "Expected June 28", done: false },
                                        ].map((step, i) => (
                                            <div key={i} className="flex gap-4 items-center">
                                                <div className={`w-2 h-2 rounded-full ${step.done ? "bg-accent" : "bg-ink/10"}`} />
                                                <span className={`text-[10px] uppercase tracking-widest ${step.done ? "font-bold" : "opacity-30"}`}>
                                                    {step.status} // <span className="font-normal opacity-50">{step.date}</span>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 md:text-right">
                                    <span className="block font-mono text-[9px] uppercase tracking-widest opacity-40 font-bold">System Status</span>
                                    <div className="flex items-center gap-4 md:justify-end">
                                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                                        <span className="font-serif italic text-2xl font-bold">Shipment Active</span>
                                    </div>
                                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-40">Your Eniton Elite is currently in <br />final quality assurance.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 border border-ink/10 rounded-sm space-y-4">
                            <Truck size={24} strokeWidth={1} className="text-accent" />
                            <h4 className="font-serif font-bold italic">Global Shipping</h4>
                            <p className="font-mono text-[9px] uppercase tracking-widest opacity-40 leading-relaxed">
                                We utilize private architectural logistics to ensure every Ention machine arrives in pristine condition.
                            </p>
                        </div>
                        <div className="p-8 border border-ink/10 rounded-sm space-y-4">
                            <Clock size={24} strokeWidth={1} className="text-accent" />
                            <h4 className="font-serif font-bold italic">Real-time Telemetry</h4>
                            <p className="font-mono text-[9px] uppercase tracking-widest opacity-40 leading-relaxed">
                                Integrated hardware tracking provides precise location data from our manufacturing unit to your desk.
                            </p>
                        </div>
                    </div>
                </div>
            </BlurFadeIn>
        </main>
    );
}
