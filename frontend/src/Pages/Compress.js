import React, { useState } from "react"
import AdminContainer from "../AdminContainer.js"
import FileInput from "../Components/FileInput.js"
import Loading from "../Components/Loading.js"
import axios from "../axiost.js"
import { changeUrl } from "../global_func.js"


export default function Compress(props){

  const [loading, setLoading] = useState(false)

  const upload = (e,r) => {
    var formData = new FormData();
    console.log(e[0])
    // create better token
    const token = new Date().getMilliseconds();
    formData.append("file", new File([e[0]], token+"_"+e[0].path, { type:e[0].type }));
    setLoading(true)
    axios.post("/files/compress",formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(r=>{
        // download the compressed file
        window.open(r.data.compressed_file)
        setLoading(false)
      })
      .catch(error=>{
        alert(error.response.code)
        setLoading(false)
      })
  }
  // progress bar while compressing
  return (
    <AdminContainer>
      <Loading on={loading}/>
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center" >
        <h1 className="text-4xl mb-5" >Drag in files to compress!</h1>
        <div className="w-1/3 min-h-1/3" >
          <FileInput onDrop={upload} />
        </div>
      </div>
    </AdminContainer>);
}
