import React, { createContext, useReducer } from 'react'
import { refreshSidebar } from '../services/api';
import toast from 'react-hot-toast';

export const AppContext = createContext();

const reducer = (state, action) => {
    // console.log("state", state);
    // console.log("action", action);
    switch (action.type) {
        case "deleteModal": {
            return {
                ...state,
                deleteModalOpen: action.payload
            }
        }
        case "feedbackModal": {
            return {
                ...state,
                feedbackModalOpen: action.payload
            }
        }
        case "AI_CONVERSER_CHAT": {
            return {
                ...state,
                aiConverserChat: action.payload
            }
        }
        case "DATA_DRIVEN_CHAT": {
            return {
                ...state,
                dataDrivenChat: action.payload
            }
        }
        case "ACTIVE_PDF_URL": {
            return {
                ...state,
                activePdfUrl: action.payload
            }
        }
        case "AUTH_TOKEN": {
            return {
                ...state,
                authToken: action.payload
            }
        }
        case "DATA_PAGE_LOADER": {
            return {
                ...state,
                dataPageLoader: action.payload
            }
        }
        case "AI_PAGE_LOADER": {
            return {
                ...state,
                aiPageLoader: action.payload
            }
        }
        case "CITATION_BAR": {
            return {
                ...state,
                citationBar: action.payload
            }
        }
        case "blob_links": {
            return {
                ...state,
                bloLinksObj: action.payload
            }
        }
        case "SHOW_TABS": {
            return {
                ...state,
                showTabs: action.payload
            }
        }
        case "GLOBAL_LOADING": {
            return {
                ...state,
                globalLoading: action.payload
            }
        }
        default: {
            // console.log("IN DEFAULT");
        }

    }
}

const AppContextProvider = ({ children }) => {
    const [appData, dispatch] = useReducer(reducer, {
        globalLoading: false,
        showTabs: true,
        citationBar: false,
        dataPageLoader: true,
        aiPageLoader: true,
        authToken: localStorage.getItem("authToken") ? localStorage.getItem("authToken") : null,
        activePdfUrl: null,
        bloLinksObj: {
            blob_links: ["https://curerightstorageaccount.blob.core.windows.net/curerightconatiner/nodejs_tutorial.pdf"],
            blob_file_names: ["nodejs_tutorial.pdf"]
        },
        deleteModalOpen: {
            flag: false,
            deleteConversationId: null,
            index: null
        },
        feedbackModalOpen: {
            flag: false,
            feedbackValue: "",
            feedbackDesc: "",
            msgIndex: null,
            conversationId: null,
            queryType: null,
        },
        aiConverserChat: undefined,
        dataDrivenChat: undefined,
        getConvo: async () => {
            try {
                let response = await refreshSidebar();
                dispatch({
                    type: "AI_CONVERSER_CHAT",
                    payload: response?.data?.ai_driven?.reverse(),
                });
                dispatch({
                    type: "DATA_DRIVEN_CHAT",
                    payload: response?.data?.data_driven?.reverse(),
                });
                setTimeout(() => {
                    dispatch({
                        type: "AI_PAGE_LOADER",
                        payload: false,
                    });
                    dispatch({
                        type: "DATA_PAGE_LOADER",
                        payload: false,
                    });
                }, 0)
                return response
            } catch (err) {
                // console.log(err, 'qwertyuio');
                // toast.error("Session Expired")
                throw err;
            }
        }
    })
    return (
        <AppContext.Provider value={{ appData, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider