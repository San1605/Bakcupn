import React, { useEffect, useState } from 'react'

const DebThrott = () => {
  const [searchResult, setSearchResult] = useState([]);


  const getSearch = (value) => {
   console.log(value,'value')
  }

  const handleSearch = (...args) => {
    const value = args[0].target.value;
    getSearch(value);
  }


  
  
  const debounceFunc = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        // func.apply(context, args)
        // func(...args)
      }, delay)
    }
  }
  
  const handleSearchDebounce = debounceFunc(handleSearch, 200);
  return (
    <div>
      <input type="search"
      className='border border-black'
        //  onChange={handleSearch}
        onChange={handleSearchDebounce}
      />


    </div>
  )
}

export default DebThrott
