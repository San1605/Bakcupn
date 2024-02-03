import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap"
import React, { useEffect, useState } from 'react';
import Upload from "../../assets/Upload.svg";
import './UploadModal.css';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import axios from 'axios';

const UploadModal = (props) => {
  const [uploadFile, setUploadFile] = useState([])
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    minSize: 0,
    maxFiles: 1,
    maxSize: 5242880,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        // props.setUploadFileData(acceptedFiles[0]);
      }
    },
  });
  useEffect(() => {
    // console.log(acceptedFiles, 'acccccccc')
    if (acceptedFiles.length > 0) {
      setUploadFile(acceptedFiles)
    }
  }, [acceptedFiles]);

  const uploadFiles = async (file) => {
    // console.log(file, "inside file uplaod")
    if (file === null) {
      toast.error("please upload file")
      return
    }
    const toastId = toast.loading("please wait..")
    try {
      const formData = new FormData();
      if (file) {
        formData.append("pdf_file", file);
      }
      const requestConfig = {
        url: "https://0c42-14-194-5-34.ngrok-free.app/upload_file",
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
      const response = await axios(requestConfig);
      if (response.status === 200) {
        // console.log(response.data?.pdf_code, "response upload file");
        // checl reposne is  not empty here
        props.settextvalue(response.data?.pdf_code);
      }
      else {
        toast.error("Something went wrong.");
      }
    }
    catch (error) {
      toast.error("Something went wrong.");
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
        <div className='textModalHeading'>Upload Files</div>
        <CloseButton
          style={{ fontSize: "14px" }}
          onClick={() => props.onHide()}
        />
      </Modal.Header>
      <div className="line"></div>
      <Modal.Body className='mx-3'>

        <div {...getRootProps({ className: 'dropzone' })} className='body-div'>
          <input {...getInputProps()} />
          <img src={Upload} alt='' />
          <div className='mt-3 d-flex align-items-center justify-content-center' style={{ fontSize: '14px', fontWeight: '600' }}>Drag & drop files or<a className='forgot-password browse ps-1'> Browse</a></div>
          <p className='format mt-2'>Supported formates: PDF</p>
        </div>
        {
          uploadFile?.length > 0 && (
            <div className='uploadFileName'>{acceptedFiles[0]?.path}</div>
          )
        }
        <div><button onClick={() => {
          if (acceptedFiles.length > 0) {
            uploadFiles(acceptedFiles[0])
          }
          setUploadFile([])
          props.onHide()
        }} className='submit mt-3'>Submit</button></div>
      </Modal.Body>
    </Modal>
  )
}
export default UploadModal