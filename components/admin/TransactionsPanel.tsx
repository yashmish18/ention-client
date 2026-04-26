"use client";

import React, { useState } from "react";
import { Search, RefreshCw, CreditCard } from "lucide-react";
import { useOrders, apiFetch, PAYMENT_STATUS_COLOR, ORDER_STATUS_COLOR, AdminSpinner, AdminEmpty, AdminError } from "./shared";

export default function TransactionsPanel() {
    const { orders, loading, error, reload } = useOrders();
    const [query, setQuery] = useState("");
    const [refunding, setRefunding] = useState<string | null>(null);
    const [refundAmount, setRefundAmount] = useState<Record<string, string>>({});

    // Extract transactions from orders
    const transactions = orders.filter(o => o.payment).map(o => ({
        ...o.payment,
        orderNumber: o.orderNumber,
        orderStatus: o.status,
        orderTotal: o.total,
        customerEmail: o.user?.email,
        customerName: `${o.user?.firstName || ''} ${o.user?.lastName || ''}`.trim(),
    }));

    const filtered = transactions.filter(t =>
        t.orderNumber?.toLowerCase().includes(query.toLowerCase()) ||
        t.customerEmail?.toLowerCase().includes(query.toLowerCase()) ||
        t.razorpayPaymentId?.toLowerCase().includes(query.toLowerCase())
    );

    const handleRefund = async (transactionId: string, orderId: string) => {
        const amount = parseFloat(refundAmount[transactionId] || "0");
        if (!amount) return;
        setRefunding(transactionId);
        try {
            await apiFetch('/payments/admin/refund', {
                method: 'POST',
                body: JSON.stringify({ transactionId, amount, reason: "Admin initiated refund" }),
            });
            reload();
            setRefundAmount(prev => ({ ...prev, [transactionId]: "" }));
        } catch (e: any) {
            alert(`Refund failed: ${e.message}`);
        }
        finally { setRefunding(null); }
    };

    return (
        <div className="space-y-6">
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Transactions", value: transactions.length, color: "text-white" },
                    { label: "Paid", value: transactions.filter(t => t.status === 'PAID').length, color: "text-green-400" },
                    { label: "Pending", value: transactions.filter(t => t.status === 'PENDING').length, color: "text-amber-400" },
                    { label: "Refunded", value: transactions.filter(t => ['REFUNDED', 'PARTIALLY_REFUNDED'].includes(t.status)).length, color: "text-purple-400" },
                ].map((m, i) => (
                    <div key={i} className="bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-6 space-y-2">
                        <p className="text-xs font-medium text-white/50">{m.label}</p>
                        <p className={`text-2xl font-semibold tracking-tight ${m.color}`}>{m.value}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="flex justify-between items-center bg-[#18181b] border border-white/5 rounded-xl shadow-sm p-4">
                <div className="relative w-96">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <input
                        type="text" placeholder="Search by order #, email, or Razorpay ID..."
                        value={query} onChange={e => setQuery(e.target.value)}
                        className="w-full bg-[#27272a] border border-white/5 rounded-lg pl-12 pr-4 py-3 text-sm uppercase tracking-widest focus:outline-none focus:border-[#F27D26] transition-all"
                    />
                </div>
                <button onClick={reload} className="p-3 border border-white/10 hover:bg-white/5 rounded-lg transition-all text-white/40">
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {error && <AdminError message={error} />}

            {loading ? <AdminSpinner /> : filtered.length === 0 ? (
                <AdminEmpty icon={CreditCard} message="No transactions found." />
            ) : (
                <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-[#27272a] rounded-t-xl border border-white/5 text-white/30">
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Order</span>
                        <span className="col-span-2 text-xs font-semibold text-white/50 uppercase tracking-wider">Customer</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Amount</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Method</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Payment</span>
                        <span className="col-span-2 text-xs font-semibold text-white/50 uppercase tracking-wider">Razorpay ID</span>
                        <span className="col-span-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Date</span>
                        <span className="col-span-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Refund</span>
                    </div>

                    {filtered.map(txn => (
                        <div key={txn.id} className="grid grid-cols-12 gap-3 px-5 py-4 bg-[#18181b] rounded-xl border border-white/5 hover:border-[#F27D26]/40 transition-all items-center">
                            <span className="col-span-1 text-sm text-[#F27D26] font-black truncate">{txn.orderNumber?.slice(-8)}</span>
                            <div className="col-span-2 space-y-0.5">
                                <p className="text-sm truncate">{txn.customerName}</p>
                                <p className="text-xs opacity-30 truncate">{txn.customerEmail}</p>
                            </div>
                            <span className="col-span-1 text-sm font-bold">₹{Number(txn.amount).toLocaleString()}</span>
                            <span className="col-span-1 text-xs opacity-50 uppercase">{txn.method}</span>
                            <span className="col-span-1">
                                <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md ${PAYMENT_STATUS_COLOR[txn.status] || 'text-white/40'}`}>
                                    {txn.status}
                                </span>
                            </span>
                            <span className="col-span-2 text-xs opacity-30 truncate">{txn.razorpayPaymentId || '—'}</span>
                            <span className="col-span-1 text-xs opacity-30">{txn.paidAt ? new Date(txn.paidAt).toLocaleDateString() : '—'}</span>
                            <div className="col-span-3 flex gap-2">
                                {txn.status === 'PAID' && (
                                    <>
                                        <input
                                            type="number" placeholder="₹ Amount"
                                            value={refundAmount[txn.id] || ""}
                                            onChange={e => setRefundAmount(prev => ({ ...prev, [txn.id]: e.target.value }))}
                                            className="w-24 bg-[#27272a] border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                                        />
                                        <button
                                            disabled={refunding === txn.id}
                                            onClick={() => handleRefund(txn.id, txn.orderId)}
                                            className="px-4 py-2 bg-purple-600 text-white text-xs font-medium px-2.5 py-1 rounded-md tracking-widest hover:bg-purple-500 transition-all disabled:opacity-30"
                                        >
                                            {refunding === txn.id ? '...' : 'Refund'}
                                        </button>
                                    </>
                                )}
                                {txn.status === 'REFUNDED' && <span className="text-[8px] font-sans text-purple-400 uppercase">Refunded</span>}
                                {txn.status === 'PENDING' && <span className="text-[8px] font-sans text-amber-400 uppercase">Awaiting Payment</span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
