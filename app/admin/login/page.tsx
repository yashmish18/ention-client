'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock, FaEnvelope, FaLaptop } from 'react-icons/fa';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ention-backend.onrender.com';

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Check if already logged in
    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            router.push('/admin');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminEmail', data.admin.email);
                toast.success('Admin login successful!');
                router.push('/admin');
            } else {
                toast.error(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0FAFCA] via-[#007e9e] to-[#005a7a] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-[#0FAFCA] to-[#007e9e] rounded-2xl shadow-xl mb-6 transform -rotate-6">
                        <FaLaptop className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">ENTION Admin</h1>
                    <p className="text-gray-500 font-medium tracking-tight">Enterprise Infrastructure Access</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                            Email Address
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-[#0FAFCA] transition-colors">
                                <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-[#0FAFCA]" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleInputChange}
                                required
                                className="block w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-[#0FAFCA] transition-all bg-gray-50/50"
                                placeholder="admin@ention.in"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                            Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-[#0FAFCA] transition-colors">
                                <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#0FAFCA]" />
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                                required
                                className="block w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-[#0FAFCA] transition-all bg-gray-50/50"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#0FAFCA] to-[#007e9e] text-white font-bold py-4 rounded-2xl shadow-xl shadow-cyan-200/50 hover:shadow-cyan-300/60 transition-all duration-300 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-10 text-center space-y-2">
                    <p className="text-xs text-gray-400 font-medium italic">
                        © 2024 ENTION. Proudly Made in India.
                    </p>
                </div>
            </div>
        </div>
    );
}
