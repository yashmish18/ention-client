"use client";

import React, { useEffect, useState } from "react";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import { Package, Truck, Clock, Search, Loader2, AlertCircle } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import { fetchUserOrders, fetchOrderById } from "@/lib/api";
import { useAuth } from "@/store/useAuth";

/**
 * Maps server order status enum to a human-readable label.
 * Server statuses: PLACED | CONFIRMED | PACKED | SHIPPED | DELIVERED | CANCELLED | RETURNED
 */
function statusLabel(status: string) {
    return status?.charAt(0) + status?.slice(1).toLowerCase() || status;
}

function OrdersContent() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(true);

    // For the track-by-ID panel
    const [orderId, setOrderId] = useState("");
    const [orderData, setOrderData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);

    // Fetch the user's own orders on mount
    useEffect(() => {
        fetchUserOrders()
            .then((data) => setOrders(Array.isArray(data) ? data : []))
            .catch(() => setOrders([]))
            .finally(() => setOrdersLoading(false));
    }, [user?.id]);

    // Track a specific order by number/id
    const handleTrack = async () => {
        if (!orderId.trim()) return;
        setLoading(true);
        setError(null);
        setSearched(true);
        try {
            const data = await fetchOrderById(orderId.trim());
            setOrderData(data);
        } catch (err: any) {
            setError(err.message || "Order not found. Please check the order number and try again.");
            setOrderData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-bg text-ink pt-32 pb-24 px-8 md:px-12">
            <BlurFadeIn delay={0.2}>
                <div className="max-w-5xl mx-auto space-y-20">
                    <div className="space-y-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Logistics Division</span>
                        <h1 className="text-6xl md:text-8xl font-serif font-black uppercase tracking-tighter italic">
                            My Orders
                        </h1>
                    </div>

                    {/* ── Order History ────────────────────────────────── */}
                    <div className="bg-white border border-ink/5 p-12 rounded-sm shadow-sm space-y-8">
                        <h2 className="text-2xl font-serif font-bold italic text-ink">Order History</h2>

                        {ordersLoading ? (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 size={24} className="animate-spin text-ink/30" />
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-16 space-y-4">
                                <Package size={48} className="text-ink/10 mx-auto" strokeWidth={1} />
                                <p className="font-serif italic text-ink/30">No orders placed yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-8 border border-ink/10 rounded-sm hover:border-accent/30 transition-all cursor-pointer"
                                        onClick={() => { setOrderId(order.id); setOrderData(order); setSearched(true); }}
                                    >
                                        <div className="space-y-1">
                                            <span className="font-mono text-[8px] uppercase tracking-widest text-accent font-bold">{order.orderNumber}</span>
                                            <h3 className="font-serif font-bold italic text-lg">
                                                {order.items?.[0]?.productName || "Ention Device"}
                                                {order.items?.length > 1 && ` +${order.items.length - 1} more`}
                                            </h3>
                                            <p className="font-mono text-[9px] text-ink/40 uppercase tracking-widest">
                                                {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <span className="block font-mono text-[8px] uppercase tracking-widest text-ink/20 mb-1">Total</span>
                                                <span className="font-mono text-sm font-bold">₹{Number(order.total).toLocaleString()}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="block font-mono text-[8px] uppercase tracking-widest text-ink/20 mb-1">Status</span>
                                                <span className="font-mono text-[10px] font-bold uppercase text-ink">{statusLabel(order.status)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Track by Order ID ───────────────────────────── */}
                    <div className="bg-white border border-ink/5 p-12 rounded-sm shadow-sm space-y-12">
                        <h2 className="text-2xl font-serif font-bold italic text-ink">Track by Order Number</h2>

                        <div className="space-y-6">
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-ink/20" size={20} />
                                <input
                                    type="text"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                                    className="w-full bg-ink/5 border border-ink/10 pl-16 pr-32 py-6 font-mono text-sm uppercase tracking-[0.3em] font-bold focus:outline-none focus:border-accent transition-all"
                                    placeholder="ENTION-ORD-XXXXXX or order ID"
                                />
                                <button
                                    onClick={handleTrack}
                                    disabled={loading}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-ink text-bg px-8 py-3 font-mono text-[9px] uppercase font-bold tracking-widest hover:bg-accent transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {loading ? <Loader2 size={14} className="animate-spin" /> : "Locate"}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-4 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-sm">
                                <AlertCircle size={16} />
                                <span className="font-mono text-[11px] uppercase tracking-widest">{error}</span>
                            </div>
                        )}

                        {orderData && (
                            <div className="border-t border-ink/10 pt-12 space-y-12">
                                <div className="flex flex-col md:flex-row justify-between gap-12">
                                    <div className="space-y-4">
                                        <span className="block font-mono text-[9px] uppercase tracking-widest opacity-40 font-bold">Order Details</span>
                                        <h3 className="text-2xl font-serif font-bold italic">
                                            {orderData.items?.[0]?.productName || "Ention Device"}
                                        </h3>
                                        <p className="font-mono text-[9px] text-ink/40 uppercase tracking-widest">
                                            {orderData.orderNumber} // Placed: {new Date(orderData.createdAt).toLocaleDateString('en-IN')}
                                        </p>
                                        {/* Items breakdown */}
                                        {orderData.items?.map((item: any) => (
                                            <p key={item.id} className="font-mono text-[9px] text-ink/60 uppercase tracking-widest">
                                                {item.productName} × {item.quantity} — ₹{Number(item.totalPrice).toLocaleString()}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="space-y-4 md:text-right">
                                        <span className="block font-mono text-[9px] uppercase tracking-widest opacity-40 font-bold">Current Status</span>
                                        <div className="flex items-center gap-4 md:justify-end">
                                            <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                                            <span className="font-serif italic text-2xl font-bold">{statusLabel(orderData.status)}</span>
                                        </div>
                                        <p className="font-mono text-[9px] text-ink/40 uppercase tracking-widest">
                                            Total: ₹{Number(orderData.total).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Shipment tracking events */}
                                {orderData.shipment?.trackingEvents?.length > 0 && (
                                    <div className="space-y-4">
                                        <span className="block font-mono text-[9px] uppercase tracking-widest opacity-40 font-bold">Tracking History</span>
                                        <div className="space-y-6 font-mono">
                                            {orderData.shipment.trackingEvents.map((event: any, i: number) => (
                                                <div key={i} className="flex gap-4 items-center">
                                                    <div className="w-2 h-2 rounded-full bg-accent" />
                                                    <span className="text-[10px] uppercase tracking-widest font-bold">
                                                        {event.status} — {event.location}
                                                        <span className="font-normal opacity-50 ml-2">{new Date(event.occurredAt).toLocaleDateString('en-IN')}</span>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {!searched && !orderData && (
                            <div className="border-t border-ink/10 pt-12 text-center space-y-4">
                                <Package size={48} className="text-ink/10 mx-auto" strokeWidth={1} />
                                <p className="font-serif italic text-ink/30">Enter your order number above to track your shipment.</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 border border-ink/10 rounded-sm space-y-4">
                            <Truck size={24} strokeWidth={1} className="text-accent" />
                            <h4 className="font-serif font-bold italic">Pan-India Shipping</h4>
                            <p className="font-mono text-[9px] uppercase tracking-widest opacity-40 leading-relaxed">
                                We deliver across India with tracked logistics to ensure your Ention device arrives safely.
                            </p>
                        </div>
                        <div className="p-8 border border-ink/10 rounded-sm space-y-4">
                            <Clock size={24} strokeWidth={1} className="text-accent" />
                            <h4 className="font-serif font-bold italic">Real-time Updates</h4>
                            <p className="font-mono text-[9px] uppercase tracking-widest opacity-40 leading-relaxed">
                                Get real-time tracking updates from our warehouse to your doorstep via email and SMS.
                            </p>
                        </div>
                    </div>
                </div>
            </BlurFadeIn>
        </main>
    );
}

export default function OrdersPage() {
    return (
        <AuthGuard>
            <OrdersContent />
        </AuthGuard>
    );
}
