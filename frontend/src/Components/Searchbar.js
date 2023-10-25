import React from "react"
import { GoSearch } from 'react-icons/go';
import { CgProfile } from 'react-icons/cg';

export default function Searchbar(props){

  return (
    <div className="flex flex-row justify-between items-center w-full px-2 rounded-[14px] bg-[#fefefe]" >
      <div className="flex items-center flex-row gap-2 w-full">
        <GoSearch size={30} />
        <input className="text-[#727272] text-lg w-full px-3 py-2 outline-none" placeholder="Search"/>
      </div>
    </div>
  );
}

