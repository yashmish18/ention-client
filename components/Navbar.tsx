"use client";

import React, { useEffect } from "react";
import { UserCircle, LayoutDashboard, LogOut, Shield, ShoppingBag, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth, getUserDisplayName, isAdmin, getUserRoleName } from "@/store/useAuth";
import { clearAuthCookies } from "@/components/auth/AuthForm";
import { useCart } from "@/store/useCart";

export default function Navbar() {
    const { user, isAuthenticated, initialize, logout } = useAuth();
    const { toggleCart, items } = useCart();

    useEffect(() => {
        initialize();
    }, [initialize]);

    const handleLogout = () => {
        logout();
        clearAuthCookies();
        window.location.href = "/";
    };

    const displayName = getUserDisplayName(user);
    const userIsAdmin = isAdmin(user);

    // Session Healer: Ensure the role cookie matches the actual user role
    // This fixes issues where previous sessions had malformed [object Object] cookies
    useEffect(() => {
        if (isAuthenticated && user) {
            const currentRole = getUserRoleName(user);
            if (currentRole) {
                const maxAge = 60 * 60 * 24 * 30; // 30 days
                document.cookie = `ention_role=${currentRole}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
            }
        }
    }, [isAuthenticated, user]);

    return (
        <nav className="flex items-center justify-between px-8 lg:px-16 py-5 bg-[#141414] text-white sticky top-0 z-[100] border-b border-white/5 backdrop-blur-md bg-opacity-95">
            {/* Left side Cluster: Unified Brand Block */}
            <div className="flex-none flex items-center justify-start gap-4">
                <Link href="/" className="flex items-center gap-3 select-none cursor-pointer group">
                    <div className="relative w-12 h-12 shrink-0 hover:scale-105 transition-transform duration-300">
                        <Image
                            src="/assets/ention-logo.png"
                            alt="Ention Logo"
                            fill
                            className="object-contain"
                            sizes="48px"
                            priority
                        />
                    </div>
                    <div className="w-[1px] h-6 bg-white/20" />
                    <div className="relative w-20 h-7 select-none">
                        <Image
                            src="/assets/HINDI_LOGO.webp"
                            alt="Ention Hindi"
                            fill
                            className="object-contain"
                            sizes="80px"
                            priority
                        />
                    </div>
                </Link>
                {isAuthenticated && (
                    <Link href="/dashboard" className="p-2 rounded-full border border-white/5 hover:border-accent/30 hover:bg-white/5 text-bg hover:text-accent transition-all group" title="Dashboard">
                        <LayoutDashboard className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    </Link>
                )}
                {isAuthenticated && userIsAdmin && (
                    <Link href="/admin" className="p-2 rounded-full border border-accent/20 hover:border-accent/50 hover:bg-accent/10 text-accent transition-all group" title="Admin Panel">
                        <Shield className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    </Link>
                )}
            </div>

            {/* Center Cluster: Unified Menu Navigation */}
            <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center gap-6 lg:gap-8 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/75">
                    <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                    
                    {/* Hover Product Dropdown */}
                    <div className="group py-2">
                        <button className="flex items-center gap-1 hover:text-accent transition-colors font-mono font-bold uppercase tracking-[0.2em] cursor-pointer bg-transparent border-none outline-none">
                            Product
                            <ChevronDown size={12} className="transition-transform duration-300 group-hover:rotate-180" />
                        </button>
                        
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[95vw] max-w-5xl bg-[#141414] border border-white/5 grid grid-cols-4 gap-8 p-8 transition-all duration-300 z-[200] opacity-0 invisible group-hover:opacity-100 group-hover:visible before:content-[''] before:absolute before:-top-6 before:left-0 before:right-0 before:h-6 shadow-2xl">
                            
                            {/* Column 1: Shop by Use Case */}
                            <div className="flex flex-col gap-6 pr-8 border-r border-white/5">
                                <div className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-accent">
                                    Shop by Use Case
                                </div>
                                <div className="flex flex-col gap-5">
                                    <Link href="/products" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            For Students
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            Lightweight, All-day battery, Budget-smart.
                                        </div>
                                    </Link>
                                    <Link href="/products" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            For Work
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            Fast performance, Clean design, Reliable daily driver.
                                        </div>
                                    </Link>
                                    <Link href="/products" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            For Creators
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            High-resolution display, Powerful GPU, Color-accurate.
                                        </div>
                                    </Link>
                                    <Link href="/products" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            For Gaming
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            High refresh rate, Dedicated graphics, Advanced cooling.
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Column 2: Shop by Performance */}
                            <div className="flex flex-col gap-6 pr-8 border-r border-white/5">
                                <div className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-accent">
                                    Shop by Performance
                                </div>
                                <div className="flex flex-col gap-5">
                                    <Link href="/products" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            Long Battery Life
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            Go all day without charging.
                                        </div>
                                    </Link>
                                    <Link href="/products" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            Lightweight & Portable
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            Easy to carry. Built for travel.
                                        </div>
                                    </Link>
                                    <Link href="/products" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            High Performance
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            Multitasking without slowdown.
                                        </div>
                                    </Link>
                                    <Link href="/products" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            AI-Ready
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            Optimized for next-gen workflows.
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Column 3: Shop by Series */}
                            <div className="flex flex-col gap-6 pr-8 border-r border-white/5">
                                <div className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-accent">
                                    Shop by Series
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Link href="/products" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            Workbook Series
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            Productivity - Learning - Development.
                                        </div>
                                    </Link>
                                    <Link href="/products/s1" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            Swapbook Series
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            Design - Gaming - Rendering - Heavy workloads.
                                        </div>
                                    </Link>
                                    <Link href="/products" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            Best Sellers
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            Our most popular picks, handpicked for you.
                                        </div>
                                    </Link>
                                    <Link href="/support" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            Buying Guide
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            Not sure which to pick? Start here.
                                        </div>
                                    </Link>
                                    <Link href="/products" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal font-bold">
                                            All Laptops
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            Browse the complete Ention lineup.
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Column 4: Compare & Explore */}
                            <div className="flex flex-col gap-6 pl-2">
                                <div className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-accent">
                                    Compare & Explore
                                </div>
                                <div className="flex flex-col gap-5">
                                    <Link href="/products" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            Compare Laptops
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            Compare specs side-by-side to find your perfect fit.
                                        </div>
                                    </Link>
                                    <Link href="/products" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            Custom Configurator
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            Select your CPU, RAM, storage, and operating system.
                                        </div>
                                    </Link>
                                    <Link href="/support" className="group/item block text-left">
                                        <div className="text-[13px] font-sans font-semibold text-white/95 group-hover/item:text-accent transition-colors normal-case tracking-normal">
                                            Corporate Inquiry
                                        </div>
                                        <div className="text-[11px] font-sans text-white/45 group-hover/item:text-white/70 transition-colors mt-0.5 leading-relaxed normal-case tracking-normal">
                                            B2B customized configurations and volume pricing.
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Link href="/solutions" className="hover:text-accent transition-colors whitespace-nowrap">Programs & Ecosystem</Link>
                    <Link href="/support" className="hover:text-accent transition-colors">Support</Link>
                    <Link href="/ention-os" className="hover:text-accent transition-colors whitespace-nowrap">Ention OS</Link>
                    <Link href="/about" className="hover:text-accent transition-colors whitespace-nowrap">About Us</Link>
                </div>
            </div>

            {/* Right side Cluster: Cart & Auth */}
            <div className="flex-none flex items-center justify-end gap-6">
                <button
                    onClick={() => toggleCart(true)}
                    className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition-all relative group"
                >
                    <ShoppingBag size={15} />
                    {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-accent text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {items.length}
                        </span>
                    )}
                </button>

                {isAuthenticated && user ? (
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 border-r border-white/10 pr-6 text-right">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest leading-tight">
                                    {displayName}
                                </span>
                                {isAdmin(user) && (
                                    <span className="text-[7px] font-mono font-black text-accent uppercase tracking-tighter">
                                        Role: {getUserRoleName(user)}
                                    </span>
                                )}
                            </div>
                            <UserCircle className="w-5 h-5 text-accent" />
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-[10px] font-mono font-bold uppercase tracking-widest hover:text-accent transition-colors opacity-70 hover:opacity-100 flex items-center gap-2"
                        >
                            Logout <LogOut size={12} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <button className="text-[11px] font-mono font-bold uppercase tracking-widest hover:text-accent transition-colors px-3 py-2 opacity-70 hover:opacity-100">
                                Login
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button className="bg-accent hover:bg-[#d9631a] text-white px-6 py-2.5 text-[11px] font-mono font-bold uppercase tracking-[0.2em] transition-all shadow-md active:scale-95 border border-accent/20 rounded-full">
                                Sign up
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
