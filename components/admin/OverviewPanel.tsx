"use client";

import React from "react";
import { ShoppingBag, Ticket, UserCheck, Activity, TrendingUp } from "lucide-react";
import { TICKET_STATUS, ORDER_STATUS_COLOR } from "./shared";

export default function OverviewPanel({ 
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
    // 1. CRM Funnel computations
    const totalInquiries = inquiries.length || 1;
    const newLeads = inquiries.filter(i => i.status === "NEW").length;
    const inDiscussion = inquiries.filter(i => ["REVIEWING", "CONTACTED"].includes(i.status)).length;
    const convertedLeads = inquiries.filter(i => i.status === "RESOLVED").length;

    const leadConversionRate = Math.round((convertedLeads / totalInquiries) * 100);

    // 2. High level metrics
    const stats = [
        { label: "Lifetime Orders", value: orders.length, icon: ShoppingBag, color: "text-blue-400" },
        { label: "Active Support Backlog", value: tickets.filter(t => !['CLOSED', 'COMPLETED'].includes(t.status)).length, icon: Ticket, color: "text-amber-400" },
        { label: "CRM Lead Conversions", value: `${leadConversionRate}%`, icon: UserCheck, color: "text-green-400" },
        { label: "Estimated Earnings", value: `₹${(orders.reduce((s, o) => s + Number(o.total || 0), 0) / 100000).toFixed(1)}L`, icon: TrendingUp, color: "text-[#F27D26]" },
    ];

    return (
        <div className="space-y-10 text-white">
            {/* KPI grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-6 space-y-4 hover:border-[#F27D26]/20 transition-all">
                        <s.icon size={20} className={s.color} />
                        <div>
                            <p className="text-xs font-medium text-white/40">{s.label}</p>
                            <p className="text-2xl font-semibold tracking-tight mt-1">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* CRM Pipeline Funnel */}
            <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div>
                        <h3 className="text-sm font-semibold text-[#F27D26] uppercase tracking-wider">CRM Conversion Funnel</h3>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Status of all client requests & program apps</p>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                            Total Leads: {inquiries.length}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Funnel Progress Bars */}
                    <div className="flex h-4 bg-white/5 rounded-full overflow-hidden">
                        <div 
                            style={{ width: `${Math.max((newLeads / totalInquiries) * 100, 2)}%` }}
                            className="bg-blue-500 transition-all duration-500" 
                            title={`New: ${newLeads}`}
                        />
                        <div 
                            style={{ width: `${Math.max((inDiscussion / totalInquiries) * 100, 2)}%` }}
                            className="bg-purple-500 transition-all duration-500" 
                            title={`In Discussion: ${inDiscussion}`}
                        />
                        <div 
                            style={{ width: `${Math.max((convertedLeads / totalInquiries) * 100, 2)}%` }}
                            className="bg-green-500 transition-all duration-500" 
                            title={`Converted: ${convertedLeads}`}
                        />
                    </div>

                    {/* Stage legend */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 mt-1" />
                            <div>
                                <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Stage 1: Intake (New)</p>
                                <p className="text-lg font-semibold mt-0.5">{newLeads} leads</p>
                                <p className="text-[9px] text-white/30 mt-1 font-sans">Awaiting review by the operations team.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0 mt-1" />
                            <div>
                                <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Stage 2: Discussion</p>
                                <p className="text-lg font-semibold mt-0.5">{inDiscussion} leads</p>
                                <p className="text-[9px] text-white/30 mt-1 font-sans">Currently reviewing details or in touch.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0 mt-1" />
                            <div>
                                <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Stage 3: Resolved</p>
                                <p className="text-lg font-semibold mt-0.5">{convertedLeads} leads</p>
                                <p className="text-[9px] text-white/30 mt-1 font-sans">Successfully completed and converted.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Side-by-side Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent orders */}
                <div className="space-y-4 bg-[#18181b] border border-white/5 rounded-xl p-6">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">Recent Orders</h3>
                        <Activity size={14} className="text-blue-400" />
                    </div>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                        {orders.slice(0, 5).map(o => (
                            <div key={o.id} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 hover:border-white/10 border border-transparent transition-all text-sm">
                                <div className="space-y-1">
                                    <p className="font-bold text-[#F27D26]">{o.orderNumber?.slice(-8)}</p>
                                    <p className="text-xs text-white/45">{o.user?.firstName} {o.user?.lastName}</p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="font-semibold text-white">₹{Number(o.total || 0).toLocaleString()}</p>
                                    <p className={`text-[9px] font-black uppercase tracking-wider ${ORDER_STATUS_COLOR[o.status] || 'text-white/40'}`}>{o.status}</p>
                                </div>
                            </div>
                        ))}
                        {orders.length === 0 && <p className="text-sm text-white/40 py-4 text-center">No orders yet.</p>}
                    </div>
                </div>

                {/* Recent tickets */}
                <div className="space-y-4 bg-[#18181b] border border-white/5 rounded-xl p-6">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">Support Backlog</h3>
                        <Activity size={14} className="text-amber-400" />
                    </div>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                        {tickets.slice(0, 5).map(t => {
                            const cfg = TICKET_STATUS[t.status] || TICKET_STATUS.OPEN;
                            return (
                                <div key={t.id} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 hover:border-white/10 border border-transparent transition-all text-sm">
                                    <div className="space-y-1 flex-1 min-w-0 pr-4">
                                        <p className="font-bold text-white/80 truncate">{t.subject}</p>
                                        <p className="text-xs text-white/45">{t.ticketNumber} · {t.user?.email || 'Guest'}</p>
                                    </div>
                                    <div className="text-right space-y-1 shrink-0">
                                        <span className={`inline-block text-[8px] font-black uppercase tracking-wider px-2 py-0.5 border rounded-full ${cfg.color}`}>
                                            {cfg.label}
                                        </span>
                                        <p className="text-[8px] text-white/20">{new Date(t.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            );
                        })}
                        {tickets.length === 0 && <p className="text-sm text-white/40 py-4 text-center">No tickets yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
