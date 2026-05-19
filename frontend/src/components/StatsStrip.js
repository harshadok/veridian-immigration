import { STATS } from '@/data/site';

export default function StatsStrip() {
  return (
    <section className="relative -mt-14 z-20 container-x">
      <div className="bg-white rounded-3xl shadow-2xl shadow-brand-900/10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-brand-50 overflow-hidden border-2 border-gold-400/20">
        {STATS.map((s) => (
          <div key={s.label} className="p-6 md:p-10 text-center group hover:bg-cream/50 transition">
            <div className="font-display text-4xl md:text-6xl font-semibold text-brand-900 group-hover:text-gold-600 transition">
              {s.value}
            </div>
            <div className="text-xs md:text-sm text-slate-500 mt-2 font-semibold tracking-widest uppercase">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
