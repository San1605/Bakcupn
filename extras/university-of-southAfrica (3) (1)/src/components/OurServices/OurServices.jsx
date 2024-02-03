import React from "react";
import arrow from "../../assets/img/arrow.svg";
import img from "../../assets/img/imgg/Rectangle 7.png";
import img1 from "../../assets/img/imgg/Rectangle 8.png";
import img2 from "../../assets/img/imgg/Rectangle 9.png";
import img3 from "../../assets/img/imgg/Rectangle 10.png";
import img4 from "../../assets/img/imgg/Rectangle 11.png";
import img5 from "../../assets/img/imgg/Rectangle 9.png";
import img6 from "../../assets/img/imgg/Rectangle 12.png";
import img7 from "../../assets/img/imgg/Rectangle 13.png";
import imgg from "../../assets/img/imgg/Group 390.png";
import imgg1 from "../../assets/img/imgg/Group 21.png";
import imgg2 from "../../assets/img/imgg/Group 22.png";
import imgg3 from "../../assets/img/imgg/Group 26.png";
import imgg4 from "../../assets/img/imgg/Group 27.png";
import imgg5 from "../../assets/img/imgg/Group 25.png";
import imgg6 from "../../assets/img/imgg/Group 24.png";
import imgg7 from "../../assets/img/imgg/Group 23.png";
import "./ourservice.css";

const OurServices = () => {
  const arr = [
    {
      originalimg: img,
      flipimg: imgg,
      description: "ECDmobi",
    },
    {
      originalimg: img1,
      flipimg: imgg1,
      description: "Learners",
    },
    {
      originalimg: img2,
      flipimg: imgg2,
      description: "Learners open access",
    },
    {
      originalimg: img3,
      flipimg: imgg6,
      description: "Parents",
    },
    {
      originalimg: img4,
      flipimg: imgg7,
      description: "Teachers",
    },
    {
      originalimg: img5,
      flipimg: imgg5,
      description: "Teachers open access",
    },
    {
      originalimg: img6,
      flipimg: imgg4,
      description: "Administration",
    },
    {
      originalimg: img7,
      flipimg: imgg3,
      description: "Support material",
    },
  ];
  return (
    <div>
      <div className="pt-5 px-0 container-fluid mb-5  ">
        <p className=" our-service-heading  d-flex  m-0 justify-content-center">
          OUR SERVICES
        </p>
        <h2 className=" our-service-sub-heading d-flex justify-content-center pb-md-5">
          Where we're focused
        </h2>
        <div style={{ backgroundColor: "#F1F7FA" }}>
          <div className="px-md-5 mx-md-4 px-3 mx-0">
            <div className="row m-0 py-4">
              {arr.map((val,i) => {
                return (
                  <div className="col-lg-3 col-md-4 col-12" key={i}>
                    <div className=" pt-3 rounded">
                      <div className="w-100 position-relative overflow-hidden hover-div">
                        <img width="100%" src={val.originalimg} alt="." />
                        <img
                          width="100%"
                          src={val.flipimg}
                          alt="."
                          className="hover-img"
                        />
                      </div>
                      <div className="d-flex rounded-bottom bg-white justify-content-between align-items-center">
                        <p
                          className="fw-bold px-2 py-2 m-0"
                          style={{ fontSize: "14px" }}
                        >
                          {val.description}
                        </p>
                        <img
                          className="px-2"
                          src={arrow}
                          alt="arrow"
                          style={{ width: "31.5px" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
