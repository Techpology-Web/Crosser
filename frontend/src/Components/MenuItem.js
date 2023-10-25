import React from "react"
import { Outlet, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

export default function MenuItem(props){
  const location = useLocation();

  return (
    <Link className={`text-xl p-[15px] duration-100 rounded-xl  hover:bg-[#E7E7FF] hover:-translate-y-1  ${props.path === location.pathname ? "bg-[#E7E7FF] text-[#696CFF] p-[15px]" : "text-[#727272] " } `}
      to={props.path}>
      {props.children}
    </Link>);
}
