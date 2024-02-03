import React, { useContext } from "react";
import "./helpyou.css";
import { Row, Col, Container } from "react-bootstrap";
import { GlobalContext } from "../../context/GlobalState";

//sample hepy you questions with topics
const helpYouTopicsQna =
    [
        {
            "topic": "Query 1",
            "question": "Provide step by step process to export coffee from kenya to US?"
        },
        {
            "topic": "Query 2",
            "question": "What are the rules of origin for preferential tariffs for Kenya export to US?"
        },
        {
            "topic": "Query 3",
            "question": "What does product code 90121 means?"
        },
        {
            "topic": "Query 4",
            "question": "What is the average trade value for coffee in last year?"
        },
        {
            "topic": "Query 5",
            "question": "What is the average tariff on exports from Kenya to US on coffee?"
        },
        {
            "topic": "Query 6",
            "question": "How can I start trading coffee from Kenya to USA?"
        }
    ];

function HelpYouQuestions() {
    const { toggleAskQuestionStateFun, askQuestionsFmDocuments } = useContext(GlobalContext);

    //sample question ask from document and askQuestionsFmDocuments calling
    const askSampleQuestion = (question) => {
        toggleAskQuestionStateFun(false);
        const payload = {
            "query": question,
            "language": "en",
        };
        askQuestionsFmDocuments(payload);
    };

    return (
        <div className="helpyou-container">
            <Container className="helpyou-subcontainer">
                <Row>
                    <Col xs={12}>
                        <div className="heading-rectangle">
                            <p>Hello! 👋</p>
                            <span>I am your copilot on your journey through this academic year,<br></br>how can I help you?.</span>
                        </div>
                    </Col>
                    <div className="all-qna">
                        <Row>
                            {helpYouTopicsQna.length > 0 ? helpYouTopicsQna.map((question, index) => {
                                return (
                                    <Col xs={12} sm={6} md={6} key={index} className='statement-col' onClick={() => askSampleQuestion(question.question)}>
                                        <div className='statement'>
                                            <div className='statement-heading'>{question.topic}</div>
                                            <div className="statement-statement">{question.question}</div>
                                        </div>
                                    </Col>
                                );
                            }) : <div className="no-conversation">No sample question found.</div>}
                        </Row>
                    </div>
                </Row>
            </Container>
        </div>
    );
}

export default HelpYouQuestions;
