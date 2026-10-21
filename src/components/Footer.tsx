import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import type { Page, SectionId } from '@/lib/types';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (page: Page) => void;
  onScrollTo: (id: SectionId) => void;
}

export default function Footer({ onNavigate, onScrollTo }: FooterProps) {
  const quickLinks: { label: string; section: SectionId }[] = [
    { label: 'Home', section: 'home' },
    { label: 'About Us', section: 'about' },
    { label: 'Services', section: 'services' },
    { label: 'Founder', section: 'owner' },
    { label: 'Contact', section: 'contact' },
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Professional ICT, branding, and printing services. Empowering individuals, businesses,
              schools, and organizations with innovative digital solutions.
            </p>
            <p className="mt-3 text-sm font-semibold text-primary-300">
              Technology • Creativity • Quality
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onScrollTo(link.section)}
                    className="text-neutral-400 transition hover:text-primary-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              {/* <li>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-neutral-400 transition hover:text-primary-300"
                >
                  Student Portal
                </button>
              </li> */}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>Printing Service</li>
              <li>Web & Software Development</li>
              <li>Database Management</li>
              <li>Networking & IT Support</li>
              <li>Graphic Design & Branding</li>
              <li>Digital & Large-Format Printing (banner and bill board)</li>
              <li>DTF Quality Printing</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                Tombo Junction, Waterloo
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary-400" />
                +232 88 984 113
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary-400" />
                kingstomedigital@gmail.com
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition hover:bg-primary-600 hover:text-white"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} Kingstome Digital Hub SL LTD. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
