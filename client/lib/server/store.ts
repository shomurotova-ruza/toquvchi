import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  passwordHash: string;
};

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  level: string;
  category: string;
  videoId: string;
  isPublished: boolean;
};

type Db = { users: User[]; lessons: Lesson[] };

const defaultData: Db = {
  users: [],
  lessons: [
    { id: 'b1', title: '1-dars: To‘qish uchun kerakli asboblar', duration: '12:31', level: 'Boshlovchi', category: 'beginner', videoId: 'b1', isPublished: true },
    { id: 'b2', title: '2-dars: Iplarni qanday tanlash', duration: '08:45', level: 'Boshlovchi', category: 'beginner', videoId: 'b2', isPublished: true },
    { id: 'c1', title: '1-dars: Zanjircha to‘qish', duration: '08:27', level: 'O‘rta', category: 'crochet', videoId: 'c1', isPublished: true },
    { id: 'c2', title: '2-dars: Halqa shaklida boshlash', duration: '08:22', level: 'Boshlovchi', category: 'crochet', videoId: 'c2', isPublished: true },
    { id: 'k1', title: '1-dars: Spitsni ushlash va boshlash', duration: '10:10', level: 'Boshlovchi', category: 'knitting', videoId: 'k1', isPublished: true },
    { id: 'k2', title: '2-dars: Oddiy naqsh (rezinka)', duration: '09:05', level: 'O‘rta', category: 'knitting', videoId: 'k2', isPublished: true }
  ]
};

function dbPath() {
  return process.env.VERCEL ? '/tmp/toquvchi-db.json' : path.join(process.cwd(), 'data.local.json');
}

async function ensureDb() {
  const file = dbPath();
  try {
    await fs.access(file);
  } catch {
    await fs.writeFile(file, JSON.stringify(defaultData, null, 2), 'utf8');
  }
  return file;
}

async function readDb(): Promise<Db> {
  const file = await ensureDb();
  const raw = await fs.readFile(file, 'utf8');
  return JSON.parse(raw) as Db;
}

async function writeDb(data: Db) {
  const file = await ensureDb();
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

export function safeUser(user: User) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    address: user.address || '',
    email: user.email,
  };
}

export async function findUserByEmail(email: string) {
  const db = await readDb();
  return db.users.find((u) => u.email === email.toLowerCase()) || null;
}

export async function getUserById(id: string) {
  const db = await readDb();
  return db.users.find((u) => u.id === id) || null;
}

export async function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  const db = await readDb();
  const now = new Date().toISOString();
  const user: User = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    ...data,
    email: data.email.toLowerCase(),
  };
  db.users.push(user);
  await writeDb(db);
  return user;
}

export async function updateUser(id: string, updates: Partial<User>) {
  const db = await readDb();
  const index = db.users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const current = db.users[index];
  const nextUser: User = {
    ...current,
    ...updates,
    email: (updates.email || current.email).toLowerCase(),
    updatedAt: new Date().toISOString(),
  };
  db.users[index] = nextUser;
  await writeDb(db);
  return nextUser;
}

export async function getLessons(params: { cat?: string | null; level?: string | null; q?: string | null }) {
  const db = await readDb();
  const { cat, level, q } = params;
  return db.lessons.filter((lesson) => {
    if (!lesson.isPublished) return false;
    if (cat && cat !== 'all' && lesson.category !== cat) return false;
    if (level && level !== 'Barchasi' && lesson.level !== level) return false;
    if (q && q.trim() && !lesson.title.toLowerCase().includes(q.trim().toLowerCase())) return false;
    return true;
  });
}

export async function getLessonById(id: string) {
  const db = await readDb();
  return db.lessons.find((lesson) => lesson.id === id && lesson.isPublished) || null;
}
