import { useState } from 'react';
import {
  GraduationCap,
  Mail,
  Phone,
  Save,
  LogOut,
  User,
  BookOpen,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import type { Page, SectionId } from '@/lib/types';
import { useAuth } from '@/lib/auth';
import { programs, educationLevels, courses } from '@/lib/data';

interface PortalProps {
  onNavigate: (page: Page) => void;
  onScrollTo: (id: SectionId) => void;
}

interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  program: string | null;
  education_level: string | null;
  bio: string | null;
}

export default function Portal({ onNavigate, onScrollTo }: PortalProps) {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile>(() => ({
    id: user?.id ?? '',
    full_name: user?.fullName ?? '',
    phone: user?.phone || null,
    program: user?.program || null,
    education_level: user?.educationLevel || null,
    bio: null,
  }));
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [editForm, setEditForm] = useState({
    fullName: user?.fullName ?? '',
    phone: user?.phone ?? '',
    program: user?.program ?? '',
    educationLevel: user?.educationLevel ?? '',
    bio: '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setMessage(null);
    setProfile({
      id: user.id,
      full_name: editForm.fullName,
      phone: editForm.phone || null,
      program: editForm.program || null,
      education_level: editForm.educationLevel || null,
      bio: editForm.bio || null,
    });
    setMessage({ type: 'success', text: 'Profile updated for this preview session.' });
  };

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 pt-16">
        <div className="card max-w-md p-10 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-warning-500" />
          <h1 className="mt-4 font-display text-xl font-bold text-neutral-900">
            Sign in required
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            You need to be signed in to view your student portal.
          </p>
          <button onClick={() => onNavigate('login')} className="btn-primary mt-6">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const enrolledCourse = courses.find((c) => c.name === profile?.program);

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {profile?.full_name || 'Welcome, Student'}
                </h1>
                <p className="text-sm text-primary-200">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="btn-outline !border-white/30 !bg-white/10 !text-white hover:!bg-white/20"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BookOpen,
              label: 'Enrolled Program',
              value: profile?.program || 'Not set',
            },
            {
              icon: GraduationCap,
              label: 'Education Level',
              value: profile?.education_level || 'Not set',
            },
            {
              icon: Clock,
              label: 'Course Duration',
              value: enrolledCourse?.duration || '—',
            },
            {
              icon: TrendingUp,
              label: 'Account Status',
              value: 'Active',
            },
          ].map((stat) => (
            <div key={stat.label} className="card p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                {stat.label}
              </div>
              <div className="mt-1 font-display text-base font-bold text-neutral-900">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Edit profile */}
          <div className="lg:col-span-2">
            <div className="card p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-neutral-900">My Profile</h2>
              <p className="mt-1 text-sm text-neutral-500">
                Keep your details up to date so we can better support your learning.
              </p>

              {message && (
                <div
                  className={`mt-5 flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${
                    message.type === 'success'
                      ? 'bg-success-50 text-success-700'
                      : 'bg-error-50 text-error-700'
                  }`}
                >
                  {message.type === 'success' ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  )}
                  <span>{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSave} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      className="input"
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      placeholder="Your full name"
                    />
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
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        placeholder="+232 88 984 113"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="program">
                      Program
                    </label>
                    <select
                      id="program"
                      className="input"
                      value={editForm.program}
                      onChange={(e) => setEditForm({ ...editForm, program: e.target.value })}
                    >
                      <option value="">Select a course</option>
                      {programs.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label" htmlFor="educationLevel">
                      Education Level
                    </label>
                    <select
                      id="educationLevel"
                      className="input"
                      value={editForm.educationLevel}
                      onChange={(e) =>
                        setEditForm({ ...editForm, educationLevel: e.target.value })
                      }
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

                <div>
                  <label className="label" htmlFor="bio">
                    Short Bio (optional)
                  </label>
                  <textarea
                    id="bio"
                    rows={3}
                    className="input resize-none"
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Tell us a little about yourself and your goals..."
                  />
                </div>

                <button type="submit" className="btn-primary">
                  Save Profile
                  <Save className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar — account + enrolled course */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-400">
                Account
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-neutral-400" />
                  <span className="text-neutral-700">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-neutral-400" />
                  <span className="text-neutral-700">{profile?.phone || 'Not set'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success-500" />
                  <span className="text-neutral-700">Account verified & active</span>
                </div>
              </div>
            </div>

            {enrolledCourse && (
              <div className="card overflow-hidden">
                <div className="bg-primary-600 px-6 py-4">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-primary-100">
                    Your Course
                  </h3>
                  <p className="mt-1 font-display text-lg font-bold text-white">
                    {enrolledCourse.name}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-neutral-600">{enrolledCourse.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
                    <Clock className="h-4 w-4" />
                    {enrolledCourse.duration} • {enrolledCourse.level}
                  </div>
                </div>
              </div>
            )}

            {!enrolledCourse && (
              <div className="card p-6 text-center">
                <GraduationCap className="mx-auto h-10 w-10 text-neutral-300" />
                <h3 className="mt-3 font-display text-sm font-bold text-neutral-900">
                  No course enrolled yet
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  Select a program in your profile to see course details here.
                </p>
                <button
                  onClick={() => onScrollTo('services')}
                  className="btn-outline mt-4 w-full !py-2"
                >
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
