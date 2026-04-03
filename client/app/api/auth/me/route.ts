export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/server/auth';
import { safeUser } from '@/lib/server/store';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ message: 'Avval tizimga kiring.' }, { status: 401 });
  return NextResponse.json({ user: safeUser(user) });
}
