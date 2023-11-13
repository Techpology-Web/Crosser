import React ,{useState, useEffect} from "react"
import { HiUserCircle } from "react-icons/hi2"
import MenuItem from "./Components/MenuItem.js"
import Searchbar from "./Components/Searchbar.js"
import { changeUrl } from "./global_func.js";

import {AiOutlineArrowRight, AiOutlineArrowLeft,AiOutlineClose } from "react-icons/ai"
import axois from "./axiost"

export default function AdminContainer(props){

  const [open, setOpen] = useState(true)
  const [isAdmin, setIsAdmin] = useState(true)
  const [name, setName] = useState("")
  const [mobile,setMobile] = useState(false);

  useEffect(()=>{
    if(window.screen.width < 768){
      setOpen(false)
      setMobile(true)
    }
    axois.post("identification/get_user_info/")
         .then(r=>{
           setIsAdmin(r.data.is_admin)
           setName(r.data.username)
         })
         .catch(error=>{
           //changeUrl("/signin")
         })

  },[])

  const menu = () => {
      return (
        <React.Fragment>
          <div className={`p-4 min-h-full hidden md:flex w-[320px] duration-100 fixed  z-10 ${window.screen.width < 768?" fixed ":"md:relative"} ${ open ? " " : "scale-0 -mr-[320px]"}`}  >
              <div className="p-4 shadow-lg w-full bg-[#fefefe] flex flex-col rounded-3xl h-full " >
                <div className="flex flex-wrap gap-1 justify-center items-center mb-10" >
                  <img src={"./logo.png"} alt="Logo" />
                  <h1 className="text-3xl" >Cross</h1>
                </div>

                <div className="flex flex-col h-full gap-4" >
                  <MenuItem path="/home"  >Dashboard</MenuItem>
       {(isAdmin? <MenuItem path="/God"  >God View</MenuItem>:<></>)}
                  <MenuItem path="/Compress"  >Compress</MenuItem>
                  <MenuItem path="/Decompress"  >Decompress</MenuItem>
                  <MenuItem path="/Share"  >Share Files</MenuItem>
                  <MenuItem path="/logout" >Logout</MenuItem>

                  <div className="h-full flex flex-row  items-end" >
                    <div className="flex flex-row items-center gap-2" >
                      <HiUserCircle className="w-1/3 h-[50px] text-gray-500" />
                      <h1 className="text-2xl text-[#727272]" >{name.toUpperCase()}</h1>
                    </div>
                  </div>
                </div>


              </div>
              <div
                onClick={()=>setOpen(!open)}
                className={`absolute ${open ? "-right-3" : "hidden "} hover:bg-slate-50 top-12 z-20 bg-white shadow-lg hover:scale-110 select-none cursor-pointer duration-100 rounded-full flex items-center justify-center w-[50px] h-[50px]`}>
                {(open?<AiOutlineArrowLeft size={25} />:<AiOutlineArrowRight size={25}/>)}

              </div>
          </div>
            {/* Mobile menu */}
        <div className={`fixed h-screen w-screen flex flex-col z-40 p-3 bg-[#fefefe] md:hidden ${open?"":"hidden"} `} >
              <div className="grid grid-col#727272s-6" >
                <div onClick={()=>setOpen(false)}>
                  <AiOutlineClose size={45}  className="hover:scale-110" />
                </div>
                  <div className="flex flex-wrap col-span-4 w-full gap-1 justify-center items-center mb-10" >
                    <img src={"./logo.png"} alt="Logo" />
                    <h1 className="text-3xl" >Cross</h1>
                </div>
              </div>

              <div className="flex flex-col h-full gap-4" >
                <MenuItem path="/home"  >Dashboard</MenuItem>
      {(isAdmin?<MenuItem path="/God"  >God View</MenuItem>:<></>)}
                <MenuItem path="/Compress"  >Compress</MenuItem>
                <MenuItem path="/Decompress"  >Decompress</MenuItem>
                <MenuItem path="/Share"  >Share Files</MenuItem>
                <MenuItem path="/logout" >Logout</MenuItem>

                <div className="h-full flex flex-row items-end" >
                  <div className="flex flex-row items-center gap-2" >
                    <HiUserCircle className="w-1/3 h-[50px] text-gray-500" />
                    <h1 className="text-2xl text-[#727272]" >{name.toUpperCase()}</h1>
                  </div>
                </div>
              </div>
            </div>
        </React.Fragment>
      );
  }

  return (
    <div className={`flex flex-row min-w-screen min-h-screen relative bg-[#F4F4F8]  `} >
      {menu()}
      <div
        onClick={()=>setOpen(!open)}
        className={`absolute ${open ? "hidden" : "-left-3 "} hover:bg-slate-50 top-12 z-20 bg-white shadow-lg hover:scale-110 select-none cursor-pointer duration-100 rounded-full flex items-center justify-center w-[50px] h-[50px]`}>
        {(open?<AiOutlineArrowLeft size={25}/>:<AiOutlineArrowRight size={25}/>)}
        
      </div>
      <div className=" flex flex-col p-2 w-full gap-0" >

        {props.children}
      </div>

    </div>
  );


}
