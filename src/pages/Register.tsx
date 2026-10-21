import { useState } from 'react';
import {
  Mail,
  Lock,
  User,
  Phone,
  GraduationCap,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  UserPlus,
  CheckCircle2,
} from 'lucide-react';
import type { Page } from '@/lib/types';
import { useAuth } from '@/lib/auth';
import { programs, educationLevels } from '@/lib/data';
import Logo from '@/components/Logo';

interface RegisterProps {
  onNavigate: (page: Page) => void;
  onSuccess: () => void;
}

export default function Register({ onNavigate, onSuccess }: RegisterProps) {
  const { signUp } = useAuth();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: '',
    educationLevel: '',
    password: '',
    confirmPassword: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const { error: signUpError } = await signUp(form.email, form.password, {
      fullName: form.fullName,
      phone: form.phone,
      program: form.program,
      educationLevel: form.educationLevel,
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError);
      return;
    }

    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 pt-16">
        <div className="card max-w-md p-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-600">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">
            Registration Successful!
          </h1>
          <p className="mt-3 text-neutral-600">
            Welcome to Kingstome Digital Hub, {form.fullName.split(' ')[0]}! Your student account
            has been created. You can now sign in to access your portal.
          </p>
          <button onClick={onSuccess} className="btn-primary mt-6 w-full">
            Go to Portal
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen pt-16">
      {/* Left panel — form */}
      <div className="flex w-full items-center justify-center bg-neutral-50 px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-lg">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <div className="card p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
                <UserPlus className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-neutral-900">
                  Student Registration
                </h1>
                <p className="text-sm text-neutral-500">Create your portal account</p>
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
                <label className="label" htmlFor="fullName">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    id="fullName"
                    className="input pl-11"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    placeholder="Jane Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      id="email"
                      type="email"
                      className="input pl-11"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="phone">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      id="phone"
                      className="input pl-11"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="+232 88 984 113"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="program">
                    Program of Interest
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <select
                      id="program"
                      className="input pl-11"
                      value={form.program}
                      onChange={(e) => update('program', e.target.value)}
                    >
                      <option value="">Select a course</option>
                      {programs.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="educationLevel">
                    Education Level
                  </label>
                  <select
                    id="educationLevel"
                    className="input"
                    value={form.educationLevel}
                    onChange={(e) => update('educationLevel', e.target.value)}
                  >
                    <option value="">Select level</option>
                    {educationLevels.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
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
                      value={form.password}
                      onChange={(e) => update('password', e.target.value)}
                      placeholder="Min. 6 characters"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      aria-label="Toggle password"
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      id="confirmPassword"
                      type={showPw ? 'text' : 'password'}
                      className="input pl-11"
                      value={form.confirmPassword}
                      onChange={(e) => update('confirmPassword', e.target.value)}
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Creating account...' : 'Create Account'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-neutral-600">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="font-semibold text-primary-600 hover:text-primary-700"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — image */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <img
          src="https://images.pexels.com/photos/10638069/pexels-photo-10638069.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900"
          alt="Computer lab"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-accent-900/30" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <Logo variant="light" />
          <h2 className="mt-6 font-display text-3xl font-bold text-white">
            Start your tech journey today
          </h2>
          <p className="mt-3 max-w-md text-neutral-200">
            Create a student account to register for courses, track your progress, and access
            learning resources — all in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {programs.slice(0, 3).map((p) => (
              <span
                key={p}
                className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
