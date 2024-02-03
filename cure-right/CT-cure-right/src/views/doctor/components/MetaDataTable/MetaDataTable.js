import "../Dicom/Dicom.css";
import PREV from "../../../../assets/icons/prevArrow.svg";
import NEXT from "../../../../assets/icons/nextArrow.svg";
import React, { useState } from "react";
import { Table } from "react-bootstrap";

const MetaDataTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(11);

  const handleChangePage = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="table-cont">
        <Table className="meta-data-table h-auto" responsive>
          <thead>
            <tr>
              <th className="first-th">Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <tr key={index}>
                  <td className="first-td" style={{ color: "#616161" }}>
                    {item.name}
                  </td>
                  <td style={{ color: "#212121" }}>{item.value.toString()}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div className="table-pagination">
        <div className="pagination-content">
          Page{" "}
          <input
            type="number"
            min={"1"}
            max={Math.ceil(data.length / rowsPerPage)}
            value={page + 1}
            onChange={() => {}}
          />{" "}
          of {Math.ceil(data.length / rowsPerPage)}
        </div>
        <div className="d-flex rounded-1 overflow-hidden">
          <button
            className="prevBtn"
            disabled={page === 0}
            onClick={() => handleChangePage(page - 1)}
            aria-label="Previous Page"
          >
            <img src={PREV} alt="" />
          </button>
          <button
            className="nextBtn"
            disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}
            onClick={() => handleChangePage(page + 1)}
            aria-label="Next Page"
          >
            <img src={NEXT} alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default MetaDataTable;
