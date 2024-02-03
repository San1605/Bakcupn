import axios from "axios"
import { BASE_URL } from "../../../Utils/config";

async function sendTokenToBackend(token, switchedRole) {
    let config = {
        method: "post",
        url: `${BASE_URL}/api/admin/login`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: JSON.stringify({ role: switchedRole })
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}


async function getAllLps(department) {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/admin/getLp?domain=${department}`,
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

async function getAllColleges() {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/admin/getColleges`,
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
        throw error.response.data
    }
};

async function getCourseList(lp_name) {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/admin/getCourseList/?lp_name=${lp_name}`,
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

async function getCourseDetail() {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/student/getCourseDetail`,
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

async function getStudents(collegeName) {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/admin/getStudentList?collegeName=${collegeName}`,
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

async function getCollegeMentors(filter) {
    let authToken = localStorage.getItem("token");
    let queryString = `${BASE_URL}/api/admin/getCollegeMentors`;
    console.log(filter, "filter")
    if (filter) {
        const queryStringFilter = Object.keys(filter)
            .filter(key => filter[key] !== undefined && filter[key]?.length > 0) // Filter out undefined or empty values
            .map(key => `${key}=${filter[key]}`)
            .join('&');
        queryString += `${queryStringFilter ? `?${queryStringFilter}` : ''}`
    }

    let config = {
        method: "get",
        url: queryString,
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

async function getCelebalMentors(filter) {
    console.log(filter, "filter")
    let authToken = localStorage.getItem("token");
    let queryString = `${BASE_URL}/api/admin/getCelebalRoles`;
    if (filter) {
        const queryStringFilter = Object.keys(filter)
            .filter(key => filter[key] !== undefined && filter[key]?.length > 0) // Filter out undefined or empty values
            .map(key => `${key}=${filter[key]}`)
            .join('&');

        queryString += `${queryStringFilter ? `?${queryStringFilter}` : ''}`

    }
    let config = {
        method: "get",
        url: queryString,
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

async function uploadStudentData(files, collegeId) {
    let authToken = localStorage.getItem("token");
    const formData = new FormData();
    if (files && collegeId) {
        formData.append("excelfile", files);
        formData.append("collegeId", collegeId)
    }
    let config = {
        method: "post",
        url: `${BASE_URL}/api/admin/uploadStudentData`,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        data: formData
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
}

async function addCelebalRoles(Name, Email, Domain, Role, CollegeName) {
    const authToken = localStorage.getItem("token");

    const data = {
        adminEmail: Email && Email.trim(),
        fullName: Name && Name.trim(),
        role: Role && Role.trim(),
        collegeId: CollegeName && CollegeName.trim(),
        domain: Domain && Domain.trim()
    };

    const filteredData = {};
    for (const [key, value] of Object.entries(data)) {
        if (value) {
            filteredData[key] = value;
        }
    }

    if (Object.keys(filteredData).length === 0) {
        throw new Error("No non-empty fields provided.");
    }

    const config = {
        method: "post",
        url: `${BASE_URL}/api/admin/addCelebalRoles`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(filteredData),
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
}


async function addColleges(CollegeName, TpoHeadName, TpoContactNo, TpoEmailId, collegeLogo, CollegeMou, address, StartDate, endDate) {
    let authToken = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("logo", collegeLogo)
    formData.append("MOU", CollegeMou)
    formData.append("collegeName", CollegeName)
    formData.append("TPO_name", TpoHeadName)
    formData.append("TPO_contactNo", TpoContactNo)
    formData.append("TPO_emailId", TpoEmailId)
    formData.append("address", address)
    formData.append("startDate", StartDate)
    formData.append("endDate", endDate)



    let config = {
        method: "post",
        url: `${BASE_URL}/api/admin/addColleges`,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        data: formData
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
}







async function addStudent(studentData, CollegeId) {
    let authToken = localStorage.getItem("token");
    const data = {
        studentData: studentData,
        collegeId: CollegeId
    }

    let config = {
        method: "post",
        url: `${BASE_URL}/api/admin/uploadStudentData`,
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
}

async function addCourse(LearningPath, courseSequence, Description, complexity, uploadDocument) {
    let authToken = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("excelsheet", uploadDocument)
    formData.append("complexity", complexity)
    formData.append("sequence", courseSequence)
    formData.append("learning_path", LearningPath)
    formData.append("description", Description)


    let config = {
        method: "post",
        url: `${BASE_URL}/api/admin/uploadCourseExcel`,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        data: formData
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
}


async function addLP(lp_name, technology, NoOfCourses) {
    console.log(lp_name, technology, NoOfCourses, "pppppppppppppppp")
    let authToken = localStorage.getItem("token");
    const data = {
        lp_name: lp_name,
        domain: lp_name,
        technology: technology,
        NoOfCourses: NoOfCourses
    }
    let config = {
        method: "post",
        url: `${BASE_URL}/api/admin/addLp`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
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
}

async function addCollegeMentor(Name, Email, Domain, Role, CollegeName, contactNo) {
    const authToken = localStorage.getItem("token");
    let data = {
        mentorEmailId: Email?.trim(),
        fullName: Name?.trim(),
        role: Role?.trim(),
        collegeId: CollegeName?.trim(),
        domain: Domain?.trim(),
        contact: contactNo
    };

    if (data) {
        const filteredData = {};
        for (const [key, value] of Object.entries(data)) {
            if (value) {
                filteredData[key] = value;
            }
        }

        if (Object.keys(filteredData).length === 0) {
            throw new Error("No non-empty fields provided.");
        }

        const config = {
            method: "post",
            url: `${BASE_URL}/api/admin/addCollegeMentor`,
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(filteredData),
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
    } else {
        throw new Error("Data is not defined.");
    }
}


async function deleteRoles(roleId, isCelebal) {
    let authToken = localStorage.getItem("token");
    const data = {
        roleId: roleId,
        isCelebal: isCelebal,
    }
    let config = {
        method: "post",
        url: `${BASE_URL}/api/admin/deleteRoles`,
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
}

async function getCommunityChatArr(roomId) {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/user/communityChat?roomId=${roomId}`,
        headers: {
            Authorization: `Bearer ${authToken}`
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

async function getCoursesDetail(collegeId) {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/admin/getLp?collegeId=${collegeId}`,
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

async function changeCourseStatus(startDate, endDate, status, courseName, collegeId) {
    let authToken = localStorage.getItem("token");
    const data = {
        status: status,
        startDate: startDate,
        endDate: endDate,
        lp: courseName,
        collegeId: collegeId
    }
    let config = {
        method: "post",
        url: `${BASE_URL}/api/admin/playPauselp`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
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
}

async function deleteCourse(courseName) {
    let authToken = localStorage.getItem("token");
    const data = {
        courseName: courseName
    }
    let config = {
        method: "delete",
        url: `${BASE_URL}/api/admin/deleteCourse`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
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
}

async function getRoleList(collegeId) {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/admin/allRolesUnderColleges?collegeId=${collegeId}`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
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
}


async function deleteColleges(collegeId) {
    let authToken = localStorage.getItem("token");
    const data = {
        collegeId: collegeId
    }
    let config = {
        method: "delete",
        url: `${BASE_URL}/api/admin/deleteCollege`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
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
}
async function deleteStudents(emailId) {
    let authToken = localStorage.getItem("token");
    const data = {
        emailId: emailId
    }
    let config = {
        method: "delete",
        url: `${BASE_URL}/api/admin/deleteStudent`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
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
}


async function getDashBoardDataAdmin() {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/admin/dashboards`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
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
}



async function getDashBoardDataHRBuddy() {
    let authToken = localStorage.getItem("token");
    let config = {
        method: "get",
        url: `${BASE_URL}/api/admin/dashboards`,
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
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
}

export {
    sendTokenToBackend,
    deleteRoles,
    addLP,
    addColleges,
    addCelebalRoles,
    uploadStudentData,
    getCelebalMentors,
    getCollegeMentors,
    getStudents,
    getCourseDetail,
    getCourseList,
    getAllColleges,
    getAllLps,
    addCollegeMentor,
    addStudent,
    addCourse,
    getCommunityChatArr,
    getCoursesDetail,
    changeCourseStatus,
    deleteCourse,
    getRoleList,
    deleteColleges,
    deleteStudents,
    getDashBoardDataAdmin,
    getDashBoardDataHRBuddy
}