'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle2, AlertCircle, Send, Crown, Award, Globe2, Users } from 'lucide-react';
import { COMPANY, COUNTRIES, SERVICES, STATS } from '@/data/site';

const STORAGE_KEY = 'veridian_welcome_seen';
const AUTO_OPEN_DELAY_MS = 2500;

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', country: '', branch: '', message: ''
  });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  // Auto-open on first visit (per session)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll + ESC to close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', msg: '' });
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        destination: form.country || form.service || 'General enquiry',
        message: [
          form.service && `Service: ${form.service}`,
          form.branch && `Preferred branch: ${form.branch}`,
          form.message
        ].filter(Boolean).join('\n')
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      setStatus({ state: 'success', msg: 'Thank you! Our team will contact you within 24 hours.' });
      setForm({ name: '', email: '', phone: '', service: '', country: '', branch: '', message: '' });
      setTimeout(close, 2200);
    } catch (err) {
      setStatus({ state: 'error', msg: err.message || 'Something went wrong. Please try again.' });
    }
  };

  if (!open) return null;

  const highlights = [
    { Icon: Users,  value: STATS[0].value, label: STATS[0].label },
    { Icon: Award,  value: STATS[1].value, label: STATS[1].label },
    { Icon: Globe2, value: STATS[2].value, label: STATS[2].label },
    { Icon: Crown,  value: STATS[3].value, label: STATS[3].label }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-popup-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in"
    >
      <div
        className="absolute inset-0 bg-brand-950/70 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl bg-white grid md:grid-cols-2">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-brand-900 grid place-items-center shadow-md transition"
        >
          <X size={20} />
        </button>

        {/* Left — Why Choose Us */}
        <div className="relative overflow-hidden bg-green-gradient text-white p-8 sm:p-10 hidden md:flex flex-col justify-between min-h-[560px]">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-gold-400/15 blur-3xl" />

          <div className="relative">
            <span className="eyebrow !text-gold-300 mb-3">Veridian · Dubai</span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.05] mb-3">
              Why <span className="italic text-gold-shimmer">Choose Us</span>
            </h2>
            <p className="text-white/80 font-light max-w-md">
              {COMPANY.tagline}
            </p>
          </div>

          <div className="relative grid grid-cols-2 gap-4 my-8">
            {highlights.map(({ Icon, value, label }) => (
              <div
                key={label}
                className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-4"
              >
                <Icon size={22} className="text-gold-400 mb-2" />
                <div className="font-display text-2xl lg:text-3xl font-semibold leading-none">
                  {value}
                </div>
                <div className="text-xs text-white/75 mt-1.5">{label}</div>
              </div>
            ))}
          </div>

          <div className="relative text-xs text-white/65">
            ICCRC & MARA-affiliated experts · 500+ universities · 30+ countries
          </div>
        </div>

        {/* Right — Form */}
        <div className="p-7 sm:p-10">
          <h3 id="welcome-popup-title" className="font-display text-3xl sm:text-4xl font-semibold text-brand-900 mb-1">
            Talk with our <span className="italic text-gold-600">Experts</span>
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            Free 1-on-1 consultation. We'll respond within 24 hours.
          </p>

          <form onSubmit={onSubmit} className="space-y-3.5">
            <input
              required name="name" value={form.name} onChange={onChange}
              placeholder="Name *"
              className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-cream/40"
            />
            <input
              required type="email" name="email" value={form.email} onChange={onChange}
              placeholder="Email Address *"
              className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-cream/40"
            />
            <input
              required type="tel" name="phone" value={form.phone} onChange={onChange}
              placeholder="Phone Number * (e.g. +971 50 123 4567)"
              className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-cream/40"
            />
            <select
              required name="service" value={form.service} onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition text-slate-700 bg-cream/40"
            >
              <option value="">Preferred Service *</option>
              {SERVICES.map((s) => (
                <option key={s.title} value={s.title}>{s.title}</option>
              ))}
            </select>
            <select
              name="country" value={form.country} onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition text-slate-700 bg-cream/40"
            >
              <option value="">Preferred Country to Migrate</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.name}>{c.name}</option>
              ))}
            </select>
            <input
              name="branch" value={form.branch} onChange={onChange}
              placeholder="Preferred Branch to Connect"
              className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-cream/40"
            />

            <button
              type="submit"
              disabled={status.state === 'loading'}
              className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status.state === 'loading'
                ? 'Submitting…'
                : <>Get Expert Advice <Send size={16} /></>
              }
            </button>

            {status.state === 'success' && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-brand-50 text-brand-800 text-sm">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" /> <span>{status.msg}</span>
              </div>
            )}
            {status.state === 'error' && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
                <AlertCircle size={18} className="shrink-0 mt-0.5" /> <span>{status.msg}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
