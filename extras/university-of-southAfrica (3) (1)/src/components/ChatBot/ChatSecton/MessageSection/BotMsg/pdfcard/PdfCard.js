import React from "react";
import download from "../../../../../../assets/img/pdfassets/pdficon.svg";
import pdficon from "../../../../../../assets/img/pdfassets/pdficon.svg";

function PdfCard() {
  return (
    <div>
      <div>
        <img src={download} />
      </div>
      <div>
        <img src={pdficon} />
      </div>

      <div>Science paper</div>
      <div>43 Mb</div>
    </div>
  );
}

export default PdfCard;
