import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNoteTemplate from "./components/AddNoteTemplate";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Landingpage from "./components/Landingpage";

function App() {
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landingpage />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            {/* This route is for adding new note. */}
            <Route exact path="/addnote" element={<AddNoteTemplate />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landingpage />} exact />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
