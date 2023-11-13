import React, { useEffect  } from "react"
import { useNavigate } from "react-router-dom"
import { setCookie } from "../CookieHandler"



export default function(props){

  const navigate = useNavigate()

  useEffect(()=>{
    setCookie("sessionKey","");
    navigate("/signin")
  },[])

  return(
    <div></div>
  );
}
