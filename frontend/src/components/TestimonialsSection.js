'use client';

import { useState } from 'react';
import { TESTIMONIALS } from '@/data/site';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [i, setI] = useState(0);
  const next = () => setI((i + 1) % TESTIMONIALS.length);
  const prev = () => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const t = TESTIMONIALS[i];

  return (
    <section className="py-28 bg-gradient-to-b from-cream/40 to-white relative overflow-hidden">
      <div className="absolute top-20 -left-20 w-[300px] h-[300px] rounded-full bg-brand-50 blur-3xl" />

      <div className="container-x relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="eyebrow mx-auto">Testimonials</span>
          <h2 className="section-title mb-4">
            Stories From Our <span className="italic text-gold-600">Clients</span>
          </h2>
          <p className="text-slate-600 text-lg font-light mt-4">
            Real voices from individuals and families now thriving across the globe.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-3xl shadow-2xl shadow-brand-900/10 p-8 md:p-14 border-2 border-gold-400/20 relative">
            <Quote className="absolute top-6 right-6 text-gold-200" size={72} />

            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, k) => (
                <Star key={k} size={20} className="fill-gold-500 text-gold-500" />
              ))}
            </div>

            <p className="text-xl md:text-3xl font-display text-brand-900 leading-relaxed mb-8 italic font-medium">
              "{t.text}"
            </p>

            <div className="flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-gold-100"
              />
              <div>
                <div className="font-display text-xl font-semibold text-brand-900">{t.name}</div>
                <div className="text-sm text-gold-600 font-semibold tracking-wide">{t.course}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white border-2 border-brand-100 hover:bg-brand-900 hover:text-white hover:border-brand-900 transition grid place-items-center shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-brand-900 text-gold-300 hover:bg-brand-700 transition grid place-items-center shadow-md"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {TESTIMONIALS.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Go to testimonial ${k + 1}`}
                className={`h-2 rounded-full transition-all ${
                  k === i ? 'w-10 bg-gold-500' : 'w-2 bg-brand-100'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
