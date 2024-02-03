import React from 'react'
import "./OrganCard.css"
import { useNavigate } from 'react-router-dom';

const OrganCard = ({data}) => {
  const {image, organName} = data; 
  const navigate=useNavigate()
  return (
    <div className='organ-card'      onClick={() => navigate(`/departments/organs/${organName}`)}   >
      <img className='organCardImg' src={image} alt='Organ' />
      <div className='organ-card-content'>
      <span>{organName}</span>
      </div>
    </div>
  )
}

export default OrganCard
