"use client";

import React, { useState, useEffect } from "react";
import { UserCircle, LayoutDashboard, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("ention_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("ention_user");
        localStorage.removeItem("ention_token");
        setUser(null);
        window.location.href = "/";
    };

    return (
        <nav className="flex items-center justify-between px-8 py-5 bg-[#141414] text-white sticky top-0 z-[100] border-b border-white/5">
            {/* Left side: User icon and Hindi Logo Asset */}
            <div className="flex items-center gap-6">

                <Link href="/" className="relative w-28 h-10 select-none cursor-pointer">
                    <Image
                        src="/assets/HINDI_LOGO.webp"
                        alt="Ention Hindi"
                        fill
                        className="object-contain"
                        priority
                    />
                </Link>
                {user && (
                    <Link
                        href="/dashboard"
                        className="p-2 rounded-full border border-white/5 hover:border-accent/30 hover:bg-white/5 text-bg hover:text-accent transition-all group relative"
                        title="User Dashboard"
                    >
                        <LayoutDashboard className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-ink border border-white/10 px-2 py-1 text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">DASHBOARD</span>
                    </Link>
                )}
            </div>

            {/* Center: Nav links and Logo Asset */}
            <div className="flex items-center gap-2 justify-center" >
                <div className="flex items-center gap-8 text-[12px] font-mono font-bold uppercase tracking-[0.2em] opacity-70">
                    <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                    <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
                    <Link href="/about" className="hover:text-accent transition-colors">About Us</Link>
                </div>

                {/* Central Logo Asset */}
                <Link href="/" className="mx-2 relative w-20 h-16 cursor-pointer hover:scale-105 transition-all duration-300">
                    <Image
                        src="/assets/ention-logo.png"
                        alt="Ention Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </Link>

                <div className="flex items-center gap-6 text-[12px] font-mono font-bold uppercase tracking-[0.2em] opacity-70">
                    <Link href="/collaborate" className="hover:text-accent transition-colors">Collaborate</Link>
                    <Link href="/support" className="hover:text-accent transition-colors">Support</Link>
                    <Link href="/orders" className="hover:text-accent transition-colors">Orders</Link>
                </div>
            </div>

            {/* Right side: Login, Signup / User Profile */}
            <div className="flex items-center gap-8">
                {user ? (
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 border-r border-white/10 pr-6">
                            <UserCircle className="w-5 h-5 text-accent" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-[10px] font-mono font-bold uppercase tracking-widest hover:text-accent transition-colors opacity-70 hover:opacity-100 flex items-center gap-2"
                        >
                            Logout <LogOut size={12} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-6">
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
