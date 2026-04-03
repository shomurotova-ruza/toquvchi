const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const User = require("../models/User");

const router = express.Router();

const registerSchema = z.object({
  firstName: z.string().trim().min(2, "Ism kamida 2 ta harfdan iborat bo‘lsin."),
  lastName: z.string().trim().min(2, "Familya kamida 2 ta harfdan iborat bo‘lsin."),
  phone: z.string().trim().min(7, "Telefon raqam juda qisqa."),
  address: z.string().trim().optional().default(""),
  email: z.email("To‘g‘ri email kiriting.").transform((value) => value.toLowerCase()),
  password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo‘lsin."),
});

const loginSchema = z.object({
  email: z.email("To‘g‘ri email kiriting.").transform((value) => value.toLowerCase()),
  password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo‘lsin."),
});

function signToken(user, secret) {
  return jwt.sign({ sub: user._id.toString(), email: user.email }, secret, { expiresIn: "7d" });
}

function zodError(res, err) {
  return res.status(400).json({
    message: "Kiritilgan ma’lumotda xato bor.",
    errors: err.issues,
  });
}

router.post("/register", async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const exists = await User.findOne({ email: data.email });
    if (exists) return res.status(409).json({ message: "Bu email allaqachon ro‘yxatdan o‘tgan." });

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      email: data.email,
      passwordHash,
    });

    const token = signToken(user, process.env.JWT_SECRET);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
        email: user.email,
      },
    });
  } catch (err) {
    if (err?.name === "ZodError") return zodError(res, err);
    return res.status(500).json({ message: "Server xatosi", error: String(err) });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await User.findOne({ email: data.email });
    if (!user) return res.status(401).json({ message: "Email yoki parol xato." });

    const ok = await bcrypt.compare(data.password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Email yoki parol xato." });

    const token = signToken(user, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
        email: user.email,
      },
    });
  } catch (err) {
    if (err?.name === "ZodError") return zodError(res, err);
    return res.status(500).json({ message: "Server xatosi", error: String(err) });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax", secure: false });
  res.json({ ok: true });
});

module.exports = router;
