"use client";

import axios from "axios";
import Link from "next/link";

const page = () => {
  const submit = (e) => {
    const user = {
      username: e.get("username"),
      password: e.get("password"),
    };
    axios
      .post("http://localhost:3000/api/login",  user )
      .then((response) => {
        console.log("response is : ", response);
      })
      .catch((err) => {
        console.log("error is : ", err);
      });
  };
  return (
    <>
      <div className="flex items-center flex-col gap-10 pt-10">
        <h1>Login</h1>
        <form action={submit} className="flex flex-col gap-2 w-[100vw] items-center">
          <input type="text" name="username"  className="rounded px-2 py-2 w-1/2 outline-none bg-amber-300 text-black" placeholder="username"/>
          <input type="password" name="password" className="rounded px-2 py-2 w-1/2 outline-none bg-amber-300  text-black"  placeholder="password"/>
          <button className="bg-blue-700 px-5 py-2 rounded font-bold cursor-pointer">submit</button>
        </form>
        <p>Don't have an account yet, <Link href={"/signup"} className="text-blue-600">Sign Up</Link> </p>
      </div>
    </>
  );
};

export default page;
