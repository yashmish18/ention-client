'use client';

import React, { useState, useRef } from 'react';
import { AiOutlineInfoCircle } from "react-icons/ai";
import UnifiedForm from '@/components/UnifiedForm';
import { IoClose } from 'react-icons/io5';

const Career = () => {
    const [currTab, setCurrTab] = useState(0);
    const divRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(false);

    const jobs = [
        { title: 'Technical Staff', category: 'Technology', available: 'true' },
        { title: 'Developer', category: 'Technology', available: 'false' },
        { title: 'Sales Staff', category: 'Sales', available: 'false' },
        { title: 'Semi Qualifed CA/CS', category: 'Finance And Accounting', available: 'false' },
        { title: 'Makreting Head', category: 'Marketing', available: 'false' },
        { title: 'Marketing analyst', category: 'Marketing', available: 'false' },
        { title: 'Financial analyst', category: 'Finance And Accounting', available: 'false' },
    ];

    return (
        <main className={`main `}>
            <div className="w-full pt-10 md:pt-28 pb-10 md:pb-14 text-center text-white">
                <h1 className="text-5xl md:text-8xl font-semibold mb-5"> Look For Job </h1>
                <p className="max-w-[60%] md:max-w-[40%] mx-auto text-sm md:text-xl">Looking for a job, a collaborative team, and limitless prospects for advancement? You&apos;ve arrived to the right place.</p>
            </div>

            <div ref={divRef} className="px-10 lg:px-24 pt-0 md:pt-14 text-white w-full mb-10 lg:mb-20">
                <div className="flex flex-col lg:flex-row w-full">
                    <div className="px-0 md:px-10 w-full lg:w-[70%]">
                        <h2 className="text-4xl font-semibold mb-12">Open Positions</h2>
                        {/* Tabs */}
                        <div className="flex flex-row underline-offset-8" onClick={() => divRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                            <h4 onClick={() => setCurrTab(0)} className={`${currTab === 0 && 'underline'} text-lg md:text-xl cursor-pointer mr-4 md:mr-10 lg:mr-14`}> All </h4>
                            <h4 onClick={() => setCurrTab(1)} className={`${currTab === 1 && 'underline'} text-lg md:text-xl cursor-pointer mx-2 md:mr-10 lg:mr-14`}> Finance And Accounting </h4>
                            <h4 onClick={() => setCurrTab(2)} className={`${currTab === 2 && 'underline'} text-lg md:text-xl cursor-pointer mx-4 md:mr-10 lg:mr-14`}> Marketing </h4>
                            <h4 onClick={() => setCurrTab(3)} className={`${currTab === 3 && 'underline'} text-lg md:text-xl cursor-pointer ml-4 md:mr-10 lg:mr-14`}> Sales </h4>
                        </div>

                        <div className="jobs mt-14">
                            {jobs.filter(job => currTab === 1 ? job.category === 'Finance And Accounting' :
                                currTab === 2 ? job.category === 'Marketing' : currTab === 3 ? job.category === 'Sales' : true)
                                .map((job, i) => (
                                    <div className="text-white mt-5" key={'job-' + i}>
                                        <div className='flex flex-row gap-6'>
                                            <h2 className="text-xl font-semibold"> {job.title}  </h2>
                                            <p className='text-sm text-gray-500'>
                                                {job.available === 'true' ?
                                                    <span className='flex'><AiOutlineInfoCircle className='mt-1 mr-2' />Available</span> :
                                                    <span className='flex'><AiOutlineInfoCircle className='mt-1 mr-2' />Not Available</span>
                                                }
                                            </p>
                                        </div>
                                        <div className="flex justify-between mt-4 mb-2">
                                            <p className="text-gray-200"> {job.category} </p>
                                            <button
                                                onClick={() => job.available === 'true' && setShowModal(true)}
                                                disabled={job.available !== 'true'}
                                                className={`px-5 py-2 rounded transform transition-all duration-300 ease-in-out ${job.available === 'true' ? 'bg-[#007E9E] hover:scale-105' : 'bg-gray-500 cursor-not-allowed opacity-50'}`}
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                        <hr className='' style={{ borderTop: '1px solid gray' }} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <>
                    <div className="fixed inset-0 top-10 z-[1200] flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto w-auto max-w-3xl">
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-[#007E9E] shadow-lg outline-none focus:outline-none">
                                <div className="relative items-start justify-between rounded px-8 py-4">
                                    <h3 className="text-center text-2xl font-semibold text-white uppercase tracking-wider">
                                        Join Our Team
                                    </h3>
                                    <IoClose
                                        className="absolute top-3 right-3 cursor-pointer text-3xl text-white hover:text-cyan-200"
                                        onClick={() => setShowModal(false)}
                                    />
                                    <div className="mt-6">
                                        <UnifiedForm type="apply" onSuccess={() => setShowModal(false)} />
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

export default Career;
