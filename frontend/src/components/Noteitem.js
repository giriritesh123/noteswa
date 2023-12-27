import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div className="row-md-3">
      <div className="card my-3">
        <div className="card-header">
          <h5 className="d-inline">{note.title}</h5>
        </div>
        <div className="card-body">
          <p className="card-text">{note.description}</p>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: "#0081a5",
              height: "30px",
              display: "inline-flex",
              alignItems: "center",
              border: "none",
              marginRight:"1rem"
            }}
            onClick={() => {
              updateNote(note);
            }}
          >
            Edit
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: "#ff0000",
              height: "30px",
              display: "inline-flex",
              alignItems: "center",
              border: "none",
            }}
            onClick={() => {
              deleteNote(note._id);
            }}
          >
            Delete
          </button>
          {/* <i
            className="fa-regular fa-trash-can mx-2"
            style={{ color: "#000000", cursor: "pointer" }}
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i> */}
          {/* <i
            className="fa-regular fa-pen-to-square"
            style={{ color: "#000000", cursor: "pointer" }}
            onClick={() => {
              updateNote(note);
            }}
          ></i> */}
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
