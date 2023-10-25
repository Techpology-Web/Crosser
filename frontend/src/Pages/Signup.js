import React, { useState, useEffect} from "react"
import Input from "../Components/Input.js"
import Button from "../Components/Button.js"
import { Outlet, Link } from "react-router-dom";
import axois from "../axiost"
import { setCookie  } from "../CookieHandler"
import { changeUrl } from "../global_func.js";


export default function Signup(props){
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [error, setError] = useState("");


  const signup = () =>{
    axois.post("identification/create_user/",{
      username:username,
      password:password
    })
      .then(r=>{
        changeUrl("signin")
      })
      .catch(error=>{
        setError(error.response.data.code)
      });
  }

  return (
    <div className=" flex justify-center items-center bg-[#F4F4F8] w-screen h-screen " >
      <div className="flex flex-col w-[90%] sm:w-1/2 xl:w-1/4 items-center gap-4 bg-[#fefefe] p-8 rounded-xl shadow-lg " >
        <img src="./logo.png" className="w-[80px]" />
        <div className="flex flex-col items-start w-full">
          <h1 className="text-[#727272] text-2xl" >Your compressing life starts here</h1>
          <h1 className="text-[#727272]" >Make your life easier and register</h1>
        </div>
        <Input placeholder="Username"                         value={username} onChange={setUsername}/>
        <Input placeholder="Password"        type="password"  value={password1} onChange={setPassword1}/>
        <Input placeholder="Retype Password" type="password"  value={password} onChange={setPassword}/>
        <h1 className="text-red-400" >{error}</h1>
        <div className="flex flex-row gap-2 items-start" >
          <h1 className="text-[#727272]" >Already have an accound?</h1>
          <Link to="/signin" className="duration-100 cursor-pointer hover:text-[#8176ee] text-[#7165ff]" >Sign in instead</Link>
        </div>
        <Button onClick={signup} >SIGN UP</Button>
      </div>
    </div>
  );
}

