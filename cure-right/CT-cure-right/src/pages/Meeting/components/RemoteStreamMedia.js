import { useState, useEffect } from "react";
import { VideoStreamRenderer } from "@azure/communication-calling";
import { utils } from "../../../utils/meetingUtils";
import "./MediaGallery.css";
import audio from "../../../assets/icons/audio.svg";

function RemoteStreamMedia(props) {
  let isDoctor = localStorage.getItem("userType") === "doctor" ? true : false;
  let rendererView;
  let streamId = props.stream
    ? utils.getStreamId(props.label, props.stream)
    : `${props.label} - no stream`;
  const [available, setAvailable] = useState(false);
  const stream = props.stream;

  useEffect(() => {
    const renderStream = async () => {
      var container = document.getElementById(streamId);
      if (container && props.stream && props.stream.isAvailable) {
        setAvailable(true);
        var renderer = new VideoStreamRenderer(props.stream);
        // eslint-disable-next-line
        rendererView = await renderer.createView({ scalingMode: "Crop" });
        if (container && container.childElementCount === 0) {
          container.appendChild(rendererView.target);
        }
      } else {
        setAvailable(false);
        if (rendererView) {
          rendererView.dispose();
        }
      }
    };
    if (!stream) {
      return;
    }
    stream.on("isAvailableChanged", renderStream);

    if (stream.isAvailable) {
      renderStream();
    }

    return () => {
      if (rendererView) {
        // rendererView.dispose();
        setAvailable(false);
      }
    };
  }, [stream]);

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}:${minutes % 60}:${seconds % 60}`;
  };

  return (
    <div className="MediaGallery-container w-100 h-100">
      <div
        className="MediaGallery-container-sub"
        style={{ display: available ? "block" : "none" }}
        id={streamId}
      />
      {available && (
        <>
          <div className="time_button1">{formatTime(props?.meetTime)}</div>
          <div className="time_button2">
            {isDoctor ? "Suresh Raina" : "Dr Aayansh"}
          </div>
        </>
      )}

      <img src={audio} alt="" className="audio_img" />
      {/* <small>{props.label}</small> */}
      {!available && (
        <div className="MediaGallery-container-sub">Camera Off</div>
      )}
    </div>
  );
}

export default RemoteStreamMedia;
