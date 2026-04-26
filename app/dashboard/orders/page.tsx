"use client";

import React, { useEffect, useState } from "react";
import { Package, Search, Loader2, AlertCircle, ChevronRight } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import { fetchUserOrders, fetchOrderById } from "@/lib/api";
import { useAuth } from "@/store/useAuth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function statusLabel(status: string) {
    return status?.charAt(0) + status?.slice(1).toLowerCase() || status;
}

const STATUS_COLORS: Record<string, string> = {
    PLACED: 'bg-blue-100 text-blue-700',
    CONFIRMED: 'bg-indigo-100 text-indigo-700',
    PACKED: 'bg-amber-100 text-amber-700',
    SHIPPED: 'bg-purple-100 text-purple-700',
    DELIVERED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
};

function OrdersContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const [orders, setOrders] = useState<any[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(true);

    const [orderId, setOrderId] = useState(searchParams.get('id') || "");
    const [orderData, setOrderData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUserOrders()
            .then((data) => setOrders(Array.isArray(data) ? data : []))
            .catch(() => setOrders([]))
            .finally(() => setOrdersLoading(false));
        
        const initialId = searchParams.get('id');
        if (initialId) {
            handleTrack(initialId);
        }
    }, [user?.id]);

    const handleTrack = async (id: string = orderId) => {
        const targetId = id.trim();
        if (!targetId) return;
        setLoading(true);
        setError(null);
        try {
            const data = await fetchOrderById(targetId);
            setOrderData(data);
        } catch (err: any) {
            setError(err.message || "Order not found. Please check the order number.");
            setOrderData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
                    <p className="text-sm text-gray-500 mt-1">Track and manage your recent purchases and returns.</p>
                </div>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search all orders" 
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Orders List */}
                <div className="lg:col-span-2 space-y-4">
                    {ordersLoading ? (
                        <div className="flex items-center justify-center py-20 bg-white border border-gray-200 rounded-lg">
                            <Loader2 size={24} className="animate-spin text-gray-300" />
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-lg">
                            <Package size={48} className="mx-auto text-gray-200 mb-4" />
                            <p className="text-gray-500">You haven't placed any orders yet.</p>
                            <Link href="/products" className="mt-4 inline-block text-blue-600 font-semibold hover:underline">
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div 
                                key={order.id}
                                onClick={() => handleTrack(order.id)}
                                className={`bg-white border rounded-lg overflow-hidden cursor-pointer transition-all ${
                                    orderData?.id === order.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300 shadow-sm'
                                }`}
                            >
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Order Placed</p>
                                            <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total</p>
                                            <p className="text-sm text-gray-600">₹{Number(order.total).toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Ship To</p>
                                            <p className="text-sm text-blue-600 hover:underline">{user?.firstName}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Order # {order.orderNumber}</p>
                                        <div className="flex items-center gap-3 justify-end text-sm">
                                            <Link href={`/dashboard/orders?id=${order.id}`} className="text-blue-600 hover:underline font-medium">Order Details</Link>
                                            <span className="text-gray-300">|</span>
                                            <Link href="#" className="text-blue-600 hover:underline font-medium">Invoice</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                                            <Package className="text-gray-400" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{order.items?.[0]?.productName || "Order Item"}</h4>
                                            <p className="text-sm text-gray-500 mt-1">Quantity: {order.items?.[0]?.quantity || 1}</p>
                                            <span className={`inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-black uppercase ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full md:w-auto">
                                        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-1.5 px-6 rounded-md text-sm font-medium transition-colors shadow-sm w-full">
                                            Track Package
                                        </button>
                                        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-1.5 px-6 rounded-md text-sm font-medium transition-colors shadow-sm w-full">
                                            Buy it again
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Tracking / Details Sidebar */}
                <div className="space-y-6">
                    {orderData ? (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden sticky top-4">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <h3 className="font-bold text-gray-900">Order Tracking</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Status</p>
                                    <p className="text-lg font-bold text-gray-900 mt-1 uppercase">{statusLabel(orderData.status)}</p>
                                </div>

                                {orderData.shipment?.trackingEvents?.length > 0 && (
                                    <div className="space-y-4">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Tracking History</p>
                                        <div className="space-y-4">
                                            {orderData.shipment.trackingEvents.map((event: any, i: number) => (
                                                <div key={i} className="flex gap-3 items-start">
                                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                                    <div>
                                                        <p className="text-xs font-bold text-gray-800 uppercase tracking-tight leading-none">{event.status}</p>
                                                        <p className="text-[10px] text-gray-500 mt-1 uppercase">
                                                            {event.location} // {new Date(event.occurredAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-6 border-t border-gray-100 space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span className="font-medium">₹{Number(orderData.subtotal).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Shipping</span>
                                        <span className="font-medium">₹{Number(orderData.shippingCharge).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-base font-bold text-gray-900 pt-2">
                                        <span>Order Total</span>
                                        <span>₹{Number(orderData.total).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-10 text-center">
                            <Package size={40} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-sm text-gray-500">Select an order to view tracking details and history.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function OrdersPage() {
    return (
        <AuthGuard>
            <OrdersContent />
        </AuthGuard>
    );
}
