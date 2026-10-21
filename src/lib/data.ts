import type { ServiceItem, CarouselSlide, CourseItem } from './types';

const graphicDesignGallery = [
  new URL('/img/WhatsApp Image 2026-10-19 at 2.59.08 PM.jpeg', import.meta.url).href,
  new URL('/img/WhatsApp Image 2026-10-19 at 2.59.09 PM.jpeg', import.meta.url).href,
  new URL('/img/WhatsApp Image 2026-10-19 at 2.59.11 PM.jpeg', import.meta.url).href,
  new URL('/img/WhatsApp Image 2026-10-19 at 2.59.12 PM.jpeg', import.meta.url).href,
  new URL('/img/WhatsApp Image 2026-10-19 at 2.59.14 PM.jpeg', import.meta.url).href,
  new URL('/img/WhatsApp Image 2026-10-19 at 2.59.15 PM.jpeg', import.meta.url).href,
];

const digitalPrintingGallery = [
  new URL('/img/dp.jpeg', import.meta.url).href,
  new URL('/img/WhatsApp Image 2026-10-19 at 2.59.06 PM.jpeg', import.meta.url).href,
  new URL('/img/WhatsApp Image 2026-10-19 at 2.59.08 PM.jpeg', import.meta.url).href,
  new URL('/img/WhatsApp Image 2026-10-19 at 2.59.17 PM.jpeg', import.meta.url).href,
  new URL('/img/WhatsApp Image 2026-10-19 at 2.58.27 PM.jpeg', import.meta.url).href,
];

export const services: ServiceItem[] = [
  {
    title: 'Web & Software Development',
    description:
      'Modern websites, web apps, and custom software built with the latest technologies to grow your business online.',
    icon: 'Code2',
    image: 'https://images.pexels.com/photos/326515/pexels-photo-326515.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Technology',
  },
  {
    title: 'Database Management',
    description:
      'Reliable database design, administration, and data management solutions that keep your information secure and accessible.',
    icon: 'Database',
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Technology',
  },
  {
    title: 'Networking & IT Support',
    description:
      'Professional network setup, maintenance, and ongoing IT support to keep your systems running smoothly.',
    icon: 'Network',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Technology',
  },
  {
    title: 'Graphic Design',
    description:
      'Eye-catching logos, flyers, posters, and marketing materials designed by our creative team to elevate your brand.',
    icon: 'Palette',
    image: 'https://images.pexels.com/photos/15569284/pexels-photo-15569284.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Creativity',
    gallery: graphicDesignGallery,
  },
  {
    title: 'Corporate Branding',
    description:
      'Complete brand identity packages — from business cards to vehicle wraps — that make your business unforgettable.',
    icon: 'Sparkles',
    image: 'https://images.pexels.com/photos/15595047/pexels-photo-15595047.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Creativity',
  },
  {
    title: 'Digital & Large-Format Printing',
    description:
      'High-quality digital and large-format printing for banners, posters, signs, and promotional materials.',
    icon: 'Printer',
    image: '/img/dp.jpeg',
    category: 'Quality',
    gallery: digitalPrintingGallery,
  },
  {
    title: 'Photography',
    description:
      'Professional photography for events, products, and corporate profiles that tells your story beautifully.',
    icon: 'Camera',
    image: '/img/p.jpeg',
    category: 'Creativity',
  },
  {
    title: 'Promotional Materials',
    description:
      'Customized branded merchandise — mugs, t-shirts, bags, and more — to promote your organization with style.',
    icon: 'Gift',
    image: '/img/WhatsApp Image 2026-10-19 at 2.59.17 PM.jpeg',
    category: 'Quality',
  },
];

export const carouselSlides: CarouselSlide[] = [
  {
    title: 'Learn In-Demand Tech Skills',
    subtitle:
      'From coding to design, our hands-on courses prepare you for a thriving career in the digital economy.',
    image: '/img/dp.jpeg',
    cta: { label: 'Explore Courses', section: 'services' },
  },
  {
    title: 'Build. Brand. Grow.',
    subtitle:
      'Web development, corporate branding, and printing — everything your business needs under one roof.',
    image: '/img/p.jpeg',
    cta: { label: 'Our Services', section: 'services' },
  },
  {
    title: 'Technology • Creativity • Quality',
    subtitle:
      'Kingstome Digital Hub combines expertise and creativity to help individuals and organizations achieve their goals.',
    image: '/img/WhatsApp Image 2026-10-19 at 2.59.08 PM.jpeg',
    cta: { label: 'Join the School', section: 'contact' },
  },
];

export const courses: CourseItem[] = [
  {
    name: 'Web Development',
    duration: '12 weeks',
    level: 'Beginner → Advanced',
    description: 'HTML, CSS, JavaScript, React, and Node.js — build full websites and web apps from scratch.',
  },
  {
    name: 'Graphic Design',
    duration: '8 weeks',
    level: 'Beginner → Intermediate',
    description: 'Master Adobe Photoshop, Illustrator, and design principles for print and digital media.',
  },
  {
    name: 'Computer Literacy',
    duration: '6 weeks',
    level: 'Beginner',
    description: 'Essential computer skills — operating systems, Microsoft Office, email, and internet basics.',
  },
  {
    name: 'Networking & IT Support',
    duration: '10 weeks',
    level: 'Intermediate',
    description: 'Network fundamentals, troubleshooting, hardware support, and system administration.',
  },
  {
    name: 'Database Management',
    duration: '8 weeks',
    level: 'Intermediate',
    description: 'SQL, database design, and data management with PostgreSQL and modern tools.',
  },
  {
    name: 'Digital Marketing',
    duration: '6 weeks',
    level: 'Beginner → Intermediate',
    description: 'Social media marketing, SEO, content strategy, and online advertising fundamentals.',
  },
];

export const programs = [
  'Web Development',
  'Graphic Design',
  'Computer Literacy',
  'Networking & IT Support',
  'Database Management',
  'Digital Marketing',
];

export const educationLevels = [
  'Primary School',
  'Secondary School (O-Level)',
  'Secondary School (A-Level)',
  'Diploma',
  "Bachelor's Degree",
  "Master's Degree",
  'Other',
];
