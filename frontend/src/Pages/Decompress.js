import React,{useState} from "react"
import AdminContainer from "../AdminContainer.js"
import FileInput from "../Components/FileInput.js"
import Input from "../Components/Input.js"
import Button from "../Components/Button.js"
import axios from "../axiost.js"
import {GrClose} from "react-icons/gr"
import Loading from "../Components/Loading"
import { changeUrl } from "../global_func.js"


function Popup(props){
  if (props.on)
    return (
      <div 
        onClick={(e)=>{props.close(false)}}
        className="flex items-center justify-center bg-black bg-opacity-25 z-40 fixed h-screen w-screen left-0 top-0" >
      <div onClick={e=>e.stopPropagation()} className="bg-[#fefefe] w-1/3 h-1/3 rounded-xl p-5 pt-8 relative" >
        <GrClose onClick={()=>props.close(false)} size={25} className="absolute top-2 right-2 hover:text-gray-400 cursor-pointer hover:scale-110 " />
          {props.children}
        </div>
      </div>)
  else 
    return null
}

export default function Decompress(props){

  const [on,setOn]             = useState(false)
  const [loading,setLoading]   = useState(false)
  const [password,setPassword] = useState("")
  const [file,setFile]         = useState()

  const upload = (e) => {
    setFile(e)
    setLoading(true)
    var formData = new FormData();
    formData.append("password", password);

    //const token = new Date().getMilliseconds();
    console.log(e[0])
    formData.append("file", e[0]);

    axios.post("/files/decompress",formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(r=>{
        window.open(r.data.file)
        setLoading(false)
        setOn(false)
      })
      .catch(error=>{
        if (error.response.data.code === "can't unlock file"){
          setOn(true)
        }
        setLoading(false)
      })
  }
  // progress bar while compressing
  return (
    <AdminContainer>
      <Loading on={loading}/>
      <Popup on={on} close={setOn} >
        <div className="flex flex-col h-full items-center gap-2 " >
          <h1 className="" >You do not have the access to unlock this file</h1>
          <h1 className="mb-6" >Do you want to try with password?</h1>
          <div className="w-full h-full" >
            <Input value={password} onChange={setPassword} placeholder="Password to unlock file" type="password" />
          </div>
          <Button onClick={()=>upload(file)} >Try again</Button>

          <Button onClick={()=>{setOn(false);setPassword("")}} >No close</Button>
        </div>
      </Popup>
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center" >
        <h1 className="text-4xl mb-5" >Drag in the compressed files to decompress!</h1>
        <div className="w-1/3 min-h-1/3" >
          <FileInput onDrop={(e,r)=>{upload(e);setPassword("")}} />
        </div>
      </div>
    </AdminContainer>);
}
