import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export default function AuthForm({ onAuth, user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onAuth && onAuth();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    onAuth && onAuth();
  };

  if (user) {
    return (
      <div className="max-w-sm mx-auto mt-10 p-6 bg-gray-900/80 rounded-xl shadow-lg border border-emerald-500/20 text-emerald-100 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-0 rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900/90 to-slate-900/90 border-2 border-transparent bg-clip-padding relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl animate-blob"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-2xl animate-blob animation-delay-2000"></div>
      <div className="relative z-10 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center shadow-lg mb-2">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400 mb-1 drop-shadow">{isLogin ? 'Login' : 'Sign Up'}</h2>
          <p className="text-emerald-200/80 text-sm font-medium mb-2">to continue to LeetTrack</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12A4 4 0 118 12a4 4 0 018 0zM12 14v2m0 4h.01" /></svg>
            </span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="pl-10 pr-3 py-2 rounded-lg bg-gray-800/70 border border-emerald-500/30 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full placeholder-emerald-200/60"
              required
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.105.895-2 2-2s2 .895 2 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2c0-1.105.895-2 2-2z" /></svg>
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="pl-10 pr-3 py-2 rounded-lg bg-gray-800/70 border border-emerald-500/30 text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full placeholder-emerald-200/60"
              required
            />
          </div>
          {error && <div className="text-red-400 text-sm text-center font-medium">{error}</div>}
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-60 text-lg tracking-wide"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <div className="mt-6 text-emerald-200/80 text-sm text-center">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button className="underline hover:text-emerald-300 font-semibold" onClick={() => setIsLogin(false)}>Sign Up</button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button className="underline hover:text-emerald-300 font-semibold" onClick={() => setIsLogin(true)}>Login</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
