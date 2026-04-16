"use client";

import React from "react";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import { Zap, Users, Globe, Briefcase } from "lucide-react";

export default function CollaboratePage() {
    return (
        <main className="min-h-screen bg-bg text-ink pt-32 pb-24 px-8 md:px-12">
            <BlurFadeIn delay={0.2}>
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="space-y-4 text-center">
                        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Innovation Network</span>
                        <h1 className="text-6xl md:text-8xl font-serif font-black uppercase tracking-tighter italic">
                            Collaborate
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[
                            {
                                icon: Zap,
                                title: "Technology Partners",
                                desc: "Integrate your hardware or software solutions with the Ention ecosystem.",
                                action: "Apply for Partnership"
                            },
                            {
                                icon: Users,
                                title: "Creator Collective",
                                desc: "Join our network of elite creators and test our pre-release hardware.",
                                action: "Join Collective"
                            },
                            {
                                icon: Globe,
                                title: "Regional Units",
                                desc: "Become an authorized Ention experience center in your territory.",
                                action: "Global Expansion"
                            },
                            {
                                icon: Briefcase,
                                title: "Enterprise Solutions",
                                desc: "Custom hardware builds for industrial and governmental organizations.",
                                action: "Corporate Inquiry"
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-ink/5 p-12 rounded-sm shadow-sm group hover:border-accent/30 transition-all duration-500">
                                <div className="w-12 h-12 rounded-sm bg-ink/5 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-bg transition-all">
                                    <item.icon size={24} strokeWidth={1} />
                                </div>
                                <h3 className="text-2xl font-serif font-bold italic mb-6">{item.title}</h3>
                                <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 leading-relaxed mb-12">
                                    {item.desc}
                                </p>
                                <button className="w-full border border-ink/10 py-5 font-mono text-[9px] uppercase font-bold tracking-[0.4em] hover:bg-ink hover:text-bg transition-all">
                                    {item.action}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-ink/10 pt-16 text-center space-y-8">
                        <h2 className="text-4xl font-serif font-black uppercase italic">Built in Bharat, <br />Available Globally.</h2>
                        <div className="flex justify-center gap-12 font-mono text-[9px] uppercase tracking-[0.5em] opacity-30 font-bold">
                            <span>01 / DESIGN</span>
                            <span>02 / R&D</span>
                            <span>03 / MANUFACTURING</span>
                        </div>
                    </div>
                </div>
            </BlurFadeIn>
        </main>
    );
}
