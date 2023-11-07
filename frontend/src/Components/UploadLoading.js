import logo from '../Components/load.gif'
import React from "react"


export default function(props){


  return(
    <div className={`fixed flex flex-col justify-center items-center left-0 z-20 top-0 bg-black bg-opacity-25 h-screen w-screen ${props.loading?"":"hidden"}`}>
        <div className="flex flex-col items-center p-4 rounded-lg justify-center w-1/4  bg-white">
          {props.progr==100? (
            <React.Fragment>
              <h1>Upload sucessfull</h1>
              <img className="w-[250px] h-[170px]" src={logo} alt="loading..." />
              <h1>Waiting for the compression</h1>
            </React.Fragment>
          ) : (<>
                 <h1>{props.progr}</h1>
                 <progress id="file" value={props.progr} max="100"></progress>
               </>)}
        </div>
      </div>

  )
}
