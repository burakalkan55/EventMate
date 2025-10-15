import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const ok = await bcrypt.compare(password || "", user.password || "");
  if (!ok) return NextResponse.json({ error: "Invalid password" }, { status: 401 });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: "1d" }
  );

  const res = NextResponse.json({ message: "ok" });
  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: false,          // ← DEV ortamında false. Prod’da true yap.
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,   // 1 gün
  });
  return res;
}
