import React, { useContext, useEffect, useState } from 'react';
import './uploaddoc.css';
import Header from '../../components/Header/Header';
import { Container } from 'react-bootstrap';
import BackIcon from '../../assets/images/icons/back-icon.svg';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import PdfFileIcon from  '../../assets/images/icons/PDF_file_icon.svg';
import { GlobalContext } from '../../context/GlobalState';

const UploadDoc = () => {
    const {navigate, uploadFileDoc} = useContext(GlobalContext);
    const [fileList, setFileList] = useState([]);
    const maxSize = 10485760;
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        accept: {'application/pdf': []},
        maxFiles: 1,
        minSize: 0,
        maxSize
    });

    useEffect(() => {
        if (fileRejections[0]) {
            if (fileRejections[0].errors) {
                toast.error(fileRejections[0].errors[0].message);
            }
        }
    }, [fileRejections])

    useEffect(() => {
        setFileList(acceptedFiles);
    }, [acceptedFiles]);

    return (
        <>
            <Header />
            <Container>
                <div className='upload-main-div'>
                    <div className='back-button' onClick={() => navigate("/home")}>
                        <img src={BackIcon} alt="BackIcon" />
                    </div>
                    <div className='upload-files'>
                        <h4 className='heading'>Upload Files</h4>
                        <section className="dropzone-container">
                            {
                                fileList.length > 0 ? 
                                <>
                                <img src={PdfFileIcon} alt="PdfFileIcon" className='pdf-file-icon' width="40px"/>
                                <h6 className='mt-3'>{fileList[0].path} </h6>
                                <div className='btns pt-3'>
                                    <button className='reset-btn' onClick={() => setFileList([])}>Reset</button>
                                    <button className='submit-btn' onClick={() => uploadFileDoc(fileList)}>Submit</button>
                                </div>
                                </>
                                :
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <input {...getInputProps()} />
                                        <h6>Drag & Drop your files here!</h6>
                                        <span>Or</span>
                                        <p className='browse-file'>Browse file in your device</p>
                                        <p className='limit-pdf'>File type pdf with a max. 10 MB</p>
                                    </div>
                            }
                        </section>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default UploadDoc;