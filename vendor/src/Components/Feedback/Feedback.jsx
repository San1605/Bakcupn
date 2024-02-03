import React from 'react'
import star from "../../assets/Star.png"
import "./Feedback.css"

const Feedback = ({isResp,tickets,setState,state}) => {
  
    
    function getFormattedDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day < 10 ? "0" : ""}${day}-${month < 10 ? "0" : ""
            }${month}-${year}`;
    }

    return (
        <div className='feedback'>
            <div className='mt-[1rem]'>
                <button onClick={() => setState("lunch")} className={'border-b-[4px] w-[11rem] h-[2.375rem] text-[18px] lunchButton' + (state === "lunch" ? ' border-[#5B5FC7] text-[#5B5FC7]' : ' border-[linear-gradient(180deg, #EBEBEB 0%, rgba(160, 160, 160, 0) 100%)] text-black')} >Lunch </button>
                <button onClick={() => setState("dinner")} className={'border-b-[4px] w-[11rem] h-[2.375rem] text-[18px] dinnerButton' + (state === "lunch" ? ' border-[linear-gradient(180deg, #EBEBEB 0%, rgba(160, 160, 160, 0) 100%)] text-black' : ' border-[#5B5FC7] text-[#5B5FC7]')}>Dinner</button>
            </div>
            <table >
                <thead className='border-b-[1px] headerTable'>
                    <tr >
                        <th className=' w-[12vw] h-[2.75rem] text-center font-[400] text-[13px] '>HRM ID</th>
                        <th className='text-start  w-[12vw] h-[2.75rem] font-[400] text-[13px] '>Ratings</th>
                        <th className='text-start  w-[12vw] h-[2.75rem] font-[400] text-[13px]'>Date</th>
                        <th className='text-start  w-[12vw] h-[2.75rem] font-[400] text-[13px]'>Descriptions</th>

                    </tr>
                </thead>
            </table>


            <div className='max-h-[24rem] overflow-y-scroll no-scrollbar'>
                <table>
                    <tbody className=' max-h-[20rem] overflow-y-scroll'>
                        {
                            tickets.map((ticket, index) => 
                             (
                                isResp ?  (
                                    <tr className='border-b-[1px] `tableRow flex flex-row justify-between`' key={ticket.HRMID}>
                                        <div className='flex flex-col'>
                                        <td className='text-start w-[10.563rem] h-[2rem] font-[400] text-[14px]'>{ticket.Description || "good taste"}</td>
                                        <td className='w-[10.563rem] h-[2rem] font-[400] text-[14px]'>{ticket.HRMID}</td>
                                        </div>
                                        <td className='flex items-center justify-center w-[8rem] h-[4rem] font-[400] text-center text-[14px]'>{getFormattedDate(ticket.Date)}</td>
                                        <td className='text-start w-[3rem] h-[4rem] flex flex-row items-center font-[400] text-[14px]'>
                                            <span>{ticket.Rating}</span>
                                            <img className='h-[18px] w-[18px] font-[400] text-[14px]' src={star} alt="" />
                                        </td>
                                    </tr>
                                ) :
                                     (

                                        <tr className='border-b-[1px] `tableRow`' key={ticket.HRMID}>
                                            <td className='w-[12vw] h-[2.75rem] text-center font-[400] text-[14px]'>{ticket.HRMID}</td>
                                            <td className='text-start  w-[11.6vw] h-[2.75rem] flex flex-row items-center font-[400] text-[14px]'>
                                                <span>{ticket.Rating}</span>
                                                <img className='h-[18px] w-[18px] font-[400] text-[14px]' src={star} alt="" />
                                            </td>
                                            <td className='text-start w-[12vw] h-[2.75rem] font-[400] text-[14px]'>{getFormattedDate(ticket.Date)}</td>
                                            <td className='text-start w-[12vw] h-[2.75rem] font-[400] text-[14px]'>{ticket.Description || "good taste"}</td>
                                        </tr>
                                    )
                             )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default Feedback
