import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '@/lib/auth';
import type { Page, SectionId } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Portal from '@/pages/Portal';
import ServiceDetails from '@/pages/ServiceDetails';
import type { ServiceItem } from '@/lib/types';

function AppContent() {
  const [page, setPage] = useState<Page>('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const { user, loading } = useAuth();

  const scrollTo = (id: SectionId) => {
    if (page !== 'home') {
      setPage('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigate = (next: Page) => {
    if (next === 'portal' && !user) {
      setPage('login');
      return;
    }
    if ((next === 'login' || next === 'register') && user && !loading) {
      setPage('portal');
      return;
    }
    if (next === 'home') {
      setPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPortal = () => {
    setPage('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-redirect to portal after login/register if already authed
  useEffect(() => {
    if (!loading && user && (page === 'login' || page === 'register')) {
      setPage('portal');
    }
  }, [user, loading, page]);

  // Scroll-spy: track which section is in view when on home
  useEffect(() => {
    if (page !== 'home') return;
    const sections: SectionId[] = ['home', 'services', 'about', 'owner', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [page]);

  const showChrome = page !== 'login' && page !== 'register' && !(page === 'portal' && !user);

  return (
    <div className="flex min-h-screen flex-col">
      {showChrome && (
        <Navbar
          onNavigate={navigate}
          onScrollTo={scrollTo}
          activeSection={activeSection}
        />
      )}
      <main className="flex-1">
        {page === 'home' && (
          <Landing
            onNavigate={navigate}
            onScrollTo={scrollTo}
            onServiceClick={(service) => {
              setSelectedService(service);
              navigate('service');
            }}
          />
        )}
        {page === 'service' && selectedService && (
          <ServiceDetails
            service={selectedService}
            onBack={() => scrollTo('services')}
            onScrollTo={scrollTo}
          />
        )}
        {page === 'login' && <Login onNavigate={navigate} onSuccess={goToPortal} />}
        {page === 'register' && <Register onNavigate={navigate} onSuccess={goToPortal} />}
        {page === 'portal' && <Portal onNavigate={navigate} onScrollTo={scrollTo} />}
      </main>
      {showChrome && <Footer onNavigate={navigate} onScrollTo={scrollTo} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
