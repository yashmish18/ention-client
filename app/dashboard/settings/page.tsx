"use client";

import React, { useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { Lock, Bell, Eye, EyeOff, Shield, Smartphone, Loader2 } from "lucide-react";
import { changePassword } from "@/lib/api";

function SettingsContent() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert("New passwords do not match.");
            return;
        }
        setIsSaving(true);
        try {
            await changePassword(passwords.current, passwords.new);
            alert("Password changed successfully!");
            setPasswords({ current: "", new: "", confirm: "" });
        } catch (err: any) {
            alert(err.message || "Failed to change password.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-3xl space-y-8">
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold text-gray-900">Account Security</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your password, login methods, and account security.</p>
            </div>

            <div className="space-y-6">
                {/* Password Section */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Lock size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900">Change Password</h3>
                    </div>
                    <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                    value={passwords.current}
                                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">New Password</label>
                                <input 
                                    type="password" 
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Min 8 characters"
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                    required
                                    minLength={8}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Confirm New Password</label>
                                <input 
                                    type="password" 
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Repeat password"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                        <div className="pt-4 flex justify-end">
                            <button 
                                type="submit"
                                disabled={isSaving}
                                className="bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSaving && <Loader2 size={14} className="animate-spin" />}
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>

                {/* Two Factor Section */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <Smartphone size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Two-Factor Authentication</h3>
                            <p className="text-xs text-gray-500">Secure your account with an extra layer of security.</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-blue-600 hover:underline">
                        Enable
                    </button>
                </div>

                {/* Active Sessions */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                        <div className="p-2 bg-gray-50 text-gray-600 rounded-lg">
                            <Shield size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900">Active Sessions</h3>
                    </div>
                    <div className="divide-y divide-gray-100 font-mono">
                        <div className="p-6 flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-gray-900">Chrome on Windows (Current)</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Delhi, India // 192.168.1.1</p>
                            </div>
                            <span className="text-[9px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">ACTIVE</span>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                            <Bell size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900">Notifications</h3>
                    </div>
                    <div className="space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <span className="text-sm text-gray-700 font-medium">Order status updates via Email</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <span className="text-sm text-gray-700 font-medium">New product announcements</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SettingsPage() {
    return (
        <AuthGuard>
            <SettingsContent />
        </AuthGuard>
    );
}
