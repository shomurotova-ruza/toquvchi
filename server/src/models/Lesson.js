const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true }, // b1, b2...
    title: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true }, // "12:31"
    level: {
      type: String,
      required: true,
      enum: ["Boshlovchi", "O‘rta", "Professional"],
    },
    category: {
      type: String,
      required: true,
      enum: ["beginner", "crochet", "knitting"],
    },
    videoId: { type: String, required: true, trim: true }, // b1 (mp4 nomi)
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", LessonSchema);