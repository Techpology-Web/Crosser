import react, {useState, useEffect } from "react"
import axois from "../axiost"
import Button from "../Components/Button"

function User(props){

  const [adress,setAdress] = useState("")

  useEffect(()=>{
    axois.get(`https://geocode.maps.co/reverse?lat=${props.session.lat}&lon=${props.session.long}`)
         .then(r=>{
           setAdress(r.data.display_name)

         })
         .catch(error=>{
           console.error(error)
         })
  },[])

  return (
    <div className="bg-gray-200 rounded-md p-2" >
      <div>
        <h1>User: {props.session.name}</h1>
        <h1>Created at: {props.session.created}</h1>
        <h1>Long:{props.session.long}</h1>
        <h1>Lat:{props.session.lat}</h1>
        <a className="text-md duration-75 text-blue-600 hover:text-blue-400 hover:font-bold" href={`https://www.google.com/maps/@${props.session.lat},${props.session.long}`}>{adress}</a>
      </div>
    <Button className="mt-5" onClick={()=>props.delete(props.session.key)} >Delete</Button>
    </div>
  )
}

export default function God(props){

  const [sessions, setSessions] = useState([]);
  const [refresh,setRefresh] = useState(false);

  useEffect(()=>{
        axois.post("identification/alive_sessions/",{"key":"ego sum Deus"})
         .then(r=>{
           setSessions(r.data)
         })
         .catch(error=>{
           console.log(error)
         })
  },[refresh])
  const deleteSession = (sessionKey) => {
    axois.post("identification/delete_session/",{
      sessionKey:sessionKey,
    })
         .then(r=>{
           console.log(r.data)
           setRefresh(!refresh)
         })
         .catch(error=>{
           console.log(error)
         })
  }


  return (
    <div className="flex flex-col gap-2 p-12" >
      <h1 className="text-3xl" >All alive sessions</h1>
        {sessions.map((session,i)=>
          <User session={session} delete={deleteSession} />
        )}

    </div>
  )
}
