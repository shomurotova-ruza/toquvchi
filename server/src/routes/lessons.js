const express = require('express');
const { getLessons, getLessonById } = require('../data/store');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const lessons = getLessons(req.query);
    return res.json({ lessons });
  } catch (e) {
    console.error('LESSONS LIST ERROR:', e);
    return res.status(500).json({ message: 'Server xatosi' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const lesson = getLessonById(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Dars topilmadi' });
    return res.json({ lesson });
  } catch (e) {
    console.error('LESSON GET ERROR:', e);
    return res.status(500).json({ message: 'Server xatosi' });
  }
});

module.exports = router;
