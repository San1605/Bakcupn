import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./CourseDetailModal.css"
import toast from 'react-hot-toast'
import CloseButton from 'react-bootstrap/esm/CloseButton';
import { GlobalContext } from '../../../../Context/GlobalContext'
function CourseDetailModal({ show, setShow, courseName,runningStatus,collegeId,getCoursesDetailApi}) {
    const { changeCourseStatus } = useContext(GlobalContext)
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState(-1);


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (startDate?.length > 0 && endDate?.length > 0 && status?.length > 0 && courseName?.length>0 && collegeId?.length>0) {
            await changeCourseStatusApi(startDate, endDate, status,courseName,collegeId)
        }
        else {
            toast.dismiss()
            toast.error("Please Complete all the fields")
        }


    }
    const handleClose = () => setShow(false);

    async function changeCourseStatusApi(startDate, endDate, status,courseName,collegeId) {
        const toastId = toast.loading("Please wait we are changing status...")
        try {
            const res = await changeCourseStatus(startDate, endDate, status,courseName,collegeId);
            toast.dismiss(toastId);
            toast.success("Sucessfully changed");
            setShow(false)
            getCoursesDetailApi(collegeId)

        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }
        setStartDate("")
        setEndDate("")
        setStatus("")
    }


    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='courseDetail'
        >

            <Modal.Header >
                <div>Course Status</div>
                <CloseButton
                    variant='white'
                    style={{ fontSize: "14px", fontWeight: "500" }}
                    onClick={handleClose}
                />
            </Modal.Header>
            <Modal.Body>
                <div className='statusNameDiv'>

                    <div className='CourseNameDiv'>
                        <span>Course Name</span>
                        <span>{courseName}</span>
                    </div>
                    <div className='CourseStatusDiv'>
                        <span>Current Status</span>
                        <span style={{ color: runningStatus === "Paused" ? "#DD962D" : "#4E8A54" }}>{runningStatus}</span>
                    </div>
                </div>
                <div className='pauseCourse'>Do you want to Pause or Resume Course ?</div>


                <form className='courseStatusForm'>
                    <div className='startEndDateDiv'>

                        <div className='startEndDateDivChild'>
                            <label>Start Date<span>*</span></label>
                            <input type='date'
                                value={startDate}
                                required
                                onChange={((e) => setStartDate(e.target.value))} />

                        </div>
                        <div className='startEndDateDivChild'>
                            <label>End Date<span>*</span></label>
                            <input
                                type='date'
                                value={endDate}
                                required
                                onChange={((e) => setEndDate(e.target.value))} />

                        </div>
                    </div>
                    <div className='courseStatusFormDiv'>
                        <label>Change Status</label>
                        <select value={status} name="" id="" onChange={(e) => setStatus(e.target.value)} required>
                            <option hidden value={-1}>Select Status</option>
                            <option value={0}>Paused</option>
                            <option value={1}>Active</option>
                        </select>
                    </div>

                    <div className='footer'>
                        <button onClick={handleClose}>
                            Cancel
                        </button>
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}
export default CourseDetailModal;