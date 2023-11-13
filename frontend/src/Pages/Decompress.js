import React,{useState} from "react"
import AdminContainer from "../AdminContainer.js"
import FileInput from "../Components/FileInput.js"
import Input from "../Components/Input.js"
import Button from "../Components/Button.js"
import axios from "../axiost.js"
import PopUp from "../Components/PopUp"
import {GrClose} from "react-icons/gr"
import UploadLoading from "../Components/UploadLoading.js"
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
  const [progr,setProgr]       = useState(0);
  const [error,setError]       = useState("");

  const upload = (e) => {
    if(!e[0].path.includes(".ccf")){
      setError("Wrong file format, use compressed files (*.ccf)")
      return 0
    }
    setFile(e)
    setLoading(true)
    setProgr(0)
    var formData = new FormData();
    formData.append("password", password);

    //const token = new Date().getMilliseconds();
    let fileName = (e[0].path).replace(" ","-");
    console.log(fileName)

    formData.append("file", new File([e[0]], fileName, { type:e[0].type }));

    axios.post("/files/decompress",formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function(progressEvent) {
        setProgr(Math.round((progressEvent.loaded * 100) / e[0].size))
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
      <UploadLoading progr={progr} loading={loading}/>
      <PopUp on={error!=""}>
        <h1>{error}</h1>
        <Button onClick={()=>{setError("");setLoading(false)}} >Okay!</Button>
      </PopUp>
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
      <div className="w-full h-full flex  text-center flex-col gap-4 items-center justify-center" >
        <h1 className="text-4xl mb-5 " >Drag in the compressed files to decompress!</h1>
        <div className="lg:w-1/3 min-h-1/3" >
          <FileInput trigger={()=>{setLoading(true);setProgr(0)}} onDrop={(e,r)=>{upload(e);setPassword("")}} />
        </div>
      </div>
    </AdminContainer>);
}
