'use client';

import React, { useState } from 'react';
import UnifiedForm from '@/components/UnifiedForm';
import { IoClose } from 'react-icons/io5';

const Associate = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <main className={'main overflow-x-hidden relative'}>
            <div className="lg:full-screen max-h-[25vh] lg:min-h-[90vh] flex justify-center items-center ">
                <div className="py-20 lg:py-0">
                    <h1 className="w-full hidden md:block text-center text-white text-3xl md:text-4xl lg:text-6xl font-semibold px-0 md:px-10 pt-0 md:pt-14 lg:pt-0 ">
                        Welcome to the Ention&trade;
                    </h1>
                    <h1 className="w-full text-center text-white text-3xl md:text-4xl lg:text-6xl font-semibold px-0 md:px-10 mt-10 md:mt-0">
                        Associate Member program
                    </h1>
                    <div className='flex items-center justify-center'>
                        <button
                            onClick={() => setShowModal(true)}
                            className='bg-[#007E9E] text-[12px] md:text-lg font-semibold px-4 md:px-10 py-2 md:py-4 rounded-full mt-4 lg:mt-12 text-white mb-10 md:mb-20 lg:mb-0 transform hover:bg-primary hover:border-primary hover:scale-105 transition-all duration-300 ease-in-out'
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-[90%] lg:w-[80%] text-left text-white mb-10 md:mb-10 mx-auto md:mx-10 lg:mx-auto overflow-x-hidden ">
                <h2 className="text-3xl md:text-5xl font-semibold text-center pt-6 md:pt-10 lg:pt-10">Explore The Program</h2>
                <p className="w-full md:w-[80%] mx-auto mt-6 text-sm md:text-xl text-center pr-0 lg:pr-0">
                    Our ultimate destination &ldquo;India will be computing
                    manufacturing hub in coming future&rdquo;. <br />Let&apos;s come together to
                    make this dream come into reality. <br />
                    As we know this will happen with combined efforts of
                    everyone. For this we want to create a hand holding program
                    to come together to create history and make India as a
                    manufacturing hub in computing industry.
                </p>
            </div>

            <div className="w-full lg:w-[70%] h-full text-left text-white mb-4 lg:mb-16 px-4 mx-auto overflow-x-hidden ">
                <h2 className="w-[90%] mx-auto text-2xl md:text-4xl font-semibold pt-0 md:pt-10 lg:pt-14 text-center "> Discover how we can work together to achieve our common goal.</h2>
                <div className='text-white mb-4 md:mb-10 w-full flex flex-col md:flex-row items-center justify-center px-14 md:px-6 pt-0 md:pt-10 lg:pt-0'>
                    <div className='w-full hover:scale-105 transition duration-150 ease-in-out md:w-1/3 mt-8 md:mt-4 lg:mt-20'>
                        <div className='h-14 md:h-32 lg:h-52 border-2 border-[#007E9E] flex items-center justify-center py-14 md:py-20 px-4 md:px-10 rounded-t-md'>
                            <h3 className="text-md md:text-lg lg:text-2xl font-semibold text-center capitalize"> As investment partner</h3>
                        </div>
                        <button className='w-full h-10 lg:h-14 bg-[#007E9E] px-4 md:px-20 text-sm lg:text-[20px] text-white rounded-b-md'> Explore</button>
                    </div>
                    <div className='w-full hover:scale-105 transition duration-150 ease-in-out md:w-1/3 mt-8 md:mt-4 lg:mt-20 ml-0 md:ml-4 lg:ml-10'>
                        <div className='h-20 md:h-32 lg:h-52 border-2 border-[#007E9E] flex items-center justify-center py-14 md:py-20 px-10 rounded-t-md'>
                            <h3 className="text-md md:text-lg lg:text-2xl font-semibold text-center capitalize px-2">As OEM manufacturer of component</h3>
                        </div>
                        <button className='w-full h-10 lg:h-14 bg-[#007E9E] px-4 md:px-20 text-sm lg:text-[20px] text-white rounded-b-md'> Explore</button>
                    </div>
                    <div className='w-full hover:scale-105 transition duration-150 ease-in-out md:w-1/3 mt-8 md:mt-4 lg:mt-20 ml-0 md:ml-4 lg:ml-10'>
                        <div className='h-12 md:h-32 lg:h-52 border-2 border-[#007E9E] flex items-center justify-center py-14 md:py-20 px-10 rounded-t-md'>
                            <h3 className="text-md md:text-lg lg:text-2xl font-semibold text-center capitalize"> As dealer</h3>
                        </div>
                        <button className='w-full h-10 lg:h-14 bg-[#007E9E] px-4 md:px-20 text-sm lg:text-[20px] text-white rounded-b-md'> Explore</button>
                    </div>
                </div>
                <div className='text-white mb-12 w-full flex flex-col md:flex-row items-center justify-center px-14 md:px-10'>
                    <div className='w-full hover:scale-105 transition duration-150 ease-in-out md:w-1/3 mt-8 md:mt-4 lg:mt-0 '>
                        <div className='h-12 md:h-32 lg:h-52 border-2 border-[#007E9E] flex items-center justify-center py-14 md:py-20 px-10 rounded-t-md'>
                            <h3 className="text-md md:text-lg lg:text-2xl font-semibold text-center capitalize"> As warranty service provide </h3>
                        </div>
                        <button className='w-full h-10 lg:h-14 bg-[#007E9E] px-4 md:px-20 text-sm lg:text-[20px] text-white rounded-b-md'> Explore</button>
                    </div>
                    <div className='w-full hover:scale-105 transition duration-150 ease-in-out md:w-1/3 mt-8 md:mt-4 lg:mt-0 ml-0 md:ml-4 lg:ml-10'>
                        <div className='h-12 md:h-32 lg:h-52 border-2 border-[#007E9E] flex items-center justify-center py-14 md:py-20 px-10 rounded-t-md'>
                            <h3 className="text-md md:text-lg lg:text-2xl font-semibold text-center capitalize"> As free lancer </h3>
                        </div>
                        <button className='w-full h-10 lg:h-14 bg-[#007E9E] px-4 md:px-20 text-sm lg:text-[20px] text-white rounded-b-md'> Explore</button>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-[70%] h-full text-left text-white mb-10 lg:mb-20 mx-auto ">
                <div className='flex items-center justify-center '>
                    <button onClick={() => setShowModal(true)} className='bg-[#007E9E] px-4 md:px-10 py-2 md:py-4 mt-6 lg:mt-0 text-sm md:text-[17px] lg:text-lg text-white rounded-md transform hover:bg-primary hover:border-primary hover:scale-105 transition-all duration-300 ease-in-out'>Contact Us</button>
                </div>
            </div>

            {showModal && (
                <>
                    <div className="fixed inset-0 z-[1200] flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto w-auto max-w-3xl">
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-[#007E9E] shadow-lg outline-none focus:outline-none md:w-[30rem]">
                                <div className="relative items-start justify-between rounded px-8 py-4 md:w-[30rem]">
                                    <h3 className="text-center text-2xl font-semibold text-white">
                                        CONNECT US
                                    </h3>
                                    <IoClose
                                        className="absolute top-3 right-3 cursor-pointer text-3xl"
                                        onClick={() => setShowModal(false)}
                                    />
                                    <div className="mt-6">
                                        <UnifiedForm type="partnership" onSuccess={() => setShowModal(false)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-20 bg-black opacity-80" onClick={() => setShowModal(false)}></div>
                </>
            )}
        </main>
    );
};

export default Associate;
