import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import Loader from "../../../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import download from "../../../../assets/icons/download.svg";
import eye from "../../../../assets/icons/eye.svg";
import { getTransactionList } from "../../../../services/adminApi";
import { setTransactionsList } from "../../../../redux/actions";
import "./AdminTransactions.css";

const AdminTransactions = () => {
  const dispatch = useDispatch();
  const [transactionsloading, setTransactionsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [totalpages, setTotalPages] = useState(1);
  let adminReducer = useSelector((state) => state.AdminReducer);

  const handleViewTransaction = (val) => {
    // console.log("id", val?.id);
  };

  function getFormattedDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
  }

  const getTransactionsList = async (e) => {
    setTransactionsLoading(true);
    try {
      let res = await getTransactionList(pageNo, 10);
      setTransactionsLoading(false);
      console.log(res?.data, "transactions");
      dispatch(setTransactionsList(res?.data?.data));
      setTotalPages(res?.data?.pages?.Total_Pages);
    } catch (err) {
      console.log("Some Error", err);
      toast.error("Some Error");
      setTransactionsLoading(false);
    }
  };

  useEffect(() => {
    getTransactionsList();
  }, [pageNo]);

  // const HandlePrev = () => {
  //   if (pageNo > 1) {
  //     setPageNo(pageNo - 1);
  //   }
  // };
  // const HandleNext = () => {
  //   if (pageNo < totalpages) {
  //     setPageNo(pageNo + 1);
  //   }
  // };

  // const handleInputChange = (event) => {
  //   let value = event.target.value;
  //   value = value.replace(/\D/g, "");
  //   const numberValue = parseInt(value);
  //   const lowerLimit = 1;
  //   const upperLimit = totalpages;
  //   if (isNaN(numberValue) || numberValue < lowerLimit) {
  //     setPageNo(lowerLimit);
  //   } else if (numberValue > upperLimit) {
  //     setPageNo(upperLimit);
  //   } else {
  //     setPageNo(numberValue);
  //   }
  // };

  if (transactionsloading) {
    return <Loader />;
  }

  return (
    <div className=" adminTransaction h-100">
      <div className="d-flex justify-content-between align-items-center">
        <div className="mb-2">
          <h3 className="heading-overview mb-1">Transactions</h3>
          <h2 className="heading-homepage">Transactions</h2>
        </div>
        <button className="Onboard_New">Download All</button>
      </div>
      <div className="w-100 overflow-auto admin-custom-table">
        <Table>
          <thead>
            <tr>
              <th className="table-header tid">ID</th>
              <th className="table-header ps-0">Payment Invoice</th>
              <th className="table-header">Amount</th>
              <th className="table-header">Date</th>
              <th className="table-header">Status</th>
              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody>
            {adminReducer?.transactionList?.length > 0 &&
              adminReducer?.transactionList?.map((val, i) => {
                return (
                  <tr key={i}>
                    <td className="table-body tid">{val?.transaction_id}</td>
                    <td className="table-body ps-0 text-nowrap">
                      {val?.payment_invoice}
                    </td>
                    <td className="table-body tnxn-amount text-nowrap">
                      ₹{val?.amount}
                    </td>
                    <td className="table-body">
                      {getFormattedDate(val?.Date) || "Cardiology"}
                    </td>
                    <td className="table-body">
                      {val.transaction_status === "paid" ? (
                        <button className="chip Success_status_show">
                          Paid
                        </button>
                      ) : val.transaction_status === "Pending" ? (
                        <button className=" chip Pending_status_show">
                          Pending
                        </button>
                      ) : val.transaction_status === "Rejected" ? (
                        <button className=" chip Canceled_status_show">
                          {val.transaction_status}
                        </button>
                      ) : (
                        <button className="chip Success_status_show">
                          {val.transaction_status} Hi
                        </button>
                      )}
                    </td>
                    <td className="table-body">
                      <div className="d-flex gap-3 align-items-center">
                        <img
                          src={eye}
                          alt=""
                          width="20px"
                          className="icon_img cursor-pointer"
                          onClick={() => handleViewTransaction(val)}
                        />
                        <img
                          src={download}
                          width="25px"
                          alt=""
                          className="icon_img"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      {/* <div className="table-pagination">
                <div className="pagination-content">
                  Page{" "}
                  <input
                    type="number"
                    min={"1"}
                    max={totalpages}
                    value={pageNo}
                    onChange={handleInputChange}
                  />{" "}
                  of {totalpages}
                </div>
                <div className="d-flex rounded-1 overflow-hidden">
                  <button
                    className="prevBtn"
                    aria-label="Previous Page"
                    onClick={HandlePrev}
                  >
                    <img src={PREV} alt="" />
                  </button>
                  <button
                    className="nextBtn"
                    onClick={HandleNext}
                    aria-label="Next Page"
                  >
                    <img src={NEXT} alt="" />
                  </button>
                </div>
              </div> */}
    </div>
  );
};

export default AdminTransactions;
