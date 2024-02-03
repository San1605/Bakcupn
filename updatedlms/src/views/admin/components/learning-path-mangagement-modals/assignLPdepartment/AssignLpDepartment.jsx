import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";

function AssignLpDepartment() {
  const [reportshow, setReportshow] = useState(false);
  const { lplistdata, departmentlistdata, getdepoflp, depoflp, assigndeptolp, dispatch } = useContext(GlobalContext);
  const [showDepartmentList, setShowDepartmentList] = useState(false);
  const [selectall,setSelectall] = useState(false);
  const [selectedlp,setSelectedlp] = useState("");
  const [showLPList, setShowLPList] = useState([]);
  const [selectedLpData, setSelectedLpData] = useState([]);
  useEffect(() => {
    if (lplistdata) {
      setSelectedLpData(lplistdata?.learningPaths);
    }
  }, [lplistdata]);
  useEffect(()=>{
    if(selectedlp !== "")
    {
      setSelectall(false);
      getdepoflp(selectedlp);
    }
  },[selectedlp])
  useEffect(()=>{
    if(depoflp.length > 0 && departmentlistdata.length > 0)
    {
      const temp = departmentlistdata.map((elem)=>{
        return {
          department:elem.Department,
          value:depoflp.find((el)=> el == elem.Department)?1:0
        }
      })
      setShowLPList(temp)
    }
  },[depoflp, departmentlistdata])
  useEffect(()=>{
    if(showLPList.length > 0)
    {
        setShowDepartmentList(true);
    }
},[showLPList])
useEffect(()=>{
  if(selectall)
  {
    setShowLPList(showLPList.map((elem)=>{
      return{
        ...elem, value:1
      }
    }))
  }
  else{
    const temp = departmentlistdata.map((elem)=>{
      return {
        department:elem.Department,
        value:depoflp.find((el)=> el == elem.Department)?1:0
      }
    })
    setShowLPList(temp)
  }
},[selectall])
const savelpdep = ()=>{
  if(selectedlp !== "" && showLPList.length > 0)
  {
    const depdata = showLPList.map((elem)=>{
      return {
        department:elem.department,
        value:depoflp.find((el)=> el == elem.department)?elem.value == 1?0:elem.value:elem.value
      }
    })
    const data = {
      lp:selectedlp,
      departmentList:depdata
    }
    assigndeptolp(data);
    setReportshow(!reportshow);
    setSelectedlp("");
    setShowDepartmentList(false);
  }
}
  return (
    <>
      <button
        className="modal-outer-secondary-btn py-2 d-flex align-items-center pointer"
        style={{ fontSize: "12px" }}
        onClick={() => {
          setReportshow(true);
        }}
      >
        Assign Department
      </button>
      <Modal
        show={reportshow}
        size="md"
        centered
        className="resume-modal editDepartment-modal"
      >
        <div className="edit-department-modal" style={{ rowGap: "0" }}>
          <div className="edit-department-modal-head">
            <div className="edit-department-modal-title">Assign Department</div>
            <CloseButton onClick={() => setReportshow(false)} />
          </div>
          <div className="filter-head-text mt-2">
            Please Select LP from the Following to Assign Departments
          </div>
          <div className="assignDep my-2">
            <div className="depList assignDep-div overflow-y-scroll pe-1">
              {selectedLpData?.length > 0
                ? selectedLpData?.map((elem) => {
                    return (
                      <div
                        className={`filter-type-item mb-1 ${selectedlp == elem ? "filter-type-item-active":""} `}
                        onClick={() =>
                         { 
                          setShowDepartmentList(false)
                          if(selectedlp == elem)
                          {
                            setSelectall(false);
                            getdepoflp(selectedlp);
                          }
                          else
                          {
                            setSelectedlp(elem)
                          }
                        }
                        }
                      >
                        {/* filter-type-item-active */}
                        {elem}
                      </div>
                    );
                  })
                : null}
            </div>
            {showDepartmentList == true ?(<div className="lpList assignDep-div">
              <div
                className="d-flex align-items-center justify-content-between pe-2 "
                style={{ fontSize: "12px", borderBottom: "1px solid #d7d7d7" }}
              >
                <div
                  className="edit-deparment-list-row"
                  style={{
                    padding: "2px 10px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="edit department"
                    id="editDepartment"
                    checked={selectall}
                    onChange={()=>setSelectall(!selectall)}
                  />
                  Select All
                </div>
                
              </div>
                <div
                  className="edit-deparment-list-div"
                  style={{ maxHeight: "200px", border: "none" }}
                >
                  {showLPList.length > 0
                    ? showLPList.map((elem) => {
                        return (
                          <div className="edit-deparment-list-row">
                            <input
                              type="checkbox"
                              name="edit department"
                              id="editDepartment"
                              checked={elem.value == 1}
                              onChange={()=>{
                                setShowLPList(showLPList.map((ele)=>{
                                  if(ele.department == elem.department)
                                  {
                                    if(elem.value == 1 && depoflp.includes(elem.department))
                                    {
                                      return {
                                        ...ele,value:2
                                      }
                                    }
                                    else if(elem.value == 1 && !depoflp.includes(elem.department)){
                                      return{
                                        ...ele, value:0
                                      }
                                    }
                                    else if(elem.value == 2){
                                      return{
                                        ...ele, value:1
                                      }
                                    }
                                    else{
                                      return{
                                        ...ele, value:1
                                      }
                                    }
                                  }
                                  else{
                                    return ele
                                  }
                                }))
                              }}
                            />
                            {elem.department}
                          </div>
                        );
                      })
                    : null}
                </div>
              
            </div>) : null}
          </div>
          <div className="w-100">
            <Button
              variant="light"
              onClick={() => {
                if(showLPList.length > 0)
               { 
                const temp = departmentlistdata.map((elem)=>{
                  return {
                    department:elem.Department,
                    value:depoflp.find((el)=> el == elem.Department)?1:0
                  }
                })
                setShowLPList(temp)
              }
              }}
              style={{ fontSize: "14px" }}
              className="w-50 modal-inner-secondary-btn"
            >
              <div>Cancel</div>
            </Button>
            <Button
              variant="light"
              style={{ backgroundColor: "#4F52B2" }}
              onClick={() => savelpdep()}
              className="w-50 modal-inner-primary-btn"
            >
              <div>Save Changes</div>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AssignLpDepartment;
