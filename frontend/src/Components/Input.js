
import React, {useState} from "react"
import {GoEye, GoEyeClosed} from "react-icons/go"

export default function Input(props){

  const [showPassword, setShowPassword] = useState(props.type!=="password");
  const [rawValue, setRawValue] = useState("");
  const [value, setValue] = useState("");

  const isPass = () => {
    if(!showPassword){
      return "password"
    }
    else if (showPassword && props.type==="password"){
      return "text"
    }
    else {
      return (props.type ? props.type : "")
    }
  }
  
  const onKeyDown = (e) => {
    const key = e.key;
    if (key === "Enter") {
      if(props.trigger){
        props.trigger(props.value);
        props.onChange("");
      }
    }
    try {
      props.onKeyDown(e);
    } catch (error) {}
  }
  

  return (
    <div className="relative flex items-center w-full bg-[#fefefe] rounded-lg border border-1 px-3 py-2 outline-1" >
      {props.icon?props.icon:null}
      <input  
        className="w-full ml-2 outline-none text-[#555555  "
        placeholder={`${props.placeholder?props.placeholder:""}`}
        onKeyDown={onKeyDown}
        onChange={e=>props.onChange ? props.onChange(e.target.value) : null}
        value={props.value}
        type={isPass()}
      />
      <GoEyeClosed 
        onClick={()=>{setShowPassword(true)}}
        size={20} 
        className={` ${showPassword || props.type !== "password"?"hidden":""} absolute right-4 cursor-pointer text-[#727272] `} />
      <GoEye 
        onClick={()=>{setShowPassword(false)}}
        size={20} 
        className={` ${!showPassword || props.type !== "password"?"hidden":""} absolute right-4 cursor-pointer text-[#727272] `} />
    </div>
  );
}
