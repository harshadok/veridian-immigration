import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import CountriesSection from '@/components/CountriesSection';
import ProcessSection from '@/components/ProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import EnquiryForm from '@/components/EnquiryForm';
import { COMPANY } from '@/data/site';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <AboutSection />
      <ServicesSection />
      <CountriesSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      <section id="contact" className="py-24 bg-gradient-to-b from-white via-cream to-brand-50/40">
        <div className="container-x grid md:grid-cols-2 gap-12 items-start mb-12">
          <div>
            <span className="eyebrow">Get In Touch</span>
            <h2 className="section-title mb-6">
              Begin Your <span className="italic text-gold-600">Journey</span> Today
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8 font-light">
              Visit our Dubai office or speak with our certified consultants for honest, personalised advice — at no cost and no obligation.
            </p>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-full bg-brand-50 grid place-items-center text-brand-700 shrink-0">📍</span>
                <div>
                  <div className="font-semibold text-brand-900">Office Address</div>
                  <div className="text-sm text-slate-600">{COMPANY.address}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-full bg-brand-50 grid place-items-center text-brand-700 shrink-0">📞</span>
                <div>
                  <div className="font-semibold text-brand-900">Call Us</div>
                  <a href={`tel:${COMPANY.phoneLink}`} className="text-sm text-slate-600 hover:text-gold-600">{COMPANY.phone}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-full bg-brand-50 grid place-items-center text-brand-700 shrink-0">✉️</span>
                <div>
                  <div className="font-semibold text-brand-900">Email Us</div>
                  <a href={`mailto:${COMPANY.email}`} className="text-sm text-slate-600 hover:text-gold-600">{COMPANY.email}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-full bg-brand-50 grid place-items-center text-brand-700 shrink-0">🕒</span>
                <div>
                  <div className="font-semibold text-brand-900">Office Hours</div>
                  <div className="text-sm text-slate-600">{COMPANY.hours}</div>
                </div>
              </li>
            </ul>
          </div>
          <EnquiryForm />
        </div>

        <div className="container-x">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-brand-100">
            <iframe
              title="Veridian Immigration Services — Dubai office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(COMPANY.address)}&output=embed`}
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
