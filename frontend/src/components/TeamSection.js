import { Linkedin } from 'lucide-react';
import { TEAM } from '@/data/site';

export default function TeamSection() {
  return (
    <section id="team" className="py-16 bg-white relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-50 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gold-50 blur-3xl" />

      <div className="container-x relative">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="eyebrow">Meet The Team</span>
          <h2 className="section-title mb-4">
            The People Behind <span className="italic text-gold-600">Veridian</span>
          </h2>
          <p className="text-slate-600 font-light">
            A small, focused team in Dubai dedicated to giving every client the personal attention they deserve.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((m) => (
            <article
              key={m.name}
              className="rounded-3xl bg-cream/50 border border-brand-100 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-gold-400/30 shadow-lg">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl font-semibold text-brand-900 text-center mb-1">
                {m.name}
              </h3>
              <div className="text-xs text-gold-600 font-semibold tracking-widest uppercase text-center mb-3">
                {m.role}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed text-center mb-4">
                {m.bio}
              </p>
              {m.linkedin && m.linkedin !== '#' && (
                <div className="flex justify-center">
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on LinkedIn`}
                    className="w-10 h-10 rounded-full bg-brand-900 hover:bg-gold-500 hover:text-brand-900 text-white grid place-items-center transition"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
