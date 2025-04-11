import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import Note from "@/models/Note";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req,res) {
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



  const newNote = new Note({title: "love nm", content: "i love naeema vhh", user: userId})

  await newNote.save()

  return NextResponse.json({msg: "note created"})

}