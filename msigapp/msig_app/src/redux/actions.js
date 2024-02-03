export const LOGIN_SCREEN_TYPE = "LOGIN_SCREEN_TYPE"
export const USER_STATUS = "USER_STATUS"
export const SET_USER_ROLE = "SET_USER_ROLE"
export const SET_USER_EMAIL = "SET_USER_EMAIL"
export const SET_SELECTED_USER = "SET_SELECTED_USER"
export const SET_SELECTED_EMAIL = "SET_SELECTED_EMAIL"
export const SET_SELECTED_ROLE = "SET_SELECTED_ROLE"
export const SET_SELECTED_STATUS = "SET_SELECTED_STATUS"
export const SET_SELECTED_VALIDITY = "SET_SELECTED_VALIDITY"
export const SET_SELECTED_TOKEN = "SET_SELECTED_TOKEN"
export const SET_USER_REGION = "SET_USER_REGION"
export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_USER_LIST = "SET_USER_LIST";
export const ADD_CHATS = "ADD_CHATS";
export const ADD_CONVERSATION_ID="ADD_CONVERSATION_ID"
export const SET_LOADING="SET_LOADING"
export const SET_DISABLE_LIST="SET_DISABLE_LIST"
export const SET_ACTIVE_INDEX= "SET_ACTIVE_INDEX"
export const SET_NEWCHATURL="SET_NEWCHATURL";
export const POP_LAST_MSG="POP_LAST_MSG";
export const SET_CARD_DATA = "SET_CARD_DATA"

export const setLoginScreenType = value => ({
    type: LOGIN_SCREEN_TYPE,
    payload: value
})

export const setIsUser = value => ({
    type: USER_STATUS,
    payload: value
})

export const setUserRole = value => ({
    type: SET_USER_ROLE,
    payload: value
})

export const setUserEmail = value => ({
    type: SET_USER_EMAIL,
    payload: value
})

export const setSelectedUser = value => ({
    type: SET_SELECTED_USER,
    payload: value
})

export const setSelectedEmail = value => ({
    type: SET_SELECTED_EMAIL,
    payload: value
})

export const setSelectedRole = value => ({
    type: SET_SELECTED_ROLE,
    payload: value
})

export const setSelectedValidity = value => ({
    type: SET_SELECTED_VALIDITY,
    payload: value
})

export const setSelectedStatus = value => ({
    type: SET_SELECTED_STATUS,
    payload: value
})

export const setSelectedToken = value => ({
    type: SET_SELECTED_TOKEN,
    payload: value
})

export const setUserRegion = value => ({
    type: SET_USER_REGION,
    payload: value
})

export const addMessageInChatArr = value => ({
    type: ADD_MESSAGE,
    payload: value
})

export const addUserChats = value => ({
    type: ADD_CHATS,
    payload: value
})

export const setUserList = value => ({
    type: SET_USER_LIST,
    payload: value
})

export const setConversationId = value => ({
    type: ADD_CONVERSATION_ID,
    payload: value
})


export const setLoadingForBotPage = value => ({
    type: SET_LOADING,
    payload: value
})

export const setActiveIndex = value => ({
    type: SET_ACTIVE_INDEX,
    payload: value
})

export const setDisableSidebarList = value => ({
    type: SET_DISABLE_LIST,
    payload: value
})

export const setNewChatUrl = value => ({
    type: SET_NEWCHATURL,
    payload: value
})

export const popLastMessages = value => ({
    type: POP_LAST_MSG,
    payload: value
})

export const setSelectedCardData = value => ({
    type: SET_CARD_DATA,
    payload: value
})