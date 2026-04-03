const express = require("express");
const Lesson = require("../models/Lesson");

const router = express.Router();

// GET /api/lessons?cat=beginner&level=Boshlovchi&q=...
router.get("/", async (req, res) => {
  try {
    const { cat, level, q } = req.query;

    const filter = { isPublished: true };

    if (cat && cat !== "all") filter.category = cat;
    if (level && level !== "Barchasi") filter.level = level;

    if (q && q.trim()) {
      filter.title = { $regex: q.trim(), $options: "i" };
    }

    const lessons = await Lesson.find(filter).sort({ createdAt: -1 }).lean();
    return res.json({ lessons });
  } catch (e) {
    console.error("LESSONS LIST ERROR:", e);
    return res.status(500).json({ message: "Server xatosi" });
  }
});

// GET /api/lessons/b1
router.get("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findOne({
      id: req.params.id,
      isPublished: true,
    }).lean();

    if (!lesson) return res.status(404).json({ message: "Dars topilmadi" });
    return res.json({ lesson });
  } catch (e) {
    console.error("LESSON GET ERROR:", e);
    return res.status(500).json({ message: "Server xatosi" });
  }
});

module.exports = router;