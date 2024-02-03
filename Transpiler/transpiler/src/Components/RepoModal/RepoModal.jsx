import Modal from 'react-bootstrap/Modal';
import React, {useState } from 'react';
import './RepoModal.css';
import isUrl from 'is-url';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import toast from 'react-hot-toast';
import axios from 'axios';

const RepoModal = (props) => {
    const [inputLink, setInputLink] = useState("");
    
    const getDataofRepo = async (repoLink) => {
        if (repoLink === '') {
            toast.error("Please enter a valid url")
            return
        };

        const toastId = toast.loading("Please wait...")
        
        try {
            const requestConfig = {
                url: "https://0c42-14-194-5-34.ngrok-free.app/repo_link",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                  },
                data:JSON.stringify({raw_file_link :repoLink})
            }
            const response = await axios(requestConfig);
            if (response.status === 200) {
                if(response.data!=='Invalid link'){
                    props.settextvalue(response.data?.repo_code)
                    // console.log(response.data?.repo_code,"dataresponse")
                }
                else{
                   toast.error(response.data)
                }
            }
            else {
                toast.error("Something went wrong")
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
        finally {
            toast.dismiss(toastId)
        }
    }


    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='uploader'
        >
            <Modal.Header className='position-relative'>
                <div className='textModalHeading'>Repo Link</div>
                <CloseButton
                    style={{ fontSize: "14px" }}
                    onClick={() => props.onHide()}
                />
            </Modal.Header>
            <div className="line"></div>
            <Modal.Body className='mx-3'>
                <>
                    <div className='body-div1'>
                        <div className='mt-2 d-flex align-items-center justify-content-center' style={{ fontSize: '14px', fontWeight: '600' }}>Paste URL Here</div>
                        <input type='text' placeholder='paste url here' className='repo-input mt-3' onChange={(e) => setInputLink(e.target.value)} />
                    </div>
                    <div><button onClick={() => {
                        if (inputLink !== '') {
                            getDataofRepo(inputLink)
                            props.onHide()
                        }
                        else {
                            toast.error("please enter valid url")
                        }
                    }} className='submit mt-3'>Submit</button></div>
                </>
            </Modal.Body>
        </Modal>
    )
}
export default RepoModal