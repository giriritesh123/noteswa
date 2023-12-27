import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  //ye notes aise hi hai pehle testing prpose k liye
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Function for fetching all notes
  const getNotes = async () => {
    //To Do from Api
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json);
  };

  //Function for Adding a Note
  const addNote = async (title, description, tag) => {
    //To Do from Api
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
    // console.log("Adding a new note")
  };

  //Function for Deleting a Note
  const deleteNote = async (id) => {
    //To Do from API
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });
    // eslint-disable-next-line
    const json = await response.json();
    // eslint-disable-next-line
    // console.log(json)

    // console.log("Deleting node with id " + id)
    //deleting note
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNotes);
  };
  //Function for Adding a Note
  const editNote = async (id, title, description, tag) => {
    ///To Do Api Calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    // console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit in client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
