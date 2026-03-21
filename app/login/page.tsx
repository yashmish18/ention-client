'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { login } from '@/utils/auth';
import bg1 from "../../public/assets/Group 2069.png";
import bg2 from "../../public/assets/Group 2070.png";

const LoginContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [passVisible, togglePass] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formValues, setFormValues] = useState({ email: '', password: '' });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push(searchParams.get('redirect') || '/');
        }
    }, [router, searchParams]);

    const validate = (values: typeof formValues) => {
        const errs: Record<string, string> = {};
        if (!values.email.trim()) {
            errs.email = 'Please enter your email.';
        } else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(values.email)) {
            errs.email = 'Please enter a valid email address.';
        }
        if (!values.password) {
            errs.password = 'Please enter your password.';
        }
        return errs;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate(formValues);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).some(k => validationErrors[k])) return;

        const id = toast.loading('Processing', { type: 'info', theme: 'colored' });

        try {
            const result = await login(formValues);

            if (result.success) {
                toast.update(id, { render: 'Login successful!', type: 'success', isLoading: false, autoClose: 2000 });
                router.push(searchParams.get('redirect') || '/');
            } else {
                toast.update(id, { render: result.error || 'Invalid credentials', type: 'error', isLoading: false, autoClose: 3000 });
            }
        } catch (error) {
            toast.update(id, { render: 'Login failed. Please try again.', type: 'error', isLoading: false, autoClose: 3000 });
        }
    };

    return (
        <main className={'main overflow-x-hidden relative min-h-screen flex items-center justify-center bg-[#0a192f] py-20'}>
            <Image src={bg1} alt="bg1" className="pointer-events-none select-none opacity-30 absolute top-0 left-0 w-1/2 max-w-[600px] z-0" style={{ objectFit: 'contain' }} />
            <Image src={bg2} alt="bg2" className="pointer-events-none select-none opacity-30 absolute bottom-0 right-0 w-1/2 max-w-[600px] z-0" style={{ objectFit: 'contain' }} />
            <div className='relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-stretch justify-center bg-white rounded-3xl shadow-2xl overflow-hidden'>
                <div className='flex-1 flex flex-col justify-center items-start bg-transparent p-8 md:p-12 min-w-[260px] text-gray-800'>
                    <h2 className='text-3xl font-extrabold text-cyan-600 mb-4'>Welcome back to Ention</h2>
                    <p className='text-lg mb-6 max-w-md'>
                        Log in to access your dashboard, track orders, and manage your custom Ention laptop configurations.
                    </p>
                    <ul className='list-disc pl-6 space-y-3 text-base italic'>
                        <li><b>Personalized:</b> Experience built just for you.</li>
                        <li><b>Secure:</b> Your data is protected.</li>
                    </ul>
                </div>
                <div className='flex-1 flex justify-center items-center bg-white p-8 md:p-12 min-w-[300px]'>
                    <form onSubmit={handleSubmit} className='w-full max-w-md bg-white backdrop-blur-md border border-[#007E9E] shadow-xl rounded-3xl px-8 py-10 flex flex-col gap-6'>
                        <div className="flex w-full justify-between mb-2">
                            <h2 className='cursor-pointer text-2xl text-center text-[#007E9E] font-bold border-b-4 border-b-[#007E9E] pb-2'>Login</h2>
                            <Link href="/signup">
                                <h2 className='cursor-pointer text-2xl text-center font-bold'>Signup</h2>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-5 mt-4">
                            <div className="relative">
                                <input
                                    className={`peer w-full h-12 px-3 pt-4 text-md rounded-lg border-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#007E9E] transition`}
                                    type="email"
                                    placeholder=" "
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                />
                                <label className={`absolute left-3 px-1 transition-all duration-200 bg-white pointer-events-none ${formValues.email ? '-top-3 text-xs text-[#007E9E]' : 'top-3 text-gray-500 text-md'}`}>
                                    Email
                                </label>
                                {errors.email && <div className="text-red-500 text-xs mt-1 ml-1">{errors.email}</div>}
                            </div>
                            <div className="relative">
                                <input
                                    className={`peer w-full h-12 px-3 pt-4 text-md rounded-lg border-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#007E9E] transition`}
                                    type={passVisible ? "text" : "password"}
                                    placeholder=" "
                                    name="password"
                                    value={formValues.password}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                />
                                <label className={`absolute left-3 px-1 transition-all duration-200 bg-white pointer-events-none ${formValues.password ? '-top-3 text-xs text-[#007E9E]' : 'top-3 text-gray-500 text-md'}`}>
                                    Password
                                </label>
                                <span className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-xl text-gray-400' onClick={() => togglePass(!passVisible)}>{passVisible ? <FiEyeOff /> : <FiEye />}</span>
                                {errors.password && <div className="text-red-500 text-xs mt-1 ml-1">{errors.password}</div>}
                            </div>
                        </div>
                        <div className="flex justify-end mb-2">
                            <Link href="/forgot-password" title="Coming Soon" className="text-xs text-[#007E9E] hover:underline">Forgot password?</Link>
                        </div>
                        <button type="submit" className='w-full h-12 text-white text-lg rounded-lg bg-[#007E9E] hover:bg-[#005f7a] font-semibold transition'>Log In</button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0a192f]" />}>
            <LoginContent />
        </Suspense>
    );
}
