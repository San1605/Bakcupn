import React, { useEffect, useState } from "react";
import { ticketschartdata } from "./utils/ticketchartcarddetails/data";
import moment from "moment/moment";
import axios from "axios";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [kpiData, setKpiData] = useState();
  const [isAunthenticated, setIsAuthenticated] = useState(false);
  const [adminswitch, setAdminswitch] = useState(false);
  const [technologylist, setTechnologylist] = useState([]);
  const [singlechartdata, setSinglechartdata] = useState(ticketschartdata);
  const [samplerData, setSamplerData] = useState([
    {
      blobname: "null",
      bloburl: "null",
    },
  ]);
  const [kpicarddata, setKpicarddata] = useState({
    completed: 0,
    inProgress: 0,
  });
  const [mycourse, setMycourse] = useState([
    {
      courseName: "Express SERVER",
      department: "App Development",
      courseOwner: "Ishan Jain",
      complexity: "Advance",
      completionStatus: 75,
      courseId: "CT_Backend001",
    },
    {
      courseName: "Javascript",
      department: "App Development",
      courseOwner: "Ishan Jain",
      complexity: "Advance",
      completionStatus: 50,
      courseId: "CT_Backend002",
    },
    {
      courseName: "React",
      department: "App Development",
      courseOwner: "Shreyansh",
      complexity: "Advance",
      completionStatus: 10,
      courseId: "CT_Backend003",
    },
  ]);

  const [newticket, setNewticket] = useState({
    empID: "HRM2609",
    reason: "",
    description: "",
    createdDate: "0",
  });
  const kpi_hrm_id = "HRM1698";
  const getticket_hrm_id = "HRM2609";
  const getchart_hrm_id = "HRM1788";
  const adminapproved = () => {
    setIsAuthenticated(true);
    setAdminswitch(true);
  };
  const approved = () => {
    setIsAuthenticated(true);
  };
  useEffect(() => {
    if (kpicarddata.completed !== 0) {
      const temp = kpiData.map((elem, index) => {
        if (index === 0) {
          return { ...elem, innerno: kpicarddata.completed };
        } else {
          return { ...elem, innerno: kpicarddata.inProgress };
        }
      });
      setKpiData(temp);
    }
  }, [kpicarddata]);
  useEffect(() => {
    if (newticket.createdDate !== "0") {
      postticketdata();
      setNewticket({
        ...newticket,
        reason: "Reason to Raise Ticket",
        description: "",
        createdDate: "0",
      });
    }
  }, [newticket.createdDate]);
  const newticketsubmited = (e) => {
    e.preventDefault();
    // const date = new Date();
    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // let currentDate = `${day}-${month}-${year}`;
    const currentDate = moment().format("DD-MM-YYYY");
    setNewticket({ ...newticket, createdDate: currentDate });
  };
  const settingchartdata = (chartdata) => {
    const tempchartdata = singlechartdata.map((elem) => {
      if (elem.id === "resolved") {
        return { ...elem, value: chartdata.resolved };
      } else if (elem.id === "raised") {
        return { ...elem, value: chartdata.raised };
      } else if (elem.id === "rejected") {
        return { ...elem, value: chartdata.rejected };
      } else {
        return { ...elem, value: chartdata.pending };
      }
    });
    setSinglechartdata(tempchartdata);
  };
  const getkpidata = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/courses/courseCompletionStatus?HRMID=${kpi_hrm_id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((res) => {
        setKpicarddata(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getmycoursedetails = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/courses/myCourses?HRMID=${kpi_hrm_id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((res) => {
        setMycourse(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const postticketdata = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/tickets/addTicket`,
        newticket,
        {
          withCredentials: true,
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((res) => {
        window.alert(`Your ticket has been submitted`);
        getticketdata();
      })
      .catch((error) => {
        window.alert("Ticket not send");
      });
  };
  function getticketdata() {
    return axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/tickets/getTicketsInfo/?HRMID=${getticket_hrm_id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((res) => res)
      .catch((error) => {
        console.log(error);
      });
  }
  const getsamplers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/samplers/download`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        setSamplerData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getchartdata = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/tickets/getStatus?HRMID=${getchart_hrm_id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((res) => {
        settingchartdata(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getuniquecourselist = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/courses/listTechnologies`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((res) => {
        setTechnologylist(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (window.location.pathname !== "/") {
      setIsAuthenticated(true);
      const geturl = window.location.pathname.split("/");
      if (geturl[1] === "admin") {
        setAdminswitch(true);
      }
    } else {
      localStorage.clear("tokken");
    }
  }, []);
  return (
    <AppContext.Provider
      value={{
        isAunthenticated,
        kpicarddata,
        newticket,
        mycourse,
        kpiData,
        samplerData,
        singlechartdata,
        technologylist,
        adminswitch,
        setIsAuthenticated,
        setNewticket,
        approved,
        adminapproved,
        newticketsubmited,
        getkpidata,
        postticketdata,
        getticketdata,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
