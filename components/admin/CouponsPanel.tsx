"use client";

import React, { useState } from "react";
import { RefreshCw, Tag, Plus } from "lucide-react";
import { useCoupons, apiFetch, AdminSpinner, AdminEmpty, AdminError } from "./shared";

export default function CouponsPanel() {
    const { coupons, loading, error, reload } = useCoupons();
    const [showCreate, setShowCreate] = useState(false);
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState({
        code: "", description: "", type: "FLAT", value: "", minCartValue: "0",
        maxDiscount: "", usageLimit: "", perUserLimit: "1", expiresAt: "",
    });

    const handleCreate = async () => {
        if (!form.code || !form.value || !form.expiresAt) return alert("Code, value, and expiry date are required");
        setCreating(true);
        try {
            await apiFetch('/coupons', {
                method: 'POST',
                body: JSON.stringify({
                    ...form,
                    value: parseFloat(form.value),
                    minCartValue: parseFloat(form.minCartValue || "0"),
                    maxDiscount: form.maxDiscount ? parseFloat(form.maxDiscount) : null,
                    usageLimit: form.usageLimit ? parseInt(form.usageLimit) : null,
                    perUserLimit: parseInt(form.perUserLimit || "1"),
                }),
            });
            setShowCreate(false);
            setForm({ code: "", description: "", type: "FLAT", value: "", minCartValue: "0", maxDiscount: "", usageLimit: "", perUserLimit: "1", expiresAt: "" });
            reload();
        } catch (e: any) { alert(`Failed: ${e.message}`); }
        finally { setCreating(false); }
    };

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex justify-between items-center">
                <button onClick={() => setShowCreate(!showCreate)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#F27D26] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#F27D26]/80 transition-all">
                    <Plus size={14} /> Create Coupon
                </button>
                <button onClick={reload} className="p-3 border border-white/10 hover:bg-white/5 rounded-lg text-white/40">
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {/* Create Coupon Form */}
            {showCreate && (
                <div className="bg-[#18181b] rounded-xl border border-[#F27D26]/20 p-8 space-y-6">
                    <h3 className="text-sm font-semibold text-[#F27D26]">New Coupon</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/50">Code *</label>
                            <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                                placeholder="SUMMER2026" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm uppercase focus:outline-none focus:border-[#F27D26]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/50">Type</label>
                            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                                className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm uppercase focus:outline-none focus:border-[#F27D26]">
                                <option value="FLAT">Flat (₹)</option>
                                <option value="PERCENTAGE">Percentage (%)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/50">Value *</label>
                            <input type="number" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                                placeholder={form.type === 'FLAT' ? "₹ 500" : "10%"} className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/50">Min Cart Value</label>
                            <input type="number" value={form.minCartValue} onChange={e => setForm(f => ({ ...f, minCartValue: e.target.value }))}
                                className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/50">Max Discount</label>
                            <input type="number" value={form.maxDiscount} onChange={e => setForm(f => ({ ...f, maxDiscount: e.target.value }))}
                                placeholder="Optional" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/50">Expires At *</label>
                            <input type="date" value={form.expiresAt} onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))}
                                className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/50">Total Usage Limit</label>
                            <input type="number" value={form.usageLimit} onChange={e => setForm(f => ({ ...f, usageLimit: e.target.value }))}
                                placeholder="Unlimited" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/50">Per User Limit</label>
                            <input type="number" value={form.perUserLimit} onChange={e => setForm(f => ({ ...f, perUserLimit: e.target.value }))}
                                className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                        </div>
                        <div className="space-y-2 md:col-span-3">
                            <label className="text-xs font-medium text-white/50">Description</label>
                            <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                placeholder="Optional description" className="w-full bg-[#27272a] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26]" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button disabled={creating} onClick={handleCreate}
                            className="px-8 py-3 bg-[#F27D26] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#F27D26]/80 disabled:opacity-30">
                            {creating ? 'Creating...' : 'Create Coupon'}
                        </button>
                        <button onClick={() => setShowCreate(false)}
                            className="px-8 py-3 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest hover:text-white">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {error && <AdminError message={error} />}

            {/* Coupon Table */}
            {loading ? <AdminSpinner /> : coupons.length === 0 ? (
                <AdminEmpty icon={Tag} message="No coupons created yet." />
            ) : (
                <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-[#27272a] rounded-t-xl border border-white/5 text-white/30">
                        <span className="col-span-2 text-xs font-semibold text-white/50 uppercase tracking-wider">Code</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Type</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Value</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Min Cart</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Used</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Limit</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Status</span>
                        <span className="col-span-2 text-xs font-semibold text-white/50 uppercase tracking-wider">Expires</span>
                        <span className="col-span-2 text-xs font-semibold text-white/50 uppercase tracking-wider">Description</span>
                    </div>

                    {coupons.map((coupon: any) => {
                        const isExpired = new Date(coupon.expiresAt) < new Date();
                        const isExhausted = coupon.usageLimit && coupon.usageCount >= coupon.usageLimit;
                        return (
                            <div key={coupon.id} className="grid grid-cols-12 gap-3 px-5 py-4 bg-[#18181b] rounded-xl border border-white/5 hover:border-[#F27D26]/40 transition-all items-center">
                                <span className="col-span-2 text-sm text-[#F27D26] font-black">{coupon.code}</span>
                                <span className="col-span-1 text-sm opacity-50 uppercase">{coupon.type}</span>
                                <span className="col-span-1 text-sm font-bold">
                                    {coupon.type === 'FLAT' ? `₹${Number(coupon.value).toLocaleString()}` : `${coupon.value}%`}
                                </span>
                                <span className="col-span-1 text-sm opacity-50">₹{Number(coupon.minCartValue).toLocaleString()}</span>
                                <span className="col-span-1 text-sm font-bold">{coupon.usageCount}</span>
                                <span className="col-span-1 text-sm opacity-40">{coupon.usageLimit || '∞'}</span>
                                <span className="col-span-1">
                                    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md ${
                                        isExpired || isExhausted ? 'bg-red-500/10 text-red-400' :
                                        coupon.isActive ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-white/30'
                                    }`}>
                                        {isExpired ? 'Expired' : isExhausted ? 'Used Up' : coupon.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </span>
                                <span className="col-span-2 text-xs opacity-30">{new Date(coupon.expiresAt).toLocaleDateString()}</span>
                                <span className="col-span-2 text-xs opacity-40 truncate">{coupon.description || '—'}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
