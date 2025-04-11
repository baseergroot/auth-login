"use client"

import React, {useState} from 'react'
import axios from 'axios'

const page = () => {

  const [notes , setNotes] = useState([])

  const show = () => {
    axios.get("http://localhost:3000/api/shownotes")
    .then((res) => {
      console.log("response is :", res.data)
      setNotes(res.data.notes)
      console.log("setnote is :" , notes)
    })
    .catch((err) => {
      console.log("error is :", err)
      })
  }

  return (
    <div>
      <h1>notes</h1>
      <button onClick={show} className='bg-orange-500 rounded px-1 px-4 cursor-pointer'>show</button>
      {
        notes.map((note) => (
          <div key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))
      }
    </div>
  )
}

export default page