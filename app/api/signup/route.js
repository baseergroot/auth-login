import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(req, res) {

    await connectDB();

    const user = {
        username: "baseerdd",
        password: "shuw829833u"
    }

    const { username, password } = user

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            // Store hash in your password DB.
            console.log("hash pass  is : ", hash)
            const userexist = await User.findOne({ username })
            if (userexist) {
                console.log("user already exist")
                return NextResponse.json({ message: 'Username already exists' });
            }
            else {
                const user = new User({ username, password: hash });
                await user.save();
                return NextResponse.json({ message: 'User created successfully' });
            }
        });
    });

    const token = jwt.sign({ username }, 'shhhhh');
    console.log("token is : ", token)

    // const cookieStore = cookies(); // this is already fine, but in some versions:
    const cookieStore = await cookies();

    // 3. Set token as cookie (no options!)
    cookieStore.set("token", token);


    return NextResponse.json({ msg: "hello from route", success: true, })
}