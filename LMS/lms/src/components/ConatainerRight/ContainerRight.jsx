import React from 'react'
import "./ContainerRight.css"
import GeneralFiles from '../GeneralFiles/GeneralFiles'
import LearningPath from '../LearningPath/LearningPath'
const ContainerRight = () => {
    return (
        <div className='containerRight'>
            <LearningPath />
            <GeneralFiles />
        </div>
    )
}

export default ContainerRight

