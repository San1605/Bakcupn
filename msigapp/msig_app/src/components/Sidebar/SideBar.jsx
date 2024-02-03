import React, { useEffect, useState } from 'react'
import "./SideBar.css"
import logo from "../../assets/org_logo_light.png"
import historyIcon from "../../assets/historyIcon.svg"
import Dots from "../../assets/dots.svg"
import profileIcon from "../../assets/profileIcon.svg"
import manageUserIcon from "../../assets/manageUserIcon.svg"
import editIconSideBar from "../../assets/editIconSideBar.svg"
import deleteIcon from "../../assets/DeleteIcon.svg"
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../../config'
import { addUserChats, setActiveIndex, setDisableSidebarList, setLoadingForBotPage, setNewChatUrl } from '../../redux/actions'
import { RotatingLines } from 'react-loader-spinner'
import dashboard from "../../assets/dashboard.svg"
import terms from "../../assets/terms.svg"
import toast, { Toaster } from 'react-hot-toast'
import signOut from "../../assets/signout.svg"





const SideBar = () => {

    const navigate = useNavigate();
    const userRole = localStorage.getItem("user-role")
    const userEmail = localStorage.getItem("user-email")
    const userName = localStorage.getItem("user-name")

    // const userRole = useSelector(state => state.userRole)
    const [searchHistory, setSearchHistory] = useState([]);
    const [isEdit, setIsEdit] = useState(-1);
    const [editedText, setEditedText] = useState("");
    // const [activeIndex, setActiveIndex] = useState(-1)
    const dispatch = useDispatch();
    const chatArr = useSelector((store) => store.chatArr)
    // const userEmail = useSelector(state => state.userEmail)
    const loadingForBotPage = useSelector((store) => store.loadingForBotPage)
    const activeIndex = useSelector((store) => store.activeIndex)
    const disableSidebarList = useSelector((store) => store.disableSidebarList);
    const location = useLocation();

    const [showLogout, setShowLogout] = useState(false);
    console.log(userEmail, userRole, "rollllllllllllll")


    const addNewChat = () => {
        if (chatArr[0]?.conversationArray?.length > 0 || chatArr.length === 0) {
            const arr = [{
                conversationId: "New Chat",
                conversationArray: []
            }, ...chatArr];
            dispatch(addUserChats(arr))
        }
        if (chatArr?.length !== 0) {
            sendDataBackToBackend(chatArr[activeIndex], Number(activeIndex) + 1);
        }
        dispatch(setActiveIndex(0));
        navigate(`/user-chatbot/conversation/0`);
    };

    const deleteHistoryItem = async (item, idx) => {
        try {
            await deleteRecord(idx)
            getHistoryData()
            const arr = searchHistory.filter((ele) => ele !== item)
            setSearchHistory(arr)
            const arrChar = chatArr.filter((item, index) => index !== idx)
            // console.log(arrChar);
            // dispatch(addUserChats(arrChar))
            if (idx !== 0 && idx === chatArr.length - 1) {
                navigate(`/user-chatbot/conversation/${Number(idx) - 1}`);
                dispatch(setActiveIndex(idx - 1))
            }
        }
        catch (error) {
            // console.log(error)
        }


    }
    const editHistoryItem = (item, index) => {
        setEditedText(item)
        setIsEdit(index);
    }
    const handleEdit = (index) => {
        const arr = [...searchHistory]
        arr[index] = editedText;
        setSearchHistory(arr)
        setIsEdit(-1);
        setEditedText("")
    }
    const getHistoryData = async () => {
        const data = new FormData();
        data.append("user_email", userEmail);
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/GetHistoryData`,
            data: data
        };
        dispatch(setLoadingForBotPage(true))
        try {
            const response = await axios(config);

            if (!response || response.status !== 200 || !response.data || !response.data.data) {
                console.error("Invalid response format");
                return;
            }

            if (response.status === 200) {
                if (response?.data?.data) {
                    const arr = response?.data?.data?.data;
                    // console.log(arr, "arr")
                    const chatArray = [];
                    arr.forEach(item => {
                        const key = Object.keys(item)[0];
                        const value = item[key];
                        if (value?.length > 0) {
                            const eachChatArray = [];
                            value.forEach((ele) => {
                                if (ele?.role && ele?.text && (ele.role === "user" || ele.role === "bot") && ele.text.trim() !== "") {
                                    eachChatArray.push({
                                        role: ele.role,
                                        text: ele.text,
                                        regenerate: ele?.regenerate,
                                        regenerateArray: ele?.regenerateArray,
                                    });
                                }
                            });

                            if (eachChatArray.length > 0) {
                                chatArray.push({
                                    conversationId: key,
                                    conversationArray: eachChatArray
                                });
                            }

                        }
                    })

                    // for previous response
                    // arr.forEach(item => {
                    //     const eachChatArray = [];
                    //     const key = Object.keys(item)[0];
                    //     item[key]?.forEach((ele) => {
                    //         let messageBot;
                    //         let messageUser;
                    //         if (ele?.data?.Query) {
                    //             messageUser = {
                    //                 role: "user",
                    //                 text: ele?.data?.Query
                    //             }
                    //         }
                    //         if (ele?.data?.Bot) {
                    //             messageBot = {
                    //                 role: "bot",
                    //                 text: ele?.data?.Bot,
                    //             }
                    //         }
                    //         if (messageUser) {
                    //             eachChatArray.push(messageUser)
                    //         }
                    //         if (messageBot) {
                    //             eachChatArray.push(messageBot)
                    //         }
                    //     })
                    //     chatArray.push({
                    //         conversationId: key,
                    //         conversationArray: eachChatArray
                    //     })
                    // });


                    // console.log(chatArray, "ChatArray")
                    dispatch(addUserChats(chatArray))
                    dispatch(setActiveIndex(0))
                    dispatch(setLoadingForBotPage(false))
                }
            }
        }
        catch (error) {
            dispatch(setLoadingForBotPage(false))
            // console.log(error);
        }
    }

    const sendDataBackToBackend = async (arr, index) => {
        // console.log(index, "index in backend")
        const data = new FormData();
        data.append("email", userEmail);
        data.append("list_json", JSON.stringify(arr?.conversationArray));
        if (arr?.conversationId !== "New Chat") {
            data.append("url", arr?.conversationId)
        }

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/Submit`,
            data: data
        };

        try {
            const response = await axios(config);
            if (response.status === 200) {
                const newChatUrl = response.data?.url;
                dispatch(setNewChatUrl({ idx: index, newChatUrl }))
            }
        }
        catch (error) {
            // console.log(error);
        }
    }

    const deleteRecord = async (index) => {
        const toastId = toast.loading("Please wait .....")
        dispatch(setDisableSidebarList(true))
        const data = new FormData();
        data.append("user_email", userEmail);
        data.append("url", chatArr[index]?.conversationId)

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/DeleteRecord`,
            data: data
        };

        try {
            const response = await axios(config);
            if (response.status === 200) {
                // console.log(response.data);
                dispatch(setDisableSidebarList(false))
                toast.dismiss(toastId)
                toast.success("Record deleted")
            }
        }
        catch (error) {
            // console.log(error);
            toast.dismiss(toastId)
            toast.error("something went wrong")
            throw new Error(error)
        }
        toast.dismiss(toastId)
    }

    useEffect(() => {
        getHistoryData();
    }, [])

    useEffect(() => {
        // console.log(chatArr);
        const arr = chatArr?.map((item) => item?.conversationArray?.length > 0 ? item?.conversationArray[0]?.text : "New Chat")
        setSearchHistory(arr);
    }, [chatArr])

    const handleLogout = () => {
        localStorage.removeItem("user-email")
        localStorage.removeItem("user-role")
        localStorage.removeItem("user-region")
        localStorage.removeItem("user-name")
        navigate('/')
    }




    // console.log(disableSidebarList, "disableSidebarList")

    // useEffect(() => {
    //     if (activeIndex !== -1 && chatArr[activeIndex]?.conversationArray?.length > 0) {
    //          sendDataBackToBackend(chatArr[activeIndex]);
    //     };
    // }, [activeIndex])


    return (
        <div className='SideBar'>
            <div className='logo' style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                <img src={logo} alt="logo" />
            </div>
            {/* <div className='upperPart'> */}
            <div className="lowerPart">
                <div className='lowerPartDiv' style={{ display: "flex", flexDirection: 'column', gap: "10px" }}>
                    {
                        (userRole === "superadmin" || userRole === 'admin') &&

                        <Link to={'/manage-users'} >
                            <div className={`tile ${(location.pathname === "/manage-users" || location.pathname === "/user-profile") ? "activeTile" : ""}`}>
                                <img src={manageUserIcon} alt='' />
                                <span>Manage Users</span>
                            </div>
                        </Link>
                    }
                    {
                        (userRole === "superadmin") &&

                        <Link to={'/super-admin-dashboard'}>
                            <div className={`tile  ${location.pathname === "/super-admin-dashboard" && "activeTile"}`}>
                                <img src={dashboard} alt='' />
                                <span>Dashboard</span>
                            </div>
                        </Link>
                    }

                    {console.log("Location", location.pathname)}
                    {location.pathname.startsWith("/user-chatbot/conversation/") && <div className='newChat' style={{
                        pointerEvents: disableSidebarList && "none",

                    }} onClick={() => {
                        if (!loadingForBotPage) {
                            addNewChat()
                        }
                    }}>
                        + New chat
                    </div>}


                </div>


                <div className="history" style={{ height: userRole === 'super-admin' && '52vh' }}>
                    {
                        (userRole === "superadmin" || userRole === 'admin')
                            ?
                            <div className='historyText' style={{
                                pointerEvents: disableSidebarList && "none",

                            }}
                                onClick={() => {
                                    if (!loadingForBotPage) {
                                        addNewChat()
                                    }
                                }}>Chat</div>
                            :
                            <div className='historyText'>History</div>
                    }

                    {
                        loadingForBotPage ? (
                            <div className="historyItems">
                                {searchHistory?.map((item, index) => (
                                    <div style={{
                                        pointerEvents: disableSidebarList && "none"
                                    }} className={`${index === activeIndex && "historyItemDivClick"}  historyItemDiv`} key={index} onClick={() => {
                                        sendDataBackToBackend(chatArr[activeIndex], activeIndex);
                                        dispatch(setActiveIndex(index));
                                        //  setActiveIndex(index)
                                        navigate(`/user-chatbot/conversation/${index}`)
                                    }}>
                                        <div className='historyItemLeft'>
                                            <img className='historyItemDivImg' src={historyIcon} alt='' />
                                            {
                                                isEdit === index ? (
                                                    <input
                                                        className='historyItemInput'
                                                        type='text'
                                                        value={editedText}
                                                        onChange={(e) => setEditedText(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                handleEdit(index)
                                                            }
                                                        }}
                                                    />) :
                                                    (<span className='historyItemSpan'>{item}</span>)
                                            }

                                        </div>
                                        <div className='historyItemActions'>
                                            {/* <img src={editIconSideBar} alt='Edit' className='editIcon' onClick={() => editHistoryItem(item, index)} /> */}
                                            <img src={deleteIcon} alt='Delete' className='deleteIcon' onClick={(e) => {
                                                e.stopPropagation()
                                                deleteHistoryItem(item, index)
                                            }} />
                                        </div>
                                    </div>
                                ))
                                }
                            </div>
                        ) : (
                            <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="20"
                                visible={true}
                            />
                        )
                    }
                </div>
                <div className="SideBarBottom">
                    {/* show only when user is admin  */}
                    {/* {
                        (userRole === "super-admin" || userRole === 'admin') &&

                        <Link to={'/user-admin'}>
                            <div className="manageUser">
                                <img src={manageUserIcon} alt='' />
                                <span>Manage Users</span>
                            </div>
                        </Link>
                    }
                    {
                        (userRole === "super-admin") &&

                        <Link to={'/user-admin'}>
                            <div className="manageUser">
                                <img src={dashboard} alt='' />
                                <span>Dashboard</span>
                            </div>
                        </Link>
                    }
                     {
                        (userRole === "super-admin" || userRole === 'admin') &&

                        <Link to={'/user-admin'}>
                            <div className="manageUser">
                                <img src={terms} alt='' />
                                <span>Terms and condition Users</span>
                            </div>
                        </Link>
                    } */}


                    {
                        (userRole === "superadmin") &&
                        <Link to={'/service-agreement'}>
                            <div className="tile" style={{ background: 'transparent' }}>
                                <img src={terms} alt='' />
                                <span>Service Agreement</span>
                            </div>
                        </Link>
                    }


                    <div className="profile">
                        <div className='profile-icon'>
                            <img src={profileIcon} alt='' />
                            <span>{userName}</span>
                        </div>
                        <img src={Dots} alt="" onClick={() => {
                            setShowLogout(!showLogout)
                        }} />
                    </div>
                    {
                        showLogout && <div className='logoutButton' onClick={handleLogout}>
                            <img src={signOut} alt='' />
                            <button>Sign Out</button>
                        </div>
                    }

                </div>

            </div>
            <Toaster />
        </div>
    )
}
export default SideBar