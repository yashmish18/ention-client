'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FaBoxOpen, FaTicketAlt, FaCog, FaEnvelope, FaPlus, FaHistory } from "react-icons/fa";
import Image from "next/image";
import { getUserFromToken } from '@/utils/auth';
import { orderUtils } from '@/utils/checkout';

interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    avatar?: string;
}

interface Ticket {
    id: number;
    subject: string;
    status: string;
    date: string;
}

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [newTicket, setNewTicket] = useState("");
    const [newsletter, setNewsletter] = useState(true);
    const [orders, setOrders] = useState<any[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    // Check authentication on mount
    useEffect(() => {
        const checkAuth = () => {
            const userFromToken = getUserFromToken();
            if (!userFromToken) {
                router.push('/login?redirect=/dashboard');
                return;
            }
            setUser(userFromToken as User);
            setAuthLoading(false);
        };

        checkAuth();
    }, [router]);

    // Fetch orders when user is set
    useEffect(() => {
        if (user) {
            orderUtils.getUserOrders().then(res => {
                if (res.success && res.orders) setOrders(res.orders);
                setLoadingOrders(false);
            });
        }
    }, [user]);

    const handleCreateTicket = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTicket.trim()) {
            setTickets([{
                id: Date.now(),
                subject: newTicket,
                status: "Open",
                date: new Date().toISOString().slice(0, 10)
            }, ...tickets]);
            setNewTicket("");
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#f7fafc] flex items-center justify-center">
                <div className="text-2xl text-gray-600">Loading Dashboard...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-[#f7fafc] flex items-center justify-center">
                <div className="text-2xl text-gray-600">Please log in to access the dashboard.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#133B5C] via-[#0FAFCA] to-[#007e9e] pb-10 pt-32 px-4">
            {/* Topbar */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-white/30 overflow-hidden bg-white/20 flex items-center justify-center">
                        {user.image || user.avatar ? (
                            <Image src={(user.image || user.avatar) as string} alt="avatar" width={64} height={64} className="w-full h-full object-contain" />
                        ) : (
                            <div className="text-white text-2xl font-bold">{user.name[0]}</div>
                        )}
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">Welcome, {user.name}!</div>
                        <div className="text-white/70">{user.email}</div>
                    </div>
                </div>
            </div>

            {/* Main grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Orders */}
                <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="flex items-center gap-2 mb-4 text-xl font-bold text-[#007e9e]"><FaBoxOpen /> Recent Orders</div>
                    {loadingOrders ? (
                        <div className="text-sm text-gray-500">Loading orders...</div>
                    ) : orders.length === 0 ? (
                        <div className="flex-1 text-gray-400 text-sm mb-4">No recent orders found.</div>
                    ) : (
                        <div className="flex flex-col gap-4 max-h-80 overflow-y-auto">
                            {orders.map((order) => (
                                <div key={order._id} className="border p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <div className="font-bold text-[#133B5C]">{order.product?.name} ({order.orderNumber})</div>
                                        <div className="text-sm text-gray-600">Total: ₹{order.product?.price} • Status: <span className="font-semibold">{order.status}</span></div>
                                        <div className="text-xs text-gray-500 mt-1">Date: {new Date(order.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => window.open(`/api/checkout/orders/${order._id}/invoice`, '_blank')} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded">Invoice</button>
                                        {(order.status === 'pending' || order.status === 'confirmed') && (
                                            <button
                                                onClick={async () => {
                                                    if (confirm('Are you sure you want to cancel this order?')) {
                                                        const res = await orderUtils.cancelOrder(order._id, 'Changed mind');
                                                        if (res.success) {
                                                            setOrders(orders.map(o => o._id === order._id ? { ...o, status: 'cancelled' } : o));
                                                            alert('Order cancelled successfully.');
                                                        } else {
                                                            alert(res.error || 'Failed to cancel order.');
                                                        }
                                                    }
                                                }}
                                                className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-sm rounded transition"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                        {order.status === 'shipped' && order.delivery?.trackingNumber && (
                                            <button onClick={() => alert(`Tracking Number: ${order.delivery.trackingNumber} (${order.delivery.courier})`)} className="px-3 py-1 bg-[#0FAFCA] text-white text-sm rounded">Track Flight</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <Link href="/ecommerce/product" className="mt-4 text-[#007e9e] hover:underline text-sm font-semibold self-start">Start Shopping</Link>
                </div>

                {/* Support Tickets */}
                <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-4 text-xl font-bold text-[#0FAFCA]"><FaTicketAlt /> Support Tickets</div>
                    <form onSubmit={handleCreateTicket} className="flex gap-2 mb-4">
                        <input
                            value={newTicket}
                            onChange={e => setNewTicket(e.target.value)}
                            placeholder="New ticket subject..."
                            className="border border-gray-200 rounded-3xl px-4 py-2 flex-1 text-sm focus:outline-none focus:border-[#0FAFCA]"
                        />
                        <button type="submit" className="bg-[#0FAFCA] text-white rounded-3xl px-4 py-2 text-sm font-semibold flex items-center gap-1 hover:bg-[#007e9e] transition">
                            <FaPlus /> Create
                        </button>
                    </form>
                    {tickets.length === 0 && <div className="text-gray-400 text-sm mb-4">No tickets yet.</div>}
                    <div className="max-h-48 overflow-y-auto">
                        {tickets.map(ticket => (
                            <div key={ticket.id} className="border-b py-3 last:border-b-0">
                                <div className="font-semibold text-gray-800 text-sm">{ticket.subject}</div>
                                <div className="text-xs text-gray-500">{ticket.status} • {ticket.date}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Account Settings */}
                <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="flex items-center gap-2 mb-4 text-xl font-bold text-[#133B5C]"><FaCog /> Account Settings</div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <Link href="/profile" className="flex-1 text-center bg-gray-50 text-gray-700 hover:text-[#007e9e] font-medium p-4 border rounded hover:shadow transition">Edit Profile Information</Link>
                        <Link href="/profile?tab=password" className="flex-1 text-center bg-gray-50 text-gray-700 hover:text-[#007e9e] font-medium p-4 border rounded hover:shadow transition">Change Security Settings</Link>
                        <Link href="/profile?tab=addresses" className="flex-1 text-center bg-gray-50 text-gray-700 hover:text-[#007e9e] font-medium p-4 border rounded hover:shadow transition">Manage Shipping Addresses</Link>
                    </div>
                </div>

                {/* Newsletter & Offers */}
                <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="flex items-center gap-2 mb-4 text-xl font-bold text-[#007e9e]"><FaEnvelope /> Newsletter & Offers</div>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1 text-gray-600 text-sm">
                            {newsletter ? "You are subscribed to our newsletter and will receive the latest offers and updates." : "You are not subscribed to our newsletter and may miss out on exclusive deals."}
                        </div>
                        <button onClick={() => setNewsletter(!newsletter)} className={`px-6 py-2 rounded-3xl font-semibold transition text-sm ${newsletter ? 'border border-gray-300 text-gray-600 hover:bg-gray-100' : 'bg-[#0FAFCA] text-white hover:bg-[#007e9e]'}`}>
                            {newsletter ? "Unsubscribe" : "Subscribe Now"}
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="flex items-center gap-2 mb-4 text-xl font-bold text-[#133B5C]"><FaHistory /> Recent Activity</div>
                    <div className="text-sm text-gray-400">No recent activity recorded. Your actions will appear here.</div>
                </div>
            </div>
        </div>
    );
}
