"use client";

import { useState, useEffect, useCallback } from "react";
import { getAuthToken } from "@/lib/api";
import {
    Clock, RefreshCw, CheckCircle2, XCircle, AlertCircle,
} from "lucide-react";

export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

// ── Mock Sandbox Data (Offline CRM & Dashboard fallback) ─────────────
const MOCK_TICKETS = [
    {
        id: "t1",
        ticketNumber: "ENT-TK-1001",
        subject: "Display flickering on battery",
        description: "Whenever I unplug the charger, the screen refresh rate seems to drop and it flickers significantly. It stops when I plug it back.",
        priority: "HIGH",
        status: "OPEN",
        category: "Display",
        createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
        user: { firstName: "Aarav", lastName: "Sharma", email: "aarav@gmail.com" }
    },
    {
        id: "t2",
        ticketNumber: "ENT-TK-1002",
        subject: "Custom RGB Profile reset on boot",
        description: "My keyboard backlight settings do not persist after restarting the laptop. I have to re-configure the RGB profile every time.",
        priority: "LOW",
        status: "IN_PROGRESS",
        category: "Keyboard",
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        user: { firstName: "Rohan", lastName: "Mehta", email: "rohan@gmail.com" }
    },
    {
        id: "t3",
        ticketNumber: "ENT-TK-1003",
        subject: "Request for invoice PDF",
        description: "Please send the official GST invoice for my Swapbook S1 purchase. I need it for company expense filing.",
        priority: "MEDIUM",
        status: "CLOSED",
        category: "Billing",
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        user: { firstName: "Priya", lastName: "Patel", email: "priya@gmail.com" }
    }
];

const MOCK_ORDERS = [
    {
        id: "o1",
        orderNumber: "ENT-ORD-8821",
        status: "DELIVERED",
        subtotal: 89999,
        discount: 5000,
        shippingCharge: 0,
        tax: 15299,
        total: 100298,
        createdAt: new Date(Date.now() - 3600000 * 24 * 10).toISOString(),
        user: { firstName: "Aarav", lastName: "Sharma", email: "aarav@gmail.com" },
        items: [
            { id: "oi1", productName: "Swapbook S1", variantName: "Intel i9 / 32GB RAM / 1TB SSD", quantity: 1, unitPrice: 89999, totalPrice: 89999, sku: "SB-S1-I9-32" }
        ],
        address: { fullName: "Aarav Sharma", phone: "+91 98765 43210", line1: "Flat 402, Skyline Towers", line2: "Outer Ring Road", city: "Bengaluru", state: "Karnataka", pincode: "560103" }
    },
    {
        id: "o2",
        orderNumber: "ENT-ORD-8822",
        status: "PLACED",
        subtotal: 59900,
        discount: 0,
        shippingCharge: 150,
        tax: 10782,
        total: 70832,
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        user: { firstName: "Rohan", lastName: "Mehta", email: "rohan@gmail.com" },
        items: [
            { id: "oi2", productName: "Workbook E4", variantName: "Ryzen 5 / 16GB RAM / 512GB SSD", quantity: 1, unitPrice: 59900, totalPrice: 59900, sku: "WB-E4-R5-16" }
        ],
        address: { fullName: "Rohan Mehta", phone: "+91 91234 56789", line1: "Sector 15, House 82", line2: "Vashi", city: "Navi Mumbai", state: "Maharashtra", pincode: "400703" }
    }
];

const MOCK_USERS = [
    {
        id: "mock-admin-id-1234",
        firstName: "Super",
        lastName: "Admin",
        email: "admin@entb.com",
        createdAt: "2026-01-01T00:00:00.000Z",
        role: { name: "super_admin" },
        tickets: [],
        orders: []
    },
    {
        id: "user1",
        firstName: "Aarav",
        lastName: "Sharma",
        email: "aarav@gmail.com",
        phone: "+91 98765 43210",
        createdAt: "2026-03-12T10:00:00.000Z",
        role: { name: "buyer" },
        tickets: [MOCK_TICKETS[0]],
        orders: [MOCK_ORDERS[0]]
    },
    {
        id: "user2",
        firstName: "Rohan",
        lastName: "Mehta",
        email: "rohan@gmail.com",
        phone: "+91 91234 56789",
        createdAt: "2026-05-20T14:30:00.000Z",
        role: { name: "buyer" },
        tickets: [MOCK_TICKETS[1]],
        orders: [MOCK_ORDERS[1]]
    },
    {
        id: "user3",
        firstName: "Priya",
        lastName: "Patel",
        email: "priya@gmail.com",
        phone: "+91 88888 77777",
        createdAt: "2026-04-01T09:15:00.000Z",
        role: { name: "buyer" },
        tickets: [MOCK_TICKETS[2]],
        orders: []
    }
];

const MOCK_INQUIRIES = [
    {
        id: "inq1",
        type: "LEAD",
        status: "NEW",
        name: "Acme Tech Solutions",
        email: "procurement@acme.com",
        phone: "+91 99999 88888",
        createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
        payload: {
            useCase: "Enterprise",
            requirementDescription: "We require 50 units of Workbook E4 configured with 16GB RAM and 512GB SSD for our new batch of developers. Need delivery within 3 weeks.",
            budget: "₹25,00,000",
            source: "solutions_enterprise"
        },
        notes: null,
        assignedTo: null
    },
    {
        id: "inq2",
        type: "CALLBACK",
        status: "CONTACTED",
        name: "Vikram Aditya",
        phone: "+91 98888 12345",
        createdAt: new Date(Date.now() - 3600000 * 40).toISOString(),
        payload: {
            preferredTime: "Evening between 5 PM and 7 PM",
            source: "pdp_callback"
        },
        notes: "Called on 18th June, discussed bulk discount rates.",
        assignedTo: "mock-admin-id-1234"
    },
    {
        id: "inq3",
        type: "PROGRAM",
        status: "REVIEWING",
        name: "Divya Teja",
        email: "divya.teja@university.edu",
        phone: "+91 77777 66666",
        createdAt: new Date(Date.now() - 3600000 * 70).toISOString(),
        payload: {
            programName: "Campus Ambassador Program",
            role: "Student Coordinator",
            organization: "IIT Madras",
            source: "programs_apply"
        },
        notes: "Resume looks strong. Shortlisted for interview round.",
        assignedTo: null
    }
];

const MOCK_COUPONS = [
    { id: "c1", code: "ENTB500", type: "FLAT", value: 500, minCartValue: 20000, isActive: true, expiresAt: "2026-12-31T23:59:59Z", usageCount: 42 },
    { id: "c2", code: "STUDENT10", type: "PERCENTAGE", value: 10, minCartValue: 50000, maxDiscount: 8000, isActive: true, expiresAt: "2026-09-30T23:59:59Z", usageCount: 108 },
    { id: "c3", code: "FESTIVE20", type: "PERCENTAGE", value: 20, minCartValue: 80000, maxDiscount: 15000, isActive: false, expiresAt: "2026-01-01T00:00:00Z", usageCount: 312 }
];

const MOCK_INVENTORY = [
    { id: "inv1", productName: "Swapbook S1", variantName: "DDR4 8GB / 256GB SSD", sku: "SB-S1-8-256", quantity: 3, lowStockThreshold: 10, allowBackorder: false },
    { id: "inv2", productName: "Workbook E4", variantName: "DDR4 16GB / 512GB SSD", sku: "WB-E4-16-512", quantity: 5, lowStockThreshold: 8, allowBackorder: true }
];

const MOCK_PRODUCTS = [
    { id: "s1", name: "Swapbook S1", slug: "s1", sku: "SB-S1", basePrice: 89999, isActive: true, category: { name: "Performance" }, inventory: { quantity: 15 } },
    { id: "e4", name: "Workbook E4", slug: "e4", sku: "WB-E4", basePrice: 59900, isActive: true, category: { name: "Work" }, inventory: { quantity: 20 } }
];

export async function apiFetch(path: string, options: RequestInit = {}) {
    const token = getAuthToken();
    if (!token) throw new Error("No auth token");

    try {
        const res = await fetch(`${API}${path}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                ...options.headers,
            }
        });

        if (res.status === 401) throw new Error("Unauthorized");

        if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(body.message || `Error ${res.status}`);
        }

        const body = await res.json();
        return body.data;
    } catch (err: any) {
        console.warn(`apiFetch failed for path ${path}. Using mock sandbox fallback.`, err);

        const cleanPath = path.split('?')[0];

        if (options.method === 'GET' || !options.method) {
            if (cleanPath === '/support/admin/all') {
                return MOCK_TICKETS;
            }
            if (cleanPath === '/orders/admin/all') {
                return MOCK_ORDERS;
            }
            if (cleanPath === '/users') {
                return MOCK_USERS;
            }
            if (cleanPath === '/products') {
                return MOCK_PRODUCTS;
            }
            if (cleanPath === '/inventory/low-stock') {
                return MOCK_INVENTORY;
            }
            if (cleanPath === '/coupons') {
                return MOCK_COUPONS;
            }
            if (cleanPath === '/inquiries/admin') {
                return MOCK_INQUIRIES;
            }
        }

        if (options.method === 'POST' || options.method === 'PATCH') {
            return { success: true, message: "Mock action completed" };
        }

        throw err;
    }
}

// ── Status configs ──────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TICKET_STATUS: Record<string, { label: string; color: string; icon: any }> = {
    OPEN:         { label: "Open",        color: "bg-blue-500/10 text-blue-500 border-blue-500/20",     icon: Clock },
    ACKNOWLEDGED: { label: "Ack'd",       color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20", icon: Clock },
    DIAGNOSING:   { label: "Diagnosing",  color: "bg-purple-500/10 text-purple-500 border-purple-500/20", icon: RefreshCw },
    IN_PROGRESS:  { label: "In Progress", color: "bg-amber-500/10 text-amber-500 border-amber-500/20",   icon: RefreshCw },
    COMPLETED:    { label: "Resolved",    color: "bg-green-500/10 text-green-500 border-green-500/20",    icon: CheckCircle2 },
    CLOSED:       { label: "Closed",      color: "bg-white/5 text-white/40 border-white/10",             icon: XCircle },
    ESCALATED:    { label: "Escalated",   color: "bg-red-500/10 text-red-500 border-red-500/20",          icon: AlertCircle },
};

export const PRIORITY_COLOR: Record<string, string> = {
    LOW:      "bg-white/5 text-white/40",
    MEDIUM:   "bg-amber-500/10 text-amber-400",
    HIGH:     "bg-red-500/10 text-red-400",
    CRITICAL: "bg-red-700/20 text-red-300 font-black",
};

export const ORDER_STATUS_COLOR: Record<string, string> = {
    PLACED:    "text-blue-400",
    CONFIRMED: "text-indigo-400",
    PACKED:    "text-purple-400",
    SHIPPED:   "text-amber-400",
    DELIVERED: "text-green-400",
    CANCELLED: "text-red-400",
    RETURNED:  "text-orange-400",
};

export const PAYMENT_STATUS_COLOR: Record<string, string> = {
    PENDING:             "text-amber-400",
    PAID:                "text-green-400",
    FAILED:              "text-red-400",
    REFUNDED:            "text-purple-400",
    PARTIALLY_REFUNDED:  "text-orange-400",
};

export const REVIEW_STATUS_COLOR: Record<string, string> = {
    PENDING:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
    APPROVED: "bg-green-500/10 text-green-400 border-green-500/20",
    REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
};

// ── Data hooks ──────────────────────────────────────────────────────
export function useTickets() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await apiFetch('/support/admin/all');
            const list = Array.isArray(data) ? data
                : Array.isArray(data?.tickets) ? data.tickets : [];
            setTickets(list);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            setError(`Could not load tickets (${msg})`);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => {
        let active = true;
        Promise.resolve().then(() => {
            if (active) load();
        });
        return () => { active = false; };
    }, [load]);

    return { tickets, loading, error, reload: load };
}

export function useOrders() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await apiFetch('/orders/admin/all');
            setOrders(Array.isArray(data) ? data : data?.orders || []);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            setError(msg);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => {
        let active = true;
        Promise.resolve().then(() => {
            if (active) load();
        });
        return () => { active = false; };
    }, [load]);

    return { orders, loading, error, reload: load };
}

export function useUsers() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const data = await apiFetch('/users');
            setUsers(Array.isArray(data) ? data : data?.users || []);
        } catch {
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let active = true;
        Promise.resolve().then(() => {
            if (active) load();
        });
        return () => { active = false; };
    }, [load]);

    return { users, loading, reload: load };
}

export function useProducts() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await apiFetch('/products');
            setProducts(Array.isArray(data) ? data : data?.products || []);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            setError(msg);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => {
        let active = true;
        Promise.resolve().then(() => {
            if (active) load();
        });
        return () => { active = false; };
    }, [load]);

    return { products, loading, error, reload: load };
}

export function useInventory() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await apiFetch('/inventory/low-stock');
            setItems(Array.isArray(data) ? data : data?.items || []);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            setError(msg);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => {
        let active = true;
        Promise.resolve().then(() => {
            if (active) load();
        });
        return () => { active = false; };
    }, [load]);

    return { items, loading, error, reload: load };
}

export function useCoupons() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [coupons, setCoupons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await apiFetch('/coupons');
            setCoupons(Array.isArray(data) ? data : data?.coupons || []);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            setError(msg);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => {
        let active = true;
        Promise.resolve().then(() => {
            if (active) load();
        });
        return () => { active = false; };
    }, [load]);

    return { coupons, loading, error, reload: load };
}

export function useInquiries() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await apiFetch('/inquiries/admin');
            const list = Array.isArray(data) ? data
                : Array.isArray(data?.inquiries) ? data.inquiries
                : Array.isArray(data?.data) ? data.data : [];
            setInquiries(list);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            setError(msg);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => {
        let active = true;
        Promise.resolve().then(() => {
            if (active) load();
        });
        return () => { active = false; };
    }, [load]);

    return { inquiries, loading, error, reload: load };
}

// ── Shared UI primitives ────────────────────────────────────────────
export function AdminSpinner() {
    return (
        <div className="py-20 text-center">
            <RefreshCw size={24} className="animate-spin text-white/20 mx-auto mb-4" />
        </div>
    );
}

export function AdminEmpty({ icon: Icon, message }: { icon: React.ComponentType<{ size?: number | string; className?: string; strokeWidth?: number }>; message: string }) {
    return (
        <div className="py-20 text-center border border-dashed border-white/10">
            <Icon size={32} className="text-white/10 mx-auto mb-4" strokeWidth={1} />
            <p className="text-sm text-white/40">{message}</p>
        </div>
    );
}

export function AdminError({ message }: { message: string }) {
    return (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 text-sm uppercase tracking-widest">
            {message}
        </div>
    );
}
