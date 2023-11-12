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
  const [lineProcentData, setLineProcentData] = useState({});
  const [files, setFiles] = useState([])

  const [fileSize, setFileSize] = useState(1);
  const [username, setUsername] = useState("")
  const [isAdmin, setIsAdmin]   = useState(true)

  const [dbSize, setDbSize] = useState({
    "compressed_size":0,
    "decompressed_size":0,
})

  const size = Math.pow(10,fileSize*3)
  const label = () => {switch (fileSize){
    case 0:
      return "B"
    case 1:
      return "KB"
    case 2:
      return "MB"
    case 3:
      return "GB"
  }
  }

  useEffect(()=>{
    axios.post("/identification/get_user_info/")
    .then(r=>{
      setUsername(r.data.username)
      setIsAdmin(r.data.is_admin)
      if(r.data.is_admin){
        // fetches real db sizes
        axios.post("/files/get_db_size",{})
          .then(r=>{
              setDbSize([
                {
                  name:"Datebase without compressing",
                  size: r.data.decompressed_size/size
                },
                {
                  name:"Datebase with compressing",
                  size: r.data.compressed_size/size
                }
              ])
          })
          .catch(error=>{

          })
      }
      setBarData([
        {
          name: 'Database without compressing',
          size: r.data.decompressed_size / size,
        },
        {
          name: 'Databse with compressing',
          size: r.data.compressed_size / size,
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
      let dp = []
      for(let i = 0; i < r.data.hashes.length;i++){
        let compressed = r.data.hashes[i].compressed_size / size;
        let decompressed = r.data.hashes[i].decompressed_size / size;
        d.push({
          filename: `file-${i}`,
          compressed_size  : compressed,
          decompressed_size: decompressed
        })
        dp.push({
          filename: `file-${i}`,
          procent : decompressed > 0 ? compressed/decompressed*100 : 100,
        })
      }
      console.log(dp)
      setFiles(r.data.hashes)
      setData(d)
      setLineProcentData(dp)
    })
    .catch(error=>{alert(error.response.data.code)})

    },[fileSize])

  return (
    <AdminContainer>
      <div className="flex flex-col md:grid grid-cols-2 grid-rows-2 gap-4 w-full h-[95%] p-6" >
        <Card className="w-full flex flex-row " >
          <div>
            <Berit onChange={()=>setFileSize(3)} value={fileSize == 3} >GB</Berit>
            <Berit onChange={()=>setFileSize(2)} value={fileSize == 2} >MB</Berit>
            <Berit onChange={()=>setFileSize(1)} value={fileSize == 1} >KB</Berit>
            <Berit onChange={()=>setFileSize(0)} value={fileSize == 0} >B</Berit>
          </div>
          <div className="flex flex-col w-full items-center justify-center ">
            <h1>{isAdmin?"The whole database":"Your database"}</h1>
            <ResponsiveContainer >
              <BarChart data={isAdmin?dbSize:barData}>
                    <Bar dataKey="size" fill="#FB5555" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="flex flex-col h-full items-center" >
          <h1>Compressed files procentage</h1>
          <ResponsiveContainer width="100%" >
              <LineChart data={lineProcentData}>
                  <Line type="monotone" dataKey="procent"   stroke="#8884d8" />
                  <XAxis dataKey="filename" />
                  <YAxis />
              </LineChart>
          </ResponsiveContainer>
        </Card>
        <div className="flex flex-col h-full md:flex-row bg-[#fefefe] rounded-lg col-span-2 p-0 gap-4" >
          <div className="bg-[#222] lg:w-2/3 overflow-auto md:w-full max-h-[500px] items-center flex flex-col text-white rounded-l-lg p-4 "  >
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
                  <td className="text-center">{parseFloat(file.compressed_size/file.decompressed_size * 100).toFixed(2)} %</td>
                </tr>
              )}
            </table>
          </div>
          <div className="p-4 h-1/2 w-full" >
            <h1>File size before and after compressing</h1>
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
