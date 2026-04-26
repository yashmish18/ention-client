/**
 * Ention Product Seed Data
 *
 * This is the CANONICAL source of truth for product data.
 * It is NOT "mock data" — it is the full, real product catalogue
 * extracted directly from the official Ention PDF catalogue.
 *
 * When the backend is live, `fetchProducts()` / `fetchProductById()`
 * in lib/api.ts will return data with the EXACT same shape as these objects.
 * At that point, this file becomes the dev-seed / CI fixture.
 *
 * Shape: mirrors the MongoDB document structure your backend should return.
 */

export interface ProductVariant {
    name: string;
    priceModifier: number;
}

export interface ProductSpecs {
    cpu: string;
    ram: string;
    storage: string;
    display: string;
    camera: string;
    gpu?: string;
    battery: string;
    weight?: string;
    os: string;
    wifi: string;
    bluetooth: string;
    io: string;
    cooling: string;
    build: string;
    keyboard: string;
    security: string;
    special?: string;
    variants: {
        processors: ProductVariant[];
        ram: string[];
        storage: string[];
    };
}

export interface Product {
    id: string;
    slug: string;
    name: string;
    model: string;
    tagline: string;
    description: string;
    basePrice: number;
    category: string;
    images: string[];
    specs: ProductSpecs;
    warranty: string;
    badge?: string;
}

export const PRODUCTS: Product[] = [
    {
        id: "s1",
        slug: "s1",
        name: "Swapbook S1",
        model: "SWAPBOOK S1",
        tagline: "Your Working Companion for Gaming, Rendering, & Creation",
        description:
            "A powerhouse built for gamers, creators, and rendering professionals. Premium ABS and Aluminum chassis, NVIDIA RTX 3060 discrete graphics, an immersive 16-inch 165Hz display, and an advanced thermal cooling system designed to push the limits of mobile performance.",
        basePrice: 89999,
        category: "Performance",
        badge: "Best Seller",
        images: [
            "/assets/images/s1/S1 gaming laptop transparent background png/1.png",
            "/assets/images/s1/S1 gaming laptop transparent background png/11.png",
            "/assets/images/s1/S1 gaming laptop transparent background png/12.png",
        ],
        specs: {
            cpu: "Intel Core i9-13900HK",
            gpu: "NVIDIA GeForce RTX 3060",
            ram: "16GB / 32GB / 64GB (Dual Slot)",
            storage: "512GB / 1TB / 2TB M.2 NVMe SSD",
            display: "16-inch FHD (1920×1080) 165Hz, 2ms, Anti-glare Matte",
            camera: "2MP HD with Privacy Shutter",
            battery: "90Wh (4-cell 5500–6000mAh)",
            os: "Windows 11",
            wifi: "Dual-band WiFi 6 (2.4GHz & 5GHz)",
            bluetooth: "Bluetooth 5.0",
            io: "USB 3.2 Gen1, USB 2.0, Type-C, HDMI, RJ45, 3.5mm Audio",
            cooling: "Advanced Dual-Fan Thermal Cooling System",
            build: "Premium ABS + Aluminum Chassis",
            keyboard: "RGB Illuminated Full-size with Numpad",
            security: "Fingerprint Lock",
            special: "High-end gaming & rendering performance, 165Hz display",
            variants: {
                processors: [
                    { name: "Intel Core i9-13900HK", priceModifier: 0 },
                ],
                ram: ["16GB", "32GB", "64GB"],
                storage: ["512GB SSD", "1TB SSD", "2TB SSD"],
            },
        },
        warranty: "18 Months Standard Warranty + Extension Available",
    },
    {
        id: "e4",
        slug: "e4",
        name: "Workbook E4",
        model: "WORKBOOK E4",
        tagline: "Your Working Companion, Your Workbook",
        description:
            "Intel 13th Gen i7 on 10 cores and 16 threads — built for heavy workloads, rendering pipelines, and software development. Dual cooling system, dual memory and storage slots, fingerprint lock, and RGB keyboard in a rugged aluminum-ABS chassis.",
        basePrice: 68999,
        category: "Business",
        badge: "Pro Pick",
        images: [
            "/assets/images/e4/E4 laptop photo transparent background png/1.png",
            "/assets/images/e4/E4 laptop photo transparent background png/2.png",
            "/assets/images/e4/E4 laptop photo transparent background png/3.png",
        ],
        specs: {
            cpu: "Intel Core i7-13620H (10 Cores, 16 Threads)",
            ram: "8GB / 16GB / 32GB / 64GB DDR4",
            storage: "Up to 2TB SSD (Dual Storage Expansion)",
            display: "15.6-inch FHD IPS",
            camera: "2MP HD with Privacy Shutter",
            battery: "5000mAh High-Capacity",
            weight: "1.68kg",
            os: "Windows 11",
            wifi: "Dual-band WiFi (2.4GHz & 5GHz)",
            bluetooth: "Bluetooth 4.x",
            io: "USB 3.0, USB 2.0, Type-C, HDMI, RJ45, SD Card Reader",
            cooling: "Dual Cooling System Architecture",
            build: "Premium ABS + Aluminum Chassis",
            keyboard: "RGB Illuminated Full-size with Numpad",
            security: "Windows Fingerprint Lock",
            special: "Built for heavy workloads — 10 cores, 16 threads",
            variants: {
                processors: [
                    { name: "Intel Core i7-13620H", priceModifier: 0 },
                ],
                ram: ["8GB", "16GB", "32GB", "64GB"],
                storage: ["512GB SSD", "1TB SSD", "2TB SSD"],
            },
        },
        warranty: "18 Months Standard Warranty + Extension Available",
    },
    {
        id: "e5",
        slug: "e5",
        name: "Workbook E5",
        model: "WORKBOOK E5",
        tagline: "Go Big on Display, Not on Cost",
        description:
            "Affordable performance laptop with smart swipe gesture controls, RGB keyboard, fingerprint lock, and a 15.6-inch Full HD display. Touch gesture-enabled for brightness and volume control. Engineered for everyday professionals on a smart budget.",
        basePrice: 31999,
        category: "Universal",
        images: [
            "/assets/images/e5/E5 new laptop photo transparent background png/1.png",
            "/assets/images/e5/E5 new laptop photo transparent background png/2.png",
            "/assets/images/e5/E5 new laptop photo transparent background png/3.png",
        ],
        specs: {
            cpu: "Intel Processor N5095 / N95",
            ram: "16GB / 32GB RAM",
            storage: "512GB / 1TB M.2 NVMe SSD",
            display: "15.6-inch Full HD (1920×1080)",
            camera: "2MP HD with Privacy Shutter",
            battery: "5000mAh High-Capacity",
            os: "Windows 11",
            wifi: "Dual-band WiFi (2.4GHz & 5GHz)",
            bluetooth: "Bluetooth 4.x",
            io: "Type-C, RJ45 Ethernet, USB, Audio Jack",
            cooling: "Optimized Airflow Cooling",
            build: "Sleek Polycarbonate ABS Housing",
            keyboard: "RGB Backlit Full-size with Numpad",
            security: "Windows Fingerprint Lock",
            special: "Smart touch swipe gestures for brightness & volume",
            variants: {
                processors: [
                    { name: "Intel Processor N95", priceModifier: 0 },
                    { name: "Intel Processor N5095", priceModifier: 2000 },
                ],
                ram: ["16GB", "32GB"],
                storage: ["512GB SSD", "1TB SSD"],
            },
        },
        warranty: "18 Months Standard Warranty + Extension Available",
    },
    {
        id: "e1",
        slug: "e1",
        name: "Workbook E1",
        model: "WORKBOOK E1",
        tagline: "Affordable. Customizable. Reliable",
        description:
            "Weighing just 1.3kg, the E1 is the ultra-portable student workhorse. Sleek silver aluminum finish, 14-inch IPS display with a wider 1920×1200 resolution, Type-C charging, and a full numeric keyboard. Engineered for smooth daily multitasking without compromise.",
        basePrice: 19999,
        category: "Mobility",
        badge: "Most Affordable",
        images: [
            "/assets/images/e1/E1 laptop photo transparent background png/1.png",
            "/assets/images/e1/E1 laptop photo transparent background png/2.png",
            "/assets/images/e1/E1 laptop photo transparent background png/3.png",
        ],
        specs: {
            cpu: "Intel N100 (up to 3.4GHz)",
            ram: "16GB / 32GB RAM",
            storage: "512GB / 1TB SSD",
            display: "14-inch IPS (1920×1200) 60Hz",
            camera: "2MP HD Webcam",
            battery: "5000mAh",
            weight: "1.3kg",
            os: "Windows 11",
            wifi: "Dual-band WiFi (2.4GHz & 5GHz)",
            bluetooth: "Bluetooth 4.x",
            io: "Type-C, USB 2.0, Audio Jack, SD/MMC Card Reader",
            cooling: "Passive Optimized Airflow",
            build: "Sleek Silver Aluminum Finish",
            keyboard: "Full-size with Numeric Keypad",
            security: "Windows Fingerprint Lock",
            special: "Ultra-portable 1.3kg design for students",
            variants: {
                processors: [
                    { name: "Intel N100 (up to 3.4GHz)", priceModifier: 0 },
                ],
                ram: ["16GB", "32GB"],
                storage: ["512GB SSD", "1TB SSD"],
            },
        },
        warranty: "18 Months Standard Warranty + Extension Available",
    },
    {
        id: "e3",
        slug: "e3",
        name: "Workbook E3",
        model: "WORKBOOK E3",
        tagline: "Affordable. Customizable. Reliable",
        description:
            "The entry-level Ention Workbook — purposefully engineered for essential computing tasks. Clean design, reliable Intel Celeron processing power, and core connectivity that gets the job done. Perfect for first-time laptop users and light workloads.",
        basePrice: 24999,
        category: "Mobility",
        images: [
            "/assets/images/e5/E5 new laptop photo transparent background png/12.png",
            "/assets/images/e5/E5 new laptop photo transparent background png/13.png",
            "/assets/images/e5/E5 new laptop photo transparent background png/14.png",
        ],
        specs: {
            cpu: "Intel Celeron (Dual Core)",
            ram: "8GB / 16GB RAM",
            storage: "256GB / 512GB SSD",
            display: "15.6-inch FHD",
            camera: "HD Webcam with Privacy Shutter",
            battery: "4000mAh",
            os: "Windows 11",
            wifi: "WiFi (2.4GHz & 5GHz)",
            bluetooth: "Bluetooth 4.x",
            io: "USB 2.0, Type-C, Audio Jack",
            cooling: "Optimized Passive Cooling",
            build: "Durable ABS Housing",
            keyboard: "Standard Full-size Keyboard",
            security: "Windows Hello Compatible",
            variants: {
                processors: [
                    { name: "Intel Celeron (Dual Core)", priceModifier: 0 },
                ],
                ram: ["8GB", "16GB"],
                storage: ["256GB SSD", "512GB SSD"],
            },
        },
        warranty: "18 Months Standard Warranty",
    },
    {
        id: "enterprise-x",
        slug: "enterprise-x",
        name: "Entity Core X",
        model: "ENTITY-X",
        tagline: "Build With Us. Grow With Us. Lead With Ention.",
        description:
            "Uncompromised sovereign compute for enterprise-grade operations. Dual Intel Xeon architecture, massive ECC memory banks, and RAID NVMe storage — wrapped in aerospace-grade aluminum. Built for data centers, research labs, and teams demanding absolute performance without compromise.",
        basePrice: 124999,
        category: "Enterprise & Servers",
        badge: "Enterprise",
        images: [
            "/assets/images/s1/S1 gaming laptop transparent background png/6.png",
            "/assets/images/s1/S1 gaming laptop transparent background png/11.png",
            "/assets/images/s1/S1 gaming laptop transparent background png/22.png",
        ],
        specs: {
            cpu: "Intel Core i9-14900HX (Server Grade)",
            ram: "64GB / 128GB DDR5 ECC",
            storage: "2TB / 4TB Dual NVMe RAID",
            display: "N/A (Workstation Module)",
            camera: "N/A",
            battery: "External UPS Compatible",
            os: "Windows 11 Pro / Linux",
            wifi: "10GbE Network Interface",
            bluetooth: "Bluetooth 5.0",
            io: "Thunderbolt 4, USB 3.2 x6, HDMI 2.1 x2, RJ45 x2",
            cooling: "Liquid-Assisted Triple Axial Cooling",
            build: "Aerospace-Grade Aluminum Enclosure",
            keyboard: "N/A",
            security: "TPM 2.0, Secure Boot, BitLocker Ready",
            special: "Server-grade absolute compute dominance",
            variants: {
                processors: [
                    { name: "Intel Core i9-14900HX", priceModifier: 0 },
                ],
                ram: ["64GB DDR5", "128GB DDR5 ECC"],
                storage: ["2TB Dual NVMe", "4TB Dual NVMe RAID"],
            },
        },
        warranty: "24 Months Enterprise Warranty + AMC Services",
    },
];

/** Utility — mirrors what `fetchProductById` returns */
export function getProductByIdOrSlug(idOrSlug: string): Product | undefined {
    return PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}
