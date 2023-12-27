import React from "react";
import Notes from "./Notes"
import "../App.css"
import AddNote from "./AddNote";

const Home=()=> {
  return (
    <>
      <Notes />
      <AddNote/>
    </>
  );
}

export default Home;
