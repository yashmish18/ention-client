"use client";

import React, { useState } from "react";
import { Store, Globe, Mail, Phone, MapPin, CreditCard, Truck, Shield, Bell, Save } from "lucide-react";

export default function SettingsPanel() {
    const [activeTab, setActiveTab] = useState("store");
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const tabs = [
        { id: "store", label: "Store Info", icon: Store },
        { id: "payment", label: "Payments", icon: CreditCard },
        { id: "shipping", label: "Shipping", icon: Truck },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Shield },
    ];

    return (
        <div className="space-y-8">
            {/* Tab Nav */}
            <div className="flex gap-2 flex-wrap border-b border-white/5 pb-4">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 text-[9px] font-black uppercase tracking-widest transition-all ${
                            activeTab === tab.id ? "bg-white text-black" : "border border-white/10 hover:border-white/30 text-white/50"
                        }`}>
                        <tab.icon size={12} /> {tab.label}
                    </button>
                ))}
            </div>

            {/* Store Information */}
            {activeTab === "store" && (
                <div className="space-y-8">
                    <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                        <h3 className="text-sm font-semibold text-[#F27D26]">Store Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50 flex items-center gap-2"><Store size={10} /> Store Name</label>
                                <input defaultValue="Ention" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50 flex items-center gap-2"><Globe size={10} /> Website URL</label>
                                <input defaultValue="https://ention.in" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50 flex items-center gap-2"><Mail size={10} /> Support Email</label>
                                <input defaultValue="support@ention.in" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50 flex items-center gap-2"><Phone size={10} /> Support Phone</label>
                                <input defaultValue="+91 XXXX XXXX XX" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-medium text-white/50 flex items-center gap-2"><MapPin size={10} /> Registered Address</label>
                                <textarea rows={2} defaultValue="Ention Technologies, India" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26] resize-none" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                        <h3 className="text-sm font-semibold text-[#F27D26]">Tax & Legal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">GST Number</label>
                                <input placeholder="GSTIN" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">PAN Number</label>
                                <input placeholder="PAN" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">Default Tax Rate (%)</label>
                                <input type="number" defaultValue="18" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                        <h3 className="text-sm font-semibold text-[#F27D26]">Currency & Locale</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">Default Currency</label>
                                <select defaultValue="INR" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]">
                                    <option value="INR">INR (₹)</option>
                                    <option value="USD">USD ($)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">Timezone</label>
                                <select defaultValue="Asia/Kolkata" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]">
                                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                    <option value="UTC">UTC</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">Date Format</label>
                                <select defaultValue="DD/MM/YYYY" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]">
                                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Payments Settings */}
            {activeTab === "payment" && (
                <div className="space-y-8">
                    <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                        <h3 className="text-sm font-semibold text-[#F27D26]">Razorpay Configuration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">Razorpay Key ID</label>
                                <input type="password" placeholder="rzp_live_XXXXXXXX" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">Razorpay Secret</label>
                                <input type="password" placeholder="••••••••••••" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                        <h3 className="text-sm font-semibold text-[#F27D26]">Payment Methods</h3>
                        <div className="space-y-4">
                            {[
                                { method: "Razorpay (UPI, Cards, NetBanking)", enabled: true },
                                { method: "Cash on Delivery", enabled: true },
                                { method: "Wallet", enabled: false },
                            ].map((m, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-[#27272a] rounded-t-xl border border-white/5">
                                    <span className="text-sm uppercase tracking-widest">{m.method}</span>
                                    <button className={`text-xs font-medium px-2.5 py-1 rounded-md tracking-widest px-4 py-2 rounded-md transition-all ${
                                        m.enabled ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-white/30 border border-white/10'
                                    }`}>
                                        {m.enabled ? 'Enabled' : 'Disabled'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Shipping Settings */}
            {activeTab === "shipping" && (
                <div className="space-y-8">
                    <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                        <h3 className="text-sm font-semibold text-[#F27D26]">Shipping Configuration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">Default Carrier</label>
                                <select defaultValue="Delhivery" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]">
                                    <option>Delhivery</option>
                                    <option>BlueDart</option>
                                    <option>DTDC</option>
                                    <option>India Post</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">Default Shipping Charge</label>
                                <input type="number" defaultValue="0" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">Free Shipping Above (₹)</label>
                                <input type="number" defaultValue="0" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">Estimated Delivery (Days)</label>
                                <input type="number" defaultValue="5" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                        <h3 className="text-sm font-semibold text-[#F27D26]">Return Policy</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">Return Window (Days)</label>
                                <input type="number" defaultValue="7" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">Refund Processing (Days)</label>
                                <input type="number" defaultValue="5" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                    <h3 className="text-sm font-semibold text-[#F27D26]">Email Notifications</h3>
                    <div className="space-y-4">
                        {[
                            { event: "New Order Placed", desc: "Email admin on every new order", enabled: true },
                            { event: "Order Status Changed", desc: "Notify customer when order status updates", enabled: true },
                            { event: "Low Stock Alert", desc: "Alert admin when stock falls below threshold", enabled: true },
                            { event: "New Support Ticket", desc: "Notify admin of new help desk tickets", enabled: true },
                            { event: "New Review Submitted", desc: "Alert for review moderation queue", enabled: false },
                            { event: "Refund Processed", desc: "Notify customer when refund is completed", enabled: true },
                        ].map((n, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-[#27272a] rounded-t-xl border border-white/5">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">{n.event}</p>
                                    <p className="text-xs opacity-30">{n.desc}</p>
                                </div>
                                <button className={`text-xs font-medium px-2.5 py-1 rounded-md tracking-widest px-4 py-2 rounded-md transition-all ${
                                    n.enabled ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-white/30 border border-white/10'
                                }`}>
                                    {n.enabled ? 'On' : 'Off'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
                <div className="space-y-8">
                    <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                        <h3 className="text-sm font-semibold text-[#F27D26]">Session & Auth</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">JWT Token Expiry</label>
                                <select defaultValue="1h" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]">
                                    <option value="30m">30 Minutes</option>
                                    <option value="1h">1 Hour</option>
                                    <option value="24h">24 Hours</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/50">Refresh Token Expiry</label>
                                <select defaultValue="7d" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]">
                                    <option value="7d">7 Days</option>
                                    <option value="30d">30 Days</option>
                                    <option value="90d">90 Days</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                        <h3 className="text-sm font-semibold text-[#F27D26]">Admin Access</h3>
                        <div className="space-y-4">
                            {[
                                { label: "Require 2FA for Admin Login", enabled: false },
                                { label: "IP Whitelist for Admin Panel", enabled: false },
                                { label: "Audit Log All Admin Actions", enabled: true },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-[#27272a] rounded-t-xl border border-white/5">
                                    <span className="text-sm uppercase tracking-widest">{s.label}</span>
                                    <button className={`text-xs font-medium px-2.5 py-1 rounded-md tracking-widest px-4 py-2 rounded-md transition-all ${
                                        s.enabled ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-white/30 border border-white/10'
                                    }`}>
                                        {s.enabled ? 'Enabled' : 'Disabled'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-white/5">
                <button onClick={handleSave}
                    className={`flex items-center gap-2 px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                        saved ? 'bg-green-600 text-white' : 'bg-[#F27D26] text-white hover:bg-[#F27D26]/80'
                    }`}>
                    <Save size={14} /> {saved ? 'Saved!' : 'Save Settings'}
                </button>
            </div>
        </div>
    );
}
