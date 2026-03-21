'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FormType = 'contact' | 'apply' | 'experience' | 'partnership';

interface UnifiedFormProps {
  type: FormType;
  title?: string;
  onSuccess?: () => void;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  company?: string;
  city?: string;
  jobTitle?: string;
  resumeLink?: string;
  field?: string;
}

export default function UnifiedForm({ type, title, onSuccess, className }: UnifiedFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '',
    city: '',
    jobTitle: '',
    resumeLink: '',
    field: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Determine endpoint based on type
    const endpoint = type === 'apply' ? '/api/applyjob' :
      type === 'experience' ? '/api/experience' :
        '/api/associate';

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        if (onSuccess) onSuccess();
        // Reset form after 2 seconds
        setTimeout(() => {
          setStatus('idle');
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            company: '',
            city: '',
            jobTitle: '',
            resumeLink: '',
            field: ''
          });
        }, 3000);
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMessage(data.error || 'Submission failed.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  const isDark = true; // Tailored for the Ention aesthetic

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      {title && <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-cyan-100">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-cyan-100">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-cyan-100">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="1234567890"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
              required
            />
          </div>
          {type === 'experience' || type === 'partnership' ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-cyan-100">Company</label>
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
              />
            </div>
          ) : type === 'apply' ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-cyan-100">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="Desired Role"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium text-cyan-100">City</label>
              <input
                type="text"
                name="city"
                placeholder="Mumbai"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
              />
            </div>
          )}
        </div>

        {type === 'apply' && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-cyan-100">Resume Link (Google Drive)</label>
            <input
              type="url"
              name="resumeLink"
              placeholder="https://drive.google.com/..."
              value={formData.resumeLink}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-cyan-100">
            {type === 'experience' ? 'Special Requirements' : 'Your Message'}
          </label>
          <textarea
            name="message"
            placeholder="How can we help you?"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98]",
            status === 'success' ? "bg-green-500" : "bg-cyan-500 hover:bg-cyan-600"
          )}
        >
          {status === 'loading' ? (
            <Loader2 className="animate-spin" />
          ) : status === 'success' ? (
            <>
              <CheckCircle2 size={20} />
              Sent Successfully!
            </>
          ) : (
            <>
              <Send size={18} />
              Submit
            </>
          )}
        </button>

        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-red-400 text-sm mt-4 p-3 bg-red-400/10 rounded-lg border border-red-400/20"
            >
              <AlertCircle size={16} />
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
