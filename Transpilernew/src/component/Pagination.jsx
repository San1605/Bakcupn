import React, { useEffect, useState } from "react";

function Pagination({
  SetLoading,
  prevDisable,
  nextDisable,
  TotalPage,
  CurrentPage,
  SetCurrentPage,
  loading,
}) {
  const [tempPage, setTempPage] = useState(CurrentPage);
  const handleBackButtonClick = () => {
    // console.log("back");
    if (CurrentPage > 1) {
      SetCurrentPage(CurrentPage - 1);
      SetLoading(true);
    }
  };
  useEffect(() => {
    setTempPage(CurrentPage);
  }, [CurrentPage]);

  const handleNextButtonClick = () => {
    if (CurrentPage < TotalPage) {
      SetCurrentPage(CurrentPage + 1);
      SetLoading(true);
    }
  };
  function enterKeyPress(event) {
    if (event.key === "Enter") {
      const pageValueInt = parseInt(tempPage);
      SetCurrentPage(pageValueInt);
      SetLoading(true);
    }
  }
  // console.log(prevDisable, "prev");
  return (
    <div className="flex justify-end items-center text-sm text-[#58595B] gap-x-2">
      <div
        disabled={prevDisable}
        className={`border text-md flex items-center justify-center h-[30px] w-[30px] rounded  ${
          prevDisable || loading
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        <div
          className={`h-full w-full flex items-center justify-center ${
            (prevDisable || loading) && "pointer-events-none"
          }`}
          onClick={handleBackButtonClick}
        >
          {"<"}
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        Page
        <input
          type="text"
          value={tempPage}
          className="border text-md  h-[30px] w-[30px] rounded ps-[10px] focus-visible:outline-none"
          onChange={(e) => {
            setTempPage(e.target.value);
          }}
          onKeyDown={enterKeyPress}
          onWheel={(e) => e.target.blur()}
        />
        of {TotalPage}
      </div>
      <div
        disabled={nextDisable}
        className={`border text-md flex items-center justify-center h-[30px] w-[30px] rounded  ${
          nextDisable || loading
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        <div
          className={`h-full w-full flex items-center justify-center ${
            (nextDisable || loading) && "pointer-events-none"
          }`}
          onClick={handleNextButtonClick}
        >
          {">"}
        </div>
      </div>
    </div>
  );
}

export default Pagination;
