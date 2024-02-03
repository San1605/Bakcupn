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
  const { departmentlistdata, admindashdata, empsforHr } =
    useContext(GlobalContext);
  const [innerdepartment, setInnerdepartment] = useState(props.departmentList);
  const [inneremployee, setInneremployee] = useState(props.employeeList);
  const [innerWorkmode, setInnerWorkmode] = useState(props.workmodeList);
  const [innerWorkLocation, setInnerWorkLocation] = useState(
    props.workLocationList
  );
  const [innerEngagementType, setInnerEngagementType] = useState(
    props.engagementList
  );
  const [innerAvailability, setInnerAvailability] = useState(
    props.availableList
  )
  const [innerprojectstatus, setInnerprojectstatus] = useState(
    props.projectstatusList
  )
  const [selectedrole, setSelectedrole] = useState(1);
  const [searchhere, setSearchhere] = useState("");
  const [filteredfordep, setFilteredfordep] = useState([]);
  const [searchinemp, setSearchinemp] = useState("");
  const [filteredforemp, setFilteredforemp] = useState([]);
  const [searchinmode, setSearchinmode] = useState("");
  const [filteredformode, setFilteredformode] = useState([]);
  const [searchinlocation, setSearchinlocation] = useState("");
  const [filteredforlocation, setFilteredforlocation] = useState([]);
  const [searchinengagement, setSearchinengagement] = useState("");
  const [filteredforengagement, setFilteredforengagement] = useState([]);
  const [searchinavailable, setSearchinavailable] = useState("");
  const [filteredforavailable, setFilteredforavailable] = useState([]);
  const [searchinprojectstatus, setSearchinprojectstatus] = useState("");
  const [filteredforprojectstatus, setFilteredforprojectstatus] = useState([]);
  const [empList, setEmpList] = useState(
    props.fromwhere === "admin"
      ? ["Intern", "Trainee", "Permanent", "Contractual"]
      : ["Intern", "Trainee", "Permanent"]
  );
  const modelist = ["Office", "Remote", "Not Filled"];
  const locationlist = [
    "Gurgaon",
    "Jaipur - Jhalana",
    "Jaipur - Malviya Nagar",
    "Jaipur - Mansarovar",
    "Jalpaiguri",
    "Noida",
    "Pune",
    "Not Filled",
  ];
  const engagementlist = [
    "Billable & critical",
    "Billable & non-critical",
    "Non-Billable & critical",
    "Non-Billable & non-critical"
  ];
  const availabilitylist = [
    "Available",
    "Partially Available",
    "Not Available"
  ];
  const projectstatuslist = [
    "Current",
    "Past"
  ]

  const searchit = () => {
    if (searchhere === "") {
      setFilteredfordep(departmentlistdata);
    } else {
      if (departmentlistdata.length > 0) {
        let searchSImplerFiles;
        if(props.fromwhere === 'admin')
       {  searchSImplerFiles = departmentlistdata.filter(
          (data) => data.Department.toLowerCase().indexOf(searchhere.toLowerCase()) > -1)
        
       }
       else{
         searchSImplerFiles = departmentlistdata.filter(
          (data) =>  data.toLowerCase().indexOf(searchhere.toLowerCase()) > -1

        );
       } 
        setFilteredfordep(searchSImplerFiles);
      }
    }
  };

  useEffect(() => {
    if (empsforHr.length > 0 && props.fromwhere === "hrbuddy") {
      setEmpList(empsforHr);
    }
  }, [empsforHr, props.fromwhere]);

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
        searchit();
    }
  }, [departmentlistdata, searchhere]);
  useEffect(() => {
    // if (searchinemp == "") {
      searchitemp();
    // }
  }, [searchinemp, empList]);

  const searchfninmode = () => {
    if (searchinmode === "") {
      setFilteredformode(modelist);
    } else {
      if (modelist.length > 0) {
        const searchSImplerFiles = modelist.filter(
          (data) => data.toLowerCase().indexOf(searchinmode.toLowerCase()) > -1
        );
        setFilteredformode(searchSImplerFiles);
      }
    }
  };
  useEffect(() => {
    // if (searchinmode == "") {
      searchfninmode();
    // }
  }, [searchinmode]);

  const searchfninlocation = () => {
    if (searchinlocation === "") {
      setFilteredforlocation(locationlist);
    } else {
      if (locationlist.length > 0) {
        const searchSImplerFiles = locationlist.filter(
          (data) =>
            data.toLowerCase().indexOf(searchinlocation.toLowerCase()) > -1
        );
        setFilteredforlocation(searchSImplerFiles);
      }
    }
  };
  useEffect(() => {
    // if (searchinlocation == "") {
      searchfninlocation();
    // }
  }, [searchinlocation]);

  const searchfninengagement = () => {
    if (searchinengagement === "") {
      setFilteredforengagement(engagementlist);
    } else {
      if (engagementlist.length > 0) {
        const searchSImplerFiles = engagementlist.filter(
          (data) =>
            data.toLowerCase().indexOf(searchinengagement.toLowerCase()) > -1
        );
        setFilteredforengagement(searchSImplerFiles);
      }
    }
  };
  useEffect(() => {
    // if (searchinengagement == "") {
      searchfninengagement();
    // }
  }, [searchinengagement]);

  const searchfninavailable = () => {
    if (searchinavailable === "") {
      setFilteredforavailable(availabilitylist);
    } else {
      if (availabilitylist.length > 0) {
        const searchSImplerFiles = availabilitylist.filter(
          (data) =>
            data.toLowerCase().indexOf(searchinavailable.toLowerCase()) > -1
        );
        setFilteredforavailable(searchSImplerFiles);
      }
    }
  };
  useEffect(() => {
    // if (searchinavailable == "") {
      searchfninavailable();
    // }
  }, [searchinavailable]);

  const searchfninprojectstatus = () => {
    if (searchinprojectstatus === "") {
      setFilteredforprojectstatus(projectstatuslist);
    } else {
      if (projectstatuslist.length > 0) {
        const searchSImplerFiles = projectstatuslist.filter(
          (data) =>
            data.toLowerCase().indexOf(searchinprojectstatus.toLowerCase()) > -1
        );
        setFilteredforprojectstatus(searchSImplerFiles);
      }
    }
  };
  useEffect(() => {
    // if (searchinprojectstatus == "") {
      searchfninprojectstatus();
    // }
  }, [searchinprojectstatus]);

  const saveIt = () => {
    props.setDepartmentList(innerdepartment);
    props.setEmployeeList(inneremployee);
    props.setWorkmodeList(innerWorkmode);
    props.setWorkLocationList(innerWorkLocation);
    props.setEngagementList(innerEngagementType);
    props.setAvailableList(innerAvailability);
    props.setProjectstatusList(innerprojectstatus);
    props.setCourseSearchKey("");
    setSearchhere("");
    setSearchinemp("");
    setSearchinmode("");
    setSearchinengagement("");
    setSearchinlocation("");
    setSearchinavailable("");
    setSearchinprojectstatus("");
    document.body.click();
  };
  const clearIt = () => {
    props.setDepartmentList([]);
    props.setEmployeeList([]);
    props.setWorkmodeList([]);
    props.setWorkLocationList([]);
    props.setEngagementList([]);
    props.setAvailableList([]);
    props.setProjectstatusList([]);
    setInnerdepartment([]);
    setInneremployee([]);
    setInnerWorkmode([]);
    setInnerWorkLocation([]);
    setInnerEngagementType([]);
    setInnerAvailability([]);
    setInnerprojectstatus([]);
    props.setCourseSearchKey("");
    setSearchhere("");
    setSearchinemp("");
    setSearchinmode("");
    setSearchinlocation("");
    setSearchinengagement("");
    setSearchinavailable("");
    setSearchinprojectstatus("");
    document.body.click();
  };
  const popoverBottom = (
    <Popover id="popover-positioned-bottom">
      <div className="filter-popover" style={{ maxHeight: "320px" }}>
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
            Please select from the below available filters
          </div>
          <div className="filter-content mt-2" style={{ maxHeight: "185px" }}>
            <div className="filter-type overflow-y-scroll">
              <div className="filter-option-div">
                <div
                  className={`filter-type-item ${selectedrole === 1 ? "filter-type-item-active" : ""
                    }`}
                  onClick={() => setSelectedrole(1)}
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
                  className={`filter-type-item ${selectedrole === 2 ? "filter-type-item-active" : ""
                    }`}
                  onClick={() => setSelectedrole(2)}
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
                {inneremployee.length > 0 && (
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
                )}
              </div>
              <div className="filter-option-div">
                <div
                  className={`filter-type-item ${selectedrole === 3 ? "filter-type-item-active" : ""
                    }`}
                  onClick={() => setSelectedrole(3)}
                >
                  <div className="filter-type-name">Work Mode</div>
                  <div className="filter-type-count-div">
                    {innerWorkmode.length > 0 ? (
                      <div className="filter-count">{innerWorkmode.length}</div>
                    ) : null}
                    <img
                      src={rightarrow}
                      alt="rightarrow"
                      className="filter-right-arrow"
                    />
                  </div>
                </div>
                {innerWorkmode.length > 0 && (
                  <div className="filtered-chips">
                    {innerWorkmode.map((elemt) => {
                      return (
                        <div className="filter-chip">
                          {elemt}{" "}
                          <IoCloseOutline
                            className="close-icon"
                            onClick={() => {
                              setInnerWorkmode(
                                innerWorkmode.filter((ele) => {
                                  return ele !== elemt;
                                })
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="filter-option-div">
                <div
                  className={`filter-type-item ${selectedrole === 4 ? "filter-type-item-active" : ""
                    }`}
                  onClick={() => setSelectedrole(4)}
                >
                  <div className="filter-type-name">Work Location</div>
                  <div className="filter-type-count-div">
                    {innerWorkLocation.length > 0 ? (
                      <div className="filter-count">
                        {innerWorkLocation.length}
                      </div>
                    ) : null}
                    <img
                      src={rightarrow}
                      alt="rightarrow"
                      className="filter-right-arrow"
                    />
                  </div>
                </div>
                {innerWorkLocation.length > 0 && (
                  <div className="filtered-chips">
                    {innerWorkLocation.map((elemt) => {
                      return (
                        <div className="filter-chip">
                          {elemt}{" "}
                          <IoCloseOutline
                            className="close-icon"
                            onClick={() => {
                              setInnerWorkLocation(
                                innerWorkLocation.filter((ele) => {
                                  return ele !== elemt;
                                })
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="filter-option-div">
                <div
                  className={`filter-type-item ${selectedrole === 5 ? "filter-type-item-active" : ""
                    }`}
                  onClick={() => setSelectedrole(5)}
                >
                  <div className="filter-type-name">Engagement Type</div>
                  <div className="filter-type-count-div">
                    {innerEngagementType.length > 0 ? (
                      <div className="filter-count">
                        {innerEngagementType.length}
                      </div>
                    ) : null}
                    <img
                      src={rightarrow}
                      alt="rightarrow"
                      className="filter-right-arrow"
                    />
                  </div>
                </div>

                {innerEngagementType.map((elemt) => {
                  return (
                    <div className="filtered-chips">
                      <div className="filter-chip">
                        {elemt}{" "}
                        <IoCloseOutline
                          className="close-icon"
                          onClick={() => {
                            setInnerEngagementType(
                              innerEngagementType.filter((ele) => {
                                return ele !== elemt;
                              })
                            );
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

              </div>
              <div className="filter-option-div">
                <div
                  className={`filter-type-item ${selectedrole === 6 ? "filter-type-item-active" : ""
                    }`}
                  onClick={() => setSelectedrole(6)}
                >
                  <div className="filter-type-name">Project Status</div>
                  <div className="filter-type-count-div">
                    {innerprojectstatus.length > 0 ? (
                      <div className="filter-count">
                        {innerprojectstatus.length}
                      </div>
                    ) : null}
                    <img
                      src={rightarrow}
                      alt="rightarrow"
                      className="filter-right-arrow"
                    />
                  </div>
                </div>

                {innerprojectstatus.map((elemt) => {
                  return (
                    <div className="filtered-chips">
                      <div className="filter-chip">
                        {elemt}{" "}
                        <IoCloseOutline
                          className="close-icon"
                          onClick={() => {
                            setInnerprojectstatus(
                              innerprojectstatus.filter((ele) => {
                                return ele !== elemt;
                              })
                            );
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

              </div>
              <div className="filter-option-div">
                <div
                  className={`filter-type-item ${selectedrole === 7 ? "filter-type-item-active" : ""
                    }`}
                  onClick={() => setSelectedrole(7)}
                >
                  <div className="filter-type-name">Availability Type</div>
                  <div className="filter-type-count-div">
                    {innerAvailability.length > 0 ? (
                      <div className="filter-count">
                        {innerAvailability.length}
                      </div>
                    ) : null}
                    <img
                      src={rightarrow}
                      alt="rightarrow"
                      className="filter-right-arrow"
                    />
                  </div>
                </div>
                <div className="filtered-chips">
                  {innerAvailability.map((elemt) => {
                    return (
                      <div className="filter-chip">
                        {elemt}{" "}
                        <IoCloseOutline
                          className="close-icon"
                          onClick={() => {
                            setInnerAvailability(
                              innerAvailability.filter((ele) => {
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
            <div className="filter-type-content" style={{ overflow: "unset" }}>
              {selectedrole == 1 && (
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
              )}
              {selectedrole == 2 && (
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
              {selectedrole == 3 && (
                <div className="search-tab">
                  <img
                    src={search}
                    className="pointer"
                    alt="search"
                    onClick={() => searchfninmode()}
                  />
                  <input
                    type="text"
                    className="ms-1 filter-search"
                    placeholder="Search Input Text"
                    value={searchinmode}
                    onChange={(e) => setSearchinmode(e.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchfninmode() : null
                    }
                  />
                </div>
              )}
              {selectedrole == 4 && (
                <div className="search-tab">
                  <img
                    src={search}
                    className="pointer"
                    alt="search"
                    onClick={() => searchfninlocation()}
                  />
                  <input
                    type="text"
                    className="ms-1 filter-search"
                    placeholder="Search Input Text"
                    value={searchinlocation}
                    onChange={(e) => setSearchinlocation(e.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchfninlocation() : null
                    }
                  />
                </div>
              )}
              {selectedrole == 5 && (
                <div className="search-tab">
                  <img
                    src={search}
                    className="pointer"
                    alt="search"
                    onClick={() => searchfninengagement()}
                  />
                  <input
                    type="text"
                    className="ms-1 filter-search"
                    placeholder="Search Input Text"
                    value={searchinengagement}
                    onChange={(e) => setSearchinengagement(e.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchfninengagement() : null
                    }
                  />
                </div>
              )}
              {selectedrole == 6 && (
                <div className="search-tab">
                  <img
                    src={search}
                    className="pointer"
                    alt="search"
                    onClick={() => searchfninprojectstatus()}
                  />
                  <input
                    type="text"
                    className="ms-1 filter-search"
                    placeholder="Search Input Text"
                    value={searchinprojectstatus}
                    onChange={(e) => setSearchinprojectstatus(e.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchfninprojectstatus() : null
                    }
                  />
                </div>
              )}
              {selectedrole == 7 && (
                <div className="search-tab">
                  <img
                    src={search}
                    className="pointer"
                    alt="search"
                    onClick={() => searchfninavailable()}
                  />
                  <input
                    type="text"
                    className="ms-1 filter-search"
                    placeholder="Search Input Text"
                    value={searchinavailable}
                    onChange={(e) => setSearchinavailable(e.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? searchfninavailable() : null
                    }
                  />
                </div>
              )}

              <div className="search-result-div">
                {selectedrole === 1 && searchhere == "" ? (
                  <div className="select-all-div">
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      onChange={(e) => {
                        e.target.checked
                          ? setInnerdepartment(
                            departmentlistdata.map((elem) => {
                              if (props.fromwhere === "admin") {
                                return elem.Department;
                              } else {
                                return elem;
                              }
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
                ) : null}
                {selectedrole == 2 && searchinemp == "" ? (
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
                {selectedrole == 3 && searchinmode == "" ? (
                  <div className="select-all-div">
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      onChange={(e) => {
                        e.target.checked
                          ? setInnerWorkmode(modelist)
                          : setInnerWorkmode([]);
                      }}
                      checked={innerWorkmode.length == modelist.length}
                    />
                    Select All
                  </div>
                ) : null}
                {selectedrole == 4 && searchinlocation == "" ? (
                  <div className="select-all-div">
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      onChange={(e) => {
                        e.target.checked
                          ? setInnerWorkLocation(locationlist)
                          : setInnerWorkLocation([]);
                      }}
                      checked={innerWorkLocation.length == locationlist.length}
                    />
                    Select All
                  </div>
                ) : null}
                {selectedrole == 5 && searchinengagement == "" ? (
                  <div className="select-all-div">
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      onChange={(e) => {
                        e.target.checked
                          ? setInnerEngagementType(engagementlist)
                          : setInnerEngagementType([]);
                      }}
                      checked={
                        innerEngagementType.length == engagementlist.length
                      }
                    />
                    Select All
                  </div>
                ) : null}
                {selectedrole == 6 && searchinprojectstatus == "" ? (
                  <div className="select-all-div">
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      onChange={(e) => {
                        e.target.checked
                          ? setInnerprojectstatus(projectstatuslist)
                          : setInnerprojectstatus([]);
                      }}
                      checked={
                        innerprojectstatus.length == projectstatuslist.length
                      }
                    />
                    Select All
                  </div>
                ) : null}
                {selectedrole == 7 && searchinavailable == "" ? (
                  <div className="select-all-div">
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      onChange={(e) => {
                        e.target.checked
                          ? setInnerAvailability(availabilitylist)
                          : setInnerAvailability([]);
                      }}
                      checked={
                        innerAvailability.length == availabilitylist.length
                      }
                    />
                    Select All
                  </div>
                ) : null}
                <div
                  className="search-result-item-block overflow-y-scroll w-100"
                  style={{ maxHeight: "120px" }}
                >
                  {selectedrole === 1 &&
                    filteredfordep.map((elem) => {
                      return (
                        <div className="search-result-item">
                          <input
                            type="checkbox"
                            className="filter-checkbox"
                            onChange={(e) => {
                              e.target.checked
                                ? setInnerdepartment([
                                  ...innerdepartment,
                                  props.fromwhere === "admin"
                                    ? elem.Department
                                    : elem,
                                ])
                                : setInnerdepartment(
                                  innerdepartment.filter((ele) => {
                                    if (props.fromwhere === "admin") {
                                      return ele !== elem.Department;
                                    } else {
                                      return ele !== elem;
                                    }
                                  })
                                );
                            }}
                            checked={
                              innerdepartment.length > 0 &&
                              innerdepartment.includes(
                                props.fromwhere === "admin"
                                  ? elem.Department
                                  : elem
                              )
                            }
                          />
                          {props.fromwhere === "admin" ? elem.Department : elem}
                        </div>
                      );
                    })}
                  {selectedrole === 2 &&
                    filteredforemp.map((elem) => {
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
                  {selectedrole === 3 &&
                    filteredformode.map((elem) => {
                      return (
                        <div className="search-result-item">
                          <input
                            type="checkbox"
                            className="filter-checkbox"
                            onChange={(e) => {
                              e.target.checked
                                ? setInnerWorkmode([...innerWorkmode, elem])
                                : setInnerWorkmode(
                                  innerWorkmode.filter((ele) => {
                                    return ele !== elem;
                                  })
                                );
                            }}
                            checked={innerWorkmode.includes(elem)}
                          />
                          {elem}
                        </div>
                      );
                    })}
                  {selectedrole === 4 &&
                    filteredforlocation.map((elem) => {
                      return (
                        <div className="search-result-item">
                          <input
                            type="checkbox"
                            className="filter-checkbox"
                            onChange={(e) => {
                              e.target.checked
                                ? setInnerWorkLocation([
                                  ...innerWorkLocation,
                                  elem,
                                ])
                                : setInnerWorkLocation(
                                  innerWorkLocation.filter((ele) => {
                                    return ele !== elem;
                                  })
                                );
                            }}
                            checked={innerWorkLocation.includes(elem)}
                          />
                          {elem}
                        </div>
                      );
                    })}
                  {selectedrole === 5 &&
                    filteredforengagement.map((elem) => {
                      return (
                        <div className="search-result-item">
                          <input
                            type="checkbox"
                            className="filter-checkbox"
                            onChange={(e) => {
                              e.target.checked
                                ? setInnerEngagementType([
                                  ...innerEngagementType,
                                  elem,
                                ])
                                : setInnerEngagementType(
                                  innerEngagementType.filter((ele) => {
                                    return ele !== elem;
                                  })
                                );
                            }}
                            checked={innerEngagementType.includes(elem)}
                          />
                          {elem}
                        </div>
                      );
                    })}
                  {selectedrole === 6 &&
                    filteredforprojectstatus.map((elem) => {
                      return (
                        <div className="search-result-item">
                          <input
                            type="checkbox"
                            className="filter-checkbox"
                            onChange={(e) => {
                              e.target.checked
                                ? setInnerprojectstatus([
                                  ...innerprojectstatus,
                                  elem,
                                ])
                                : setInnerprojectstatus(
                                  innerprojectstatus.filter((ele) => {
                                    return ele !== elem;
                                  })
                                );
                            }}
                            checked={innerprojectstatus.includes(elem)}
                          />
                          {elem}
                        </div>
                      );
                    })}
                  {selectedrole === 7 &&
                    filteredforavailable.map((elem) => {
                      return (
                        <div className="search-result-item">
                          <input
                            type="checkbox"
                            className="filter-checkbox"
                            onChange={(e) => {
                              e.target.checked
                                ? setInnerAvailability([
                                  ...innerAvailability,
                                  elem,
                                ])
                                : setInnerAvailability(
                                  innerAvailability.filter((ele) => {
                                    return ele !== elem;
                                  })
                                );
                            }}
                            checked={innerAvailability.includes(elem)}
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
              if (props.workmodeList.length > 0) {
                setInnerWorkmode(props.workmodeList);
              }
              if (props.workLocationList.length > 0) {
                setInnerWorkLocation(props.workLocationList);
              }
              if (props.engagementList.length > 0) {
                setInnerEngagementType(props.engagementList);
              }
              if (props.availableList.length > 0) {
                setInnerAvailability(props.availableList);
              }
              if (props.projectstatusList.length > 0) {
                setInnerprojectstatus(props.projectstatusList);
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
            Apply
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
          {innerdepartment.length +
            inneremployee.length +
            innerWorkmode.length +
            innerWorkLocation.length +
            innerEngagementType.length +
            innerprojectstatus.length +
            innerAvailability.length <=
            0 ? (
            <div className="filter-icon pointer">
              <img src={filterimg} alt="filterimg" />
              {/* <div className="filter-icon-text">Filter</div> */}
            </div>
          ) : props.departmentList.length +
            props.employeeList.length +
            props.workmodeList.length +
            props.workLocationList.length +
            props.engagementList.length +
            props.projectstatusList.length +
            props.availableList.length >
            0 ? (
            <div className="filter-icon filter-icon-active pointer position-relative">
              <img src={activefilterimg} alt="activefilterimg" />
              {/* <div className="active-filter-dot"></div> */}
              <div className="filter-icon-text">Filter</div>
              <div className="filter-count filter-count-outer">
                {props.departmentList.length +
                  props.employeeList.length +
                  props.workmodeList.length +
                  props.workLocationList.length +
                  props.engagementList.length +
                  props.projectstatusList.length +
                  props.availableList.length}
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
