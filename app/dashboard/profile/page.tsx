"use client";

import React, { useState } from "react";
import { useAuth } from "@/store/useAuth";
import AuthGuard from "@/components/auth/AuthGuard";
import { User, Mail, Phone, Camera, Save, Loader2 } from "lucide-react";
import { updateProfile } from "@/lib/api";

function ProfileContent() {
    const { user, setAuth, token } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    
    // Initial state from user data
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const updatedUser = await updateProfile({
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone
            });
            
            // Sync with global store
            if (token) {
                setAuth(updatedUser, token);
            }
            
            alert("Profile updated successfully!");
        } catch (err: any) {
            alert(err.message || "Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-3xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4">Personal Information</h1>
                <p className="text-sm text-gray-500 mt-2">Manage your public profile information and contact details.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-8 space-y-10">
                    {/* Avatar section */}
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <div className="w-24 h-24 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center text-3xl font-bold text-gray-400">
                                {user?.firstName?.[0] || user?.email?.[0]}
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 text-gray-600 transition-colors">
                                <Camera size={16} />
                            </button>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 leading-none mb-2">Profile Photo</h3>
                            <p className="text-xs text-gray-500">Pick a photo that shows your face. It will be helpful for delivery personnel.</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">First Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="John"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Last Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-400 cursor-not-allowed"
                                    placeholder="john.doe@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-6 flex justify-end">
                            <button 
                                type="submit"
                                disabled={isSaving}
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-sm font-bold shadow-md transition-all disabled:opacity-50"
                            >
                                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Account Status / Meta Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Account Status</p>
                        <p className="text-sm font-bold text-green-600 mt-1 uppercase">{user?.status || 'ACTIVE'}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Member Since</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">April 2024</p>
                </div>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <AuthGuard>
            <ProfileContent />
        </AuthGuard>
    );
}
