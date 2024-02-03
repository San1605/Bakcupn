import axios from "axios";


async function getDashboardDataFacultyMentor() {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `https://3751-14-195-17-218.ngrok-free.app/api/collegeMentor/dashboard`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            "ngrok-skip-browser-warning": "69420"
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


async function submitFeedback(studentEmailId,
    month,
    year,
    communicationScore,
    technicalScore,
    punctualityStatus,
    learningAdaptability,
    overallPerformance,
    feedback,
    isMail,
) {
    const authToken = localStorage.getItem("token");
    const data = {
        studentEmailId: studentEmailId,
        month: month,
        year: year,
        communicationScore: communicationScore,
        technicalScore: technicalScore,
        punctualityStatus: punctualityStatus,
        learningAdaptability: learningAdaptability,
        overallPerformance: overallPerformance,
        feedback: feedback,
        isMail: isMail
    }



    const config = {
        method: "post",
        url: `https://3751-14-195-17-218.ngrok-free.app/api/collegeMentor/feedback`,
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



export {
    getDashboardDataFacultyMentor,
    submitFeedback
}