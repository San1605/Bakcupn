import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";

function EditCourseEditor(props) {
  const { lpnamerelevent, lpnamesapi, lpnamelist, newcourseeditorcreate } = useContext(GlobalContext);
  const [reportshow, setReportshow] = useState(false);
  const [activecourse,setActivecourse] = useState(false);
  const [innercourselist, setInnercourseList] = useState([]);
  const [multiDropdown, setMultiDropdown] = useState([]);
  const [innerassigner, setInnerassigner] = useState([]);
  const [learningPath, setLearningPath] = useState("");

  const editeditor = () => {
    if ((innercourselist.length == 0 || learningPath == "")) {
      toast.error(" Invalid Credentials");
    } else {
      newcourseeditorcreate({ emailId: props.items.emailId, courseId: innercourselist, learningPath: learningPath });
      setLearningPath("");
      setInnercourseList([]);
      setInnerassigner([]);
      setReportshow(!reportshow);
    }
  };
  useEffect(()=>{
    lpnamesapi();
  },[])
  useEffect(()=>{
    if(learningPath !== "")
    {
      setActivecourse(true);
    }
    else{
      setActivecourse(false);
    }
  },[learningPath])

  useEffect(() => {
    setInnercourseList([])
    setInnerassigner([])
    if (activecourse && learningPath !== "") {
      let multiDropArr = lpnamelist[`${learningPath}`].map((el) => {
        return { label: el, value: el };
      });
      setMultiDropdown(multiDropArr);
    }
  }, [activecourse, learningPath]);

  const handlecourses = (data)=>{
    const depdata = data.map((ele)=>{
      return(ele.value)
    })
    setInnerassigner(data)
    setInnercourseList(depdata);
  }
  useEffect(()=>{
    if(!reportshow)
    {
      setLearningPath("");
      setInnerassigner([])
      setInnercourseList([]);
    }
  },[reportshow])
  return (
    <>
      <p
        style={{ color: "#0356D3" }}
        className="pointer"
        onClick={() => setReportshow(!reportshow)}
      >
        + Assign New Course
      </p>
      <Modal
        show={reportshow}
        onHide={() => setReportshow(!reportshow)}
        size="lg"
        centered
        className="report-upload-modal"
      >
        <Modal.Header className="modal-head-block">
          <Modal.Title style={{ fontSize: "18px", fontWeight: "400" }}>
            Add Course
          </Modal.Title>
          <CloseButton
            onClick={() => setReportshow(false)}
            variant="white"
            style={{ fontSize: "14px" }}
          />
        </Modal.Header>
        <div>
          <Modal.Body style={{ padding: "12px 16px 0px 16px" }}>
            <Form className="p-2">
              <div className="employee-details-col mb-3">
                <div className="employee-details-col-img">
                <img src={`https://storageaccountforprofile.blob.core.windows.net/profile/${props.items.emailId.split('@')[0]}.jpg`} alt="Employee" />
                </div>
                <div className="employee-details-col-name">
                  <p style={{ fontSize: "14px" }}>{props.items.name}</p>
                  <p style={{ fontSize: "12px" }}>{props.items.emailId}</p>
                </div>
              </div>
              <div
                className="mb-2 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">Role:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Course Editor"
                  className="inputFieldTextarea bo-none w-100"
                  disabled
                />
              </div>
              <div
                className="mb-2 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Select LP<span>*</span>
                </Form.Label>
                <select
                  name="departmentlist"
                  className="dropdownstyle pointer "
                  style={{ width: "100%", height: "30px" }}
                  onChange={(e)=>setLearningPath(e.target.value)}
                >
                  <option value="" selected hidden>
                    Select Learning Path
                  </option>
                  {lpnamerelevent?.length !== 0
                  ? lpnamerelevent.map((elem) => {
                      return (
                        <option value={elem}>
                          {elem}
                        </option>
                      );
                    })
                  : null}
                </select>
              </div>
              {activecourse && <div
                className="mb-2 d-flex inputField"
                controlId="exampleForm.ControlInput1 "
              >
                <Form.Label className="col-3 pt-2">
                  Assign Course<span>*</span>
                </Form.Label>
                <Select
                  isMulti
                  name="Conversion Tyoe"
                  options={multiDropdown}
                  className="basic-multi-select w-100 mt-1"
                  classNamePrefix="multiSelect"
                  placeholder="Select Course"
                  value={innerassigner}
                  onChange={(e)=>handlecourses(e)}
                />
              </div>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="modal-inner-sec-btn"
              onClick={() => {
                setReportshow(!reportshow);
              }}
            >
              Discard
            </Button>
            <Button className="modal-inner-primary-btn" onClick={()=> editeditor()}>
              <div>Save</div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default EditCourseEditor;
