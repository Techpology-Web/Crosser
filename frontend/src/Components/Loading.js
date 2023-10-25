import React from "react"
import PacmanLoader from "react-spinners/PacmanLoader"
import logo from './load.gif'

export default function Loading(props){

  if(props.on){
    return(
      <div className="flex items-center justify-center fixed top-0 left-0 bg-opacity-50 w-screen h-screen z-40 bg-white" >
        <img className="w-[250px] h-[170px]" src={logo} alt="loading..." />
      </div>
    )
  }
  return null
}
