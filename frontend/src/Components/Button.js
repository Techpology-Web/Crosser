import React, {useState} from "react"

export default function Button(props){
  

  return (
    <button
      className={`duration-100 p-2 font-medium rounded-lg w-full text-white bg-[#7165FF] hover:bg-[#9287dd] ${props.className ? props.className : ""} `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
