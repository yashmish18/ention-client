"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, RefreshCw, Star, MessageSquare } from "lucide-react";
import { apiFetch, REVIEW_STATUS_COLOR, AdminSpinner, AdminEmpty, AdminError } from "./shared";

export default function ReviewsPanel() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState("all");
    const [updating, setUpdating] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            // Reviews are loaded from the products endpoint, or we can use orders which include reviews
            // For now, fetch all products and aggregate their reviews
            const data = await apiFetch('/products');
            const products = Array.isArray(data) ? data : data?.products || [];
            const allReviews: any[] = [];
            products.forEach((p: any) => {
                (p.reviews || []).forEach((r: any) => {
                    allReviews.push({ ...r, productName: p.name, productSlug: p.slug });
                });
            });
            setReviews(allReviews);
        } catch (e: any) {
            setError(e.message);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);

    const filtered = reviews.filter(r => filter === "all" || r.status === filter);

    const updateStatus = async (reviewId: string, status: string) => {
        setUpdating(reviewId);
        try {
            await apiFetch(`/reviews/admin/${reviewId}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status }),
            });
            load();
        } catch (e: any) { alert(`Failed: ${e.message}`); }
        finally { setUpdating(null); }
    };

    const avgRating = reviews.length > 0
        ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1)
        : '0.0';

    return (
        <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-6 space-y-2">
                    <p className="text-xs font-medium text-white/50">Total Reviews</p>
                    <p className="text-2xl font-semibold tracking-tight">{reviews.length}</p>
                </div>
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-6 space-y-2">
                    <p className="text-xs font-medium text-white/50">Average Rating</p>
                    <div className="flex items-center gap-2">
                        <p className="text-2xl font-semibold tracking-tight text-[#F27D26]">{avgRating}</p>
                        <Star size={16} className="text-[#F27D26]" fill="currentColor" />
                    </div>
                </div>
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-6 space-y-2">
                    <p className="text-xs font-medium text-white/50">Pending Moderation</p>
                    <p className="text-2xl font-semibold tracking-tight text-amber-400">{reviews.filter(r => r.status === 'PENDING').length}</p>
                </div>
                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-6 space-y-2">
                    <p className="text-xs font-medium text-white/50">Approved</p>
                    <p className="text-2xl font-semibold tracking-tight text-green-400">{reviews.filter(r => r.status === 'APPROVED').length}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
                {["all", "PENDING", "APPROVED", "REJECTED"].map(s => (
                    <button key={s} onClick={() => setFilter(s)}
                        className={`px-3 py-2 text-xs font-medium px-2.5 py-1 rounded-md tracking-widest transition-all ${filter === s ? "bg-white text-black" : "border border-white/10 hover:border-white/30 text-white/50"}`}>
                        {s === "all" ? "All" : s} ({s === "all" ? reviews.length : reviews.filter(r => r.status === s).length})
                    </button>
                ))}
                <button onClick={load} className="ml-auto p-2 border border-white/10 hover:bg-white/5 rounded-lg text-white/40">
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {error && <AdminError message={error} />}

            {loading ? <AdminSpinner /> : filtered.length === 0 ? (
                <AdminEmpty icon={MessageSquare} message="No reviews found." />
            ) : (
                <div className="space-y-3">
                    {filtered.map(review => (
                        <div key={review.id} className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-6 space-y-4 hover:border-[#F27D26]/30 transition-all">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <p className="font-semibold text-sm">{review.productName}</p>
                                    <p className="text-sm opacity-40">{review.user?.email || 'Anonymous'} · {new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} className={i < review.rating ? 'text-[#F27D26]' : 'text-white/10'} fill="currentColor" />
                                        ))}
                                    </div>
                                    <span className={`text-[11px] font-medium px-2.5 py-0.5 border rounded-md ${REVIEW_STATUS_COLOR[review.status] || 'text-white/40'}`}>
                                        {review.status}
                                    </span>
                                </div>
                            </div>
                            {review.title && <p className="font-bold text-sm">{review.title}</p>}
                            {review.body && <p className="text-sm opacity-60 leading-relaxed font-sans">"{review.body}"</p>}
                            <div className="flex gap-2 pt-2 border-t border-white/5">
                                {review.status !== 'APPROVED' && (
                                    <button disabled={updating === review.id} onClick={() => updateStatus(review.id, 'APPROVED')}
                                        className="px-4 py-2 bg-green-600 text-white text-xs font-medium px-2.5 py-1 rounded-md tracking-widest hover:bg-green-500 disabled:opacity-30">
                                        Approve
                                    </button>
                                )}
                                {review.status !== 'REJECTED' && (
                                    <button disabled={updating === review.id} onClick={() => updateStatus(review.id, 'REJECTED')}
                                        className="px-4 py-2 bg-red-600 text-white text-xs font-medium px-2.5 py-1 rounded-md tracking-widest hover:bg-red-500 disabled:opacity-30">
                                        Reject
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
