"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/store/useCart";
import { ArrowRight, ShieldCheck, Truck, CreditCard, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { BlurFadeIn } from "@/components/BlurFadeIn";

export default function CheckoutPage() {
    const { items, getTotal, clearCart } = useCart();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

    useEffect(() => {
        const storedUser = localStorage.getItem("ention_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Redirect to login if not authenticated
            window.location.href = "/login?redirect=/checkout";
        }
    }, []);

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const shippingAddress = Object.fromEntries(formData);

        // We'll take the first item for the "product" field in our simplified schema
        // In a real app, you'd handle multiple line items
        const mainItem = items[0];

        const orderPayload = {
            userId: user.id,
            product: {
                name: mainItem.name,
                model: mainItem.name.includes("E4") ? "E4-ELITE" : "E5-N100",
                price: mainItem.price,
                basePrice: mainItem.price,
                selectedRam: mainItem.configuration.ram,
                selectedSSD: mainItem.configuration.storage
            },
            shippingAddress,
            paymentMethod: "cod"
        };

        try {
            const res = await fetch("http://localhost:4000/api/checkout/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload)
            });
            const result = await res.json();
            if (res.ok) {
                clearCart();
                setStep(3);
            } else {
                alert(result.error || "Checkout failed");
            }
        } catch (err) {
            alert("Connection error to Ention servers.");
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
                        <h1 className="text-4xl font-serif font-black uppercase italic tracking-tighter">Procurement Successful.</h1>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 leading-relaxed">
                            Your order has been registered in the system hive. You will receive a tracking ID via email shortly.
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
                        <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20 border-b border-ink/5 pb-4">Secured Units</h3>
                        {items.map((item) => (
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
                                <p className="font-mono text-[9px] uppercase tracking-widest text-bg/40 mb-1">Total Payload</p>
                                <span className="text-4xl font-serif font-bold italic">₹{getTotal().toLocaleString()}</span>
                            </div>
                            <p className="font-mono text-[8px] text-bg/20 uppercase tracking-widest">Insurance & Shipping Incl.</p>
                        </div>
                        <div className="flex items-center gap-6 opacity-30 relative z-10">
                            <Truck size={16} />
                            <p className="font-mono text-[9px] uppercase tracking-widest">Scheduled via Bharat Express Delivery</p>
                        </div>
                        <ShieldCheck className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 text-bg/[0.03]" size={300} />
                    </div>
                </div>

                {/* Right: Form */}
                <div className="bg-white border border-ink/5 p-10 md:p-16 rounded-sm shadow-sm flex flex-col justify-center">
                    <form onSubmit={handlePlaceOrder} className="space-y-10">
                        <div className="space-y-4">
                            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-ink/40">Shipping Directive</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <input name="firstName" placeholder="First Name" className="bg-ink/5 border border-ink/10 p-5 font-mono text-[11px] w-full focus:outline-none focus:border-accent/40" required defaultValue={user?.name?.split(' ')[0]} />
                                <input name="lastName" placeholder="Last Name" className="bg-ink/5 border border-ink/10 p-5 font-mono text-[11px] w-full focus:outline-none focus:border-accent/40" required defaultValue={user?.name?.split(' ')[1]} />
                            </div>
                            <input name="addressLine1" placeholder="Street Address" className="bg-ink/5 border border-ink/10 p-5 font-mono text-[11px] w-full focus:outline-none focus:border-accent/40" required />
                            <div className="grid grid-cols-2 gap-6">
                                <input name="city" placeholder="City" className="bg-ink/5 border border-ink/10 p-5 font-mono text-[11px] w-full focus:outline-none focus:border-accent/40" required />
                                <input name="zipCode" placeholder="Pincode" className="bg-ink/5 border border-ink/10 p-5 font-mono text-[11px] w-full focus:outline-none focus:border-accent/40" required />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-ink/40">Payment Resolution</h3>
                            <div className="flex gap-4">
                                <div className="flex-1 bg-ink text-bg p-6 rounded-sm border border-accent/20 flex flex-col items-center justify-center space-y-3 cursor-default">
                                    <CreditCard size={20} />
                                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Bharat COD</span>
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
                            {loading ? "Transmitting..." : "Initiate Fulfillment"} <ArrowRight size={18} />
                        </button>
                        <p className="text-center font-mono text-[8px] text-ink/20 uppercase tracking-widest">Encrypted via Ention Security Layer</p>
                    </form>
                </div>
            </div>
        </div>
    );
}
