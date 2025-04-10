import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req, res) {
  await connectDB();

  const user = await req.json();
  console.log("request user login : ", user);

  const { username, password } = user;

  const checkUser = await User.findOne({ username });
  if (!checkUser) {
    return new Response("User not found", { status: 404 });
  }
  const isValidPassword = await bcrypt.compare(password, checkUser.password);

  console.log("result is ", isValidPassword)

  if(isValidPassword){
    const token = jwt.sign( checkUser.username , "shhhhh");
      console.log("token is : ", token);
    
      // const cookieStore = cookies(); // this is already fine, but in some versions:
      const cookieStore = await cookies();
    
      cookieStore.set("token", token);
    
      return NextResponse.json({ msg: "loggeed  in", success: true });
  }

}
