import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import readingframe from "../../../../../../assets/svg/myCurrentCourses/readingframe.svg";
import opennew from "../../../../../../assets/svg/myCurrentCourses/opennew.svg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RichTextEditor from "react-rte";
import Nodata from "./Nodata";

function SubtopicView({ coursearray, dataval }) {
  const [subTopicData, setSubTopicData] = useState({});
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const [defaulta, setDefaulta] = useState("Description");

  useEffect(() => {
    if(Object.keys(coursearray[Number(dataval.split(".")[0])].value[
      Number(dataval.split(".")[1])
    ].value).length > 0)
    {
    const temp =
      coursearray[Number(dataval.split(".")[0])].value[
        Number(dataval.split(".")[1])
      ];
    setSubTopicData(temp);
    }
    else{
      setSubTopicData({});
    }
  }, [dataval]);

  useEffect(() => {
    if(Object.keys(subTopicData).length > 0)
    {
      setValue(
      RichTextEditor.createValueFromString(subTopicData?.value?.content, "html")
    );
    if(subTopicData?.value?.description !== "")
      {      
        setDefaulta("Description")
      }  
      else if(subTopicData.value.refmaterial !== "")
      {
        setDefaulta("References")
      }
      else{
        setDefaulta("")
      }
}
  }, [subTopicData]);
 if(Object.keys(subTopicData).length > 0)
 { return (
    <div className="h-100 pe-2 overflow-y-scroll">
      {
      subTopicData?.value?.addType == "Video" ? (
        <ReactPlayer
          className="react-player"
          controls
          width="100%"
          height="350px"
          url={subTopicData.value.content}
          // ref={player}
          // onEnded={() => setIscompleted(true)}
          // onProgress={(progress) => {
          //   setTimer(progress.playedSeconds);
          // }}
          // onPause={() => {
          //   convert_to_min(timer);
          // }}
          // playing={isPlaying}
        />
      ) : subTopicData?.value?.addType == "articleLink" ? (
        <div style={{ width: "100%" }}>
          <div className="readingframe-div" style={{ height: "350px" }}>
            <img src={readingframe} alt="readingframe" />
            <div
              className="modal-outer-primary-btn opennew pointer"
              onClick={() => window.open(subTopicData.value.content, "_blank")}
            >
              <p>Open</p> <img src={opennew} alt="opennew" height={16} />
            </div>

            {/* <h5
              className="pointer"
              style={{
                color: "#4f52b2",
                fontSize: "12px",
                textDecoration: "underline",
                textUnderlineOffset: "5px",
              }}
            >
              Click here to mark as done
            </h5> */}
          </div>
        </div>
      ) : subTopicData?.value?.addType == "articleWritten" ? (
        <RichTextEditor
          value={value}
          //   onChange={(newValue) => {
          //     setValue(newValue);
          //   }}
          className="RichTextEditor"
          disabled
        />
      ) : null}
      {subTopicData.value.refmaterial !== "" || subTopicData.value.description !== "" ?<div className="bg-white mt-3" style={{ height: "200px" }}>
      <Tabs id="controlled-tab-example" defaultActiveKey={defaulta}>
        {subTopicData?.value?.description !== "" &&<Tab eventKey="Description" title="Description" >
            <div className="overflow-y-scroll" style={{ height: "145px" }}>
              <p
                className="ps-3"
                style={{
                  color: "#616161",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {subTopicData?.value?.description}
              </p>
            </div>
          </Tab>}
          {subTopicData?.value?.refmaterial !== "" && <Tab eventKey="References" title="References" >
            <div className="overflow-y-scroll" style={{ height: "145px" }}>
              <p
                className="ps-3"
                style={{
                  color: "#616161",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {subTopicData?.value?.refmaterial}
              </p>
            </div>
          </Tab>}
        </Tabs>
      </div>:null}
    </div>
  );}
  else{
    return(
      <Nodata/>
    )
  }
}

export default SubtopicView;
