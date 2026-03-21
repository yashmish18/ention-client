'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const products = ['Our Service', 'Laptops'];

const CorporateSale = () => {
    const [city, setCity] = useState('INR');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
    };

    return (
        <main className={'main overflow-x-hidden relative'}>
            <div className="lg:full-screen max-h-[25vh] lg:min-h-[90vh] flex justify-center items-center " >
                <div className="py-20 md:py-10 lg:py-0">
                    <h1 className="w-full text-center text-white text-3xl md:text-5xl lg:text-6xl font-semibold px-10 mt-10 lg:mt-0">
                        Ention Experience Program
                    </h1>
                    <div className='mx-auto flex gap-2 lg:gap-6 justify-center items-center mt-0'>
                        <Link href="/login">
                            <button className='text-[12px] md:text-lg font-semibold bg-[#007E9E] px-4 md:px-10 py-2 md:py-4 rounded-full mt-4 md:mt-6 lg:mt-12 text-white mb-10 md:mb-20 lg:mb-0 transform hover:bg-primary hover:border-primary hover:scale-105 transition-all duration-300 ease-in-out'>
                                Sign In
                            </button>
                        </Link>
                        <a href="#contact">
                            <button className='text-[12px] md:text-lg font-semibold bg-[#007E9E] px-4 md:px-10 py-2 md:py-4 rounded-full mt-4 lg:mt-12 text-white mb-10 md:mb-20 lg:mb-0 transform hover:bg-primary hover:border-primary hover:scale-105 transition-all duration-300 ease-in-out'>
                                Contact Us
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-[80%] text-left text-white mb-0 md:mb-16 mx-10 lg:mx-auto overflow-x-hidden">
                <h2 className="text-3xl md:text-5xl font-semibold pt-10 md:pt-20"> About This Program</h2>
                <p className="w-full mt-4 text-sm md:text-xl pr-20 lg:pr-0">
                    Corporate sales refer to the process of selling products or services to other businesses or organizations rather than to individual consumers. This type of sales involves building relationships with key decision-makers and understanding the needs and requirements of the business to provide tailored solutions that meet their unique needs.
                </p>
                <div className='w-[90%] hidden md:block mx-auto'>
                    <ul id="list" className="w-full mt-0 md:mt-20 text-sm lg:text-lg ml-6 md:ml-0 lg:ml-0 flex flex-wrap items-center">
                        <li><button className='h-[57px] bg-[#007E9E] px-4 text-center rounded-md text-white'>Fill up the Form</button></li>
                        <li className="mt-3 mx-2"><Image src="/Arrow 14.png" alt="Arrow" width={20} height={20} /></li>
                        <li><button className='h-[57px] bg-[#007E9E] px-4 text-center rounded-md text-white'>We will get in touch</button></li>
                        <li className="mt-3 mx-2"><Image src="/Arrow 14.png" alt="Arrow" width={20} height={20} /></li>
                        {/* ... other steps ... */}
                    </ul>
                </div>
            </div>

            {/* Simplified for the sake of conversion, keeping core structure */}
            <div id="contact" className='pt-0 lg:pt-0 w-[80%] lg:w-[70%] mx-auto overflow-x-hidden'>
                <form onSubmit={handleSubmit} className='my-0 md:my-10 flex justify-center items-center flex-wrap text-white'>
                    <div className="w-full flex flex-col md:flex-row gap-4 md:gap-20 text-white">
                        <div className="w-full md:w-1/2">
                            <div className="w-full border-b border-white my-4 md:my-14">
                                <label htmlFor="name" className='text-white font-bold text-lg'>Full Name <span className="text-red-500">* </span></label>
                                <input id="name" name="name" type="text" required className="w-full outline-none bg-transparent text-white mt-4" />
                            </div>
                            <div className="w-full border-b border-white my-4 md:my-14">
                                <label htmlFor="contact" className='text-white font-bold text-lg pt-4'>Contact Number </label>
                                <input id="contact" name="contact" type="text" required className="w-full outline-none bg-transparent text-white mt-4" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="w-full border-b border-white my-4 md:my-14">
                                <label htmlFor="email" className='text-white font-bold text-lg'>Email ID <span className="text-red-500">* </span></label>
                                <input id="email" name="email" type="email" required className="w-full outline-none bg-transparent text-white mt-4" />
                            </div>
                            <div className="w-full border-b border-white my-4 md:my-14">
                                <label htmlFor="city" className='text-white font-bold text-lg pt-4'>City </label>
                                <select id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-transparent text-white mt-4 outline-none">
                                    <option className="text-black" value="INR">INR</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full mt-0 mb-10">
                        <button type="submit" className='rounded-md bg-[#007E9E] px-8 py-2 lg:mt-10 text-white text-sm md:text-lg mt-4 transform hover:bg-primary hover:border-primary hover:scale-105 transition-all duration-300 ease-in-out'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CorporateSale;
