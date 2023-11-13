import React, { useState } from "react"
import AdminContainer from "../AdminContainer.js"
import FileInput from "../Components/FileInput.js"
import Loading from "../Components/Loading.js"
import UploadLoading from "../Components/UploadLoading.js"
import axios from "../axiost"
import { changeUrl } from "../global_func.js"
import {getCookie} from "../CookieHandler.js"

export default function Compress(props){

  const [loading, setLoading] = useState(false)
  const [progr,setProgr] = useState(0);

  const upload = (e,r) => {
    setLoading(true)
    setProgr(0)
    var formData = new FormData();
    // create better token
    const token = new Date().getMilliseconds();

    let fileName = (token+"_"+e[0].path).replace(" ","-");

    formData.append("file", new File([e[0]], fileName, { type:e[0].type }));

    axios.post("/files/compress",formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: function(progressEvent) {
        setProgr(Math.round((progressEvent.loaded * 100) / e[0].size))
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
      <UploadLoading progr={progr} loading={loading} />
      <div className="w-full h-full flex flex-col gap-4 text-center items-center justify-center" >
        <h1 className="text-4xl mb-5" >Drag in files to compress!</h1>
        <div className="lg:w-1/3 min-h-1/3" >
          <FileInput trigger={()=>{setLoading(true);setProgr(0)}} onDrop={upload} />
        </div>
      </div>
    </AdminContainer>);
}
