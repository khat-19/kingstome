import {
  ArrowRight,
  GraduationCap,
  Users,
  Award,
  Briefcase,
  Check,
  Clock,
  Target,
  Eye,
  Heart,
  Lightbulb,
  Handshake,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle2,
  BarChart3,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Quote,
} from 'lucide-react';
import { useState } from 'react';
import { services, courses, carouselSlides } from '@/lib/data';
import { getServiceIcon } from '@/lib/icons';
import Carousel from '@/components/Carousel';
import type { SectionId } from '@/lib/types';
import type { ServiceItem } from '@/lib/types';

interface LandingProps {
  onNavigate: (page: 'login' | 'register' | 'portal') => void;
  onScrollTo: (id: SectionId) => void;
  onServiceClick: (service: ServiceItem) => void;
}

export default function Landing({ onNavigate, onScrollTo, onServiceClick }: LandingProps) {
  return (
    <div>
      <Carousel onScrollTo={onScrollTo} />
      <StatsBar />
      <ServicesSection onScrollTo={onScrollTo} onServiceClick={onServiceClick} />
      <AboutSection />
      <OwnerSection />
      {/* <CoursesSection onNavigate={onNavigate} /> */}
      <CtaBand onNavigate={onNavigate} onScrollTo={onScrollTo} />
      <ContactSection />
    </div>
  );
}

/* ---------- Stats bar ---------- */
function StatsBar() {
  const stats = [
    { icon: Briefcase, value: '200+', label: 'Business Clients' },
    { icon: Users, value: '20+', label: 'NGO Organization worked with' },
    { icon: Award, value: '8+', label: 'Years Experience' },
    { icon: GraduationCap, value: '50+', label: 'Schools worked with' },
  ];
  return (
    <section className="relative -mt-16 z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-neutral-900/10 md:grid-cols-4 md:p-8">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-neutral-900">{s.value}</div>
                <div className="text-sm text-neutral-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services section ---------- */
function ServicesSection({
  onScrollTo,
  onServiceClick,
}: {
  onScrollTo: (id: SectionId) => void;
  onServiceClick: (service: ServiceItem) => void;
}) {
  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            What We Offer
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
            Services Provided
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            From professional branding, printing (DTF, Sublimation, Banner, T-shirt, and customization of quality items) — we provide comprehensive digital
            solutions for individuals and organizations.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <div
                key={service.title}
                role="button"
                tabIndex={0}
                onClick={() => onServiceClick(service)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onServiceClick(service);
                  }
                }}
                aria-label={`View details for ${service.title}`}
                className="group card cursor-pointer overflow-hidden text-left transition hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/10 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-700">
                    {service.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-neutral-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600">
                    View details <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button onClick={() => onScrollTo('contact')} className="btn-primary">
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- About section ---------- */
function AboutSection() {
  const values = [
    { icon: Lightbulb, title: 'Innovation', description: 'We embrace the latest technologies and creative approaches to solve real problems.' },
    { icon: Award, title: 'Quality', description: 'Every project, course, and product meets a high standard of excellence.' },
    { icon: Handshake, title: 'Integrity', description: 'We build lasting relationships based on trust, honesty, and delivering on our promises.' },
    { icon: TrendingUp, title: 'Empowerment', description: 'We equip our students and clients with skills and tools to grow and succeed.' },
  ];

  const milestones = [
    { year: '2017', text: 'Mr King Printing Peninsula school gate waterloo'  },
    { year: '2024', text: 'Lunch Apex Computer Training School 109 Liverpool Street, Benguema Road Waterloo' },
    { year: '2026', text: 'Lunch KingStome Digital hub SL LTD Tombo junction Waterloo' },
  ];

  return (
    <section id="about" className="scroll-mt-24 bg-neutral-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mission / Vision / Promise */}
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            { icon: Target, title: 'Our Mission', text: 'To provide innovative, affordable, reliable, and high-quality solutions in printing, branding, information and communication technology (ICT), photography, and digital services. We are committed to helping businesses grow, strengthening digital skills, creating opportunities, and delivering exceptional customer experiences through creativity, modern technology, and professional expertise.' },
            { icon: Eye, title: 'Our Vision', text: 'To become one of Sierra Leone’s leading and most trusted digital technology and creative solutions companies, recognized for innovation, excellence, professionalism, and quality services that empower businesses, individuals, and communities.' },
            { icon: Heart, title: 'Our Promise', text: 'At KINGSTOME DIGITAL HUB S/L LTD, we promise to deliver excellence in every service, creativity in every design, and professionalism in every project. We are dedicated to understanding our customers needs, providing quality solutions at affordable prices, meeting agreed deadlines, and building lasting relationships based on trust, honesty, reliability, and customer satisfaction.' },
          ].map((item) => (
            <div key={item.title} className="card p-8 hover:shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-neutral-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Story + image */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/10638065/pexels-photo-10638065.jpeg?auto=compress&cs=tinysrgb&h=700&w=940"
              alt="Computer lab"
              className="rounded-3xl object-cover shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-primary-600 p-6 text-white shadow-2xl sm:block">
              <div className="font-display text-3xl font-bold">8+</div>
              <div className="text-sm text-primary-100">Years of Excellence</div>
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Our Story
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-neutral-900">
              Building brands and careers since 2017
            </h2>
            <p className="mt-4 text-neutral-600">
              What started as a small computer training center has grown into a full-service digital
              hub. Today we offer professional courses, web and software development, graphic design,
              corporate branding, printing, and photography — all delivered by a passionate team of
              experts.
            </p>
            <p className="mt-3 text-neutral-600">
              We proudly serve individuals, businesses, schools, and organizations across Sierra
              Leone, helping them build strong brands and achieve their goals through technology.
            </p>

            <div className="mt-8 space-y-4">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                    <span className="text-xs font-bold">{m.year}</span>
                  </div>
                  <p className="pt-2 text-sm text-neutral-700">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values grid */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              What Drives Us
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
              Our Core Values
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-600/30">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-900">{v.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Owner / Founder section ---------- */
function OwnerSection() {
  const socials = [Linkedin, Facebook, Twitter, Instagram];
  const highlights = [
    'Over a decade of experience in ICT and digital innovation',
    'Passionate educator — personally mentors advanced cohorts',
    'Led branding and software projects for 50+ organizations',
    'Committed to empowering youth through technology in Sierra Leone',
  ];

  return (
    <section id="owner" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          {/* Portrait */}
          <div className="lg:col-span-2">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary-200 to-accent-200 opacity-60 blur-xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl">
                <img
                  src="src/img/kinimage.jpeg"
                  alt="Founder & CEO of Kingstome Digital Hub"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-2xl bg-white px-6 py-3 text-center shadow-xl">
                <div className="font-display text-sm font-bold text-neutral-900">
                  (King) Founder & CEO
                </div>
                <div className="text-xs text-primary-600">Kingstome Digital Hub SL LTD</div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Meet the Founder
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
              The vision behind Kingstome Digital Hub
            </h2>

            <div className="mt-5 rounded-2xl border-l-4 border-primary-500 bg-primary-50/60 p-5">
              <Quote className="h-6 w-6 text-primary-400" />
              <p className="mt-2 font-display text-lg italic leading-relaxed text-neutral-700">
                "We believe technology is the great equalizer. Our mission is to give every person
                and every business in our community the tools to compete, to create, and to thrive
                in the digital age."
              </p>
            </div>

            <p className="mt-5 text-neutral-600">
              With a passion for technology and education, our founder established Kingstome Digital
              Hub in 2026 to bridge the digital skills gap in Sierra Leone. Under their leadership,
              the company has grown from a small training center into a full-service digital agency
              serving individuals, businesses, schools, and organizations.
            </p>

            <ul className="mt-6 space-y-3">
              {highlights.map((point) => (
                <li key={point} className="flex items-start gap-3 text-neutral-700">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500 transition hover:bg-primary-600 hover:text-white"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Courses section ---------- */
// function CoursesSection({ onNavigate }: { onNavigate: (page: 'login' | 'register' | 'portal') => void }) {
//   return (
//     <section className="bg-neutral-50 py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="grid items-center gap-12 lg:grid-cols-2">
//           <div>
//             <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
//               Computer School
//             </span>
//             <h2 className="mt-3 font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
//               Practical courses designed for real careers
//             </h2>
//             <p className="mt-4 text-lg text-neutral-600">
//               Our hands-on training programs are led by experienced instructors and built around the
//               skills employers actually need. Learn at your pace, build a portfolio, and graduate
//               job-ready.
//             </p>
//             <ul className="mt-6 space-y-3">
//               {[
//                 'Small class sizes with personal attention',
//                 'Industry-relevant curriculum',
//                 'Certificate on completion',
//                 'Flexible morning, evening & weekend schedules',
//               ].map((point) => (
//                 <li key={point} className="flex items-start gap-3 text-neutral-700">
//                   <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
//                     <Check className="h-3 w-3" />
//                   </span>
//                   <span className="text-sm">{point}</span>
//                 </li>
//               ))}
//             </ul>
//             <button onClick={() => onNavigate('register')} className="btn-primary mt-8">
//               Register Now
//               <ArrowRight className="h-4 w-4" />
//             </button>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2">
//             {courses.slice(0, 4).map((course, i) => (
//               <div
//                 key={course.name}
//                 className={`card p-5 hover:shadow-lg ${i % 2 === 1 ? 'sm:translate-y-6' : ''}`}
//               >
//                 <div className="mb-2 flex items-center gap-2">
//                   <GraduationCap className="h-5 w-5 text-accent-500" />
//                   <span className="text-xs font-semibold text-neutral-400">{course.level}</span>
//                 </div>
//                 <h3 className="font-display text-base font-bold text-neutral-900">{course.name}</h3>
//                 <p className="mt-1.5 text-sm text-neutral-600">{course.description}</p>
//                 <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
//                   <Clock className="h-3.5 w-3.5" />
//                   {course.duration}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Full course catalog */}
//         <div className="mt-20">
//           <div className="mx-auto max-w-2xl text-center">
//             <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
//               Course Catalog
//             </span>
//             <h3 className="mt-3 font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
//               All Courses We Offer
//             </h3>
//           </div>
//           <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//             {courses.map((course) => (
//               <div key={course.name} className="card flex flex-col p-6 hover:shadow-lg">
//                 <div className="mb-3 flex items-center justify-between">
//                   <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
//                     <BarChart3 className="h-3.5 w-3.5" />
//                     {course.level}
//                   </span>
//                   <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500">
//                     <Clock className="h-3.5 w-3.5" />
//                     {course.duration}
//                   </span>
//                 </div>
//                 <h4 className="font-display text-lg font-bold text-neutral-900">{course.name}</h4>
//                 <p className="mt-2 flex-1 text-sm text-neutral-600">{course.description}</p>
//                 <ul className="mt-4 space-y-2">
//                   {['Hands-on projects', 'Certificate on completion', 'Flexible schedule'].map(
//                     (feat) => (
//                       <li key={feat} className="flex items-center gap-2 text-xs text-neutral-600">
//                         <Check className="h-3.5 w-3.5 text-accent-500" />
//                         {feat}
//                       </li>
//                     ),
//                   )}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <div className="mt-10 text-center">
//             <button onClick={() => onNavigate('register')} className="btn-primary">
//               Register for a Course
//               <ArrowRight className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

/* ---------- CTA band ---------- */
function CtaBand({
  onNavigate,
  onScrollTo,
}: {
  onNavigate: (page: 'login' | 'register' | 'portal') => void;
  onScrollTo: (id: SectionId) => void;
}) {
  return (
    <section className="relative overflow-hidden bg-primary-700 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950" />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-500/30 blur-3xl" />
      <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Ready to start your journey in tech?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
          Join our computer school today and gain the skills that will transform your future.
          Registration is quick and easy through our student portal.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => onNavigate('register')} className="btn-accent">
            Create an Account
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => onScrollTo('contact')}
            className="btn-outline !border-white/40 !bg-white/10 !text-white hover:!bg-white/20"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact section ---------- */
function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 800));
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and message.');
      setSubmitting(false);
      return;
    }
    setSent(true);
    setSubmitting(false);
  };

  const contactCards = [
    { icon: Phone, title: 'Call Us', lines: ['+232 88 984 113', 'Mon–Sat, 8am – 9pm', 'Sun 10am - 4pm'] },
    { icon: Mail, title: 'Email Us', lines: ['kingstomedigital@gmail.com'] },
    { icon: MapPin, title: 'Visit Us', lines: ['Tombo Junction, Waterloo'] },
  ];

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Get in Touch
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
            Let's build something together
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Have a question about our courses or services? We'd love to hear from you.
          </p>
        </div>

        {/* Contact cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {contactCards.map((c) => (
            <div key={c.title} className="card flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-neutral-900">{c.title}</h3>
              {c.lines.map((line) => (
                <p key={line} className="mt-1 text-sm text-neutral-600">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Form + info */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-bold text-neutral-900">
              Send a Message
            </h3>
            <p className="mt-2 text-neutral-600">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            {sent ? (
              <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-success-200 bg-success-50 p-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-success-600" />
                <h4 className="mt-4 font-display text-xl font-bold text-neutral-900">
                  Message Sent!
                </h4>
                <p className="mt-2 text-sm text-neutral-600">
                  Thank you for reaching out. We'll respond to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
                  }}
                  className="btn-outline mt-6"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="name">Full Name *</label>
                    <input id="name" className="input" value={form.name}
                      onChange={(e) => update('name', e.target.value)} placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <label className="label" htmlFor="email">Email *</label>
                    <input id="email" type="email" className="input" value={form.email}
                      onChange={(e) => update('email', e.target.value)} placeholder="jane@example.com" required />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="phone">Phone</label>
                    <input id="phone" className="input" value={form.phone}
                      onChange={(e) => update('phone', e.target.value)} placeholder="+232 88 984 113" />
                  </div>
                  <div>
                    <label className="label" htmlFor="subject">Subject</label>
                    <input id="subject" className="input" value={form.subject}
                      onChange={(e) => update('subject', e.target.value)} placeholder="Course inquiry" />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="message">Message *</label>
                  <textarea id="message" rows={5} className="input resize-none" value={form.message}
                    onChange={(e) => update('message', e.target.value)} placeholder="How can we help you?" required />
                </div>
                {error && (
                  <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
                )}
                <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
                  {submitting ? 'Sending...' : 'Send Message'}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          <div>
            <h3 className="font-display text-2xl font-bold text-neutral-900">
              We're here to help you grow
            </h3>
            <p className="mt-2 text-neutral-600">
              Whether you're an individual looking to learn new skills or a business needing digital
              solutions, our team is ready to assist.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: MessageSquare, title: 'Course Consultation', text: "Not sure which course fits you? We'll guide you to the right program." },
                { icon: CheckCircle2, title: 'Project Quotes', text: 'Need a website, branding, or printing? Get a free quote within a day.' },
                { icon: Phone, title: 'Partnerships', text: "Schools and organizations — let's collaborate on training programs." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl bg-neutral-50 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-neutral-900">{item.title}</h4>
                    <p className="mt-1 text-sm text-neutral-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl">
              <iframe
                title="Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-13.3%2C8.4%2C-13.2%2C8.5&layer=mapnik"
                className="h-64 w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
