import React, { useState,useEffect } from "react"
import Input from "../Components/Input.js"
import Button from "../Components/Button.js"
import Checkbox from "../Components/Checkbox.js"
import { Outlet, Link, useNavigate } from "react-router-dom";
import axois from "../axiost"
import {setCookie} from "../CookieHandler.js"
import Loading from "../Components/Loading.js";

export default function Signup(props){
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [long,setLong] = useState(0);
  const [lat,setLat] = useState(0);
  const [loading, setLoading] = useState(false)


  const setLocation = () => {
    console.log("set")
    navigator.geolocation.getCurrentPosition(function(position) {
      setLong(position.coords.latitude);
      setLat(position.coords.longitude);
    });
  }

  useEffect(()=>{

  })

  const navigate = useNavigate();

  const gin = (long,lat) =>{

    axois.post("identification/log_in/",{
        username:username,
        password:password,
        long:long,
        lat:lat,
      })
        .then(r=>{

          setLoading(false)
          setCookie("sessionKey",r.data.sessionKey)
          navigate.navigate("/home")

        })
        .catch(error=>{
          setLoading(false);
          setError(error.response.data.code)
          setUsername("");
        });

  }

  const signin = () =>{
    setLoading(true)
    if ("geolocation" in navigator) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(

        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          gin(long,lat);

        },
        (error) => {
          setError("Error getting user location:", error);
        }
      );
    }
  else {

    // Geolocation is not supported by the browser
    setError("Geolocation is not supported by this browser.");
  }
  }
    
  return (
    <div className=" flex justify-center items-center bg-[#F4F4F8] w-screen h-screen " >
      <Loading on={loading} />
      <div className="flex flex-col w-[90%] sm:w-1/2 xl:w-1/4 items-center gap-4 bg-[#fefefe] p-8 rounded-xl shadow-lg " >
        <img src="./logo.png" className="w-[80px]" />
        <div className="flex flex-col items-start w-full">
          <h1 className="text-[#727272] text-2xl" >Welcome to Cross</h1>
          <h1 className="text-[#727272]" >The app that makes your problems tini:er</h1>
        </div>

        <Input placeholder="Username"                         value={username} onChange={setUsername} trigger={signin}/>
        <Input placeholder="Password"        type="password"  value={password} onChange={setPassword} trigger={signin}/>

        <h1 className="text-red-400" >{error}</h1>
        <Checkbox value={remember} onChange={setRemember} label="Remember me"/>

        <div className="flex flex-row gap-2 w-full items-center " >
          <h1 className="text-[#727272] text-lg " >Don't have an accound?</h1>
          <Link to="/Signup" className="duration-100 cursor-pointer hover:text-[#8176ee] text-[#7165ff]" >Sign up instead</Link>
        </div>
        <Button onClick={signin} >SIGN IN</Button>
      </div>
    </div>
  );
}

