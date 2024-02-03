import React from "react";
import play from "../../assets/img/videoveiw.svg";
import "./newsandevents.css";

const NewsAndEvent = () => {
  return (
    <div>
      <div>
        <div className="pt-5 px-0 container-fluid">
          <p className="text-black-50 fw-bold text-center m-0 news-and-event-p">
          NEWS & EVENTS
          </p>
          <h1 className="text-center fw-bold pb-4 news_events_heading">
          Enver Surty talks about the DBE Cloud
          </h1>
          <div className="py-5" style={{ backgroundColor: "#F1F7FA" }}>
            <div className="px-lg-5 mx-lg-4 px-1 mx-1 d-flex justify-content-center pb-3">
             {/* <iframe
                className="iframe-div"
                src="https://www.youtube.com/embed/k9eTTURUI54"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
  */}
            </div>
            <div className="px-lg-5 mx-lg-4 px-4 d-flex justify-content-lg-center justify-content-start">
                <div className="play-button">
                    <p className="m-1" style={{fontSize : "15px"}}>Deputy Minister of Basic Education 2004-2019</p>
                    <button className="text-white news_and_event_btn border-0 px-3 py-2"><img className="pe-2 news_and_event_btn_img" src={play} alt='.' />View Video</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAndEvent;
