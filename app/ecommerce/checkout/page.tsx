'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'react-use';
import { checkoutProcess, deliveryUtils, orderUtils, paymentUtils } from '../../../utils/checkout';

interface User {
    id: string;
    name: string;
    email: string;
}

interface Product {
    model: string;
    basePrice: number;
    selectedRam: string;
    selectedSSD: string;
    selectedWarranty: string;
    ramUpgrade: number;
    ssdUpgrade: number;
    warrantyUpgrade: number;
    name: string;
    images: string[];
}

interface Address {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
}

export default function CheckoutPage() {
    const router = useRouter();
    const [cart] = useLocalStorage<any[]>("cart", []);
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const authChecked = useRef(false);

    useEffect(() => {
        if (authChecked.current) return;

        const checkAuth = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                if (window.location.pathname !== '/ecommerce/checkout') {
                    router.push("/login?redirect=/ecommerce/checkout");
                }
                return;
            }

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({
                    id: payload.id,
                    name: payload.name,
                    email: payload.email
                });
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('token');
                if (window.location.pathname !== '/ecommerce/checkout') {
                    router.push("/login?redirect=/ecommerce/checkout");
                }
                return;
            }
            setAuthLoading(false);
        };

        checkAuth();
        authChecked.current = true;
    }, [router]);

    useEffect(() => {
        if (typeof window !== 'undefined' && !(window as any).Razorpay) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);

    const [product, setProduct] = useState<Product>({
        model: 'E3',
        basePrice: 28000,
        selectedRam: '8GB',
        selectedSSD: '512GB',
        selectedWarranty: '18 Months (Default)',
        ramUpgrade: 3000,
        ssdUpgrade: 4000,
        warrantyUpgrade: 1000,
        name: 'ENTION Laptop E3',
        images: ['/assets/product_/e3/cover-img.webp']
    });

    const [step, setStep] = useState(1);
    const [paymentMode, setPaymentMode] = useState<'card' | 'cod'>('card');

    const [shippingAddress, setShippingAddress] = useState<Address>({
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',
        phone: ''
    });

    const [pincodeValid, setPincodeValid] = useState(false);
    const [pincodeLoading, setPincodeLoading] = useState(false);

    const calculateTotal = () => {
        let total = product.basePrice;
        if (product.selectedRam === '16GB') total += product.ramUpgrade;
        if (product.selectedSSD === '1TB') total += product.ssdUpgrade;
        if (product.selectedWarranty === '+6 Months') total += product.warrantyUpgrade;
        if (product.selectedWarranty === '+1 Year') total += product.warrantyUpgrade * 1.8;
        total += 150; // shipping
        if (paymentMode === 'cod') total += 50;
        return total;
    };

    const total = calculateTotal();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const productModel = urlParams.get('model') || 'E3';
        const selectedRam = urlParams.get('ram') || '8GB';
        const selectedSSD = urlParams.get('ssd') || '512GB';
        const selectedWarranty = urlParams.get('warranty') || '18 Months (Default)';

        const getBasePrice = (model: string) => {
            switch (model) {
                case 'E4': return 59999;
                default: return 28000;
            }
        };

        const basePrice = getBasePrice(productModel);

        setProduct({
            model: productModel,
            basePrice: basePrice,
            selectedRam,
            selectedSSD,
            selectedWarranty,
            ramUpgrade: productModel === 'E4' ? 4000 : 3000,
            ssdUpgrade: productModel === 'E4' ? 5000 : 4000,
            warrantyUpgrade: productModel === 'E4' ? 1500 : 1000,
            name: `ENTION Laptop ${productModel}`,
            images: [`/assets/product_/${productModel.toLowerCase()}/cover-img.webp`]
        });
    }, []);

    useEffect(() => {
        if (user?.name) {
            const nameParts = user.name.split(' ');
            setShippingAddress(prev => ({
                ...prev,
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || ''
            }));
        }
    }, [user]);

    const validatePincode = async (pincode: string) => {
        if (!pincode || pincode.length !== 6) {
            setPincodeValid(false);
            return;
        }
        setPincodeLoading(true);
        try {
            const result = await deliveryUtils.checkPincodeServiceability(pincode);
            if (result.success && result.serviceability.serviceable) {
                setPincodeValid(true);
                const { city, state } = result.serviceability;
                toast.success(`Pincode ${pincode} is serviceable!`);
                setShippingAddress(prev => ({ ...prev, city: city || prev.city, state: state || prev.state }));
            } else {
                setPincodeValid(false);
                toast.error(`Pincode ${pincode} is not serviceable.`);
            }
        } catch (error) {
            setPincodeValid(false);
            toast.error('Error checking pincode.');
        } finally {
            setPincodeLoading(false);
        }
    };

    const handleAddressChange = (field: keyof Address, value: string) => {
        setShippingAddress(prev => ({ ...prev, [field]: value }));
        if (field === 'zipCode' && value.length === 6) {
            validatePincode(value);
        } else if (field === 'zipCode') {
            setPincodeValid(false);
        }
    };

    const steps = ['Shipping', 'Payment', 'Review'];

    const validateStep = (stepNum: number) => {
        if (stepNum === 1) {
            const required: (keyof Address)[] = ['firstName', 'lastName', 'addressLine1', 'city', 'state', 'zipCode', 'phone'];
            const missing = required.filter(f => !shippingAddress[f]);
            if (missing.length > 0) {
                toast.error(`Please fill in all required fields`);
                return false;
            }
            if (!pincodeValid) {
                toast.error('Please enter a valid serviceable pincode');
                return false;
            }
        }
        return true;
    };

    const nextStep = () => { if (validateStep(step)) setStep(prev => Math.min(prev + 1, 3)); };
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const processPayment = async () => {
        if (!validateStep(3)) return;
        setLoading(true);
        const toastId = toast.loading('Processing...');

        try {
            const checkoutData = { product: { ...product, price: total }, shippingAddress, user, paymentMethod: paymentMode };
            if (paymentMode === 'card') {
                const orderResult = await orderUtils.createOrder({ ...checkoutData, userId: user?.id });
                if (!orderResult.success) throw new Error(orderResult.error);
                const paymentResult = await paymentUtils.initializeRazorpayPayment({ ...checkoutData, orderNumber: orderResult.order.orderNumber });
                if (paymentResult.success) {
                    toast.update(toastId, { render: "Gateway opened", type: "success", isLoading: false, autoClose: 2000 });
                } else throw new Error(paymentResult.error);
            } else {
                const result = await checkoutProcess.completeCheckout({ ...checkoutData, paymentMethod: 'cod' });
                if (result.success) {
                    toast.update(toastId, { render: "Order placed!", type: "success", isLoading: false, autoClose: 3000 });
                    setTimeout(() => router.push('/dashboard'), 3000);
                } else throw new Error(result.error);
            }
        } catch (error: any) {
            toast.update(toastId, { render: error.message || "Failed", type: "error", isLoading: false, autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return <div className="min-h-screen pt-32 text-center text-white">Loading...</div>;

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#133B5C] via-[#0FAFCA] to-[#007e9e] pt-32 pb-20 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <div className="flex-1 p-8">
                    <div className="flex items-center gap-4 mb-8">
                        {step > 1 && <FaArrowLeft className="cursor-pointer" onClick={prevStep} />}
                        <h2 className="text-2xl font-bold text-[#0FAFCA]">Checkout</h2>
                    </div>
                    <div className="flex justify-between mb-8">
                        {steps.map((label, i) => (
                            <div key={i} className={`flex-1 text-center border-b-2 py-2 ${step === i + 1 ? 'border-cyan-500 text-cyan-500 font-bold' : 'border-gray-200 text-gray-400'}`}>
                                {label}
                            </div>
                        ))}
                    </div>

                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input placeholder="First Name" value={shippingAddress.firstName} onChange={e => handleAddressChange('firstName', e.target.value)} className="border p-3 rounded" />
                            <input placeholder="Last Name" value={shippingAddress.lastName} onChange={e => handleAddressChange('lastName', e.target.value)} className="border p-3 rounded" />
                            <input placeholder="Address Line 1" value={shippingAddress.addressLine1} onChange={e => handleAddressChange('addressLine1', e.target.value)} className="border p-3 rounded md:col-span-2" />
                            <input placeholder="City" value={shippingAddress.city} onChange={e => handleAddressChange('city', e.target.value)} className="border p-3 rounded" />
                            <input placeholder="State" value={shippingAddress.state} onChange={e => handleAddressChange('state', e.target.value)} className="border p-3 rounded" />
                            <input placeholder="Pincode" maxLength={6} value={shippingAddress.zipCode} onChange={e => handleAddressChange('zipCode', e.target.value)} className="border p-3 rounded" />
                            <input placeholder="Phone" value={shippingAddress.phone} onChange={e => handleAddressChange('phone', e.target.value)} className="border p-3 rounded" />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <label className="flex items-center gap-2">
                                <input type="radio" checked={paymentMode === 'card'} onChange={() => setPaymentMode('card')} />
                                <span>Card / UPI (Razorpay)</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" checked={paymentMode === 'cod'} onChange={() => setPaymentMode('cod')} />
                                <span>Cash on Delivery</span>
                            </label>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 text-gray-700">
                            <div className="bg-gray-50 p-4 rounded">
                                <h3 className="font-bold mb-2">Order Review</h3>
                                <p>{product.name}</p>
                                <p className="text-sm">{product.selectedRam} | {product.selectedSSD} | {product.selectedWarranty}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                                <h3 className="font-bold mb-2">Shipping to</h3>
                                <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                                <p>{shippingAddress.addressLine1}, {shippingAddress.city}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full md:w-80 bg-gray-50 p-8 border-l border-gray-200">
                    <h3 className="text-xl font-bold mb-6">Summary</h3>
                    <div className="space-y-2 mb-6 text-sm">
                        <div className="flex justify-between"><span>Base Price</span><span>₹{product.basePrice.toLocaleString()}</span></div>
                        {product.selectedRam === '16GB' && <div className="flex justify-between"><span>RAM Upgrade</span><span>₹{product.ramUpgrade.toLocaleString()}</span></div>}
                        <div className="flex justify-between"><span>Shipping</span><span>₹150</span></div>
                        <div className="flex justify-between font-bold text-lg pt-4 border-t"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
                    </div>
                    <button
                        disabled={loading || (step === 1 && !pincodeValid)}
                        onClick={step < 3 ? nextStep : processPayment}
                        className="w-full py-3 bg-[#0FAFCA] text-white rounded-lg font-bold hover:bg-[#007e9e]"
                    >
                        {loading ? '...' : step < 3 ? 'Next' : 'Place Order'}
                    </button>
                </div>
            </div>
        </main>
    );
}
