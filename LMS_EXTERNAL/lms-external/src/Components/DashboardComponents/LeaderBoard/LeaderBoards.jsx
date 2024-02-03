import React from 'react'
import "./LeaderBoard.css"
import { firstposition, profile } from '../../../Assets/globalIcons'
const LeaderBoards = () => {
    return (
        <div className="LeaderBoard">
            <div className='LeaderBoardHeading'>Leader Board</div>
            <div className='LeaderBoardDiv'>
                <div className='leaderBoardfirstDiv'>
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
                <div className='leaderBoardSecondDiv'>
                    {
                        [1, 2, 3, 4]?.map((item, index) => (
                            <div className='leaderBoardOtherPosition' key={index}>
                                <span>3</span>
                                <img alt='' src={profile} />
                                <span>Abhishek Tiwari</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default LeaderBoards
