import React from 'react'
import ArrowIcon from "../../assets/ArrowIcon.png"

const FoodCard = ({location,lunchCount,dinnerCount,color}) => {
    return (
        <div className='w-[18.875rem] h-[5.35rem] border border-[#EBEBEB] flex flex-row rounded-xl items-center foodCardResp'>
            <div className={`flex flex-row w-[42%] items-center justify-center ${color} h-[100%] p-2 rounded-l-xl`}>
                <span className=" w-[100%] text-center font-400] text-[14px] text-[#232323]  ">{location || "total"}</span>
                <span className=" w-[100%] text-center font-[500] text-[16px] text-[#232323] "> {lunchCount+dinnerCount || 0} </span>
            </div>

            <div className="flex flex-col w-[58%] h-[100%] ">
                <div className=" flex flex-row h-[50%] items-center">
                    <span className=" w-[50%]  text-center  font-400] text-[16px] text-[#232323] ">Lunch</span>
                    <span className="w-[25%]  text-center font-[500] text-[16px] text-[#232323]  ">{lunchCount || 0}</span>
                    <span className='w-[25%]'> 
                    <img className='ml-3' src={ArrowIcon} alt="" />  </span> 
                </div>
                <div className=" flex flex-row h-[50%] items-center justify-end">
                    <span className=" w-[50%]  text-center font-400] text-[16 px] text-[#232323]  ">Dinner</span>
                    <span className="w-[25%]  text-center font-[500] text-[16px] text-[#232323] ">{dinnerCount || 0}</span>
                    <span className='w-[25%]'> 
                    <img className='ml-3' src={ArrowIcon} alt="" />  </span> 
                </div>
            </div>
        </div>
    )
}

export default FoodCard
