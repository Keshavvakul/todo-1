import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}

export function signToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return (jwt.sign as any)(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export async function getCurrentUser(): Promise<{ id: string; email: string; name: string | null } | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return null
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return null
    }

    // Verify user still exists in database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true }
    })

    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}
