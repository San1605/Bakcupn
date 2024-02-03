import React from 'react'
import "./MentorDetails.css"
const MentorDetails = () => {
    return (
        <div className='MentorDetails'>
            <div className='MentorDetailsHeading'>Mentor Details</div>
            <div className='MentorDetailsDiv'>
                <div className="ctmentorDetails">
                    <div className='MentorFieldDashboard'>
                        <span>CT Mentor Name :</span>
                        <span>Abhishek Tiwari</span>
                    </div>
                    <div className='MentorFieldDashboard'>
                        <span>Course Name :</span>
                        <span>Node js</span>
                    </div>
                    <div className='MentorFieldDashboard'>
                        <span>Contact Number :</span>
                        <span>9999999999</span>
                    </div>
                    <div className='MentorFieldDashboard'>
                        <span>Email ID :</span>
                        <span>abhishektiwari@gmail.com</span>
                    </div>
                </div>
                <div className="facultyMentors">
                    <div className='MentorFieldDashboard'>
                        <span>Faculty Mentor Name :</span>
                        <span>ABhishek Tiwari</span>
                    </div>
                    <div className='MentorFieldDashboard'>
                        <span>Course Name :</span>
                        <span>Nodejs_001</span>
                    </div>
                    <div className='MentorFieldDashboard'>
                        <span>Contact Number :</span>
                        <span>0000000000</span>
                    </div>

                    <div className='MentorFieldDashboard'>
                        <span>Email ID :</span>
                        <span>abhishek@gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MentorDetails
