const AppReducer = (state, action) => {
    switch (action.type) {
        case "LOADING_TRUE":
            return {
                ...state,
                loading: true,
            };
        case "LOADING_FALSE":
            return {
                ...state,
                loading: false,
            };
        case "LAST_MESSAGE_SPEAK":
            return {
                ...state,
                isLastMsgSpeak: action.payload,
            };
        case "QNA_LOADING_TRUE":
            return {
                ...state,
                qnaLoading: true,
            };
        case "QNA_LOADING_FALSE":
            return {
                ...state,
                qnaLoading: false,
            };
        case "TOGGLE_ASK_QUESTION":
            return {
                ...state,
                toggleAskQuestion: action.payload,
            };
        case "TOGGLE_HISTORY_MODAL_SHOW":
            return {
                ...state,
                historyModalShow: action.payload,
            };
        case "TOGGLE_VOICE_TYPE":
            return {
                ...state,
                isSpeakVoice: action.payload,
            };
        case "TOGGLE_VOICE_LOADING":
            return {
                ...state,
                voiceLoading: action.payload,
            };
        case "ADD_DOCUMENT":
            return {
                ...state,
                documentFiles: [...state.documentFiles, action.payload],
            };
        case "ADD_QNA_MESSAGE":
            return {
                ...state,
                chatMessages: [...state.chatMessages, action.payload],
            };
        case "REMOVE_QNA":
            return {
                ...state,
                chatMessages: action.payload,
            };
        case "ADD_DOCUMENTS":
            return {
                ...state,
                documentFiles: action.payload,
            };
        case "TOGGLE_DROPDOWN_HANDLER":
            return {
                ...state,
                dropDownIcon: action.payload,
            };
        case "TOGGLE_DROPDOWN_HANDLER1":
            return {
                ...state,
                dropDownIcon1: action.payload,
            };
        case "ADD_HISTORY_ITEMS":
            return {
                ...state,
                historyItems: action.payload,
            };
        case "TOGGLE_SIDEBAR_DISPLAY":
            return {
                ...state,
                toggleSidebarDisplay: action.payload,
            };
        default:
            return state;
    }
};
export default AppReducer;
