import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY, COUNTRIES } from '@/data/site';

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white pt-20 pb-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-brand-700/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-16 h-16 bg-white/95 rounded-xl p-1 shadow-lg">
                <Image src="/logo.jpeg" alt="Veridian" fill sizes="64px" className="object-contain p-1" />
              </div>
              <div>
                <div className="font-display font-semibold text-2xl tracking-wide">VERIDIAN</div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-gold-400 font-semibold">
                  Immigration Services
                </div>
              </div>
            </div>
            <div className="gold-divider !text-gold-400 mb-5 text-[10px]">Dubai</div>
            <p className="text-white/70 leading-relaxed mb-6 max-w-sm font-light italic">
              "{COMPANY.tagline}"
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook,  href: COMPANY.social.facebook,  label: 'Facebook' },
                { Icon: Instagram, href: COMPANY.social.instagram, label: 'Instagram' },
                { Icon: Linkedin,  href: COMPANY.social.linkedin,  label: 'LinkedIn' },
                { Icon: Youtube,   href: COMPANY.social.youtube,   label: 'YouTube' }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Veridian on ${label}`}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold-500 hover:text-brand-950 grid place-items-center transition"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-xl mb-5 text-gold-400">Company</h4>
            <ul className="space-y-3 text-sm text-white/80">
              {['Home', 'About', 'Services', 'Contact'].map((x) => (
                <li key={x}>
                  <a href={`#${x.toLowerCase()}`} className="hover:text-gold-400 transition">
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-xl mb-5 text-gold-400">Destinations</h4>
            <ul className="grid grid-cols-2 gap-3 text-sm text-white/80">
              {COUNTRIES.slice(0, 8).map((c) => (
                <li key={c.code}>
                  <a href="#countries" className="hover:text-gold-400 transition">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-xl mb-5 text-gold-400">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex gap-3">
                <MapPin size={18} className="text-gold-400 shrink-0 mt-0.5" />
                {COMPANY.address}
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-gold-400 shrink-0 mt-0.5" />
                <a href={`tel:${COMPANY.phoneLink}`} className="hover:text-gold-400">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-gold-400 shrink-0 mt-0.5" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-gold-400">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-white/60">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All Rights Reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
