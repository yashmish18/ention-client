'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaUser, FaLock, FaMapMarkerAlt, FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authAPI } from '@/lib/api';
import { addressUtils } from '@/utils/checkout';
import { getUserFromToken } from '@/utils/auth';
import Link from 'next/link';

const ProfileContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState('profile');
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Profile State
    const [profileData, setProfileData] = useState({ name: '', phone: '' });

    // Password State
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

    // Address State
    const [addresses, setAddresses] = useState<any[]>([]);
    const [newAddress, setNewAddress] = useState({
        firstName: '', lastName: '', addressLine1: '', city: '', state: '', zipCode: '', phone: '', country: 'India'
    });
    const [showAddressForm, setShowAddressForm] = useState(false);

    useEffect(() => {
        const tab = searchParams?.get('tab');
        if (tab && ['profile', 'password', 'addresses'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    useEffect(() => {
        const checkAuth = async () => {
            const tokenUser = getUserFromToken();
            if (!tokenUser) {
                router.push('/login?redirect=/profile');
                return;
            }
            try {
                // Fetch fresh user info from the server
                const res = await authAPI.getCurrentUser();
                if (res.user) {
                    setUser(res.user);
                    setProfileData({ name: res.user.name || '', phone: res.user.phone || '' });
                } else {
                    setUser(tokenUser);
                    setProfileData({ name: tokenUser.name || '', phone: '' });
                }

                // Fetch Addresses
                const addrRes = await addressUtils.getUserAddresses();
                if (addrRes.success && addrRes.addresses) setAddresses(addrRes.addresses);
            } catch (err) {
                console.error("Failed fetching user data", err);
                setUser(tokenUser);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [router]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await authAPI.updateProfile(profileData);
            if (res.success) {
                toast.success('Profile updated successfully!');
                setUser(res.user);
            } else throw new Error(res.error || 'Update failed');
        } catch (err: any) {
            toast.error(err.message || 'Error updating profile');
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return toast.error('Passwords do not match');
        }
        try {
            const res = await authAPI.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            if (res.success) {
                toast.success('Password changed successfully!');
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else throw new Error(res.error || 'Failed to change password');
        } catch (err: any) {
            toast.error(err.message || 'Error changing password');
        }
    };

    const handleSaveAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await addressUtils.saveAddress(newAddress);
            if (res.success && res.address) {
                toast.success('Address saved!');
                setAddresses([...addresses, res.address]);
                setShowAddressForm(false);
                setNewAddress({ firstName: '', lastName: '', addressLine1: '', city: '', state: '', zipCode: '', phone: '', country: 'India' });
            } else throw new Error(res.error || 'Failed to save address');
        } catch (err: any) {
            toast.error(err.message || 'Error saving address');
        }
    };

    const handleDeleteAddress = async (id: string) => {
        if (!confirm('Delete this address?')) return;
        try {
            const res = await addressUtils.deleteAddress(id);
            if (res.success) {
                toast.success('Address deleted');
                setAddresses(addresses.filter(a => a._id !== id));
            } else throw new Error(res.error || 'Failed to delete address');
        } catch (err: any) {
            toast.error(err.message || 'Error deleting address');
        }
    };

    if (loading) return <div className="min-h-screen bg-[#f7fafc] flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard" className="text-gray-500 hover:text-gray-800 flex items-center gap-2"><FaArrowLeft /> Back to Dashboard</Link>
                    <h1 className="text-3xl font-bold text-[#133B5C]">Account Settings</h1>
                </div>

                <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden min-h-[500px]">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 bg-gray-100 border-r flex flex-col pt-6">
                        <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 p-4 border-l-4 transition ${activeTab === 'profile' ? 'border-[#0FAFCA] bg-white text-[#0FAFCA] font-bold' : 'border-transparent text-gray-600 hover:bg-gray-200'}`}>
                            <FaUser /> Profile Info
                        </button>
                        <button onClick={() => setActiveTab('password')} className={`flex items-center gap-3 p-4 border-l-4 transition ${activeTab === 'password' ? 'border-[#0FAFCA] bg-white text-[#0FAFCA] font-bold' : 'border-transparent text-gray-600 hover:bg-gray-200'}`}>
                            <FaLock /> Security
                        </button>
                        <button onClick={() => setActiveTab('addresses')} className={`flex items-center gap-3 p-4 border-l-4 transition ${activeTab === 'addresses' ? 'border-[#0FAFCA] bg-white text-[#0FAFCA] font-bold' : 'border-transparent text-gray-600 hover:bg-gray-200'}`}>
                            <FaMapMarkerAlt /> Addresses
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8">
                        {activeTab === 'profile' && (
                            <div className="max-w-md">
                                <h2 className="text-2xl font-bold mb-6 text-[#133B5C]">Profile Information</h2>
                                <form onSubmit={handleUpdateProfile} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email (Cannot be changed)</label>
                                        <input type="email" value={user?.email || ''} disabled className="w-full border p-2 rounded bg-gray-100 text-gray-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input type="text" value={profileData.name} onChange={e => setProfileData({ ...profileData, name: e.target.value })} required className="w-full border p-2 rounded focus:outline-none focus:border-[#0FAFCA]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input type="text" value={profileData.phone} onChange={e => setProfileData({ ...profileData, phone: e.target.value })} className="w-full border p-2 rounded focus:outline-none focus:border-[#0FAFCA]" />
                                    </div>
                                    <button type="submit" className="bg-[#0FAFCA] text-white px-6 py-2 rounded font-bold hover:bg-[#007e9e] transition">Save Profile</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'password' && (
                            <div className="max-w-md">
                                <h2 className="text-2xl font-bold mb-6 text-[#133B5C]">Change Password</h2>
                                <form onSubmit={handleChangePassword} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                        <input type="password" value={passwordData.currentPassword} onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })} required className="w-full border p-2 rounded focus:outline-none focus:border-[#0FAFCA]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                        <input type="password" value={passwordData.newPassword} onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })} required minLength={6} className="w-full border p-2 rounded focus:outline-none focus:border-[#0FAFCA]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                        <input type="password" value={passwordData.confirmPassword} onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} required minLength={6} className="w-full border p-2 rounded focus:outline-none focus:border-[#0FAFCA]" />
                                    </div>
                                    <button type="submit" className="bg-[#0FAFCA] text-white px-6 py-2 rounded font-bold hover:bg-[#007e9e] transition">Update Password</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-[#133B5C]">Your Addresses</h2>
                                    <button onClick={() => setShowAddressForm(!showAddressForm)} className="bg-[#0FAFCA] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#007e9e] transition text-sm font-bold">
                                        <FaPlus /> Add New
                                    </button>
                                </div>

                                {showAddressForm && (
                                    <form onSubmit={handleSaveAddress} className="mb-8 bg-gray-50 p-6 rounded border">
                                        <h3 className="font-bold mb-4">Add Address</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input required placeholder="First Name" value={newAddress.firstName} onChange={e => setNewAddress({ ...newAddress, firstName: e.target.value })} className="border p-2 rounded" />
                                            <input required placeholder="Last Name" value={newAddress.lastName} onChange={e => setNewAddress({ ...newAddress, lastName: e.target.value })} className="border p-2 rounded" />
                                            <input required placeholder="Phone" value={newAddress.phone} onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })} className="border p-2 rounded" />
                                            <input required placeholder="Address Line 1" value={newAddress.addressLine1} onChange={e => setNewAddress({ ...newAddress, addressLine1: e.target.value })} className="border p-2 rounded md:col-span-2" />
                                            <input required placeholder="City" value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} className="border p-2 rounded" />
                                            <input required placeholder="State" value={newAddress.state} onChange={e => setNewAddress({ ...newAddress, state: e.target.value })} className="border p-2 rounded" />
                                            <input required placeholder="Pincode" maxLength={6} value={newAddress.zipCode} onChange={e => setNewAddress({ ...newAddress, zipCode: e.target.value })} className="border p-2 rounded" />
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            <button type="submit" className="bg-[#133B5C] text-white px-6 py-2 rounded font-bold">Save</button>
                                            <button type="button" onClick={() => setShowAddressForm(false)} className="bg-gray-300 px-6 py-2 rounded">Cancel</button>
                                        </div>
                                    </form>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addresses.length === 0 && !showAddressForm ? (
                                        <div className="text-gray-500">No addresses saved yet.</div>
                                    ) : (
                                        addresses.map((addr) => (
                                            <div key={addr._id} className="border p-4 rounded bg-white shadow-sm flex flex-col">
                                                <div className="font-bold mb-2">{addr.firstName} {addr.lastName}</div>
                                                <div className="text-sm text-gray-600 mb-1">{addr.addressLine1}</div>
                                                <div className="text-sm text-gray-600 mb-1">{addr.city}, {addr.state} - {addr.zipCode}</div>
                                                <div className="text-sm text-gray-600 mb-4">Phone: {addr.phone}</div>
                                                <button onClick={() => handleDeleteAddress(addr._id)} className="mt-auto flex items-center gap-1 text-red-500 hover:text-red-700 font-bold text-sm bg-red-50 w-fit px-3 py-1 rounded">
                                                    <FaTrash /> Delete
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f7fafc] flex items-center justify-center">Loading...</div>}>
            <ProfileContent />
        </Suspense>
    );
}
