"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    ShoppingBag, 
    User, 
    MapPin, 
    Settings, 
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useAuth } from "@/store/useAuth";
import { clearAuthCookies } from "@/components/auth/AuthForm";

const sidebarLinks = [
    { name: "Account Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { name: "Shipping Addresses", href: "/dashboard/addresses", icon: MapPin },
    { name: "Profile Settings", href: "/dashboard/profile", icon: User },
    { name: "Account Security", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        clearAuthCookies();
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
                <div className="h-full flex flex-col">
                    <div className="px-6 py-8 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Account Dashboard</h2>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500">
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.href;
                            const Icon = link.icon;
                            return (
                                <Link 
                                    key={link.name} 
                                    href={link.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                        isActive 
                                        ? "bg-gray-100 text-gray-900 border border-gray-200" 
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                    <Icon size={18} className={isActive ? "text-gray-900" : "text-gray-400"} />
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-100">
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
                <span className="text-lg font-bold">Dashboard</span>
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-600">
                    <Menu size={24} />
                </button>
            </div>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto p-4 lg:p-10">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
