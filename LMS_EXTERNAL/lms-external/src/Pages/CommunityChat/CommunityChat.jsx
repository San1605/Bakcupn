import React, { useContext, useState } from 'react'
import SearchBox from "../../Components/SearchBox/SearchBox"
import "./CommunityChat.css"
import { filter, communityMentor, sendMessage, emojiUplaod } from "../../Assets/globalIcons"

import GeneralFileCard from "../../Components/GeneralFileCard/GeneralFileCard"
import MessageComponent from '../../Components/MessageComponent/MessageComponent'
import MemberCard from '../../Components/MemberCard/MemberCard'
import { GlobalContext } from '../../Context/GlobalContext'

const mentorList = [
    { name: 'Alice', status: 'online' },
    { name: 'Bob', status: 'offline' },
    { name: 'Charlie', status: 'online' },
    { name: 'David', status: 'offline' },
    { name: 'Eva', status: 'online' },
    { name: 'Frank', status: 'offline' },
    { name: 'Grace', status: 'online' },
    { name: 'Hank', status: 'offline' },
    { name: 'Ivy', status: 'online' },
    { name: 'Jack', status: 'offline' },
];
const generalFiles = [
    { name: 'Document.pdf', readTime: '2 min read' },
    { name: 'Image.jpg', readTime: '5 min read' },
    { name: 'Presentation.pptx', readTime: '3 min read' },
    { name: 'Spreadsheet.xlsx', readTime: '4 min read' },
    { name: 'Article.docx', readTime: '6 min read' },
    { name: 'Video.mp4', readTime: '8 min read' },
    { name: 'CodeSnippet.js', readTime: '1 min read' },
    { name: 'Audio.mp3', readTime: '7 min read' },
    { name: 'Diagram.png', readTime: '3 min read' },
    { name: 'Presentation2.pptx', readTime: '4 min read' },
];

const CommunityChat = () => {
    const tabsList = ["Group members", "Files"];
    const [selectedTab, setSelectedTab] = useState(0);
    const [inputText, setInputText] = useState("");
    const { socket, communityChatArray, dispatch } = useContext(GlobalContext);
    const role = localStorage.getItem('role');
    const sendChatMessage = () => {
        if (inputText.trim() !== "") {
            socket.emit("message", {
                parentId: "0",
                user: "sandesh",
                roomID: 'N_0001',
                text: inputText
            })
            setInputText("");
        }
    }

    return (
        <div className='adminCollegesStudentDiv'style={{
            height: (role === "user" ||  role === 'Mentor') && "100%"
        }}>
            <div className='CommunityChatContainer' >
                <div className='lpListHeader'>
                    <span>All Interactions</span>
                    <div className='lpListHeaderRight'>
                        <SearchBox placeholder={"Search By Role or name"} />
                        <img src={filter} alt='' />
                    </div>
                </div>
                <div className="chatContainer">

                    <div className="firstChatContainer">
                        <div className="inputChatContainer">
                            <div className='upperinputChatContainer'>
                                <div className='upperinputChatContainerImg'>
                                    <img alt='' src={communityMentor} />
                                </div>
                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder='Make an announcement or interact with students....'
                                    name="" id=""
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            sendChatMessage()
                                        }
                                    }}
                                // cols="70"
                                // rows="3"
                                />
                            </div>
                            <div className='lowerInputChatContainer'>

                                <img src={emojiUplaod} alt='' />

                                <select className='selectDomain' name="" id="">
                                    <option value="" hidden>Choose Domain</option>
                                    <option value="">App Development</option>
                                    <option value="">Data Science</option>
                                </select>
                                <div className="sendMessagediv" onClick={sendChatMessage}>
                                    <img src={sendMessage} alt='' />
                                </div>
                            </div>
                        </div>

                        <MessageComponent />

                    </div>
                    <div className="secondChatContainer">
                        <div className='communityChatRightHeader'>
                            <div className='tabs'>
                                {
                                    tabsList?.map((item, index) => (
                                        <div key={index} className={`tab ${selectedTab === index && "selectedTabCC"}`} onClick={() => setSelectedTab(index)}>{item}</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="secondChatBody">
                            {
                                selectedTab === 0 ? (
                                    <div className='CommunityMembers'>
                                        <div className="members">
                                            <span>Mentors</span>
                                            <div className="membersList">
                                                {
                                                    mentorList?.map((item, index) => (
                                                        <MemberCard {...item} key={index} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="students">
                                            <span>Students</span>
                                            <div className="membersList">
                                                {
                                                    mentorList?.map((item, index) => (
                                                        <MemberCard {...item} key={index} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='communityGeneralFiles'>
                                        {
                                            generalFiles?.map((item, index) => (
                                                <GeneralFileCard {...item} key={index} />
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityChat
