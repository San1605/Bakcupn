import React, { useState } from 'react'
import "./Notifications.css"
import profile from "../../Assets/icons/profile.svg"
const Notifications = () => {
    const [readNotification, setReadNotification] = useState(Array.from({ length: 20 }).fill(false))
    const notificationsData = [
        {
            id: 1,
            senderName: 'John Doe',
            designation: 'Manager',
            time: '2023-01-10 10:30 AM',
            message: 'You have a new task assigned. Please review the details and provide your feedback at your earliest convenience.',
        },
        {
            id: 2,
            senderName: 'Jane Smith',
            designation: 'Team Lead',
            time: '2023-01-11 11:45 AM',
            message: 'A team meeting iperations review session: Evaluating efficiency and identifying areas for improvement. Bring your suggestions for streamlining processesperations review session: Evaluating efficiency and identifying areas for improvement. Bring your suggestions for streamlining processesperations review session: Evaluating efficiency and identifying areas for improvement. Bring your suggestions for streamlining processess scheduled for tomorrow. It will cover the project updates, upcoming tasks, and any blockers. Make sure to prepare accordingly.',
        },
        {
            id: 3,
            senderName: 'Alice Johnson',
            designation: 'Developer',
            time: '2023-01-12 02:15 PM',
            message: 'Congratulations! Your recent code contribution has been merged successfully. Keep up the great work!',
        },
        {
            id: 4,
            senderName: 'Bob Anderson',
            designation: 'QA Engineer',
            time: '2023-01-13 03:30 PM',
            message: 'Reminder: The deadline for the project proposal submission is approaching. Ensure that all necessary documents are prepared and submitted on time.',
        },
        {
            id: 5,
            senderName: 'Eva Williams',
            designation: 'Designer',
            time: '2023-01-14 04:45 PM',
            message: 'Important: Design review session tomorrow. Bring your design concepts and be prepared to discuss and iterate on them as a team.',
        },
        {
            id: 6,
            senderName: 'David Brown',
            designation: 'Product Manager',
            time: '2023-01-15 06:00 PM',
            message: 'Upcoming feature launch! Make sure all necessary preparations are complete, and be ready to assist with any customer inquiries that may arise.',
        },
        {
            id: 7,
            senderName: 'Grace Taylor',
            designation: 'Marketing Specialist',
            time: '2023-01-16 09:15 AM',
            message: 'Marketing campaign kickoff meeting scheduled for next week. Prepare your insights and ideas to contribute to the planning session.',
        },
        {
            id: 8,
            senderName: 'Chris Wilson',
            designation: 'HR Coordinator',
            time: '2023-01-17 11:30 AM',
            message: 'Employee wellness program update: New yoga sessions will be available starting next month. Stay tuned for more details.',
        },
        {
            id: 9,
            senderName: 'Olivia Miller',
            designation: 'Finance Analyst',
            time: '2023-01-18 02:45 PM',
            message: 'Financial report review session tomorrow. Please ensure all relevant financial data is up-to-date and ready for analysis.',
        },
        {
            id: 10,
            senderName: 'Michael Lee',
            designation: 'IT Support',
            time: '2023-01-19 04:00 PM',
            message: 'IT system maintenance scheduled for this weekend. Some services may experience temporary downtime. Please plan accordingly.',
        },
        {
            id: 11,
            senderName: 'Sophia Davis',
            designation: 'Customer Support',
            time: '2023-01-20 05:15 PM',
            message: 'Customer support training session next week. Review the latest support protocols and be prepared to share your insights.',
        },
        {
            id: 12,
            senderName: 'Daniel Smith',
            designation: 'Sales Representative',
            time: '2023-01-21 07:30 PM',
            message: 'Sales strategy meeting: Discussing new leads and potential collaborations. Bring your ideas for expanding our client base.',
        },
        {
            id: 13,
            senderName: 'Mia White',
            designation: 'Project Coordinator',
            time: '2023-01-22 09:45 AM',
            message: 'Project update: Milestone achieved! Celebrate the team\'s success and get ready for the next phase of the project.',
        },
        {
            id: 14,
            senderName: 'Lucas Johnson',
            designation: 'Research Scientist',
            time: '2023-01-23 12:00 PM',
            message: 'Research findings presentation next week. Prepare your findings and be ready to share insights with the team.',
        },
        {
            id: 15,
            senderName: 'Ava Robinson',
            designation: 'Content Writer',
            time: '2023-01-24 02:15 PM',
            message: 'Content creation workshop: Exploring new content ideas and strategies. Bring your creativity and enthusiasm to the session.',
        },
        {
            id: 16,
            senderName: 'Leo Turner',
            designation: 'Quality Assurance',
            time: '2023-01-25 04:30 PM',
            message: 'QA testing phase begins. Ensure that all test cases are executed, and any issues are reported promptly to maintain product quality.',
        },
        {
            id: 17,
            senderName: 'Zoe Harris',
            designation: 'Social Media Manager',
            time: '2023-01-26 06:45 PM',
            message: 'Social media campaign launch next month. Prepare your social media content and collaborate with the marketing team for a successful launch.',
        },
        {
            id: 18,
            senderName: 'Max Turner',
            designation: 'Graphic Designer',
            time: '2023-01-27 09:00 AM',
            message: 'Design team meeting tomorrow. Discussing upcoming projects and aligning on design goals for the quarter.',
        },
        {
            id: 19,
            senderName: 'Emma White',
            designation: 'Operations Manager',
            time: '2023-01-28 11:15 AM',
            message: 'Operations review session: Evaluating efficiency and identifying areas for improvement. Bring your suggestions for streamlining processesperations review session: Evaluating efficiency and identifying areas for improvement. Bring your suggestions for streamlining processes.perations review session: Evaluating efficiency and identifying areas for improvement. Bring your suggestions for streamlining processes',
        },
        {
            id: 20,
            senderName: 'Oscar Clark',
            designation: 'System Administrator',
            time: '2023-01-29 01:30 PM',
            message: 'System update scheduled for this weekend. Minor disruptions may occur. Ensure that all critical tasks are completed before the update.',
        },
    ];


    return (
        <div className='notificationContainer'>
            <div className='notificationsDiv'>
                <div style={{
                    height: "100%",
                    width: '100%',
                    overflowY: "scroll"
                }}>

                    {
                        notificationsData?.map((item, index) => (
                            <div key={item?.id} className='notficationCard' onClick={() => {
                                const arr = [...readNotification]
                                arr[index] = true;
                                setReadNotification(arr)

                            }} style={{ backgroundColor: readNotification[index] ? "#FAFAFF" : "#FFFFFF" }}>
                                <div>

                                    <img className='notificationProfileImg' src={profile} alt='' />

                                    <div className='notificationMessageDiv'>
                                        <div>
                                            <span>{item?.senderName}</span>
                                            |
                                            <span>{item?.designation}</span>
                                        </div>
                                        <div style={{ color: readNotification[index] ? "#838383" : "#1D1D1D",fontWeight:readNotification[index]?"500":"700" }}>
                                            {item?.message}
                                        </div>
                                    </div>
                                </div>
                                <div>{item?.time}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Notifications
