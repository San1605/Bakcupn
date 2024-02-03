import React, { useContext, useEffect, useState } from 'react';
import './chatbotqa.css';
import { Row, Col, Container } from 'react-bootstrap';
import QuestionIcon from '../../assets/images/icons/question-icon.svg';
import AnswerIcon from '../../assets/images/icons/answer-icon.svg';
import { GlobalContext } from '../../context/GlobalState';
import { Bars } from 'react-loader-spinner';

const ChatBotQA = () => {
    const { voiceLoading, chatMessages, qnaLoading, removeAllQNA, toggleAskQuestionStateFun, cancelRequestMiday, askQuestionsFmDocuments } = useContext(GlobalContext);
    const welcomeMessage = "Hello, how can i assist you today?";

    let objDiv = document.getElementById("chatbody");

    //object div height auto scroll when new message append
    useEffect(() => {
        if (objDiv) {
            objDiv.scrollTop = objDiv.scrollHeight;
        }
        //eslint-disable-next-line
    }, [chatMessages, qnaLoading, voiceLoading]);


    // restart qna and toggle to start page
    const restartQNA = () => {
        removeAllQNA();
        toggleAskQuestionStateFun(true);
    }

    //convert datetime to "hour: min" format
    function getTime(dattime) {
        if (!dattime) {
            dattime = new Date();
        }
        const datetime = new Date(dattime);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(datetime);
        return formattedTime;
    }

    return (
        <div className="documentqa-container">
            <Container className="documentqa-subcontainer">
                <div className='voice-header'>
                    <Row className='align-items-center '>
                        <Col lg={7} md={7} sm={12}>
                            <h6 className='ask-from-doc-heading'>Ask from the Uploaded Documents</h6>
                        </Col>
                        <Col lg={5} md={5} sm={12}>
                            <div className='voices-container'>
                                <button className='restart-btn' disabled={qnaLoading} onClick={() => restartQNA()}>Restart Q&A</button>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className='documents-chat' id='chatbody'>
                    <div className='document-chat-left'>
                        <div className='user-icon'>
                            <img src={AnswerIcon} alt="AnswerIcon" className='chat-icon' />
                        </div>
                        <div className='chat'>
                            <p>{welcomeMessage}</p>
                            <Row>
                                <Col xs={6}><span className='time'>{getTime()}</span></Col>
                            </Row>
                        </div>
                    </div>
                    {
                        chatMessages.length > 0 ?
                            chatMessages.map((message, index) => {
                                return (
                                    message.type === "user" ?
                                        <div className='document-chat-right' key={index}>
                                            <div className='chat'>
                                                <p>{message.message}
                                                </p>
                                                <Row>
                                                    <Col xs={6}><span className='time'>{getTime(message.time)}</span></Col>
                                                </Row>
                                            </div>
                                            <img src={QuestionIcon} alt="QuestionIcon" className='chat-icon' />
                                        </div>
                                        :
                                        <div className='document-chat-left' key={index}>
                                            <div className='user-icon'>
                                                <img src={AnswerIcon} alt="AnswerIcon" className='chat-icon' />
                                            </div>
                                            <div className='chat'>
                                                <p> {message.message}                                                  
                                                </p>
                                                <Row>
                                                    <Col xs={6}><span className='time'>{getTime(message.time)}</span></Col>
                                                </Row>
                                            </div>
                                        </div>
                                )
                            })
                            :
                            // !qnaLoading ? <div className='no-conversation'>The conversation hasn't begun yet. </div> :
                            ""
                    }
                    {
                        qnaLoading &&
                        <div className='document-chat-center'>
                            <button className='stop-generating' onClick={() => cancelRequestMiday()}>
                                <span className='text'>Stop generating</span>
                                <Bars
                                    height="25"
                                    width="25"
                                    color="#505050"
                                    ariaLabel="bars-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </button>
                        </div>
                    }
                    {
                        voiceLoading &&
                        <div className='document-chat-center'>
                            <button className='stop-generating'>
                                <span className='text'>Generating Text</span>
                                <Bars
                                    height="25"
                                    width="25"
                                    color="#505050"
                                    ariaLabel="bars-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </button>
                        </div>
                    }
                </div>
            </Container >
        </div >
    )
}

export default ChatBotQA