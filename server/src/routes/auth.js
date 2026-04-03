const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { findUserByEmail, createUser } = require('../data/store');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'simple_secret_key';

const registerSchema = z.object({
  firstName: z.string().trim().min(2, 'Ism kamida 2 ta harf bo‘lsin.'),
  lastName: z.string().trim().min(2, 'Familya kamida 2 ta harf bo‘lsin.'),
  phone: z.string().trim().min(7, 'Telefon raqam juda qisqa.'),
  address: z.string().trim().optional().default(''),
  email: z.string().email('To‘g‘ri email kiriting.').transform((value) => value.toLowerCase()),
  password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo‘lsin.'),
});

const loginSchema = z.object({
  email: z.string().email('To‘g‘ri email kiriting.').transform((value) => value.toLowerCase()),
  password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo‘lsin.'),
});

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

function safeUser(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    address: user.address || '',
    email: user.email,
  };
}

function zodError(res, err) {
  return res.status(400).json({
    message: 'Kiritilgan ma’lumotda xato bor.',
    errors: err.issues,
  });
}

router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const exists = findUserByEmail(data.email);

    if (exists) {
      return res.status(409).json({ message: 'Bu email allaqachon ro‘yxatdan o‘tgan.' });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      email: data.email,
      passwordHash,
    });

    const token = signToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: 'Ro‘yxatdan muvaffaqiyatli o‘tildi.',
      token,
      user: safeUser(user),
    });
  } catch (err) {
    if (err?.name === 'ZodError') return zodError(res, err);
    return res.status(500).json({ message: 'Server xatosi', error: String(err) });
  }
});

router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = findUserByEmail(data.email);

    if (!user) return res.status(401).json({ message: 'Email yoki parol xato.' });

    const ok = await bcrypt.compare(data.password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Email yoki parol xato.' });

    const token = signToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: 'Tizimga muvaffaqiyatli kirildi.',
      token,
      user: safeUser(user),
    });
  } catch (err) {
    if (err?.name === 'ZodError') return zodError(res, err);
    return res.status(500).json({ message: 'Server xatosi', error: String(err) });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: false });
  res.json({ ok: true });
});

module.exports = router;
