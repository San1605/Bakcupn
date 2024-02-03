import React from 'react'
import "./SearchBox.css"
import { searchIcon } from '../../Assets/globalIcons'
const SearchBox = ({ placeholder, searchQuery, setSearchQuery }) => {
  return (
    <div className="SearchBox">
      <input
        type='text'
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <img src={searchIcon} alt='listViewIcon' />
    </div>
  )
}

export default SearchBox
