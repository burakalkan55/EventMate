import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // ← robust cookie okuma


import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as { id: string };
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, bio: true, image: true, interests: true },
    });
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as { id: string };
    const body = await req.json();
    const user = await prisma.user.update({
      where: { id },
      data: { bio: body.bio ?? undefined, image: body.image ?? undefined, name: body.name ?? undefined },
      select: { id: true, name: true, email: true, bio: true, image: true, interests: true },
    });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
