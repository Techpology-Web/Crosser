import React, {useState, useCallback, useEffect} from "react"
import {useDropzone} from 'react-dropzone';
import AdminContainer from "../AdminContainer.js"
import {BsInfinity} from "react-icons/bs"
import {PiRepeatOnceLight} from "react-icons/pi"
import {MdPassword} from "react-icons/md"
import Button from "../Components/Button.js"
import axios from "../axiost.js"
import Input from "../Components/Input.js"
import Loading from "../Components/Loading.js"
import Basic from "../Components/FileInput.js"
import { GoSearch } from 'react-icons/go';
import {isSearched} from "../global_func.js"


// the sidebar that appears when a file is selected
function SelectUsers(props){
  
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [search, setSearch] = useState("");

  useEffect(()=>{
    axios.get("/identification/get_users")
      .then(r=>{setUsers(r.data)})
      .catch(error=>{})
  },[])

  const userElements = (users.map((user,i)=>
      {return (isSearched(search,user) ?
      <div 
        onClick={()=>setSelectedUser(user)}
        key={i} 
        className={`${selectedUser == user ? "bg-[#e7e7ff] rounded-xl" : "bg-white"} hover:bg-[#E7E7FF] hover:rounded-xl border-b py-2 px-4  duration-[300ms] hover:-translate-y-1 cursor-pointer`} >

        <h1>{user.username}</h1>

      </div>:null)}
    ));

  return (
    <div className={`absolute ${!props.on ? "-right-[500px] scale-x-0 " : "right-0 "} duration-[1s]  z-40 p-4 rounded-xl  bg-[#fefefe] h-full flex flex-col gap-4 `} >

      <div className="flex flex-row gap-2" >
        <Button className="w-fit" onClick={props.close} >Close</Button>
        <h1>Choose user</h1>
      </div>

      <Input placeholder={"Search"}  onChange={setSearch} value={search} icon={<GoSearch size={20} />}/>

      <div className="flex flex-col gap-2 w-full overflow-y-auto  h-full" >
        {userElements} 
      </div>

      <Button onClick={()=>props.send(selectedUser)} >Send to {selectedUser.username}</Button>
    </div>);
}

function But(props){
  return (
    <div 
      onClick={props.onClick}
      className={`flex flex-col cursor-pointer duration-[600ms] hover:-translate-y-2 justify-center items-center rounded-xl  shadow-md  ${props.selected ? "bg-[#62f] scale-90 " : "bg-[#fefefe]"} ${props.small? "h-[100px] w-[100px]" : " w-[100px] lg:w-[200px] xl:w-[300px]  h-[100px] lg:h-[200px] xl:h-[300px] " } `} >

      <div className={`${props.selected ? "text-[#fefefe]" : "text-[#62f]"}  `}>
        {props.icon}
      </div>
      <h1 className={`select-none ${props.selected ? "text-[#fefefe]" : "text-[#333]"} ${props.small? "text-sm" : "lg:text-xl text-sm"}`} >{props.children}</h1>
    </div>);
}


export default function Home(props){
  
  const [selectedMode, setSelectedMode] = useState(0);
  const [showUsers, setShowUsers] = useState(false);
  const [file, setFile] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);


  const share = (to,method) =>{
    var formData = new FormData();
    formData.append("method", method); // once
    formData.append("to", to.pk);
    formData.append("file", file[0]);
    setLoading(true)
    axios.post("/files/share",formData)
      .then(r=>{
        setSelectedMode(0)
        setShowUsers(false)
        setLoading(false)
      })
      .catch(error=>{
        setLoading(false)
        alert(error.response.data.code)
      })
  }

  const share_with_password = (to,method) =>{
    var formData = new FormData();
    formData.append("password", password); // once
    formData.append("file", file[0]);
    setLoading(true)
    axios.post("/files/share_with_password",formData)
      .then(r=>{
        setSelectedMode(0)
        setShowUsers(false)
        setLoading(false)
      })
      .catch(error=>{
        setLoading(false)
        alert(error.response.data.code)
      })
  }
  
  const sendFile = (to) =>{
    switch (selectedMode){
      case 1:
        share(to,1)
        break;
      case 2:
        share(to,0)
        break;
      case 3:
        share_with_password() // with key
        break;
    }
  }
  
  const password_comp = () =>(
    <div className={`flex flex-col items-center gap-2 w-1/3 duration-[1s] ${ showUsers ? "" : "scale-0 h-0 "}`} >
      <Input value={password} onChange={setPassword} placeholder="Password for file" type="password" />
      <Button onClick={share_with_password} className="w-fit" >Share</Button>
    </div> 
  )
  

  return (
    <AdminContainer>
      <Loading on={loading}/>
      <div className="flex flex-col relative justify-center items-center h-full gap-4  " >
        
        
        <div  className={`${selectedMode > 0 ? "scale-100 h-auto" :"scale-0 h-0"} duration-[300ms] `}>
          <Basic onDrop={(e,r)=>{setFile(e);setShowUsers(true)}} /> 
        </div>

        {(selectedMode < 3 ?<SelectUsers close={()=>{setShowUsers(false)}} send={sendFile} on={showUsers} /> :password_comp())}
        <div className={`flex flex-row justify-center w-full ${selectedMode > 0 ? "gap-12" : "gap-12"}`} >
          <But small={selectedMode > 0} 
            onClick={()=>setSelectedMode(1)} 
            selected={selectedMode == 1} 
            icon={<BsInfinity size={40 * (selectedMode > 0 ? 1 : 2)}  />} >
            Share forever
          </But>
   
          <But small={selectedMode > 0} 
            onClick={()=>setSelectedMode(2)}
            selected={selectedMode == 2} 
            icon={<PiRepeatOnceLight size={40 * (selectedMode > 0 ? 1 : 2)}  />} >
            Share once
          </But>
   
          <But small={selectedMode > 0} 
            onClick={()=>setSelectedMode(3)} 
            selected={selectedMode == 3} 
            icon={<MdPassword size={40 * (selectedMode > 0 ? 1 : 2)}  />} >
            Share with key
          </But>

        </div>
      </div>
    </AdminContainer>);
}
