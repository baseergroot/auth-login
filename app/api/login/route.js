import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'
import connectDB from "@/lib/mongodb"
import User from "@/models/User"


export async function POST(req, res) {

  // await connectDB();

  const user = await req.json()
  console.log("request user login : ", user)
  const { username, password } = user

  const checkUser = 

}