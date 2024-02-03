import React from 'react'

const EventBubbling = () => {

    return (
        <div className='border border-black bg-red-500 h-[15rem] w-[15rem] text-white flex justify-center items-center' onClick={() => console.log("div Clicked")} >
            <span className='border border-black bg-blue-500 h-[10rem] w-[10rem] text-white flex  justify-center items-center' onClick={() => console.log("span Clicked")} >
                <button className='border border-black bg-green-500 h-[5rem] w-[5rem] text-white flex justify-center items-center' onClick={(e) => {
                    // e.stopPropagation()
                    console.log("button Clicked")
                }}>
                    Click Me !!!
                </button>
            </span>
        </div>
    )
}
export default EventBubbling