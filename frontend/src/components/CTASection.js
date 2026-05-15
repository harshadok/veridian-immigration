import { ArrowRight, Phone } from 'lucide-react';
import { COMPANY } from '@/data/site';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-green-gradient" />
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold-500/25 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold-400/15 blur-3xl" />

      <div className="container-x relative grid lg:grid-cols-2 gap-10 items-center text-white">
        <div>
          <span className="eyebrow !text-gold-300 mb-4">Take The First Step</span>
          <h2 className="text-4xl md:text-6xl font-display font-semibold mb-4 leading-[1.05]">
            Ready to Begin Your{' '}
            <span className="italic text-gold-shimmer">Global Journey?</span>
          </h2>
          <p className="text-white/80 text-lg max-w-xl font-light mt-4">
            Schedule a free consultation today. Our certified consultants will craft a personalised roadmap for your immigration goals.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
          <a href="#contact" className="btn-gold">
            Free Consultation <ArrowRight size={18} />
          </a>
          <a href={`tel:${COMPANY.phoneLink}`} className="btn-outline">
            <Phone size={18} /> Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
