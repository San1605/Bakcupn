import React from 'react'
import SEARCH_ICON_BLACK from "../../assets/icons/searchiconblack.svg";
import SEARCH_ICON_GREY from "../../assets/icons/searchicongrey.svg";
import "./Searchbar.css";

const Searchbar = ({type}) => {
  return (
    <div className={`d-flex justify-content-between px-3 align-items-center ${type.toLowerCase()==='nav' ? "input-group-one border-0 h-100" : "input-group-two"}` }>
      <input type="text" placeholder="Search here..." className='search-bar'/>
      <img src={type.toLowerCase()==='nav'?SEARCH_ICON_BLACK: SEARCH_ICON_GREY} width="15px " alt="" />
    </div>
  )
}

export default Searchbar;
