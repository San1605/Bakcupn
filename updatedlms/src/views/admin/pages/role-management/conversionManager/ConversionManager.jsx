import React, { useEffect, useState, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../../../../component/pagination/Pagination";
import arrow from "../../../../../assets/svg/unenrolledCourses/arrow.svg";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import AccordionContext from "react-bootstrap/AccordionContext";
import Card from "react-bootstrap/Card";
import moment from "moment";
import Accordion from "react-bootstrap/Accordion";
import AddConversionManager from "../../../components/rolemanagementModals/addModals/AddConversionManager";
import RemoveConversionManager from "../../../components/rolemanagementModals/removeModal/RemoveConversionManager";
import EditConversionManager from "../../../components/rolemanagementModals/editModals/EditConversionManager";
import { GlobalContext } from "../../../../../context/GlobalState";
import { Bars } from "react-loader-spinner";
// import ViewConversionManager from "../../../components/rolemanagementModals/viewModals/ViewConversionManager";
  
function ConversionManager() {
  const [eventkeyArr, setEventkeyArr] = useState([]);
  const {listConversionManager, conversionmanagerlist, deletecourseManager, loading} = useContext(GlobalContext);
  //Pagination code 👍
  const [pageCount, setPageCount] = useState(0);
  const [courseSearchKey, setCourseSearchKey] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const onChangeEventhandler = (event) => {
    const selectedpageno = event.selected + 1;
    setCurrentPage(selectedpageno);
    listConversionManager(selectedpageno, courseSearchKey);
  };

  useEffect(() => {
    if (conversionmanagerlist) {
      setPageCount(conversionmanagerlist?.pages?.Total_Pages);
      setSelectedCourses(conversionmanagerlist?.list);
    }
  }, [conversionmanagerlist]);

  const searchinit = () => {
    if (courseSearchKey === "") {
      setSelectedCourses(conversionmanagerlist?.list);
      listConversionManager(currentPage, courseSearchKey);
    } else {
        listConversionManager(currentPage, courseSearchKey);
    }
  };
  useEffect(() => {
    if (courseSearchKey == "") {
      searchinit();
    }
  }, [courseSearchKey]);

  function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, () => {
      callback && callback(eventKey);
      if (eventKey !== "") {
        if (eventkeyArr?.includes(eventKey)) {
          const filterArr = eventkeyArr?.filter((item) => item !== eventKey);
          setEventkeyArr(filterArr);
        } else {
          setEventkeyArr([...eventkeyArr, eventKey]);
        }
      }
    });

    const isCurrentEventKey = activeEventKey == eventKey;

    return (
      <div>
        <table className="table m-0">
          <tbody className="tbody">
            <tr className="trow w-100 conversion-accordian-row">
              <td onClick={() => decoratedOnClick()} className="pointer">
                <div className="conversion-details-text">
                  {!isCurrentEventKey ? <BsChevronDown /> : <BsChevronUp />}
                </div>
              </td>
              {children}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  const handlecheckeditor = (toggle,stateid,sepid)=>{
    const toggledata = selectedCourses.map((ele)=>{

      if(ele.roleId == toggle)
      {
        if(ele.state == 0)
        {
          return {...ele,state:1}
        }
        else
        {
          return{...ele,state:0}
        }
      }
      else
      {
        return{...ele}
      }
    })
    setSelectedCourses(toggledata);
    const deletedata = {
      roleId:toggle,
      state:stateid?2:1,
      deleteState:0,
      emailId:sepid,
      conversionType:"",
      searchkey:courseSearchKey,
      pageno:currentPage,
    }
    deletecourseManager(deletedata);
  }
  return (
    <div className="hrbuddyContainer">
      <div className=" d-flex align-items-center justify-content-between hrbuddy-head-row">
        <div className="d-flex align-items-center">
          <img
            src={arrow}
            alt="leftArrowIcon"
            style={{ height: "16px" }}
            className="pointer"
            onClick={() => window.history.back()}
          />
          <p className="hrbuddyHead pt-1 ms-3" style={{ fontSize: "18px" }}>
            Conversion Manager
          </p>
        </div>
        <div className="hrbuddy-modal-row">
          <AddConversionManager />
        </div>
      </div>
      <div className="hrbuddyListContainer bg-white">
        <div
          className="hrbuddyPageTitle pt-3 d-flex align-items-center px-4"
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          Conversion Manager List
          <span className="hrbuddyTotalCount ms-2">{conversionmanagerlist? conversionmanagerlist.count : 0}</span>
        </div>
        <div className="pb-3 pt-2 px-4 d-flex align-items-center justify-content-between hrbuddy-search-pagination-row">
          <div className="col-lg-3 col-md-4 col-12 px-2 rounded searchContainer searchContainer-hrbuddy">
          <input
              type="search"
              placeholder="Search by Employee Name"
              className="border-0 sampler-search col-10 resourceListSearch"
              onChange={(e) => {
                setCourseSearchKey(e.target.value);
              }}
              onKeyDown={(event) =>
                event.key === "Enter" ? searchinit() : null
              }
            />
            <FiSearch
              className="pointer col-2"
              style={{ color: "#212121" }}
              onClick={() => searchinit()}
            />
          </div>
          <div className="col-md-3 col-12 d-flex justify-content-end hrbuddy-pagination">
          {pageCount > 1 ? (
              <Pagination
                onChangeEventhandler={onChangeEventhandler}
                total={pageCount}
              />
            ) : null}
          </div>
        </div>
        <>
          <table className="table m-0">
            <thead className="thead">
              <tr className="trow w-100 conversion-accordian-row">
                <th>
                  <BsChevronDown className="first-th" />
                </th>
                <th className="col-4"></th>
                <th className="col-3">Role Assigned By</th>
                <th className="col-3">Assigned on</th>
                <th className="col-2">State</th>
              </tr>
            </thead>
          </table>
          <div className="Accordian-container overflow-y-scroll">
          {selectedCourses ? (
                  selectedCourses.length > 0 ? (
                    selectedCourses.map((items, index) => {
                      return (
            <Accordion>
              <Card className="conversion-card">
                <Card.Header className="conversion-card-header">
                  <ContextAwareToggle eventKey={1}>
                    <td className="col-4">
                      <div className="employee-details-col">
                        <div className="employee-details-col-img">
                        <img src={`https://storageaccountforprofile.blob.core.windows.net/profile/${items.emailId.split('@')[0]}.jpg`} alt="Employee" />
                        </div>
                        <div className="employee-details-col-name">
                        <p>{items.name}</p>
                          <p>{items.emailId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="col-2"></td>
                    <td className="col-2"></td>
                    <td className="col-2"></td>
                    <td className="col-2">
                      <label class="switch">
                      <input type="checkbox" checked={items.state == 1} onChange={()=>{handlecheckeditor(items.roleId,items.state,items.emailId)}}/>
                        <span class="slider round"></span>
                      </label>
                    </td>
                  </ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey={1}>
                  <Card.Body className="conversion-card-body">
                    <div className="conversion-card-body-content">
                    {items.conversionType.length > 0?items.conversionType.map((elem)=>{
                        return(
                      <div
                        className="conversion-card-body-content-row"
                        style={{ borderBottom: "1px solid #E4E4E4" }}
                      >
                        <div
                          className="col-4"
                          style={{
                            paddingLeft: "0px",
                            fontSize: "12px",
                            color: "#424242E4",
                          }}
                        >
                          <p>{elem.conversionType}</p>
                        </div>
                        <div
                          className="col-3"
                          style={{
                            paddingLeft: "14px",
                            fontSize: "12px",
                            color: "#424242E4",
                          }}
                        >
                          <p>{elem.assignedBy}</p>
                        </div>
                        <div
                          className="col-3"
                          style={{
                            paddingLeft: "20px",
                            fontSize: "12px",
                            color: "#424242E4",
                          }}
                        >
                          <p>{moment(elem.assignedDate).format("DD/MM/YYYY")}</p>
                        </div>
                        <div className="col-2" style={{ paddingLeft: "42px" }}>
                          <RemoveConversionManager
                           head="Remove Buddy"
                           content={`${items.name}'s access will be revoked`}
                           mail={items.emailId}
                           currentPage={currentPage}
                           conversionType={elem.conversionType}
                           courseSearchKey={courseSearchKey}
                           toggle={items.roleId}
                           />
                        </div>
                      </div>
                      )
                    }):null}
                      {items.conversionType.length == 1  &&
                      (<div
                        className="conversion-card-body-content-row"
                        style={{ borderBottom: "1px solid #E4E4E4" }}
                      >
                        <div
                          className="col-4"
                          style={{
                            paddingLeft: "0px",
                            fontSize: "12px",
                            color: "#424242E4",
                          }}
                        >
                           <EditConversionManager items={items}/>
                        </div>
                      </div>)
                    }
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
             );
            })
          ) : (
            <div className="w-100 text-nowrap nolpfoundtext ">
              No Conversion Manager found
            </div>
          )
        ) :
        loading === true ? (
          <div className="page-loader-div">
            <Bars
              height="50"
              width="50"
              color="#4F52B2"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass="page-loader"
              visible={true}
            />
          </div>): (
          <div className="w-100 text-nowrap nolpfoundtext ">
            No Conversion Manager found
          </div>
        )}
          </div>
        </>
      </div>
    </div>
  );
}

export default ConversionManager;
