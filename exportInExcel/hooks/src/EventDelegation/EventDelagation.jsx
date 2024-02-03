import React from 'react';

const EventDelegation = () => {
    const handleClick = (e) => {
        if (e.target.tagName === 'BUTTON') {
            console.log(e.target.innerText, "clicked");
        }
    };
    

    return (
        <div className='border border-black flex flex-col' onClick={handleClick}>
            <button className='border border-black'>Button 1</button>
            <button className='border border-black'>Button 2</button>
            <button className='border border-black'>Button 3</button>
            <button className='border border-black'>Button 4</button>
        </div>
    );
};
export default EventDelegation