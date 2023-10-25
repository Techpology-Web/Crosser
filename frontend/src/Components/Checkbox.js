import React, {useState} from "react"

export default function Checkbox(props){
  

  return (
    <div className="flex flex-row w-full  gap-2 items-center " >
      <input
        className="h-[16px] w-[16px] "
        type="checkbox"
        checked={props.value}
        onChange={e=>props.onChange(e.target.checked)}
      />
      <p className="text-[#727272]" >{props.label}</p>
    </div>
  );
}
