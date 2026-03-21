'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import ProductImageCarouselMobile from '@/components/ProductImageCarouselMobile';

// Import images
import storyImage from "../../public/assets/0N1A1389.png";
import peopleImage from "../../public/assets/market-pc.png";
import productImage from '../../public/assets/Ention-Laptop-E3-Catalogue-design-2.png';
import ellipseBg from "../../public/assets/ellipse-gradient-half.png";
import consultancyImage from "../../public/assets/serviceimg.png";

const AboutHeroCarousel = dynamic(() => import("@/components/generic/AboutHeroCarousel"), {
    loading: () => <div className="w-full text-center py-8">Loading...</div>
});

const About = () => {
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        setShowVideo(true);
    }, []);

    return (
        <main className=" min-h-screen relative overflow-hidden">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-[#070D2A] via-[#133B5C] to-[#0FAFCA] pt-24 md:pt-32 pb-10 md:pb-20 text-center text-white relative z-10 ">
                <Image
                    src={ellipseBg}
                    alt="Background Decoration"
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-0 w-[500px] h-auto pointer-events-none"
                />
                <div className="hidden md:block w-full">
                    <AboutHeroCarousel />
                </div>
                <div className="block md:hidden w-full my-8">
                    <ProductImageCarouselMobile images={['/assets/aboutus_page/1.webp', '/assets/aboutus_page/3.webp', '/assets/aboutus_page/4.webp', '/assets/aboutus_page/5.webp', '/assets/aboutus_page/6.webp']} />
                </div>
            </div>

            {/* Video Section */}
            <div className="bg-[#0FAFCA] py-0 md:py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="relative w-full h-full flex justify-center">
                        {showVideo && (
                            <video
                                src="/assets/aboutus_page/0709 (1)(1).mp4"
                                controls
                                className="w-full max-w-6xl rounded-lg shadow-lg"
                                preload="auto"
                                playsInline
                            ></video>
                        )}
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="bg-[#0FAFCA] py-20 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 uppercase underline underline-offset-8">
                        The Story Behind Ention
                    </h2>
                    <div className="flex flex-col md:flex-row gap-10 items-center mb-20">
                        <div className="w-full md:w-1/2">
                            <div className="rounded-lg overflow-hidden">
                                <Image
                                    src={storyImage}
                                    alt="Story"
                                    width={400}
                                    height={500}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <p className="text-lg leading-relaxed">
                                The name Ention is more than a label it&apos;s a philosophy. Inspired by the humble phrase <b>&quot;mention not&quot;</b>,
                                Ention was thoughtfully crafted to represent our core values, each letter in Ention represents a value we live and build by:
                                <b>Empowering Nations through Technology, Innovation, Opportunity, and New Ideas.</b><br /><br />
                                At Ention, we&apos;re not just building a brand&mdash;we&apos;re creating your working companion. As a pioneering force in the computing industry,
                                we proudly stand at the intersection of manufacturing excellence, customer-centric marketing, and strategic technology consultancy.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 uppercase underline underline-offset-8">
                        Who We Are
                    </h2>
                    <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
                        <div className="w-full md:w-1/2">
                            <div className="rounded-lg overflow-hidden">
                                <Image
                                    src={peopleImage}
                                    alt="Who We Are"
                                    width={400}
                                    height={500}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <p className="text-lg leading-relaxed">
                                Ention is an Indian startup, founded on January 28, 2022, in Delhi, with one dream: To become India&apos;s leading
                                <b> Made-in-India</b> brand for laptops and computer devices, built for everyday professionals, creators, students,
                                and gamers. We&apos;re driven by a deep commitment to quality, affordability, and innovation&mdash;delivering world-class devices
                                designed to meet the unique demands of Indian consumers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* What We Offer Section */}
            <div className="bg-gradient-to-b from-[#0FAFCA] via-[#133B5C] to-[#070D2A] py-20 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 uppercase underline underline-offset-8">
                        What We Offer
                    </h2>
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Products Card */}
                        <div className="flex flex-col h-full">
                            <h3 className="text-2xl font-bold mb-6 text-center">Products</h3>
                            <div className="rounded-lg overflow-hidden mb-6 pb-14">
                                <Image
                                    src={productImage}
                                    alt="Laptop"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex-grow">
                                <div className="text-lg mb-6">
                                    Ention manufactures and direct to consumer distribution of high performance laptops designed to meet the diverse needs of today&apos;s users.
                                    Whether you&apos;re a student, gamer, working professional, or business leader we have a solution for you. Our laptops are available across
                                    major e-commerce platforms and through our official website, offering nationwide access and fast doorstep delivery.
                                    <br /><br />
                                    <b>Core Features:</b>
                                    <ul className="list-disc pl-6 mt-2">
                                        <li>Customization: Tailor your laptop to your needs.</li>
                                        <li>Processors: Choose from Intel&reg; Core&trade;N95, i5, i7, i9 and AMD Ryzen&trade; R5, R7 chipsets.</li>
                                        <li>Affordability: Premium performance at an unmatched price point</li>
                                        <li>18 months onsite warranty: at your door step.</li>
                                    </ul>
                                </div>
                                <button className="w-full bg-white text-black font-semibold py-4 rounded-lg hover:bg-gray-100 transition-colors">
                                    Know More
                                </button>
                            </div>
                        </div>

                        {/* Consultancy Card */}
                        <div className="flex flex-col h-full">
                            <h3 className="text-2xl font-bold mb-6 text-center">Consultancy & Platform Services</h3>
                            <div className="rounded-lg overflow-hidden mb-6">
                                <Image
                                    src={consultancyImage}
                                    alt="Consultancy"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex-grow space-y-14">
                                <div className="text-lg mb-6">
                                    At Ention, we don&apos;t just offer technology products&mdash;we serve as a trusted Technology and Professional Service Consultant
                                    for startups, small businesses, and institutions. Our goal is to help businesses make informed, strategic decisions that
                                    drive growth and ensure compliance. We provide end-to-end support in areas such as regulatory compliance, business certifications,
                                    and licensing. Ention offers reliable, expert guidance. Our consultancy services are designed to simplify operations, reduce risks,
                                    and help businesses stay ahead in an ever-changing regulatory environment&mdash;making Ention a one-stop solution for your technology
                                    and compliance needs.
                                </div>
                                <button className="w-full bg-white text-black font-semibold py-4 rounded-lg hover:bg-gray-100 transition-colors">
                                    Know More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default About;
