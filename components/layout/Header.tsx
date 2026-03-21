'use client';

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import logo from "../../public/assets/logo.png";
import { IoMenu } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { getUserFromToken, logout } from "@/utils/auth";
import hindiLogo from "../../public/assets/HINDI_LOGO.webp";

const HeaderContent = () => {
    const [isShowModal, setShowModal] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check authentication state
    useEffect(() => {
        const checkAuth = () => {
            const userFromToken = getUserFromToken();
            setIsLoggedIn(!!userFromToken);
            setUser(userFromToken);
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        window.addEventListener('focus', checkAuth);
        window.addEventListener('authChanged', checkAuth);
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('focus', checkAuth);
            window.removeEventListener('authChanged', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
        const updatePosition = () => {
            const position = window.pageYOffset;
            setIsScrolled(position > 5);
        };

        window.addEventListener("scroll", updatePosition);
        updatePosition();

        return () => window.removeEventListener("scroll", updatePosition);
    }, []);

    const handleOpenMenu = () => {
        setShowModal(true);
    };

    const prefetchAboutHeroCarousel = () => {
        // Dynamic import to prefetch chunk
        import('@/components/generic/AboutHeroCarousel');
    };

    return (
        <motion.div
            style={{
                backdropFilter: isScrolled ? "blur(12px)" : "none",
                backgroundColor: "transparent",
                borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none"
            }}
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-20 fixed z-50 w-full flex items-center justify-between px-4 lg:px-10 top-0"
        >
            {/* MOBILE HEADER */}
            <div className="flex lg:hidden w-full items-center justify-between">
                <button
                    className="text-white text-3xl"
                    onClick={handleOpenMenu}
                >
                    <IoMenu />
                </button>
                <div className="flex-1 flex justify-center ml-6">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="ention-logo-mobile"
                            width={60}
                            height={60}
                            className="object-contain cursor-pointer"
                        />
                    </Link>
                </div>
                <Link href="/ecommerce/cart" className="flex items-center" aria-label="Cart" title="Cart">
                    <FaShoppingCart className="text-white text-2xl hover:text-[#01E9FE] transition" />
                </Link>
            </div>

            {/* DESKTOP HEADER */}
            <div className="hidden lg:flex w-full items-center justify-center gap-6 xl:gap-10 min-[1320px]:gap-10 mr-[90px] ml-[90px] ">
                <Link
                    href="/"
                    className="font-semibold text-xl text-white hover:underline underline-offset-8 decoration-[#007E9E] decoration-4"
                >
                    Home
                </Link>
                <Link
                    href="/ecommerce/product"
                    className="font-semibold text-xl text-white hover:underline underline-offset-8 decoration-[#007E9E] decoration-4"
                >
                    Products
                </Link>
                <Link
                    href="/about"
                    prefetch={true}
                    className="font-semibold text-xl text-white hover:underline underline-offset-8 decoration-[#007E9E] decoration-4"
                    onMouseEnter={prefetchAboutHeroCarousel}
                >
                    About Us
                </Link>
                <Link href="/">
                    <Image
                        src={logo}
                        alt="ention-logo-desktop"
                        width={60}
                        height={60}
                        className="object-contain cursor-pointer"
                    />
                </Link>
                <Link
                    href="/collaborate"
                    className="font-semibold text-xl text-white hover:underline underline-offset-8 decoration-[#007E9E] decoration-4"
                >
                    Collaborate
                </Link>
                <Link
                    href="/technical-support"
                    className="font-semibold text-xl text-white hover:underline underline-offset-8 decoration-[#007E9E] decoration-4"
                >
                    Support
                </Link>
                <Link href="/ecommerce/cart" className="flex items-center" aria-label="Orders" title="Orders">
                    <span className="font-semibold text-xl text-white hover:underline underline-offset-8 decoration-[#007E9E] decoration-4">Orders</span>
                </Link>
            </div>

            {/* Dashboard and Admin nav links absolute left */}
            <div className="hidden lg:flex absolute left-10 items-center gap-4" style={{ zIndex: 60 }}>
                <Link
                    href="/dashboard"
                    className="text-white hover:text-[#01E9FE] transition flex items-center gap-2"
                    title="Dashboard"
                >
                    <FaUserCircle className="text-3xl" />
                </Link>
                <Image
                    src={hindiLogo}
                    alt="Hindi Logo"
                    width={70}
                    height={70}
                    className="object-contain ml-20"
                />
            </div>

            {/* Desktop auth buttons */}
            <div className="absolute hidden lg:flex items-center gap-2 right-10">
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="w-24 h-8 bg-red-600 border-none rounded-3xl flex items-center justify-center text-white text-sm font-semibold hover:bg-red-700 transition-all duration-300 ease-in-out mr-20"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link
                            href={{
                                pathname: "/login",
                                query: {
                                    redirect: `/${pathname}?${searchParams?.toString()}`,
                                },
                            }}
                        >
                            <button className="w-24 h-8 bg-transparent border rounded-3xl border-white flex items-center justify-center text-white text-sm hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 ease-in-out">
                                Login
                            </button>
                        </Link>
                        <Link href={"/signup"}>
                            <button className="px-8 h-8 bg-white border rounded-3xl border-white flex items-center justify-center text-black text-sm hover:scale-105 transition-all duration-300 ease-in-out">
                                Register
                            </button>
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isShowModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-full w-[80vw] max-w-[340px] bg-white z-50 flex flex-col shadow-2xl rounded-r-2xl border-r border-gray-200 overflow-y-auto lg:hidden"
                        >
                            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                                <Link href="/">
                                    <Image
                                        src={logo}
                                        alt="ention-logo"
                                        width={60}
                                        height={60}
                                        className="object-contain cursor-pointer"
                                        style={{ filter: 'brightness(0) saturate(100%)' }}
                                    />
                                </Link>
                                <button
                                    className="text-2xl text-gray-700 p-2 rounded-full hover:bg-gray-100"
                                    onClick={() => setShowModal(false)}
                                >
                                    <GrClose />
                                </button>
                            </div>
                            <nav className="flex flex-col gap-1 flex-1 px-4 py-2 mt-2">
                                <Link href="/collaborate" className="text-gray-900 text-base font-semibold py-3 px-2 rounded hover:bg-gray-100 transition" onClick={() => setShowModal(false)}>
                                    Collaborate
                                </Link>
                                <Link href="/" className="text-gray-900 text-base font-semibold py-3 px-2 rounded hover:bg-gray-100 transition" onClick={() => setShowModal(false)}>
                                    Home
                                </Link>
                                <Link href="/ecommerce/product" className="text-gray-900 text-base font-semibold py-3 px-2 rounded hover:bg-gray-100 transition" onClick={() => setShowModal(false)}>
                                    Products
                                </Link>
                                <Link href="/about" className="text-gray-900 text-base font-semibold py-3 px-2 rounded hover:bg-gray-100 transition" onClick={() => setShowModal(false)}>
                                    About Us
                                </Link>
                                <Link href="/technical-support" className="text-gray-900 text-base font-semibold py-3 px-2 rounded hover:bg-gray-100 transition" onClick={() => setShowModal(false)}>
                                    Support
                                </Link>
                                <Link href="/ecommerce/cart" className="text-gray-900 text-base font-semibold py-3 px-2 rounded hover:bg-gray-100 transition flex items-center gap-2" onClick={() => setShowModal(false)}>
                                    <FaShoppingCart className="text-lg" />
                                    Orders
                                </Link>
                                <Link href="/dashboard" className="text-gray-900 text-base font-semibold py-3 px-2 rounded hover:bg-gray-100 transition" onClick={() => setShowModal(false)}>
                                    Dashboard
                                </Link>
                            </nav>
                            <div className="flex flex-col gap-2 px-4 pb-6 mb-8">
                                {isLoggedIn ? (
                                    <>
                                        <div className="text-center text-gray-700 font-medium mb-2">
                                            Welcome, {user?.name}
                                        </div>
                                        <button
                                            className="w-full border border-black text-black rounded-3xl py-2 font-semibold text-base hover:bg-gray-100"
                                            onClick={() => { setShowModal(false); handleLogout(); }}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="w-full border border-black text-black rounded-3xl py-2 font-semibold text-base hover:bg-gray-100"
                                            onClick={() => { setShowModal(false); router.push("/login"); }}
                                        >
                                            Login
                                        </button>
                                        <button
                                            className="w-full bg-black text-white rounded-3xl py-2 font-semibold text-base hover:bg-gray-900 transition"
                                            onClick={() => { setShowModal(false); router.push("/signup"); }}
                                        >
                                            Register
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Header = () => {
    return (
        <Suspense fallback={<div></div>}>
            <HeaderContent />
        </Suspense>
    );
};

export default Header;
