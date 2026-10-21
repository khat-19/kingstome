export type Page = 'home' | 'login' | 'register' | 'portal' | 'service';

export type SectionId = 'home' | 'services' | 'about' | 'owner' | 'contact';

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  image: string;
  category: string;
  gallery?: string[];
}

export interface CarouselSlide {
  title: string;
  subtitle: string;
  image: string;
  cta?: { label: string; section: SectionId };
}

export interface CourseItem {
  name: string;
  duration: string;
  level: string;
  description: string;
}
