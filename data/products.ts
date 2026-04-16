export interface ProductStory {
    title: string;
    description: string;
    detailTitle?: string;
    detailValue?: string;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
    image: string;
    description: string;
    featured?: boolean;
    specs: {
        cpu: string;
        gpu: string;
        storage: string;
        ram: string;
        display: string;
        material: string;
        ports?: string;
        battery?: string;
    };
    stories: ProductStory[];
}

export const PRODUCTS: Product[] = [
    {
        id: "e4-01",
        name: "WORKBOOK E4 // ELITE",
        category: "Laptops",
        price: "from ₹74,999",
        image: "/assets/workbook-laptop.png",
        description: "Unleash seamless performance with Intel 13th Gen i7-13620H. Engineered for elite productivity and heavy multitasking.",
        featured: true,
        specs: {
            cpu: "Intel i7-13620H (10 Core, 4.90 GHz)",
            gpu: "Intel UHD Graphics 1.50GHz",
            storage: "up to 2TB NVMe (Dual Slot)",
            ram: "up to 64GB DDR4 (Dual Slot)",
            display: "15.6\" FHD IPS (1920×1080) // 250 nits",
            material: "ABS & Aluminum Alloy Gray",
            ports: "3x USB 3.2, 1x Type-C (DP/Charging), HDMI, SD Reader",
            battery: "3-Cell 5000mAh // 19VDC Adapter"
        },
        stories: [
            {
                title: "Elite Performance Hub.",
                description: "Powered by the Intel 13th Gen Core i7-13620H processor with 10 Cores and 16 Threads, the E4 delivers speeds up to 4.90 GHz for seamless professional workflows.",
                detailTitle: "Peak Clock",
                detailValue: "4.90GHz"
            },
            {
                title: "Dual Cooling Engineering.",
                description: "Efficiently manages heat under heavy workloads using a dual cooling architecture, keeping performance stable and consistent even during intense multitasking.",
                detailTitle: "System Temp",
                detailValue: "Stable"
            },
            {
                title: "Zero Compromise Storage.",
                description: "Scale your performance with a dual-slot system supporting up to 64GB of memory and massive 2TB storage pools.",
                detailTitle: "Total Memory",
                detailValue: "64GB Max"
            }
        ]
    },
    {
        id: "e5-02",
        name: "WORKBOOK E5 // SMART",
        category: "Laptops",
        price: "from ₹32,999",
        image: "/assets/0N1A1389.png",
        description: "Your perfect everyday partner. High-quality computing without compromise, featuring the Intel N5095 processor.",
        specs: {
            cpu: "Intel N5095 (4 Core, 3.4GHz)",
            gpu: "Intel UHD Graphics 600",
            storage: "512GB/1TB NVMe",
            ram: "16/32GB DDR4",
            display: "15.6\" FHD IPS (1920×1080) // 250 nits",
            material: "ABS & Aluminum Alloy Silver",
            ports: "3x USB 3, 1x Type-C, Mini HDMI, SD Reader",
            battery: "2-Cell 5000mAh // 12VDC Adapter"
        },
        stories: [
            {
                title: "Magical Touch Control.",
                description: "Intuitive swipe gestures allow you to adjust volume and brightness with a simple finger scroll directly on the touchpad. Control at your fingertips.",
                detailTitle: "Interface",
                detailValue: "Touch-Sync"
            },
            {
                title: "Vibrant Visual Excellence.",
                description: "Immerse yourself in sharp visuals on a 15.6-inch Full HD panel with 250 nits brightness and vibrant, color-rich accuracy.",
                detailTitle: "Display",
                detailValue: "1080p IPS"
            },
            {
                title: "Instant Secure Access.",
                description: "Your data, your rules. The integrated fingerprint sensor offers instant, secure login that is fast, convenient, and foolproof.",
                detailTitle: "Security",
                detailValue: "Biometric"
            }
        ]
    },
    {
        id: "e5-01",
        name: "WORKBOOK E5 // COMPACT",
        category: "Laptops",
        price: "from ₹34,999",
        image: "/assets/Ention-Laptop-E3-Catalogue-design-2.png",
        description: "Efficient, portable, and smart. Featuring the Intel N100 processor for smooth everyday performance.",
        specs: {
            cpu: "Intel N100 (4 Core, 6MB L3)",
            gpu: "Intel UHD Graphics 600",
            storage: "512GB/1TB NVMe",
            ram: "16/32GB DDR4",
            display: "14\" FHD IPS (1920×1200)",
            material: "ABS Plastic Silver",
            ports: "2x USB 3, 1x Type-C, Mini HDMI, RJ45",
            battery: "2-Cell 5000mAh // 12VDC Adapter"
        },
        stories: [
            {
                title: "Smooth Day-to-Day.",
                description: "Engineered for everyday performance with Turbo Boost up to 3.4GHz and an efficient 4-core architecture.",
                detailTitle: "Turbo Speed",
                detailValue: "3.4GHz"
            },
            {
                title: "Full-Size Backlit Keys.",
                description: "An independent numeric keypad and backlit design ensure faster input and improved accuracy in any lighting condition.",
                detailTitle: "Keyboard",
                detailValue: "RGB Backlit"
            }
        ]
    }
];
