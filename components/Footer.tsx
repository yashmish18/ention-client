"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, Info } from "lucide-react";

const Instagram = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

export default function Footer() {
    return (
        <footer className="relative bg-[#141414] text-white pt-32 pb-12 px-12 overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                {/* Brand Column */}
                <div className="space-y-8">
                    <Link href="/" className="inline-block group">
                        <div className="relative w-64 h-32 hover:scale-105 transition-all duration-300">
                            <Image
                                src="/assets/ention-logo.png"
                                alt="Ention Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>
                    <p className="font-mono text-[10px] tracking-widest leading-relaxed opacity-70 uppercase max-w-xs">
                        High-performance machines engineered in Bharat. Designed for the professionals and students of the future.
                    </p>
                </div>

                {/* Navigation Column */}
                <div className="space-y-8">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Navigation</h4>
                    <ul className="space-y-4 font-mono text-[10px] uppercase tracking-widest">
                        <li><Link href="/" className="opacity-70 hover:opacity-100 hover:text-accent transition-all">Home</Link></li>
                        <li><Link href="/products" className="opacity-70 hover:opacity-100 hover:text-accent transition-all">Products</Link></li>
                        <li><Link href="/about" className="opacity-70 hover:opacity-100 hover:text-accent transition-all">About Us</Link></li>
                        <li><Link href="/orders" className="opacity-70 hover:opacity-100 hover:text-accent transition-all">Track Order</Link></li>
                        <li><Link href="/support" className="opacity-70 hover:opacity-100 hover:text-accent transition-all">Support</Link></li>
                    </ul>
                </div>

                {/* Company Column */}
                <div className="space-y-8">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Collective</h4>
                    <ul className="space-y-4 font-mono text-[10px] uppercase tracking-widest">
                        <li><Link href="/manifesto" className="opacity-70 hover:opacity-100 hover:text-accent transition-all">Manifesto</Link></li>
                        <li><Link href="/careers" className="opacity-70 hover:opacity-100 hover:text-accent transition-all">Careers</Link></li>
                        <li><Link href="/locations" className="opacity-70 hover:opacity-100 hover:text-accent transition-all">Locations</Link></li>
                        <li><Link href="/press" className="opacity-70 hover:opacity-100 hover:text-accent transition-all">Press</Link></li>
                    </ul>
                </div>

                {/* Contact Column */}
                <div className="space-y-8">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Connect</h4>
                    <div className="flex gap-4 opacity-70">
                        <Link href="#" className="hover:text-accent transition-colors"><Instagram size={18} /></Link>
                        <Link href="#" className="hover:text-accent transition-colors"><MessageCircle size={18} /></Link>
                        <Link href="#" className="hover:text-accent transition-colors"><Mail size={18} /></Link>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <span className="font-mono text-[8px] tracking-[0.8em] uppercase opacity-70">
                    © 2026 ENTI·ON Industrial Division // All Rights Reserved
                </span>
                <span className="font-mono text-[8px] tracking-[0.8em] uppercase opacity-70">
                    Made with Pride in Bharat
                </span>
            </div>
        </footer>
    );
};
