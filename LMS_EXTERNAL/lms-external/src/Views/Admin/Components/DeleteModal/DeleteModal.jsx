import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./DeleteModal.css"
import CloseButton from 'react-bootstrap/esm/CloseButton';
import toast from 'react-hot-toast';
import { GlobalContext } from '../../../../Context/GlobalContext';
function DeleteModal({ show, setShow, roleId, userType, isCelebal, api, getCelebalMentorsApi, getCollegeMentorsApi }) {
    const { deleteRoles } = useContext(GlobalContext)
    const handleClose = () => setShow(false);

    const handleSubmit = async () => {
        try {
            const res = await deleteRolesApi(roleId, isCelebal)
        }
        catch (error) {
            toast.dismiss()
            toast.error("Something went wrong")
        }

    }

    async function deleteRolesApi(roleId, isCelebal) {
        const toastId = toast.loading("Please Wait")
        try {
            const res = await deleteRoles(roleId, isCelebal);
            toast.dismiss(toastId);
            toast.success("Sucessfully deleted");
            setShow(false)
            if (isCelebal) {
                getCelebalMentorsApi()
            }
            else {
                getCollegeMentorsApi()
            }


        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }
    }

    async function deleteApiLp(roleId, isCelebal) {
        const toastId = toast.loading("Please Wait")
        try {
            const res = await deleteRoles(roleId, isCelebal);
            toast.dismiss(toastId);
            toast.success("Sucessfully deleted");
            setShow(false)
            if (isCelebal) {
                getCelebalMentorsApi()
            }
            else {
                getCollegeMentorsApi()
            }


        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
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
                <div>Delete Admin</div>
                <CloseButton
                    variant='white'
                    style={{ fontSize: "14px", fontWeight: "500" }}
                    onClick={handleClose}
                />
            </Modal.Header>
            <Modal.Body>
                <div className='AddLPForm'>
                    <div className="deleteText">
                        Are you sure, you want to delete  {userType}?
                    </div>
                    <div className='footerDelete'>
                        <button onClick={handleClose}>
                            Cancel
                        </button>
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal >
    );
}

export default DeleteModal;