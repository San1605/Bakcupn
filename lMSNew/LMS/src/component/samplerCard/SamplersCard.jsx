import React from "react";
import { FiDownload } from "react-icons/fi";
import noSamplerImg from "../../assets/svg/dashboard/samplers/nosamplerfound.svg";
import samplerpng from "../../assets/svg/dashboard/samplers/samplerpng.png";
import samplervideo from "../../assets/svg/dashboard/samplers/samplervideo.png";
import samplerpdficon from "../../assets/svg/dashboard/samplers/samplerpdficon.png";
import samplerppt from "../../assets/svg/dashboard/samplers/samplerppt.png";
import samplerjpg from "../../assets/svg/dashboard/samplers/samplerjpg.png";
import samplerdocx from "../../assets/svg/dashboard/samplers/samplerdocx.png";
import xl from "../../assets/svg/dashboard/samplers/xl.png";

import "./samplerCard.css";
function SamplersCard({ sampleFiles }) {
  const iconfinder = (extention) => {
    switch (extention) {
      case "png":
        return samplerpng;
      case "mp4":
        return samplervideo;
      case "pdf":
        return samplerpdficon;
      case "ppt":
        return samplerppt;
      case "pptx":
        return samplerppt;
      case "jpeg":
        return samplerjpg;
      case "jpg":
        return samplerjpg;
      case "docx":
        return samplerdocx;
      case "xlsm":
        return xl;
      case "xl":
        return xl;
      default:
        return samplerpng;
    }
  };
  return (
    <div className="overflow-y-scroll d-flex flex-column sampler-card">
      {sampleFiles.length > 0 ? (
        sampleFiles.map((elem, index) => {
          const icon = iconfinder(elem.blobname.split(".")[1]);
          return (
            <div
              className="sampler-item-row py-2 row d-flex justify-content-between align-items-center"
              key={index}
            >
              <div className="col-10 d-flex align-items-center file-details ">
                <div className="col-1 d-flex  ">
                  <img
                    src={icon}
                    style={{ maxWidth: "25px", maxHeight: "25px" }}
                    alt="fileIcon"
                  />
                </div>
                <div className="col-9 ps-1" style={{ fontSize: "12px" }}>
                  {elem.blobname}
                </div>
              </div>
              <div className="col-2 d-flex justify-content-end pe-1 file-download">
                <a href={elem.bloburl}>
                  {/* <FiDownload /> */}
                  <FiDownload style={{color:"#4f52b2",marginRight:"14px"}}/>
                  {/* <FiDownload style={{ color: "#484848" }} /> */}
                </a>
              </div>
            </div>
          );
        })
      ) : (
        <div className="NoSamplerCard">
          <img src={noSamplerImg} alt="noSamplerImg" className="noSamplerImg" />
          <p className="nosamplertext mt-3">No Samplers Found</p>
        </div>
      )}
    </div>
  );
}

export default SamplersCard;
