import React, { useState } from "react";
import Popover from "react-bootstrap/Popover";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import filterimg from "../../views/admin/assets/filter.svg";
import rightarrow from "../../views/admin/assets/rightarrow.svg";
import activefilterimg from "../../views/admin/assets/activefilter.svg";
import "./afiltercomponent.css";
import { useEffect } from "react";

function AFilterComponent(props) {
  const [innerdepartment, setInnerdepartment] = useState(props.departmentList);
  const [inneremployee, setInneremployee] = useState(props.employeeList);
  const [innerConversionRangeFromMonth, setInnerConversionRangeFromMonth] =
    useState(props.conversionRangeFromMonth);
  const [innerConversionRangeFromYear, setInnerConversionRangeFromYear] =
    useState(props.conversionRangeFromYear);
  const [innerConversionRangeToMonth, setInnerConversionRangeToMonth] =
    useState(props.conversionRangeToMonth);
  const [innerConversionRangeToYear, setInnerConversionRangeToYear] = useState(
    props.conversionRangeToYear
  );
  const [innerConversionRangeSelect, setInnerConversionRangeSelect] = useState(
    props.conversionRangeSelect
  );
  const [showDepartment, setShowDepartment] = useState(true);
  const [showConvertionType, setShowConvertiontype] = useState(false);
  const [showConvertionRange, setShowConvertionRange] = useState(false);
  const empList = ["Intern", "Trainee"];
  const [formDate , setFromDate] = useState("")
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
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
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
    }
    else{
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
        if(innerConversionRangeFromMonth > innerConversionRangeToMonth){
            setInnerConversionRangeFromMonth("");
            setInnerConversionRangeToMonth("");
            props.setConversionRangeFromMonth("");
            props.setConversionRangeToMonth("");
        }
        else if(innerConversionRangeFromYear > innerConversionRangeToYear){
            setInnerConversionRangeFromYear("");
            setInnerConversionRangeToYear("");
            props.setConversionRangeFromYear("");
            props.setConversionRangeToYear("");
        }else{
            setInnerConversionRangeFromYear("");
            setInnerConversionRangeToYear("");
            props.setConversionRangeFromYear("");
            props.setConversionRangeToYear("");
            setInnerConversionRangeFromMonth("");
            setInnerConversionRangeToMonth("");
            props.setConversionRangeFromMonth("");
            props.setConversionRangeToMonth("");
        }
      }
  } ,  [
    innerConversionRangeFromYear,
    innerConversionRangeFromMonth,
    innerConversionRangeToMonth,
    innerConversionRangeToYear,
  ])
  const saveIt = () => {
    let toDate = "";
    let fromDate = "";
    props.setCurrentPage1(1);
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
    props.setToDates(toDate);
    props.setFromDates(fromDate);
    props.setDepartmentList(innerdepartment);
    props.setEmployeeList(inneremployee);
    props.setConversionRangeFromMonth(innerConversionRangeFromMonth);
    props.setConversionRangeFromYear(innerConversionRangeFromYear);
    props.setConversionRangeToMonth(innerConversionRangeToMonth);
    props.setConversionRangeToYear(innerConversionRangeToYear);
    props.setConversionRangeSelect(innerConversionRangeSelect);
    //Api calling
    // async function hrBuddiesConversionList(
    //     page,
    //     department,
    //     name,
    //     type,
    //     from,
    //     to
    //   ) {
    if(innerdepartment.length <= 0){
        props.APICallingFunction(1, innerdepartment.toString(), capitalizeFirst(props.name) , inneremployee , fromDate , toDate);
    }else{
        props.APICallingFunction(1, props.APIDepartmentList.toString() , capitalizeFirst(props.name) , inneremployee , fromDate , toDate);
    }
    document.body.click();
  };
  const clearIt = () => {
    props.setDepartmentList([]);
    props.setEmployeeList([]);
    props.setConversionRangeFromMonth("");
    props.setConversionRangeFromYear("");
    props.setConversionRangeToMonth("");
    props.setConversionRangeToYear("");
    props.setConversionRangeSelect("");
    setInnerConversionRangeFromMonth("");
    setInnerConversionRangeFromYear("");
    setInnerConversionRangeSelect("");
    setInnerConversionRangeToMonth("");
    setInnerConversionRangeToYear("");
    setInnerdepartment([]);
    setInneremployee([]);
    //api Calling
    props.APICallingFunction(1 ,props.APIDepartmentList.toString() , "" , "" , "" , "");
    document.body.click();
  };
  const popoverBottom = (
    <Popover id="popover-positioned-bottom">
      <div className="filter-popover">
        <div className="filter-head-div">
          <div className="filter-pane">
            <div className="filter-pane-head">
              Filters
              <div className="filter-count">
                {innerdepartment.length + inneremployee.length}
              </div>
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
                    showDepartment ? "filter-type-item-active" : ""
                  }`}
                  onClick={() => {
                    setShowDepartment(true);
                    setShowConvertionRange(false);
                    setShowConvertiontype(false);
                  }}
                >
                  <div className="filter-type-name">Department</div>
                  <div className="filter-type-count-div">
                    {innerdepartment.length > 0 ? (
                      <div className="filter-count filter-count-type">
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
              </div>
              <div className="filter-option-div">
                <div
                  className={`filter-type-item ${
                    showConvertionType ? "" : "filter-type-item-active"
                  }`}
                  onClick={() => {
                    setShowDepartment(false);
                    setShowConvertionRange(false);
                    setShowConvertiontype(true);
                  }}
                >
                  <div className="filter-type-name">Conversion Type</div>
                  <div className="filter-type-count-div">
                    {inneremployee.length > 0 ? (
                      <div className="filter-count filter-count-type">
                        {inneremployee.length}
                      </div>
                    ) : null}
                    <img
                      src={rightarrow}
                      alt="rightarrow"
                      className="filter-right-arrow"
                    />
                  </div>
                </div>
              </div>
              <div className="filter-option-div">
                <div
                  className={`filter-type-item ${
                    showDepartment ? "filter-type-item-active" : ""
                  }`}
                  onClick={() => {
                    setShowDepartment(false);
                    setShowConvertiontype(false);
                    setShowConvertionRange(true);
                  }}
                >
                  <div className="filter-type-name">Department</div>
                  <div className="filter-type-count-div">
                    {(!!innerConversionRangeFromMonth ||
                      !!innerConversionRangeFromYear ||
                      !!innerConversionRangeToMonth ||
                      !!innerConversionRangeToYear ||
                      !!innerConversionRangeSelect) && (
                      <div className="filter-count filter-count-type"></div>
                    )}
                    <img
                      src={rightarrow}
                      alt="rightarrow"
                      className="filter-right-arrow"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-type-content">
              <div className="search-result">
                <div className="search-result-item-div">
                  {showDepartment &&
                    props.APIDepartmentList.map((elem) => {
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
                    })}
                  {showConvertionType &&
                    empList.map((elem) => {
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
                  {showConvertionRange && (
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
                                setInnerConversionRangeFromMonth(
                                  e.target.value
                                );
                                setInnerConversionRangeSelect("");
                              }}
                            >
                              <option value="">Select</option>
                              {month.map((val) => {
                                return (
                                  <option value={val.id}>
                                    {val.monthname}
                                  </option>
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
                                  <option value={val.id}>
                                    {val.monthname}
                                  </option>
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
                          Select Correct Year or year!!
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
                            checked={
                              innerConversionRangeSelect == "Current_Month"
                            }
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
                              innerConversionRangeSelect ==
                              "Upcoming_six_months"
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
              if (!props.conversionRangeFromMonth) {
                setInnerConversionRangeFromMonth(
                  props.conversionRangeFromMonth
                );
              }
              if (!props.conversionRangeFromYear) {
                setInnerConversionRangeFromYear(props.conversionRangeFromYear);
              }
              if (!props.conversionRangeToMonth) {
                setInnerConversionRangeToMonth(props.conversionRangeToMonth);
              }
              if (!props.conversionRangeToYear) {
                setInnerConversionRangeToYear(props.conversionRangeToYear);
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
          {innerdepartment.length +
            inneremployee.length +
            innerConversionRangeFromMonth.length +
            innerConversionRangeFromYear.length +
            innerConversionRangeSelect.length +
            innerConversionRangeToMonth.length +
            innerConversionRangeToYear.length <=
          0 ? (
            <div className="filter-icon pointer">
              <img src={filterimg} alt="filterimg" />
              <div className="filter-icon-text">Filter</div>
            </div>
          ) : props.departmentList.length + props.employeeList.length + props.conversionRangeFromMonth.length + props.conversionRangeFromYear.length + props.conversionRangeSelect.length + props.conversionRangeToMonth.length + props.conversionRangeToYear.length > 0 ? (
            <div className="filter-icon filter-icon-active pointer position-relative">
              <img src={activefilterimg} alt="activefilterimg" />
              <div className="filter-count filter-count-outer">
                {props.departmentList.length + props.employeeList.length + props.conversionRangeFromMonth.length + props.conversionRangeFromYear.length + props.conversionRangeSelect.length + props.conversionRangeToMonth.length + props.conversionRangeToYear.length}
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

export default AFilterComponent;
