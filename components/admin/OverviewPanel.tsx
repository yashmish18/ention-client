"use client";

import React from "react";
import { ShoppingBag, Ticket, Users, TrendingUp } from "lucide-react";
import { TICKET_STATUS, ORDER_STATUS_COLOR } from "./shared";

export default function OverviewPanel({ tickets, orders, users }: { tickets: any[]; orders: any[]; users: any[] }) {
    const stats = [
        { label: "Successful Sales", value: orders.length, icon: ShoppingBag, color: "text-blue-400" },
        { label: "People Needing Help", value: tickets.filter(t => !['CLOSED', 'COMPLETED'].includes(t.status)).length, icon: Ticket, color: "text-amber-400" },
        { label: "Total Customers", value: users.length, icon: Users, color: "text-green-400" },
        { label: "Estimated Earnings", value: `₹${(orders.reduce((s, o) => s + Number(o.total || 0), 0) / 100000).toFixed(1)}L`, icon: TrendingUp, color: "text-[#F27D26]" },
    ];

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-6 space-y-4">
                        <s.icon size={20} className={s.color} />
                        <div>
                            <p className="text-xs font-medium text-white/40">{s.label}</p>
                            <p className="text-xl font-semibold tracking-tight mt-1">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent orders */}
            <div className="space-y-4">
                <h3 className="text-xs font-medium text-white/40 font-black">Recent Orders</h3>
                {orders.slice(0, 5).map(o => (
                    <div key={o.id} className="flex items-center gap-4 bg-[#18181b] rounded-xl border border-white/5 px-5 py-4 hover:border-[#F27D26]/30 transition-all">
                        <span className="text-sm text-[#F27D26] font-bold">{o.orderNumber?.slice(-8)}</span>
                        <span className="font-medium text-sm text-white/90 flex-1 truncate opacity-80">{o.user?.firstName} {o.user?.lastName}</span>
                        <span className="text-sm font-bold">₹{Number(o.total || 0).toLocaleString()}</span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-md tracking-widest ${ORDER_STATUS_COLOR[o.status] || 'text-white/40'}`}>{o.status}</span>
                    </div>
                ))}
                {orders.length === 0 && <p className="text-sm text-white/40">No orders yet.</p>}
            </div>

            {/* Recent tickets */}
            <div className="space-y-4">
                <h3 className="text-xs font-medium text-white/40 font-black">Recent Tickets</h3>
                {tickets.slice(0, 5).map(t => {
                    const cfg = TICKET_STATUS[t.status] || TICKET_STATUS.OPEN;
                    const Icon = cfg.icon;
                    return (
                        <div key={t.id} className="flex items-center gap-4 bg-[#18181b] rounded-xl border border-white/5 px-5 py-4 hover:border-[#F27D26]/30 transition-all">
                            <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md tracking-widest px-2 py-1 border rounded-md ${cfg.color}`}>
                                <Icon size={10} /> {cfg.label}
                            </span>
                            <span className="text-sm text-[#F27D26] font-bold">{t.ticketNumber}</span>
                            <span className="font-medium text-sm text-white/90 flex-1 truncate opacity-80">{t.subject}</span>
                            <span className="text-sm opacity-30">{t.user?.email}</span>
                        </div>
                    );
                })}
                {tickets.length === 0 && <p className="text-sm text-white/40">No tickets yet.</p>}
            </div>
        </div>
    );
}
