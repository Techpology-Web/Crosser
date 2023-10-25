import React ,{useState, useEffect} from "react"
import MenuItem from "./Components/MenuItem.js"
import Searchbar from "./Components/Searchbar.js"
import {AiOutlineArrowRight, AiOutlineArrowLeft} from "react-icons/ai"
import axois from "./axiost"

export default function AdminContainer(props){

  const [open, setOpen] = useState(true)
  const[isAdmin, setIsAdmin] = useState(true)
  useEffect(()=>{
    if(window.screen.width < 768){
      setOpen(false)
    }
    axois.post("identification/get_user_info/")
         .then(r=>{
           setIsAdmin(r.data.is_admin)
         })
         .catch(error=>console.error)

  },[])


  return (
    <div className="flex flex-row w-screen h-screen relative bg-[#F4F4F8]  " >
      <div className={`p-4 h-full w-[320px] duration-100 fixed md:relative z-10 ${ open ? "" : "scale-0 -mr-[320px]"}`}  >
        <div className="p-4 shadow-lg w-full bg-[#fefefe] rounded-3xl h-full " >
          <div className="flex flex-row gap-1 items-center mb-10" >
            <img src={"./logo.png"} alt="Logo" />
            <h1 className="text-3xl" >Cross</h1>
          </div>

          <div className="flex flex-col gap-4" >
            <MenuItem path="/"  >Dashboard</MenuItem>
 {(isAdmin? <MenuItem path="/God"  >God View</MenuItem>:<></>)}
            <MenuItem path="/Compress"  >Compress</MenuItem>
            <MenuItem path="/Decompress"  >Decompress</MenuItem>
            <MenuItem path="/Share"  >Share Files</MenuItem>
            <MenuItem path="/Signin" >Logout</MenuItem>
          </div>


        </div>
      </div>
      <div 
        onClick={()=>setOpen(!open)}
        className={`absolute ${open ? "" : "-left-3 "} hover:bg-slate-50 bottom-8 z-20 bg-white shadow-lg hover:scale-110 select-none cursor-pointer duration-100 rounded-full flex items-center justify-center w-[50px] h-[50px]`}>
        {(open?<AiOutlineArrowLeft/>:<AiOutlineArrowRight />)}
        
      </div>
      <div className="flex flex-col p-2 w-full gap-0" >
        <Searchbar />

        {props.children}
      </div>

    </div>
  );
}

