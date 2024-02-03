import React from 'react'
import "./Container.css"
import ContainerLeft from '../ContainerLeft/ContainerLeft'
import ContainerRight from '../ConatainerRight/ContainerRight'
const Container = () => {
  return (
    <div className='containerDev'>
       <ContainerLeft/>
       <ContainerRight/>
    </div>
  )
}

export default Container
