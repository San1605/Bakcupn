import React from 'react'
import "./TopPerformingStudents.css"
import { firstposition, profile } from '../../../Assets/globalIcons'
const TopPerformingStudents = () => {
    return (
        <div className="topPerformance">
            <div className='topPerformanceHeading'>
                Leader Board
                
                
                </div>
            <div className='topPerformancefirstDiv'>
                <div className='leaderBoardfirstBox'>
                    <div className='studentPositionBoxLeaderBoard'>
                        <div className='studentPhotoBoxLeaderBoard' >
                            <img className='studentPhotoBoxLeaderBoardImg' alt='' src={profile} />
                            <div>2</div>
                        </div>
                        <div className='studentNameBoxLeaderBoard'>
                            <div>Abhishek tiwari</div>
                            <div>Cloud and infra</div>
                        </div>
                    </div>
                </div>
                <div className='leaderBoardSecondBox'>
                    <div className='studentPositionBoxLeaderBoard' style={{ marginTop: '8px' }}>
                        <div className='studentPhotoBoxLeaderBoard' >
                            <img className='studentPhotoBoxLeaderBoardImgFirst' alt='' src={firstposition} />
                            <img className='studentPhotoBoxLeaderBoardImg' alt='' src={profile} />
                            <div>1</div>
                        </div>
                        <div className='studentNameBoxLeaderBoard'>
                            <div>Abhishek tiwari</div>
                            <div>Cloud and infra</div>
                        </div>
                    </div>
                </div>
                <div className='leaderBoardThirdBox'>
                    <div className='studentPositionBoxLeaderBoard'>
                        <div className='studentPhotoBoxLeaderBoard' >
                            <img className='studentPhotoBoxLeaderBoardImg' alt='' src={profile} />
                            <div>3</div>
                        </div>
                        <div className='studentNameBoxLeaderBoard'>
                            <div>Abhishek tiwari</div>
                            <div>Cloud and infra</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default TopPerformingStudents