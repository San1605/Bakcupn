import React from 'react'
import './KpiCard.css'
const KpiCard = ({ text, value, imgUrl, bgColor }) => {
  return (
    <div className='kpi'>
      <div className='kpiIcon' style={{ backgroundColor: `${bgColor}` }}>
        <img src={imgUrl} alt='' />
      </div>
      <div className='kpiText'>
        <div>{value}</div>
        <div>{text}</div>
      </div>
    </div>
  )
}

export default KpiCard
