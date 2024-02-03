import axios from "axios";
import { BASE_URL } from "../../../Utils/config";


async function getCourseListMentor() {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/admin/getCourseList`,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    };
    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
};

async function getCourseDetailMentor(id) {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/admin/getACourseDetail?courseId=${id}`,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    };
    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
};

async function unlockWeekMentor(week, courseId) {
    let authToken = localStorage.getItem("token");
    const data = {
        week: week,
        courseId: courseId
    }
    let config = {
        method: "post",
        url: `${BASE_URL}/api/admin/weekUnlock`,
        headers: {
            Authorization: `Bearer ${authToken}`,
           'Content-Type': 'application/json',
        },
        data: JSON.stringify(data)
    };
    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
};



async function getMentorDashboardData() {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/admin/dashboards`,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    };
    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
};
export {
    getCourseListMentor,
    unlockWeekMentor,
    getCourseDetailMentor,
    getMentorDashboardData
}