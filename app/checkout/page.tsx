"use client";

import React, { useState } from "react";
import { useCart } from "@/store/useCart";
import { useAuth } from "@/store/useAuth";
import { createAddress, addToServerCart, createOrder, clearServerCart } from "@/lib/api";
import { ArrowRight, ShieldCheck, Truck, CreditCard, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import AuthGuard from "@/components/auth/AuthGuard";

function CheckoutContent() {
    const { items, getTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState(1); // 1: Shipping, 3: Success

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const addressLine1 = formData.get('addressLine1') as string;
        const city = formData.get('city') as string;
        const state = formData.get('state') as string || 'NA';
        const zipCode = formData.get('zipCode') as string;
        const phone = formData.get('phone') as string;

        if (items.length === 0) {
            setError("Your cart is empty.");
            setLoading(false);
            return;
        }

        try {
            // Step 1: Save shipping address to get an addressId
            const savedAddress = await createAddress({
                fullName: `${firstName} ${lastName}`.trim(),
                phone,
                line1: addressLine1,
                city,
                state,
                pincode: zipCode,
                country: 'India',
                label: 'Shipping',
            });

            const addressId = savedAddress?.id;
            if (!addressId) throw new Error('Could not save shipping address. Please try again.');

            // Step 2: Sync local cart items to the server cart
            for (const item of items) {
                await addToServerCart(item.id, item.quantity);
            }

            // Step 3: Place the order — server converts cart → order
            await createOrder({ addressId });

            // Step 4: Clear both local and server cart
            clearCart();
            await clearServerCart();

            setStep(3);
        } catch (err: any) {
            setError(err.message || "Checkout failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (step === 3) {
        return (
            <div className="min-h-screen bg-bg flex items-center justify-center p-8">
                <BlurFadeIn className="max-w-md text-center space-y-8">
                    <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto shadow-2xl">
                        <ShieldCheck size={48} className="text-white" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-serif font-black uppercase italic tracking-tighter">Order Placed Successfully.</h1>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 leading-relaxed">
                            Your order has been registered. You will receive a tracking ID via email shortly.
                        </p>
                    </div>
                    <Link href="/dashboard" className="inline-block bg-ink text-bg px-12 py-5 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-accent transition-all">
                        View Order Status
                    </Link>
                </BlurFadeIn>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg p-8 md:p-16 lg:p-24">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Left: Summary */}
                <div className="space-y-12">
                    <div>
                        <Link href="/products" className="inline-flex items-center gap-2 group text-ink/30 hover:text-accent transition-colors font-mono text-[9px] uppercase tracking-widest mb-8">
                            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-serif font-black uppercase italic tracking-tighter leading-none">
                            Checkout <br />
                            <span className="not-italic opacity-10">Protocol</span>
                        </h1>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20 border-b border-ink/5 pb-4">Your Items</h3>
                        {items.length === 0 ? (
                            <p className="font-serif italic text-ink/40">Your cart is empty.</p>
                        ) : items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center group">
                                <div className="space-y-1">
                                    <h4 className="font-serif font-bold italic text-lg">{item.name}</h4>
                                    <p className="font-mono text-[9px] text-ink/40 uppercase tracking-widest">{item.configuration.processor} // {item.configuration.ram}</p>
                                </div>
                                <span className="font-serif font-bold text-lg">₹{item.price.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-ink p-10 rounded-sm text-bg space-y-6 shadow-2xl relative overflow-hidden">
                        <div className="flex justify-between items-end border-b border-bg/10 pb-6 relative z-10">
                            <div>
                                <p className="font-mono text-[9px] uppercase tracking-widest text-bg/40 mb-1">Total</p>
                                <span className="text-4xl font-serif font-bold italic">₹{getTotal().toLocaleString()}</span>
                            </div>
                            <p className="font-mono text-[8px] text-bg/20 uppercase tracking-widest">Incl. Taxes &amp; Shipping</p>
                        </div>
                        <div className="flex items-center gap-6 opacity-30 relative z-10">
                            <Truck size={16} />
                            <p className="font-mono text-[9px] uppercase tracking-widest">Estimated delivery: 5-7 business days</p>
                        </div>
                        <ShieldCheck className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 text-bg/[0.03]" size={300} />
                    </div>
                </div>

                {/* Right: Form */}
                <div className="bg-white border border-ink/5 p-10 md:p-16 rounded-sm shadow-sm flex flex-col justify-center">
                    {error && (
                        <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-sm font-mono text-[11px] uppercase tracking-widest">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handlePlaceOrder} className="space-y-10">
                        <div className="space-y-4">
                            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-ink/40">Shipping Details</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <input name="firstName" placeholder="First Name" className="bg-ink/5 border border-ink/10 p-5 font-mono text-[11px] w-full focus:outline-none focus:border-accent/40" required defaultValue={user?.firstName} />
                                <input name="lastName" placeholder="Last Name" className="bg-ink/5 border border-ink/10 p-5 font-mono text-[11px] w-full focus:outline-none focus:border-accent/40" defaultValue={user?.lastName} />
                            </div>
                            <input name="addressLine1" placeholder="Street Address" className="bg-ink/5 border border-ink/10 p-5 font-mono text-[11px] w-full focus:outline-none focus:border-accent/40" required />
                            <div className="grid grid-cols-2 gap-6">
                                <input name="city" placeholder="City" className="bg-ink/5 border border-ink/10 p-5 font-mono text-[11px] w-full focus:outline-none focus:border-accent/40" required />
                                <input name="state" placeholder="State" className="bg-ink/5 border border-ink/10 p-5 font-mono text-[11px] w-full focus:outline-none focus:border-accent/40" required />
                            </div>
                            <input name="zipCode" placeholder="Pincode" className="bg-ink/5 border border-ink/10 p-5 font-mono text-[11px] w-full focus:outline-none focus:border-accent/40" required />
                            <input name="phone" type="tel" placeholder="Phone Number" className="bg-ink/5 border border-ink/10 p-5 font-mono text-[11px] w-full focus:outline-none focus:border-accent/40" required />
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-ink/40">Payment Method</h3>
                            <div className="flex gap-4">
                                <div className="flex-1 bg-ink text-bg p-6 rounded-sm border border-accent/20 flex flex-col items-center justify-center space-y-3 cursor-default">
                                    <CreditCard size={20} />
                                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Cash on Delivery</span>
                                </div>
                                <div className="flex-1 border border-ink/5 p-6 rounded-sm flex flex-col items-center justify-center space-y-3 opacity-20 grayscale pointer-events-none">
                                    <CreditCard size={20} />
                                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold">UPI / Card</span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || items.length === 0}
                            className="w-full bg-accent text-white py-6 text-[10px] font-black uppercase tracking-[0.6em] hover:bg-ink transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-4"
                        >
                            {loading ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : <>Place Order <ArrowRight size={18} /></>}
                        </button>
                        <p className="text-center font-mono text-[8px] text-ink/20 uppercase tracking-widest">Secured by Ention</p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <AuthGuard>
            <CheckoutContent />
        </AuthGuard>
    );
}
