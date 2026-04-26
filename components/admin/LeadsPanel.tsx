"use client";

import React, { useState, useEffect } from "react";
import { 
    Search, RefreshCw, UserPlus, GraduationCap, PhoneOutgoing, 
    Calendar, Mail, Phone, ExternalLink 
} from "lucide-react";
import { apiFetch, AdminSpinner, AdminEmpty, AdminError } from "./shared";

export default function LeadsPanel() {
    const [view, setView] = useState<"LEADS" | "APPLICATIONS" | "CALLBACKS">("LEADS");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const endpoint = view === "LEADS" ? "/support/admin/leads" : 
                            view === "APPLICATIONS" ? "/support/admin/applications" : 
                            "/support/admin/callbacks";
            const res = await apiFetch(endpoint);
            setData(res.leads || res.applications || res.callbacks || []);
        } catch (err: any) {
            setError(err.message || "Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [view]);

    const filtered = data.filter(item => {
        const q = search.toLowerCase();
        return (item.name?.toLowerCase().includes(q) || item.email?.toLowerCase().includes(q) || item.phone?.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q));
    });

    return (
        <div className="space-y-6">
            {/* Tabs & Search */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-end">
                <div className="flex gap-2 bg-[#18181b] p-1.5 rounded-xl border border-white/5">
                    {[
                        { id: "LEADS", label: "General Leads", icon: UserPlus },
                        { id: "APPLICATIONS", label: "Program Apps", icon: GraduationCap },
                        { id: "CALLBACKS", label: "Callback Requests", icon: PhoneOutgoing },
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

                <div className="flex gap-4 items-center w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search requests..."
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
                <AdminEmpty icon={UserPlus} message={`No ${view.toLowerCase()} found.`} />
            ) : (
                <div className="space-y-4">
                    {filtered.map(item => (
                        <div key={item.id} className="bg-[#18181b] border border-white/5 rounded-2xl p-6 hover:border-[#F27D26]/40 transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-mono uppercase tracking-[0.3em] bg-white/5 px-3 py-1 rounded-full">{new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Primary Info */}
                                <div className="space-y-4 lg:w-1/3">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold tracking-tight text-white/90">{item.name}</h3>
                                        {item.programName && <span className="text-[9px] font-black uppercase tracking-widest text-[#F27D26]">{item.programName}</span>}
                                        {item.source && <span className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-3">Source: {item.source}</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <a href={`mailto:${item.email}`} className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors">
                                            <Mail size={14} className="text-blue-400" /> {item.email}
                                        </a>
                                        <a href={`tel:${item.phone}`} className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors">
                                            <Phone size={14} className="text-green-400" /> {item.phone}
                                        </a>
                                    </div>
                                </div>

                                {/* Content / Dynamic Fields */}
                                <div className="flex-1 space-y-4 border-l border-white/5 pl-8">
                                    {item.description && (
                                        <div className="space-y-2">
                                            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Requirement Description</p>
                                            <p className="text-sm text-white/70 leading-relaxed font-sans">{item.description}</p>
                                        </div>
                                    )}

                                    {item.dynamicFields && Object.keys(item.dynamicFields).length > 0 && (
                                        <div className="space-y-4">
                                            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Application Details</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {Object.entries(item.dynamicFields).map(([key, value]: [string, any]) => (
                                                    <div key={key} className="p-3 bg-white/5 rounded-lg space-y-1">
                                                        <p className="text-[7px] font-black uppercase tracking-widest text-white/30">{key.replace(/([A-Z])/g, ' $1')}</p>
                                                        <p className="text-xs text-white/80">{String(value)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {view === "CALLBACKS" && (
                                        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Calendar size={16} className="text-amber-500" />
                                                <p className="text-sm font-medium text-amber-500">Preferred Callback: <span className="text-white">{item.preferredTime || "ASAP"}</span></p>
                                            </div>
                                            <button className="bg-amber-500 text-black px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-white transition-colors">Mark Call Sent</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
