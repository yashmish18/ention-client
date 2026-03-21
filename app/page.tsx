'use client';

import React, { useRef, useState, useEffect, ReactNode } from "react";
import gradientbg1 from "../public/assets/gradient-bg1.png";
import gradientbg2 from "../public/assets/gradient-bg2.png";
import marketpc from "../public/assets/market-pc.png";
import ellipsemd from "../public/assets/ellipse-gradient-md.png";

import lappy from "../public/assets/lappy.png";
import warrantyimg from "../public/assets/ds.png";

import CheckIcon from '@/components/icons/check';
import SimpleSlider from '@/components/Slider';
import { Zoom } from "react-awesome-reveal";
import { TypingEffect } from '@/components/generic/TypingEffect';
import { BlurInText } from '@/components/generic/BlurInText';
import { FadeUpAnimate } from '@/components/generic/FadeUpAnimate';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Settings,
  DollarSign,
  Shield,
  Zap,
  Flag,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import ProductImageCarouselMobile from '@/components/ProductImageCarouselMobile';
import "swiper/css";

const IMAGES = [marketpc, marketpc, marketpc];

const TestCarousel = dynamic(() => import('@/components/TestCarousel'), { ssr: false, loading: () => <div>Loading...</div> });
const IntelCarousel = dynamic(() => import('@/components/IntelCarousel'), { ssr: false, loading: () => <div>Loading...</div> });
const UnifiedForm = dynamic(() => import('@/components/UnifiedForm'), { ssr: false });

interface FloatingBlobProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}



// FloatingBlob component for floating/parallax effect
const FloatingBlob: React.FC<FloatingBlobProps> = ({ className = '', style = {}, children }) => (
  <motion.div
    className={className}
    style={style}
    animate={{
      y: [0, -20, 0, 20, 0],
      x: [0, 10, 0, -10, 0],
      rotate: [0, 2, 0, -2, 0],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);


export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null); // Track direction for smooth transition
  const [isTransitioning, setIsTransitioning] = useState(false); // Track if transition is in progress
  const router = useRouter();
  const mobileSwiperRef = useRef<any>(null);

  // Handle next image action
  const nextImage = () => {
    if (isTransitioning) return; // Prevent multiple clicks during transition
    setDirection("next");
    setIsTransitioning(true);
  };

  const navigateToProductPage = () => {
    router.push("/product");
  };

  const [showBookNowForm, setShowBookNowForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Reset direction state and update current image index after transition is finished
  useEffect(() => {
    if (!isTransitioning) return; // Wait for the transition to finish

    const timeout = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => {
        if (direction === "next") {
          return (prevIndex + 1) % IMAGES.length;
        } else if (direction === "prev") {
          return (prevIndex - 1 + IMAGES.length) % IMAGES.length;
        }
        return prevIndex;
      });
      setDirection(null); // Reset direction
      setIsTransitioning(false); // Reset transition state
    }, 500); // Wait for the transition duration (500ms)

    return () => clearTimeout(timeout);
  }, [direction, isTransitioning, IMAGES.length]);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className={"main overflow-x-hidden relative z-0 w-full"}>
        <div
          className="flex flex-col -z-10"
          style={{
            backgroundImage: `url(${gradientbg1.src})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="h-[130px]"></div>
          {/* Offers Bar Start */}
          <div className="w-full flex justify-center">
            <div className="w-[100%] bg-[#007E9E] text-white py-2 rounded-lg shadow-lg overflow-hidden relative z-40">
              <div className="whitespace-nowrap overflow-hidden w-full">
                <div className="animate-marquee flex items-center gap-12 text-lg font-semibold">
                  <span>Launch Offer Alert!</span>
                  <span>Enjoy exclusive discounted pricing on the Ention Workbook Series, only for 1 month!</span>
                  <span>Launch Offer Alert!</span>
                  <span>Enjoy exclusive discounted pricing on the Ention Workbook Series, only for 1 month!</span>
                  <span>Launch Offer Alert!</span>
                  <span>Enjoy exclusive discounted pricing on the Ention Workbook Series, only for 1 month!</span>
                  <span>Launch Offer Alert!</span>
                  <span>Enjoy exclusive discounted pricing on the Ention Workbook Series, only for 1 month!</span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[20px]"></div>
          {/* Custom style for marquee - Moved to standard style or globals.css preferred logic */}
          <style>{`
             @keyframes marquee {
               0% { transform: translateX(0); }
               100% { transform: translateX(-25%); }
             }
             .animate-marquee {
               display: inline-flex;
               white-space: nowrap;
               animation: marquee 20s linear infinite;
             }
           `}</style>

          {/* Offers Bar End */}
          <div className="h-[50px]"></div>
          <div className="flex flex-col w-full items-center">
            {/* Mobile: INTRODUCING + TypingEffect in one line, ENTION® COMPUTING DEVICE with TypingEffect in next line */}
            <div className="w-full flex flex-col items-center justify-center md:hidden px-4">
              <div
                className="flex flex-wrap items-center justify-center w-full"
                style={{ letterSpacing: "4px" }}
              >
                <span className="text-white text-base md:text-lg font-semibold mr-2">INTRODUCING</span>
                <TypingEffect className="text-[#01E9FE] font-bold text-base md:text-lg" text="MADE IN INDIA" />
              </div>
              <div className="flex flex-wrap items-center justify-center w-full mt-3">
                <TypingEffect className="text-white text-lg md:text-xl font-bold text-center" text={"ENTION\u00A0\u00AE COMPUTING DEVICE"} />
              </div>
            </div>
            {/* Desktop: keep existing layout */}
            <div style={{ letterSpacing: "7px" }} className="hidden md:flex items-center">
              <div className="text-white text-2xl mr-4">INTRODUCING</div>
              <div>
                <TypingEffect
                  className="text-[#01E9FE] font-bold text-2xl"
                  text="MADE IN INDIA"
                />
              </div>
            </div>
            <BlurInText className="hidden md:block text-white text-[50px] mt-8 text-3xl font-bold">
              <span>ENTION</span>
              <span
                style={{ position: "relative", top: "-18px", fontSize: "31px" }}
                className="font-thin text-[50px]"
              >
                &reg;
              </span>{" "}
              <span>COMPUTING DEVICE</span>
            </BlurInText>
          </div>
          <div className="h-[100px]"></div>
          <div className="hidden md:block w-[95%] mx-auto"><IntelCarousel /></div>
          <div className="block md:hidden w-full"><ProductImageCarouselMobile /></div>
          <div className="w-full flex justify-center mt-24">
            <BlurInText className="hidden md:block">
              <p className="text-white text-2xl md:text-4xl lg:text-[32px] font-bold text-center max-w-4xl leading-snug">
                Get ready to experience a mesmerizing journey of performance and style with the Ention Workbook series<br />
                <span className="text-[#01E9FE] font-bold">proudly Made in India to empower.</span>
              </p>
            </BlurInText>
            {/* Mobile: Same text as desktop */}
            <div className="block md:hidden w-full flex justify-center mt-8 px-4">
              <p className="text-white text-lg font-bold text-center leading-snug">
                Get ready to experience a mesmerizing journey of performance and style with the Ention Workbook series<br />
                <span className="text-[#01E9FE] font-bold">proudly Made in India to empower.</span>
              </p>
            </div>
          </div>

          {/* Add product cards below the hero subheading */}
          <div className="w-full flex justify-center mt-12">
            {/* Desktop: Row layout */}
            <div className="hidden md:flex flex-row gap-6 lg:gap-12 w-full max-w-6xl">
              {/* Card 1: For Students */}
              <Link href="/ecommerce/product/e5" className="flex-1 bg-white/20 backdrop-blur-md border border-white/60 shadow-lg px-8 py-8 flex flex-col lg:flex-row items-center cursor-pointer transition hover:bg-white/30">
                {/* Content on left */}
                <div className="flex flex-col justify-between flex-1 h-full lg:pr-8">
                  <div>
                    <div className="text-white text-xl font-bold mb-4">For Students</div>
                    <div className="flex flex-col min-[1150px]:flex-row items-center lg:items-start min-[1150px]:items-center gap-6">
                      <Image src="/assets/landing_page/e5.webp" alt="Student Laptop" width={170} height={150} priority />
                      <div className="text-white text-base font-normal leading-relaxed">
                        Affordable, Lightweight, durable, and built to support your learning on the go.
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end w-full mt-4">
                    <button className="bg-[#01E9FE] text-black font-semibold px-5 py-2 text-base w-fit hover:bg-cyan-400 transition">Shop Now →</button>
                  </div>
                </div>
              </Link>
              {/* Card 2: For Professionals & Techies */}
              <Link href="/ecommerce/product/e4" className="flex-1 bg-white/20 backdrop-blur-md border border-white/60 shadow-lg px-8 py-8 flex flex-col lg:flex-row items-center cursor-pointer transition hover:bg-white/30">
                {/* Content on left */}
                <div className="flex flex-col justify-between flex-1 h-full lg:pr-8">
                  <div>
                    <div className="text-white text-xl font-bold mb-4">For Professionals & Techies</div>
                    <div className="flex flex-col min-[1150px]:flex-row items-center lg:items-start min-[1150px]:items-center gap-6">
                      <Image src="/assets/landing_page/e4.webp" alt="Pro Laptop" width={170} height={150} priority />
                      <div className="text-white text-base font-normal leading-relaxed">
                        Customizable, seamlessly switch from work tasks to meetings with reliable performance. A powerful and customizable machine ready to take on your code, design, or research.
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end w-full mt-4">
                    <button className="bg-[#01E9FE] text-black font-semibold px-5 py-2 text-base w-fit hover:bg-cyan-400 transition">Shop Now →</button>
                  </div>
                </div>
              </Link>
            </div>
            {/* Mobile: Column layout - Using same images as desktop */}
            <div className="flex flex-col gap-8 w-full max-w-6xl md:hidden px-2">
              {/* Card 1: For Students */}
              <Link href="/ecommerce/product/e5" className="bg-white/20 backdrop-blur-md border border-white/60 shadow-lg px-5 py-6 flex flex-col gap-4 items-center cursor-pointer transition hover:bg-white/30">
                <div className="w-full text-center">
                  <div className="text-white text-lg font-bold mb-2">For Students</div>
                </div>
                <Image src="/assets/landing_page/e5.webp" alt="Student Laptop" width={150} height={120} className="mx-auto" />
                <div className="text-white text-sm font-normal leading-relaxed text-center">
                  Affordable, Lightweight, durable, and built to support your learning on the go.
                </div>
                <button className="bg-[#01E9FE] text-black font-semibold px-4 py-2 text-base mt-2 hover:bg-cyan-400 transition mx-auto" style={{ borderRadius: 0, width: 'fit-content' }}>Shop Now →</button>
              </Link>
              {/* Card 2: For Professionals & Techies */}
              <Link href="/ecommerce/product/e4" className="bg-white/20 backdrop-blur-md border border-white/60 shadow-lg px-5 py-6 flex flex-col gap-4 items-center cursor-pointer transition hover:bg-white/30">
                <div className="w-full text-center">
                  <div className="text-white text-lg font-bold mb-2">For Professionals & Techies</div>
                </div>
                <Image src="/assets/landing_page/e4.webp" alt="Pro Laptop" width={150} height={120} className="mx-auto" />
                <div className="text-white text-sm font-normal leading-relaxed text-center">
                  Customizable, seamlessly switch from work tasks to meetings with reliable performance. A powerful and customizable machine ready to take on your code, design, or research.
                </div>
                <button className="bg-[#01E9FE] text-black font-semibold px-4 py-2 text-base mt-2 hover:bg-cyan-400 transition mx-auto" style={{ borderRadius: 0, width: 'fit-content' }}>Shop Now →</button>
              </Link>
            </div>
          </div>
          {/* Why Choose Ention Workbook Series Section - Icons Above Text, Single Separator Line */}
          <div className="w-full flex flex-col items-center mt-16 py-12 relative">
            <div className="w-full max-w-6xl px-4 bg-white/20 backdrop-blur-xl border border-white/60 shadow-2xl py-10 md:py-16 md:px-10" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
              <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-2 text-center">Why Choose Ention Workbook Series?</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-6"></div>
              <p className="text-white text-base md:text-lg opacity-80 mb-10 text-center">From customization to performance, <span className='text-white'>discover</span> what makes Ention Workbook Series the right choice for you.</p>
              {/* Desktop: Icons Row Above, Text Below */}
              <div className="hidden md:block">
                <div className="grid grid-cols-5 gap-8 w-full">
                  {/* Icons Row */}
                  <div className="flex justify-center">
                    <Image src="/assets/banner/c.png" alt="Customizable" width={60} height={60} className="w-[60px] h-[60px]" />
                  </div>
                  <div className="flex justify-center">
                    <Image src="/assets/banner/affordable icon_prev_ui.png" alt="Affordable Without Compromise" width={60} height={60} className="w-[60px] h-[60px]" style={{ filter: 'brightness(0)' }} />
                  </div>
                  <div className="flex justify-center">
                    <Image src="/assets/banner/warranty_icon.png" alt="18-Month On-Site Warranty" width={60} height={60} className="w-[60px] h-[60px]" />
                  </div>
                  <div className="flex justify-center">
                    <Image src="/assets/banner/made in india icon.png" alt="Made in India. Made for You." width={70} height={60} className="w-[70px] h-[60px]" />
                  </div>
                  <div className="flex justify-center">
                    <Image src="/assets/banner/battery_icon.png" alt="Performance That Powers You" width={60} height={60} className="w-[60px] h-[60px]" />
                  </div>

                  {/* Titles Row */}
                  <div className="text-white text-xl font-bold text-center max-w-[220px] leading-tight mt-4">Customizable</div>
                  <div className="text-white text-xl font-bold text-center max-w-[220px] leading-tight mt-4">Affordable Without Compromise</div>
                  <div className="text-white text-xl font-bold text-center max-w-[220px] leading-tight mt-4">18-Month On-Site Warranty</div>
                  <div className="text-white text-xl font-bold text-center max-w-[220px] leading-tight mt-4">Made in India. Made for You.</div>
                  <div className="text-white text-xl font-bold text-center max-w-[220px] leading-tight mt-4">Performance That Powers You</div>

                  {/* Descriptions Row - All start at same height */}
                  <div className="text-cyan-100 text-base text-center max-w-[240px] leading-snug mt-1">Configure your device to match your needs.</div>
                  <div className="text-cyan-100 text-base text-center max-w-[240px] leading-snug mt-1">Get premium features at a fair price.</div>
                  <div className="text-cyan-100 text-base text-center max-w-[240px] leading-snug mt-1">Enjoy peace of mind with extended support.</div>
                  <div className="text-cyan-100 text-base text-center max-w-[240px] leading-snug mt-1">Proudly designed and built in India.</div>
                  <div className="text-cyan-100 text-base text-center max-w-[240px] leading-snug mt-1">Experience speed and reliability every day.</div>
                </div>
              </div>
              {/* Mobile: Icon Left, Text Right, One Per Row */}
              <div className="block md:hidden w-full">
                {[
                  {
                    icon: <Image src="/assets/banner/c.png" alt="Customizable" width={60} height={60} className="w-[48px] h-[48px]" key="icon1" />, title: "Customizable", desc: "Configure your device to match your needs."
                  },
                  {
                    icon: <Image src="/assets/banner/affordable icon_prev_ui.png" alt="Affordable Without Compromise" width={60} height={60} className="w-[48px] h-[48px]" key="icon2" style={{ filter: 'brightness(0)' }} />, title: "Affordable Without Compromise", desc: "Get premium features at a fair price."
                  },
                  {
                    icon: <Image src="/assets/banner/warranty_icon.png" alt="18-Month On-Site Warranty" width={60} height={60} className="w-[48px] h-[48px]" key="icon3" />, title: "18-Month On-Site Warranty", desc: "Enjoy peace of mind with extended support."
                  },
                  {
                    icon: <Image src="/assets/banner/made in india icon.png" alt="Made in India. Made for You." width={70} height={60} className="w-[56px] h-[48px]" key="icon4" />, title: "Made in India. Made for You.", desc: "Proudly designed and built in India."
                  },
                  {
                    icon: <Image src="/assets/banner/battery_icon.png" alt="Performance That Powers You" width={60} height={60} className="w-[48px] h-[48px]" key="icon5" />, title: "Performance That Powers You", desc: "Experience speed and reliability every day."
                  },
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-row items-center gap-6 w-full mb-8 py-2">
                    <div className="flex-shrink-0">{step.icon}</div>
                    <div className="flex flex-col items-start">
                      <div className="text-white text-base font-bold text-left leading-tight mb-1">{step.title}</div>
                      <div className="text-cyan-100 text-sm text-left leading-snug">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Warranty Card */}
          <FadeUpAnimate spaceToMove={100}>
            <div className="w-full flex justify-center mt-24">
              <div className="flex flex-col items-center w-[80%] -mt-5">
                <div
                  className="px-8 py-4 border rounded-3xl w-full flex flex-col sm:flex-row justify-center items-center relative"
                  style={{ borderColor: "rgba(34, 209, 238, 1" }}
                >
                  <Image src={warrantyimg} alt="warranty-img" width={320} height={80} className="w-[420px] h-auto z-[2] mx-auto" />
                  <FloatingBlob
                    className="absolute z-[1] top-10 sm:top-[150px] left-16 w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px]"
                    style={{ backgroundImage: `url(${ellipsemd.src})`, backgroundSize: "100% 100%" }}
                  />
                  <FloatingBlob
                    className="absolute z-[1] top-10 sm:top-[100px] left-[38%] xl:left-[42%] w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]"
                    style={{ backgroundImage: `url(${ellipsemd.src})`, backgroundSize: "100% 100%" }}
                  />
                  <FloatingBlob
                    className="absolute z-[1] bottom-4 xl:bottom-10 right-12 xl:right-16 w-[60px] h-[60px] sm:w-[60px] sm:h-[60px] lg:w-[80px] lg:h-[80px] xl:w-[100px] xl:h-[100px]"
                    style={{ backgroundImage: `url(${ellipsemd.src})`, backgroundSize: "100% 100%" }}
                  />
                  <div className="w-10"></div>
                  <div className="flex flex-col items-center sm:items-start gap-8 lg:gap-16 w-full min-[540px]:w-[360px] text-center sm:text-left sm:w-[320px] lg:w-[360px] xl:w-[480px] ">
                    <p className="text-[16px] min-[360px]:text-lg min-[420px]:text-xl min-[540px]:text-2xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white leading-8 sm:leading-7 md:leading-8 lg:leading-10">
                      On-Site Warranty, At Your Doorstep
                      Your peace of mind is our priority.
                      Right at your doorstep, anywhere in India.

                    </p>
                    <button
                      className="z-[2] w-[200px] h-[45px] sm:w-[180px] md:w-[200px] sm:h-[38px] md:h-[42px] xl:w-[248px] xl:h-[58px] rounded-3xl flex justify-center items-center text-black text-lg md:text-xl xl:text-2xl hover:scale-105  transition-all duration-300 ease-in-out"
                      style={{ backgroundColor: "rgba(34, 209, 238, 1)" }}
                      onClick={() => router.push('/technical-support')}
                    >
                      Know More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeUpAnimate>

          {/* Computer List */}
          <Zoom cascade triggerOnce>
            <div className="w-full hidden sm:flex justify-center">
              <div className="flex flex-col items-center w-[80%] mt-16">
                <div className="w-[640px] lg:w-full h-auto flex justify-center mt-16">
                  <SimpleSlider />
                </div>
              </div>
            </div>
          </Zoom>

          {/* Two Images Section - Clean Layout */}
          <div className="w-full flex flex-col items-center justify-center py-20 relative mt-20">
            <div className="w-full max-w-7xl px-8 md:px-12 lg:px-16 relative">
              {/* Background gradient elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                {/* E5 Series - Left side */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-20 mb-20">
                  <div className="flex-1 relative flex justify-center lg:justify-start">
                    <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-xl"></div>
                    <div className="relative">
                      <img
                        src="/assets/landing_page/img-e5.webp"
                        alt="Ention Laptop E5"
                        className="w-[280px] md:w-[360px] xl:w-[420px] relative z-10"
                      />
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-md"></div>
                    </div>
                  </div>

                  <div className="flex-1 text-center lg:text-left lg:pl-8 xl:pl-12">
                    <h3 className="text-white text-2xl md:text-3xl xl:text-4xl font-bold">E5 Workbook</h3>
                  </div>
                </div>

                {/* Divider with gradient line */}
                <div className="flex items-center justify-center mb-20">
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                  <div className="mx-4 w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                </div>

                {/* E4 Series - Right side */}
                <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-20">
                  <div className="flex-1 relative flex justify-center lg:justify-end">
                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl"></div>
                    <div className="relative">
                      <img
                        src="/assets/landing_page/img-e4.webp"
                        alt="Ention Laptop E4"
                        className="w-[280px] md:w-[360px] xl:w-[420px] relative z-10"
                      />
                      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-md"></div>
                    </div>
                  </div>

                  <div className="flex-1 text-center lg:text-right lg:pr-8 xl:pr-12">
                    <h3 className="text-white text-2xl md:text-3xl xl:text-4xl font-bold">E4 Workbook</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


        {/* End Interactive Cards Section */}
        {/* Inserted hero heading and cards block */}
        <div className="w-full">
          {/* Mobile: Centered logo and heading */}
          <div className="flex flex-col items-center justify-center md:hidden px-4 pt-16 pb-12">

            <h1 className="text-white text-2xl font-semibold leading-tight mb-3 text-center">
              Wherever you are, <span className="text-[#01E9FE] font-semibold">Ention</span> is within reach.
            </h1>
            <div className="text-[#7ed6f7] text-base font-medium mb-8 text-center max-w-sm w-full">
              Your trusted technology partner, everywhere you go.
            </div>
            {/* Stacked feature cards for mobile */}
            <div className="flex flex-col gap-6 w-full">
              <div className="p-6 border border-cyan-400 bg-white/10 w-full text-center rounded-xl">
                <div className="font-bold text-white text-lg mb-3">Available on leading e-commerce platforms</div>
                <div className="text-cyan-100 text-base">Find Ention products on top online marketplaces for your convenience and trust.</div>
              </div>
              <div className="p-6 border border-cyan-400 bg-white/10 w-full text-center rounded-xl">
                <div className="font-bold text-white text-lg mb-3">Buy directly from our official website</div>
                <div className="text-cyan-100 text-base">Order with confidence and enjoy exclusive deals and support from Ention.com.</div>
              </div>
              <div className="p-6 border border-cyan-400 bg-white/10 w-full text-center rounded-xl">
                <div className="font-bold text-white text-lg mb-3">Join us through exclusive University Campus Programs</div>
                <div className="text-cyan-100 text-base">Participate in our campus initiatives and get hands-on with Ention technology at your university.</div>
              </div>
            </div>
          </div>
          {/* Desktop: Logo at top center, content below */}
          <div className="hidden md:flex flex-col justify-center items-center mt-0 mb-16 min-h-[70vh] px-8 lg:px-12">
            {/* Logo at top center */}

            {/* Main content block centered */}
            <div className="flex flex-col items-center w-full max-w-5xl">
              <h1 className="text-white text-3xl font-semibold leading-tight mb-4 text-center">
                Wherever you are, <span className="text-[#01E9FE] font-semibold">Ention</span> is within reach.
              </h1>
              <div className="text-[#7ed6f7] text-xl font-medium mb-12 text-center max-w-4xl w-full">
                Your trusted technology partner, everywhere you go.
              </div>
              {/* Three horizontal boxes */}
              <div className="flex flex-row gap-6 w-full">
                <div className="flex-1 p-6 border border-cyan-400 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-center w-full">
                    <div className="font-bold text-white text-lg mb-3">Available on leading e-commerce platforms</div>
                    <div className="text-cyan-100 text-base">Find Ention products on top online marketplaces for your convenience and trust.</div>
                  </div>
                </div>
                <div className="flex-1 p-6 border border-cyan-400 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-center w-full">
                    <div className="font-bold text-white text-lg mb-3">Buy directly from our official website</div>
                    <div className="text-cyan-100 text-base">Order with confidence and enjoy exclusive deals and support from Ention.com.</div>
                  </div>
                </div>
                <div className="flex-1 p-6 border border-cyan-400 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-center w-full">
                    <div className="font-bold text-white text-lg mb-3">Join us through exclusive University Campus Programs</div>
                    <div className="text-cyan-100 text-base">Participate in our campus initiatives and get hands-on with Ention technology at your university.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" flex flex-col max-h-fit -z-10"
          style={{
            backgroundImage: `url(${gradientbg2.src})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="w-full flex mt-20 justify-center mb-20 mt-24">
            <div className="w-[80%] flex flex-col min-[940px]:flex-row items-start min-[940px]:items-center justify-between gap-20 min-[940px]:gap-5">
              <FadeUpAnimate>
                <div className="flex flex-col gap-5 ">
                  <p className="text-[28px] min-[540px]:text-[36px] min-[1120px]:text-[48px] xl:text-[54px] leading-tight text-white w-[280px] min-[540px]:w-[360px] min-[1120px]:w-[480px] xl:w-[556px] font-bold">
                    Ention laptop experience program
                  </p>
                  <div className="flex flex-col gap-4 mt-5 xl:mt-10">
                    <div className="flex gap-3 lg:gap-6 xl:gap-10 items-center">
                      <CheckIcon />
                      <p className="text-lg min-[540px]:text-xl xl:text-2xl text-white">
                        Zero Obligation to Purchase
                      </p>
                    </div>
                    <div className="flex gap-3 lg:gap-6 xl:gap-10 items-center">
                      <CheckIcon />
                      <p className="text-lg min-[540px]:text-xl xl:text-2xl text-white">
                        Free Sample Delivery at Your Office
                      </p>
                    </div>
                    <div className="flex gap-3 lg:gap-6 xl:gap-10 items-center">
                      <CheckIcon />
                      <p className="text-lg min-[540px]:text-xl xl:text-2xl text-white">
                        Exclusive Corporate Offers
                      </p>


                    </div>
                    <div className="text-2xl min-[540px]:text-xl xl:text-2xl text-white mt-24 font-bold ">
                      <p>Let your team test the performance first-hand </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBookNowForm(true)}
                    className="bg-white mt-4 xl:mt-8 z-[2] w-[160px] h-[36px] min-[450px]:w-[200px] min-[450px]:h-[45px] sm:w-[180px] md:w-[200px] sm:h-[38px] md:h-[42px] xl:w-[248px] xl:h-[58px] rounded-3xl flex justify-center items-center text-black text-base min-[450px]:text-lg md:text-xl xl:text-2xl hover:scale-105  transition-all duration-300 ease-in-out"
                  >
                    Book Now
                  </button>
                </div>
              </FadeUpAnimate>

              <motion.div
                className="w-full min-[940px]:w-[560px] h-auto min-[940px]:h-[620px] mx-auto overflow-hidden relative"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                {!showBookNowForm ? (
                  <Image
                    src="/assets/landing_page/exp.webp"
                    alt="Experience Program"
                    fill
                    className="object-contain"
                  />
                ) : (
                  <BlurInText duration={0.3} className="h-full">
                    <div
                      className="w-full h-full p-6 md:p-10 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl relative z-10"
                    >
                      <button
                        onClick={() => setShowBookNowForm(false)}
                        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                      >
                        <Settings className="rotate-45" size={24} />
                      </button>

                      <UnifiedForm
                        type="experience"
                        title="Book Experience Program"
                        onSuccess={() => setTimeout(() => setShowBookNowForm(false), 2000)}
                      />
                    </div>
                  </BlurInText>
                )}
              </motion.div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
