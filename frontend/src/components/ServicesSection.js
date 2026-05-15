import { Crown, GraduationCap, Plane, Languages, Briefcase, Home, Building2, Users, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@/data/site';

const ICONS = { Crown, GraduationCap, Plane, Languages, Briefcase, Home, Building2, Users };

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 bg-gradient-to-b from-cream/40 to-white relative">
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="eyebrow mx-auto">What We Do</span>
          <h2 className="section-title mb-4">
            Complete <span className="italic text-gold-600">Immigration</span> Solutions
          </h2>
          <p className="text-slate-600 text-lg font-light mt-4">
            From your first consultation to landing in your destination country — every service you need, under one trusted roof.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <div
                key={s.title}
                className="group relative bg-white border border-brand-50 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:shadow-brand-900/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                {/* Decorative number */}
                <div className="absolute top-3 right-4 font-display text-6xl font-semibold text-cream group-hover:text-gold-100 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="relative w-14 h-14 rounded-2xl bg-green-gradient grid place-items-center text-gold-300 mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Icon size={26} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-brand-900 mb-3 relative">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed relative text-sm">{s.desc}</p>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:text-gold-600 transition relative"
                >
                  Learn more <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                {/* Bottom gold accent on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
