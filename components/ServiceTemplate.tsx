'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, Footer, Contact } from '@/components';
import Link from 'next/link';
import Image from 'next/image';
import { RiWhatsappFill } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { IoClose } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchParams } from 'next/navigation';

interface Category {
    id: string;
    title: string;
    description: string;
    startingPrice?: string;
    price1?: string;
    price2?: string;
    note?: string;
    overview: {
        title: string;
        description: string;
        point?: string[];
    };
    benefits: {
        title: string;
        desc?: string;
        benefits: string[];
        image?: string;
    };
    requirements: {
        title: string;
        description: string;
        documents: string[];
        desc2?: string;
        docu2?: string[];
        desc3?: string;
        docu3?: string[];
        desc4?: string;
        docu4?: string[];
    };
    whyention: {
        description: string;
        point?: string[];
    };
    deliverable?: {
        description: string;
        documents: string[];
    };
    faq: {
        pdf: string;
    };
}

interface ServiceTemplateProps {
    categories: Category[];
    title?: string;
    info?: any;
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({ categories, title, info }) => {
    const params = useSearchParams();
    const [selected, setSelected] = useState<Category>(categories[0]);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [filterValue, setFilterValue] = useState<Category[]>([]);

    useEffect(() => {
        const categoryId = params.get('category')?.replace(/-/g, ' ');
        if (categoryId) {
            const found = categories.find(c => c.id?.toLowerCase() === categoryId.toLowerCase());
            if (found) setSelected(found);
        }
    }, [params, categories]);

    const selectcategory = (category: Category) => {
        setSelected(category);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        const filterArray = categories.filter((cat) => {
            return cat.title.toLowerCase().includes(searchValue.toLowerCase());
        });
        if (searchValue === "") {
            setFilterValue([]);
        } else {
            setFilterValue(filterArray);
        }
    };

    return (
        <main className='text-white overflow-x-hidden'>
            <Navbar />

            <div className='w-full lg:w-[90%] md:flex mx-10 md:mx-auto text-white pt-0 md:pt-0 overflow-x-hidden'>
                <div className="w-[80%] md:w-[55%] lg:w-[60%] flex items-center justify-center pt-0 md:pt-10 ml-0 md:ml-8 lg:ml-14">
                    <div>
                        <div className="flex mt-0 md:mt-4 md:mr-4 inline-flex">
                            <div className="">
                                <button
                                    className="float-left w-20 h-20 focus:outline-none"
                                    onClick={() => setShowModal(true)}
                                >
                                    <AiOutlineSearch className="focus:outline-none rounded-full w-12 h-12 p-2 bg-[#007E9E] text-white" />
                                </button>
                                {showModal && (
                                    <div className="bg-white rounded-lg ml-0 mt-0 float-left">
                                        <div className="rounded-lg w-full flex pl-1">
                                            <input
                                                type="text"
                                                placeholder="Search ...."
                                                onChange={handleSearch}
                                                className="w-full lg:w-80 h-8 pl-4 mt-2 text-black focus:outline-none"
                                            />
                                            <IoClose
                                                className="text-gray-600 text-4xl text-right cursor-pointer pt-1"
                                                onClick={() => { setShowModal(false); setFilterValue([]); }}
                                            />
                                        </div>
                                        {filterValue.length !== 0 && (
                                            <div className="absolute bg-white rounded-lg border-2 z-10 w-full lg:w-80">
                                                {filterValue.map((e, i) => (
                                                    <div key={`searchResult${i}`} className="w-full p-2 hover:bg-[#007E9E] hover:text-white text-black">
                                                        <button className="w-full px-4 text-left" onClick={() => { selectcategory(e); setShowModal(false); }}>{e.title}</button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <h1 className="text-2xl lg:text-5xl font-bold text-left pb-2 md:pb-6 pt-2">{selected.title}</h1>
                        <p className='w-[80%] text-sm lg:text-lg py-2'>{selected.description}</p>
                        {selected.id !== 'eveIT services' && (
                            <p className="text-lg lg:text-4xl font-semibold pt-2 md:pt-6">Starting from : {selected.startingPrice}</p>
                        )}
                        <p className="text-sm lg:text-lg font-semibold pt-2 md:pt-4">{selected?.price1}</p>
                        <p className="text-sm lg:text-lg font-semibold pt-2 md:pt-2">{selected?.price2}</p>
                        <p className="text-sm lg:text-lg font-semibold pt-2 md:pt-2">{selected?.note}</p>
                    </div>
                </div>
                <div className='w-[80%] md:w-[30%] lg:w-[40%] ml-0 md:ml-10 lg:ml-28 mt-10 md:mt-10'>
                    <Contact title={selected.title} />
                </div>
            </div>

            <div className='w-full max-h-fit bg-[#007E9E] px-6 lg:px-28 py-6 mt-6'>
                <h3 className='text-2xl lg:text-4xl text-center'>Here&apos;s How IT Works</h3>
                <div className='w-full lg:flex items-center justify-center gap-4 pt-6'>
                    <p className='w-full lg:w-1/5 px-0 lg:px-10 text-sm lg:text-lg text-center pt-0 md:pt-4'>1. Fill Form Simply fill the above form to get started.</p>
                    <div className='hidden lg:block w-1/5 border-t-2 border-dashed border-white'></div>
                    <p className='w-full lg:w-1/5 text-sm lg:text-lg text-center pt-4'>2. Call to discuss Our startup expert will connect with you & prepare documents.</p>
                    <div className='hidden lg:block w-1/5 border-t-2 border-dashed border-white'></div>
                    <p className='w-full lg:w-1/5 text-sm lg:text-lg text-center pt-4'>3. We draft and file the documents required for your company registration</p>
                </div>
            </div>

            <div className="relative flex gap-4 w-screen lg:w-full h-full overflow-x-scroll lg:overflow-x-auto items-center justify-center pt-14 px-32 md:px-0 mx-auto text-[10px] md:text-[14px] lg:text-[16px] pb-4 font-semibold">
                {categories.map((category, i) => (
                    <button
                        key={"category" + i}
                        className={"pb-2 focus:outline-none " + (selected.title === category.title ? "text-sm lg:text-2xl text-[#007E9E] border-b-8 border-[#007E9E] border-r-2 border-r-white pr-3" : "text-white border-r-2 border-white pr-2")}
                        onClick={() => selectcategory(category)}
                    >
                        {category.title}
                    </button>
                ))}
            </div>

            <div className='w-full flex flex-row pt-10 px-4 md:px-10 lg:px-20'>
                <div className='hidden md:block w-[30%] lg:w-[20%] h-full text-white text-sm lg:text-lg'>
                    <Link href="#overview"><button className='w-full h-14 text-center bg-[#001B35] mt-2'>Overview</button></Link>
                    <Link href="#benefits"><button className='w-full h-14 text-center bg-[#002541] mt-2'>Benefits</button></Link>
                    {selected.id !== 'eveIT services' && (
                        <Link href="#requirements"><button className='w-full h-14 text-center bg-[#00314C] mt-2'>Documents</button></Link>
                    )}
                    <Link href="#why_ention"><button className='w-full h-14 text-center bg-[#003B58] mt-2'>{selected.id === 'eveIT services' ? 'Why eveIT' : 'Why Ention'}</button></Link>
                    {selected.id !== 'eveIT services' && (
                        <Link href="#Deliverable"><button className='w-full h-14 text-center bg-[#003B58] mt-2'>Deliverable</button></Link>
                    )}
                </div>

                <div className='w-[90%] mx-auto md:mx-0 lg:w-[80%] border-l-2 border-[#007E9E] mt-2'>
                    <div id="overview" className='w-full text-left text-white bg-[#001B35] p-6 lg:px-10 '>
                        <h2 className='text-xl md:text-4xl font-semibold md:flex gap-2'>Overview</h2>
                        <p className='text-sm lg:text-lg pt-4'>{selected.overview.description}</p>
                        <ul className='pl-6 pt-4'>
                            {selected.overview?.point?.map((p, i) => <li key={i} className='text-white'>{p}</li>)}
                        </ul>
                    </div>

                    <div id="benefits" className='w-full flex flex-col md:flex-row gap-6 text-left text-white bg-[#002541] mt-6 p-6 lg:px-10'>
                        <div className={selected.id === 'eveIT services' ? 'w-full' : 'w-full md:w-[70%]'}>
                            <h2 className='text-xl md:text-4xl font-semibold md:flex gap-2'>{selected.benefits.title}</h2>
                            <p className='text-sm lg:text-lg pt-4'>{selected.benefits?.desc}</p>
                            <ul className='list-disc pl-6 pt-4'>
                                {selected.benefits.benefits.map((b, i) => <li key={i}>{b}</li>)}
                            </ul>
                        </div>
                        {selected.id !== 'eveIT services' && selected.benefits.image && (
                            <div className='w-full lg:w-[30%] flex items-end justify-end'>
                                <Image src={selected.benefits.image} alt="Benefits" width={300} height={300} />
                            </div>
                        )}
                    </div>

                    {selected.id !== 'eveIT services' && (
                        <div id="requirements" className='w-full text-left text-white bg-[#00314C] mt-6 p-6 lg:px-10'>
                            <h2 className='text-xl md:text-4xl font-semibold md:flex gap-2'>{selected.requirements.title}</h2>
                            <p className='text-sm lg:text-lg pt-4'>{selected.requirements.description}</p>
                            <ul className='list-disc pl-6 pt-4'>
                                {selected.requirements.documents.map((doc, i) => <li key={i}>{doc}</li>)}
                            </ul>
                            {selected.requirements.desc2 && <p className='text-sm lg:text-lg pt-4'>{selected.requirements.desc2}</p>}
                            <ul className='list-disc pl-6'>
                                {selected.requirements.docu2?.map((doc, i) => <li key={i}>{doc}</li>)}
                            </ul>
                        </div>
                    )}

                    <div id="why_ention" className='w-full text-left text-white bg-[#003B58] p-6 lg:px-10 mt-6'>
                        <h2 className='text-xl md:text-4xl font-semibold'>{selected.id === 'eveIT services' ? 'Why eveIT' : 'Why Ention'}</h2>
                        <p className='text-sm lg:text-lg pt-4'>{selected.whyention.description}</p>
                        <ul className='list-disc pl-6 pt-4'>
                            {selected.whyention?.point?.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                    </div>

                    {selected.id !== 'eveIT services' && selected.deliverable && (
                        <div id="Deliverable" className='w-full text-left text-white bg-[#003B58] p-6 lg:px-10 mt-4'>
                            <h2 className='text-xl md:text-4xl font-semibold'>Our Deliverable</h2>
                            <p className='text-sm lg:text-lg pt-4'>{selected.deliverable.description}</p>
                            <ul className='list-disc pl-6 pt-4'>
                                {selected.deliverable.documents.map((doc, i) => <li key={i}>{doc}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className='w-[70%] mx-auto mt-10 '>
                <div className='ml-14 md:ml-44 lg:ml-32 '>
                    <Link href={selected.faq.pdf} target="_blank" download>
                        <button className='bg-[#007E9E] text-white px-4 py-2 rounded-md flex gap-2 hover:bg-[#005F77] transition-all'>
                            Pdf To Download
                        </button>
                    </Link>
                    <div className="flex pt-2 pl-4 items-center gap-4">
                        <Link href="https://web.whatsapp.com/send?text=Please Visit" target="_blank text-white"><RiWhatsappFill size={30} /></Link>
                        <Link href="#" target="_blank text-white"><FaLinkedinIn size={30} /></Link>
                        <Link href="mailto:manshi.eveit@gmail.com" target="_blank text-white"><HiMail size={30} /></Link>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default ServiceTemplate;
