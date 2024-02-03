import axios from "axios"
import { BASE_URL } from "../../../Utils/config";

async function authenticateUser(email, password) {
    const data = {
        username: email,
        password: password
    }
    let config = {
        method: "post",
        url: `https://3751-14-195-17-218.ngrok-free.app/api/college/login`,
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420"
        },
        data: JSON.stringify(data)

    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

async function updatePasswordUser(current, updated) {
    const authToken = localStorage.getItem("token");
    const data = {
        current: current,
        password: updated
    };
    const config = {
        method: "patch",
        url: `${BASE_URL}/api/college/updatePassword`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    };

    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (error) {
        throw error.response.data;
    }
}

async function forgotPasswordUser(username) {
    const authToken = localStorage.getItem("token");
    const data = {
        username: username
    };
    const config = {
        method: "post",
        url: `${BASE_URL}/api/college/sendOTP`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    };

    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (error) {
        throw error.response.data;
    }
}

async function otpUser(username, otp) {
    const authToken = localStorage.getItem("token");
    const data = {
        username: username,
        otp: otp
    };
    const config = {
        method: "post",
        url: `https://3751-14-195-17-218.ngrok-free.app/api/college/validateOTP`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "69420"
        },
        data: JSON.stringify(data),
    };

    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (error) {
        throw error.response.data;
    }
}

async function handleNewPassword(password) {
    const authToken = localStorage.getItem("token");
    const data = {
        fromOTP: 1,
        password: password
    };
    const config = {
        method: "patch",
        url: `${BASE_URL}/api/college/updatePassword`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    };

    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (error) {
        throw error.response.data;
    }
}


async function getMyCurrentCourse(courseId) {
    const authToken = localStorage.getItem("token");
    const config = {
        method: "get",
        url: `${BASE_URL}/api/student/getACourseDetailEnrolled?courseId=${courseId}`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return { ...response.data?.data[0] }
        }
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}

async function markAsComplete(courseId, subtopicId) {
    const authToken = localStorage.getItem("token");
    const data = {
        courseId: courseId,
        subTopicId: subtopicId
    }
    const config = {
        method: "post",
        url: `${BASE_URL}/api/student/courseCompleted`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data)
    }
    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}



async function getCourseListUser() {
    const authToken = localStorage.getItem("token");
    const config = {
        method: "get",
        url: `${BASE_URL}/api/student/getCourseList`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}




async function submitCertificate(profileImg, Internship, Certificate) {
    const authToken = localStorage.getItem("token");
    const formData = new FormData();
    if (Object.keys(profileImg)?.length > 0) {
        formData.append("photo", profileImg);
    }
    if (Object.keys(Internship)?.length > 0) {
        formData.append("workCertificate", Internship)
    }
    if (Object.keys(Certificate)?.length > 0) {
        formData.append("courseCertificate", Certificate)
    }

    const config = {
        method: "patch",
        url: `https://3751-14-195-17-218.ngrok-free.app/api/student/profile`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            "ngrok-skip-browser-warning": "69420"
        },
        data: formData
    }
    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}

async function submitAssignment(taskId, assignmentZip, assignmentUrl) {
    const authToken = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("week", taskId);
    if (Object.keys(assignmentZip)?.length > 0) {
        formData.append("taskzip", assignmentZip);
    }
    if (assignmentUrl?.length > 0) {
        formData.append("taskLink", assignmentUrl)
    }
    const config = {
        method: "post",
        url: `https://3751-14-195-17-218.ngrok-free.app/api/student/submitAssignment`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            "ngrok-skip-browser-warning": "69420"
        },
        data: formData
    }
    try {
        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}




async function getUserDashboard() {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/student/dashboards`,
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
    authenticateUser,
    forgotPasswordUser,
    updatePasswordUser,
    handleNewPassword,
    otpUser,
    markAsComplete,
    getMyCurrentCourse,
    getCourseListUser,
    submitCertificate,
    submitAssignment,
    getUserDashboard
}