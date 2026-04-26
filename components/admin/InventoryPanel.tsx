"use client";

import React, { useState } from "react";
import { RefreshCw, AlertTriangle, Package } from "lucide-react";
import { useInventory, useProducts, apiFetch, AdminSpinner, AdminEmpty, AdminError } from "./shared";

export default function InventoryPanel() {
    const { items: lowStock, loading: lsLoading, error: lsError, reload: reloadLs } = useInventory();
    const { products, loading: pLoading, reload: reloadProducts } = useProducts();
    const [adjusting, setAdjusting] = useState<string | null>(null);
    const [adjustQty, setAdjustQty] = useState<Record<string, string>>({});

    const handleAdjust = async (productId: string) => {
        const qty = parseInt(adjustQty[productId] || "0");
        if (!qty) return;
        setAdjusting(productId);
        try {
            await apiFetch(`/inventory/${productId}`, {
                method: 'PATCH',
                body: JSON.stringify({ quantity: qty }),
            });
            reloadLs();
            reloadProducts();
            setAdjustQty(prev => ({ ...prev, [productId]: "" }));
        } catch (e) { console.error(e); }
        finally { setAdjusting(null); }
    };

    const loading = lsLoading || pLoading;

    return (
        <div className="space-y-10">
            {/* Low Stock Alerts */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-red-400">Low Stock Alerts</h3>
                        <p className="text-[10px] opacity-40 font-sans uppercase tracking-widest">Items below threshold</p>
                    </div>
                    <button onClick={() => { reloadLs(); reloadProducts(); }} className="p-3 border border-white/10 hover:bg-white/5 rounded-lg transition-all text-white/40">
                        <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>

                {lsError && <AdminError message={lsError} />}

                {lsLoading ? <AdminSpinner /> : lowStock.length === 0 ? (
                    <div className="bg-green-500/5 border border-green-500/10 p-8 text-center">
                        <p className="text-green-400 text-sm font-medium">All stock levels healthy</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {lowStock.map((item: any) => (
                            <div key={item.id} className="bg-[#18181b] rounded-xl border border-red-500/10 p-6 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <p className="font-semibold text-sm">{item.product?.name || item.variant?.name || 'Unknown'}</p>
                                        <p className="text-xs opacity-30 uppercase tracking-widest">{item.product?.sku || '—'}</p>
                                    </div>
                                    <AlertTriangle size={16} className="text-red-400 shrink-0" />
                                </div>
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[8px] font-sans uppercase text-white/30">Current</p>
                                        <p className="text-xl font-semibold tracking-tight text-red-400">{item.quantity}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[8px] font-sans uppercase text-white/30">Reserved</p>
                                        <p className="text-xl font-semibold tracking-tight text-amber-400">{item.reservedQuantity}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[8px] font-sans uppercase text-white/30">Threshold</p>
                                        <p className="text-xl font-semibold tracking-tight opacity-40">{item.lowStockThreshold}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Full Inventory Table */}
            <div className="space-y-6">
                <h3 className="text-sm font-semibold text-[#F27D26]">All Product Stock</h3>

                {pLoading ? <AdminSpinner /> : (
                    <div className="space-y-2">
                        <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-[#27272a] rounded-t-xl border border-white/5 text-white/30">
                            <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">SKU</span>
                            <span className="col-span-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Product</span>
                            <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">In Stock</span>
                            <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Reserved</span>
                            <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Available</span>
                            <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Threshold</span>
                            <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Health</span>
                            <span className="col-span-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Set Stock</span>
                        </div>

                        {products.map(product => {
                            const inv = product.inventory;
                            const qty = inv?.quantity ?? 0;
                            const reserved = inv?.reservedQuantity ?? 0;
                            const available = qty - reserved;
                            const threshold = inv?.lowStockThreshold ?? 10;
                            const isLow = qty <= threshold;

                            return (
                                <div key={product.id} className="grid grid-cols-12 gap-3 px-5 py-4 bg-[#18181b] rounded-xl border border-white/5 hover:border-[#F27D26]/40 transition-all items-center">
                                    <span className="col-span-1 text-sm text-[#F27D26] font-black truncate">{product.sku}</span>
                                    <span className="col-span-3 font-medium text-sm text-white/90 truncate">{product.name}</span>
                                    <span className={`col-span-1 text-sm font-bold ${isLow ? 'text-red-400' : 'text-green-400'}`}>{qty}</span>
                                    <span className="col-span-1 text-sm text-amber-400">{reserved}</span>
                                    <span className="col-span-1 text-sm font-bold">{available}</span>
                                    <span className="col-span-1 text-sm opacity-40">{threshold}</span>
                                    <span className="col-span-1">
                                        <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md ${
                                            qty === 0 ? 'bg-red-500/20 text-red-400' :
                                            isLow ? 'bg-amber-500/10 text-amber-400' :
                                            'bg-green-500/10 text-green-400'
                                        }`}>
                                            {qty === 0 ? 'Out' : isLow ? 'Low' : 'OK'}
                                        </span>
                                    </span>
                                    <div className="col-span-3 flex gap-2">
                                        <input
                                            type="number" placeholder="Qty"
                                            value={adjustQty[product.id] || ""}
                                            onChange={e => setAdjustQty(prev => ({ ...prev, [product.id]: e.target.value }))}
                                            className="w-20 bg-[#27272a] border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F27D26]"
                                        />
                                        <button
                                            disabled={adjusting === product.id}
                                            onClick={() => handleAdjust(product.id)}
                                            className="px-4 py-2 bg-[#F27D26] text-white text-xs font-medium px-2.5 py-1 rounded-md tracking-widest hover:bg-[#F27D26]/80 transition-all disabled:opacity-30"
                                        >
                                            {adjusting === product.id ? '...' : 'Update'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
