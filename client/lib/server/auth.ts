import crypto from 'crypto';
import { cookies } from 'next/headers';
import { getUserById } from './store';

const SECRET = process.env.JWT_SECRET || 'simple_secret_key';
const COOKIE_NAME = 'token';

function sign(value: string) {
  return crypto.createHmac('sha256', SECRET).update(value).digest('hex');
}

export function createToken(userId: string) {
  const payload = Buffer.from(JSON.stringify({ userId, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }), 'utf8').toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token?: string | null) {
  if (!token) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  if (sign(payload) !== sig) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { userId: string; exp: number };
    if (!parsed?.userId || !parsed?.exp || Date.now() > parsed.exp) return null;
    return parsed.userId;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value || null;
  const userId = verifyToken(token);
  if (!userId) return null;
  return getUserById(userId);
}

export const authCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: true,
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  },
};
