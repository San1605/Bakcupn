import React from 'react'
import "./GeneralFileCard.css"
import {pdf} from "../../Views/Admin/Assets/adminIcons"

const GeneralFileCard = ({ name, readTime }) => {
    return (
        <div className='GeneralFile'>
            <div className='GeneralFileImgDiv'>
                <img src={pdf} alt='' />
            </div>
            <div className='GeneralFileRight'>
                <div className='GeneralFileRightName'>{name}</div>
                <div className='GeneralFileRightStatus'>{readTime}</div>
            </div>
        </div>
    )
}

export default GeneralFileCard
