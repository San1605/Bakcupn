import { useEffect, useState } from "react";
import { VideoStreamRenderer } from "@azure/communication-calling";
import "./MediaGallery.css";
import audio from "../../../assets/icons/audio.svg";
import me_button from "../../../assets/icons/me_button.svg";

function LocalStreamMedia(props) {
  // // console.log(props, "nirmal kkk")
  let rendererView;
  const [available, setAvailable] = useState(false);
  const videoID = "localVideo";

  useEffect(() => {
    (async () => {
      if (props.stream) {
        var renderer = new VideoStreamRenderer(props?.stream);

        // eslint-disable-next-line
        rendererView = await renderer.createView({ scalingMode: "Crop" });
        props.setView(rendererView);

        var container = document.getElementById(videoID);
        if (container && container.childElementCount === 0) {
          container.appendChild(rendererView.target);
          setAvailable(true);
        }
      } else {
        if (rendererView) {
          rendererView?.dispose();
          setAvailable(false);
        }
      }
    })();

    return () => {
      if (rendererView) {
        rendererView?.dispose();
        setAvailable(false);
      }
    };
  }, [props.stream]);

  return (
    <div
      className="MediaGallery-container"
      style={props?.style && { ...props?.style }}
    >
      <div
        className="MediaGallery-container-sub"
        style={{
          position: "absolute !",
          display: available ? "block" : "none",
          height: props.type === 1 ? "350px" : "100%",
        }}
        id={videoID}
      />
      {/* <small>{props.displayName}</small> (You) */}
      {available && (
        <>
          <img src={audio} alt="" className="audio_img1" />
          <img src={me_button} alt="" className="me_button" />
        </>
      )}
      {!available && (
        <div className="MediaGallery-container-sub">Camera Off</div>
      )}
    </div>
  );
}

export default LocalStreamMedia;
