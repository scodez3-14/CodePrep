
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function NavBar({ onNavigate, currentPage, user }) {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="w-full bg-gray-900/80 border-b border-emerald-500/20 px-4 py-3 flex items-center justify-between shadow-lg shadow-emerald-500/10 z-20">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400 select-none">LeetTrack</span>
      </div>
      <div className="hidden sm:flex gap-6 items-center">
        {user && <>
          <button
            className={`text-emerald-100/80 hover:text-emerald-300 font-semibold transition-colors duration-200 ${currentPage==='problems'?'underline':''}`}
            onClick={() => onNavigate('problems')}
          >Problems</button>
          <button
            className={`text-emerald-100/80 hover:text-emerald-300 font-semibold transition-colors duration-200 ${currentPage==='dashboard'?'underline':''}`}
            onClick={() => onNavigate('dashboard')}
          >Dashboard</button>
          <button
            onClick={handleLogout}
            className="ml-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-1.5 rounded-md font-semibold shadow hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
          >
            Log Out
          </button>
        </>}
      </div>
      {/* Mobile menu */}
      <div className="sm:hidden">
        <button onClick={()=>setOpen(!open)} className="text-emerald-200 focus:outline-none">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {open && user && (
          <div className="absolute right-4 top-16 bg-gray-900/95 border border-emerald-500/20 rounded-lg shadow-lg py-2 px-4 flex flex-col gap-2 z-50 animate-fade-in-up">
            <button
              className={`text-emerald-100/80 hover:text-emerald-300 font-semibold transition-colors duration-200 text-left ${currentPage==='problems'?'underline':''}`}
              onClick={() => {onNavigate('problems');setOpen(false);}}
            >Problems</button>
            <button
              className={`text-emerald-100/80 hover:text-emerald-300 font-semibold transition-colors duration-200 text-left ${currentPage==='dashboard'?'underline':''}`}
              onClick={() => {onNavigate('dashboard');setOpen(false);}}
            >Dashboard</button>
            <button
              onClick={() => {handleLogout();setOpen(false);}}
              className="mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-1.5 rounded-md font-semibold shadow hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
