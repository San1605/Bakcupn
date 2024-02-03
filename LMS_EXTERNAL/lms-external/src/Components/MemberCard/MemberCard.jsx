import React from 'react'
import {online,offline,communityMentor} from "../../Assets/globalIcons"
const MemberCard = ({ name, status }) => {
  return (
        <div className='MemberCard'>
            <div className='MemberCardImgDiv'>
                <img src={communityMentor} alt='' />
            </div>
            <div className='MemberCardRight'>
                <div className='MemberCardRightName'>{name}</div>
                <div className='MemberCardRightStatus'>
                    <img src={status === "online" ? online : offline} alt='' />
                    <span>{status}</span>
                </div>
            </div>
        </div>
  )
}
export default MemberCard
