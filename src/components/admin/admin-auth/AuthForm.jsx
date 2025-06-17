// "use client";
// import { useState, useEffect } from 'react';
// import { admin-registerAdmin, admin-loginAdmin } from '../../../lib/adminService';
// import { useRouter } from 'next/navigation';
// import {Button} from '../../ui/Navigation/Button';

// export default function AuthForm({ mode }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirm, setConfirm] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (mode === 'admin-register') {
//         if (password !== confirm) throw new Error('Passwords must match');
//         await admin-registerAdmin(email, password);
//       } else {
//         await admin-loginAdmin(email, password);
//       }
//       router.push('/admin/dashboard');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded-lg shadow">
//       <h2 className="text-xl font-bold mb-4">{mode==='admin-register'?'Create Admin':'Admin admin-login'}</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <input type="email" placeholder="Email" required
//         value={email} onChange={e=>setEmail(e.target.value)}
//         className="w-full mb-3 p-2 border rounded" />
//       <input type="password" placeholder="Password" required
//         value={password} onChange={e=>setPassword(e.target.value)}
//         className="w-full mb-3 p-2 border rounded" />
//       {mode==='admin-register' && (
//         <input type="password" placeholder="Confirm Password" required
//           value={confirm} onChange={e=>setConfirm(e.target.value)}
//           className="w-full mb-3 p-2 border rounded" />
//       )}
//       <div className='flex justify-center'>
//         <Button variant="default" size="default" >{mode==='admin-register'?'admin-register':'admin-login'}</Button>
//       </div>

//       <div>
//         <p className="mt-4 text-sm text-gray-600">
//           {mode === 'admin-register' ? 'Do not have an account?' : 'Need to create an account?'}
//           <span
//             onClick={() => router.push(mode === 'admin-register' ? '/admin-admin-login' : '/admin-admin-register')}
//             className="text-blue-600 cursor-pointer ml-1"
//           >
//             {mode === 'admin-register' ? 'admin-login' : 'admin-register'}
//           </span>
//         </p>
//       </div>
//     </form>
//   );
// }


'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function AuthForm({ mode = 'admin-login' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'admin-register') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (password.length < 8) {
          throw new Error('Password must be at least 8 characters long');
        }
      }

      const endpoint = mode === 'admin-register' ? '/api/admin/admin-register' : '/api/admin/admin-login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        const { error } = await res.json();
        setError(error || 'An error occurred');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'admin-login' ? 'admin-register' : 'admin-login';
    router.push(`/${newMode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                <span className="text-gray-900 font-bold text-lg">A</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {mode === 'admin-login' ? 'Welcome Back!' : 'Create Admin Account'}
            </h2>
            <p className="text-gray-600">
              {mode === 'admin-login' 
                ? 'Please sign in to continue to your admin dashboard' 
                : 'Set up your admin credentials to get started'
              }
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (admin-register Only) */}
            {mode === 'admin-register' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 pr-12 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me (admin-login Only) */}
            {mode === 'admin-login' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-secondary hover:text-secondary-hover transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-gray-900 font-semibold py-3 px-4 rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                  {mode === 'admin-login' ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                mode === 'admin-login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {mode === 'admin-login' ? "Don't have an admin account?" : "Already have an admin account?"}
              <button
                onClick={toggleMode}
                className="ml-2 text-secondary hover:text-secondary-hover font-medium transition-colors"
              >
                {mode === 'admin-login' ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Illustration/Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-secondary to-accent items-center justify-center p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute top-32 right-16 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-12 h-12 bg-white rounded-full"></div>
            <div className="absolute bottom-32 right-8 w-8 h-8 bg-white rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center text-white max-w-md">
            {/* Illustration Placeholder */}
            <div className="mb-8">
              <div className="w-64 h-64 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-48 h-48 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/40 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">
              {mode === 'admin-login' ? 'Secure Admin Access' : 'Join the Admin Team'}
            </h3>
            <p className="text-lg opacity-90 leading-relaxed">
              {mode === 'admin-login' 
                ? 'Access your portfolio dashboard with enterprise-grade security and comprehensive management tools.'
                : 'Create your admin credentials to start managing your portfolio with powerful administrative features.'
              }
            </p>

            {/* Feature List */}
            <div className="mt-8 space-y-3 text-left">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Advanced project management</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Content publishing system</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Analytics and insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
