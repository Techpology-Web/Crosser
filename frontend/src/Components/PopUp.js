import React from "react"


export default function PopUp(props){

  return(
    <div className={`fixed flex flex-col justify-center items-center left-0 z-20 top-0 bg-black bg-opacity-25 h-screen w-screen ${props.on?"":"hidden"}`}>
        <div className="flex flex-col items-center p-4 rounded-lg justify-center w-1/4  bg-white">
            {props.children}
        </div>
      </div>

  )
}
