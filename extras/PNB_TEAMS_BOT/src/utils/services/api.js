import axios from "axios";
import { BASE_URL } from "../config";

export const getBotResponse = async (user_msg, history) => {
    let data = new FormData();
    let authToken = localStorage.getItem("authToken")
    data.append("query", user_msg);
    data.append("history", JSON.stringify({ "history": history }));

    let config = {
        method: "post",
        url: `${BASE_URL}/chatbot`,
        data: data,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (userName, password) => {
    let data = new FormData();
    data.append("username", userName);
    data.append("password", password);
    let authToken = localStorage.getItem("authToken")
    let config = {
        method: "post",
        url: `${BASE_URL}/user_signin`,
        data: data,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

export const logout = async ({ authToken, tab }) => {
    let data = new FormData();
    data.append("tab", tab);
    let config = {
        method: "get",
        url: `${BASE_URL}/signout`,
        data: data,
        headers: {
            Authorization: `Bearer ${authToken}`,
            "ngrok-skip-browser-warning": "69420",
        },
    };
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        // console.error(error);
        throw error.response.data;
    }
};

export const validation = async (authToken) => {
    let tab = localStorage.getItem("tab")
    let token = authToken || localStorage.getItem("authToken");

    let data = new FormData();
    data.append("tab", tab);

    let config = {
        method: "post",
        url: `${BASE_URL}/validation`,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        // console.error(error);
        throw error.response.data;
    }
};

export const deleteConversation = async (chatNumber, queryType) => {
    let tab = localStorage.getItem("tab")
    let authToken = localStorage.getItem("authToken")
    let data = new FormData();
    data.append("chatno", chatNumber);
    data.append("query_type", queryType);
    data.append("tab", tab);

    let config = {
        method: "post",
        url: `${BASE_URL}/delete_sidebar`,
        data: data,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateConversation = async (obj) => {
    let tab = localStorage.getItem("tab")
    let authToken = localStorage.getItem("authToken")
    let data = new FormData();
    data.append("query", obj.userMsg);
    data.append("response", obj.botMsg);
    data.append("feedback", obj.feedback);
    data.append("chatno", obj.conversationNumber);
    data.append("query_date", obj.queryDate);
    data.append("query_time", obj.queryTime);
    data.append("response_date", obj.responseDate);
    data.append("response_time", obj.responseTime);
    data.append("New_chat", obj.newConversation);
    data.append("citation", obj.citetation);
    data.append("Filenames", obj.Filenames);
    data.append("tab", tab);

    let config = {
        method: "post",
        url: `${BASE_URL}/side_bar_data_test`,
        data: data,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

export const refreshSidebar = async () => {
    let tab = localStorage.getItem("tab")
    let data = new FormData();
    let authToken = localStorage.getItem("authToken")
    data.append("tab", tab);
    let config = {
        method: "post",
        url: `${BASE_URL}/refresh_sidebar`,
        data: data,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateFeedback = async ({ msgIndex, queryType, feedback, feedbackDescription, conversationId }) => {
    let tab = localStorage.getItem("tab")
    let authToken = localStorage.getItem("authToken")
    let data = new FormData();
    data.append("index", msgIndex);
    data.append("feedback", feedback);
    data.append("feedback_description", feedbackDescription);
    data.append("chatno", conversationId);
    data.append("tab", tab);

    let config = {
        method: "post",
        url: `${BASE_URL}/update_feedback`,
        data: data,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        throw error.response.data;
    }
};
