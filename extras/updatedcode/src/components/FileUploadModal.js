import React, { useEffect, useState } from 'react';
import '../assets/css/fileupload-modal.css';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Row, Col, Button, Form } from 'react-bootstrap';
import UplpadIcon from '../assets/images/fileupload-logo.svg'
import VideoIcon from '../assets/images/videos.svg';
import DocIcon from '../assets/images/docs.svg';
import { apiUrl } from '../api';
import axios from 'axios';

const FileUploadModal = ({ ...props }) => {
    const maxSize = 235929600;
    const [fileList, setFileList] = useState([]);
    const [uploadBy, setUploadBy] = useState();
    const [uploadOn, setUploadOn] = useState();
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        minSize: 0,
        maxSize,
    });

    useEffect(() => {
        if (props.show === false) {
            setFileList([]);
        }
    }, [props.show])
    useEffect(() => {
        if (fileRejections[0]) {
            if (fileRejections[0].errors) {
                toast.error(fileRejections[0].errors[0].message);
            }
        }
    }, [fileRejections])

    useEffect(() => {
        setFileList(acceptedFiles);
    }, [acceptedFiles])

    const removeFilesItem = (fileItem) => {
        setFileList(fileList.filter(item => item.path !== fileItem));
    }

    function isAudioType(s) {
        var audioTypes = [".mp3", ".wav"],
            audioExt = s.replace(/^.+(?=\.)/i, '');
        return (audioTypes.indexOf(audioExt.toLowerCase()) > -1);
    }

    const fileUploadSubmit = () => {
        if (!uploadBy) {
            toast.error("Upload by is required.");
        } else if (!uploadOn) {
            toast.error("Upload on is required.");
        }else {
            const toastId = toast.loading("File uploading....");
            var data = new FormData();
            data.append('filename', fileList[0]);
            data.append('postedon', uploadOn);
            data.append('postedby', uploadBy);

            var config = {
                method: 'post',
                url: `${apiUrl}/uploader`,
                data: data
            };

            axios(config)
                .then(function (response) {
                    toast.dismiss(toastId)
                    if(response.status === 200){
                        toast.success("File uploaded successfully.")
                    } else {
                        toast.error("Something went wrong.")
                    }
                    const timer = setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                      return () => clearTimeout(timer);
                })
                .catch(function (error) {
                    toast.dismiss(toastId)
                    toast.error("Something went wrong.")
                    console.log(error);
                });
        }
    }

    const acceptedFileItems = fileList.map(file => (
        <div key={file.path} className="mt-1 file-list">
            <Row>
                <Col md={2} className="text-left">
                    {
                        isAudioType(file.path) ?
                            <img
                                src={VideoIcon}
                                alt="docicon"
                                width="20px"
                            />
                            :
                            <img
                                src={DocIcon}
                                alt="docicon"
                                width="25px"
                            />
                    }
                </Col>
                <Col md={8}><p className='filespathtxt'>{file.path}</p></Col>
                <Col md={2}><div className="removeFile" onClick={() => removeFilesItem(file.path)}>X</div></Col>
            </Row>
        </div>
    ));

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='upload-filemodal'
            >
                <Modal.Body>
                    <h4 className='upload-text-t'>Upload File</h4>
                    <div className='modal-dropzone'>
                        {fileList.length === 0 ?
                            <div className='fileupload'>
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <img src={UplpadIcon} alt="UplpadIcon" />
                                    <h6>Drag & Drop your files here!</h6>
                                    <button className='choose-file-btn'>Choose File</button>
                                    <p>Max. 1 File <br></br> Max. Size 150MB</p>
                                </div>
                            </div>
                            :
                            <div>
                                <div className='uploadfilesList'>{acceptedFileItems}</div>
                                <Row className='mb-4'>
                                    <Col xs={12} md={6}>
                                        <Form.Group className='file-dinput' controlId="exampleForm.ControlInput1">
                                            <Form.Label>Upload By</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Upload By" onChange={(e) => setUploadBy(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className='file-dinput' controlId="exampleForm.ControlInpu21">
                                            <Form.Label>Upload On</Form.Label>
                                            <Form.Control type="date" placeholder="Upload On" onChange={(e) => setUploadOn(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button className='upload-submitBtn' onClick={() => fileUploadSubmit()}>Submit</Button>
                            </div>
                        }
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default FileUploadModal