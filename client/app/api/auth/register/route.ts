export const runtime = 'nodejs';

import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { authCookie, createToken } from '@/lib/server/auth';
import { createUser, findUserByEmail, safeUser } from '@/lib/server/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const firstName = String(body.firstName || '').trim();
    const lastName = String(body.lastName || '').trim();
    const phone = String(body.phone || '').trim();
    const address = String(body.address || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    const errors: Array<{ path: string[]; message: string }> = [];
    if (firstName.length < 2) errors.push({ path: ['firstName'], message: 'Ism kamida 2 ta harf bo‘lsin.' });
    if (lastName.length < 2) errors.push({ path: ['lastName'], message: 'Familya kamida 2 ta harf bo‘lsin.' });
    if (phone.replace(/\D/g, '').length < 7) errors.push({ path: ['phone'], message: 'Telefon raqam juda qisqa.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push({ path: ['email'], message: 'To‘g‘ri email kiriting.' });
    if (password.length < 6) errors.push({ path: ['password'], message: 'Parol kamida 6 ta belgidan iborat bo‘lsin.' });
    if (errors.length) return NextResponse.json({ message: 'Kiritilgan ma’lumotda xato bor.', errors }, { status: 400 });

    const exists = await findUserByEmail(email);
    if (exists) return NextResponse.json({ message: 'Bu email allaqachon ro‘yxatdan o‘tgan.' }, { status: 409 });

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    const passwordHash = `${salt}:${hash}`;

    const user = await createUser({ firstName, lastName, phone, address, email, passwordHash });
    const token = createToken(user.id);
    const res = NextResponse.json({ message: 'Ro‘yxatdan muvaffaqiyatli o‘tildi.', token, user: safeUser(user) }, { status: 201 });
    res.cookies.set(authCookie.name, token, authCookie.options);
    return res;
  } catch (error) {
    return NextResponse.json({ message: 'Server xatosi', error: String(error) }, { status: 500 });
  }
}
