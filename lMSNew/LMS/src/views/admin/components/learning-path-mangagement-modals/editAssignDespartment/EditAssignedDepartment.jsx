import React, { useEffect, useState } from "react";
import editpencil from "../../../assets/editPencilbig.svg";
import CloseButton from "react-bootstrap/CloseButton";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BsChevronDown } from "react-icons/bs";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import "./editassigndepartment.css";

function EditAssignedDepartment(props) {
  const [reportshow, setReportshow] = useState(false);
  const { departmentlist, departmentlistdata, assigndeptolp } = useContext(GlobalContext);
  const [showDepartmentList, setShowDepartmentList] = useState(false);
  const [department, setDepartment] = useState("");
  const [innerdeparts, setInnerdeparts] = useState([]);

  useEffect(() => {
    departmentlist();
  }, []);
  useEffect(()=>{
    if(props.assignedDepartments.length > 0)
    {
      setInnerdeparts(props.assignedDepartments)
    }
  },[props.assignedDepartments])
  const handlesubmit = () => {
    const depdata = departmentlistdata.map((elem)=>{
      if(innerdeparts.includes(elem.Department))
      {
        if(props.assignedDepartments.includes(elem.Department))
        {
          return {
            department:elem.Department,
            value:0
          }
        }
        else{
          return {
            department:elem.Department,
            value:1
          }
        }
      }
      else{
        if(props.assignedDepartments.includes(elem.Department))
        {
          return {
            department:elem.Department,
            value:2
          }
        }
        else{
          return {
            department:elem.Department,
            value:0
          }
        }
      }
    })
    const data = {
      lp:props.lpname,
      departmentList:depdata
    }
    assigndeptolp(data);
    setReportshow(!reportshow);
  };

  useEffect(() => {
    if (departmentlistdata.length > 0) {
      setDepartment(departmentlistdata[0].Department);
    }
  }, [departmentlistdata]);

  return (
    <>
      <div className="edit-department">
        <img
          src={editpencil}
          alt="editpencil"
          onClick={() => setReportshow(true)}
          className="pointer"
        />
      </div>
      <Modal
        show={reportshow}
        // onHide={() => setReportshow(!reportshow)}
        size="md"
        centered
        className="resume-modal editDepartment-modal"
      >
        <div className="edit-department-modal">
          <div className="edit-department-modal-head">
            <div className="edit-department-modal-title">
              Edit Assigned Department
            </div>
            <CloseButton onClick={() => setReportshow(false)} />
          </div>
          <div className="edit-department-inputs">
            <div className="edit-department-input-div">
              <label>LP Title</label>
              <input
                type="text"
                value={props.lpname}
                className="dep-input"
                disabled
              />
            </div>
            <div className="edit-department-input-div">
              <label>Department</label>
              <div className="edit-dep-div">
                <div
                  className="select-edit-department"
                  onClick={() => setShowDepartmentList(!showDepartmentList)}
                >
                  Select Department <BsChevronDown />
                </div>
                {showDepartmentList == true ? (
                  <div className="edit-deparment-list-div">
                    {departmentlistdata.length > 0
                      ? departmentlistdata.map((elem) => {
                          return (
                            <div className="edit-deparment-list-row">
                              <input
                                type="checkbox"
                                name="edit department"
                                id="editDepartment"
                                checked={innerdeparts.includes(elem.Department)}
                                onChange={()=>{ 
                                  innerdeparts.includes(elem.Department)?setInnerdeparts(innerdeparts.filter((ele)=>ele !== elem.Department)):setInnerdeparts((prev)=>[...prev,elem.Department])}}
                              />
                              {elem.Department}
                            </div>
                          );
                        })
                      : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="w-100">
            <Button
              variant="light"
              style={{ backgroundColor: "#4F52B2" }}
              onClick={() => handlesubmit()}
              className="w-100 modal-inner-primary-btn"
            >
              <div>Save Changes</div>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default EditAssignedDepartment;
