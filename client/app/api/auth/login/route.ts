export const runtime = 'nodejs';

import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { authCookie, createToken } from '@/lib/server/auth';
import { findUserByEmail, safeUser } from '@/lib/server/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 6) {
      return NextResponse.json({ message: 'Email yoki parol xato.' }, { status: 401 });
    }

    const user = await findUserByEmail(email);
    if (!user) return NextResponse.json({ message: 'Email yoki parol xato.' }, { status: 401 });

    const [salt, expectedHash] = user.passwordHash.split(':');
    const actualHash = crypto.scryptSync(password, salt, 64).toString('hex');
    if (actualHash !== expectedHash) {
      return NextResponse.json({ message: 'Email yoki parol xato.' }, { status: 401 });
    }

    const token = createToken(user.id);
    const res = NextResponse.json({ message: 'Tizimga muvaffaqiyatli kirildi.', token, user: safeUser(user) });
    res.cookies.set(authCookie.name, token, authCookie.options);
    return res;
  } catch (error) {
    return NextResponse.json({ message: 'Server xatosi', error: String(error) }, { status: 500 });
  }
}
