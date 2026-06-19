"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, PieChart, ShieldAlert } from "lucide-react";

export default function AnalyticsPanel({ 
    tickets = [], 
    orders = [], 
    inquiries = [] 
}: { 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tickets: any[]; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orders: any[]; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inquiries?: any[];
}) {
    const totalRevenue = orders.reduce((s, o) => s + Number(o.total || 0), 0);
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    // 1. Product breakdown from actual order items
    const productCounts: Record<string, number> = {};
    orders.forEach(o => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    // 2. Ticket priority breakdown
    const priorityCounts = { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 };
    tickets.forEach(t => {
        const pri = (t.priority || "MEDIUM").toUpperCase();
        if (pri in priorityCounts) {
            priorityCounts[pri as keyof typeof priorityCounts]++;
        } else {
            priorityCounts.MEDIUM++;
        }
    });
    const totalTickets = tickets.length || 1;

    // 3. Lead type breakdown
    const leadTypeCounts = { LEAD: 0, PROGRAM: 0, CALLBACK: 0 };
    inquiries.forEach(i => {
        const type = (i.type || "LEAD").toUpperCase();
        if (type in leadTypeCounts) {
            leadTypeCounts[type as keyof typeof leadTypeCounts]++;
        }
    });

    // 4. Order status distribution
    const statusCounts: Record<string, number> = {};
    orders.forEach(o => { statusCounts[o.status] = (statusCounts[o.status] || 0) + 1; });

    // 5. Monthly revenue (last 6 months)
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
        <div className="space-y-12 text-white">
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
                    <p className="text-xs text-white/30 uppercase tracking-widest">Per transaction</p>
                </div>
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-2">
                    <p className="text-xs font-medium text-white/50">Total CRM Leads</p>
                    <p className="text-3xl font-bold tracking-tight text-white/90 text-blue-400">{inquiries.length}</p>
                    <p className="text-xs text-white/30 uppercase tracking-widest">Form submissions</p>
                </div>
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-2">
                    <p className="text-xs font-medium text-white/50">Active Support cases</p>
                    <p className="text-3xl font-bold tracking-tight text-white/90 text-amber-400">
                        {tickets.filter(t => !['CLOSED', 'COMPLETED'].includes(t.status)).length}
                    </p>
                    <p className="text-xs text-white/30 uppercase tracking-widest">Pending attention</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monthly Revenue Bar Chart */}
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-10 space-y-8">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[#F27D26]">
                            <BarChart3 size={16} />
                            <h3 className="text-sm font-semibold">Monthly Revenue Trend</h3>
                        </div>
                        <p className="text-[10px] opacity-40 uppercase tracking-widest">Last 6 months sales activity</p>
                    </div>
                    <div className="flex items-end gap-3 h-48 pt-4">
                        {Object.entries(monthlyRevenue).map(([month, val]) => (
                            <div key={month} className="flex-1 flex flex-col items-center gap-2">
                                <span className="text-[8px] font-sans opacity-45">₹{(val / 1000).toFixed(0)}k</span>
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
                        <div className="flex items-center gap-2 text-[#F27D26]">
                            <PieChart size={16} />
                            <h3 className="text-sm font-semibold">Revenue by Product Line</h3>
                        </div>
                        <p className="text-[10px] opacity-40 uppercase tracking-widest">Split by device model</p>
                    </div>
                    <div className="space-y-6">
                        {seriesData.length === 0 && <p className="text-xs opacity-35 py-4 font-sans text-center">No product data recorded.</p>}
                        {seriesData.map(s => (
                            <div key={s.label} className="space-y-2">
                                <div className="flex justify-between text-xs uppercase tracking-widest">
                                    <span className="truncate max-w-[240px]">{s.label}</span>
                                    <span className="opacity-45">{s.value}%</span>
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

            {/* CRM Ticket Priority & Lead Type Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Tickets Priority Backlog */}
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-10 space-y-8">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-red-400">
                            <ShieldAlert size={16} />
                            <h3 className="text-sm font-semibold uppercase tracking-wider">Ticketing Priority Backlog</h3>
                        </div>
                        <p className="text-[10px] opacity-40 uppercase tracking-widest">Support cases priority weight</p>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { label: "Low", count: priorityCounts.LOW, color: "text-white/40 border-white/10 bg-white/5" },
                            { label: "Medium", count: priorityCounts.MEDIUM, color: "text-amber-400 border-amber-500/20 bg-amber-500/5" },
                            { label: "High", count: priorityCounts.HIGH, color: "text-red-400 border-red-500/20 bg-red-500/5" },
                            { label: "Critical", count: priorityCounts.CRITICAL, color: "text-red-300 border-red-700/20 bg-red-700/10 font-bold" }
                        ].map((p, idx) => (
                            <div key={idx} className={`p-4 border rounded-xl text-center space-y-1 ${p.color}`}>
                                <p className="text-xs uppercase opacity-60">{p.label}</p>
                                <p className="text-2xl font-semibold tracking-tight">{p.count}</p>
                                <p className="text-[8px] opacity-30">{Math.round((p.count / totalTickets) * 100)}%</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CRM Leads Distribution */}
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-10 space-y-8">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-blue-400">
                            <BarChart3 size={16} />
                            <h3 className="text-sm font-semibold uppercase tracking-wider">CRM Lead Channels</h3>
                        </div>
                        <p className="text-[10px] opacity-40 uppercase tracking-widest">Form submissions by entry point</p>
                    </div>
                    <div className="space-y-4">
                        {[
                            { label: "Sales Leads / RFQ", count: leadTypeCounts.LEAD, color: "bg-blue-500" },
                            { label: "Program Applications", count: leadTypeCounts.PROGRAM, color: "bg-purple-500" },
                            { label: "Phone Callbacks", count: leadTypeCounts.CALLBACK, color: "bg-green-500" }
                        ].map((c, idx) => {
                            const total = inquiries.length || 1;
                            const pct = Math.round((c.count / total) * 100);
                            return (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between text-xs uppercase tracking-widest">
                                        <span>{c.label}</span>
                                        <span className="opacity-50">{c.count} ({pct}%)</span>
                                    </div>
                                    <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${pct}%` }}
                                            transition={{ duration: 1.2 }}
                                            className={`h-full ${c.color}`}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Order status Pipeline */}
            <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-10 space-y-8">
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-[#F27D26]">Order Pipeline Summary</h3>
                    <p className="text-[10px] opacity-40 uppercase tracking-widest">Current state distribution</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                    {["PLACED", "CONFIRMED", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"].map(status => (
                        <div key={status} className="text-center space-y-2 p-4 bg-[#27272a]/40 rounded-xl border border-white/5">
                            <p className="text-2xl font-semibold tracking-tight">{statusCounts[status] || 0}</p>
                            <p className="text-[8px] font-sans uppercase tracking-widest opacity-40">{status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
