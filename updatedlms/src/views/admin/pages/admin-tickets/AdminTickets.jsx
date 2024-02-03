import React, { useState, useEffect } from "react";
import "./adminTickets.css";
import TicketListData from "../../utils/adminTicketPageData/TicketListData";
import Pagination from "../../../../component/pagination/Pagination";

function AdminTickets() {
  //Pagination code 👍
  const [pageCount, setPageCount] = useState(0);
  const [coursePerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPageCount(Math.ceil(TicketListData.length / coursePerPage));
  }, [TicketListData]);

  const onChangeEventhandler = (TicketListData) => {
    setCurrentPage(TicketListData.selected + 1);
  };
  const indexOfLastCourse = currentPage * coursePerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursePerPage;
  const currentCourse = TicketListData.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  useEffect(() => {
    document.title = `Tickets | ${process.env.REACT_APP_APP_NAME}`;
  }, []);

  return (
    <>
      <div className="adminTicketsPageContainer">
        <div className="adminListContainer bg-white mt-3">
          <div className="row adminPageTitleContainer px-3 py-3 d-flex align-items-center justify-content-between">
            <p className="adminPageTitle col-md-3 col-12">Tickets</p>
            <div className="col-md-3 col-12 d-flex justify-content-end">
              {pageCount > 1 ? (
                <Pagination
                  onChangeEventhandler={onChangeEventhandler}
                  total={pageCount}
                />
              ) : null}
            </div>
          </div>
          <div className="row col-12 tableFixHead" style={{height:"72vh"}}>
            <table className="table">
              <thead className="adminthead">
                <tr className="adminheadrow">
                  <th className="col-2 adminTicketsTableHead nowrap first-table-col">
                    S. no.
                  </th>
                  <th className="col-3 adminTicketsTableHead nowrap">
                    Reason For Raised Ticket
                  </th>
                  <th className="col-2 adminTicketsTableHead nowrap">
                    Created Date
                  </th>
                  <th className="col-2 adminTicketsTableHead nowrap">
                    Ticket Status
                  </th>
                  <th className="col-2 adminTicketsTableHead nowrap offset-1">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentCourse.map((val) => {
                  return (
                    <tr className="admincontentrow">
                      <td className="col-2 adminTicketsTablecontent nowrap first-table-col">
                        <p className="adminTicketContentText">{val.id}</p>
                      </td>
                      <td className="col-3 adminTicketsTablecontent nowrap">
                        <p className="adminTicketContentText">{val.reason}</p>
                      </td>
                      <td className="col-2 adminTicketsTablecontent nowrap">
                        <p className="adminTicketContentText">
                          {val.createdDate}
                        </p>
                      </td>
                      <td className="col-2 adminTicketsTablecontent nowrap">
                        <p
                          className={`adminTicketContentText adminTicketStatus-${val.status.toLowerCase()}`}
                        >
                          {val.status}
                        </p>
                      </td>
                      <td className=" col-2 adminTicketsTablecontent nowrap offset-1">
                        <button
                          className={`${
                            val.status.toLocaleLowerCase() === "pending"
                              ? " "
                              : " curson-block-disable"
                          } ticketApprove `}
                        >
                          Approve
                        </button>
                        <button
                          className={`${
                            val.status.toLocaleLowerCase() === "pending"
                              ? " "
                              : " curson-block-disable"
                          } ticketReject `}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminTickets;
