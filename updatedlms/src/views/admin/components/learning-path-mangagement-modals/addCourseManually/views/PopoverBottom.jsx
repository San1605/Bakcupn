import React, { useCallback, useContext, useState } from "react";
import { FiSend } from "react-icons/fi";
import Popover from "react-bootstrap/Popover";
import { IoIosClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../../../../../context/GlobalState";

function PopoverBottom({
  indexno,
  namer,
  setShowOverlay,
  showOverlay,
  forName,
}) {
  const { postcomment } = useContext(GlobalContext);
  const params = useParams();
  const [commentinput, setCommentinput] = useState("");
  const sendcomment = () => {
    if (commentinput !== "") {
      const data = {
        courseId: params.course,
        index: indexno,
        title: namer,
        comment: commentinput,
      };
      postcomment(data);
      setShowOverlay("");
    }
  };
  return (
    <Popover id="popover-positioned-right">
      <div className="comment-box">
        <textarea
          name="comment-box"
          className="comment-box-textarea"
          rows={3}
          placeholder={`Type your comment for ${forName}`}
          value={commentinput}
          onChange={(e) => setCommentinput(e.target.value)}
          onKeyDown={(event) => (event.key === "Enter" ? sendcomment() : null)}
        ></textarea>
        <div className="save-comment">
          <IoIosClose
            className="close-comment"
            onClick={() => setShowOverlay("")}
          />
          <FiSend className="send-svg" onClick={() => sendcomment()} />
        </div>
      </div>
    </Popover>
  );
}

export default PopoverBottom;
