'use client';

import React, { useState } from 'react';
import { FiDownload, FiPhone, FiTool, FiSearch, FiMonitor, FiSettings, FiShield, FiWifi, FiBatteryCharging, FiAlertTriangle, FiBookOpen, FiMessageCircle } from 'react-icons/fi';

const resourceLinks = [
    { title: 'Troubleshooting', desc: 'Guides and solutions for common issues', href: '#' },
    { title: 'Drivers & Downloads', desc: 'Get the latest drivers and software', href: '#' },
    { title: 'Warranty Services', desc: 'Check and manage your warranty', href: '#' },
    { title: 'User Manuals', desc: 'Find and download user manuals', href: '#' },
    { title: 'Product Registration', desc: 'Register your Ention product', href: '#' },
    { title: 'Order Parts', desc: 'Order replacement parts and accessories', href: '#' },
    { title: 'FAQs', desc: 'Frequently asked questions', href: '#' },
    { title: 'Community Forums', desc: 'Join the Ention community', href: '#' },
    { title: 'Contact Support', desc: 'Get in touch with our support team', href: '#' },
];

const IconWrapper = ({ icon: Icon, size = 24 }: { icon: any, size?: number }) => <Icon size={size} />;

export default function TechnicalSupport() {
    const [modalOpen, setModalOpen] = useState(false);
    const [docxHtml, setDocxHtml] = useState('');

    const loadDocx = async (url: string) => {
        setDocxHtml('Loading...');
        if (typeof window !== 'undefined') {
            try {
                const mammoth = await import('mammoth');
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer });
                setDocxHtml(result.value);
            } catch (error) {
                setDocxHtml('Error loading document.');
            }
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setDocxHtml('');
    };

    return (
        <main className="bg-[#070D2A] min-h-screen">
            <header className="text-center py-20">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 pt-10">Ention Support</h1>
                <p className="text-lg md:text-xl text-white mb-8 font-medium">Get help with your Ention laptop. Find drivers, manuals, troubleshooting guides and more.</p>
                <form className="flex justify-center items-center mx-auto max-w-xl border border-gray-200 rounded-lg overflow-hidden" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative w-full">
                        <input className="w-full py-3 px-4 pr-12 bg-gray-100 border-none rounded-l-lg text-base focus:outline-none" placeholder="Search for support articles..." aria-label="Search" />
                        <button type="submit" aria-label="Search" className="absolute right-0 top-0 bottom-0 px-3 text-gray-600 hover:text-blue-600 flex items-center justify-center text-xl">
                            <FiSearch />
                        </button>
                    </div>
                </form>
            </header>

            <section className="py-12 w-full">
                <h2 className="text-center text-2xl font-extrabold underline underline-offset-8 mb-10 text-white ">Quick Support Options</h2>
                <div className="flex flex-wrap justify-center gap-8 mb-8 px-4">
                    {[
                        { title: 'Request a Callback', icon: FiPhone, desc: 'Got a question? Just fill out this form, and we will call you back.', button: 'Request Callback', link: '/support/request-callback' },
                        { title: 'Service Request Booking', icon: FiTool, desc: 'Need help with your device? Fill out the form and we will get in touch.', button: 'Book Service', link: '/support/service-request' },
                        { title: 'Required Extended Warranty', icon: FiShield, desc: 'Continue to enjoy uninterrupted service beyond standard warranty.', button: 'Buy Extended Warranty', link: '/support/extended-warranty' }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white rounded-2xl shadow-md flex flex-col items-center w-72 max-w-xs p-0 justify-between">
                            <div className="flex items-center justify-center w-full h-[150px] rounded-t-2xl bg-[#E6F7FF]">
                                <item.icon size={64} className="text-[#0091D1]" />
                            </div>
                            <div className="flex flex-col items-center p-4 w-full flex-1 justify-between text-center">
                                <div className="font-bold text-lg mb-1">{item.title}</div>
                                <div className="text-gray-600 text-sm mb-4">{item.desc}</div>
                                <button
                                    className="text-[#0091D1] font-bold text-base hover:underline transition bg-transparent border-none mt-auto"
                                    onClick={() => window.location.href = item.link}
                                >
                                    {item.button}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                        <button onClick={handleCloseModal} className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-black">&times;</button>
                        <div dangerouslySetInnerHTML={{ __html: docxHtml }} />
                    </div>
                </div>
            )}

            <section className="py-12 w-full">
                <h2 className="text-center text-2xl font-extrabold underline underline-offset-8 mb-10 text-white">Support Downloads & Resources</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
                    {resourceLinks.filter(link => !['Drivers & Downloads', 'Warranty Services', 'Order Parts'].includes(link.title)).map(link => (
                        <a href={link.title === 'Troubleshooting' ? '/support/troubleshooting' : '#'} key={link.title} className="bg-white rounded-xl shadow-md p-8 flex flex-col hover:shadow-lg transition-all cursor-pointer">
                            <div className="font-bold text-lg text-sky-700 mb-2">{link.title}</div>
                            <div className="text-gray-600 text-base">{link.desc}</div>
                        </a>
                    ))}
                </div>
            </section>

            {/* Browsing Categories */}
            <section className="py-12 w-full">
                <h2 className="text-center text-2xl font-extrabold underline underline-offset-8 mb-10 text-white">Browse Support by Category</h2>
                <div className="flex flex-wrap justify-center gap-8 mb-8 px-4">
                    {[
                        { title: 'Hardware Support', icon: FiMonitor, items: ['Battery Issues', 'Display Problems', 'Keyboard & Touchpad', 'Audio Issues'] },
                        { title: 'Software Support', icon: FiSettings, items: ['Driver Updates', 'BIOS Updates', 'Windows Issues', 'Optimization'] },
                        { title: 'Warranty & Service', icon: FiShield, items: ['Warranty Status', 'Extended Warranty', 'Repair Services', 'Service Centers'] }
                    ].map((cat, idx) => (
                        <div key={idx} className="bg-white rounded-2xl shadow-md p-8 min-w-[240px] max-w-xs flex-1 flex flex-col">
                            <div className="flex items-center text-sky-700 font-bold text-lg mb-4 gap-2">
                                <IconWrapper icon={cat.icon} /> {cat.title}
                            </div>
                            <ul className="text-gray-800 text-base font-medium flex-1 flex flex-col gap-2">
                                {cat.items.map((item, i) => (
                                    <li key={i}><a href="#" className="hover:underline">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="text-center py-12 mt-12 px-4 shadow-sm">
                <h3 className="text-2xl font-extrabold underline underline-offset-8 mb-2 text-white">Still Need Help?</h3>
                <p className="text-lg text-white mb-6">Our support team is here to assist you 24/7</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-white text-sky-600 font-bold py-3 px-8 rounded-md hover:bg-sky-50 transition">Contact Support</button>
                    <button className="bg-sky-600 text-white font-bold py-3 px-8 rounded-md hover:bg-sky-700 transition">Schedule Callback</button>
                </div>
            </footer>

            <button className="fixed right-8 bottom-8 z-50 bg-sky-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg hover:bg-sky-700 transition">
                <FiMessageCircle />
            </button>
        </main>
    );
}
