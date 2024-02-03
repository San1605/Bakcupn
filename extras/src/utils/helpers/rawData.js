import EKYC from "../../assets/ekyc.svg";
import CREDIT_SCORE from "../../assets/credit_score.svg";
import MORTAGE_LOAN from "../../assets/mortage_loan.svg";
import INTEREST_RATE from "../../assets/interest_rate.svg";


import AML from "../../assets/aml.svg";
import APEX_ENTITY from "../../assets/apex_entity.svg";
import MFRS from "../../assets/mfrs.svg";
import SBR from "../../assets/sbr.svg";

export const quickQuestions1 =
    window.innerWidth > 635
        ? [
            "What is e-kyc?",
            "What is return on intvestment?",
            "What is a mortgage loan?",
        ]
        : ["What is e-kyc?", "What is credit score?"];
export const quickQuestions2 =
    window.innerWidth > 635
        ? [
            "Why is a good credit score important?",
            "What is the purpose of a bank's capital reserves?",
        ]
        : ["What is mortage loan?", "What is interest rate?"];


export const quickQuestions3 =
    window.innerWidth > 635
        ? [
            "Why is the SBR being introduced?",
            "General requirements for financial institutions?",
            "Mitigation measures that should be followed?",
        ]
        : ["What is AML?", "What is MFRS?"];
export const quickQuestions4 =
    window.innerWidth > 635
        ? [
            "What are the risk metrics that should be followed?",
            "Would my loan instalment be affected when there is a change in the SBR, BR and BLR?",
        ]
        : ["What is apex entity?", "What is SBR?"];


export const scrollToBottom = () => {
    const chatContainer = document.getElementById("chats-container");
    if (chatContainer !== null) {
        const lastMsg = chatContainer.lastElementChild;
        const lastMsgHeight = lastMsg?.offsetHeight;
        const chatContainerHeight = chatContainer?.offsetHeight;
        const maxScrollTop = chatContainer.scrollHeight - chatContainerHeight;
        let newScrollTop = maxScrollTop + lastMsgHeight;
        if (newScrollTop > maxScrollTop) {
            chatContainer.scrollTop = newScrollTop;
        } else {
            chatContainer.scrollTop = maxScrollTop;
        }
    }
};



export const quickQuestions1Images=[
    EKYC,
    CREDIT_SCORE,
]
export const quickQuestions2Images=[
    MORTAGE_LOAN,
    INTEREST_RATE,
]

export const quickQuestions3Images=[
    AML,
    MFRS,
]
export const quickQuestions4Images=[
    APEX_ENTITY,
    SBR,
]