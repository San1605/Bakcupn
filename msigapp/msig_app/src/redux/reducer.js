import { LOGIN_SCREEN_TYPE, SET_USER_EMAIL, SET_USER_REGION, SET_USER_ROLE, ADD_MESSAGE, SET_USER_LIST, ADD_CHATS, ADD_CONVERSATION_ID, SET_LOADING, SET_ACTIVE_INDEX, SET_DISABLE_LIST, SET_NEWCHATURL, USER_STATUS, SET_SELECTED_USER, SET_SELECTED_ROLE, SET_SELECTED_STATUS, SET_SELECTED_VALIDITY, SET_SELECTED_EMAIL, SET_SELECTED_TOKEN, POP_LAST_MSG, SET_CARD_DATA } from "./actions";
import { initialState } from "./states";

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SCREEN_TYPE:
            return {
                ...state, loginScreenType: action.payload
            }
        case USER_STATUS:
            return {
                ...state, isUser: action.payload
            }
        case SET_USER_ROLE:
            return {
                ...state, userRole: action.payload
            }
        case SET_USER_EMAIL:
            return {
                ...state, userEmail: action.payload
            }
        case SET_SELECTED_USER:
            return {
                ...state, selectedUser: action.payload
            }
        case SET_SELECTED_ROLE:
            return {
                ...state, selectedRole: action.payload
            }
        case SET_SELECTED_STATUS:
            return {
                ...state, selectedStatus: action.payload
            }
        case SET_SELECTED_VALIDITY:
            return {
                ...state, selectedValidity: action.payload
            }
        case SET_SELECTED_TOKEN:
            return {
                ...state, selectedToken: action.payload
            }
        case SET_SELECTED_EMAIL:
            return {
                ...state, selectedEmail: action.payload
            }
        case SET_USER_REGION:
            return {
                ...state, userRegion: action.payload
            }
        case ADD_MESSAGE:
            const { value, index } = action.payload;
            console.log(value, index, "indside reducer")
            // const newArr = state.chatArr?.map((item, i) => {
            //     if (i === Number(index)) {
            //         return [...item, value];
            //     }
            //     return item;
            // });
            console.log(state.chatArr, "chatArr in add message");
            const arr = [...state.chatArr];
            console.log(arr, "arr")

            if (arr.length === 0) {
                arr.push({
                    conversationId: "New Chat",
                    conversationArray: [value]
                })

            }
            else {
                arr[index] = {
                    ...arr[index],
                    conversationArray: [...state.chatArr[index]?.conversationArray, value]
                }
            }
            return {
                ...state,
                chatArr: arr,
            };
        case SET_USER_LIST:
            return {
                ...state,
                userList: action.payload
            }
        case ADD_CHATS:
            return {
                ...state,
                chatArr: action.payload
            }

        case ADD_CONVERSATION_ID:
            return {
                ...state,
                conversationId: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loadingForBotPage: action.payload
            }

        case SET_ACTIVE_INDEX:
            return {
                ...state,
                activeIndex: action.payload
            }
        case SET_DISABLE_LIST:
            return {
                ...state,
                disableSidebarList: action.payload
            }
        case SET_NEWCHATURL:
            const { idx, newChatUrl } = action.payload;
            console.log(idx, newChatUrl, "inside reducer ")

            const newChatArray = [...state.chatArr];
            newChatArray[idx].conversationId = newChatUrl;
            return {
                ...state,
                chatArr: newChatArray
            }
        case POP_LAST_MSG:
            // const ChatArray = [...state.chatArr];
            // ChatArray[action.payload]?.conversationArray?.pop();


            const ChatArray = action.payload
            console.log(ChatArray, "ChatArray")
            return {
                ...state,
                chatArr: ChatArray
            }
        case SET_CARD_DATA:
            return {
                ...state,
                selectedCardData: action.payload
            }
        default:
            return { ...state }
    }
}