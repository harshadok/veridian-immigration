'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function EnquiryForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', destination: '', message: ''
  });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', msg: '' });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      setStatus({ state: 'success', msg: 'Thank you! Our team will contact you within 24 hours.' });
      setForm({ name: '', email: '', phone: '', destination: '', message: '' });
    } catch (err) {
      setStatus({ state: 'error', msg: err.message || 'Something went wrong. Please try again.' });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-3xl shadow-2xl shadow-brand-900/10 p-8 border-2 border-gold-400/20 space-y-4 relative overflow-hidden"
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gold-50" />
      <div className="relative">
        <span className="gold-divider mb-3 text-xs">Enquire Now</span>
        <h3 className="font-display text-3xl font-semibold text-brand-900 mb-2">Quick Enquiry</h3>
        <p className="text-sm text-slate-600 mb-6">
          Fill the form, we'll respond within 24 hours.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 relative">
        <input
          required name="name" value={form.name} onChange={onChange}
          placeholder="Full Name *"
          className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-cream/40"
        />
        <input
          required type="tel" name="phone" value={form.phone} onChange={onChange}
          placeholder="Phone Number *"
          className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-cream/40"
        />
      </div>

      <input
        required type="email" name="email" value={form.email} onChange={onChange}
        placeholder="Email Address *"
        className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-cream/40 relative"
      />

      <select
        required name="destination" value={form.destination} onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition text-slate-700 bg-cream/40 relative"
      >
        <option value="">Interested In *</option>
        <option>UAE Golden Visa</option>
        <option>Study Abroad</option>
        <option>Permanent Residency</option>
        <option>Work Permit</option>
        <option>Business Setup</option>
        <option>Family Sponsorship</option>
        <option>IELTS / PTE Coaching</option>
        <option>Other</option>
      </select>

      <textarea
        name="message" value={form.message} onChange={onChange} rows={4}
        placeholder="Tell us about your goals (optional)"
        className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition resize-none bg-cream/40 relative"
      />

      <button
        type="submit"
        disabled={status.state === 'loading'}
        className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed relative"
      >
        {status.state === 'loading' ? 'Submitting…' : <>Submit Enquiry <Send size={16} /></>}
      </button>

      {status.state === 'success' && (
        <div className="flex items-start gap-2 p-4 rounded-xl bg-brand-50 text-brand-800 text-sm relative">
          <CheckCircle2 size={18} className="shrink-0 mt-0.5" /> <span>{status.msg}</span>
        </div>
      )}
      {status.state === 'error' && (
        <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 text-red-700 text-sm relative">
          <AlertCircle size={18} className="shrink-0 mt-0.5" /> <span>{status.msg}</span>
        </div>
      )}
    </form>
  );
}
