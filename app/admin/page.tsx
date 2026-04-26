"use client";

import React, { useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { BlurFadeIn } from "@/components/BlurFadeIn";
import {
    LayoutDashboard, TrendingUp, Package, Boxes, ShoppingBag,
    CreditCard, Ticket, Users, MessageSquare, Tag, Settings,
    Search, RefreshCw, CheckCircle2, Clock, AlertCircle, XCircle,
    ChevronRight, UserCircle, FileText, UserPlus
} from "lucide-react";

import {
    useTickets, useOrders, useUsers,
    TICKET_STATUS, PRIORITY_COLOR, ORDER_STATUS_COLOR,
    apiFetch, AdminSpinner, AdminEmpty, AdminError,
} from "@/components/admin/shared";

import OverviewPanel from "@/components/admin/OverviewPanel";
import AnalyticsPanel from "@/components/admin/AnalyticsPanel";
import ProductsPanel from "@/components/admin/ProductsPanel";
import InventoryPanel from "@/components/admin/InventoryPanel";
import TransactionsPanel from "@/components/admin/TransactionsPanel";
import ReviewsPanel from "@/components/admin/ReviewsPanel";
import CouponsPanel from "@/components/admin/CouponsPanel";
import SettingsPanel from "@/components/admin/SettingsPanel";
import LeadsPanel from "@/components/admin/LeadsPanel";

// ── Nav ─────────────────────────────────────────────────────────────
const NAV = [
    { id: "overview",     label: "Home",          icon: LayoutDashboard },
    { id: "analytics",    label: "Analytics",     icon: TrendingUp },
    { id: "products",     label: "Products",      icon: Package },
    { id: "inventory",    label: "Inventory",     icon: Boxes },
    { id: "orders",       label: "Orders",        icon: ShoppingBag },
    { id: "transactions", label: "Transactions",  icon: CreditCard },
    { id: "tickets",      label: "Tickets",       icon: Ticket },
    { id: "leads",        label: "Leads/Requests", icon: UserPlus },
    { id: "users",        label: "Customers",     icon: Users },
    { id: "reviews",      label: "Reviews",       icon: MessageSquare },
    { id: "coupons",      label: "Coupons",       icon: Tag },
    { id: "settings",     label: "Settings",      icon: Settings },
];

const PANEL_TITLES: Record<string, string> = {
    overview:     "System Overview",
    analytics:    "Store Analytics",
    products:     "Product Catalog",
    inventory:    "Inventory Control",
    orders:       "All Orders",
    transactions: "Transaction History",
    tickets:      "Support Tickets",
    leads:        "Leads & Institutional Requests",
    users:        "Customer Directory",
    reviews:      "Review Moderation",
    coupons:      "Coupon Management",
    settings:     "Store Settings",
};

// ── Tickets Panel (inline — kept from original) ─────────────────────
function TicketsPanel() {
    const { tickets, loading, error, reload } = useTickets();
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [updating, setUpdating] = useState<string | null>(null);

    const filtered = tickets.filter(t => {
        const matchStatus = filter === "all" || t.status === filter;
        const q = search.toLowerCase();
        const matchSearch = !q
            || (t.user?.email || '').toLowerCase().includes(q)
            || t.subject?.toLowerCase().includes(q)
            || t.ticketNumber?.toLowerCase().includes(q);
        return matchStatus && matchSearch;
    });

    const updateStatus = async (ticketId: string, status: string) => {
        setUpdating(ticketId);
        try {
            await apiFetch(`/support/admin/${ticketId}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status }),
            });
            reload();
        } catch { /* ignore */ }
        finally { setUpdating(null); }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search tickets..."
                        className="w-full bg-[#18181b] rounded-xl border border-white/10 pl-10 pr-4 py-3 text-sm uppercase tracking-widest focus:outline-none focus:border-[#F27D26] transition-colors text-white placeholder-white/30"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {["all", "OPEN", "IN_PROGRESS", "ESCALATED", "COMPLETED", "CLOSED"].map(s => (
                        <button key={s} onClick={() => setFilter(s)}
                            className={`px-3 py-2 text-xs font-medium px-2.5 py-1 rounded-md tracking-widest transition-all ${filter === s ? "bg-white text-black" : "border border-white/10 hover:border-white/30 text-white/50"}`}>
                            {s === "all" ? "All" : s}
                        </button>
                    ))}
                    <button onClick={reload} className="px-3 py-2 border border-white/10 hover:border-[#F27D26] text-white/50 hover:text-[#F27D26] transition-all">
                        <RefreshCw size={12} />
                    </button>
                </div>
            </div>

            {error && <AdminError message={error} />}

            {loading ? <AdminSpinner /> : filtered.length === 0 ? (
                <AdminEmpty icon={Ticket} message="No tickets found." />
            ) : (
                <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-[#27272a] rounded-t-xl border border-white/5 text-white/30">
                        {["Ticket #", "User", "Subject", "Priority", "Status", "Date", "Action"].map((h, i) => (
                            <span key={i} className={`text-xs font-semibold text-white/50 uppercase tracking-wider ${i === 1 ? "col-span-2" : i === 2 ? "col-span-3" : i === 4 ? "col-span-2" : "col-span-1"}`}>{h}</span>
                        ))}
                    </div>

                    {filtered.map(ticket => {
                        const cfg = TICKET_STATUS[ticket.status] || TICKET_STATUS.OPEN;
                        const StatusIcon = cfg.icon;
                        return (
                            <div key={ticket.id} className="grid grid-cols-12 gap-3 px-5 py-4 bg-[#18181b] rounded-xl border border-white/5 hover:border-[#F27D26]/40 transition-all group items-center">
                                <span className="col-span-1 text-sm text-[#F27D26] font-black truncate">{ticket.ticketNumber}</span>
                                <span className="col-span-2 text-sm truncate opacity-50">{ticket.user?.email || '—'}</span>
                                <span className="col-span-3 font-medium text-sm text-white/90 truncate text-sm">{ticket.subject}</span>
                                <div className="col-span-1">
                                    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md ${PRIORITY_COLOR[ticket.priority] || PRIORITY_COLOR.MEDIUM}`}>
                                        {ticket.priority}
                                    </span>
                                </div>
                                <div className="col-span-2">
                                    <span className={`flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 border rounded-md w-max ${cfg.color}`}>
                                        <StatusIcon size={9} /> {cfg.label}
                                    </span>
                                </div>
                                <span className="col-span-1 text-xs opacity-30">
                                    {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString('en-IN') : '—'}
                                </span>
                                <div className="col-span-1">
                                    <select
                                        disabled={updating === ticket.id}
                                        onChange={e => updateStatus(ticket.id, e.target.value)}
                                        defaultValue=""
                                        className="bg-[#1C1C1C] border border-white/10 text-white/60 text-[8px] font-sans uppercase px-2 py-1 focus:outline-none focus:border-[#F27D26] w-full"
                                    >
                                        <option value="" disabled>Update</option>
                                        {Object.keys(TICKET_STATUS).map(s => (
                                            <option key={s} value={s}>{TICKET_STATUS[s].label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ── Orders Panel (inline — kept from original with invoice link) ────
function OrdersPanel() {
    const { orders, loading, error, reload } = useOrders();
    const [updating, setUpdating] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [invoiceLoading, setInvoiceLoading] = useState(false);

    const filtered = orders.filter(o =>
        o.orderNumber?.toLowerCase().includes(query.toLowerCase()) ||
        o.user?.email?.toLowerCase().includes(query.toLowerCase()) ||
        o.user?.firstName?.toLowerCase().includes(query.toLowerCase())
    );

    const updateStatus = async (orderId: string, status: string) => {
        setUpdating(orderId);
        try {
            await apiFetch(`/orders/admin/${orderId}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status })
            });
            reload();
        } catch (e) { console.error(e); }
        finally { setUpdating(null); }
    };

    const viewInvoice = async (orderId: string) => {
        setInvoiceLoading(true);
        try {
            const data = await apiFetch(`/orders/admin/${orderId}`);
            setSelectedOrder(data.order || data);
        } catch (e: any) { alert(`Failed: ${e.message}`); }
        finally { setInvoiceLoading(false); }
    };

    // Invoice detail view
    if (selectedOrder) {
        const inv = selectedOrder.invoice;
        return (
            <div className="space-y-8">
                <button onClick={() => setSelectedOrder(null)}
                    className="flex items-center gap-2 text-[#F27D26] text-sm uppercase tracking-widest hover:underline">
                    <ChevronRight className="rotate-180" size={14} /> Back to Orders
                </button>

                <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-10 space-y-8">
                    <div className="flex justify-between items-start border-b border-white/5 pb-8">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold tracking-tight">Invoice</h2>
                            <p className="text-sm text-[#F27D26] font-bold">{inv?.invoiceNumber || 'N/A'}</p>
                            <p className="text-sm opacity-40">Order: {selectedOrder.orderNumber}</p>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-xs uppercase text-white/30">Date</p>
                            <p className="text-sm">{inv?.invoiceDate ? new Date(inv.invoiceDate).toLocaleDateString() : new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-2 gap-8 border-b border-white/5 pb-8">
                        <div className="space-y-2">
                            <p className="text-xs uppercase text-white/30">Billed To</p>
                            <p className="font-sans text-sm">{selectedOrder.user?.firstName} {selectedOrder.user?.lastName}</p>
                            <p className="text-sm opacity-40">{selectedOrder.user?.email}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs uppercase text-white/30">Ship To</p>
                            <p className="text-sm opacity-60 leading-relaxed">
                                {selectedOrder.address?.line1}{selectedOrder.address?.line2 ? `, ${selectedOrder.address.line2}` : ''}<br />
                                {selectedOrder.address?.city}, {selectedOrder.address?.state} {selectedOrder.address?.pincode}
                            </p>
                        </div>
                    </div>

                    {/* Line Items */}
                    <div className="space-y-3">
                        <div className="grid grid-cols-12 gap-3 py-2 text-white/30">
                            <span className="col-span-5 text-xs uppercase tracking-widest font-black">Item</span>
                            <span className="col-span-2 text-xs uppercase tracking-widest font-black">SKU</span>
                            <span className="col-span-1 text-xs uppercase tracking-widest font-black">Qty</span>
                            <span className="col-span-2 text-xs uppercase tracking-widest font-black">Unit Price</span>
                            <span className="col-span-2 text-xs uppercase tracking-widest font-black text-right">Total</span>
                        </div>
                        {(selectedOrder.items || []).map((item: any) => (
                            <div key={item.id} className="grid grid-cols-12 gap-3 py-3 border-t border-white/5 items-center">
                                <div className="col-span-5 space-y-0.5">
                                    <p className="font-semibold text-sm text-sm">{item.productName}</p>
                                    {item.variantName && <p className="text-xs opacity-40">{item.variantName}</p>}
                                </div>
                                <span className="col-span-2 text-sm opacity-40">{item.sku}</span>
                                <span className="col-span-1 text-sm">{item.quantity}</span>
                                <span className="col-span-2 text-sm">₹{Number(item.unitPrice).toLocaleString()}</span>
                                <span className="col-span-2 text-sm font-bold text-right">₹{Number(item.totalPrice).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="border-t-2 border-white/10 pt-6 space-y-3 max-w-xs ml-auto">
                        <div className="flex justify-between text-sm">
                            <span className="opacity-40">Subtotal</span>
                            <span>₹{Number(selectedOrder.subtotal).toLocaleString()}</span>
                        </div>
                        {Number(selectedOrder.discount) > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="opacity-40">Discount{selectedOrder.couponCode ? ` (${selectedOrder.couponCode})` : ''}</span>
                                <span className="text-green-400">-₹{Number(selectedOrder.discount).toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm">
                            <span className="opacity-40">Tax (GST)</span>
                            <span>₹{Number(selectedOrder.tax).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="opacity-40">Shipping</span>
                            <span>{Number(selectedOrder.shippingCharge) > 0 ? `₹${Number(selectedOrder.shippingCharge).toLocaleString()}` : 'Free'}</span>
                        </div>
                        <div className="flex justify-between font-sans text-sm font-black border-t border-white/10 pt-3">
                            <span>Total</span>
                            <span className="text-[#F27D26]">₹{Number(selectedOrder.total).toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Payment Info */}
                    {selectedOrder.payment && (
                        <div className="border-t border-white/5 pt-6 space-y-2">
                            <p className="text-xs uppercase text-white/30">Payment</p>
                            <div className="flex gap-6 text-sm">
                                <span>Method: {selectedOrder.payment.method}</span>
                                <span>Status: <span className={selectedOrder.payment.status === 'PAID' ? 'text-green-400' : 'text-amber-400'}>{selectedOrder.payment.status}</span></span>
                                {selectedOrder.payment.razorpayPaymentId && <span className="opacity-40">ID: {selectedOrder.payment.razorpayPaymentId}</span>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-4">
                <div className="relative w-96">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <input
                        type="text" placeholder="Search orders by number, email or name..."
                        value={query} onChange={e => setQuery(e.target.value)}
                        className="w-full bg-[#27272a] border border-white/5 rounded-lg pl-12 pr-4 py-3 text-sm uppercase tracking-widest focus:outline-none focus:border-[#F27D26] transition-all"
                    />
                </div>
                <button onClick={reload} className="p-3 border border-white/10 hover:bg-white/5 rounded-lg transition-all text-white/40">
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {error && <AdminError message={error} />}

            {loading ? <AdminSpinner /> : (
                <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-[#27272a] rounded-t-xl border border-white/5 text-white/30">
                        {["Order #", "Customer", "Date", "Items", "Total", "Status", "Action", "Invoice"].map((h, i) => (
                            <span key={i} className={`text-xs font-semibold text-white/50 uppercase tracking-wider ${
                                i === 1 ? "col-span-2" : i === 3 ? "col-span-2" : i === 5 ? "col-span-1" : i === 6 ? "col-span-2" : "col-span-1"
                            }`}>{h}</span>
                        ))}
                    </div>
                    {filtered.map(order => (
                        <div key={order.id} className="grid grid-cols-12 gap-3 px-5 py-4 bg-[#18181b] rounded-xl border border-white/5 hover:border-[#F27D26]/40 transition-all group items-center">
                            <span className="col-span-1 text-sm text-[#F27D26] font-black">{order.orderNumber?.slice(-8)}</span>
                            <span className="col-span-2 text-sm truncate opacity-50">{order.user?.email || '—'}</span>
                            <span className="col-span-1 text-xs opacity-30">{new Date(order.createdAt).toLocaleDateString()}</span>
                            <span className="col-span-2 text-sm opacity-50">{order.items?.length || 0} Items</span>
                            <span className="col-span-1 text-sm font-bold">₹{Number(order.total).toLocaleString()}</span>
                            <span className="col-span-1">
                                <span className={`text-[7px] font-black uppercase tracking-widest ${ORDER_STATUS_COLOR[order.status] || 'text-white'}`}>
                                    {order.status}
                                </span>
                            </span>
                            <div className="col-span-2">
                                <select
                                    disabled={updating === order.id}
                                    onChange={e => updateStatus(order.id, e.target.value)}
                                    className="bg-[#1C1C1C] border border-white/10 text-white/40 text-[7px] font-sans uppercase px-2 py-1 focus:outline-none focus:border-[#F27D26] w-full"
                                >
                                    <option value="" disabled selected>Set Status</option>
                                    {Object.keys(ORDER_STATUS_COLOR).map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-1">
                                <button
                                    onClick={() => viewInvoice(order.id)}
                                    className="flex items-center gap-1 text-[8px] font-sans font-black uppercase tracking-widest text-[#F27D26] hover:text-white transition-colors"
                                >
                                    <FileText size={10} /> View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Users Panel (inline — kept from original) ───────────────────────
function UsersPanel() {
    const { users, loading, reload } = useUsers();
    const [query, setQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    const filtered = users.filter(u =>
        u.email?.toLowerCase().includes(query.toLowerCase()) ||
        u.firstName?.toLowerCase().includes(query.toLowerCase()) ||
        u.lastName?.toLowerCase().includes(query.toLowerCase())
    );

    const fetchUserDetails = async (userId: string) => {
        setDetailsLoading(true);
        try {
            const data = await apiFetch(`/users/${userId}`);
            setSelectedUser(data.user || data);
        } catch (err) {
            console.error(err);
            alert("Failed to load user details");
        } finally { setDetailsLoading(false); }
    };

    if (selectedUser) {
        return (
            <div className="space-y-8 pb-20">
                <button onClick={() => setSelectedUser(null)}
                    className="flex items-center gap-2 text-[#F27D26] text-sm uppercase tracking-widest hover:underline mb-4">
                    <ChevronRight className="rotate-180" size={14} /> Back to Directory
                </button>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3 space-y-6">
                        <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#27272a] border border-white/5 rounded-lg flex items-center justify-center rounded-md">
                                    <UserCircle size={32} className="text-white/20" />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-xl font-semibold tracking-tight">{selectedUser.firstName} {selectedUser.lastName}</h2>
                                    <span className={`text-[7px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${selectedUser.role?.name === 'super_admin' ? 'bg-red-500/20 text-red-500' : 'bg-[#F27D26] text-white'}`}>
                                        {selectedUser.role?.name || 'Customer'}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <div className="space-y-1">
                                    <p className="text-[8px] font-sans uppercase text-white/30 tracking-widest">Email</p>
                                    <p className="text-sm font-sans">{selectedUser.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[8px] font-sans uppercase text-white/30 tracking-widest">Phone</p>
                                    <p className="text-sm font-sans">{selectedUser.phone || 'Not Provided'}</p>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <div className="space-y-1">
                                        <p className="text-[8px] font-sans uppercase text-white/30 tracking-widest">Status</p>
                                        <p className={`text-xs font-sans font-bold ${selectedUser.status === 'ACTIVE' ? 'text-green-400' : 'text-red-400'}`}>{selectedUser.status}</p>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <p className="text-[8px] font-sans uppercase text-white/30 tracking-widest">Member Since</p>
                                        <p className="text-xs font-sans">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                            <h3 className="text-sm font-semibold text-white/40">Saved Addresses</h3>
                            <div className="space-y-4">
                                {selectedUser.addresses?.map((addr: any) => (
                                    <div key={addr.id} className="text-[11px] space-y-1 p-3 bg-white/5 border border-white/5 rounded-md">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-black uppercase tracking-widest text-[8px] py-0.5 px-1 bg-white/10">{addr.label}</span>
                                            {addr.isDefault && <span className="text-[7px] text-[#F27D26] font-black uppercase tracking-tighter">Default</span>}
                                        </div>
                                        <p className="opacity-80 leading-relaxed font-sans">{addr.line1}, {addr.line2 && addr.line2 + ","} {addr.city}, {addr.state} {addr.pincode}</p>
                                    </div>
                                ))}
                                {(!selectedUser.addresses || selectedUser.addresses.length === 0) && <p className="text-[10px] font-sans opacity-20 italic">No addresses saved.</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 space-y-8">
                        <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                            <h3 className="text-sm font-semibold text-blue-400">Order History</h3>
                            <div className="space-y-3">
                                {selectedUser.orders?.map((order: any) => (
                                    <div key={order.id} className="flex items-center justify-between p-4 bg-[#27272a] rounded-t-xl border border-white/5 hover:border-blue-500/30 transition-all text-sm">
                                        <div className="space-y-1">
                                            <p className="font-black text-[#F27D26]">{order.orderNumber}</p>
                                            <p className="opacity-40">{new Date(order.createdAt).toLocaleDateString()} — {order.items?.length} items</p>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <p className="font-black">₹{Number(order.total).toLocaleString()}</p>
                                            <p className={`text-xs font-medium px-2.5 py-1 rounded-md ${ORDER_STATUS_COLOR[order.status] || 'text-white'}`}>{order.status}</p>
                                        </div>
                                    </div>
                                ))}
                                {(!selectedUser.orders || selectedUser.orders.length === 0) && <div className="py-10 text-center opacity-20 font-sans text-xs">No order history found.</div>}
                            </div>
                        </div>
                        <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                            <h3 className="text-sm font-semibold text-amber-400">Help Tickets</h3>
                            <div className="space-y-3">
                                {selectedUser.tickets?.map((ticket: any) => {
                                    const cfg = TICKET_STATUS[ticket.status] || TICKET_STATUS.OPEN;
                                    return (
                                        <div key={ticket.id} className="flex items-center gap-4 p-4 bg-[#27272a] rounded-t-xl border border-white/5 text-sm">
                                            <span className={`px-2 py-0.5 border rounded-md ${cfg.color} text-xs font-medium px-2.5 py-1 rounded-md whitespace-nowrap`}>{cfg.label}</span>
                                            <span className="opacity-80 flex-1 truncate">{ticket.subject}</span>
                                            <span className="opacity-30">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    );
                                })}
                                {(!selectedUser.tickets || selectedUser.tickets.length === 0) && <div className="py-10 text-center opacity-20 font-sans text-xs">No support tickets found.</div>}
                            </div>
                        </div>
                        <div className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-8 space-y-6">
                            <h3 className="text-sm font-semibold text-green-400">Reviews</h3>
                            <div className="space-y-4">
                                {selectedUser.reviews?.map((review: any) => (
                                    <div key={review.id} className="p-4 bg-[#27272a] rounded-t-xl border border-white/5 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-sm opacity-80">{review.product?.name}</p>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < review.rating ? 'bg-[#F27D26]' : 'bg-white/10'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        {review.body && <p className="text-xs font-sans opacity-60 leading-relaxed">"{review.body}"</p>}
                                        <p className="text-[8px] font-sans opacity-20 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    </div>
                                ))}
                                {(!selectedUser.reviews || selectedUser.reviews.length === 0) && <div className="py-10 text-center opacity-20 font-sans text-xs">No reviews given.</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-4">
                <div className="relative w-96">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <input
                        type="text" placeholder="Search users by name or email..."
                        value={query} onChange={e => setQuery(e.target.value)}
                        className="w-full bg-[#27272a] border border-white/5 rounded-lg pl-12 pr-4 py-3 text-sm uppercase tracking-widest focus:outline-none focus:border-[#F27D26] transition-all"
                    />
                </div>
                <button onClick={reload} className="p-3 border border-white/10 hover:bg-white/5 rounded-lg transition-all text-white/40">
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
            </div>
            {loading ? <AdminSpinner /> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((u: any) => (
                        <div key={u.id} onClick={() => fetchUserDetails(u.id)}
                            className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-6 space-y-4 hover:border-[#F27D26]/40 transition-all relative group cursor-pointer active:scale-95">
                            {detailsLoading && <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10"><RefreshCw size={16} className="animate-spin" /></div>}
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 bg-[#27272a] border border-white/5 rounded-lg flex items-center justify-center rounded-md group-hover:bg-[#F27D26]/10 group-hover:border-[#F27D26]/40 transition-all">
                                    <UserCircle size={20} className="text-white/20 group-hover:text-[#F27D26]" />
                                </div>
                                <span className={`text-[7px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${u.role?.name === 'super_admin' ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-white/40'}`}>
                                    {u.role?.name || 'Customer'}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-medium text-sm text-white/90 font-black text-lg">{u.firstName} {u.lastName}</h3>
                                <p className="text-sm text-white/30 uppercase tracking-widest truncate">{u.email}</p>
                            </div>
                            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-[6px] font-sans uppercase text-white/20">Joined</span>
                                    <span className="text-[8px] font-sans">{new Date(u.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex flex-col ml-auto">
                                    <span className="text-[6px] font-sans uppercase text-white/20 text-right">Status</span>
                                    <span className={`text-[8px] font-sans text-right ${u.status === 'ACTIVE' ? 'text-green-400' : 'text-red-400'}`}>{u.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Main Admin Page ──────────────────────────────────────────────────
function AdminContent() {
    const [active, setActive] = useState("overview");
    const { tickets } = useTickets();
    const { orders } = useOrders();
    const { users } = useUsers();

    return (
        <div className="min-h-screen bg-[#09090b] text-bg flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-[#09090b] flex flex-col pt-24 pb-8 px-4 sticky top-0 h-screen shrink-0 overflow-y-auto">
                <div className="mb-10 px-2">
                    <span className="font-sans text-xs font-semibold text-white/40 tracking-wider uppercase">Ention Admin</span>
                    <p className="text-lg font-semibold tracking-tight text-white mt-1">CRM Dashboard</p>
                </div>
                <nav className="space-y-1 flex-1">
                    {NAV.map(n => (
                        <button key={n.id} onClick={() => setActive(n.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all rounded-md ${active === n.id
                                ? "bg-[#F27D26] text-white shadow-xl shadow-[#F27D26]/10"
                                : "hover:bg-white/5 text-white/50 hover:text-white"}`}>
                            <n.icon size={15} />
                            <span className="text-sm font-medium">{n.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 pt-24 pb-16 px-10 overflow-y-auto h-screen">
                <BlurFadeIn delay={0.1}>
                    <div className="mb-10 space-y-1">
                        <span className="text-xs uppercase tracking-[0.4em] text-[#F27D26] font-black">
                            {NAV.find(n => n.id === active)?.label}
                        </span>
                        <h1 className="text-3xl font-bold tracking-tight text-white/90">
                            {PANEL_TITLES[active] || "Dashboard"}
                        </h1>
                    </div>

                    {active === "overview"     && <OverviewPanel tickets={tickets} orders={orders} users={users} />}
                    {active === "analytics"    && <AnalyticsPanel tickets={tickets} orders={orders} users={users} />}
                    {active === "products"     && <ProductsPanel />}
                    {active === "inventory"    && <InventoryPanel />}
                    {active === "orders"       && <OrdersPanel />}
                    {active === "transactions" && <TransactionsPanel />}
                    {active === "tickets"      && <TicketsPanel />}
                    {active === "leads"        && <LeadsPanel />}
                    {active === "users"        && <UsersPanel />}
                    {active === "reviews"      && <ReviewsPanel />}
                    {active === "coupons"      && <CouponsPanel />}
                    {active === "settings"     && <SettingsPanel />}
                </BlurFadeIn>
            </main>
        </div>
    );
}

export default function AdminPage() {
    return (
        <AuthGuard requireAdmin>
            <AdminContent />
        </AuthGuard>
    );
}
