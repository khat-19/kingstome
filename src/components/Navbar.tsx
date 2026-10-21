import { useState, useEffect } from 'react';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import type { Page, SectionId } from '@/lib/types';
import { useAuth } from '@/lib/auth';
import Logo from './Logo';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  onScrollTo: (id: SectionId) => void;
  activeSection: SectionId;
}

const sectionLinks: { label: string; section: SectionId }[] = [
  { label: 'Home', section: 'home' },
  { label: 'Services', section: 'services' },
  { label: 'About', section: 'about' },
  { label: 'Founder', section: 'owner' },
  { label: 'Contact', section: 'contact' },
];

export default function Navbar({ onNavigate, onScrollTo, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goSection = (section: SectionId) => {
    onScrollTo(section);
    setMobileOpen(false);
  };

  const goPage = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    goPage('home');
  };

  const isHome = activeSection !== undefined;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 shadow-md shadow-neutral-900/5 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button onClick={() => goSection('home')} className="flex items-center" aria-label="Home">
          <Logo variant={scrolled ? 'dark' : 'dark'} />
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {isHome &&
            sectionLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => goSection(link.section)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeSection === link.section
                    ? 'text-primary-700'
                    : 'text-neutral-700 hover:text-primary-600'
                }`}
              >
                {link.label}
                {activeSection === link.section && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary-600" />
                )}
              </button>
            ))}
        </div>

        {/* <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <button onClick={() => goPage('portal')} className="btn-outline !py-2 !px-4">
                <LayoutDashboard className="h-4 w-4" />
                Portal
              </button>
              <button onClick={handleSignOut} className="btn-primary !py-2 !px-4">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button onClick={() => goPage('login')} className="btn-outline !py-2 !px-4">
                Login
              </button>
              <button onClick={() => goPage('register')} className="btn-primary !py-2 !px-4">
                Register
              </button>
            </>
          )}
        </div> */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-neutral-800 transition hover:bg-neutral-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {sectionLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => goSection(link.section)}
                className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeSection === link.section
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="my-2 h-px bg-neutral-200" />
            {user ? (
              <>
                <button onClick={() => goPage('portal')} className="btn-outline !justify-start">
                  <LayoutDashboard className="h-4 w-4" /> Student Portal
                </button>
                <button onClick={handleSignOut} className="btn-primary !justify-start">
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => goPage('login')} className="btn-outline !justify-start">
                  Login
                </button>
                <button onClick={() => goPage('register')} className="btn-primary !justify-start">
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
