"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    Search, RefreshCw, UserPlus, GraduationCap, PhoneOutgoing,
    Calendar, Mail, Phone, ArrowLeft, Loader2,
    FileText, User, AlertCircle, CheckCircle2, XCircle, Clock,
    Paperclip, ExternalLink, ChevronDown
} from "lucide-react";
import { apiFetch, AdminSpinner, AdminEmpty, AdminError } from "./shared";
import { SOURCE_LABELS } from "@/lib/inquiry-sources";

// ── Types ─────────────────────────────────────────────────────────

type InquiryType = "LEAD" | "PROGRAM" | "CALLBACK";
type InquiryStatus = "NEW" | "REVIEWING" | "CONTACTED" | "RESOLVED" | "REJECTED";

const STATUS_COLORS: Record<InquiryStatus, string> = {
    NEW:       "bg-blue-500/10 text-blue-400 border-blue-500/20",
    REVIEWING: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    CONTACTED: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    RESOLVED:  "bg-green-500/10 text-green-400 border-green-500/20",
    REJECTED:  "bg-red-500/10 text-red-400 border-red-500/20",
};

const STATUS_OPTIONS: InquiryStatus[] = ["NEW", "REVIEWING", "CONTACTED", "RESOLVED", "REJECTED"];

// ── Detail View ────────────────────────────────────────────────────

function InquiryDetail({
    inquiry,
    onBack,
    onUpdate,
}: {
    inquiry: any;
    onBack: () => void;
    onUpdate: () => void;
}) {
    const [notes, setNotes] = useState(inquiry.notes || "");
    const [assignedTo, setAssignedTo] = useState(inquiry.assignedTo || "");
    const [status, setStatus] = useState<InquiryStatus>(inquiry.status || "NEW");
    const [saving, setSaving] = useState<string | null>(null);
    const [saveError, setSaveError] = useState<string | null>(null);

    const save = async (action: "status" | "assign" | "notes") => {
        setSaving(action);
        setSaveError(null);
        try {
            if (action === "status") {
                await apiFetch(`/inquiries/admin/${inquiry.id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
            } else if (action === "assign") {
                await apiFetch(`/inquiries/admin/${inquiry.id}/assign`, { method: "PATCH", body: JSON.stringify({ assignedTo }) });
            } else {
                await apiFetch(`/inquiries/admin/${inquiry.id}/notes`, { method: "PATCH", body: JSON.stringify({ notes }) });
            }
            onUpdate();
        } catch (err: any) {
            setSaveError(err.message || "Save failed");
        } finally {
            setSaving(null);
        }
    };

    const sourceLabel = inquiry.source && SOURCE_LABELS[inquiry.source as keyof typeof SOURCE_LABELS]
        ? SOURCE_LABELS[inquiry.source as keyof typeof SOURCE_LABELS]
        : inquiry.source || "—";

    return (
        <div className="space-y-6">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors"
            >
                <ArrowLeft size={14} /> Back to list
            </button>

            <div className="bg-[#18181b] border border-white/5 rounded-2xl p-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 border rounded-full ${STATUS_COLORS[status]}`}>
                                {status}
                            </span>
                            <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 border border-white/10 px-3 py-1 rounded-full">
                                {inquiry.type}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mt-2">{inquiry.name}</h2>
                        {inquiry.programName && (
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#F27D26]">{inquiry.programName}</span>
                        )}
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-white/30 text-right space-y-1">
                        <div>ID: {inquiry.id}</div>
                        <div>{new Date(inquiry.createdAt).toLocaleString("en-IN")}</div>
                        <div>Source: {sourceLabel}</div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-6">
                    <a href={`mailto:${inquiry.email}`} className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                        <Mail size={14} className="text-blue-400 shrink-0" /> {inquiry.email}
                    </a>
                    <a href={`tel:${inquiry.phone}`} className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                        <Phone size={14} className="text-green-400 shrink-0" /> {inquiry.phone}
                    </a>
                    {inquiry.organization && (
                        <div className="flex items-center gap-3 text-sm text-white/60">
                            <User size={14} className="text-purple-400 shrink-0" /> {inquiry.organization}
                        </div>
                    )}
                    {inquiry.preferredTime && (
                        <div className="flex items-center gap-3 text-sm text-white/60">
                            <Calendar size={14} className="text-amber-400 shrink-0" /> {inquiry.preferredTime}
                        </div>
                    )}
                </div>

                {/* Description */}
                {inquiry.description && (
                    <div className="space-y-2 border-t border-white/5 pt-6">
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Description</p>
                        <p className="text-sm text-white/70 leading-relaxed font-sans">{inquiry.description}</p>
                    </div>
                )}

                {/* Dynamic Fields */}
                {inquiry.dynamicFields && Object.keys(inquiry.dynamicFields).length > 0 && (
                    <div className="space-y-4 border-t border-white/5 pt-6">
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Additional Details</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {Object.entries(inquiry.dynamicFields).map(([key, value]: [string, any]) => (
                                <div key={key} className="p-3 bg-white/5 rounded-xl space-y-1">
                                    <p className="text-[7px] font-black uppercase tracking-widest text-white/30">{key.replace(/([A-Z])/g, ' $1')}</p>
                                    <p className="text-xs text-white/80">{String(value)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Attachment */}
                {inquiry.attachmentUrl && (
                    <div className="border-t border-white/5 pt-6">
                        <a
                            href={inquiry.attachmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white transition-all"
                        >
                            <Paperclip size={14} className="text-[#F27D26]" />
                            View Attachment
                            <ExternalLink size={12} className="ml-auto text-white/30" />
                        </a>
                    </div>
                )}

                {/* Admin Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/5 pt-6">
                    {/* Status */}
                    <div className="space-y-3">
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Update Status</p>
                        <div className="relative">
                            <select
                                value={status}
                                onChange={e => setStatus(e.target.value as InquiryStatus)}
                                className="w-full bg-[#111] border border-white/10 px-4 py-3 text-xs text-white rounded-xl focus:outline-none focus:border-[#F27D26] appearance-none transition-colors"
                            >
                                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                        </div>
                        <button
                            onClick={() => save("status")}
                            disabled={saving === "status"}
                            className="w-full bg-[#F27D26] text-white py-2 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-[#d9631a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {saving === "status" ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
                            Save Status
                        </button>
                    </div>

                    {/* Assignment */}
                    <div className="space-y-3">
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Assign To</p>
                        <input
                            value={assignedTo}
                            onChange={e => setAssignedTo(e.target.value)}
                            placeholder="Team member name / email"
                            className="w-full bg-[#111] border border-white/10 px-4 py-3 text-xs text-white rounded-xl focus:outline-none focus:border-[#F27D26] transition-colors placeholder-white/20"
                        />
                        <button
                            onClick={() => save("assign")}
                            disabled={saving === "assign"}
                            className="w-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {saving === "assign" ? <Loader2 size={12} className="animate-spin" /> : <User size={12} />}
                            Assign
                        </button>
                    </div>

                    {/* Notes */}
                    <div className="space-y-3">
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Internal Notes</p>
                        <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Internal notes for the team..."
                            rows={3}
                            className="w-full bg-[#111] border border-white/10 px-4 py-3 text-xs text-white rounded-xl focus:outline-none focus:border-[#F27D26] transition-colors placeholder-white/20 resize-none"
                        />
                        <button
                            onClick={() => save("notes")}
                            disabled={saving === "notes"}
                            className="w-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {saving === "notes" ? <Loader2 size={12} className="animate-spin" /> : <FileText size={12} />}
                            Save Notes
                        </button>
                    </div>
                </div>

                {saveError && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
                        <AlertCircle size={14} /> {saveError}
                    </div>
                )}
            </div>
        </div>
    );
}

// ── List View ──────────────────────────────────────────────────────

export default function LeadsPanel() {
    const [view, setView] = useState<"LEAD" | "PROGRAM" | "CALLBACK">("LEAD");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<any | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const qs = new URLSearchParams({ type: view });
            if (statusFilter) qs.set("status", statusFilter);
            const res = await apiFetch(`/inquiries/admin?${qs.toString()}`);
            setData(res.data || res.inquiries || []);
        } catch (err: any) {
            setError(err.message || "Failed to fetch inquiries");
        } finally {
            setLoading(false);
        }
    }, [view, statusFilter]);

    useEffect(() => { fetchData(); }, [fetchData]);

    // Reset detail view when tab changes
    useEffect(() => { setSelected(null); }, [view]);

    const filtered = data.filter(item => {
        const q = search.toLowerCase();
        return (
            item.name?.toLowerCase().includes(q) ||
            item.email?.toLowerCase().includes(q) ||
            item.phone?.toLowerCase().includes(q) ||
            item.description?.toLowerCase().includes(q) ||
            item.organization?.toLowerCase().includes(q)
        );
    });

    if (selected) {
        return (
            <InquiryDetail
                inquiry={selected}
                onBack={() => setSelected(null)}
                onUpdate={() => { fetchData(); setSelected(null); }}
            />
        );
    }

    return (
        <div className="space-y-6">
            {/* Tabs, Filters & Search */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
                <div className="space-y-3">
                    <div className="flex gap-2 bg-[#18181b] p-1.5 rounded-xl border border-white/5">
                        {[
                            { id: "LEAD", label: "Sales Leads", icon: UserPlus },
                            { id: "PROGRAM", label: "Program Apps", icon: GraduationCap },
                            { id: "CALLBACK", label: "Callbacks", icon: PhoneOutgoing },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setView(tab.id as any)}
                                className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${view === tab.id ? "bg-[#F27D26] text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}
                            >
                                <tab.icon size={14} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Status filter pills */}
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setStatusFilter("")}
                            className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border transition-all ${!statusFilter ? "bg-white text-black border-white" : "border-white/10 text-white/40 hover:border-white/30"}`}
                        >
                            All
                        </button>
                        {STATUS_OPTIONS.map(s => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
                                className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border transition-all ${statusFilter === s ? STATUS_COLORS[s] : "border-white/10 text-white/40 hover:border-white/30"}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 items-center w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search name, email, phone..."
                            className="w-full bg-[#18181b] rounded-xl border border-white/10 pl-12 pr-4 py-3 text-sm uppercase tracking-widest focus:outline-none focus:border-[#F27D26] transition-colors text-white placeholder-white/30"
                        />
                    </div>
                    <button onClick={fetchData} className="p-3 border border-white/10 hover:border-[#F27D26] text-white/50 hover:text-[#F27D26] transition-all rounded-xl bg-[#18181b]">
                        <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {error && <AdminError message={error} />}

            {loading ? <AdminSpinner /> : filtered.length === 0 ? (
                <AdminEmpty icon={UserPlus} message={`No ${view.toLowerCase()} inquiries found.`} />
            ) : (
                <div className="space-y-4">
                    {filtered.map(item => {
                        const sourceLabel = item.source && SOURCE_LABELS[item.source as keyof typeof SOURCE_LABELS]
                            ? SOURCE_LABELS[item.source as keyof typeof SOURCE_LABELS]
                            : item.source;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setSelected(item)}
                                className="w-full text-left bg-[#18181b] border border-white/5 rounded-2xl p-6 hover:border-[#F27D26]/40 transition-all group overflow-hidden relative"
                            >
                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                    {item.attachmentUrl && <Paperclip size={12} className="text-[#F27D26] opacity-60" />}
                                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border rounded-full ${STATUS_COLORS[(item.status || "NEW") as InquiryStatus]}`}>
                                        {item.status || "NEW"}
                                    </span>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-8 pr-24">
                                    <div className="space-y-3 lg:w-1/3">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-bold tracking-tight text-white/90">{item.name}</h3>
                                            {item.programName && (
                                                <span className="text-[9px] font-black uppercase tracking-widest text-[#F27D26] block">{item.programName}</span>
                                            )}
                                            {sourceLabel && (
                                                <span className="text-[8px] font-mono uppercase tracking-widest text-white/20 block">{sourceLabel}</span>
                                            )}
                                            <span className="text-[8px] font-mono text-white/20">{new Date(item.createdAt).toLocaleDateString("en-IN")}</span>
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-xs text-white/50">
                                                <Mail size={12} className="text-blue-400 shrink-0" />
                                                <span className="truncate">{item.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-white/50">
                                                <Phone size={12} className="text-green-400 shrink-0" />
                                                {item.phone}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 border-l border-white/5 pl-8">
                                        {item.description && (
                                            <p className="text-sm text-white/50 leading-relaxed line-clamp-3">{item.description}</p>
                                        )}
                                        {view === "CALLBACK" && item.preferredTime && (
                                            <div className="flex items-center gap-2 text-sm text-amber-400 mt-2">
                                                <Calendar size={12} /> Preferred: {item.preferredTime}
                                            </div>
                                        )}
                                        {item.notes && (
                                            <div className="mt-3 flex items-start gap-2 text-[10px] text-white/30 font-mono">
                                                <FileText size={10} className="mt-0.5 shrink-0" />
                                                <span className="line-clamp-1">{item.notes}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
