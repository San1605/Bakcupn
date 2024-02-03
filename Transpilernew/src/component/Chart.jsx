import React from 'react'

const Chart = ({ text, children }) => {
    return (
        <div className="h-full border border-[#E0E0E0] p-[15px] rounded-lg bg-white flex flex-col justify-between">
            <div className="flex  items-center justify-between">
                <span className={`text-md ${text === "Lines Of Code" && " pt-1"}`}>{text}</span>
                {text !== 'Lines Of Code' && <select className="border border-[#EAEAEA] rounded-md px-4  outline-none py-[6px] text-sm">
                    <option value="PySpark">PySpark</option>
                    <option value="Python">Python</option>
                    <option value="Javascript">Javascript</option>
                </select>}
            </div>
            <div className="h-[calc(100%_-_35px)]">
                {children}
            </div>
        </div>
    )
}

export default Chart
