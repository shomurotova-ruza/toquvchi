export const runtime = 'nodejs';

import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { authCookie, createToken, getCurrentUser } from '@/lib/server/auth';
import { findUserByEmail, safeUser, updateUser } from '@/lib/server/store';

export async function PUT(req: Request) {
  try {
    const current = await getCurrentUser();
    if (!current) return NextResponse.json({ message: 'Avval tizimga kiring.' }, { status: 401 });

    const body = await req.json();
    const firstName = String(body.firstName || '').trim();
    const lastName = String(body.lastName || '').trim();
    const phone = String(body.phone || '').trim();
    const address = String(body.address || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '').trim();

    if (firstName.length < 2 || lastName.length < 2 || phone.replace(/\D/g, '').length < 7 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Ma’lumotlar noto‘g‘ri kiritildi.' }, { status: 400 });
    }

    const exists = await findUserByEmail(email);
    if (exists && exists.id !== current.id) {
      return NextResponse.json({ message: 'Bu email boshqa foydalanuvchida bor.' }, { status: 409 });
    }

    let passwordHash: string | undefined;
    if (password) {
      if (password.length < 6) return NextResponse.json({ message: 'Parol kamida 6 ta belgidan iborat bo‘lsin.' }, { status: 400 });
      const salt = crypto.randomBytes(16).toString('hex');
      passwordHash = `${salt}:${crypto.scryptSync(password, salt, 64).toString('hex')}`;
    }

    const updated = await updateUser(current.id, { firstName, lastName, phone, address, email, ...(passwordHash ? { passwordHash } : {}) });
    if (!updated) return NextResponse.json({ message: 'Foydalanuvchi topilmadi.' }, { status: 404 });

    const token = createToken(updated.id);
    const res = NextResponse.json({ message: 'Profil muvaffaqiyatli yangilandi.', token, user: safeUser(updated) });
    res.cookies.set(authCookie.name, token, authCookie.options);
    return res;
  } catch (error) {
    return NextResponse.json({ message: 'Server xatosi', error: String(error) }, { status: 500 });
  }
}
