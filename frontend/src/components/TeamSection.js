import { Linkedin } from 'lucide-react';
import { TEAM } from '@/data/site';

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {TEAM.map((m) => (
            <article
              key={m.name}
              className="rounded-2xl bg-cream/50 border border-brand-100 p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full grid place-items-center bg-brand-700 ring-4 ring-gold-400/30 shadow-lg">
                <span className="font-display text-lg font-semibold tracking-wide text-gold-400">
                  {initials(m.name)}
                </span>
              </div>
              <h3 className="font-display text-base font-semibold text-brand-900 text-center mb-1">
                {m.name}
              </h3>
              <div className="text-[10px] text-gold-600 font-semibold tracking-widest uppercase text-center mb-2">
                {m.role}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed text-center mb-3">
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
