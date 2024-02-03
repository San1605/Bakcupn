import React from "react";
import "./OnboardSidebar.css";
import PersonalDetails from "../OnboardDetailsForms/PersonalDetails";
import ProfessionalInformation from "../OnboardDetailsForms/ProfessionalInformation";
import Education from "../OnboardDetailsForms/Education";
import WorkHistory from "../OnboardDetailsForms/WorkHistory";
import Documents from "../OnboardDetailsForms/Documents";
import Background from "../OnboardDetailsForms/Background";
import Agreement from "../OnboardDetailsForms/Agreement";
import "../OnboardDoctor/OnboardDoctor.css";
import { useState } from "react";

const OnboardSidebar = ({
  activeTabIndex,
  setActiveTabIndex,
  activeOnboardTab,
  setActiveOnboardTab,
}) => {
  // const [selectedComponent, setSelectedComponent] = useState(
  //   <PersonalDetails />
  // );
  // const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [sidebarTabs, setSidebarTabs] = useState([
    "Personal Details",
    "Professional Information",
    "Educational & Training",
    "Work History",
    "Documents & Bank Details",
    "Background Checks",
    "Agreements and Signatures",
  ]);

  const handleItemClick = (index) => {
    let selectedComponent;

    setActiveTabIndex(index);
    setActiveOnboardTab(selectedComponent);
  };
  return (
    <div className="onboard_sidebar parent-container h-100 ">
      <ul>
        {sidebarTabs?.map((tab, index) => {
          return (
            <li
              key={index}
              className={index === activeTabIndex && "activaOnboardTab"}
              onClick={() => handleItemClick(index)}
            >
              {tab}
            </li>
          );
        })}
        {/* <li
            className={
              activeOnboardTab === <PersonalDetails /> && "activaOnboardTab"
            }
            onClick={() => handleItemClick(<PersonalDetails />)}
          >
            Personal Details
          </li>
          <li onClick={() => handleItemClick(<ProfessionalInformation />)}>
            Professional Information
          </li>
          <li onClick={() => handleItemClick(<Education />)}>
            Educational & Training
          </li>
          <li onClick={() => handleItemClick(<WorkHistory />)}>Work History</li>
          <li onClick={() => handleItemClick(<Documents />)}>
            Documents & Bank Details
          </li>
          <li onClick={() => handleItemClick(<Background />)}>
            Background Checks
          </li>
          <li onClick={() => handleItemClick(<Agreement />)}>
            Agreements and Signatures
          </li> */}
      </ul>
    </div>
  );
};

export default OnboardSidebar;
