const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_PATH = path.join(__dirname, 'db.json');

const defaultData = {
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

function ensureDb() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2), 'utf8');
  }
}

function readDb() {
  ensureDb();
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function makeId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getUserById(id) {
  const db = readDb();
  return db.users.find((user) => user.id === id) || null;
}

function findUserByEmail(email) {
  const db = readDb();
  return db.users.find((user) => user.email === email.toLowerCase()) || null;
}

function createUser(user) {
  const db = readDb();
  const now = new Date().toISOString();
  const newUser = {
    id: makeId(),
    createdAt: now,
    updatedAt: now,
    ...user,
    email: user.email.toLowerCase(),
  };
  db.users.push(newUser);
  writeDb(db);
  return newUser;
}

function updateUser(id, updates) {
  const db = readDb();
  const index = db.users.findIndex((user) => user.id === id);
  if (index === -1) return null;

  const current = db.users[index];
  const nextUser = {
    ...current,
    ...updates,
    email: (updates.email || current.email).toLowerCase(),
    updatedAt: new Date().toISOString(),
  };

  db.users[index] = nextUser;
  writeDb(db);
  return nextUser;
}

function getLessons({ cat, level, q }) {
  const db = readDb();
  return db.lessons.filter((lesson) => {
    if (!lesson.isPublished) return false;
    if (cat && cat !== 'all' && lesson.category !== cat) return false;
    if (level && level !== 'Barchasi' && lesson.level !== level) return false;
    if (q && q.trim() && !lesson.title.toLowerCase().includes(q.trim().toLowerCase())) return false;
    return true;
  });
}

function getLessonById(id) {
  const db = readDb();
  return db.lessons.find((lesson) => lesson.id === id && lesson.isPublished) || null;
}

module.exports = {
  ensureDb,
  readDb,
  writeDb,
  getUserById,
  findUserByEmail,
  createUser,
  updateUser,
  getLessons,
  getLessonById,
  defaultData,
};
