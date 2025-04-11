"use client";
import axios from "axios";
import {useState, useEffect} from "react";

export default function CreateNoteButton() {
  const createNote = async () => {
    try {
      
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      const res = await axios.post(
        "http://localhost:3000/api/note",
        {
          title: "Love",
          content: "I love Naeema",
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

  const [notes , setNotes] = useState([])

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
    },[])

  return (
    <>
    <button
      onClick={createNote}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Send Note
    </button>

{
  notes.map((note) => (
    <div key={note._id}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  ))
}
    </>
  );
}
