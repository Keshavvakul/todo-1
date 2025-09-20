'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUp } from '@/lib/actions/auth'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const result = await signUp(formData.email, formData.password, formData.name)
      
      if (result.error) {
        setError(result.error)
      } else {
        router.push('/dashboard')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a0a1a] to-[#0a0a1a]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#8b5cf6] opacity-10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-[#ff00ff] opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <main className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-bold gradient-text hover:opacity-80 transition-opacity">
            ToDo<span className="text-[#00ffff]">X</span>
          </Link>
          <p className="text-[#b0b0b0] mt-2">Create your account</p>
        </div>

        {/* Signup Form */}
        <div className="glass p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#00ffff] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-futuristic w-full px-4 py-3 text-[#e0e0e0] placeholder-[#666]"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#8b5cf6] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-futuristic w-full px-4 py-3 text-[#e0e0e0] placeholder-[#666]"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#ff00ff] mb-2">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-futuristic w-full px-4 py-3 text-[#e0e0e0] placeholder-[#666]"
                placeholder="Enter your password (min 6 characters)"
                required
                minLength={6}
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#ff00ff] mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-futuristic w-full px-4 py-3 text-[#e0e0e0] placeholder-[#666]"
                placeholder="Confirm your password"
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
              disabled={isLoading || !formData.email || !formData.password}
              className="btn-neon w-full py-3 px-4 bg-gradient-to-r from-[#8b5cf6] to-[#ff00ff] text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-[#ff00ff] hover:to-[#00ffff] transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/login" 
              className="text-[#00ffff] hover:text-[#8b5cf6] transition-colors text-sm"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-[#666] text-sm">
            By creating an account, you agree to our terms of service.
          </p>
        </div>
      </main>
    </div>
  )
}
