"use client";

import React from "react";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import { MessageSquare, Mail, Phone, MapPin } from "lucide-react";

export default function SupportPage() {
    return (
        <main className="min-h-screen bg-bg text-ink pt-32 pb-24 px-8 md:px-12">
            <BlurFadeIn delay={0.2}>
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="space-y-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Help Center</span>
                        <h1 className="text-6xl md:text-8xl font-serif font-black uppercase tracking-tighter italic">
                            Support
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <p className="text-lg font-serif italic opacity-70 leading-relaxed">
                                Our white-glove support team is available 24/7 to ensure your Ention machine performs at its absolute peak.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: MessageSquare, label: "Live Chat", val: "Available 24/7" },
                                    { icon: Mail, label: "Email", val: "support@ention.in" },
                                    { icon: Phone, label: "Concierge", val: "1-800-ENTION-PRO" },
                                    { icon: MapPin, label: "Service Hubs", val: "Delhi, Mumbai, Bengaluru" },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-center group">
                                        <div className="w-10 h-10 rounded-sm bg-ink/5 flex items-center justify-center group-hover:bg-accent group-hover:text-bg transition-all">
                                            <item.icon size={18} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="font-mono text-[9px] uppercase tracking-widest opacity-40">{item.label}</p>
                                            <p className="font-mono text-sm font-bold">{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white border border-ink/5 p-12 rounded-sm shadow-sm space-y-8">
                            <h3 className="text-2xl font-serif font-bold italic">Open a Ticket</h3>
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block font-mono text-[9px] uppercase tracking-widest opacity-40 font-bold">Serial Number</label>
                                    <input type="text" className="w-full bg-ink/5 border border-ink/10 px-6 py-4 font-mono text-xs uppercase tracking-widest focus:outline-none focus:border-accent transition-colors" placeholder="ENT-XXXXX-XXXX" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block font-mono text-[9px] uppercase tracking-widest opacity-40 font-bold">Issue Description</label>
                                    <textarea className="w-full bg-ink/5 border border-ink/10 px-6 py-4 font-mono text-xs focus:outline-none focus:border-accent transition-colors min-h-[150px]" placeholder="How can we assist you today?" />
                                </div>
                                <button className="w-full bg-ink text-bg py-5 font-mono text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-accent transition-all shadow-xl">
                                    Initialize Support Request
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </BlurFadeIn>
        </main>
    );
}
