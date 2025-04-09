"use client"

import axios from "axios"
import Link from "next/link"

const page = () => {
  const submit = (e) => {
    const user = {
      username: e.get("username"),
      password: e.get("password")
    }
    axios.post("http://localhost:3000/api/signup", {user})
    .then((response) => {console.log("response is : ",response)})
    .catch((err) => {console.log("error is : " , err)})
    
  }
  return (
    <form action={submit}>
      <input type="text" name="username" id="" />
      <input type="password" name="password" id="" />
      <button>submit</button>
      <p>Already have an account, <Link href={"/login"} className="text-blue-600">Login</Link> </p>
    </form>
  )
}

export default page