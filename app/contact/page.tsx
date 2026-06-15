"use client";

import React from "react";
import LeadSalesForm from "@/components/forms/LeadSalesForm";
import QuickCallbackForm from "@/components/forms/QuickCallbackForm";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-bg text-ink overflow-x-hidden pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-8">
                <BlurFadeIn className="text-center space-y-6 mb-20">
                    <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-black">Get in Touch</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter leading-tight">
                        Contact Ention.
                    </h1>
                    <p className="font-sans text-lg opacity-70 max-w-2xl mx-auto leading-relaxed">
                        Whether you are a developer, an institution, or an enterprise, our team is ready to assist you.
                    </p>
                </BlurFadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Direct Contact Info & Callback */}
                    <div className="lg:col-span-4 space-y-12">
                        <BlurFadeIn delay={0.1} className="space-y-8">
                            <h2 className="text-2xl font-serif font-bold italic tracking-tight">Direct Contact</h2>
                            
                            <div className="space-y-6">
                                <a href="mailto:contact@ention.in" className="flex items-start gap-4 group">
                                    <Mail className="text-accent mt-1" size={20} />
                                    <div>
                                        <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold mb-1">Email</h3>
                                        <p className="font-sans text-sm opacity-80 group-hover:text-accent transition-colors">contact@ention.in</p>
                                    </div>
                                </a>
                                
                                <a href="tel:+910000000000" className="flex items-start gap-4 group">
                                    <Phone className="text-accent mt-1" size={20} />
                                    <div>
                                        <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold mb-1">Phone</h3>
                                        <p className="font-sans text-sm opacity-80 group-hover:text-accent transition-colors">+91 00000 00000</p>
                                    </div>
                                </a>
                                
                                <div className="flex items-start gap-4">
                                    <MapPin className="text-accent mt-1" size={20} />
                                    <div>
                                        <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold mb-1">Office</h3>
                                        <p className="font-sans text-sm opacity-80 leading-relaxed">
                                            Ention Technology<br />
                                            India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </BlurFadeIn>

                        <BlurFadeIn delay={0.2}>
                            <div className="bg-white p-8 border border-ink/10 rounded-sm shadow-sm">
                                <h3 className="text-lg font-serif font-bold italic mb-6">Request a Callback</h3>
                                <p className="font-sans text-xs opacity-70 mb-6">Leave your number and we'll call you back shortly.</p>
                                <QuickCallbackForm source="contact_page" />
                            </div>
                        </BlurFadeIn>
                    </div>

                    {/* Right Column: Lead / Inquiry Form */}
                    <div className="lg:col-span-8">
                        <BlurFadeIn delay={0.3} className="bg-white p-8 md:p-12 border border-ink/10 rounded-sm shadow-xl">
                            <div className="mb-10">
                                <h2 className="text-3xl font-serif font-black italic tracking-tighter mb-3">Send an Inquiry</h2>
                                <p className="font-sans text-sm opacity-70">
                                    Fill out the form below and our sales or support team will get back to you within 24 hours.
                                </p>
                            </div>
                            
                            <LeadSalesForm source="contact_page" onSuccess={() => {}} />
                        </BlurFadeIn>
                    </div>
                </div>
            </div>
        </main>
    );
}
