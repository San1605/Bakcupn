import React from 'react'
import "./Pagination.css"
import leftArrow from "../../Assets/leftArrow.svg"
import rightArrow from "../../Assets/RightArrow.svg"
const Pagination = () => {
    return (
        <div className='pagination'>
            <span>Page</span>
            <input type='text'/>
            <span>of 50</span>
            <span><img src={leftArrow} alt='' /></span>
            <span><img src={rightArrow} alt='' /></span>
        </div>
    )
}

export default Pagination
