"use client";

import React, { useState } from "react";
import { Search, RefreshCw, Package, CheckCircle2, XCircle } from "lucide-react";
import { useProducts, apiFetch, AdminSpinner, AdminEmpty, AdminError } from "./shared";

export default function ProductsPanel() {
    const { products, loading, error, reload } = useProducts();
    const [query, setQuery] = useState("");
    const [toggling, setToggling] = useState<string | null>(null);

    const filtered = products.filter(p =>
        p.name?.toLowerCase().includes(query.toLowerCase()) ||
        p.sku?.toLowerCase().includes(query.toLowerCase()) ||
        p.slug?.toLowerCase().includes(query.toLowerCase())
    );

    const toggleActive = async (productId: string, isActive: boolean) => {
        setToggling(productId);
        try {
            await apiFetch(`/products/${productId}`, {
                method: 'PATCH',
                body: JSON.stringify({ isActive: !isActive }),
            });
            reload();
        } catch (e) { console.error(e); }
        finally { setToggling(null); }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-4">
                <div className="relative w-96">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <input
                        type="text" placeholder="Search by name, SKU, or slug..."
                        value={query} onChange={e => setQuery(e.target.value)}
                        className="w-full bg-[#27272a] border border-white/5 rounded-lg pl-12 pr-4 py-3 text-sm uppercase tracking-widest focus:outline-none focus:border-[#F27D26] transition-all"
                    />
                </div>
                <button onClick={reload} className="p-3 border border-white/10 hover:bg-white/5 rounded-lg transition-all text-white/40">
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {error && <AdminError message={error} />}

            {loading ? <AdminSpinner /> : filtered.length === 0 ? (
                <AdminEmpty icon={Package} message="No products found." />
            ) : (
                <div className="space-y-2">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-[#27272a] rounded-t-xl border border-white/5 text-white/30">
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">SKU</span>
                        <span className="col-span-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Name</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Category</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Base Price</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Sale Price</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Stock</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Variants</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Featured</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Status</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Action</span>
                    </div>

                    {filtered.map(product => (
                        <div key={product.id} className="grid grid-cols-12 gap-3 px-5 py-4 bg-[#18181b] rounded-xl border border-white/5 hover:border-[#F27D26]/40 transition-all items-center">
                            <span className="col-span-1 text-sm text-[#F27D26] font-black truncate">{product.sku}</span>
                            <div className="col-span-3 space-y-1">
                                <p className="font-medium text-sm text-white/90 truncate">{product.name}</p>
                                <p className="text-xs opacity-30 truncate">{product.slug}</p>
                            </div>
                            <span className="col-span-1 text-sm opacity-50 truncate">{product.category?.name || '—'}</span>
                            <span className="col-span-1 text-sm font-bold">₹{Number(product.basePrice).toLocaleString()}</span>
                            <span className="col-span-1 text-sm opacity-50">{product.salePrice ? `₹${Number(product.salePrice).toLocaleString()}` : '—'}</span>
                            <span className="col-span-1 text-sm">
                                <span className={`${(product.inventory?.quantity || 0) <= (product.inventory?.lowStockThreshold || 10) ? 'text-red-400' : 'text-green-400'}`}>
                                    {product.inventory?.quantity ?? '—'}
                                </span>
                            </span>
                            <span className="col-span-1 text-sm opacity-50">{product.variants?.length || 0}</span>
                            <span className="col-span-1">
                                {product.isFeatured ? <CheckCircle2 size={12} className="text-[#F27D26]" /> : <span className="text-[8px] opacity-20">—</span>}
                            </span>
                            <span className="col-span-1">
                                <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md ${product.isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {product.isActive ? 'Live' : 'Draft'}
                                </span>
                            </span>
                            <div className="col-span-1">
                                <button
                                    disabled={toggling === product.id}
                                    onClick={() => toggleActive(product.id, product.isActive)}
                                    className={`text-[8px] font-sans font-black uppercase tracking-widest px-3 py-1 border transition-all ${
                                        product.isActive
                                            ? 'border-red-500/20 text-red-400 hover:bg-red-500/10'
                                            : 'border-green-500/20 text-green-400 hover:bg-green-500/10'
                                    }`}
                                >
                                    {product.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
