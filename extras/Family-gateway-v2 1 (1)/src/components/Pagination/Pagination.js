import React from 'react'
import './Pagination.css';
import LeftArrow from './img/left-arrow.svg';
import LeftArrow2 from './img/left-arrow-2.svg'
import RightArrow from './img/right-arrow.svg'
import RightArrow2 from './img/right-arrow-2.svg'


const Pagination = ({ pageCount, currentPage, setCurrentPage }) => {
    
    const changePage = (type) => {
        if (type === 1) {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
            }
        } else if (type === 2) {
            setCurrentPage(1);
        } else if (type === 3) {
            if (currentPage < pageCount) {
                setCurrentPage(currentPage + 1)
            }
        } else if (type === 4) {
            setCurrentPage(pageCount)
        }
    }

    const changePageFromInput = (page) => {
        if(page < pageCount + 1){
            if(parseInt(page) === 0){
                setCurrentPage(1)
            } else {
                setCurrentPage(page)
            }
        }
    }

    return (
        <div className='pagination'>
            <div className='item img2' onClick={() => changePage(2)}><img src={LeftArrow2} alt="LeftArrow2" /></div>
            <div className='item img1' onClick={() => changePage(1)}><img src={LeftArrow} alt="LeftArrow" /></div>
            <div className='item input-item'>Page <input value={currentPage} pattern="^[0-9\b]+$" onChange={(e) => changePageFromInput(e.target.value)} name="currentPage" type="text" /></div>
            <div className='item input-item'>of {pageCount}</div>
            <div className='item img1' onClick={() => changePage(3)}><img src={RightArrow} alt="RightArrow" /></div>
            <div className='item img2' onClick={() => changePage(4)}><img src={RightArrow2} alt="RightArrow2" /></div>
        </div>
    )
}

export default Pagination