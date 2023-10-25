import React from "react"



export default function Card(props){

  return (
    <div className={` bg-[#fefefe] rounded-xl shadow-md p-4 ${props.className}`} >
      {props.children}
    </div>
  );
}
