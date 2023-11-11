import logo from './logo.svg';
import './App.css';
import {useEffect} from "react"
import axios from "./axiost"
import {setCookie} from "./CookieHandler.js"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
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
      <Switch>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/God" element={<God />}></Route>
        <Route path="/settings" element={<Home />}></Route>
        <Route path="/compress" element={<Compress />}></Route>
        <Route path="/decompress" element={<Decompress />}></Route>
        <Route path="/share" element={<Share />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
