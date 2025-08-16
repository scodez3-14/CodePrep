import React, { useState, useEffect } from 'react';
import CompanyProblems from './components/CompanyProblems';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';
import AuthForm from './components/AuthForm';
import { auth } from './firebase';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';


function App() {
  const [page, setPage] = useState('problems');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => setUser(u));
    return () => unsub();
  }, []);

  // Ensure a Firestore user document exists with default fields when a user signs in
  useEffect(() => {
    if (!user) return;
    const ensureUserDoc = async () => {
      try {
        const ref = doc(db, 'users', user.uid);
        await setDoc(ref, { solved: [], solvedDates: [], recent: [] }, { merge: true });
        console.log('Ensured user doc defaults for', user.uid);
      } catch (err) {
        console.error('Error ensuring user doc exists:', err);
      }
    };
    ensureUserDoc();
  }, [user]);

  return (
    <div className="App min-h-screen bg-gradient-to-br from-gray-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-300 rounded-full mix-blend-soft-light filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-200 rounded-full mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-emerald-400 rounded-full mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-green-300 rounded-full mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-3000"></div>
      </div>

      <header className="relative z-10">
        <NavBar onNavigate={setPage} currentPage={page} user={user} />
      </header>
      <main className="relative z-10 py-6 sm:py-8">
        {!user ? (
          <AuthForm user={user} />
        ) : (
          page === 'dashboard' ? <Dashboard user={user} /> : <CompanyProblems user={user} />
        )}
      </main>
      {/* Show data source only for logged-in users on the company problems page */}
      {user && page === 'problems' && (
        <footer className="relative z-10 mt-12 sm:mt-16">
          <div className="bg-gray-900/60 border-0 border-t border-emerald-500/20 backdrop-blur-lg shadow-lg shadow-emerald-500/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              <p className="text-center text-emerald-100/70 text-xs sm:text-sm">
                Data sourced from{' '}
                <a 
                  href="https://github.com/hxu296/leetcode-company-wise-problems-2022" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors duration-200 hover:underline"
                >
                  hxu296/leetcode-company-wise-problems-2022
                </a>
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
