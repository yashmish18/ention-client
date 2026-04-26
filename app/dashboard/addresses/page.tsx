"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/store/useAuth";
import AuthGuard from "@/components/auth/AuthGuard";
import { MapPin, Plus, Loader2, Trash2, Edit2, CheckCircle2 } from "lucide-react";
import { fetchAddresses, deleteAddress, setDefaultAddress as apiSetDefaultAddress } from "@/lib/api";

function AddressesContent() {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadAddresses = () => {
        setLoading(true);
        fetchAddresses()
            .then(data => setAddresses(Array.isArray(data) ? data : []))
            .catch(() => setAddresses([]))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadAddresses();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this address?")) return;
        try {
            await deleteAddress(id);
            loadAddresses();
        } catch (err: any) {
            alert(err.message || "Failed to remove address.");
        }
    };

    const handleSetDefault = async (id: string) => {
        try {
            await apiSetDefaultAddress(id);
            loadAddresses();
        } catch (err: any) {
            alert(err.message || "Failed to set default address.");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Your Addresses</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage delivery addresses for your orders.</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-bold shadow-md transition-all">
                    <Plus size={16} />
                    Add New Address
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* New Address Placeholder */}
                <button className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 hover:border-gray-300 transition-all group min-h-[220px]">
                    <div className="p-4 rounded-full bg-white border border-gray-200 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                        <Plus size={32} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <span className="mt-4 font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Add Address</span>
                </button>

                {loading ? (
                    Array(2).fill(0).map((_, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm animate-pulse space-y-4">
                            <div className="h-4 bg-gray-100 rounded w-1/2" />
                            <div className="h-4 bg-gray-100 rounded w-full" />
                            <div className="h-4 bg-gray-100 rounded w-full" />
                            <div className="h-4 bg-gray-100 rounded w-3/4" />
                        </div>
                    ))
                ) : (
                    addresses.map((address) => (
                        <div 
                            key={address.id} 
                            className={`bg-white border rounded-lg p-6 shadow-sm relative group overflow-hidden ${
                                address.isDefault ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            {address.isDefault && (
                                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-bl-lg flex items-center gap-1.5 shadow-sm">
                                    <CheckCircle2 size={12} />
                                    Default
                                </div>
                            )}

                            <div className="space-y-1 mb-6">
                                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <span className="uppercase text-[10px] bg-gray-100 px-2 py-0.5 rounded tracking-widest">{address.label}</span>
                                    {address.fullName}
                                </p>
                                <p className="text-sm text-gray-600">{address.line1}</p>
                                {address.line2 && <p className="text-sm text-gray-600">{address.line2}</p>}
                                <p className="text-sm text-gray-600 font-medium">
                                    {address.city}, {address.state} — {address.pincode}
                                </p>
                                <p className="text-sm text-gray-600">{address.country}</p>
                                <p className="text-sm text-gray-600 pt-2 font-medium">Phone: {address.phone}</p>
                            </div>

                            <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                                <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                                    <Edit2 size={14} /> Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(address.id)}
                                    className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
                                >
                                    <Trash2 size={14} /> Remove
                                </button>
                                {!address.isDefault && (
                                    <button 
                                        onClick={() => handleSetDefault(address.id)}
                                        className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors ml-auto"
                                    >
                                        Set as Default
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Help / FAQ for addresses */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 flex gap-4 items-start">
                <div className="p-2 bg-white rounded-full text-blue-500 shadow-sm shrink-0">
                    <MapPin size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-blue-900 text-sm italic uppercase tracking-tight">Shipping Guidelines</h3>
                    <p className="text-xs text-blue-700/70 mt-1 leading-relaxed">
                        Accurate addresses ensure timely delivery of your Ention devices. Please double-check your pincode and phone number. Delivery partners may contact you on the provided phone number.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function AddressesPage() {
    return (
        <AuthGuard>
            <AddressesContent />
        </AuthGuard>
    );
}
