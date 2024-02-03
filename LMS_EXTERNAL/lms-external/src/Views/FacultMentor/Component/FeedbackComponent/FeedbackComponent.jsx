import React, { useContext, useEffect, useState } from 'react'
import "./FeedbackComponent.css"
import FeedbackRateCard from '../FeedbackRateCard/FeedbackRateCard'
import { email } from '../../../../Assets/globalIcons'
import { GlobalContext } from '../../../../Context/GlobalContext'
import toast from 'react-hot-toast'
const FeedbackComponent = ({ selectedStudent }) => {
    const { submitFeeback } = useContext(GlobalContext)
    const [overAllPerformance, setOverAllPerformance] = useState(0);
    const [values, setValues] = useState({
        studentEmailId: "",
        month: "",
        year: 1900,
        communicationScore: 0,
        technicalScore: 0,
        punctualityStatus: 0,
        learningAdaptability: 0,
        overallPerformance: 0,
        feedback: "",
        isMail: 0
    });

    useEffect(() => {
        if (selectedStudent?.email?.length > 0) {
            setValues((prev) => {
                return {
                    ...prev,
                    studentEmailId: selectedStudent?.email
                }
            })
        }
    }, [selectedStudent])

    const submitFeedbackApi = async (values) => {
        const toastId = toast.loading("PLease wait ")
        try {
            const res = await submitFeeback(values);
            console.log(res, "res")
            toast.dismiss(toastId);
            toast.success("Successfully added");
        }
        catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }
    }

    console.log(values, "values")

    return (
        <div className='FacultyMentorFeedbackComponent'>
            <div className='FacultyMentorFeedbackComponentHeading'>
                {selectedStudent?.name || "Students's name"}
            </div>
            <div className='FacultyMentorFeedbackComponentMain'>


                <div className='FacultyMentorFeedbackComponentDiv' >
                    <div className="studentFeedbackTimeDiv">
                        <select onChange={(e) => {
                            setValues((prev) => {
                                return {
                                    ...prev,
                                    year: e.target.value
                                }
                            })
                        }}>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                        </select>
                        <div className="studentFeedbackMonths">
                            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]?.map((item, index) => (
                                <div className={`${item === values?.month && "selectedMonth"}`} onClick={() => {
                                    setValues((prev) => {
                                        return {
                                            ...prev,
                                            month: item
                                        }
                                    })
                                }} key={index}>{item}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='FeedbackScoreDiv'>
                    {
                        [
                            { text: "Rate communication score", value: "communicationScore" },
                            { text: "Rate technical score", value: "technicalScore" },
                            { text: "Punctuality Status", value: "punctualityStatus" },
                            { text: "Rate Learning Adaptability", value: "learningAdaptability" }]?.map((item, index) => (
                                <FeedbackRateCard item={item} values={values} setValues={setValues} />
                            ))
                    }
                </div>
                <div className="feedbackPerformance">
                    <div className='feedbackPerformanceHeading'>Overall Performance</div>
                    <div className='feedbackPerformanceRadioButtons'>

                        <div className='PerformanceRadioButtonDiv'>
                            <input type="radio" name="" id="" />
                            <label>Excellent</label>
                        </div>
                        <div className='PerformanceRadioButtonDiv'>
                            <input type="radio" name="" id="" />
                            <label>Good</label>
                        </div>
                        <div className='PerformanceRadioButtonDiv'>
                            <input type="radio" name="" id="" />
                            <label>Above Average</label>
                        </div>
                        <div className='PerformanceRadioButtonDiv'>
                            <input type="radio" name="" id="" />
                            <label>Poor</label>
                        </div>
                    </div>
                </div>
                <div className="feedbacktextArea">
                    <textarea placeholder='Give a feedback' onChange={(e) => {
                        setValues((prev) => {
                            return {
                                ...prev,
                                feedback: e.target.value
                            }
                        })
                    }} />
                </div>
                <div className="studentFeedbackFooter">
                    <div className='submitFeedback'>
                        <span>Submit Feedback</span></div>
                    <div className='sendViaMail'>
                        <span>Send Via Mail</span>
                        <img src={email} alt='' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedbackComponent
