'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash, FaLaptop, FaRupeeSign, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ention-backend.onrender.com';

interface Product {
    _id: string;
    model: string;
    name: string;
    basePrice: number;
    ramUpgrade: number;
    ssdUpgrade: number;
    warrantyUpgrade: number;
    description: string;
    isActive: boolean;
    updatedAt: string;
}

export default function AdminPanel() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [adminEmail, setAdminEmail] = useState<string | null>('');
    const router = useRouter();
    const [newProduct, setNewProduct] = useState({
        model: '',
        name: '',
        basePrice: 0,
        ramUpgrade: 3000,
        ssdUpgrade: 4000,
        warrantyUpgrade: 1000,
        description: '',
        isActive: true
    });

    // Check authentication and fetch products on component mount
    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken');
        const email = localStorage.getItem('adminEmail');

        if (!adminToken) {
            router.push('/admin/login');
            return;
        }

        setAdminEmail(email);
        fetchProducts();
    }, [router]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const adminToken = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });

            if (response.status === 401) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminEmail');
                router.push('/admin/login');
                return;
            }

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                toast.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    const initializeProducts = async () => {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/admin/products/initialize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                }
            });

            if (response.status === 401) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminEmail');
                router.push('/admin/login');
                return;
            }

            if (response.ok) {
                toast.success('Products initialized successfully!');
                fetchProducts();
            } else {
                toast.error('Failed to initialize products');
            }
        } catch (error) {
            console.error('Error initializing products:', error);
            toast.error('Error initializing products');
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct({ ...product });
    };

    const handleSave = async () => {
        if (!editingProduct) return;
        try {
            const adminToken = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/admin/products/${editingProduct.model}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                },
                body: JSON.stringify(editingProduct)
            });

            if (response.status === 401) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminEmail');
                router.push('/admin/login');
                return;
            }

            if (response.ok) {
                toast.success('Product updated successfully!');
                setEditingProduct(null);
                fetchProducts();
            } else {
                toast.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error updating product');
        }
    };

    const handleAddProduct = async () => {
        try {
            const adminToken = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                },
                body: JSON.stringify(newProduct)
            });

            if (response.status === 401) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminEmail');
                router.push('/admin/login');
                return;
            }

            if (response.ok) {
                toast.success('Product added successfully!');
                setShowAddForm(false);
                setNewProduct({
                    model: '',
                    name: '',
                    basePrice: 0,
                    ramUpgrade: 3000,
                    ssdUpgrade: 4000,
                    warrantyUpgrade: 1000,
                    description: '',
                    isActive: true
                });
                fetchProducts();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Error adding product');
        }
    };

    const handleDelete = async (model: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const adminToken = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/admin/products/${model}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });

            if (response.status === 401) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminEmail');
                router.push('/admin/login');
                return;
            }

            if (response.ok) {
                toast.success('Product deleted successfully!');
                fetchProducts();
            } else {
                toast.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Error deleting product');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        toast.success('Logged out successfully');
        router.push('/admin/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0FAFCA] via-[#007e9e] to-[#005a7a] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto"></div>
                    <p className="mt-6 text-white text-lg font-semibold">Loading ENTION Admin Panel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0FAFCA] via-[#007e9e] to-[#005a7a] pb-20">
            <div className="bg-white/95 backdrop-blur-sm shadow-xl border-b border-white/20 px-6 py-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-[#0FAFCA] to-[#007e9e] shadow-lg">
                            <FaLaptop className="h-8 w-8 text-white" />
                        </div>
                        <div className="ml-4 text-gray-900">
                            <h1 className="text-3xl font-bold">ENTION Admin</h1>
                            <p className="text-sm opacity-70">Management Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-gray-500">Admin</p>
                            <p className="text-sm font-medium text-gray-900">{adminEmail}</p>
                        </div>
                        <button onClick={initializeProducts} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2"><FaCog /> Initialize</button>
                        <button onClick={() => setShowAddForm(true)} className="bg-[#0FAFCA] hover:bg-[#007e9e] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2"><FaPlus /> Add Product</button>
                        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2"><FaSignOutAlt /> Logout</button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Models</p>
                        <p className="text-3xl font-black text-gray-900">{products.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Active Models</p>
                        <p className="text-3xl font-black text-gray-900">{products.filter(p => p.isActive).length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-500">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Last Update</p>
                        <p className="text-2xl font-black text-gray-900">{products.length > 0 ? new Date(products[0].updatedAt).toLocaleDateString() : 'N/A'}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="px-6 py-5 bg-gray-50 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800">Product List</h2></div>
                    {products.length === 0 ? (
                        <div className="p-20 text-center text-gray-400 font-medium">No products available. Click initialize to populate.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100/50 text-gray-600 text-xs font-bold uppercase">
                                        <th className="px-6 py-4">Model</th>
                                        <th className="px-6 py-4">Base Price</th>
                                        <th className="px-6 py-4">Upgrades (RAM/SSD/War)</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {products.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50/50 transition duration-150">
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-[#0FAFCA]">{product.model}</span>
                                                <div className="text-xs text-gray-400">{product.name}</div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-900">
                                                {editingProduct && editingProduct._id === product._id ? (
                                                    <input type="number" value={editingProduct.basePrice}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, basePrice: parseInt(e.target.value) || 0 })}
                                                        className="w-32 border p-2 rounded text-base font-bold bg-white focus:ring-2 focus:ring-[#0FAFCA]" />
                                                ) : `₹${product.basePrice.toLocaleString()}`}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {editingProduct && editingProduct._id === product._id ? (
                                                    <div className="flex gap-2">
                                                        <input type="number" value={editingProduct.ramUpgrade} onChange={(e) => setEditingProduct({ ...editingProduct, ramUpgrade: parseInt(e.target.value) || 0 })} className="w-20 border p-1 rounded" />
                                                        <input type="number" value={editingProduct.ssdUpgrade} onChange={(e) => setEditingProduct({ ...editingProduct, ssdUpgrade: parseInt(e.target.value) || 0 })} className="w-20 border p-1 rounded" />
                                                        <input type="number" value={editingProduct.warrantyUpgrade} onChange={(e) => setEditingProduct({ ...editingProduct, warrantyUpgrade: parseInt(e.target.value) || 0 })} className="w-20 border p-1 rounded" />
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                                        <span className="bg-blue-50 text-blue-600 p-1 rounded">RAM: ₹{product.ramUpgrade}</span>
                                                        <span className="bg-cyan-50 text-cyan-600 p-1 rounded">SSD: ₹{product.ssdUpgrade}</span>
                                                        <span className="bg-purple-50 text-purple-600 p-1 rounded">War: ₹{product.warrantyUpgrade}</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingProduct && editingProduct._id === product._id ? (
                                                    <select value={editingProduct.isActive.toString()} onChange={(e) => setEditingProduct({ ...editingProduct, isActive: e.target.value === 'true' })} className="border p-2 rounded">
                                                        <option value="true">Active</option>
                                                        <option value="false">Inactive</option>
                                                    </select>
                                                ) : (
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{product.isActive ? 'Active' : 'Inactive'}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingProduct && editingProduct._id === product._id ? (
                                                    <div className="flex gap-3">
                                                        <button onClick={handleSave} className="text-green-500 hover:scale-125 transition"><FaSave className="w-5 h-5" /></button>
                                                        <button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:scale-125 transition"><FaTimes className="w-5 h-5" /></button>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-4">
                                                        <button onClick={() => handleEdit(product)} className="text-[#0FAFCA] hover:scale-125 transition"><FaEdit className="w-5 h-5" /></button>
                                                        <button onClick={() => handleDelete(product.model)} className="text-red-400 hover:scale-125 transition"><FaTrash className="w-5 h-5" /></button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {showAddForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-xs font-bold text-gray-500 uppercase">Model</label><select value={newProduct.model} onChange={(e) => setNewProduct({ ...newProduct, model: e.target.value })} className="w-full border p-3 rounded-xl"><option value="">Model</option><option value="E3">E3</option><option value="E4">E4</option><option value="E5">E5</option></select></div>
                                <div><label className="text-xs font-bold text-gray-500 uppercase">Name</label><input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full border p-3 rounded-xl" placeholder="Full name" /></div>
                            </div>
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Base Price</label><input type="number" value={newProduct.basePrice} onChange={(e) => setNewProduct({ ...newProduct, basePrice: parseInt(e.target.value) || 0 })} className="w-full border p-3 rounded-xl" placeholder="Price" /></div>
                            <div className="grid grid-cols-3 gap-3">
                                <div><label className="text-xs font-bold text-gray-500 uppercase">RAM Upgrade</label><input type="number" value={newProduct.ramUpgrade} onChange={(e) => setNewProduct({ ...newProduct, ramUpgrade: parseInt(e.target.value) || 0 })} className="w-full border p-3 rounded-xl" /></div>
                                <div><label className="text-xs font-bold text-gray-500 uppercase">SSD Upgrade</label><input type="number" value={newProduct.ssdUpgrade} onChange={(e) => setNewProduct({ ...newProduct, ssdUpgrade: parseInt(e.target.value) || 0 })} className="w-full border p-3 rounded-xl" /></div>
                                <div><label className="text-xs font-bold text-gray-500 uppercase">Warranty</label><input type="number" value={newProduct.warrantyUpgrade} onChange={(e) => setNewProduct({ ...newProduct, warrantyUpgrade: parseInt(e.target.value) || 0 })} className="w-full border p-3 rounded-xl" /></div>
                            </div>
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Description</label><textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full border p-3 rounded-xl" rows={3} /></div>
                        </div>
                        <div className="flex justify-end gap-3 mt-8">
                            <button onClick={() => setShowAddForm(false)} className="px-6 py-2 text-gray-500 font-bold">Cancel</button>
                            <button onClick={handleAddProduct} className="px-8 py-2 bg-[#0FAFCA] text-white rounded-xl font-bold shadow-lg shadow-cyan-200">Create Product</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
