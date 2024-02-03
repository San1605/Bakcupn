import React, { useRef } from "react";
import chatIcon from "../../../../../../assets/svg/myCurrentCourses/communityReferenceChat.svg";
import profileimg from "../../../../../../assets/images/profileimg.png";
// import { AiOutlineClose } from "react-icons/ai";

import { useState } from "react";
import { useEffect } from "react";

function CommunityComments() {
  const [replytoggle, setReplytoggle] = useState(false);
  const showreplys = () => {
    setReplytoggle(!replytoggle);
  };
  useEffect(() => {
    const replyboxheight = replybox.current.getBoundingClientRect().height;

    if (replytoggle) {
      replycontainerbox.current.style.height = `${replyboxheight}px`;
      // replycontainerbox.current.style.margin = `1rem 0 1rem 0`;
    } else {
      replycontainerbox.current.style.height = `0px`;
      // replycontainerbox.current.style.margin = `0`;
    }
  }, [replytoggle]);

  const replycontainerbox = useRef(null);
  const replybox = useRef(null);
  return (
    <div className="d-flex flex-column px-2 " style={{ fontWeight: "400" }}>
      <div style={{ fontSize: "14px" }} className="py-1">
        Typography involves so much more than choosing essentially you and the
        entire ux remaining essentially you and the entire
      </div>
      <div className="d-flex mb-1">
        <div style={{ fontSize: "12px", color: "#424242" }}>
          <img src={chatIcon} alt="chatIcon" />
          <span> View 4 replies</span>
        </div>
        <div className="ms-3 pointer">
          <p
            style={{ fontSize: "12px", color: "#0E41A3" }}
            onClick={() => showreplys()}
          >
            Reply
          </p>
        </div>
      </div>
      <div className="hidereplys" ref={replycontainerbox}>
        <div
          className="community-reply-container overflow-y-scroll"
          ref={replybox}
        >
          {/* <AiOutlineClose
            className="reply-close-icon"
            onClick={() => showreplys()}
          /> */}
          <div className="community-reply my-1">
            <div className="community-reply-profile">
              <img
                src={profileimg}
                alt="profileimg"
                className="community-reply-profile-img"
              />
            </div>
            <div className="community-reply-text">
              Typography involves so much more than choosing essentially you and
              the entire ux remaining essentially you and the entire
            </div>
          </div>
          <div className="community-reply my-1">
            <div className="community-reply-profile">
              <img
                src={profileimg}
                alt="profileimg"
                className="community-reply-profile-img"
              />
            </div>
            <div className="community-reply-text">
              Typography involves so much more than choosing essentially you and
              the entire ux remaining essentially you and the entire
            </div>
          </div>
          <div className="community-reply my-1">
            <div className="community-reply-profile">
              <img
                src={profileimg}
                alt="profileimg"
                className="community-reply-profile-img"
              />
            </div>
            <div className="community-reply-text">
              Typography involves so much more than choosing essentially you and
              the entire ux remaining essentially you and the entire
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityComments;
