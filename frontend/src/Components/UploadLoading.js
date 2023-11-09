import logo from '../Components/load.gif'
import PopUp from '../Components/PopUp'
import React from "react"




export default function(props){

  return(
    <PopUp on={props.loading} >
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
    </PopUp>
  )
}
