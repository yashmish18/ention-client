'use client';

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import logo from "../../public/assets/ention-logo.png";
import Image from "next/image";

const Footer = () => {
    const router = useRouter();
    return (
        <div
            className="w-full flex flex-col items-center p-6 min-[480px]:p-10 lg:h-[350px]"
            style={{ backgroundColor: "rgba(7, 13, 42, 1)" }}
        >
            <div className="flex flex-col w-full items-center lg:flex-row lg:items-start lg:justify-between xl:justify-around gap-8 lg:gap-0">
                {/* Logo and Company Info */}
                <div className="flex flex-col items-center gap-4 lg:justify-between lg:items-center lg:h-[280px]">
                    <Image
                        src={logo}
                        alt="ention-logo"
                        width={100}
                        height={100}
                        onClick={() => router.push("/")}
                        className="w-[100px] h-[100px] object-contain cursor-pointer mb-2"
                    />
                    <div className="text-white font-bold text-base text-center leading-tight">
                        Ention Technology and Services Pvt. Ltd.<br />
                        Ention Energy Pvt. Ltd.
                    </div>
                    <div className="flex items-center gap-6 mt-2">
                        <Link
                            href="https://www.instagram.com/entiontech/"
                            target="_blank"
                            rel="noopenner noreferrer"
                            className="select-none "
                        >
                            <BsInstagram color="#FFFFFF" size={18} />
                        </Link>
                        <Link
                            href="https://x.com/EntionTech"
                            target="_blank"
                            rel="noopenner noreferrer"
                            className="select-none "
                        >
                            <BsTwitter color="#FFFFFF" size={18} />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/company/entiontechnology/"
                            target="_blank"
                            rel="noopenner noreferrer"
                            className="select-none "
                        >
                            <BsLinkedin color="#FFFFFF" size={18} />
                        </Link>
                    </div>
                </div>
                {/* Divider for mobile */}
                <div className="w-full h-px bg-white/10 my-6 block lg:hidden" />
                {/* Links Section */}
                <div className="flex flex-col w-full items-center gap-4 lg:grid lg:grid-cols-3 lg:gap-16 xl:gap-24 lg:w-auto lg:items-start items-center">
                    {/* Product Section */}
                    <div className="flex flex-col w-full mb-2 lg:items-start items-center lg:flex-col lg:gap-2">
                        <p className="text-white text-base font-bold mb-2 lg:mb-1 lg:text-left text-center w-full">Product</p>
                        <div className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-1 lg:flex-col lg:gap-0 lg:items-start items-center w-full">
                            <Link href="/" className="text-[#969799] text-base py-1 px-2 rounded select-none cursor-pointer hover:text-white whitespace-nowrap hover:bg-white/5 transition lg:w-full lg:text-left lg:hover:bg-white/5">Features</Link>
                            <Link href="/" className="text-[#969799] text-base py-1 px-2 rounded select-none cursor-pointer hover:text-white whitespace-nowrap hover:bg-white/5 transition lg:w-full lg:text-left lg:hover:bg-white/5">Integrations</Link>
                            <Link href="/" className="text-[#969799] text-base py-1 px-2 rounded select-none cursor-pointer hover:text-white whitespace-nowrap hover:bg-white/5 transition lg:w-full lg:text-left lg:hover:bg-white/5">Pricing</Link>
                            <Link href="/" className="text-[#969799] text-base py-1 px-2 rounded select-none cursor-pointer hover:text-white whitespace-nowrap hover:bg-white/5 transition lg:w-full lg:text-left lg:hover:bg-white/5">Download</Link>
                        </div>
                    </div>
                    {/* Company Section */}
                    <div className="flex flex-col w-full mb-2 lg:items-start items-center lg:flex-col lg:gap-2">
                        <p className="text-white text-base font-bold mb-2 lg:mb-1 lg:text-left text-center w-full">Company</p>
                        <div className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-1 lg:flex-col lg:gap-0 lg:items-start items-center w-full">
                            <Link className="text-[#969799] text-base py-1 px-2 rounded select-none cursor-pointer hover:text-white whitespace-nowrap hover:bg-white/5 transition lg:w-full lg:text-left lg:hover:bg-white/5" href="/about">About us</Link>
                            <Link className="text-[#969799] text-base py-1 px-2 rounded select-none cursor-pointer hover:text-white whitespace-nowrap hover:bg-white/5 transition lg:w-full lg:text-left lg:hover:bg-white/5" href="/blogs">Blog</Link>
                            <Link className="text-[#969799] text-base py-1 px-2 rounded select-none cursor-pointer hover:text-white whitespace-nowrap hover:bg-white/5 transition lg:w-full lg:text-left lg:hover:bg-white/5" href="/career">Career</Link>
                            <Link href="/" className="text-[#969799] text-base py-1 px-2 rounded select-none cursor-pointer hover:text-white whitespace-nowrap hover:bg-white/5 transition lg:w-full lg:text-left lg:hover:bg-white/5">Brand</Link>
                        </div>
                    </div>
                    {/* Resources Section */}
                    <div className="flex flex-col w-full mb-2 lg:items-start items-center lg:flex-col lg:gap-2">
                        <p className="text-white text-base font-bold mb-2 lg:mb-1 lg:text-left text-center w-full">Resources</p>
                        <div className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-1 lg:flex-col lg:gap-0 lg:items-start items-center w-full">
                            <Link href="/" className="text-[#969799] text-base py-1 px-2 rounded select-none cursor-pointer hover:text-white whitespace-nowrap hover:bg-white/5 transition lg:w-full lg:text-left lg:hover:bg-white/5">Startup Program</Link>
                            <Link href="/" className="text-[#969799] text-base py-1 px-2 rounded select-none cursor-pointer hover:text-white whitespace-nowrap hover:bg-white/5 transition lg:w-full lg:text-left lg:hover:bg-white/5">Community</Link>
                            <Link href="/" className="text-[#969799] text-base py-1 px-2 rounded select-none cursor-pointer hover:text-white whitespace-nowrap hover:bg-white/5 transition lg:w-full lg:text-left lg:hover:bg-white/5">Contact</Link>
                            <Link href="/" className="text-[#969799] text-base py-1 px-2 rounded select-none cursor-pointer hover:text-white whitespace-nowrap hover:bg-white/5 transition lg:w-full lg:text-left lg:hover:bg-white/5">Privacy Policy</Link>
                            <Link href="/" className="text-[#969799] text-base py-1 px-2 rounded select-none cursor-pointer hover:text-white whitespace-nowrap hover:bg-white/5 transition lg:w-full lg:text-left lg:hover:bg-white/5">Terms of service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
