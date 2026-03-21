import { ProductData } from "@/types/product";

export const entionProducts: Record<string, ProductData> = {
    e3: {
        id: "E3",
        title: "ENTION WORKBOOK SERIES E3",
        tagline: "Workbook Series",
        originalPrice: 28000,
        images: ["/assets/product_/e3/1.jpg", "/assets/product_/e3/IMG_9945.jpg"],
        featureImages: ["/assets/product_/e5/feature_images/1.png"],
        ramOptions: ["8GB", "16GB"],
        ssdOptions: ["512GB", "1TB"],
        warrantyOptions: ["18 Months (Default)", "+6 Months", "+1 Year"],
        badges: ["Made for rough use", "dual heating system", "With a full-metal body"],
        specs: [
            { label: "Processor", value: "Intel N95 up to 3.4GHz" },
            { label: "Display", value: "15.6inch Full HD IPS" },
            { label: "Battery", value: "5000mAh" },
            { label: "OS", value: "Windows 11" }
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        pricingLogic: {
            ram: { "16GB": 3000 },
            ssd: { "1TB": 4000 },
            warranty: { "+6 Months": 1000, "+1 Year": 1800 }
        }
    },
    e4: {
        id: "E4",
        title: "ENTION WORKBOOK SERIES E4",
        tagline: "Performance Series",
        originalPrice: 32000,
        images: ["/assets/product_/e4/1.jpg"],
        featureImages: [],
        ramOptions: ["8GB", "16GB"],
        ssdOptions: ["512GB", "1TB"],
        warrantyOptions: ["1 Year", "2 Years"],
        badges: ["Fast Charging", "Backlit Keyboard"],
        specs: [
            { label: "Processor", value: "Intel N100 up to 3.4GHz" },
            { label: "Display", value: "15.6inch Full HD" },
            { label: "Battery", value: "6000mAh" },
            { label: "OS", value: "Windows 11 Pro" }
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        pricingLogic: {
            ram: { "16GB": 3500 },
            ssd: { "1TB": 4500 },
            warranty: { "2 Years": 2500 }
        }
    },
    e5: {
        id: "E5",
        title: "ENTION WORKBOOK SERIES E5",
        tagline: "Elite Series",
        originalPrice: 38000,
        images: ["/assets/product_/e5/1.png"],
        featureImages: [],
        ramOptions: ["16GB", "32GB"],
        ssdOptions: ["1TB", "2TB"],
        warrantyOptions: ["1 Year Premium", "3 Years Global"],
        badges: ["Thunderbolt 4", "4K OLED Display"],
        specs: [
            { label: "Processor", value: "Intel Core i5-1235U" },
            { label: "Display", value: "15.6inch 4K OLED" },
            { label: "Battery", value: "75Wh" },
            { label: "OS", value: "Windows 11 Pro" }
        ],
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        pricingLogic: {
            ram: { "32GB": 7000 },
            ssd: { "2TB": 8500 },
            warranty: { "3 Years Global": 5000 }
        }
    }
};
