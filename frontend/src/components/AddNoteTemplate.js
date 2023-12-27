import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { Link } from "react-router-dom";


function AddNoteTemplate() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form className="my-3">
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Title"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Description"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Tag"
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <button
        disabled={note.title.length<5||note.description.length<5}
          type="submit"
          className="btn btn-primary my-1"
          onClick={handleClick}
        >
          <Link
            style={{
              color: "white",
              textDecoration: "none",
            }}
            to="/home"
          >
            Add Note
          </Link>
        </button>
      </form>
    </div>
  );
}

export default AddNoteTemplate;
