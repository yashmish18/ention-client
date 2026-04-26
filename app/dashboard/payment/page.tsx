"use client";

import React from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { CreditCard, ShieldCheck, Wallet, Info } from "lucide-react";

function PaymentPageContent() {
    return (
        <div className="max-w-3xl space-y-8">
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold text-gray-900">Payment Options</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your saved cards, UPI IDs, and digital wallets.</p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 flex gap-4 items-start">
                <div className="p-2 bg-white rounded-full text-blue-500 shadow-sm shrink-0">
                    <ShieldCheck size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-blue-900 text-sm italic uppercase tracking-tight">Secure Payments</h3>
                    <p className="text-xs text-blue-700/70 mt-1 leading-relaxed">
                        Ention uses industry-standard encryption to protect your payment details. We currently support all major Credit/Debit cards, UPI, and Netbanking via our secure payment partner.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 text-center space-y-4">
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <CreditCard className="text-gray-300" size={32} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-bold text-gray-400">No Saved Cards</h4>
                        <p className="text-xs text-gray-400">Save your cards for faster checkout.</p>
                    </div>
                    <button className="mt-2 text-sm font-bold text-blue-600 hover:underline">
                        Add a Card
                    </button>
                </div>

                <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 text-center space-y-4">
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Wallet className="text-gray-300" size={32} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-bold text-gray-400">Wallets & UPI</h4>
                        <p className="text-xs text-gray-400">Link your favorite wallets or UPI IDs.</p>
                    </div>
                    <button className="mt-2 text-sm font-bold text-blue-600 hover:underline">
                        Manage Wallets
                    </button>
                </div>
            </div>

            {/* Refund Info */}
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">
                <div className="flex items-center gap-2 font-bold text-gray-900">
                    <Info size={18} className="text-gray-400" />
                    Refund Policy
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Refunds for cancelled orders are processed back to the original payment method within 5-7 business days. 
                    If you haven't received your refund, please check with your bank or contact our support team.
                </p>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <AuthGuard>
            <PaymentPageContent />
        </AuthGuard>
    );
}
