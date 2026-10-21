import { Cpu } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-neutral-900';
  const subColor = variant === 'light' ? 'text-primary-200' : 'text-primary-600';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-30 to-primary-700 shadow-lg shadow-primary-400/30">
        <img src="src/img/lokin.png" alt="" />
        {/* <Cpu className="h-5 w-5 text-white" /> */}
      </div>
      <div className="leading-tight">
        <div className={`font-display text-base font-bold ${textColor}`}>Kingstome</div>
        <div className={`text-[11px] font-medium uppercase tracking-wider ${subColor}`}>
          Digital Hub
        </div>
      </div>
    </div>
  );
}
