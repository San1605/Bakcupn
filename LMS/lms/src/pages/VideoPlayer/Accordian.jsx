import React, { useContext, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { GlobalContext } from '../../context/GlobalContext';
import { useParams } from 'react-router-dom';

const Accordian = () => {
    const {getNotes,getvideoafterclick,saveasubtopicID,saveatopicID,enrolledCourseInfo,EnrolledCourse,getMyCurrentCourse} = useContext(GlobalContext);
    const {id} = useParams()
    
    useEffect(()=>{
        getMyCurrentCourse(id);
    },[])

    console.log(EnrolledCourse[0].topics,"EnrolledCourse")
  return (
    <div>
          <Accordion>
            {
                EnrolledCourse[0]?.topics?.map((topic,index)=>(
                    
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>{topic?.topicName}</Accordion.Header>
                    <Accordion.Body>Subtopic1</Accordion.Body>
                </Accordion.Item>
                ))
            }
 
            </Accordion>
    </div>
  )
}

export default Accordian
