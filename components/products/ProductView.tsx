'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ChevronLeft,
    ShieldCheck,
    Cpu,
    HardDrive,
    Monitor,
    CheckCircle2,
    Star,
    MessageCircle,
    Package,
    Clock,
    ArrowRight,
    ChevronDown,
    Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductData } from '@/types/product';
import { fetchReviews, submitReview, Review } from '@/lib/reviews';

interface ProductViewProps {
    product: ProductData;
}

export const ProductView: React.FC<ProductViewProps> = ({ product }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [selectedRam, setSelectedRam] = useState(product.ramOptions[0]);
    const [selectedSSD, setSelectedSSD] = useState(product.ssdOptions[0]);
    const [selectedWarranty, setSelectedWarranty] = useState(product.warrantyOptions[0]);
    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    useEffect(() => {
        fetchReviews(product.id)
            .then(setReviews)
            .catch(console.error)
            .finally(() => setLoadingReviews(false));
    }, [product.id]);

    const handleReviewSubmit = async () => {
        setIsSubmittingReview(true);
        try {
            const formData = new FormData();
            formData.append('productId', product.id);
            formData.append('rating', reviewRating.toString());
            formData.append('comment', reviewComment);

            const newReview = await submitReview(formData);
            setReviews(prev => [newReview, ...prev]);
            setShowReviewForm(false);
            setReviewComment("");
            setReviewRating(5);
        } catch (error) {
            console.error(error);
            alert("Failed to submit review. Please try again.");
        } finally {
            setIsSubmittingReview(false);
        }
    };


    const calculatePrice = () => {
        let price = product.originalPrice;
        price += (product.pricingLogic.ram[selectedRam] || 0);
        price += (product.pricingLogic.ssd[selectedSSD] || 0);
        price += (product.pricingLogic.warranty[selectedWarranty] || 0);
        if (couponApplied) price *= 0.95; // 5% Discount
        return Math.round(price);
    };

    const totalPrice = calculatePrice();

    return (
        <div className="min-h-screen bg-[#050B15] text-white">
            {/* Dynamic Background Blob */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left: Premium Carousel */}
                    <div className="space-y-6">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImage}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full h-full"
                                >
                                    <Image
                                        src={product.images[currentImage]}
                                        alt={product.title}
                                        fill
                                        className="object-contain p-8"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <button
                                onClick={() => setCurrentImage(prev => (prev - 1 + product.images.length) % product.images.length)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={() => setCurrentImage(prev => (prev + 1) % product.images.length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImage(idx)}
                                    className={cn(
                                        "relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all",
                                        currentImage === idx ? "border-cyan-500 scale-105" : "border-white/10 opacity-60 hover:opacity-100"
                                    )}
                                >
                                    <Image src={img} alt="Thumbnail" fill className="object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="flex flex-col gap-8">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3"
                            >
                                <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {product.tagline}
                                </span>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-sm font-bold">4.9</span>
                                    <span className="text-white/40 text-xs">(120+ Reviews)</span>
                                </div>
                            </motion.div>

                            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex flex-wrap gap-2">
                                {product.badges.map(badge => (
                                    <span key={badge} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Configurator */}
                        <div className="space-y-6 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-xl">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-white/60 flex items-center gap-2">
                                    <Cpu size={14} /> Memory Configuration
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {product.ramOptions.map(ram => (
                                        <button
                                            key={ram}
                                            onClick={() => setSelectedRam(ram)}
                                            className={cn(
                                                "py-3 rounded-xl border-2 transition-all text-sm font-bold",
                                                selectedRam === ram ? "border-cyan-500 bg-cyan-500/10" : "border-white/10 hover:border-white/30"
                                            )}
                                        >
                                            {ram}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-white/60 flex items-center gap-2">
                                    <HardDrive size={14} /> Storage (NVMe SSD)
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {product.ssdOptions.map(ssd => (
                                        <button
                                            key={ssd}
                                            onClick={() => setSelectedSSD(ssd)}
                                            className={cn(
                                                "py-3 rounded-xl border-2 transition-all text-sm font-bold",
                                                selectedSSD === ssd ? "border-cyan-500 bg-cyan-500/10" : "border-white/10 hover:border-white/30"
                                            )}
                                        >
                                            {ssd}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-white/60 flex items-center gap-2">
                                    <ShieldCheck size={14} /> Advanced Protection
                                </label>
                                <div className="flex flex-col gap-2">
                                    {product.warrantyOptions.map(war => (
                                        <button
                                            key={war}
                                            onClick={() => setSelectedWarranty(war)}
                                            className={cn(
                                                "flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-sm font-bold",
                                                selectedWarranty === war ? "border-cyan-500 bg-cyan-500/10" : "border-white/10 hover:border-white/30"
                                            )}
                                        >
                                            <span>{war}</span>
                                            {selectedWarranty === war && <CheckCircle2 size={16} className="text-cyan-400" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-end gap-3">
                                <span className="text-5xl font-black text-white">
                                    ₹{totalPrice.toLocaleString()}
                                </span>
                                <span className="text-xl text-white/40 line-through mb-1">
                                    ₹{(totalPrice * 1.2).toLocaleString()}
                                </span>
                                <span className="text-green-500 font-bold mb-1">20% OFF</span>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-[#050B15] font-black py-4 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/20">
                                    Coming Soon
                                </button>
                                <button className="p-4 rounded-2xl border-2 border-white/10 hover:bg-white/5 transition-all">
                                    <Package size={24} />
                                </button>
                            </div>

                            <p className="text-white/40 text-xs flex items-center gap-2">
                                <Clock size={12} /> Delivery expected within 48-72 hours across major cities.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Technical Specs Accordion-style layout */}
                <div className="mt-32 space-y-12">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight">Engineering Excellence</h2>
                        <p className="text-white/40 max-w-2xl px-4">
                            The Ention Workbook series is meticulously engineered to provide the perfect balance between professional durability and modern aesthetics.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {product.specs.slice(0, 4).map(spec => (
                            <div key={spec.label} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors group">
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                                    <Monitor size={20} />
                                </div>
                                <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">{spec.label}</h3>
                                <p className="text-white font-bold">{spec.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feature Highlights */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10">
                        <video
                            src={product.video}
                            className="w-full h-full object-contain"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </div>
                    <div className="flex flex-col justify-center gap-6 p-8">
                        <h3 className="text-3xl font-black">Built for the Hustle.</h3>
                        <p className="text-white/60 leading-relaxed">
                            Experience the perfect fusion of powerful N95 processing and ultra-efficient cooling. Whether you're a student building your first app or a creator editing on the go, Ention adapts to your lifestyle.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-cyan-400 font-bold">
                                <ArrowRight size={20} />
                                Learn more about our R&D
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Specs Table */}
                <div className="mt-32">
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden">
                        <h3 className="text-2xl font-black mb-8">Technical Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            {product.specs.map(spec => (
                                <div key={spec.label} className="flex justify-between py-4 border-b border-white/5">
                                    <span className="text-white/40 font-bold text-sm uppercase">{spec.label}</span>
                                    <span className="text-white font-medium text-sm text-right">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-32">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-3xl font-black">Customer Sentiment</h3>
                        <button
                            onClick={() => setShowReviewForm(!showReviewForm)}
                            className="flex items-center gap-2 text-cyan-400 font-bold hover:underline"
                        >
                            {showReviewForm ? 'Cancel' : 'Write a review'} <ChevronDown size={18} className={cn("transition-transform", showReviewForm && "rotate-180")} />
                        </button>
                    </div>

                    <AnimatePresence>
                        {showReviewForm && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-12 overflow-hidden"
                            >
                                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-3xl">
                                    <h4 className="text-xl font-black mb-6 uppercase tracking-tight">Share your experience</h4>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-bold text-white/60">Rating:</span>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button
                                                        key={star}
                                                        onClick={() => setReviewRating(star)}
                                                        className="text-yellow-500 transition-transform active:scale-90"
                                                    >
                                                        <Star size={24} fill={reviewRating >= star ? "currentColor" : "none"} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <textarea
                                            value={reviewComment}
                                            onChange={(e) => setReviewComment(e.target.value)}
                                            placeholder="What do you think about the performance and build quality?"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 min-h-[120px] focus:border-cyan-500 outline-none transition-colors"
                                        />
                                        <button
                                            onClick={handleReviewSubmit}
                                            disabled={isSubmittingReview || !reviewComment.trim()}
                                            className="px-8 py-3 bg-cyan-500 rounded-xl text-[#050B15] font-black uppercase tracking-widest text-sm hover:bg-cyan-400 disabled:opacity-50 transition-all"
                                        >
                                            {isSubmittingReview ? 'Submitting...' : 'Post Review'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {loadingReviews ? (
                        <div className="h-40 flex items-center justify-center">
                            <div className="animate-pulse text-white/40">Analyzing feedback...</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {reviews.length > 0 ? (
                                reviews.map(review => (
                                    <div key={review.id} className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                        <div className="flex gap-1 mb-4 text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill={i < (review.rating || 5) ? "currentColor" : "none"} stroke="currentColor" />
                                            ))}
                                        </div>
                                        <p className="text-white/80 text-sm leading-relaxed mb-4 italic">
                                            "{review.comment}"
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40" />
                                            <span className="text-xs font-bold text-white/40">{review.user?.name || "Verified Business User"}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full p-12 text-center bg-white/5 rounded-3xl border border-white/10 border-dashed">
                                    <MessageCircle size={40} className="mx-auto text-white/20 mb-4" />
                                    <p className="text-white/40">Be the first to share your experience with the {product.title}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};
