import React, { useEffect, useState } from 'react'
import "./FilterComponent.css"
import { RightArrow } from "../../Views/Admin/Assets/adminIcons";
import { searchIcon } from '../../Assets/globalIcons';

const FilterComponent = ({ filterList, showFilter, setShowFilter, selectFilter, setSelectFilter, getCelebalMentorsApi }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState(Object.keys(filterList)[0]);
  const [filterStates, setFilterStates] = useState({});

  const handleClearAll = () => {
    setFilterStates({});
    setSelectFilter({});
  }

  const handleClose = () => {
    setShowFilter(false);
  }
  const handleSubmit = () => {
    setShowFilter(false)
    getCelebalMentorsApi(selectFilter)
  }
  const handleSearch = (list, input) => {
    // return []
    return list.filter(item =>
      item?.text.toLowerCase().includes(input?.toLowerCase())
    );
  };

  const handleSelectAll = () => {
    setFilterStates((prevStates) => {
      const currentState = prevStates[selectedFilter];
      const allChecked = currentState.checkBoxList.every((value) => value);
      const updatedValues = currentState.checkBoxList.map(() => !allChecked);

      if (allChecked) {
        currentState.filtersSelected = [];
      } else {
        currentState.filtersSelected = currentState.filteredArray.map((item) => item.text);
      }

      return {
        ...prevStates,
        [selectedFilter]: {
          ...currentState,
          checkBoxList: updatedValues,
        },
      };
    });
  };


  const handleCheckboxChange = (item, index) => {
    setFilterStates((prevStates) => {
      const currentState = prevStates[selectedFilter];
      const updatedList = [...currentState.checkBoxList];
      updatedList[index] = !updatedList[index];

      if (updatedList[index]) {
        currentState.filtersSelected = [...currentState?.filtersSelected, item];
      } else {
        currentState.filtersSelected = currentState?.filtersSelected.filter((ele) => ele !== item);
      }

      return {
        ...prevStates,
        [selectedFilter]: {
          ...currentState,
          checkBoxList: updatedList,
        },
      };
    });
  };


  console.log(selectedFilter, "selectedFilter");
  console.log(filterStates, "filterStates")
  console.log(filterList, "filterList")


  useEffect(() => {
    if (!filterStates[selectedFilter]) {

      const arr = { ...selectFilter }
      const updatedCheckBoxList = Array.from({ length: filterList[selectedFilter]?.length || 0 }).fill(false);
      arr[selectedFilter]?.forEach((selectedItem) => {
        const index = filterList[selectedFilter]?.findIndex((item) => item.text === selectedItem);
        if (index !== -1) {
          updatedCheckBoxList[index] = true;
        }
      });

      setFilterStates((prev) => ({
        ...prev,
        [selectedFilter]: {
          filteredArray: filterList[selectedFilter] || [],
          checkBoxList: updatedCheckBoxList,
          filtersSelected: selectFilter[selectedFilter]
        }
      }))
    }
  }, [filterList, selectedFilter, selectFilter])


  useEffect(() => {
    if (filterList[selectedFilter]?.length > 0) {
      const arr = handleSearch(filterList[selectedFilter], searchQuery);
      setFilterStates((prev) => ({
        ...prev,
        [selectedFilter]: {
          ...prev[selectedFilter],
          filteredArray: arr
        }
      }))
    }
  }, [searchQuery])


  useEffect(() => {
    const arr = { ...selectFilter };
    arr[selectedFilter] = filterStates[selectedFilter]?.filtersSelected || [];
    setSelectFilter(arr);
  }, [filterStates[selectedFilter]?.filtersSelected, selectedFilter]);



  return (
    <div className='filterComponent'>
      <div className="filterComponentHeader">
        <div className='filterComponentHeaderDiv'>
          <div>Filters</div>
          <button onClick={handleClearAll}>Clear Filters</button>
        </div>
        <div>Please select from the below available filters</div>
      </div>
      <div className='filterComponentBody'>
        <div className="filterComponentBodyLeft">
          {
            Object.keys(filterList)?.map((item, index) => (
              <div onClick={() => setSelectedFilter(item)} className={`filterCard ${selectedFilter === item && "filterCardSelected"}`} key={index}>
                {item==='colleges'?"College":item}
                {selectedFilter === item && <img src={RightArrow} alt='' />}
              </div>
            ))
          }
        </div>

        <div className="filterComponentBodyRight">

          <div className="SearchBoxFilter">
            <input
              type='text'
              placeholder={"Search Filters"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src={searchIcon} alt='listViewIcon' />
          </div>


          <div className='filterListElement' style={{
            borderBottom: "1px solid #C6C6C6"
          }}>
            <input
              type="checkbox"
              checked={filterStates[selectedFilter]?.checkBoxList.every((item) => item)}
              onChange={() => handleSelectAll()}
            />
            <label>Select All</label>
          </div>
          <div className="checkBoxListFilters">
            {
              filterStates[selectedFilter]?.filteredArray?.map((item, index) => (
                <div className='filterListElement' key={index}>
                  <input
                    type="checkbox"
                    name={item.text}
                    id={item.text}
                    checked={filterStates[selectedFilter]?.checkBoxList[index]}
                    onChange={() => handleCheckboxChange(item.text, index)}
                  />
                  <label>{item?.text}</label>
                </div>
              ))
            }
          </div>
        </div>

      </div>
      <div className="filterComponentFooter">
        <button onClick={handleClose}>
          Cancel
        </button>
        <button onClick={handleSubmit}>
          Apply
        </button>
      </div>
    </div>
  )
}

export default FilterComponent