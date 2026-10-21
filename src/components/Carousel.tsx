import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { CarouselSlide, SectionId } from '@/lib/types';
import { carouselSlides } from '@/lib/data';

interface CarouselProps {
  onScrollTo: (id: SectionId) => void;
}

export default function Carousel({ onScrollTo }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const slides: CarouselSlide[] = carouselSlides;
  const count = slides.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section id="home" className="relative h-[88vh] min-h-[560px] w-full overflow-hidden scroll-mt-24">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={slide.image}
              alt={slide.title}
              className={`h-full w-full object-cover ${
                i === index ? 'animate-kenburns' : ''
              }`}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/60 to-neutral-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />

          <div className="relative flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
              <div className={`max-w-2xl ${i === index ? 'animate-fadeIn' : ''}`}>
                <span className="inline-flex items-center rounded-full bg-primary-600/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-200 ring-1 ring-primary-400/30">
                  Kingstome Digital Hub
                </span>
                <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-200">
                  {slide.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {slide.cta && (
                    <button onClick={() => onScrollTo(slide.cta!.section)} className="btn-accent">
                      {slide.cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onScrollTo('about')}
                    className="btn-outline !bg-white/10 !text-white !border-white/30 hover:!bg-white/20 hover:!text-white"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/30"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-accent-400' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
