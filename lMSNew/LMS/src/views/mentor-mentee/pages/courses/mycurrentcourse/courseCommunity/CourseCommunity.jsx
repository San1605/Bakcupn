import React from "react";
import "./courseCommunity.css";
import CommunityComments from "./CommunityComments";

function CourseCommunity() {
  return (
    <div>
      <div className="row d-flex align-items-center justify-content-between courseCommunityHead py-1 px-3">
        <div className="col-lg-6 col-md-5 col-12">
          <select
            name="communityTopicDropdown"
            className="p-1 topicDropdown"
            style={{ width: "25%" }}
            id="communityTopicDropdown"
          >
            <option value="" selected>
              TypoGraphy
            </option>
            <option value="">UI/UX</option>
            <option value="">React</option>
          </select>
        </div>
        <div className="col-lg-2 col-md-2 col-6 sortDropdown d-flex align-items-center justify-content-end offset-1">
          Sort:
          <select
            name="communityTopicDropdown"
            className="p-1 "
            id="communityTopicDropdown"
          >
            <option value="" selected>
              Recent
            </option>
            <option value="">Top</option>
          </select>
        </div>
        <div className="col-lg-2  col-md-2 col-6 d-flex align-items-center justify-content-start filterDropdownContainer offset-1">
          Filter:
          <select
            name="communityTopicDropdown"
            className="p-1 filterDropdown"
            id="communityTopicDropdown"
            style={{ width: "27%" }}
          >
            <option value="" selected>
              All
            </option>
            <option value="">Answered</option>
            <option value="">Unanswered</option>
          </select>
        </div>
      </div>
      <div className="d-flex flex-column overflow-y-scroll courseCommunity bg-white py-2 px-3">
        <CommunityComments />
        <CommunityComments />
        <CommunityComments />
        <CommunityComments />
        <CommunityComments />
        <CommunityComments />
      </div>
      <div className="w-100 communityCommentContainer bg-white py-2 px-4 text-end">
        <div className="community-comment row py-1 ps-3 pe-1">
          <input
            placeholder="Write here..."
            type="text"
            className="community-comment-input col-10"
          />
          <div className="col-2 community-comment-btn-container">
            <button className=" community-comment-btn">Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCommunity;
