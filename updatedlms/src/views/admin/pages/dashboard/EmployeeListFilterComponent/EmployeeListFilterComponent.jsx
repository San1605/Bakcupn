import React, { useEffect, useState } from "react";
import "./employeeListfiltercomponent.css";
import Popover from "react-bootstrap/Popover";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import rightarrow from "../../../assets/rightarrow.svg";
import filterimg from "../../../../admin/assets/filter.svg";
import activeFilterIcon from "../../../../admin/assets/MicrosoftTeams-image.png";
import { useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";

function EmployeeListFilterComponent({
  conversionType,
  setConversionType,
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
  adminDepartmentList1,
  setToDates,
  setFromDates,
  setCurrentPage1
}) {
  const { hrBuddiesConversionList } = useContext(GlobalContext);
  const [innerdepartment, setInnerdepartment] = useState(buddyDepartment);
  const [inneremployee, setInneremployee] = useState(conversionType);
  const [innerConversionRangeFromMonth, setInnerConversionRangeFromMonth] =
    useState(conversionRangeFromMonth);
  const [innerConversionRangeFromYear, setInnerConversionRangeFromYear] =
    useState(conversionRangeFromYear);
  const [innerConversionRangeToMonth, setInnerConversionRangeToMonth] =
    useState(conversionRangeToMonth);
  const [innerConversionRangeToYear, setInnerConversionRangeToYear] = useState(
    conversionRangeToYear
  );
  const [innerConversionRangeSelect, setInnerConversionRangeSelect] = useState(
    conversionRangeSelect
  );
  const [showDepartment, setShowDepartment] = useState(true);
  const [showConvertionType, setShowConvertiontype] = useState(false);
  const [showConvertionRange, setShowConvertionRange] = useState(false);
  const empList = ["Trainee Conversion" , "FTE Conversion"];
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
            setConversionRangeFromMonth("");
            setConversionRangeToMonth("");
        }
        else if(innerConversionRangeFromYear > innerConversionRangeToYear){
            setInnerConversionRangeFromYear("");
            setInnerConversionRangeToYear("");
            setConversionRangeFromYear("");
            setConversionRangeToYear("");
        }else{
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
  } ,  [
    innerConversionRangeFromYear,
    innerConversionRangeFromMonth,
    innerConversionRangeToMonth,
    innerConversionRangeToYear,
  ])
  const saveIt = () => {
    let toDate = "";
    let fromDate = "";
    // setCurrentPage1(1);
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
    setCurrentPage1(1)
    if(innerdepartment.length <= 0){
      hrBuddiesConversionList(1, adminDepartmentList1.toString() , "" , inneremployee , fromDate , toDate);
    }else{
      console.log(innerdepartment , "inner")
      hrBuddiesConversionList(1, innerdepartment.toString(), "" , inneremployee , fromDate , toDate);
    }
    setBuddyDepartment(innerdepartment);
    setConversionType(inneremployee);
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
    setCurrentPage1(1);
    hrBuddiesConversionList(1 , adminDepartmentList1.toString() , "" , "" , "" , "");
    setBuddyDepartment([]);
    setConversionType([]);
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
    setInnerdepartment([]);
    setInneremployee([]);
    document.body.click();
  };
  const popoverBottom = (
    <Popover id="popover-positioned-bottom">
      <div className="filter-popover">
        <div className="filter-head-div">
          <div className="filter-pane">
            <div className="filter-pane-head">
              Filters
              {/* <span className="filter_buddy_notification">02</span> */}
            </div>
            <div
              className="filter-pane-clear pointer"
              onClick={() => clearIt()}
            >
              Clear All
            </div>
          </div>
          <div className="filter-head-text pt-1 mb-3">
            Please Select from the Following to filter
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
                    setShowConvertionRange(false);
                    setShowConvertiontype(false);
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
              <div className="filter-option-div">
                <div
                  className={`filter-type-item ${
                    showConvertionType ? "filter-type-item-active" : null
                  }`}
                  onClick={() => {
                    setShowDepartment(false);
                    setShowConvertionRange(false);
                    setShowConvertiontype(true);
                  }}
                >
                  <div className="filDepartment ter-type-name">
                    Conversion Type
                  </div>
                  <div className="filter-type-count-div">
                    {inneremployee.length > 0 ? (
                      <div className="filter-count filter-count-type">
                        {/* {inneremployee.length} */}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="filter-option-div">
                <div
                  className={`filter-type-item ${
                    showConvertionRange ? "filter-type-item-active" : null
                  } `}
                  onClick={() => {
                    setShowDepartment(false);
                    setShowConvertionRange(true);
                    setShowConvertiontype(false);
                  }}
                >
                  <div className="filter-type-name">Conversion Range</div>
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
                    {!!adminDepartmentList1 &&
                      adminDepartmentList1.map((val) => {
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
              {showConvertionType &&
                    empList.map((elem) => {
                      return (
                        <div className="search-result-item">
                          <input
                            type="radio"
                            name="conversion_type"
                            className="filter-checkbox"
                            value={elem}
                            checked={inneremployee === elem}
                            onChange={(e) => setInneremployee(e.target.value)}
                          />
                          {elem}
                        </div>
                      );
                    })}
              {!!showConvertionRange && (
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
              if (conversionType.length > 0) {
                setInneremployee(conversionType);
              }
              if (!conversionRangeFromMonth) {
                setInnerConversionRangeFromMonth(
                  conversionRangeFromMonth
                );
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
            onClick={() => {saveIt()}}
          >
            Save
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
          {(innerdepartment.length +
            inneremployee.length +
            innerConversionRangeFromMonth.length +
            innerConversionRangeFromYear.length +
            innerConversionRangeSelect.length +
            innerConversionRangeToMonth.length +
            innerConversionRangeToYear.length <=
          0)  ? (
            <div className="filter-icon pointer">
              <img src={filterimg} alt="filterimg" />
            </div>
          ) : buddyDepartment.length + conversionType.length + conversionRangeFromMonth.length + conversionRangeFromYear.length + conversionRangeSelect.length + conversionRangeToMonth.length + conversionRangeToYear.length > 0 ? (
            <div className="pointer">
              <img src={activeFilterIcon} alt="activefilterimg" />
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

export default EmployeeListFilterComponent;
