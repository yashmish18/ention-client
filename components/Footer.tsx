"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import FormModal from "./FormModal";
import SmartSupportForm from "./forms/SmartSupportForm";

export default function Footer() {
    const [isSupportOpen, setIsSupportOpen] = React.useState(false);

    return (
        <footer className="relative bg-[#0A0A0A] text-white pt-32 pb-12 px-8 lg:px-16 overflow-hidden border-t border-white/5">
            <FormModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)}>
                <SmartSupportForm initialCategory="General Inquiry" onSuccess={() => setIsSupportOpen(false)} />
            </FormModal>

            {/* Background Grain/Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0">
                <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="relative z-10 max-w-[1500px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
                    
                    {/* 1. Brand Section - Wider Span */}
                    <div className="lg:col-span-3 space-y-12 pr-8">
                        <div className="space-y-6">
                            
                            <Link href="/" className="inline-block group">
                                <div className="relative w-64 h-16 transition-transform duration-300 group-hover:scale-105">
                                    <Image
                                        src="/assets/ention-logo.png"
                                        alt="Ention Logo"
                                        fill
                                        className="object-contain object-left scale-150 origin-left"
                                        priority
                                    />
                                </div>
                            </Link>
                        </div>
                        
                        <p className="font-serif italic text-white/50 leading-relaxed text-sm max-w-xs">
                            Building India's computing future—delivering reliable devices today while enabling innovation ecosystems for tomorrow.
                        </p>
                        
                        <div className="space-y-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 pt-4">
                            <div className="flex items-center gap-4 group cursor-default">
                                <MapPin size={14} className="text-[#F27D26] group-hover:scale-110 transition-transform" />
                                <span>India</span>
                            </div>
                            <a href="mailto:support@ention.in" className="flex items-center gap-4 group hover:text-white transition-colors">
                                <Mail size={14} className="text-[#F27D26] group-hover:translate-x-1 transition-transform" />
                                <span>support@ention.in</span>
                            </a>
                            <a href="mailto:contact@ention.in" className="flex items-center gap-4 group hover:text-white transition-colors">
                                <Mail size={14} className="text-[#F27D26] group-hover:translate-x-1 transition-transform" />
                                <span>contact@ention.in</span>
                            </a>
                            <div className="flex items-center gap-4 group cursor-default">
                                <Phone size={14} className="text-[#F27D26] group-hover:scale-110 transition-transform" />
                                <span>+91-XXXXXXXXXX</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Quick Links */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#F27D26] font-black underline underline-offset-8 decoration-[#F27D26]/30">Quick Links</h4>
                        <ul className="space-y-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                            <li><Link href="/" className="hover:text-white transition-colors block">Home</Link></li>
                            <li><Link href="/products" className="hover:text-white transition-colors block">Products</Link></li>
                            <li><Link href="/solutions" className="hover:text-white transition-colors block">Solutions</Link></li>
                            <li><Link href="/ention-os" className="hover:text-white transition-colors block">Ention OS</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors block">About Us</Link></li>
                            <li><button onClick={() => setIsSupportOpen(true)} className="hover:text-[#F27D26] transition-colors block text-left uppercase">Contact Support</button></li>
                        </ul>
                    </div>

                    {/* 3. Products */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#F27D26] font-black underline underline-offset-8 decoration-[#F27D26]/30">Products</h4>
                        <ul className="space-y-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                            <li><Link href="/products" className="hover:text-white transition-colors block">Workbook Series</Link></li>
                            <li><Link href="/products" className="hover:text-white transition-colors block">Swapbook Series</Link></li>
                            <li><Link href="/solutions" className="hover:text-white transition-colors block">Developer Laptops</Link></li>
                            <li><Link href="/solutions" className="hover:text-white transition-colors block">Enterprise Solutions</Link></li>
                            <li><Link href="/solutions" className="hover:text-white transition-colors block">Education Models</Link></li>
                        </ul>
                    </div>

                    {/* 4. Enterprise Solutions */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#F27D26] font-black underline underline-offset-8 decoration-[#F27D26]/30">Enterprise Solutions</h4>
                        <ul className="space-y-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                            <li><Link href="/solutions" className="hover:text-white transition-colors block">Institutional Labs</Link></li>
                            <li><Link href="/solutions" className="hover:text-white transition-colors block">Education Solutions</Link></li>
                            <li><Link href="/solutions" className="hover:text-white transition-colors block">Enterprise Deployments</Link></li>
                        </ul>
                    </div>

                    {/* 5. Specialized Solutions */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#F27D26] font-black underline underline-offset-8 decoration-[#F27D26]/30">Specialized Solutions</h4>
                        <ul className="space-y-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                            <li><Link href="/solutions" className="hover:text-white transition-colors block">White-Label / OEM</Link></li>
                            <li><Link href="/solutions" className="hover:text-white transition-colors block">Startup Partnerships</Link></li>
                            <li><Link href="/solutions" className="hover:text-white transition-colors block">Campus Ambassador</Link></li>
                        </ul>
                    </div>

                    {/* 6. Support / Legal */}
                    <div className="lg:col-span-1 space-y-12">
                        <div className="space-y-6">
                            <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#F27D26] font-black">Support</h4>
                            <ul className="space-y-3 font-mono text-[9px] uppercase tracking-widest text-white/50">
                                <li><Link href="/support" className="hover:text-white">FAQs</Link></li>
                                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                                <li><Link href="/support" className="hover:text-white">Service</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#F27D26] font-black">Legal</h4>
                            <ul className="space-y-3 font-mono text-[9px] uppercase tracking-widest text-white/50">
                                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                                <li><Link href="#" className="hover:text-white">Terms</Link></li>
                                <li><Link href="#" className="hover:text-white">Refund</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Social & Bottom Bar */}
                <div className="mt-32 pt-12 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex items-center gap-12 font-mono text-[9px] uppercase tracking-[0.5em] text-white/30">
                            <span className="text-[#F27D26]">Follow Us:</span>
                            <div className="flex gap-8">
                                <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                                <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                                <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                            </div>
                        </div>
                        
                        <div className="text-right space-y-2 opacity-50">
                            <p className="font-mono text-[8px] uppercase tracking-[0.4em]">© 2026 Ention Technology. Made with precision for Bharat.</p>
                            <p className="font-sans font-black text-[10px] uppercase tracking-[0.8em]">ENTION • एंटियन • என்ஷன் • এনশন • ఎన్షన్</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
