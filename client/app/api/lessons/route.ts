export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getLessons } from '@/lib/server/store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lessons = await getLessons({
    cat: searchParams.get('cat'),
    level: searchParams.get('level'),
    q: searchParams.get('q'),
  });
  return NextResponse.json({ lessons });
}
