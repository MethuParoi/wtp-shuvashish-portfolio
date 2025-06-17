'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Replace with your login API logic
      // await loginAdmin(email, password);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] p-4">
      <div className="w-full max-w-2xl flex bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">A</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 text-center">Please sign in to continue</p>
          </div>
          {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                autoComplete="username"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="example@admin.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg pr-12 focus:ring-primary focus:border-primary"
                  placeholder="Your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-gray-900 font-semibold py-3 rounded-lg hover:bg-primary-hover transition"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Not a member?{' '}
              <a href="/admin-register" className="text-secondary font-medium hover:underline">
                Register Now
              </a>
            </p>
          </div>
        </div>
        {/* Right: Illustration (hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary via-secondary to-accent items-center justify-center p-8">
          <img src="/admin-illustration.svg" alt="Admin Illustration" className="w-64 h-64 object-contain" />
        </div>
      </div>
    </div>
  );
}
