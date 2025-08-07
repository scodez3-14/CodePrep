import CompanyProblems from './components/CompanyProblems';

function App() {
  return (
    <div className="App min-h-screen">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <header className="relative z-10">
        <div className="glass border-0 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center animate-fade-in-up">
              <h1 className="text-5xl font-bold mb-3 gradient-text">
                LeetTrack
              </h1>
              <p className="text-gray-700 text-xl font-medium">
                Company-wise LeetCode Problems Collection
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="relative z-10 py-12">
        <CompanyProblems />
      </main>
      
      <footer className="relative z-10 mt-20">
        <div className="glass border-0 border-t border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <p className="text-center text-gray-600 text-sm">
              Data sourced from{' '}
              <a 
                href="https://github.com/hxu296/leetcode-company-wise-problems-2022" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
              >
                hxu296/leetcode-company-wise-problems-2022
              </a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
