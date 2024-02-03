import React, { useState } from "react";
import Popover from "react-bootstrap/Popover";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import filterimg from "../../assets/filter.svg";
import rightarrow from "../../assets/rightarrow.svg";
import search from "../../assets/search.svg";
import deletered from "../../assets/delete-red.svg";
import { IoCloseOutline } from "react-icons/io5";
import activefilterimg from "../../assets/activefilter.svg";
import "./filtercomponent.css";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { useEffect } from "react";

function FilterComponent(props) {
  const { departmentlistdata, admindashdata } = useContext(GlobalContext);
  const [innerdepartment, setInnerdepartment] = useState(props.departmentList);
  const [inneremployee, setInneremployee] = useState(props.employeeList);
  const [departmentoremployee, setDepartmentoremployee] = useState(true);
  const [searchhere, setSearchhere] = useState("");
  const [filteredfordep, setFilteredfordep] = useState([]);
  const [searchinemp, setSearchinemp] = useState("");
  const [filteredforemp, setFilteredforemp] = useState([]);
  const empList = ["Intern", "Trainee", "Permanent"];
  const searchit = () => {
    if (searchhere === "") {
      setFilteredfordep(departmentlistdata);
    } else {
      if (departmentlistdata.length > 0) {
        const searchSImplerFiles = departmentlistdata.filter(
          (data) =>
            data.Department.toLowerCase().indexOf(searchhere.toLowerCase()) > -1
        );
        setFilteredfordep(searchSImplerFiles);
      }
    }
  };
  const searchitemp = () => {
    if (searchinemp === "") {
      setFilteredforemp(empList);
    } else {
      if (empList.length > 0) {
        const searchSImplerFiles = empList.filter(
          (data) => data.toLowerCase().indexOf(searchinemp.toLowerCase()) > -1
        );
        setFilteredforemp(searchSImplerFiles);
      }
    }
  };
  useEffect(() => {
    if (departmentlistdata.length > 0) {
      if (searchhere == "") {
        searchit();
      }
    }
  }, [departmentlistdata, searchhere]);
  useEffect(() => {
    if (searchinemp == "") {
      searchitemp();
    }
  }, [searchinemp]);
  const saveIt = () => {
    props.setDepartmentList(innerdepartment);
    props.setEmployeeList(inneremployee);
    props.setCourseSearchKey("");
    admindashdata(1, "", innerdepartment, inneremployee);
    setSearchhere("");
    setSearchinemp("");
    document.body.click();
  };
  const clearIt = () => {
    props.setDepartmentList([]);
    props.setEmployeeList([]);
    setInnerdepartment([]);
    setInneremployee([]);
    props.setCourseSearchKey("");
    admindashdata(1, "", [], []);
    setSearchhere("");
    setSearchinemp("");
    document.body.click();
  };
  const popoverBottom = (
    <Popover id="popover-positioned-bottom">
      <div className="filter-popover">
        <div className="filter-head-div">
          <div className="filter-pane">
            <div className="filter-pane-head">
              Filters
              {/* <div className="filter-count">
                {innerdepartment.length + inneremployee.length}
              </div> */}
            </div>
            <div
              className="filter-pane-clear pointer"
              onClick={() => clearIt()}
            >
              Clear Filters
            </div>
          </div>
          <div className="filter-head-text mb-3">
            Please Select from the Following to filter
          </div>
          <div className="filter-content mt-2">
            <div className="filter-type">
              <div className="filter-option-div">
                <div
                  className={`filter-type-item ${
                    departmentoremployee ? "filter-type-item-active" : ""
                  }`}
                  onClick={() => setDepartmentoremployee(true)}
                >
                  <div className="filter-type-name">Department</div>
                  <div className="filter-type-count-div">
                    {innerdepartment.length > 0 ? (
                      <div className="filter-count">
                        {innerdepartment.length}
                      </div>
                    ) : null}
                    <img
                      src={rightarrow}
                      alt="rightarrow"
                      className="filter-right-arrow"
                    />
                  </div>
                </div>
                {innerdepartment.length > 0 ? (
                  <div className="filtered-chips">
                    {innerdepartment.map((elemt) => {
                      return (
                        <div className="filter-chip">
                          {elemt}
                          <IoCloseOutline
                            className="close-icon"
                            onClick={() => {
                              setInnerdepartment(
                                innerdepartment.filter((ele) => {
                                  return ele !== elemt;
                                })
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <div className="filter-option-div">
                <div
                  className={`filter-type-item ${
                    departmentoremployee ? "" : "filter-type-item-active"
                  }`}
                  onClick={() => setDepartmentoremployee(false)}
                >
                  <div className="filter-type-name">Employment Type</div>
                  <div className="filter-type-count-div">
                    {inneremployee.length > 0 ? (
                      <div className="filter-count">{inneremployee.length}</div>
                    ) : null}
                    <img
                      src={rightarrow}
                      alt="rightarrow"
                      className="filter-right-arrow"
                    />
                  </div>
                </div>
                <div className="filtered-chips">
                  {inneremployee.map((elemt) => {
                    return (
                      <div className="filter-chip">
                        {elemt}{" "}
                        <IoCloseOutline
                          className="close-icon"
                          onClick={() => {
                            setInneremployee(
                              inneremployee.filter((ele) => {
                                return ele !== elemt;
                              })
                            );
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="filter-type-content">
              {departmentoremployee ? (
                <div className="search-tab">
                  <img
                    src={search}
                    className="pointer"
                    alt="search"
                    onClick={() => searchit()}
                  />
                  <input
                    type="text"
                    className="ms-1 filter-search"
                    placeholder="Search Input Text"
                    value={searchhere}
                    onChange={(e) => setSearchhere(e.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchit() : null
                    }
                  />
                </div>
              ) : (
                <div className="search-tab">
                  <img
                    src={search}
                    className="pointer"
                    alt="search"
                    onClick={() => searchitemp()}
                  />
                  <input
                    type="text"
                    className="ms-1 filter-search"
                    placeholder="Search Input Text"
                    value={searchinemp}
                    onChange={(e) => setSearchinemp(e.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchitemp() : null
                    }
                  />
                </div>
              )}
              <div className="search-result-div">
                {departmentoremployee ? (
                  searchhere == "" ? (
                    <div className="select-all-div">
                      <input
                        type="checkbox"
                        className="filter-checkbox"
                        onChange={(e) => {
                          e.target.checked
                            ? setInnerdepartment(
                                departmentlistdata.map((elem) => {
                                  return elem.Department;
                                })
                              )
                            : setInnerdepartment([]);
                        }}
                        checked={
                          innerdepartment.length == departmentlistdata.length
                        }
                      />
                      Select All
                    </div>
                  ) : null
                ) : searchinemp == "" ? (
                  <div className="select-all-div">
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      onChange={(e) => {
                        e.target.checked
                          ? setInneremployee(empList)
                          : setInneremployee([]);
                      }}
                      checked={inneremployee.length == empList.length}
                    />
                    Select All
                  </div>
                ) : null}
                <div className="search-result-item-block">
                  {departmentoremployee
                    ? filteredfordep.map((elem) => {
                        return (
                          <div className="search-result-item">
                            <input
                              type="checkbox"
                              className="filter-checkbox"
                              onChange={(e) => {
                                e.target.checked
                                  ? setInnerdepartment([
                                      ...innerdepartment,
                                      elem.Department,
                                    ])
                                  : setInnerdepartment(
                                      innerdepartment.filter((ele) => {
                                        return ele !== elem.Department;
                                      })
                                    );
                              }}
                              checked={
                                innerdepartment.length > 0 &&
                                innerdepartment.includes(elem.Department)
                              }
                            />
                            {elem.Department}
                          </div>
                        );
                      })
                    : filteredforemp.map((elem) => {
                        return (
                          <div className="search-result-item">
                            <input
                              type="checkbox"
                              className="filter-checkbox"
                              onChange={(e) => {
                                e.target.checked
                                  ? setInneremployee([...inneremployee, elem])
                                  : setInneremployee(
                                      inneremployee.filter((ele) => {
                                        return ele !== elem;
                                      })
                                    );
                              }}
                              checked={inneremployee.includes(elem)}
                            />
                            {elem}
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="filter-actions">
          <div
            className="filter-action-btn filter-cancel"
            onClick={() => {
              if (props.departmentList.length > 0) {
                setInnerdepartment(props.departmentList);
              }
              if (props.employeeList.length > 0) {
                setInneremployee(props.employeeList);
              }
              document.body.click();
            }}
          >
            Cancel
          </div>
          <div
            className="filter-action-btn filter-save"
            onClick={() => saveIt()}
          >
            Save
          </div>
        </div>
      </div>
    </Popover>
  );
  return (
    <div>
      <ButtonToolbar>
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={popoverBottom}
          rootClose
        >
          {innerdepartment.length + inneremployee.length <= 0 ? (
            <div className="filter-icon pointer">
              <img src={filterimg} alt="filterimg" />
              {/* <div className="filter-icon-text">Filter</div> */}
            </div>
          ) : props.departmentList.length + props.employeeList.length > 0 ? (
            <div className="filter-icon filter-icon-active pointer position-relative">
              <img src={activefilterimg} alt="activefilterimg" />
              {/* <div className="active-filter-dot"></div> */}
              <div className="filter-icon-text">Filter</div>
              <div className="filter-count filter-count-outer">
                {props.departmentList.length + props.employeeList.length}
              </div>
            </div>
          ) : (
            <div className="filter-icon pointer">
              <img src={filterimg} alt="filterimg" />
              <div className="filter-icon-text">Filter</div>
            </div>
          )}
        </OverlayTrigger>
      </ButtonToolbar>
    </div>
  );
}
export default FilterComponent;
{
}
