import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Note from "@/models/Note";
import { cookies } from "next/headers";

export async function DELETE(req) {
  await connectDB()

  const cookieStore = await cookies();
  
    const token = cookieStore.get("token")?.value;
  
    console.log("note tkn is :", token)
  
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("JWT error:", err);
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
  
  const userId = decoded.id;

  const data = await req.json()

  const {noteId} = data
  console.log("fr data is : ", noteId)

  const deletedNote = await Note.findOneAndDelete({
    _id: noteId,
    user: userId,
  });
  
  return NextResponse.json({id:data})
}