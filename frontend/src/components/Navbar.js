'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { COUNTRIES, COMPANY } from '@/data/site';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [destOpen, setDestOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Use solid bg when scrolled OR on light hero (we'll use light navbar text always since hero is dark)
  const isLight = scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur shadow-md py-2'
          : 'bg-gradient-to-b from-brand-950/40 to-transparent py-3'
      }`}
    >
      <div className="container-x flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className={`relative w-14 h-14 rounded-xl overflow-hidden transition-all ${
            scrolled ? 'bg-transparent' : 'bg-white/95 p-1 shadow-lg'
          }`}>
            <Image
              src="/logo.jpeg"
              alt="Veridian Immigration Services"
              fill
              sizes="56px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className={`font-display font-semibold text-xl tracking-wide ${
              isLight ? 'text-brand-900' : 'text-white'
            }`}>
              VERIDIAN
            </span>
            <span className={`text-[9px] tracking-[0.2em] uppercase font-semibold ${
              isLight ? 'text-gold-600' : 'text-gold-300'
            }`}>
              Immigration Services
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { label: 'Home', href: '#home' },
            { label: 'About', href: '#about' },
            { label: 'Services', href: '#services' }
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-semibold hover:text-gold-500 transition ${
                isLight ? 'text-brand-900' : 'text-white'
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* Destinations dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDestOpen(true)}
            onMouseLeave={() => setDestOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-sm font-semibold hover:text-gold-500 transition ${
                isLight ? 'text-brand-900' : 'text-white'
              }`}
            >
              Destinations <ChevronDown size={16} />
            </button>
            {destOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] bg-white rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-2 border border-brand-50">
                {COUNTRIES.map((c) => (
                  <a
                    key={c.code}
                    href="#countries"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50 transition group"
                  >
                    <img src={c.flag} alt={c.name} className="w-7 h-5 object-cover rounded shadow-sm" />
                    <span className="text-sm font-medium text-brand-900 group-hover:text-brand-700">{c.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="#contact"
            className={`text-sm font-semibold hover:text-gold-500 transition ${
              isLight ? 'text-brand-900' : 'text-white'
            }`}
          >
            Contact
          </a>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href={`tel:${COMPANY.phoneLink}`} className="flex items-center gap-2 text-sm font-semibold">
            <span className={`p-2 rounded-full ${isLight ? 'bg-brand-50 text-brand-700' : 'bg-white/15 text-gold-300'}`}>
              <Phone size={16} />
            </span>
            <span className={isLight ? 'text-brand-900' : 'text-white'}>{COMPANY.phone}</span>
          </a>
          <a href="#contact" className="btn-gold !py-2.5 !px-5 text-sm">
            Free Consultation
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 rounded-lg ${isLight ? 'text-brand-900' : 'text-white'}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white shadow-xl border-t border-brand-50">
          <div className="container-x py-4 flex flex-col gap-3">
            {['Home', 'About', 'Services', 'Countries', 'Contact'].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="py-2 font-semibold text-brand-900 border-b border-brand-50"
              >
                {label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-gold mt-2">
              Free Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
