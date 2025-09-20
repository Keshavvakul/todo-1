'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from '@/lib/actions/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn(email, password)
      
      if (result.error) {
        setError(result.error)
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a0a1a] to-[#0a0a1a]"></div>
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#00ffff] opacity-10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-[#8b5cf6] opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      
      <main className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-bold gradient-text hover:opacity-80 transition-opacity">
            ToDo<span className="text-[#00ffff]">X</span>
          </Link>
          <p className="text-[#b0b0b0] mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="glass p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#00ffff] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-futuristic w-full px-4 py-3 text-[#e0e0e0] placeholder-[#666]"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#8b5cf6] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-futuristic w-full px-4 py-3 text-[#e0e0e0] placeholder-[#666]"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="btn-neon w-full py-3 px-4 bg-gradient-to-r from-[#00ffff] to-[#8b5cf6] text-black font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-[#00ffff] hover:to-[#ff00ff] transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link 
              href="/signup" 
              className="block text-[#8b5cf6] hover:text-[#00ffff] transition-colors text-sm"
            >
              Don't have an account? Sign Up
            </Link>
            <Link 
              href="/" 
              className="block text-[#666] hover:text-[#8b5cf6] transition-colors text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
