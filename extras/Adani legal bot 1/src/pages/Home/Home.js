import React, { useContext, useEffect} from "react";
import Header from "../../components/Header/Header";
import HelpYouQuestions from "../../components/HelpYouQuestions/HelpYouQuestions";
import Sidebar from "../../components/Sidebar/Sidebar";
import './home.css'
import { Row, Col } from "react-bootstrap";
import AskQuestionBot from "../../components/AskQuestionBot/AskQuestionBot";
import ChatBotQA from "../../components/ChatBotQA/ChatBotQA";
import { GlobalContext } from "../../context/GlobalState";
import UploadIcon from '../../assets/images/upload-icon.svg'
import { Bars } from "react-loader-spinner";

const Home = ({type}) => {
    const { toggleAskQuestion, documentFiles, loading, getFileList, toggleSidebarDisplay } = useContext(GlobalContext);
    useEffect(() => {
        // if(documentFiles.length === 0){
            // getFileList();
        // }
    }, [])
    return (
        <>
            {loading === true ? (
                <div className="page-loader-div">
                    <Bars
                        height="50"
                        width="50"
                        color="#2E59C1"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass="page-loader"
                        visible={true}
                    />
                </div>
            ) : null}
            <Header />
            <div className="bottom-container">
                <Sidebar />
                <Row className={`row-without-padding home-main-container ${!toggleSidebarDisplay && "scroll-none"}`}>
                    <Col xs={12}>
                        {documentFiles.length > 0 ? toggleAskQuestion ? <HelpYouQuestions type={type}/> : <ChatBotQA /> :
                            <div className="upload-document-home-div">
                                <div className="no-item">
                                    <div className="no-item-heading">Upload files to get started</div>
                                    <div className="no-item-text">
                                        Click on the Upload button to upload files
                                    </div>
                                    <div className="upload-icon-home">
                                        <img src={UploadIcon} alt='uploadIcon' />
                                    </div>
                                </div>
                            </div>
                        }
                    </Col>
                    <Col xs={12}>
                        <AskQuestionBot type={type}/>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Home;
