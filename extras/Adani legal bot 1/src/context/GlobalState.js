import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { apiURL } from "../config";
let cancelTokenSource;

const initialState = {
    users: [
        {
            email: "user@adani.com",
            password: "adani"
        }
    ],
    loading: false,
    toggleAskQuestion: true,
    historyModalShow: false,
    isSpeakVoice: false,
    documentFiles: [1,2],
    // documentFiles: [],
    dropDownIcon: "up",
    dropDownIcon1: "up",
    historyItems: [],
    chatMessages: [],
    qnaLoading: false,
    isLastMsgSpeak: false,
    toggleSidebarDisplay: true,
    voiceLoading: false
}
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const navigate = useNavigate();

    // user login function
    const loginFunction = (email, password) => {
        const users = state.users.filter((user) => user.email === email && user.password === password);
        if (users.length > 0) {
            const getToken = localStorage.getItem("userTokenId");
            if (!getToken) {
                localStorage.setItem("userTokenId", generateString(15))
            }
            localStorage.setItem("userTokenLogin", generateString(15))
            navigate("/home");
        } else {
            toast.error("Your login has been denied. The username or password you entered is incorrect.")
        }
    }

    //generate token with date
    function generateString(length) {
        let token = "";
        const possibleChars = "0123456789";

        for (let i = 0; i < length; i++) {
            token += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
        }
        // const tokenData = {
        //     token: token,
        //     generatedAt: new Date().toISOString()
        // };

        return token;
    }

    // toggleAskQuestionStateFun function
    function toggleAskQuestionStateFun(isTrueorFalse) {
        dispatch({
            type: "TOGGLE_ASK_QUESTION",
            payload: isTrueorFalse
        });
    }

    function isLastMsgSpeakFun(isSpeak) {
        dispatch({
            type: "LAST_MESSAGE_SPEAK",
            payload: isSpeak
        });
    }

    function voiceLoadingFun(isVoice) {
        dispatch({
            type: "TOGGLE_VOICE_LOADING",
            payload: isVoice
        });
    }

    // toggleVoiceType function
    function toggleVoiceType(isChecked) {
        dispatch({
            type: "TOGGLE_VOICE_TYPE",
            payload: isChecked
        });
    }

    function toggleSidebarFun(isChecked) {
        dispatch({
            type: "TOGGLE_SIDEBAR_DISPLAY",
            payload: isChecked
        });
    }

    // toggleDropDownHandler function
    function toggleDropDownHandler(dropdownType) {
        dispatch({
            type: "TOGGLE_DROPDOWN_HANDLER",
            payload: dropdownType
        });
    }

    // toggleDropDownHandler function
    function toggleDropDownHandler1(dropdownType) {
        dispatch({
            type: "TOGGLE_DROPDOWN_HANDLER1",
            payload: dropdownType
        });
    }

    // toggleHistoryModalShowFun function
    function toggleHistoryModalShowFun() {
        dispatch({
            type: "TOGGLE_HISTORY_MODAL_SHOW",
            payload: !state.historyModalShow
        });
    }

    //get current date time function
    function currentDateTime(type) {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        let formattedDateTime = "";
        if (type === 1) {
            formattedDateTime = `${day}/${month}/${year}`;
        } else {
            formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
        return formattedDateTime;
    }

    // upload document file function
    async function uploadFileDoc(files) {
        if (files.length > 0) {
            const toastId = toast.loading("File uploading....");
            var data = new FormData();
            data.append('file', files[0]);

            var config = {
                method: 'post',
                url: `${apiURL}/upload`,
                data: data
            };
            axios(config)
                .then(function (response) {
                    toast.dismiss(toastId)
                    if (response.status === 200) {
                        toast.success("File uploaded successfully.");
                        dispatch({
                            type: "ADD_DOCUMENT",
                            payload: [files[0].path, currentDateTime(1)]
                        });
                        navigate("/home");
                    } else {
                        toast.error("Something went wrong.");
                    }
                })
                .catch(function (error) {
                    toast.dismiss(toastId)
                    toast.error("Something went wrong.");
                    console.log(error);
                });
        } else {
            toast.error("Please select a file to upload.")
        }
    }

    //get all file list api calling function
    async function getFileList() {
        dispatch({
            type: "LOADING_TRUE",
        });
        var config = {
            method: 'get',
            url: `${apiURL}/fileslist`,
        };
        axios(config)
            .then(function (response) {
                dispatch({
                    type: "LOADING_FALSE",
                });
                console.log(response, "response")
                if (response.status === 200) {
                    dispatch({
                        type: "ADD_DOCUMENTS",
                        payload: [response.data["Allfiles"]]
                    });
                } else {
                    toast.error("Something went wrong.");
                }
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: "LOADING_FALSE",
                });
            });
    }
    //Ask from the Uploaded Documents function
    async function askQuestionsFmDocuments(payload) {
        const getUserId = localStorage.getItem("userTokenId");
        isLastMsgSpeakFun(false);
        let endpint = "qa";
        let apiType = 1;
        if (payload.type === 2) {
            endpint = "consent-qna";
            apiType = 2;
            dispatch({
                type: "ADD_QNA_MESSAGE",
                payload: { message: "Yes", language: payload.language, type: "user", time: currentDateTime(2) }
            });
        } else {
            dispatch({
                type: "ADD_QNA_MESSAGE",
                payload: { message: payload.query, language: payload.language, type: "user", time: currentDateTime(2) }
            });
        }
        cancelTokenSource = axios.CancelToken.source();
        dispatch({
            type: "QNA_LOADING_TRUE",
        });
        var data = new FormData();
        data.append('question', payload.query);
        data.append('lang_code', payload.language);
        data.append('user_id', getUserId);
        var config = {
            method: 'post',
            url: `${apiURL}/${endpint}`,
            data: data,
            cancelToken: cancelTokenSource.token // attach the cancel token to the request
        };

        axios(config)
            .then(function (response) {
                dispatch({
                    type: "QNA_LOADING_FALSE",
                });
                if (response.status === 200) {
                    const resData = response.data;
                    if (resData) {
                        dispatch({
                            type: "ADD_QNA_MESSAGE",
                            payload: { message: resData.answer, language: payload.language, type: "bot", related_questions: resData.related_questions ? resData.related_questions : []  ,apiType: apiType, time: currentDateTime(2), question: payload.query }
                        });
                    }
                    isLastMsgSpeakFun(true);
                    // console.log(response.data)
                } else {
                    dispatch({
                        type: "ADD_QNA_MESSAGE",
                        payload: { message: "We apologize, but we are currently unable to generate a response. Please try again.", related_questions: [], language: "en", apiType: 2, type: "bot", time: currentDateTime(2) }
                    });
                    // toast.error("Something went wrong.");
                }
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: "QNA_LOADING_FALSE"
                });
                dispatch({
                    type: "ADD_QNA_MESSAGE",
                    payload: { message: "We apologize, but we are currently unable to generate a response. Please try again.", language: "en", related_questions: [], apiType: 2, type: "bot", time: currentDateTime(2) }
                });
                // handle the error
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                    return;
                }
            });
        return cancelTokenSource;
    }

    //cancel request midway
    function cancelRequestMiday() {
        if (cancelTokenSource) {
            cancelTokenSource.cancel("Request canceled by the user");
        }
    }

    //get history
    async function getHistory() {
        const getUserId = localStorage.getItem("userTokenId");
        var data = new FormData();
        data.append('user', getUserId);
        var config = {
            method: 'post',
            url: `${apiURL}/history`,
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(response, "history response")
                if (response.status === 200) {
                    if (response.data !== "No History") {
                        dispatch({
                            type: "ADD_HISTORY_ITEMS",
                            payload: response.data["questions"]
                        });
                    }
                } else {
                    toast.error("Something went wrong.");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //claer history function
    async function clearHistory() {
        const getUserId = localStorage.getItem("userTokenId");
        var data = new FormData();
        data.append('user_id', getUserId);
        const toastId = toast.loading("Clearing history. Please wait....");
        var config = {
            method: 'post',
            url: `${apiURL}/clearhistory`,
            data: data
        };
        axios(config)
            .then(function (response) {
                toast.dismiss(toastId);
                if (response.status === 200) {
                    dispatch({
                        type: "ADD_HISTORY_ITEMS",
                        payload: []
                    });
                } else {
                    toast.error("Something went wrong.");
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.dismiss(toastId);
            });
    }


    //restart QNA function 
    function removeAllQNA() {
        dispatch({
            type: "REMOVE_QNA",
            payload: []
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                users: state.users,
                loading: state.loading,
                toggleAskQuestion: state.toggleAskQuestion,
                historyModalShow: state.historyModalShow,
                isSpeakVoice: state.isSpeakVoice,
                documentFiles: state.documentFiles,
                dropDownIcon: state.dropDownIcon,
                dropDownIcon1: state.dropDownIcon1,
                chatMessages: state.chatMessages,
                historyItems: state.historyItems,
                qnaLoading: state.qnaLoading,
                isLastMsgSpeak: state.isLastMsgSpeak,
                toggleSidebarDisplay: state.toggleSidebarDisplay,
                voiceLoading: state.voiceLoading,
                navigate,
                loginFunction,
                toggleAskQuestionStateFun,
                toggleHistoryModalShowFun,
                toggleVoiceType,
                uploadFileDoc,
                getFileList,
                toggleDropDownHandler,
                toggleDropDownHandler1,
                askQuestionsFmDocuments,
                getHistory,
                clearHistory,
                removeAllQNA,
                isLastMsgSpeakFun,
                toggleSidebarFun,
                currentDateTime,
                cancelRequestMiday,
                voiceLoadingFun
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}