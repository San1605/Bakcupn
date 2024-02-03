import React from "react";
import app_pic from "../../assets/img/parent-app 1.svg";
import download_btn from "../../assets/img/download_btn.svg";
import app1 from "../../assets/img/ecdmobi-app 2.svg";
import app2 from "../../assets/img/learner-app (1) (1).svg";
import app3 from "../../assets/img/teacher-app.svg";
import app4 from "../../assets/img/second-chance-app 1.svg";

const DBEapp = () => {
  return (
    <div className="pt-5 px-0 container-fluid mb-3">
      <p className="d-flex text-black-50 m-0 fw-bold  justify-content-center">
        Download Apps
      </p>
      <h2 className="d-flex justify-content-center fw-bold pb-3">
        Get the DBE Apps now
      </h2>
      <div className="px-5 mx-4">
        <div className="row row-cols-md-5 row-cols-1 m-0 py-4">
          <div className="col ps-5">
            <div className=" pt-1">
              <div className="position-relative">
                <img className="rounded-3" width="100%" src={app1} alt="." />
                <img
                  width="27px"
                  src={download_btn}
                  alt=".."
                  style={{
                    position: "absolute",
                    bottom: "-6px",
                    right: "-9px",
                  }}
                />
              </div>
              <div className="d-flex justify-content-start">
                <p
                  className="fw-bold px-2 py-2 m-0"
                  style={{ fontSize: "14px" }}
                >
                  ECDmobi
                </p>
              </div>
            </div>
          </div>
          <div className="col ps-5">
            <div className=" pt-1">
              <div className="position-relative">
                <img className="rounded-3" width="100%" src={app2} alt="." />
                <img
                  width="27px"
                  src={download_btn}
                  alt=".."
                  style={{
                    position: "absolute",
                    bottom: "-6px",
                    right: "-9px",
                  }}
                />
              </div>
              <div className="d-flex justify-content-start">
                <p
                  className="fw-bold px-2 py-2 m-0"
                  style={{ fontSize: "14px" }}
                >
                  ECDmobi
                </p>
              </div>
            </div>
          </div>
          <div className="col ps-5">
            <div className=" pt-1">
              <div className="position-relative">
                <img className="rounded-3" width="100%" src={app_pic} alt="." />
                <img
                  width="27px"
                  src={download_btn}
                  alt=".."
                  style={{
                    position: "absolute",
                    bottom: "-6px",
                    right: "-9px",
                  }}
                />
              </div>
              <div className="d-flex justify-content-start">
                <p
                  className="fw-bold px-2 py-2 m-0"
                  style={{ fontSize: "14px" }}
                >
                  ECDmobi
                </p>
              </div>
            </div>
          </div>
          <div className="col ps-5">
            <div className=" pt-1">
              <div className="position-relative">
                <img className="rounded-3" width="100%" src={app3} alt="." />
                <img
                  width="27px"
                  src={download_btn}
                  alt=".."
                  style={{
                    position: "absolute",
                    bottom: "-6px",
                    right: "-9px",
                  }}
                />
              </div>
              <div className="d-flex justify-content-start">
                <p
                  className="fw-bold px-2 py-2 m-0"
                  style={{ fontSize: "14px" }}
                >
                  ECDmobi
                </p>
              </div>
            </div>
          </div>
          <div className="col ps-5">
            <div className=" pt-1">
              <div className="position-relative">
                <img className="rounded-3" width="100%" src={app4} alt="." />
                <img
                  width="27px"
                  src={download_btn}
                  alt=".."
                  style={{
                    position: "absolute",
                    bottom: "-6px",
                    right: "-9px",
                  }}
                />
              </div>
              <div className="d-flex justify-content-start">
                <p
                  className="fw-bold px-2 py-2 m-0"
                  style={{ fontSize: "14px" }}
                >
                  ECDmobi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBEapp;
