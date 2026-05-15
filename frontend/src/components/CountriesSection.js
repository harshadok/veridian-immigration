import { COUNTRIES } from '@/data/site';
import { ArrowRight } from 'lucide-react';

export default function CountriesSection() {
  return (
    <section id="countries" className="py-28 bg-brand-950 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-700/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gold-500/15 blur-3xl" />

      <div className="container-x relative">
        <div className="max-w-3xl mx-auto text-center mb-16 text-white">
          <span className="eyebrow mx-auto !text-gold-400">Top Destinations</span>
          <h2 className="text-4xl md:text-6xl font-display font-semibold mb-4 leading-tight">
            Where Will Your <span className="italic text-gold-shimmer">Journey</span> Take You?
          </h2>
          <p className="text-white/70 text-lg font-light mt-4">
            Choose from 30+ countries with world-class education, residency, and career opportunities.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COUNTRIES.map((c) => (
            <a
              key={c.code}
              href="#contact"
              className="country-card group relative rounded-3xl overflow-hidden bg-brand-900 block h-80 border border-white/10"
            >
              <img
                src={c.image}
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/70 to-transparent" />

              {/* Flag */}
              <div className="absolute top-5 right-5 w-12 h-9 rounded-md overflow-hidden ring-2 ring-gold-400/50 shadow-xl">
                <img src={c.flag} alt={`${c.name} flag`} className="w-full h-full object-cover" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="font-display text-3xl font-semibold mb-1 group-hover:text-gold-400 transition">
                  {c.name}
                </h3>
                <p className="text-sm text-white/80 mb-3 line-clamp-2 font-light">{c.blurb}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold-400">
                  Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

              {/* Top gold accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </div>

        <div className="text-center mt-14">
          <a href="#contact" className="btn-gold">
            View All Destinations <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
