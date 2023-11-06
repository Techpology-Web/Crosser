import React,{useRef, useLayoutEffect, useState,useEffect } from "react"
import AdminContainer from "../AdminContainer.js"
import { LineChart, Line , CartesianGrid, XAxis, YAxis} from 'recharts';
import { BarChart, Bar, Cell,  Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label} from 'recharts';
import Card from "../Components/Card.js"
import axios from "../axiost"
import { HiUserCircle } from "react-icons/hi2"
import { changeUrl } from "../global_func.js";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function Berit(props){


  return (
    <div
      onClick={props.onChange}
      className={`rounded-lg w-16 h-16 flex items-center justify-center hover:scale-90 duration-100 cursor-pointer hover:bg-[#333] hover:text-white ${props.value ? "bg-[#222] scale-90 text-white" : "  "} shadow-lg `}>
      <h1>{props.children}</h1>
    </div>
  )
}

export default function Home(props){
  
  const [barData, setBarData] = useState();
  const [data, setData] = useState();
  const [files, setFiles] = useState([])

  const [fileSize, setFileSize] = useState(0);
  const [username, setUsername] = useState("")

  const size = Math.pow(10,(fileSize+1)*3)
  const label = () => {switch (fileSize){
    case 0:
      return "KB"
    break;
    case 1:
      return "MB"
    break;
    case 2:
      return "GB"
  }
  }

  useEffect(()=>{
    axios.post("/identification/get_user_info/")
    .then(r=>{
      setUsername(r.data.username)
      setBarData([
        {
          name: 'Database without compressing',
          size: r.data.decompressed_size / Math.pow(10,fileSize),
        },
        {
          name: 'Databse with compressing',
          size: r.data.compressed_size / Math.pow(10,fileSize),
        },
      ])

    })
    .catch(error=>{
      if(error.response.data.code == "no session"){
        changeUrl("/signin")
      }
    })

    axios.post("/files/get_files",{})
    .then(r=>{
      let d = []
      for(let i = 0; i < r.data.hashes.length;i++){
        d.push({filename: `file-${i}`, compressed_size:r.data.hashes[i].compressed_size/Math.pow(10,fileSize), decompressed_size: r.data.hashes[i].decompressed_size/Math.pow(10,fileSize)})
      }
      setFiles(r.data.hashes)
      setData(d)
    })
    .catch(error=>{alert(error.response.data.code)})

    },[fileSize])

  return (
    <AdminContainer>
      <div className="   flex flex-col md:grid grid-cols-2 grid-rows-2 gap-4 w-full h-[95%] p-6" >
        <Card className="w-full flex flex-row " >
          <div>
            <Berit onChange={()=>setFileSize(2)} value={fileSize == 2} >GB</Berit>
            <Berit onChange={()=>setFileSize(1)} value={fileSize == 1} >MB</Berit>
            <Berit onChange={()=>setFileSize(0)} value={fileSize == 0} >KB</Berit>
          </div>
          <div className="flex flex-col w-full items-center justify-center ">
            <h1>Your database</h1>
            <ResponsiveContainer >
                <BarChart data={barData}>
                    <Bar dataKey="size" fill="#FB5555" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="flex flex-col items-center" >
          <h1>Your account</h1>
          <div className="flex flex-row h-1/2 w-full" >
            <HiUserCircle className="w-1/3 h-full text-gray-500" />
            <div className="mt-5 " >
              <h1 className="text-3xl" >{username}</h1>
            </div>
          </div>
        </Card>
        <div className="flex flex-col md:flex-row bg-[#fefefe] rounded-lg col-span-2 p-0 gap-4" >
          <div className="bg-[#222] lg:w-2/3 overflow-auto md:w-full items-center flex flex-col text-white rounded-l-lg p-4 "  >
            <h1>History</h1>
            <table className="w-full " >
              <tr>
                <th>id</th>
                <th>PRE</th>
                <th>POST</th>
                <th>%</th>
              </tr>
              {files.map((file,i)=>
                <tr>
                  <td className="text-center">{file.filename}</td>
                  <td className="text-center">{parseFloat(file.decompressed_size/size).toFixed(2)} {label()}</td>
                  <td className="text-center">{parseFloat(file.compressed_size/size).toFixed(2)} {label()}</td>
                  <td className="text-center">{parseFloat(file.compressed_size/file.decompressed_size*100).toFixed(2)} %</td>
                </tr>
              )}
            </table>
          </div>
          <div className="p-4 w-full" >
            <ResponsiveContainer width="100%" >
                <LineChart data={data}>
                    <Line type="monotone" dataKey="compressed_size"   stroke="#8884d8" />
                    <Line type="monotone" dataKey="decompressed_size" stroke="#646464" />
                    <XAxis dataKey="filename" />
                    <YAxis />
                </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminContainer>);
}
