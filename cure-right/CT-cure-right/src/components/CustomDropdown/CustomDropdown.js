import React, { useRef } from "react";
import Loader from "../Loader/Loader";
import HandleClickOutside from "../../utils/helpers/HandleOutsideClick";
import ARROW_DOWN from "../../assets/icons/arrowdown.svg";
import "./CustomDropdown.css";

const CustomDropdown = ({
  className,
  value,
  options,
  showOptions,
  setShowOptions,
  onClick,
  name,
}) => {
  let ref = useRef();

  HandleClickOutside(ref, () => {
    setShowOptions(false);
  });

  return (
    <div
      name="courseselect"
      id="select-course"
      className={`${className} dropdown-select position-relative uni-border`}
      ref={ref}
    >
      <div className="cure-select" onClick={() => setShowOptions(!showOptions)}>
        <div>{value || "Select"}</div>
        <img src={ARROW_DOWN} alt="" />
      </div>
      <div className="position-absolute absolute-options">
        <div>
          {showOptions === true && (
            <>
              {options !== null ? (
                <>
                  {options.length !== 0 ? (
                    options?.map((elem, index) => {
                      return (
                        <div
                          key={index}
                          className=" selectOptionsItem d-flex align-items-center"
                          onClick={() => {
                            setShowOptions(!showOptions);
                            onClick(name, elem);
                          }}
                        >
                          <p className="ps-2 m-0 w-100">{elem}</p>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className=" selectOptionsItem d-flex align-items-center"
                      onClick={() => {
                        setShowOptions(!showOptions);
                      }}
                    >
                      <p className="ps-2 m-0 w-100">No Options Available</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div
                    className=" selectOptionsItem d-flex align-items-center"
                    onClick={() => {
                      setShowOptions(!showOptions);
                    }}
                  >
                    <p className="ps-2 m-0 w-100">
                      <Loader />
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomDropdown;
