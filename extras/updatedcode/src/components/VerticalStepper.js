import React, { useState } from "react";
import "./VerticalStepper.css"; // Your custom CSS file

const steps = [
  { title: "Start", content: "" },
  { title: "2 min", content: "Waiting for Q" },
  { title: "4min", content: "Answered" },
  { title: "6min", content: "" },
  { title: "End", content: "" },
];

const VerticalStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (index) => {
    setActiveStep(parseInt(index));
  };

  return (
    <div className="d-flex pt-4 flex-column gap-4 max-w-[25%] min-w-[25%] justify-start ps-3 h-full overflow-y-auto overflow-x-hidden bg-[#F8F9F9]">
      {/* <div className="header">Control FLow</div> */}
      <div className="vertical-stepper">
        {steps.map((step, index) => (
          <div key={index} className="step-container">
            <div
              className={`step-title  ${activeStep >= index ? "actives" : ""}`}
            >
              <p className="px-2 m-0 flex justify-start items-start space-x-40 rounded-md bg-[white] h-fit">
                {step.title}
              </p>
            </div>
            <div className={`step`}>
              {index !== steps.length - 1 && (
                <div
                  className={`step-line ${activeStep > index ? "activelines" : ""
                    }`}
                />
              )}
              <div
                className={`step-dot ${activeStep >= index ? "activedot" : ""}`}
                onClick={() => handleStepChange(index)}
              />
              <div className="step-content">
                <div
                  className={`step-description ${activeStep === index ? "actives" : ""
                    }`}
                >
                  <p className="px-2 m-0 flex justify-start items-start space-x-40"> {step.content}</p>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalStepper;
