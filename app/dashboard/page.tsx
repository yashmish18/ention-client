"use client";

import React, { useEffect, useState } from "react";
import {
    ShoppingBag,
    ShieldCheck,
    MapPin,
    CreditCard,
    User as UserIcon,
    Headset,
    Package,
    ChevronRight,
} from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/store/useAuth";
import { fetchUserOrders, fetchAddresses } from "@/lib/api";
import Link from "next/link";

const AccountCard = ({ title, description, icon: Icon, href }: { title: string, description: string, icon: any, href: string }) => (
    <Link href={href} className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all group">
        <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
            <Icon size={24} className="text-blue-600" />
        </div>
        <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 leading-snug">{description}</p>
        </div>
        <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-600 transition-colors self-center" />
    </Link>
);

function DashboardContent() {
    const { user } = useAuth();
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [defaultAddress, setDefaultAddress] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        Promise.all([
            fetchUserOrders().catch(() => []),
            fetchAddresses().catch(() => [])
        ]).then(([orders, addresses]) => {
            setRecentOrders(Array.isArray(orders) ? orders.slice(0, 3) : []);
            const addressList = Array.isArray(addresses) ? addresses : [];
            const primary = addressList.find((a: any) => a.isDefault) || addressList[0];
            setDefaultAddress(primary);
            setLoading(false);
        });
    }, [user]);

    const fullName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "User";

    return (
        <div className="space-y-10">
            {/* Greeting */}
            <div className="border-b border-gray-200 pb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Account</h1>
                <p className="mt-2 text-gray-600">
                    Hello, <span className="font-semibold">{fullName || user?.email}</span>. 
                    Manage your orders, profile, and preferences here.
                </p>
            </div>

            {/* Account Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AccountCard 
                    title="Your Orders" 
                    description="Track, return, or buy things again" 
                    icon={ShoppingBag} 
                    href="/dashboard/orders" 
                />
                <AccountCard 
                    title="Login & Security" 
                    description="Edit login, name, and mobile number" 
                    icon={ShieldCheck} 
                    href="/dashboard/settings" 
                />
                <AccountCard 
                    title="Your Addresses" 
                    description="Edit addresses for orders and gifts" 
                    icon={MapPin} 
                    href="/dashboard/addresses" 
                />
                <AccountCard 
                    title="Payment Options" 
                    description="Edit or add payment methods" 
                    icon={CreditCard} 
                    href="/dashboard/payment" 
                />
                <AccountCard 
                    title="Your Profile" 
                    description="Manage your public profile and bio" 
                    icon={UserIcon} 
                    href="/dashboard/profile" 
                />
                <AccountCard 
                    title="Contact Us" 
                    description="View support tickets and get help" 
                    icon={Headset} 
                    href="/support" 
                />
            </div>

            {/* Quick Status / Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-4">
                {/* Recent Orders Overview */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900">Recent Orders</h2>
                        <Link href="/dashboard/orders" className="text-sm font-medium text-blue-600 hover:underline">
                            View All
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {loading ? (
                            <div className="p-10 text-center text-gray-400 text-sm italic">Loading recent orders...</div>
                        ) : recentOrders.length === 0 ? (
                            <div className="p-10 text-center">
                                <Package size={32} className="mx-auto text-gray-300 mb-3" />
                                <p className="text-sm text-gray-500">No orders found.</p>
                            </div>
                        ) : (
                            recentOrders.map((order) => (
                                <Link key={order.id} href={`/dashboard/orders?id=${order.id}`} className="block p-5 hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{order.orderNumber}</span>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                                            order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
                                            order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="font-semibold text-gray-900">{order.items?.[0]?.productName || 'Order Items'}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(order.createdAt).toLocaleDateString()} · ₹{Number(order.total).toLocaleString()}
                                    </p>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* Default Address Overview */}
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <MapPin size={20} className="text-gray-400" />
                        <h2 className="font-bold text-gray-900 text-lg">Default Delivery Address</h2>
                    </div>
                    {loading ? (
                        <div className="h-24 bg-gray-50 rounded animate-pulse" />
                    ) : defaultAddress ? (
                        <div className="space-y-2">
                            <p className="font-bold text-gray-900">{defaultAddress.fullName}</p>
                            <p className="text-gray-600 text-sm">{defaultAddress.line1}</p>
                            {defaultAddress.line2 && <p className="text-gray-600 text-sm">{defaultAddress.line2}</p>}
                            <p className="text-gray-600 text-sm">{defaultAddress.city}, {defaultAddress.state} {defaultAddress.pincode}</p>
                            <p className="text-gray-600 text-sm">{defaultAddress.country}</p>
                            <p className="text-gray-600 text-sm pt-2">Phone: {defaultAddress.phone}</p>
                            <div className="pt-6">
                                <Link href="/dashboard/addresses" className="text-sm text-blue-600 font-semibold hover:underline">
                                    Edit Address
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <p className="text-sm text-gray-500 mb-4">No addresses saved yet.</p>
                            <Link href="/dashboard/addresses" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                                Add Address
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <AuthGuard>
            <DashboardContent />
        </AuthGuard>
    );
}


