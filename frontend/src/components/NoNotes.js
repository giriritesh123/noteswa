import React from "react";
function NoNotes() {
  return (
    <div>
      <div className="container d-flex flex-column">
        <h1
          style={{
            textAlign: "center",
            color: "grey",
          }}
        >
          You don't have any notes to display!
        </h1>
      </div>
    </div>
  );
}

export default NoNotes;
