'use client';

import React, { useRef } from 'react';
import { Navbar, Footer } from '../index';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLocalStorage } from 'react-use';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FaCartArrowDown, FaCircle } from 'react-icons/fa';

// Import local assets
import laptop from '@/public/assets/banner/ban4.jpg';
import mid from '@/assets/mid.png';
import pick from '@/assets/pick.png';

interface Product {
    id: string;
    modelName?: string;
    image?: string;
    name?: string;
    category?: {
        name: string;
        description: string;
    };
}

const sliderSettings = {
    dots: true,
    slidesToShow: 1,
    autoplay: true,
    focusOnSelect: true,
    arrows: true,
    initialSlide: 0,
    centerMode: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const [cart, setCart] = useLocalStorage<any[]>('cart', []);
    const router = useRouter();

    const addToCart = (e: React.MouseEvent, productId: string) => {
        e.preventDefault();
        const exist = cart?.find((x: any) => x.slug === productId);
        if (!exist) {
            setCart([...(cart || []), { slug: productId, quantity: 1 }]);
            router.push("/ecommerce/cart");
        } else {
            router.push("/ecommerce/cart");
        }
    };

    return (
        <div className="w-full px-2 lg:px-5 mb-6 group cursor-pointer">
            <Link href={'/ecommerce/product/' + product.id}>
                <div className="flex flex-col justify-center items-center mb-8">
                    <h2 className="text-2xl font-semibold text-center mb-1">
                        {product.modelName ?? ''}
                    </h2>
                    <hr className="w-[40%] border-2 border-transparent group-hover:border-[#007E9E] transition-all" />
                </div>
                <div className="border border-[#007E9E] w-full mx-0 md:mx-5 group relative group-hover:bg-teal-500/10 transition-colors">
                    <Image
                        src="/assets/0N1A1389.png"
                        width={80}
                        height={80}
                        alt="Product Badge"
                        className="hidden md:block rounded-full absolute -top-4 -left-4"
                    />

                    <Image
                        src="/assets/0N1A1389.png"
                        width={50}
                        height={50}
                        alt="Product Badge Mobile"
                        className="block md:hidden rounded-full absolute -top-4 -left-4"
                    />

                    <button
                        onClick={(e) => addToCart(e, product.id)}
                        className="p-3 rounded-full bg-slate-600 hidden group-hover:flex justify-center items-center absolute top-2 right-2 text-white"
                    >
                        <FaCartArrowDown size={20} />
                    </button>

                    <div className="w-full flex items-center justify-center pt-2 bg-teal-500/10 group-hover:bg-teal-500/30">
                        {product?.image && (
                            <Image
                                src={process.env.NEXT_PUBLIC_SUPABASE_URL + product.image}
                                alt={product.name || 'Product Image'}
                                width={150}
                                height={150}
                                className="h-[150px] w-[150px] object-contain"
                            />
                        )}
                    </div>
                    <hr className="w-full border-gray-500" />
                    <div className="w-full py-4 text-center px-2 md:px-10">
                        <h3 className="text-md md:text-lg line-clamp-2">
                            {product?.name}
                        </h3>
                        <h3 className="text-md md:text-lg line-clamp-2 pt-2">
                            Ention™ Workbook® Series
                        </h3>
                    </div>
                    <hr className="w-full border-gray-500" />
                    <div className="py-4 text-center">
                        <h3 className="text-sm md:text-lg">
                            <span className="text-red-500 font-semibold">Starting From </span>
                            Rs. .........
                        </h3>
                    </div>

                    <hr className="w-full border-gray-500" />
                    <div className="py-4 text-center">
                        <h2 className="text-[#02b7e6] text-sm md:text-xl font-semibold flex items-center justify-center">
                            View More
                        </h2>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const ProductsCarousel: React.FC<{ products: Product[]; title: string }> = ({ products, title }) => {
    return (
        <div className="mt-8 md:mt-20 w-full md:w-[80%] flex lg:mx-auto px-4 md:px-0 md:mx-14 items-center justify-center">
            <div>
                <h2 className="text-2xl md:text-3xl text-center font-semibold capitalize">
                    {title}
                </h2>
                <div>
                    <p className="text-sm md:text-lg text-center text-white mx-auto lg:max-w-[65%] pt-4">
                        {products?.[0]?.category?.description}
                    </p>
                </div>

                <div className="mt-4 md:mt-14 w-full flex flex-wrap items-center justify-center">
                    {products?.map((product) => (
                        <div
                            key={product.id}
                            className="w-full md:w-[50%] lg:w-[40%] lg:mx-auto"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                <div className="w-[50%] mx-auto flex items-center justify-center gap-4 mt-6 my-8 md:my-10 lg:my-10">
                    <hr className="w-[40%] border-gray-300" />
                    <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
                    <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
                    <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
                    <hr className="w-[40%] border-gray-300" />
                </div>
            </div>
        </div>
    );
};

const Products: React.FC<{ products?: Product[]; data?: Product[] }> = ({ data }) => {
    const slider = useRef<any>(null);

    const dataByCategory =
        data?.reduce((acc: any, product: any) => {
            const { category } = product;
            if (!acc[category.name]) {
                acc[category.name] = [];
            }
            acc[category.name].push(product);
            return acc;
        }, {}) || {};

    return (
        <main className="text-white overflow-x-hidden bg-black pb-20">
            <Navbar />
            {/* ====================== Header ====================== */}
            <div className="pt-20">
                <Slider ref={slider} {...sliderSettings}>
                    <div className="relative w-full min-h-[25vh] md:min-h-[30vh] lg:min-h-[60vh]">
                        <Image src={laptop} fill alt="Header" className="object-contain" />
                    </div>
                    <div className="relative w-full min-h-[25vh] md:min-h-[40vh]">
                        <Image src="/assets/0N1A1389.png" fill alt="Header" className="object-contain" />
                    </div>
                    <div className="relative w-full min-h-[25vh] md:min-h-[40vh]">
                        <Image src="/assets/0N1A1389.png" fill alt="Header" className="object-contain" />
                    </div>
                </Slider>
            </div>

            <div className="w-full lg:w-[90%] mx-auto flex flex-wrap md:flex-row items-center justify-center text-xl text-center font-semibold mb-5 py-2 mt-10">
                <div className="w-full md:w-[30%] flex gap-1 lg:gap-2 items-center justify-center text-center">
                    <Image src={mid} alt="Made in India" className="w-10 h-10" />
                    <h2 className="pt-3 text-sm md:text-lg lg:text-xl">
                        Made In India
                    </h2>
                </div>
                <div className="w-full md:w-[30%] text-center text-sm md:text-lg lg:text-xl pl-6 md:pl-0 py-6 md:py-2">
                    18 Months Warranty
                </div>
                <div className="w-full md:w-[30%] flex gap-1 md:gap-2 items-center justify-center text-center">
                    <Image src={pick} alt="On-site warranty" className="w-10 h-9" />
                    <h2 className="pt-3 text-sm md:text-lg lg:text-xl">
                        On-Site Warranty
                    </h2>
                </div>
            </div>

            <hr className="border-gray-800" />
            <div className="overflow-x-hidden w-full text-sm md:text-2xl py-6 text-center">
                <h2 className="anim flex items-center justify-center">
                    6 Months Additional Complimentary Warranty
                    <span className="mx-4">
                        <FaCircle className="text-[#007E9E] text-xl" />
                    </span>
                    Limited Time Period Offer
                </h2>
            </div>
            <hr className="border-gray-800" />

            <div className="w-full">
                {Object.keys(dataByCategory).map((category, i) => (
                    <ProductsCarousel
                        key={`category-${category}-${i}`}
                        title={category}
                        products={dataByCategory[category]}
                    />
                ))}
            </div>

            <Footer />
        </main>
    );
};

export default Products;
