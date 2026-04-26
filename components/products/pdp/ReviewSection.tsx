"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, User, Send, Loader2, Plus } from "lucide-react";
import { fetchProductReviews, submitReview } from "@/lib/api";

interface Review {
    id?: string;
    _id?: string;
    user: string;
    role: string;
    content: string;
    recommendation: string;
    rating: number;
    date?: string;
    createdAt?: string;
}

export default function ReviewSection({ product }: { product: any }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        user: "",
        role: "",
        content: "",
        rating: 5
    });

    useEffect(() => {
        if (!product?.id) return;
        fetchProductReviews(product.id)
            .then(data => {
                if (Array.isArray(data)) setReviews(data);
            })
            .catch(() => setReviews([]))
            .finally(() => setLoading(false));
    }, [product?.id]);

    const averageRating = reviews.length > 0 
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "5.0";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const newReviewResponse = await submitReview(product.id, formData);
            if (newReviewResponse) {
                setReviews([newReviewResponse, ...reviews]);
                setIsFormOpen(false);
                setFormData({ user: "", role: "", content: "", rating: 5 });
            }
        } catch (error) {
            alert("Failed to submit review. Ensure you are logged in.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-white py-32 lg:py-48 px-12 border-t border-black/5">
            <div className="max-w-7xl mx-auto space-y-32">
                {/* Header Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <span className="text-[#F27D26] uppercase tracking-[0.6em] font-black text-[10px]">Customer Feedback</span>
                        <div className="h-[1px] w-12 bg-black/10" />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="space-y-4">
                            <h2 className="text-6xl md:text-8xl font-serif font-bold italic leading-[0.8] tracking-tighter">Reviews.</h2>
                        </div>

                        <div className="flex flex-col items-end gap-6">
                            <div className="flex items-center gap-6 pb-4 border-b border-black/10 w-full justify-end">
                                <div className="flex gap-1 text-[#F27D26]">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <span className="text-[12px] font-mono font-bold">{averageRating} AVERAGE RATING</span>
                            </div>
                            <button
                                onClick={() => setIsFormOpen(!isFormOpen)}
                                className="bg-[#141414] text-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-[#F27D26] transition-all flex items-center gap-4"
                            >
                                {isFormOpen ? "Cancel" : "Write a Review"} <Plus size={16} className={isFormOpen ? "rotate-45 transition-transform" : ""} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Submission Form */}
                <AnimatePresence>
                    {isFormOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-b border-black/5"
                        >
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-24">
                                <div className="space-y-10">
                                    <h3 className="text-2xl font-serif font-bold italic">Share your experience.</h3>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Your Name</label>
                                            <input
                                                required
                                                value={formData.user}
                                                onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                                                className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-[#F27D26]"
                                                placeholder="e.g. Vikram R."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Your Profession</label>
                                            <input
                                                required
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                className="w-full bg-[#FAF9F6] border border-black/10 p-4 text-sm font-serif outline-none focus:border-[#F27D26]"
                                                placeholder="e.g. Designer"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-10">
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase font-black tracking-widest text-black/40">Review Message</label>
                                        <textarea
                                            required
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            className="w-full bg-[#FAF9F6] border border-black/10 p-4 h-40 text-sm font-serif outline-none focus:border-[#F27D26] resize-none"
                                            placeholder="What do you think about the performance and quality?"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center bg-[#FAF9F6] p-6 border border-black/[0.03]">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black uppercase tracking-widest">Rating</p>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, rating: s })}
                                                        className={`transition-colors ${formData.rating >= s ? "text-[#F27D26]" : "text-black/10"}`}
                                                    >
                                                        <Star size={18} fill={formData.rating >= s ? "currentColor" : "none"} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="bg-[#141414] text-white px-10 py-6 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center gap-4 hover:bg-[#F27D26]"
                                        >
                                            {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={16} /> Post Review</>}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Review Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <AnimatePresence mode="popLayout">
                        {reviews.map((rev, i) => (
                            <motion.div
                                key={rev.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-[#FAF9F6] p-12 space-y-12 border border-black/[0.03] flex flex-col justify-between group hover:border-[#F27D26]/20 transition-all relative"
                            >
                                <div className="space-y-8">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-1 text-[#F27D26]">
                                            {[...Array(5)].map((_, j) => (
                                                <Star key={j} size={12} fill={j < rev.rating ? "currentColor" : "none"} className={j < rev.rating ? "" : "text-black/10"} />
                                            ))}
                                        </div>
                                        <span className="text-[8px] font-mono text-black/20 uppercase tracking-widest">{rev.date}</span>
                                    </div>
                                    <p className="text-lg font-serif italic text-black/80 leading-relaxed min-h-[120px]">
                                        "{rev.content}"
                                    </p>
                                </div>

                                <div className="space-y-6 pt-12 border-t border-black/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full border border-black/5">
                                            <User size={18} className="text-black/10" />
                                        </div>
                                        <div>
                                            <p className="text-[12px] font-bold uppercase tracking-tight">{rev.user}</p>
                                            <p className="text-[9px] uppercase tracking-widest text-black/40 font-mono">{rev.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={14} className="text-[#F27D26]" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#F27D26]">{rev.recommendation}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
