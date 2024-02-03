import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./UnLockModal.css"
import CloseButton from 'react-bootstrap/esm/CloseButton';
import toast from 'react-hot-toast';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { unLockIcon } from '../../Assets/mentorIcons';

function UnLockModal({ show, setShow , getApi,week,courseId}) {

    const { unlockWeekMentor } = useContext(GlobalContext)
    const handleClose = () => setShow(false);
    const handleSubmit = async () => {
        try {
            const res = await unlockWeekMentorApi(week,courseId) 
        }
        catch (error) {
            toast.dismiss()
            toast.error("Something went wrong")
        }
    }

    async function unlockWeekMentorApi(week,courseId)  {
        const toastId = toast.loading("Please Wait")
        try {
            const res = await unlockWeekMentor(week,courseId) ;
            toast.dismiss(toastId);
            toast.success("Sucessfully Unlocked");
            // call api here 
            getApi(courseId)
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }
        finally{
            setShow(false)
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='addLearningPath'
        >
            <Modal.Header >
                <div>Week 01 Status</div>
                <CloseButton
                    variant='white'
                    style={{ fontSize: "14px", fontWeight: "500" }}
                    onClick={handleClose}
                />
            </Modal.Header>
            <Modal.Body>
                <div className='AddLPForm'>
                    <div className="deleteText" style={{
                        fontSize:"17px"
                    }}>
                        Are you sure, you want to Unlock Week 01 ?
                    </div> 
                    <div className='footerDeleteUnLock'>
                        <button onClick={handleSubmit}>
                            <span>Unlock</span>
                            <img src={unLockIcon} alt=''/>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal >
    );
}

export default UnLockModal;