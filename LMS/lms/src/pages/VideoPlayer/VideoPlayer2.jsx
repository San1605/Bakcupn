import React, { useContext, useEffect, useRef, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import "./Videoplayer2.css"
import Accordian from './Accordian'
import { GlobalContext } from '../../context/GlobalContext';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const VideoPlayer2 = () => {
    const player = useRef();
    const { getNotes, getvideoafterclick, saveasubtopicID, saveatopicID, enrolledCourseInfo, EnrolledCourse, getMyCurrentCourse } = useContext(GlobalContext);
    const { id } = useParams()
   const [linkforenrolledvideo,setlinkforenrolledvideo] = useState("");
    useEffect(() => {
        getMyCurrentCourse(id);
    }, [])

    

    


    console.log(EnrolledCourse, "EnrolledCourse")
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Accordion>
                {
                    EnrolledCourse[-0]?.topics?.map((topic, index) => (

                        <Accordion.Item eventKey={index}>
                            <Accordion.Header>{topic?.topicName}</Accordion.Header>
                            {
                                topic?.topicData?.map((subtopic, subIndex) => (
                                    <Accordion.Body onClick={()=>setlinkforenrolledvideo(subtopic?.link1)} >{subtopic?.subtopic}</Accordion.Body>
                                ))
                            }
                        </Accordion.Item>

                    ))
                }
                <div>
                    another div
                </div>

            </Accordion>
            <ReactPlayer
                ref={player}
                // onEnded={() => setIscompleted(true)}
                // onProgress={(progress) => {
                //     setTimer(progress.playedSeconds);
                // }}
                className="react-player"
                // onPause={() => {
                //     convert_to_min(timer);
                // }}
                // playing={isPlaying}
                controls
                width="100%"
                height="500px"
                url={linkforenrolledvideo}
            />
        </div>
    )
}

export default VideoPlayer2

