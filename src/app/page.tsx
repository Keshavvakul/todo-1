import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a0a1a] to-[#0a0a1a]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ffff] opacity-10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8b5cf6] opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <main className="relative z-10 text-center max-w-4xl mx-auto">
        {/* App Name */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 gradient-text animate-pulse-neon">
          ToDo<span className="text-[#00ffff]">X</span>
        </h1>
        
        {/* Product Description */}
        <p className="text-xl md:text-2xl text-[#e0e0e0] mb-4 opacity-90">
          Experience the future of task management
        </p>
        <p className="text-lg md:text-xl text-[#b0b0b0] mb-12 max-w-2xl mx-auto leading-relaxed">
          A cutting-edge, futuristic ToDo application built with Next.js, featuring 
          a sleek dark theme, neon accents, and seamless user experience. 
          Organize your tasks like never before.
        </p>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass p-6 text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-[#00ffff] font-semibold mb-2">Lightning Fast</h3>
            <p className="text-[#b0b0b0] text-sm">Built with Next.js 15 and optimized for speed</p>
          </div>
          <div className="glass p-6 text-center">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-[#8b5cf6] font-semibold mb-2">Secure</h3>
            <p className="text-[#b0b0b0] text-sm">JWT authentication with HttpOnly cookies</p>
          </div>
          <div className="glass p-6 text-center">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-[#ff00ff] font-semibold mb-2">Futuristic UI</h3>
            <p className="text-[#b0b0b0] text-sm">Glassmorphism design with neon effects</p>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link 
            href="/login"
            className="btn-neon inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00ffff] to-[#8b5cf6] text-black font-bold text-lg rounded-lg hover:from-[#00ffff] hover:to-[#ff00ff] transition-all duration-300 neon-glow"
          >
            <span>Sign In</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <Link 
            href="/signup"
            className="btn-neon inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#ff00ff] text-white font-bold text-lg rounded-lg hover:from-[#ff00ff] hover:to-[#00ffff] transition-all duration-300 neon-glow-purple"
          >
            <span>Sign Up</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </Link>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#666] text-sm">
        <p>Built with ❤️ using Next.js, Prisma & PostgreSQL</p>
      </footer>
    </div>
  );
}
