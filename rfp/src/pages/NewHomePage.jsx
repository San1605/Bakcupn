import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import log_out from "../assets/images/log-out.svg";

// Import component
import Header from "../components/Header/Header";

// Error boundary to catch uncaught errors from the code
import ErrorBoundary from "../components/ErrorBoundary";
import DocsViewPage from "./DocsViewPage"; // Assuming DocsViewPage is correctly imported
import RfpDataFillTable from "../components/RfpDataFillTable/RfpDataFillTable";
import { useEffect } from "react";
import ChatContext from "../Context/Context";
import toast from "react-hot-toast";
import CreateNewFilterModal from "../components/CreateNewFilterModal/CreateNewFilterModal";
import Spinner from 'react-bootstrap/Spinner';

const NewHomePage = () => {
  const navigate = useNavigate();
  const { apidata, isOn, setSetpreview ,department ,setpreviewTOC} = useContext(ChatContext);
  const globalApiEndPoint = "http://20.127.168.63:8082";
  const [isManualRFPClicked, setIsManualRFPClicked] = useState(true);
  const [showSeperateDoc, setShowSeperateDoc] = useState(false);
  const [active, setActive] = useState(1);
  const { previewData, setPreviewData } = useContext(ChatContext)
  const [sideNavData,setSideNavData]=useState([]);
  const [sideNavCheckboxState,setSideNavCheckboxState]=useState([]);

  // const sideNavData = apidata?.map((item) => item.category) || [];
  // const initialCheckboxState = apidata?.map(() => true) || [];
  // const [sideNavCheckboxState, setSideNavCheckboxState] = useState(initialCheckboxState);
  // const [filteredData,setFilteredData]=useState([]);


  const filteredData = sideNavData?.filter((_, index) => {
    if (sideNavCheckboxState && sideNavCheckboxState[index] === true) {
      return true;
    }
    return false;
  });
  

  console.log(sideNavData, 'sideNavData')
  console.log(sideNavCheckboxState, 'sideNavCheckboxState')
  console.log(filteredData, "filteredData");

  useEffect(()=>{
    if(apidata!==undefined){
      const data = apidata?.map((item) => item.category) || [];
      const checkboxState = apidata?.map(() => true) || [];
      if(data?.length>0 && checkboxState?.length>0){
        setSideNavData(data);
        setSideNavCheckboxState(checkboxState);
      }
      // const filtered = data.filter((_, index) => checkboxState[index]);
      // if(filtered?.length>0){
      //   setFilteredData(filtered);
      // }
    }
  },[apidata])

  const handleSideNavCheckboxChange = (index) => {
    if (index !== 0) {
      const updatedCheckboxState = [...sideNavCheckboxState];
      updatedCheckboxState[index] = !updatedCheckboxState[index];
      console.log(updatedCheckboxState,"updated")
      setSideNavCheckboxState(updatedCheckboxState);
    }
  };

  const getPreviewApi = () => {
    setSetpreview(true)
    const toastId = toast.loading("RFP generation is in progress please wait for 15-20 minutes")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      json: true,
      body: JSON.stringify({ selected_section_list: filteredData }),
    };
    fetch(`${globalApiEndPoint}/preview`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((result) => {
        toast.dismiss(toastId);
        // toast.success("")
        console.log(result,"result")
        console.log(JSON.parse(result)?.toc,"aaaaaaaaaaa")
        setPreviewData(JSON.parse(result)?.html_content)
        setpreviewTOC(JSON.parse(result)?.toc)
      })
      .catch((error) => console.error('error', error));
  };

  useEffect(() => {
    if (department === "") {
      navigate("/landingpage");
    }
  }, [department]);



  if (apidata.length === 0) {
    return (
      <Spinner animation="border" role="status" className='spin'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }


  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Header />
      <div className="row m-0 d-flex">
        <div className="column sidebar col-2 m-0 p-0">
          <div className="side-div">
            <ul className="side">
              {/* <li className="d-flex m-0 ">
                <input
                  type="checkbox"
                  id="contentsCheckbox"
                  className="me-2"
                  disabled={true}
                  checked={true} 
                />
                <label htmlFor="contentsCheckbox" className="fw-bold">
                  Contents
                </label>
              </li> */}
              {apidata?.map((val, index) => (
                <li key={index} className="d-flex ">
                  <input
                    type="checkbox"
                    id={`checkbox${index}`}
                    className="me-2 "
                    disabled={val?.category === "1. General Requirements"}
                    checked={sideNavCheckboxState[index]}
                    onChange={() => handleSideNavCheckboxChange(index)}
                  />
                  <label htmlFor={`checkbox${index}`}>{isOn === "English" ? val?.category : val?.categoryArabic}</label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="logout ms-4" onClick={() => navigate("/")}>
              {isOn === "English" ? "Logout " : "تسجيل خروج"}
              <img
                src={log_out}
                alt=""
                className="ms-2"
                style={{ width: "1rem", height: "1rem" }}
              />
            </p>
          </div>
        </div>
        <ErrorBoundary>
          <div className="column document_div col-10 m-0 p-0">
            <div className="mx-2 mt-4 d-flex justify-content-between">
              <div className="ms-3 text-nowrap">
                <b> {isOn === "English" ? "RFP Document Generator  " : "مولد وثيقة طلب تقديم العروض"}</b>
              </div>
              <div className="d-flex gap-3 me-3">
                <div className="mt-1" style={{ fontSize: '16px' }}>
                  <b> {isOn === "English" ? "Department " : "قسم"}</b>
                  :  {department !== "" ? department : "Department not selected"}</div>
                {/* <span
                  className=''
                  onClick={() => {
                    // getPreviewApi();
                    setShowModal(true)
                  }}
                  style={{
                    textDecoration:"underline",
                    textAlign:'center',
                    paddingTop:"3px"
                  }}
                >
                  {isOn === "English" ? "Show Filters " : "اظهر الفلاتر"}
                </span> */}
                {/* <CreateNewFilterModal
                  show={showModal}
                  onHide={() => {
                    setShowModal(false)
                  }}
                /> */}
                <button
                  className='save-button'
                  onClick={() => {
                    getPreviewApi()
                  }}
                >
                  {isOn === "English" ? "Preview " : "معاينة"}
                </button>
                {/* <button
                  className='button2 px-3 py-1'
                onClick={() => {

                  setActive(1);
                  setIsManualRFPClicked(true);
                  setShowSeperateDoc(false);
                }}
                >
                  Manual RFP Creation
                </button> */}



                {/* <button
                  className={`${active === 0 ? "button2" : "button1"} px-3 py-1`}
                  onClick={() => {
                    setActive(0);
                    setIsManualRFPClicked(false);
                    setShowSeperateDoc(false);
                  }}
                >
                  Co-Pilot
                </button> */}



              </div>
            </div>
            <div className="row m-0 mt-1">
              <div className="mb-1 ps-4">
                <b>{isOn === "English" ? "Create New RFP " : "إنشاء طلب تقديم عروض جديد"} </b>{" "}
              </div>

              <RfpDataFillTable
                isManualRFPClicked={isManualRFPClicked}
                active={active}
                setShowSeperateDoc={setShowSeperateDoc}
                sideNavData={sideNavData}
                sideNavCheckboxState={sideNavCheckboxState}
                filteredData={filteredData}
              />

              {/* {isManualRFPClicked && ( */}
              <div className="col-8">
                <DocsViewPage />
              </div>
              {/* )} */}
              {/* </> */}
              {/* )} */}
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default NewHomePage;



  // const sideNavData = [
  //   'Overview', 'RFP Overview', 'Legal', 'Business Objectives', 'Statement of Work', 'Design & Architecture', 'Project Implentation Approach', 'General Requirements', 'Project Management Requirements', 'Pricing Requirements', 'Selection Process', 'Administrative Information & Requirements', 'Format Of Proposals', 'Essential Terms & Conditions'
  // ];

