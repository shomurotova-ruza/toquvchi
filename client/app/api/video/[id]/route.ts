export const runtime = 'nodejs';

import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/server/auth';

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ message: 'Avval tizimga kiring.' }, { status: 401 });

  const { id } = await ctx.params;
  const filePath = path.join(process.cwd(), 'public', 'videos', `${id}.mp4`);

  try {
    const stat = await fs.stat(filePath);
    const range = req.headers.get('range');

    if (!range) {
      const file = await fs.readFile(filePath);
      return new NextResponse(file, {
        status: 200,
        headers: {
          'Content-Type': 'video/mp4',
          'Content-Length': String(stat.size),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'no-store',
        },
      });
    }

    const match = /bytes=(\d+)-(\d*)/.exec(range);
    const start = match ? Number(match[1]) : 0;
    const end = match && match[2] ? Number(match[2]) : stat.size - 1;
    if (start >= stat.size || end >= stat.size) {
      return new NextResponse(null, { status: 416, headers: { 'Content-Range': `bytes */${stat.size}` } });
    }
    const handle = await fs.open(filePath, 'r');
    const buffer = Buffer.alloc(end - start + 1);
    await handle.read(buffer, 0, buffer.length, start);
    await handle.close();

    return new NextResponse(buffer, {
      status: 206,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Length': String(buffer.length),
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json({ message: 'Video topilmadi.' }, { status: 404 });
  }
}
