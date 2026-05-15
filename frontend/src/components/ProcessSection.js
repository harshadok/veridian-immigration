import { PROCESS_STEPS } from '@/data/site';

export default function ProcessSection() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute -top-40 right-0 w-[400px] h-[400px] rounded-full bg-gold-50 blur-3xl" />

      <div className="container-x relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="eyebrow mx-auto">Our Process</span>
          <h2 className="section-title mb-4">
            A Clear Path to Your <span className="italic text-gold-600">Future</span>
          </h2>
          <p className="text-slate-600 text-lg font-light mt-4">
            From your first conversation with us to the moment you arrive in your destination — here's how we work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.n}
              className="group relative bg-gradient-to-br from-white to-cream/40 border border-brand-50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-brand-900/10 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-green-gradient grid place-items-center text-gold-300 font-display font-semibold text-lg ring-4 ring-cream group-hover:ring-gold-100 transition">
                  {step.n}
                </div>
                <h3 className="font-display text-2xl font-semibold text-brand-900 pt-3 group-hover:text-gold-600 transition">{step.title}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
