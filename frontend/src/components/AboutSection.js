import { Award, Users, Globe2, ShieldCheck } from 'lucide-react';

const features = [
  { icon: Award,        title: 'UAE-Licensed',          desc: 'Authorised immigration consultancy in Dubai.' },
  { icon: Globe2,       title: 'Worldwide Network',     desc: '500+ universities across our partner programmes.' },
  { icon: ShieldCheck,  title: 'Transparent Process',   desc: 'No hidden fees. Honest guidance, always.' },
  { icon: Users,        title: 'Personal Attention',    desc: 'Every case handled with care, start to finish.' }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-50 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gold-50 blur-3xl" />

      <div className="container-x relative grid lg:grid-cols-2 gap-16 items-center">
        {/* Image collage */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600"
                alt="Consultation"
                className="rounded-3xl shadow-xl h-64 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600"
                alt="Clients"
                className="rounded-3xl shadow-xl h-48 w-full object-cover"
              />
            </div>
            <div className="space-y-4 pt-12">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
                alt="Team"
                className="rounded-3xl shadow-xl h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600"
                alt="Graduation"
                className="rounded-3xl shadow-xl h-64 w-full object-cover"
              />
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-5 flex items-center gap-4 border-2 border-gold-400/30">
            <div className="w-16 h-16 rounded-full bg-gold-gradient grid place-items-center text-brand-900 font-display font-bold text-2xl shadow-inner">
              3+
            </div>
            <div>
              <div className="font-display text-xl font-semibold text-brand-900">Years of</div>
              <div className="text-sm text-gold-600 font-semibold tracking-widest uppercase">Service</div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <span className="eyebrow">About Veridian</span>
          <h2 className="section-title mb-6">
            Crafting Global Futures,
            <br />
            <span className="italic text-gold-600">One Family at a Time</span>
          </h2>
          <div className="ornament mb-6">
            <span className="ornament-diamond"></span>
          </div>
          <p className="text-slate-600 text-lg leading-relaxed mb-4 font-light">
            Veridian Immigration Services is a Dubai-based consultancy founded on a simple principle: honest, transparent guidance for every client. We're a young firm with a focused team, dedicated to walking every step of your international journey with you.
          </p>
          <p className="text-slate-600 leading-relaxed mb-10 font-light">
            From studying abroad to work permits, permanent residency to family sponsorship — we handle each case with the personal attention that bigger consultancies can't match.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 p-4 rounded-2xl hover:bg-cream/60 transition">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-green-gradient grid place-items-center text-gold-300">
                  <f.icon size={22} />
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold text-brand-900 mb-1">{f.title}</h4>
                  <p className="text-sm text-slate-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
