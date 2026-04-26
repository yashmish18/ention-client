"use client";

import React, { useEffect } from "react";
import { UserCircle, LayoutDashboard, LogOut, Shield, ShoppingBag } from "lucide-react";
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
            {/* Left side Cluster */}
            <div className="flex-1 flex items-center justify-start gap-6">

                <Link href="/" className="relative w-28 h-10 select-none cursor-pointer">
                    <Image
                        src="/assets/HINDI_LOGO.webp"
                        alt="Ention Hindi"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 112px, 112px"
                        priority
                    />
                </Link>
                {isAuthenticated && (
                    <Link href="/dashboard" className="p-2 rounded-full border border-white/5 hover:border-accent/30 hover:bg-white/5 text-bg hover:text-accent transition-all group" title="Dashboard">
                        <LayoutDashboard className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                    </Link>
                )}
                {isAuthenticated && userIsAdmin && (
                    <Link href="/admin" className="p-2 rounded-full border border-accent/20 hover:border-accent/50 hover:bg-accent/10 text-accent transition-all group" title="Admin Panel">
                        <Shield className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                    </Link>
                )}
            </div>

            {/* Center Cluster */}
            <div className="flex-none flex items-center justify-center gap-2" >
                <div className="flex items-center gap-8 text-[12px] font-mono font-bold uppercase tracking-[0.2em] opacity-70">
                    <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                    <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
                    <Link href="/solutions" className="hover:text-accent transition-colors">Solutions</Link>
                </div>

                {/* Central Logo Asset */}
                <Link href="/" className="mx-2 relative w-20 h-16 cursor-pointer hover:scale-105 transition-all duration-300">
                    <Image
                        src="/assets/ention-logo.png"
                        alt="Ention Logo"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 80px, 80px"
                        priority
                    />
                </Link>

                <div className="flex items-center gap-6 text-[12px] font-mono font-bold uppercase tracking-[0.2em] opacity-70">
                    <Link href="/collaborate" className="hover:text-accent transition-colors">Programs</Link>
                    <Link href="/about" className="hover:text-accent transition-colors">About</Link>
                    <Link href="/support" className="hover:text-accent transition-colors">Contact</Link>
                </div>
            </div>

            {/* Right side Cluster */}
            <div className="flex-1 flex items-center justify-end gap-8">
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
                        <button
                            onClick={handleLogout}
                            className="text-[10px] font-mono font-bold uppercase tracking-widest hover:text-accent transition-colors opacity-70 hover:opacity-100 flex items-center gap-2"
                        >
                            Logout <LogOut size={12} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => toggleCart(true)}
                            className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition-all relative group mr-4"
                        >
                            <ShoppingBag size={15} />
                            {items.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                    {items.length}
                                </span>
                            )}
                        </button>
                        <Link href="/login">
                            <button className="text-[12px] font-mono font-bold uppercase tracking-widest hover:text-accent transition-colors px-4 py-2 opacity-70 hover:opacity-100">
                                Login
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button className="bg-accent hover:bg-[#d9631a]  text-white px-8 py-2.5 text-[12px] font-mono font-bold uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 border border-accent/20 rounded-full">
                                Sign up
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
