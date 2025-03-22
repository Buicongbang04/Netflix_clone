import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";


const App = () => {

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is signed in");
        navigate('/');
      } else {
        console.log("User is signed out");
        navigate('/login');
      }
    });
  }
  , []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Netflix_clone" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  )
}

export default App;