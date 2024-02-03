export const quickQuestions3 = [
    "What are the guidelines for password protection in the PNB password protection policy?",
    "Who do I contact in order to know more about the policy?",
]
export const quickQuestions4 = [
    "What happens if I do not comply to the policy?",
    " I would like to know how Technology Division manages PNB's on-premise and cloud infrastructure.",
]

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