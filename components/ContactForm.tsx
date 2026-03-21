'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';

interface ContactFormProps {
    className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: 'Partner',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        toast.dismiss();
        const toastId = toast.loading('Sending your message...', { theme: 'colored' });

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://ention-backend.onrender.com'}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject: `Collaboration Inquiry - ${formData.interest} (${formData.name})`,
                    message: `
                        <h3>Collaboration Request</h3>
                        <p><b>Name:</b> ${formData.name}</p>
                        <p><b>Email:</b> ${formData.email}</p>
                        <p><b>Phone:</b> ${formData.phone}</p>
                        <p><b>Interest:</b> ${formData.interest}</p>
                        <p><b>Message:</b> ${formData.message}</p>
                    `
                })
            });

            if (res.ok) {
                toast.update(toastId, {
                    render: "Thank you! We've received your inquiry and will get back to you soon.",
                    type: 'success',
                    isLoading: false,
                    autoClose: 5000
                });
                setFormData({ name: '', email: '', phone: '', interest: 'Partner', message: '' });
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            toast.update(toastId, {
                render: "Something went wrong. Please try again or email us directly.",
                type: 'error',
                isLoading: false,
                autoClose: 5000
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn("space-y-4 p-6 bg-white rounded-2xl shadow-xl", className)}>
            <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Full Name</label>
                <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0FAFCA] transition-all text-gray-900 font-bold"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Email</label>
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0FAFCA] transition-all text-gray-900 font-bold"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Phone</label>
                    <input
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0FAFCA] transition-all text-gray-900 font-bold"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Interest</label>
                <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0FAFCA] transition-all text-gray-900 font-bold appearance-none"
                >
                    <option value="Partner">Technology Partner</option>
                    <option value="Investor">Investor</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Message</label>
                <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your proposal..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0FAFCA] transition-all text-gray-900 font-bold resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#0FAFCA] text-white font-black rounded-xl shadow-lg shadow-cyan-200 hover:bg-[#007e9e] transition-all transform active:scale-95 disabled:opacity-50 uppercase tracking-widest"
            >
                {isSubmitting ? 'Sending...' : 'Submit Proposal'}
            </button>
        </form>
    );
};

export default ContactForm;
