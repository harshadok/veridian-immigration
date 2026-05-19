'use client';

import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      {/* Background — Dubai skyline */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920"
          alt="Dubai skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-grid opacity-25 mix-blend-overlay" />
      </div>

      {/* Floating decorative orbs */}
      <div className="absolute top-32 right-20 w-72 h-72 rounded-full bg-gold-500/25 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-brand-500/30 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container-x relative z-10 grid lg:grid-cols-12 gap-10 items-center py-20">
        <div className="lg:col-span-7 text-white">
          {/* Location badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/15 backdrop-blur border border-gold-400/30 text-sm font-medium mb-6 text-gold-200 animate-fade-up">
            <MapPin size={14} className="text-gold-400" />
            Based in Dubai · Serving the World
          </span>

          <h1
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-semibold leading-[1.02] mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            Your Journey.
            <br />
            Our <span className="text-gold-shimmer italic">Commitment</span>.
            <br />
            Your Future.
          </h1>

          <p
            className="text-lg md:text-xl text-white/85 max-w-2xl mb-8 leading-relaxed font-light animate-fade-up"
            style={{ animationDelay: '0.25s', opacity: 0 }}
          >
            Veridian Immigration Services is Dubai's trusted partner for visas, residency, study abroad, and global mobility — handled with honesty, expertise, and care from start to finish.
          </p>

          <div
            className="flex flex-wrap gap-4 mb-10 animate-fade-up"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            <a href="#contact" className="btn-gold">
              Book Free Consultation <ArrowRight size={18} />
            </a>
            <a href="#countries" className="btn-outline">
              Explore Destinations
            </a>
          </div>

          <div
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm animate-fade-up"
            style={{ animationDelay: '0.55s', opacity: 0 }}
          >
            {['98% Visa Approval Rate', '500+ Partner Universities', 'Certified Consultants'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-gold-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Side card */}
        <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
          <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 border-2 border-gold-400/30 relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gold-100/60" />

            <div className="relative">
              <span className="gold-divider mb-3 text-xs">Begin Here</span>
              <h3 className="font-display text-3xl font-semibold text-brand-900 mb-2">
                Free Profile Assessment
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Get a personalised plan in 24 hours — no obligations.
              </p>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-cream/50"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition bg-cream/50"
                />
                <select className="w-full px-4 py-3 rounded-xl border border-brand-100 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition text-slate-600 bg-cream/50">
                  <option>Interested In</option>
                  <option>Study Abroad</option>
                  <option>Permanent Residency</option>
                  <option>Work Permit</option>
                  <option>Visa Assistance</option>
                  <option>IELTS / PTE Coaching</option>
                  <option>Family Sponsorship</option>
                </select>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="btn-primary w-full"
                >
                  Get Started <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
