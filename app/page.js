"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("hello")
  useEffect(() => {
    axios.post('http://localhost:3000/api/signup')
    .then((response) => {
      setData(response.data.msg)
      console.log(response)})
      .catch((error) => {
        console.log("error is : ", error)
      })
    }
    )
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    {data}
    </div>
  );
}
