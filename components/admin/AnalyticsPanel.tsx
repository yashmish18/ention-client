"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function AnalyticsPanel({ tickets, orders, users }: { tickets: any[]; orders: any[]; users: any[] }) {
    const totalRevenue = orders.reduce((s, o) => s + Number(o.total || 0), 0);
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    // Product breakdown from actual order items
    const productCounts: Record<string, number> = {};
    orders.forEach(o => {
        (o.items || []).forEach((item: any) => {
            const name = item.productName || "Unknown";
            productCounts[name] = (productCounts[name] || 0) + Number(item.totalPrice || 0);
        });
    });
    const totalProductRevenue = Object.values(productCounts).reduce((a, b) => a + b, 0) || 1;
    const seriesData = Object.entries(productCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)
        .map(([label, value], i) => ({
            label,
            value: Math.round((value / totalProductRevenue) * 100),
            color: ["bg-[#F27D26]", "bg-amber-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-white/20"][i] || "bg-white/10",
        }));

    // Order status distribution
    const statusCounts: Record<string, number> = {};
    orders.forEach(o => { statusCounts[o.status] = (statusCounts[o.status] || 0) + 1; });

    // Monthly revenue (last 6 months)
    const monthlyRevenue: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
        monthlyRevenue[key] = 0;
    }
    orders.forEach(o => {
        const d = new Date(o.createdAt);
        const key = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
        if (key in monthlyRevenue) monthlyRevenue[key] += Number(o.total || 0);
    });
    const maxMonthly = Math.max(...Object.values(monthlyRevenue), 1);

    return (
        <div className="space-y-12">
            {/* High-level metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-2">
                    <p className="text-xs font-medium text-white/50">Total Revenue</p>
                    <p className="text-3xl font-bold tracking-tight text-white/90">₹{(totalRevenue / 100000).toFixed(2)}L</p>
                    <div className="flex items-center gap-2 text-[10px] text-green-400 font-sans">
                        <ArrowUpRight size={12} /> {orders.length} orders
                    </div>
                </div>
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-2">
                    <p className="text-xs font-medium text-white/50">Average Order Value</p>
                    <p className="text-3xl font-bold tracking-tight text-white/90">₹{Math.round(avgOrderValue).toLocaleString()}</p>
                    <p className="text-sm text-white/20 uppercase tracking-widest">Per transaction</p>
                </div>
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-2">
                    <p className="text-xs font-medium text-white/50">Customer Base</p>
                    <p className="text-3xl font-bold tracking-tight text-white/90">{users.length}</p>
                    <p className="text-sm text-white/20 uppercase tracking-widest">Registered users</p>
                </div>
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-2">
                    <p className="text-xs font-medium text-white/50">Open Tickets</p>
                    <p className="text-3xl font-bold tracking-tight text-white/90 text-amber-400">{tickets.filter(t => !['CLOSED', 'COMPLETED'].includes(t.status)).length}</p>
                    <p className="text-sm text-white/20 uppercase tracking-widest">Needing attention</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monthly Revenue Bar Chart */}
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-10 space-y-8">
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-[#F27D26]">Monthly Revenue</h3>
                        <p className="text-[10px] opacity-40 uppercase tracking-widest">Last 6 months trend</p>
                    </div>
                    <div className="flex items-end gap-3 h-48">
                        {Object.entries(monthlyRevenue).map(([month, val]) => (
                            <div key={month} className="flex-1 flex flex-col items-center gap-2">
                                <span className="text-[8px] font-sans opacity-40">₹{(val / 1000).toFixed(0)}k</span>
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${(val / maxMonthly) * 100}%` }}
                                    transition={{ duration: 1, ease: "circOut" }}
                                    className="w-full bg-[#F27D26] min-h-[2px] rounded-t-sm"
                                />
                                <span className="text-[8px] font-sans opacity-30">{month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Revenue Breakdown */}
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-10 space-y-8">
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-[#F27D26]">Revenue by Product</h3>
                        <p className="text-[10px] opacity-40 uppercase tracking-widest">Split by model</p>
                    </div>
                    <div className="space-y-6">
                        {seriesData.length === 0 && <p className="text-[10px] opacity-20 font-sans uppercase">No product data yet</p>}
                        {seriesData.map(s => (
                            <div key={s.label} className="space-y-2">
                                <div className="flex justify-between text-sm uppercase tracking-widest">
                                    <span className="truncate max-w-[200px]">{s.label}</span>
                                    <span className="opacity-40">{s.value}%</span>
                                </div>
                                <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${s.value}%` }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className={`h-full ${s.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Order Status Distribution */}
            <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-10 space-y-8">
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-[#F27D26]">Order Pipeline</h3>
                    <p className="text-[10px] opacity-40 uppercase tracking-widest">Current status distribution</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                    {["PLACED", "CONFIRMED", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"].map(status => (
                        <div key={status} className="text-center space-y-2 p-4 bg-[#27272a] rounded-t-xl border border-white/5">
                            <p className="text-2xl font-semibold tracking-tight">{statusCounts[status] || 0}</p>
                            <p className="text-[8px] font-sans uppercase tracking-widest opacity-40">{status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
