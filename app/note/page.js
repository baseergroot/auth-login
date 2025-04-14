"use client";
import axios from "axios";
import {useState, useEffect} from "react";

export default function CreateNoteButton() {
  const [notes , setNotes] = useState([])
  const [noteId, setnoteId] = useState("")

  const createNote = async (e) => {
    try {
      
      console.log("title is  :", e.get("title"))

      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      const res = await axios.post(
        "http://localhost:3000/api/note",
        {
          title: e.get("title"),
          content: e.get("content"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Note created!", res.data);
      alert("Note sent");
    } catch (err) {
      console.error("Error creating note:", err);
      alert("Failed to send note 😢");
    }
  };


  const ctrleffect = "0"
    useEffect(() => {
      axios.get("http://localhost:3000/api/shownotes")
      .then((res) => {
        console.log("response is :", res.data)
        setNotes(res.data.notes)
        console.log("setnote is :" , notes)
      })
      .catch((err) => {
        console.log("error is :", err)
        })
    },[ctrleffect])

    const remove = (id) => {
      console.log("note id  is", id)
      axios.delete("http://localhost:3000/api/delete",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            noteId: id,
          },
        }
      )
      .then((res) => {console.log(res)})
      .catch((err) => {console.log(err)})
    }

  return (
    <>
    <form action={createNote} className="flex flex-col gap-1 w-[80vw] items-center my-5">
      <input type="text" name="title" className="bg-orange-400 rounded px-2" placeholder="Title"/>
      <input type="text" name="content" className="bg-orange-400 rounded px-2" placeholder="Content"/>
      <button
      onClick={createNote}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Send Note
    </button>
    </form>

{
  notes.map((note) => (
    <div key={note._id}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={() => {remove(note._id)}} className="bg-orange-500 px-3 py-1 rounded">Delete</button>
    </div>
  ))
}
    </>
  );
}
