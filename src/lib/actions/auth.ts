'use server'

import bcrypt from 'bcryptjs'
import { signToken, setAuthCookie, clearAuthCookie } from '../auth'
import { prisma } from '../prisma'
import { redirect } from 'next/navigation'

// Force dynamic rendering for server actions
export const dynamic = 'force-dynamic'

export async function signUp(email: string, password: string, name?: string) {
  try {
    if (!email || !email.includes('@')) {
      return { error: 'Please provide a valid email address' }
    }

    if (!password || password.length < 6) {
      return { error: 'Password must be at least 6 characters long' }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      return { error: 'User with this email already exists' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name || email.split('@')[0]
      }
    })

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email
    })

    // Set HttpOnly cookie
    await setAuthCookie(token)

    return { success: true, user: { id: user.id, email: user.email, name: user.name } }
  } catch (error) {
    console.error('Sign up error:', error)
    return { error: 'An error occurred during sign up' }
  }
}

export async function signIn(email: string, password: string) {
  try {
    if (!email || !email.includes('@')) {
      return { error: 'Please provide a valid email address' }
    }

    if (!password) {
      return { error: 'Please provide a password' }
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (!user) {
      return { error: 'Invalid email or password' }
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return { error: 'Invalid email or password' }
    }

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email
    })

    // Set HttpOnly cookie
    await setAuthCookie(token)

    return { success: true, user: { id: user.id, email: user.email, name: user.name } }
  } catch (error) {
    console.error('Sign in error:', error)
    return { error: 'An error occurred during sign in' }
  }
}

export async function logout() {
  try {
    await clearAuthCookie()
    redirect('/')
  } catch (error) {
    console.error('Logout error:', error)
    return { error: 'An error occurred during logout' }
  }
}
