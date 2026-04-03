require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const { ensureDb } = require('./data/store');

const authRoutes = require('./routes/auth');
const lessonsRoutes = require('./routes/lessons');
const videoRoutes = require('./routes/video');

const app = express();
const port = process.env.PORT || 4000;

ensureDb();

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, true);
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Range'],
    exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length'],
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Server ishlayapti' });
});

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonsRoutes);
app.use('/api/video', videoRoutes);

app.listen(port, () => {
  console.log(`✅ API running: http://localhost:${port}`);
});
