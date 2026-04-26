"use client";

import { useState, useEffect, useCallback } from "react";
import { getAuthToken } from "@/lib/api";
import {
    Clock, RefreshCw, CheckCircle2, XCircle, AlertCircle,
} from "lucide-react";

export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export async function apiFetch(path: string, options: RequestInit = {}) {
    const token = getAuthToken();
    if (!token) throw new Error("No auth token");

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
}

// ── Status configs ──────────────────────────────────────────────────
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
        } catch (e: any) {
            setError(`Could not load tickets (${e.message})`);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);
    return { tickets, loading, error, reload: load };
}

export function useOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await apiFetch('/orders/admin/all');
            setOrders(Array.isArray(data) ? data : data?.orders || []);
        } catch (e: any) {
            setError(e.message);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);
    return { orders, loading, error, reload: load };
}

export function useUsers() {
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

    useEffect(() => { load(); }, [load]);
    return { users, loading, reload: load };
}

export function useProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await apiFetch('/products');
            setProducts(Array.isArray(data) ? data : data?.products || []);
        } catch (e: any) {
            setError(e.message);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);
    return { products, loading, error, reload: load };
}

export function useInventory() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await apiFetch('/inventory/low-stock');
            setItems(Array.isArray(data) ? data : data?.items || []);
        } catch (e: any) {
            setError(e.message);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);
    return { items, loading, error, reload: load };
}

export function useCoupons() {
    const [coupons, setCoupons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const data = await apiFetch('/coupons');
            setCoupons(Array.isArray(data) ? data : data?.coupons || []);
        } catch (e: any) {
            setError(e.message);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);
    return { coupons, loading, error, reload: load };
}

// ── Shared UI primitives ────────────────────────────────────────────
export function AdminSpinner() {
    return (
        <div className="py-20 text-center">
            <RefreshCw size={24} className="animate-spin text-white/20 mx-auto mb-4" />
        </div>
    );
}

export function AdminEmpty({ icon: Icon, message }: { icon: any; message: string }) {
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
