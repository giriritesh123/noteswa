import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import NoNotes from "./NoNotes";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem("token")){
    getNotes();
    }
    //eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
    // console.log(note);
  };

  const handleClick = (e) => {
    // console.log("Updating the note", note);
    editNote(note.id, note.title, note.description, note.tag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group mb-3">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                    value={note.title !== undefined ? note.title : ""}
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
                    value={
                      note.description !== undefined ? note.description : ""
                    }
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
                    value={note.tag !== null ? note.tag : ""}
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                disabled={note.title.length < 5 || note.description.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3 mx-5">
        {notes.length === 0 && <NoNotes />}
        {notes.length !== 0 && <h1>Your Notes</h1>}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
