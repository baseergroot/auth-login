import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Note from '@/models/Note';
import connectDB from "@/lib/mongodb";


export async function GET() {
  await connectDB();

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

  if(!token) {
    return NextResponse.json({ msg: 'Unauthorized (No token)', success: false }, { status: 401 });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
  console.log("notes is  :", notes)

  return NextResponse.json({ notes, success: true });

  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({ msg: 'Failed to fetch notes', success: false }, { status: 500 });
  }
}