export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getLessonById } from '@/lib/server/store';

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const lesson = await getLessonById(id);
  if (!lesson) return NextResponse.json({ message: 'Dars topilmadi.' }, { status: 404 });
  return NextResponse.json({ lesson });
}
