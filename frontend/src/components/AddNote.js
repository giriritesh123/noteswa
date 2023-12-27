import React from 'react'
import { Link } from "react-router-dom";
import'../App.css'
function AddNote() {
  return (
    <div>
        <Link to="/addnote">
            <button type="button" className="btn btn-info addnote">
          Note+
          </button>
        </Link>
    </div>
  );
}

export default AddNote