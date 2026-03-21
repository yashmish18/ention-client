'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import bg1 from "../../public/assets/Group 2069.png";
import bg2 from "../../public/assets/Group 2070.png";
import { signup } from '@/utils/auth';

const Signup = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [passVisible, togglePass] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push(searchParams.get('redirect') || '/');
        }
    }, [router, searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.dismiss();

        const id = toast.loading('Processing', { type: 'info', theme: 'colored' });

        if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
            try {
                const result = await signup({
                    name,
                    email,
                    phone,
                    password
                });

                if (result.success) {
                    toast.update(id, { render: 'Your account has been created successfully!', type: 'success', isLoading: false, autoClose: 3000 });
                    router.push('/login');
                } else {
                    toast.update(id, {
                        render: (
                            <div>
                                <h4 className="text-base font-bold">Failed to create account</h4>
                                <h5 className="text-sm"> Err: {result.error} </h5>
                            </div>
                        ), type: 'error', isLoading: false, autoClose: 3000
                    });
                }
            } catch (error) {
                toast.update(id, { render: 'Failed to create account. Please try again.', type: 'error', isLoading: false, autoClose: 3000 });
            }
            return;
        }
        toast.update(id, { render: 'Please enter valid email address', type: 'error', isLoading: false, autoClose: 3000 });
    };

    return (
        <main className={'main overflow-x-hidden relative min-h-screen flex items-center justify-center bg-[#0a192f] py-20'}>
            <Image src={bg1} alt="bg1" className="pointer-events-none select-none opacity-30 absolute top-0 left-0 w-1/2 max-w-[600px] z-0" style={{ objectFit: 'contain' }} />
            <Image src={bg2} alt="bg2" className="pointer-events-none select-none opacity-30 absolute bottom-0 right-0 w-1/2 max-w-[600px] z-0" style={{ objectFit: 'contain' }} />
            <div className='relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-stretch justify-center bg-white rounded-3xl shadow-2xl overflow-hidden'>
                <div className='flex-1 flex flex-col justify-center items-start bg-transparent p-8 md:p-12 min-w-[260px]'>
                    <h2 className='text-3xl font-extrabold text-cyan-600 mb-4'>Welcome to Ention</h2>
                    <p className='text-lg text-[#0d223a] mb-6 max-w-md'>
                        Empowering Nations through Technology, Innovation, Opportunity, and New Ideas.<br />
                        <span className='text-[#007E9E] font-semibold'>Proudly Made in India.</span>
                    </p>
                    <ul className='list-disc pl-6 space-y-3 text-[#222] text-base'>
                        <li><b>Customization:</b> Tailor your laptop to your needs.</li>
                        <li><b>Performance:</b> Intel® & AMD chipsets.</li>
                        <li><b>Affordability:</b> Premium features at a fair price.</li>
                        <li><b>18-Month Warranty:</b> At your doorstep.</li>
                        <li><b>Expert Support:</b> Fast, reliable help.</li>
                    </ul>
                </div>
                <div className='flex-1 flex justify-center items-center bg-white p-8 md:p-12 min-w-[300px]'>
                    <form onSubmit={handleSubmit} className='w-full max-w-md bg-white backdrop-blur-md border border-[#007E9E] shadow-xl rounded-3xl px-8 py-10 flex flex-col gap-6'>
                        <div className="flex w-full justify-between mb-2">
                            <Link href="/login">
                                <h2 className='cursor-pointer text-2xl text-center font-bold'>Login</h2>
                            </Link>
                            <h2 className='cursor-pointer text-2xl text-center text-[#007E9E] font-bold border-b-4 border-b-[#007E9E] pb-2'>Signup</h2>
                        </div>
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="relative">
                                <input
                                    className={`peer w-full h-12 px-3 pt-4 text-md rounded-lg border-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#007E9E] transition`}
                                    type="text"
                                    required
                                    placeholder=" "
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <label className={`absolute left-3 transition-all duration-200 bg-white px-1 pointer-events-none ${name ? '-top-3 text-xs text-[#007E9E]' : 'top-3 text-gray-500 text-md'}`}>Name</label>
                            </div>
                            <div className="relative">
                                <input
                                    className={`peer w-full h-12 px-3 pt-4 text-md rounded-lg border-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#007E9E] transition`}
                                    type="email"
                                    required
                                    placeholder=" "
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <label className={`absolute left-3 transition-all duration-200 bg-white px-1 pointer-events-none ${email ? '-top-3 text-xs text-[#007E9E]' : 'top-3 text-gray-500 text-md'}`}>Email</label>
                            </div>
                            <div className="relative">
                                <input
                                    className={`peer w-full h-12 px-3 pt-4 text-md rounded-lg border-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#007E9E] transition`}
                                    type="tel"
                                    required
                                    placeholder=" "
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                                <label className={`absolute left-3 transition-all duration-200 bg-white px-1 pointer-events-none ${phone ? '-top-3 text-xs text-[#007E9E]' : 'top-3 text-gray-500 text-md'}`}>Phone</label>
                            </div>
                            <div className="relative">
                                <input
                                    className={`peer w-full h-12 px-3 pt-4 text-md rounded-lg border-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#007E9E] transition`}
                                    type={passVisible ? "text" : "password"}
                                    required
                                    placeholder=" "
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <label className={`absolute left-3 transition-all duration-200 bg-white px-1 pointer-events-none ${password ? '-top-3 text-xs text-[#007E9E]' : 'top-3 text-gray-500 text-md'}`}>Password</label>
                                <span className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-xl text-gray-400' onClick={() => togglePass(!passVisible)}>{passVisible ? <FiEyeOff /> : <FiEye />}</span>
                            </div>
                        </div>
                        <button type="submit" className='w-full h-12 text-white text-lg rounded-lg bg-[#007E9E] hover:bg-[#005f7a] font-semibold transition'>Sign Up</button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default function SignupPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0a192f]" />}>
            <Signup />
        </Suspense>
    );
}
