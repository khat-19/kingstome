import { ArrowLeft, ArrowRight, Check, MessageSquare } from 'lucide-react';
import type { SectionId, ServiceItem } from '@/lib/types';
import { getServiceIcon } from '@/lib/icons';

interface ServiceDetailsProps {
  service: ServiceItem;
  onBack: () => void;
  onScrollTo: (id: SectionId) => void;
}

export default function ServiceDetails({ service, onBack, onScrollTo }: ServiceDetailsProps) {
  const Icon = getServiceIcon(service.icon);
  const gallery = service.gallery?.length ? service.gallery : [service.image];

  return (
    <div className="bg-white pt-20">
      <section className="relative overflow-hidden bg-neutral-950">
        <img
          src={service.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-primary-950/50" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <button
            onClick={onBack}
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" /> Back to services
          </button>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-100">
              <Icon className="h-4 w-4" /> {service.category}
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold text-white sm:text-5xl">{service.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-200">{service.description}</p>
            <button onClick={() => onScrollTo('contact')} className="btn-accent mt-8">
              <MessageSquare className="h-4 w-4" /> Request a quote
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Our work</span>
              <h2 className="mt-2 font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
                {service.gallery?.length ? 'A look at what we create' : 'Explore this service'}
              </h2>
              <p className="mt-3 max-w-2xl text-neutral-600">
                {service.gallery?.length
                  ? 'A selection of our design and print projects, including examples produced for our clients.'
                  : 'Discover how our team can help bring your next project to life.'}
              </p>
            </div>
            {service.gallery?.length ? (
              <span className="text-sm font-medium text-neutral-500">{gallery.length} projects</span>
            ) : null}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image, index) => (
              <figure key={image} className="group overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
                <img
                  src={image}
                  alt={`${service.title} project ${index + 1}`}
                  loading="lazy"
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <figcaption className="flex items-center justify-between px-5 py-4">
                  <span className="font-medium text-neutral-800">{service.title}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                    <Check className="h-4 w-4" />
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-primary-50 p-8 sm:flex sm:items-center sm:justify-between sm:p-10">
            <div>
              <h3 className="font-display text-2xl font-bold text-neutral-900">Have a project in mind?</h3>
              <p className="mt-2 text-neutral-600">Tell us what you need and we’ll help make it happen.</p>
            </div>
            <button onClick={() => onScrollTo('contact')} className="btn-primary mt-6 sm:mt-0">
              Talk to our team <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
