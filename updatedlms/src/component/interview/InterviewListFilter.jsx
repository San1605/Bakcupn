import React, { useContext, useEffect, useState } from "react";
import Popover from "react-bootstrap/Popover";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import filterimg from "../../views/admin/assets/filter.svg";
import activeFilterIcon from "../../views/admin/assets/MicrosoftTeams-image.png";
import "../../views/admin/pages/dashboard/EmployeeListFilterComponent/employeeListfiltercomponent.css";
import { GlobalContext } from "../../context/GlobalState";

function InterviewListFilter({
  interviewTypelist,
  setInterviewTypelist,
  interviewStatus,
  setInterviewStatus,
  buddyDepartment,
  setBuddyDepartment,
  conversionRangeFromMonth,
  conversionRangeFromYear,
  conversionRangeToMonth,
  conversionRangeToYear,
  conversionRangeSelect,
  setConversionRangeFromMonth,
  setConversionRangeFromYear,
  setConversionRangeToMonth,
  setConversionRangeToYear,
  setConversionRangeSelect,
  setToDates,
  setFromDates,
  setCurrentPage,
  onChangeEventhandler,
}) {
  const { interviewlistdata, departmentlistdata } = useContext(GlobalContext);
  const [showInterviewType, setShowInterviewType] = useState(false);
  const [innerdepartment, setInnerdepartment] = useState(buddyDepartment);
  const [showDepartment, setShowDepartment] = useState(true);
  const [showInterviewStatus, setShowInterviewStatus] = useState(false);
  const [showDateRange, setShowDateRange] = useState(false);
  const [innerinterviewtype, setInnerinterviewtype] =
    useState(interviewTypelist);
  const [innerinterviewstatus, setInnerinterviewstatus] =
    useState(interviewStatus);
  const [innerConversionRangeFromMonth, setInnerConversionRangeFromMonth] =
    useState(conversionRangeFromMonth);
  const [innerConversionRangeFromYear, setInnerConversionRangeFromYear] =
    useState(conversionRangeFromYear);
  const [innerConversionRangeToMonth, setInnerConversionRangeToMonth] =
    useState(conversionRangeToMonth);
  const [innerConversionRangeToYear, setInnerConversionRangeToYear] = useState(
    conversionRangeToYear
  );
  const interviewtypedemo = ["Mock", "Trainee", "FTE"];
  const interviewstatusdemo = ["Completed", "Scheduled"];
  const [innerConversionRangeSelect, setInnerConversionRangeSelect] = useState(
    conversionRangeSelect
  );
  const [formDate, setFromDate] = useState("");
  const month = [
    { id: 1, monthname: "January" },
    { id: 2, monthname: "February" },
    { id: 3, monthname: "March" },
    { id: 4, monthname: "April" },
    { id: 5, monthname: "May" },
    { id: 6, monthname: "June" },
    { id: 7, monthname: "July" },
    { id: 8, monthname: "August" },
    { id: 9, monthname: "September" },
    { id: 10, monthname: "October" },
    { id: 11, monthname: "November" },
    { id: 12, monthname: "December" },
  ];
  const currentYear = new Date().getFullYear();

  const yearArrFrom = Array.from(
    new Array(14),
    (val, index) => currentYear - index
  );
  const yearArrTo = Array.from(
    new Array(17),
    (val, index) => currentYear + 3 - index
  );

  const Nextmonth = addMonths(new Date(), 1);
  const LastMonth = subtractMonths(new Date(), 1);
  const Lastsixmonths = subtractMonths(new Date(), 6);
  const Upcoming6months = addMonths(new Date(), 6);
  function convertMonthtodoubleDigit(n) {
    return n > 9 ? "" + n : "0" + n;
  }
  function subtractMonths(date, months) {
    date.setMonth(date.getMonth() - months);
    return date;
  }
  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }
  useEffect(() => {
    if (
      innerConversionRangeFromYear !== "" &&
      innerConversionRangeFromMonth !== "" &&
      innerConversionRangeToMonth !== "" &&
      innerConversionRangeToYear !== ""
    ) {
      setFromDate(
        new Date(
          `${innerConversionRangeFromYear}-${innerConversionRangeFromMonth}-01`
        ).toISOString() >
          new Date(
            `${innerConversionRangeToYear}-${innerConversionRangeToMonth}-${new Date(
              "2023",
              "2",
              0
            ).getDate()}`
          ).toISOString()
      );
    } else {
      setFromDate(false);
    }
  }, [
    innerConversionRangeFromYear,
    innerConversionRangeFromMonth,
    innerConversionRangeToMonth,
    innerConversionRangeToYear,
  ]);
  useEffect(() => {
    if (formDate) {
      if (innerConversionRangeFromMonth > innerConversionRangeToMonth) {
        setInnerConversionRangeFromMonth("");
        setInnerConversionRangeToMonth("");
        setConversionRangeFromMonth("");
        setConversionRangeToMonth("");
      } else if (innerConversionRangeFromYear > innerConversionRangeToYear) {
        setInnerConversionRangeFromYear("");
        setInnerConversionRangeToYear("");
        setConversionRangeFromYear("");
        setConversionRangeToYear("");
      } else {
        setInnerConversionRangeFromYear("");
        setInnerConversionRangeToYear("");
        setConversionRangeFromYear("");
        setConversionRangeToYear("");
        setInnerConversionRangeFromMonth("");
        setInnerConversionRangeToMonth("");
        setConversionRangeFromMonth("");
        setConversionRangeToMonth("");
      }
    }
  }, [
    innerConversionRangeFromYear,
    innerConversionRangeFromMonth,
    innerConversionRangeToMonth,
    innerConversionRangeToYear,
  ]);
  let toDate = "";
  let fromDate = "";
  if (
    !!innerConversionRangeFromYear &&
    !!innerConversionRangeFromMonth &&
    !!innerConversionRangeToYear &&
    !!innerConversionRangeToMonth &&
    !innerConversionRangeSelect
  ) {
    toDate =
      innerConversionRangeToYear +
      "-" +
      convertMonthtodoubleDigit(innerConversionRangeToMonth);
    fromDate =
      innerConversionRangeFromYear +
      "-" +
      convertMonthtodoubleDigit(innerConversionRangeFromMonth);
  } else if (
    !innerConversionRangeFromYear &&
    !innerConversionRangeFromMonth &&
    !innerConversionRangeToYear &&
    !innerConversionRangeToMonth &&
    !!innerConversionRangeSelect
  ) {
    if (innerConversionRangeSelect === "Last_Month") {
      toDate = `${LastMonth.getFullYear()}-${convertMonthtodoubleDigit(
        LastMonth.getMonth() + 1
      )}`;
      fromDate = `${LastMonth.getFullYear()}-${convertMonthtodoubleDigit(
        LastMonth.getMonth() + 1
      )}`;
    } else if (innerConversionRangeSelect === "Next_month") {
      toDate = `${Nextmonth.getFullYear()}-${convertMonthtodoubleDigit(
        Nextmonth.getMonth() + 1
      )}`;
      fromDate = `${Nextmonth.getFullYear()}-${convertMonthtodoubleDigit(
        Nextmonth.getMonth() + 1
      )}`;
    } else if (innerConversionRangeSelect === "Last_six_months") {
      toDate = `${new Date().getFullYear()}-${convertMonthtodoubleDigit(
        new Date().getMonth() + 1
      )}`;
      fromDate = `${Lastsixmonths.getFullYear()}-${convertMonthtodoubleDigit(
        Lastsixmonths.getMonth() + 1
      )}`;
    } else if (innerConversionRangeSelect === "Upcoming_six_months") {
      toDate = `${Upcoming6months.getFullYear()}-${convertMonthtodoubleDigit(
        Upcoming6months.getMonth() + 1
      )}`;
      fromDate = `${Nextmonth.getFullYear()}-${convertMonthtodoubleDigit(
        Nextmonth.getMonth() + 1
      )}`;
    } else if (innerConversionRangeSelect === "Current_Month") {
      toDate = `${new Date().getFullYear()}-${convertMonthtodoubleDigit(
        new Date().getMonth() + 1
      )}`;
      fromDate = `${new Date().getFullYear()}-${convertMonthtodoubleDigit(
        new Date().getMonth() + 1
      )}`;
    }
  }
  const saveIt = () => {
    setCurrentPage(1);
        interviewlistdata({
          pageNumber: 1,
          from: fromDate,
          to: toDate,
          name: "",
          interviewType: innerinterviewtype.length > 0? innerinterviewtype.toString():"Mock,Trainee,FTE",
          interviewStatus: innerinterviewstatus.length > 0? innerinterviewstatus.toString():"Completed,Scheduled",
          department: innerdepartment.length > 0? innerdepartment.toString(): departmentlistdata.map((val) => val.Department).toString(),
        });
    setBuddyDepartment(innerdepartment);
    setInterviewTypelist(innerinterviewtype);
    setInterviewStatus(innerinterviewstatus);
    setConversionRangeFromMonth(innerConversionRangeFromMonth);
    setConversionRangeFromYear(innerConversionRangeFromYear);
    setConversionRangeToMonth(innerConversionRangeToMonth);
    setConversionRangeToYear(innerConversionRangeToYear);
    setConversionRangeSelect(innerConversionRangeSelect);
    setFromDates(fromDate);
    setToDates(toDate);
    document.body.click();
  };
  const clearIt = () => {
    setCurrentPage(1);
    interviewlistdata({
      pageNumber: 1,
      from: "",
      to: "",
      name: "",
      interviewType: "Mock,Trainee,FTE",
      interviewStatus: "Completed,Scheduled",
      department: departmentlistdata.map((val) => val.Department).toString(),
    });
    setBuddyDepartment([]);
    setInterviewTypelist([]);
    setInterviewStatus([]);
    setConversionRangeFromMonth("");
    setConversionRangeFromYear("");
    setConversionRangeToMonth("");
    setConversionRangeToYear("");
    setConversionRangeSelect("");
    setInnerConversionRangeFromMonth("");
    setInnerConversionRangeFromYear("");
    setInnerConversionRangeSelect("");
    setInnerConversionRangeToMonth("");
    setInnerConversionRangeToYear("");
    setInnerinterviewtype([]);
    setInnerdepartment([]);
    setInnerinterviewstatus([]);
    document.body.click();
  };

  const popoverBottom = (
    <Popover id="popover-positioned-bottom">
      <div className="filter-popover">
        <div className="filter-head-div">
          <div className="filter-pane">
            <div className="filter-pane-head">Filters</div>
            <div
              className="filter-pane-clear pointer"
              onClick={() => {
                setCurrentPage(1);
                clearIt();
              }}
            >
              Clear All
            </div>
          </div>
          <div className="filter-head-text pt-1 mb-3">
            Please select from the below available filters
          </div>
          <div className="filter-content mt-2">
            <div className="filter-type">
            <div className="filter-option-div">
                <div
                  className={`filter-type-item ${
                    showDepartment ? "filter-type-item-active" : null
                  } `}
                  onClick={() => {
                    setShowDepartment(true);
                    setShowInterviewType(false);
                    setShowInterviewStatus(false);
                    setShowDateRange(false);
                  }}
                >
                  <div className="filter-type-name">Department</div>
                  <div className="filter-type-count-div">
                    {innerdepartment.length > 0 ? (
                      <div className="filter-count filter-count-type">
                        {/* {innerdepartment.length} */}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div
                className="filter-option-div"
                // onClick={() => {
                //   clearIt();
                //   setShowInterviewType(true);
                // }}
              >
                <div
                  className={`filter-type-item ${
                    showInterviewType ? "filter-type-item-active" : null
                  } `}
                  onClick={() => {
                    setShowDepartment(false);
                    setShowInterviewType(true);
                    setShowInterviewStatus(false);
                    setShowDateRange(false);
                  }}
                >
                  <div className="filter-type-name">Interview Type</div>
                  {innerinterviewtype.length > 0 ? (
                    <div className="filter-type-count-div">
                      <div className="filter-count filter-count-type"></div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div
                className="filter-option-div"
                // onClick={() => {
                //   clearIt();
                //   setShowInterviewStatus(true);
                // }}
              >
                <div
                  className={`filter-type-item ${
                    showInterviewStatus ? "filter-type-item-active" : null
                  }`}
                  onClick={() => {
                    setShowDepartment(false);
                    setShowInterviewType(false);
                    setShowInterviewStatus(true);
                    setShowDateRange(false);
                  }}
                >
                  <div className="filDepartment ter-type-name">
                    Interview Status
                  </div>
                  {innerinterviewstatus.length > 0 ? (
                    <div className="filter-type-count-div">
                      <div className="filter-count filter-count-type"></div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div
                className="filter-option-div"
                // onClick={() => {
                //   clearIt();
                //   setShowDateRange(true);
                // }}
              >
                <div
                  className={`filter-type-item ${
                    showDateRange ? "filter-type-item-active" : null
                  } `}
                  onClick={() => {
                    setShowDepartment(false);
                    setShowInterviewType(false);
                    setShowInterviewStatus(false);
                    setShowDateRange(true);
                  }}
                >
                  <div className="filter-type-name">Date Range</div>
                  <div className="filter-type-count-div">
                    {(!!innerConversionRangeFromMonth ||
                      !!innerConversionRangeFromYear ||
                      !!innerConversionRangeToMonth ||
                      !!innerConversionRangeToYear ||
                      !!innerConversionRangeSelect) && (
                      <div className="filter-count filter-count-type"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-type-content">
            {!!showDepartment && (
                <div>
                  <div className="search-result">
                    {!!departmentlistdata &&
                      departmentlistdata.map((value) => value.Department).map((val) => {
                        return (
                          <div className="selection-buddies">
                            <input
                              type="checkbox"
                              className="filter-checkbox"
                              onChange={(e) => {
                              e.target.checked
                                ? setInnerdepartment([
                                    ...innerdepartment,
                                    val,
                                  ])
                                : setInnerdepartment(
                                    innerdepartment.filter((ele) => {
                                      return ele !== val;
                                    })
                                  );
                            }}
                            checked={
                              innerdepartment.length > 0 &&
                              innerdepartment.includes(val)
                            }
                            />
                            {val}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
              {showInterviewType && (
                <div>
                  <div className="search-result">
                    {interviewtypedemo.map((val) => {
                      return (
                        <div className="selection-buddies">
                          <input
                            type="checkbox"
                            className="filter-checkbox"
                            onChange={(e) => {
                              e.target.checked
                                ? setInnerinterviewtype([
                                    ...innerinterviewtype,
                                    val,
                                  ])
                                : setInnerinterviewtype(
                                    innerinterviewtype.filter((ele) => {
                                      return ele !== val;
                                    })
                                  );
                            }}
                            checked={
                              innerinterviewtype.length > 0 &&
                              innerinterviewtype.includes(val)
                            }
                          />
                          {val}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {showInterviewStatus && (
                <div className="search-result">
                  {interviewstatusdemo.map((val) => {
                    return (
                      <div className="selection-buddies">
                        <input
                          type="checkbox"
                          className="filter-checkbox"
                          onChange={(e) => {
                            e.target.checked
                              ? setInnerinterviewstatus([
                                  ...innerinterviewstatus,
                                  val,
                                ])
                              : setInnerinterviewstatus(
                                  innerinterviewstatus.filter((ele) => {
                                    return ele !== val;
                                  })
                                );
                          }}
                          checked={
                            innerinterviewstatus.length > 0 &&
                            innerinterviewstatus.includes(val)
                          }
                        />
                        {val}
                      </div>
                    );
                  })}
                </div>
              )}
              {showDateRange && (
                <div className="">
                  <div>
                    <div className="date-selection-from py-1">From</div>
                    <div className="row m-0">
                      <div className="col-6">
                        <div className="date-selection-from-month py-1">
                          Month
                        </div>
                        <select
                          className="w-90 py-1 px-2 text-black-50 bg-white border"
                          value={innerConversionRangeFromMonth}
                          onChange={(e) => {
                            setInnerConversionRangeFromMonth(e.target.value);
                            setInnerConversionRangeSelect("");
                          }}
                        >
                          <option value="">Select</option>
                          {month.map((val) => {
                            return (
                              <option value={val.id}>{val.monthname}</option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-6">
                        <div className="date-selection-from-year py-1">
                          Year
                        </div>
                        <select
                          className="w-90 py-1 px-2 text-black-50 bg-white border"
                          value={innerConversionRangeFromYear}
                          onChange={(e) => {
                            setInnerConversionRangeFromYear(e.target.value);
                            setInnerConversionRangeSelect("");
                          }}
                        >
                          <option value="">Select</option>
                          {yearArrFrom.map((val) => {
                            return <option value={val}>{val}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="date-selection-from pt-2">To</div>
                    <div className="row m-0">
                      <div className="col-6">
                        <div className="date-selection-from-month py-1">
                          Month
                        </div>
                        <select
                          className="w-90 py-1 px-2 text-black-50 bg-white border"
                          value={innerConversionRangeToMonth}
                          onChange={(e) => {
                            console.log(e.target.value, "djfhgiurhgfi");
                            setInnerConversionRangeToMonth(e.target.value);
                            setInnerConversionRangeSelect("");
                          }}
                        >
                          <option value="">Select</option>
                          {month.map((val) => {
                            return (
                              <option value={val.id}>{val.monthname}</option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-6">
                        <div className="date-selection-from-year py-1">
                          Year
                        </div>
                        <select
                          className="w-90 py-1 px-2 text-black-50 bg-white border"
                          value={innerConversionRangeToYear}
                          onChange={(e) => {
                            setInnerConversionRangeToYear(e.target.value);
                            setInnerConversionRangeSelect("");
                          }}
                        >
                          <option value="">Select</option>

                          {yearArrTo.map((val) => {
                            return <option value={val}>{val}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  {formDate ? (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      Select Correct Year!!
                    </div>
                  ) : null}
                  <div className="border-bottom lowline py-2"></div>
                  <div className="text-center w-100  pt-2">Or</div>
                  <div className="search-result">
                    <div className="selection-buddies">
                      <input
                        type="radio"
                        name="month"
                        value="Current_Month"
                        className="filter-checkbox"
                        checked={innerConversionRangeSelect == "Current_Month"}
                        onClick={(e) => {
                          setInnerConversionRangeSelect(e.target.value);
                          setInnerConversionRangeFromYear("");
                          setInnerConversionRangeFromMonth("");
                          setInnerConversionRangeToYear("");
                          setInnerConversionRangeToMonth("");
                        }}
                      />
                      Current Month
                    </div>
                    <div className="selection-buddies">
                      <input
                        type="radio"
                        name="month"
                        value="Next_month"
                        checked={innerConversionRangeSelect == "Next_month"}
                        className="filter-checkbox"
                        onClick={(e) => {
                          setInnerConversionRangeSelect(e.target.value);
                          setInnerConversionRangeFromYear("");
                          setInnerConversionRangeFromMonth("");
                          setInnerConversionRangeToYear("");
                          setInnerConversionRangeToMonth("");
                        }}
                      />
                      Next month
                    </div>
                    <div className="selection-buddies">
                      <input
                        type="radio"
                        name="month"
                        value="Last_Month"
                        className="filter-checkbox"
                        checked={innerConversionRangeSelect == "Last_Month"}
                        onClick={(e) => {
                          setInnerConversionRangeSelect(e.target.value);
                          setInnerConversionRangeFromYear("");
                          setInnerConversionRangeFromMonth("");
                          setInnerConversionRangeToYear("");
                          setInnerConversionRangeToMonth("");
                        }}
                      />
                      Last Month
                    </div>
                    <div className="selection-buddies">
                      <input
                        type="radio"
                        name="month"
                        value="Last_six_months"
                        className="filter-checkbox"
                        checked={
                          innerConversionRangeSelect == "Last_six_months"
                        }
                        onClick={(e) => {
                          setInnerConversionRangeSelect(e.target.value);
                          setInnerConversionRangeFromYear("");
                          setInnerConversionRangeFromMonth("");
                          setInnerConversionRangeToYear("");
                          setInnerConversionRangeToMonth("");
                        }}
                      />
                      Last six months
                    </div>
                    <div className="selection-buddies">
                      <input
                        type="radio"
                        name="month"
                        value="Upcoming_six_months"
                        className="filter-checkbox"
                        checked={
                          innerConversionRangeSelect == "Upcoming_six_months"
                        }
                        onClick={(e) => {
                          setInnerConversionRangeSelect(e.target.value);
                          setInnerConversionRangeFromYear("");
                          setInnerConversionRangeFromMonth("");
                          setInnerConversionRangeToYear("");
                          setInnerConversionRangeToMonth("");
                        }}
                      />
                      Upcoming 6 months
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="filter-actions">
          <div
            className="filter-action-btn filter-cancel"
            onClick={() => {
              if (buddyDepartment.length > 0) {
                setInnerdepartment(buddyDepartment);
              }
              if (interviewTypelist.length > 0) {
                setInnerinterviewtype(interviewTypelist);
              }
              if (interviewStatus.length > 0) {
                setInnerinterviewstatus(interviewStatus);
              }
              if (!conversionRangeFromMonth) {
                setInnerConversionRangeFromMonth(conversionRangeFromMonth);
              }
              if (!conversionRangeFromYear) {
                setInnerConversionRangeFromYear(conversionRangeFromYear);
              }
              if (!conversionRangeToMonth) {
                setInnerConversionRangeToMonth(conversionRangeToMonth);
              }
              if (!conversionRangeToYear) {
                setInnerConversionRangeToYear(conversionRangeToYear);
              }
              document.body.click();
            }}
          >
            Cancel
          </div>
          <div
            className="filter-action-btn filter-save"
            onClick={() => {
              saveIt();
            }}
          >
            Apply filter
          </div>
        </div>
      </div>
    </Popover>
  );
  return (
    <div className="ps-2">
      <ButtonToolbar>
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={popoverBottom}
          rootClose
        >
          { innerdepartment.length +
            innerinterviewtype.length +
            innerinterviewstatus.length +
            innerConversionRangeFromMonth.length +
            innerConversionRangeFromYear.length +
            innerConversionRangeSelect.length +
            innerConversionRangeToMonth.length +
            innerConversionRangeToYear.length <=
          0 ? (
            <div className="filter-icon pointer">
              <img src={filterimg} alt="filterimg" />
            </div>
          ) : innerdepartment.length +
              interviewTypelist.length +
              interviewStatus.length +
              conversionRangeFromMonth.length +
              conversionRangeFromYear.length +
              conversionRangeSelect.length +
              conversionRangeToMonth.length +
              conversionRangeToYear.length >
            0 ? (
            <div className="pointer">
              <img src={activeFilterIcon} alt="activefilterimg" />
            </div>
          )  : buddyDepartment.length + interviewTypelist.length + interviewStatus.length + conversionRangeFromMonth.length + conversionRangeFromYear.length + conversionRangeSelect.length + conversionRangeToMonth.length + conversionRangeToYear.length > 0 ? (
            <div className="pointer">
              <img src={filterimg} alt="filterimg" />
            </div>
          ) : (
            <div className="filter-icon pointer">
              <img src={filterimg} alt="filterimg" />
            </div>
          )}
        </OverlayTrigger>
      </ButtonToolbar>
    </div>
  );
}

export default InterviewListFilter;
