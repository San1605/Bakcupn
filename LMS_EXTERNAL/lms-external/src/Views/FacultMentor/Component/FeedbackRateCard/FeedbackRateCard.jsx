import React from 'react'
import "./FeedbackRateCard.css"
const FeedbackRateCard = ({ item, values, setValues }) => {
    return (
        <div className='FeedbackRateCard'>
            <div>{item?.text}<span> *</span></div>
            <div className='FeedbackRateCardDiv'>
                {[1, 2, 3, 4, 5]?.map((ele, index) => (
                <div className={`${ele === values[item?.value] && "selectedRate"}`} onClick={() => {
                    const name = item?.value
                    console.log(values[item?.value])
                    setValues((prev) => {
                        return {
                            ...prev,
                            [name]: ele
                        }
                    })
                }} key={index}>{ele}</div>))}
            </div>
        </div>
    )
}
export default FeedbackRateCard