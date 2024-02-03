import React from "react";
import Popover from "react-bootstrap/Popover";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import filterimg from "../../../../admin/assets/filter.svg";
import "./filterpopup.css";

function FilterPopUp(props) {
  const popoverBottom = (
    <Popover id="popover-positioned-bottom">
      <div className="filter-popover">
        <div className="filter-head-div">
          <div className="filter-pane">
            <div className="filter-pane-head">
              Filters <span className="filter_buddy_notification">02</span>{" "}
            </div>
            <div className="filter-pane-clear pointer">Clear All</div>
          </div>
          <div className="filter-head-text pt-1 mb-3">
            Please select from the below available filters
          </div>
          <div className="filter-content mt-2">
            <div className="filter-type">
              <div className="filter-option-div">
                <div className={`filter-type-item filter-type-item-active`}>
                  <div className="filter-type-name">Department</div>
                  <div className="filter-type-count-div">
                    <div className="filter-count filter-count-type"></div>
                  </div>
                </div>
              </div>
              <div className="filter-option-div">
                <div className={`filter-type-item `}>
                  <div className="filter-type-name">Employment Type</div>
                  <div className="filter-type-count-div"></div>
                </div>
              </div>
            </div>
            <div className="filter-type-content">
              <div className="search-result">
                <div className="selection-buddies">
                  <input type="checkbox" className="filter-checkbox" />
                  Intern
                </div>
                <div className="selection-buddies">
                  <input type="checkbox" className="filter-checkbox" />
                  Trainee
                </div>
                <div className="search-result-item-div"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="filter-actions">
          <div className="filter-action-btn filter-cancel">Cancel</div>
          <div className="filter-action-btn filter-save">Apply</div>
        </div>
      </div>
    </Popover>
  );
  return (
    <div className="ps-2">
      <ButtonToolbar>
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={popoverBottom}
          rootClose
        >
          <div className="filter-icon pointer">
            <img src={filterimg} alt="filterimg" />
          </div>
        </OverlayTrigger>
      </ButtonToolbar>
    </div>
  );
}

export default FilterPopUp;
