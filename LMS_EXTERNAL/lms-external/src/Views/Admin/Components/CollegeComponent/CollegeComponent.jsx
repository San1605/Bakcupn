import React, { useState } from 'react'
import "./CollegeComponent.css"
import { collegeImg, deleteIcon } from "../../Assets/adminIcons";
import { EditIcon, threeDots } from '../../../../Assets/globalIcons';
import { useNavigate } from 'react-router-dom';
import { encrypt } from "../../../../Utils/encryptDecrypt"
const CollegeComponent = ({
    id,
    collegeName,
    address,
    startDate,
    endDate,
    studentCount,
    logo,
    totalDomain,
    deleteApi
}) => {
    const [showActionBox, setShowActionBox] = useState(false)
    const handleImageError = (e) => {
        e.target.src = collegeImg;
    };
    const navigate = useNavigate();
    return (
        <div className='CollegeComponent' onClick={() => {
            if (!showActionBox) {
                navigate(`/colleges/students/${collegeName}/${encrypt(String(id))}`)
            }
            else {
                setShowActionBox(false)
            }
        }
        }>
            <div className='collegeLogoDiv'>
                <div className='collegeImg'>
                    <img src={logo} alt='' onError={handleImageError} />
                </div>
                <div className='collegeNameDiv'>
                    <div>
                        {collegeName}
                    </div>
                    <div>
                        {address}
                    </div>
                </div>
                <div className='ThreeDotsColleges'>
                    <img onClick={(e) => {
                        e.stopPropagation();
                        setShowActionBox(!showActionBox)
                    }} src={threeDots} alt='' />
                </div>
                {showActionBox && <div className='actionBox'>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        // deleteApi(id)
                    }} ><span>Edit</span><img src={EditIcon} alt='' /></div>

                    <div onClick={(e) => {
                        e.stopPropagation();
                        deleteApi(id)
                    }}><span>Delete</span><img src={deleteIcon} alt='' /></div>
                </div>}
            </div>
            <div className='lowerDiv'>
                <div className='lowerDivFirst'>
                    <div className='totalStudentsDiv'>
                        <span>Total Students</span>
                        <span>{studentCount}</span>
                    </div>
                    <div className='totalStudentsDiv'>
                        <span>Total Domains</span>
                        <span>{totalDomain}</span>
                    </div>
                </div>
                <div className='lowerDivFirst'>
                    <div className='totalStudentsDiv'>
                        <span>Start Date</span>
                        <span>{startDate}</span>
                    </div>
                    <div className='totalStudentsDiv'>
                        <span>Expected End Date</span>
                        <span>{endDate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollegeComponent
