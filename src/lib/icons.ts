import {
  Code2,
  Database,
  Network,
  Palette,
  Sparkles,
  Printer,
  Camera,
  Gift,
  type LucideIcon,
} from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  Code2,
  Database,
  Network,
  Palette,
  Sparkles,
  Printer,
  Camera,
  Gift,
};

export function getServiceIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}
