export interface ProductSpec {
    label: string;
    value: string;
}

export interface PricingLogic {
    ram: Record<string, number>;
    ssd: Record<string, number>;
    warranty: Record<string, number>;
}

export interface ProductData {
    id: string;
    title: string;
    tagline: string;
    originalPrice: number;
    images: string[];
    featureImages: string[];
    ramOptions: string[];
    ssdOptions: string[];
    warrantyOptions: string[];
    badges: string[];
    specs: ProductSpec[];
    video: string;
    pricingLogic: PricingLogic;
}
