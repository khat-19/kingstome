import { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import type { Page } from '@/lib/types';
import { useAuth } from '@/lib/auth';
import Logo from '@/components/Logo';

interface LoginProps {
  onNavigate: (page: Page) => void;
  onSuccess: () => void;
}

export default function Login({ onNavigate, onSuccess }: LoginProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    setLoading(false);
    if (signInError) {
      setError(signInError);
      return;
    }
    onSuccess();
  };

  return (
    <div className="flex min-h-screen pt-16">
      {/* Left panel — image */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <img
          src="https://images.pexels.com/photos/5530520/pexels-photo-5530520.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900"
          alt="Students learning"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-primary-900/40" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <Logo variant="light" />
          <h2 className="mt-6 font-display text-3xl font-bold text-white">
            Welcome back to your student portal
          </h2>
          <p className="mt-3 max-w-md text-neutral-200">
            Sign in to manage your profile, view your enrolled courses, and track your progress.
          </p>
          <p className="mt-6 font-semibold text-primary-300">Technology • Creativity • Quality</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex w-full items-center justify-center bg-neutral-50 px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <div className="card p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <LogIn className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-neutral-900">Sign In</h1>
                <p className="text-sm text-neutral-500">Access your student account</p>
              </div>
            </div>

            {error && (
              <div className="mb-5 flex items-start gap-2 rounded-xl bg-error-50 px-4 py-3 text-sm text-error-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    id="email"
                    type="email"
                    className="input pl-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    id="password"
                    type={showPw ? 'text' : 'password'}
                    className="input pl-11 pr-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Signing in...' : 'Sign In'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-neutral-600">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('register')}
                className="font-semibold text-primary-600 hover:text-primary-700"
              >
                Register here
              </button>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-neutral-400">
            Kingstome Digital Hub SL LTD — Student Portal
          </p>
        </div>
      </div>
    </div>
  );
}
