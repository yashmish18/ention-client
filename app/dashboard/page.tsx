"use client";

import React from "react";
import Link from "next/link";
import {
    TrendingUp,
    ShieldCheck,
    Clock,
    Package,
    Cpu,
    ArrowRight,
    Monitor
} from "lucide-react";
import { BlurFadeIn } from "@/components/BlurFadeIn";

const StatsCard = ({ title, value, detail, icon: Icon }: any) => (
    <div className="bg-white border border-ink/5 p-8 rounded-sm group hover:border-accent/20 transition-all duration-500 shadow-sm">
        <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-sm bg-ink/5 flex items-center justify-center group-hover:bg-accent transition-colors">
                <Icon size={18} strokeWidth={1.5} className="group-hover:text-bg transition-colors" />
            </div>
        </div>
        <div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-ink/40 mb-2 font-bold">{title}</span>
            <h3 className="text-3xl font-serif font-black text-ink tracking-tighter uppercase">{value}</h3>
            <p className="mt-4 font-mono text-[8px] uppercase tracking-widest text-ink/30 group-hover:text-ink/60 transition-colors">
                {detail}
            </p>
        </div>
    </div>
);

export default function DashboardPage() {
    const [user, setUser] = React.useState<any>(null);
    const [orders, setOrders] = React.useState<any[]>([]);

    React.useEffect(() => {
        const storedUser = localStorage.getItem("ention_user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);

            // Fetch real orders
            fetch(`http://localhost:4000/api/checkout/orders/${parsed.id}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setOrders(data);
                })
                .catch(err => console.error("Order sync failure", err));
        }
    }, []);

    const userName = user?.name || "Architect";

    return (
        <div className="space-y-12">
            {/* Welcome Section */}
            <BlurFadeIn delay={0.1}>
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-12 border-b border-ink/10">
                    <div className="space-y-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-bold">{userName}'s Dashboard</span>
                        <h1 className="text-5xl md:text-6xl font-serif font-black text-ink uppercase leading-none tracking-tighter">
                            Overview
                        </h1>
                    </div>
                    <div className="text-right">
                        <span className="block font-mono text-[9px] text-ink/30 uppercase tracking-[0.4em] mb-2">Account Node</span>
                        <span className="font-mono text-xs font-bold text-ink uppercase tracking-widest">{user?.email || "NOT INITIALIZED"}</span>
                    </div>
                </div>
            </BlurFadeIn>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <BlurFadeIn delay={0.2}>
                    <StatsCard
                        title="Active Orders"
                        value={orders.length.toString().padStart(2, '0')}
                        detail="Real-time Tracking"
                        icon={Package}
                    />
                </BlurFadeIn>
                <BlurFadeIn delay={0.3}>
                    <StatsCard
                        title="Voucher Grade"
                        value="Sovereign"
                        detail="Tier 1 Access"
                        icon={TrendingUp}
                    />
                </BlurFadeIn>
                <BlurFadeIn delay={0.4}>
                    <StatsCard
                        title="Protection"
                        value="Active"
                        detail="Secure Infrastructure"
                        icon={ShieldCheck}
                    />
                </BlurFadeIn>
                <BlurFadeIn delay={0.5}>
                    <StatsCard
                        title="Priority"
                        value="High"
                        detail="Direct Comm-Link"
                        icon={Clock}
                    />
                </BlurFadeIn>
            </div>

            {/* Orders Section */}
            <div className="space-y-8">
                <h2 className="text-2xl font-serif font-bold italic tracking-tight">Order Hive.</h2>
                {orders.length === 0 ? (
                    <BlurFadeIn delay={0.6}>
                        <div className="bg-white border border-dashed border-ink/20 p-20 rounded-sm flex flex-col items-center justify-center space-y-6 text-center">
                            <Package size={48} className="text-ink/10" strokeWidth={1} />
                            <div className="space-y-2">
                                <p className="font-serif italic text-lg text-ink/40">No orders detected in the system hive.</p>
                                <p className="font-mono text-[10px] uppercase tracking-widest text-ink/20">Initialize your first procurement to begin.</p>
                            </div>
                            <Link href="/products">
                                <button className="bg-ink text-bg px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all">
                                    Explore Catalog
                                </button>
                            </Link>
                        </div>
                    </BlurFadeIn>
                ) : (
                    <div className="grid gap-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white border border-ink/5 p-8 rounded-sm flex flex-col md:flex-row justify-between items-center group hover:border-accent/30 transition-all">
                                <div className="space-y-1">
                                    <span className="font-mono text-[8px] uppercase tracking-widest text-accent font-bold">{order.orderNumber}</span>
                                    <h3 className="text-xl font-serif font-black uppercase italic">{order.product.name}</h3>
                                    <p className="font-mono text-[9px] text-ink/40 uppercase tracking-widest">{order.product.configuration.ram} // {order.product.configuration.ssd}</p>
                                </div>
                                <div className="flex items-center gap-10 mt-6 md:mt-0">
                                    <div className="text-right">
                                        <span className="block font-mono text-[8px] uppercase tracking-widest text-ink/20 mb-1">Status</span>
                                        <span className="font-mono text-[10px] font-bold uppercase text-ink">{order.status}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                                        <ArrowRight size={16} className="group-hover:text-bg transition-colors" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
