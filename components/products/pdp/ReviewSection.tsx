"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, User, Send, Loader2, Plus } from "lucide-react";
import { submitReview } from "@/lib/api";

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
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
        fetch(`${API_URL}/reviews?productId=${product.id}`)
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(body => {
                const data = body.data?.reviews || (Array.isArray(body.data) ? body.data : []);
                setReviews(data);
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
        <section className="bg-transparent py-24 px-6 md:px-12 lg:px-16 border-t border-[#C8BFB0]/30">
            <div className="max-w-7xl mx-auto space-y-16">
                {/* Header Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <span className="text-[#B5843A] uppercase tracking-[0.4em] font-bold text-[10px]">Customer Feedback</span>
                        <div className="h-[1px] w-12 bg-[#C8BFB0]" />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="space-y-4">
                            <h2 
                                className="text-4xl md:text-5xl font-serif font-semibold italic leading-[0.92] tracking-tight text-[#1A1714]"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                Reviews.
                            </h2>
                        </div>

                        <div className="flex flex-col items-end gap-4">
                            <div className="flex items-center gap-6 pb-4 border-b border-[#C8BFB0] w-full justify-end">
                                <div className="flex gap-1 text-[#B5843A]">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <span className="text-[10px] font-mono font-bold tracking-wider text-[#6B6258]">
                                    AVERAGE RATING {averageRating}
                                </span>
                            </div>
                            <button
                                onClick={() => setIsFormOpen(!isFormOpen)}
                                className="bg-[#1A1714] text-[#FAF7F2] px-6 py-3.5 text-[9px] font-mono uppercase tracking-[0.18em] hover:bg-[#B5843A] transition-all flex items-center gap-3 cursor-pointer rounded-sm"
                            >
                                {isFormOpen ? "Cancel" : "Write a Review"} <Plus size={14} className={isFormOpen ? "rotate-45 transition-transform" : ""} />
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
                            className="overflow-hidden"
                        >
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-16 border-b border-[#C8BFB0]/50 pt-4">
                                <div className="space-y-6">
                                    <h3 className="text-lg font-serif italic font-semibold text-[#1A1714]">Share your experience.</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-[8px] uppercase font-mono tracking-widest text-[#A09288] block mb-2 font-semibold">Your Name</label>
                                            <input
                                                required
                                                value={formData.user}
                                                onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                                                className="w-full bg-[#EDE8DF] border border-[#C8BFB0] p-4 text-xs font-mono outline-none focus:border-[#B5843A] rounded-sm text-[#1A1714]"
                                                placeholder="e.g. Vikram R."
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[8px] uppercase font-mono tracking-widest text-[#A09288] block mb-2 font-semibold">Your Profession</label>
                                            <input
                                                required
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                className="w-full bg-[#EDE8DF] border border-[#C8BFB0] p-4 text-xs font-mono outline-none focus:border-[#B5843A] rounded-sm text-[#1A1714]"
                                                placeholder="e.g. Designer"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <label className="text-[8px] uppercase font-mono tracking-widest text-[#A09288] block mb-2 font-semibold">Review Message</label>
                                        <textarea
                                            required
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            className="w-full bg-[#EDE8DF] border border-[#C8BFB0] p-4 h-36 text-xs outline-none focus:border-[#B5843A] resize-none rounded-sm text-[#1A1714]"
                                            placeholder="What do you think about the performance and quality?"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center bg-[#EDE8DF]/50 p-5 border border-[#C8BFB0] rounded-sm">
                                        <div className="space-y-1">
                                            <p className="text-[8px] font-mono uppercase tracking-widest text-[#A09288] font-semibold">Rating</p>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, rating: s })}
                                                        className={`transition-colors cursor-pointer ${formData.rating >= s ? "text-[#B5843A]" : "text-[#C8BFB0]"}`}
                                                    >
                                                        <Star size={16} fill={formData.rating >= s ? "currentColor" : "none"} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="bg-[#1A1714] text-[#FAF7F2] px-8 py-4 text-[9px] font-mono uppercase tracking-[0.18em] flex items-center gap-3 hover:bg-[#B5843A] cursor-pointer rounded-sm"
                                        >
                                            {isSubmitting ? <><Loader2 size={12} className="animate-spin" /> Sending...</> : <><Send size={12} /> Post Review</>}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Review Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {reviews.map((rev) => (
                            <motion.div
                                key={rev.id || rev._id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="py-6 border-b border-[#C8BFB0]/40 flex flex-col justify-between min-h-[220px]"
                            >
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-1 text-[#B5843A]">
                                            {[...Array(5)].map((_, j) => (
                                                <Star key={j} size={12} fill={j < rev.rating ? "currentColor" : "none"} className={j < rev.rating ? "" : "text-[#C8BFB0]"} />
                                            ))}
                                        </div>
                                        <span className="text-[8px] font-mono text-[#A09288] uppercase tracking-widest">{rev.date}</span>
                                    </div>
                                    <p className="text-sm font-serif italic text-[#1A1714] leading-relaxed min-h-[100px]">
                                        "{rev.content}"
                                    </p>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-[#C8BFB0]/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#FAF7F2] flex items-center justify-center rounded-full border border-[#C8BFB0]/40">
                                            <User size={14} className="text-[#A09288]" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-tight text-[#1A1714]">{rev.user}</p>
                                            <p className="text-[8px] uppercase tracking-widest text-[#A09288] font-mono">{rev.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <ShieldCheck size={12} className="text-[#B5843A]" />
                                        <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#B5843A]">{rev.recommendation || "Verified Purchase"}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
