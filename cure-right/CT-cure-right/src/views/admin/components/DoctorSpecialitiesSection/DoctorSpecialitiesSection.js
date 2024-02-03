import React, { useState } from "react";
import Chart from "react-apexcharts";
import CustomDropdown from "../../../../components/CustomDropdown/CustomDropdown";
import "./DoctorSpecialitiesSection.css";

const DoctorSpecialitiesSection = () => {
  const [showOptions, setShowOptions] = useState(false);
  const options = {
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        const percent = val / 1;
        return percent.toFixed(0);
      },
    },
    labels: [
      "Joint Pain",
      "Knee Fracture",
      "Ligament Damage",
      "Shoulder Dislocate",
      "Muscle Strains",
    ],
  };
  const series = [1, 2, 3, 4, 5];
  return (
    <div className="persona-list-right1 h-100">
      <div className="mb-2 d-flex gap-1 justify-content-between">
        <span className="pre-text pt-2 mx-1 text-nowrap">Specialist</span>
        <span className="">
          <CustomDropdown
            value={"Daily"}
            options={["1", "2", "3", "4"]}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
          />
        </span>
      </div>
      <div className="special_div1 mb-1 overflow-auto d-flex">
        <div className="apexchat mt-2">
          <Chart options={options} series={series} type="donut" width="350" />
        </div>
      </div>
    </div>
  );
};

export default DoctorSpecialitiesSection;
