"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Laptop, Mail, Lock, ChevronRight } from "lucide-react";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AuthFormProps {
    initialMode?: "login" | "signup";
}

export const AuthForm = ({ initialMode = "login" }: AuthFormProps) => {
    const [mode, setMode] = useState<"login" | "signup">(initialMode);

    return (
        <main className="min-h-screen bg-bg flex items-center justify-center px-4 md:px-8 py-16 selection:bg-accent selection:text-white relative overflow-hidden">

            {/* Cinematic Background Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#E4E3E0]" /> {/* Base Warm Gray */}
                {/* Subtle Industrial Overlay */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                    <div className="w-full h-full bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>
                {/* Faint Background Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03]">
                    <h2 className="text-[25vw] font-serif font-black text-ink uppercase tracking-tighter italic">Ention</h2>
                </div>
                {/* Depth gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-ink/5" />
            </div>

            <BlurFadeIn delay={0.2} className="w-full max-w-5xl z-10">
                <div className="bg-white border border-ink/10 shadow-[0_50px_100px_-30px_rgba(20,20,20,0.1)] grid grid-cols-1 lg:grid-cols-2 rounded-sm overflow-hidden min-h-[650px]">

                    {/* Left Column: Narrative Showcase */}
                    <div className="bg-ink p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
                        <div className="z-10">
                            {/* Better Greeting instead of Top-Left Badge */}
                            <div className="mb-16">
                                <span className="font-mono text-[9px] font-bold tracking-[0.5em] uppercase text-accent">
                                    Welcome to the Future of Bharat
                                </span>
                                <div className="h-[1px] w-12 bg-accent mt-4 opacity-50" />
                            </div>

                            <div className="space-y-6">
                                <h1 className="text-5xl md:text-7xl font-serif font-black text-white uppercase leading-[0.85] tracking-tighter">
                                    Ention <br />
                                    <span className="italic font-normal text-accent block mt-2 text-4xl md:text-6xl">Account</span>
                                </h1>
                                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40 max-w-sm leading-relaxed mt-8">
                                    Access your dashboard, track orders, and manage your custom laptop configurations with ease.
                                </p>
                            </div>
                        </div>

                        {/* Cinematic Background Image */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200"
                                alt="Professional Workspace"
                                fill
                                className="object-cover opacity-30 filter grayscale mix-blend-luminosity"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                        </div>

                        <div className="z-10 pt-12">
                            <div className="space-y-8">
                                {[
                                    { title: "Bespoke", desc: "Hardware tailored to your needs." },
                                    { title: "Direct Support", desc: "Immediate access to expert care." },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-center group">
                                        <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(242,125,38,0.5)]" />
                                        <span className="font-mono text-[9px] font-bold text-white uppercase tracking-[0.3em]">
                                            {item.title}: <span className="font-normal text-white/40 lowercase">{item.desc}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-20">
                                <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-white/20 font-bold">
                                    Ention Bharat Edition // 01
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Grounded Form */}
                    <div className="p-12 md:p-16 bg-bg flex flex-col justify-center border-l border-ink/5">
                        <div className="mb-12 flex gap-12 border-b border-ink/10 pb-6">
                            <button
                                onClick={() => setMode("login")}
                                className={cn(
                                    "font-serif text-3xl font-black uppercase tracking-tighter transition-all relative pb-4",
                                    mode === "login" ? "text-ink" : "text-ink/20 hover:text-ink/40"
                                )}
                            >
                                Login
                                {mode === "login" && <div className="absolute bottom-[-2px] left-0 w-full h-1 bg-accent" />}
                            </button>
                            <button
                                onClick={() => setMode("signup")}
                                className={cn(
                                    "font-serif text-3xl font-black uppercase tracking-tighter transition-all relative pb-4",
                                    mode === "signup" ? "text-ink" : "text-ink/20 hover:text-ink/40"
                                )}
                            >
                                Signup
                                {mode === "signup" && <div className="absolute bottom-[-2px] left-0 w-full h-1 bg-accent" />}
                            </button>
                        </div>

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const data = Object.fromEntries(formData);

                                try {
                                    const res = await fetch(`http://localhost:4000/api/auth/${mode}`, {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify(data)
                                    });
                                    const result = await res.json();
                                    if (result.user) {
                                        localStorage.setItem("ention_user", JSON.stringify(result.user));
                                        localStorage.setItem("ention_token", result.token);
                                        window.location.href = "/products";
                                    } else {
                                        alert(result.error || "Authentication failed");
                                    }
                                } catch (err) {
                                    alert("Network error. Ensure backend is running.");
                                }
                            }}
                            className="space-y-8"
                        >
                            {mode === "signup" && (
                                <div className="space-y-2">
                                    <label className="block font-mono text-[9px] uppercase tracking-[0.4em] text-ink/40 font-bold">Full Identity (Name)</label>
                                    <input name="name" type="text" className="w-full bg-ink/5 border border-ink/10 px-6 py-4 font-mono text-[11px] text-ink focus:outline-none focus:border-accent/40 rounded-sm" placeholder="YASH VARDHAN" required />
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="block font-mono text-[9px] uppercase tracking-[0.4em] text-ink/40 font-bold ml-1">
                                    Email Address
                                </label>
                                <div className="relative flex items-center">
                                    <Mail className="absolute left-6 text-ink/20" size={16} />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="YOUR@EMAIL.COM"
                                        className="w-full bg-ink/5 border border-ink/10 pl-16 pr-6 py-5 font-mono text-[11px] text-ink placeholder:text-ink/20 focus:outline-none focus:border-accent/40 transition-all rounded-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="block font-mono text-[9px] uppercase tracking-[0.4em] text-ink/40 font-bold">
                                        Password
                                    </label>
                                    {mode === "login" && (
                                        <button type="button" className="font-mono text-[8px] uppercase tracking-widest text-accent hover:brightness-110 transition-all">Recover Password?</button>
                                    )}
                                </div>
                                <div className="relative flex items-center">
                                    <Lock className="absolute left-6 text-ink/20" size={16} />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="********"
                                        className="w-full bg-ink/5 border border-ink/10 pl-16 pr-6 py-5 font-mono text-[11px] text-ink placeholder:text-ink/20 focus:outline-none focus:border-accent/40 transition-all rounded-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="group w-full flex items-center justify-between bg-ink text-bg px-10 py-6 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-accent transition-all rounded-sm shadow-2xl mt-12"
                            >
                                <span>{mode === "login" ? "Enter Dashboard" : "Create Account"}</span>
                                <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                            </button>
                        </form>

                        <div className="mt-16 text-center">
                            <Link href="/" className="group inline-flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.5em] text-ink/30 hover:text-accent transition-colors">
                                <ChevronRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                                <span>Return home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </BlurFadeIn>
        </main>
    );
};
