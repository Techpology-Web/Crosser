import logo from './logo.svg';
import './App.css';
import {useEffect} from "react"
import axios from "./axiost"
import {setCookie} from "./CookieHandler.js"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.js"
import Share from "./Pages/Share.js"
import Compress from "./Pages/Compress.js"
import Decompress from "./Pages/Decompress.js"
import Signup from "./Pages/Signup.js"
import Signin from "./Pages/Signin.js"
import God from "./Pages/God"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/God" element={<God />}></Route>
        <Route exact path="/settings" element={<Home />}></Route>
        <Route exact path="/compress" element={<Compress />}></Route>
        <Route exact path="/decompress" element={<Decompress />}></Route>
        <Route exact path="/share" element={<Share />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/signin" element={<Signin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
