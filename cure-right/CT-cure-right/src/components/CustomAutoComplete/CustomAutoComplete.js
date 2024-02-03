import React, { useState, useRef, useEffect } from "react";
import ARROW_DOWN from "../../assets/icons/arrowdown.svg";
import HandleClickOutside from "../../utils/helpers/HandleOutsideClick";
import "./CustomAutoComplete.css"; // Rename your CSS file if needed

const CustomAutoComplete = ({ className, value, options, onClick, name }) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef();
  const selectedOptionRef = useRef(null);

  HandleClickOutside(ref, () => {
    setShowOptions(false);
  });

  const handleInputChange = (event) => {
    const input = event.target.value;
    setInputValue(input);

    if (input?.length === 0) {
      setFilteredOptions(options); // Show all options when input is empty
    } else {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredOptions(filtered);
    }

    setShowOptions(true);
    setSelectedOptionIndex(-1);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setShowOptions(false);
    onClick(name, option);
  };

  const onClickInput = (event) => {
    if (inputValue === "") {
      setFilteredOptions(options);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedOptionIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredOptions?.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedOptionIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (event.key === "Enter" && selectedOptionIndex !== -1) {
      event.preventDefault();
      handleOptionClick(filteredOptions[selectedOptionIndex]);
    }
  };

  useEffect(() => {
    if (selectedOptionIndex !== -1 && selectedOptionRef.current) {
      setInputValue(filteredOptions[selectedOptionIndex]);
      selectedOptionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedOptionIndex]);

  return (
    <div
      className={`${className} dropdown-select position-relative uni-border`}
      ref={ref}
    >
      <div className="cure-select p-0">
        <input
          type="text"
          value={inputValue}
          placeholder="Select"
          onChange={handleInputChange}
          onFocus={() => setShowOptions(true)}
          onKeyDown={handleKeyDown}
          className="w-100 border-0 ps-0 h-100 outline-none"
          onClick={onClickInput}
        />
        <img src={ARROW_DOWN} alt="" />
      </div>
      <div className="position-absolute absolute-options autocomplete-options">
        {showOptions && (
          <>
            {filteredOptions?.length > 0 ? (
              filteredOptions.map((elem, index) => (
                <div
                  key={index}
                  className={`selectOptionsItem d-flex align-items-center ${
                    selectedOptionIndex === index ? "selected-option" : ""
                  }`}
                  onClick={() => handleOptionClick(elem)}
                  ref={selectedOptionIndex === index ? selectedOptionRef : null}
                >
                  <p className="ps-2 m-0 w-100">{elem}</p>
                </div>
              ))
            ) : (
              <div className="selectOptionsItem d-flex align-items-center">
                <p className="ps-2 m-0 w-100">No Options Available</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomAutoComplete;