require("dotenv").config();
const { connectDB } = require("./db");
const Lesson = require("./models/Lesson");

const seedLessons = [
  { id: "b1", title: "1-dars: To‘qish uchun kerakli asboblar", duration: "12:31", level: "Boshlovchi", category: "beginner", videoId: "b1", isPublished: true },
  { id: "b2", title: "2-dars: Iplarni qanday tanlash", duration: "08:45", level: "Boshlovchi", category: "beginner", videoId: "b2", isPublished: true },

  { id: "c1", title: "1-dars: Zanjircha to‘qish", duration: "08:27", level: "O‘rta", category: "crochet", videoId: "c1", isPublished: true },
  { id: "c2", title: "2-dars: Halqa shaklida boshlash", duration: "08:22", level: "Boshlovchi", category: "crochet", videoId: "c2", isPublished: true },

  { id: "k1", title: "1-dars: Spitsni ushlash va boshlash", duration: "10:10", level: "Boshlovchi", category: "knitting", videoId: "k1", isPublished: true },
  { id: "k2", title: "2-dars: Oddiy naqsh (rezinka)", duration: "09:05", level: "O‘rta", category: "knitting", videoId: "k2", isPublished: true },
];

async function run() {
  await connectDB(process.env.MONGO_URI);

  for (const l of seedLessons) {
    await Lesson.updateOne({ id: l.id }, { $set: l }, { upsert: true });
  }

  console.log("✅ Seed done:", seedLessons.length);
  process.exit(0);
}

run().catch((e) => {
  console.error("❌ Seed error:", e);
  process.exit(1);
});