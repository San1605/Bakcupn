import React from 'react';
import ReactPaginate from "react-paginate";
import "./pagination.css";

function Pagination({ onChangeEventhandler , total}) {
  
  return (
    <>
      
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"...."}
        pageCount={total} // total number of pages in row  < 1 , 2, 3, 4 .... 15
        marginPagesDisplayed={2} //total no of pages diplay in end and start
        pageRangeDisplayed={1} //no. of pages shown in middle of pagination
        onPageChange={onChangeEventhandler}
        containerClassName={"pagination justify-content-center"}
        pageLinkClassName={"page-link"}
        pageClassName={"page-item"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
}

export default Pagination
