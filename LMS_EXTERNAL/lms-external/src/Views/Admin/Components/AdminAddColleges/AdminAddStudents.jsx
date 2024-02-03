import "./AdminAddColleges.css";
import React, { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { cross, downloadIcon, uploadDoc, uploadStudents } from "../../Assets/adminIcons";
import { addStudentSchema } from '../../../../Utils/Schema';
import { useDropzone } from "react-dropzone";
import sampleDocument from "../../Assets/Files/Student_Template.xlsx"
import { decrypt } from "../../../../Utils/encryptDecrypt";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';

function AdminAddStudents({ show, setShow, type, getApi, CollegeId }) {
    const { addStudent, totalDomains, uploadStudentData } = useContext(GlobalContext);
    const [uploadFile, setUploadFile] = useState({});
    // const [acceptedFiles, setAcceptedFiles] = useState({});
    const initialValues = {
        studentName: '',
        EmailId: '',
        ContactNo: '',
        btechStream: '',
        currentSem: '',
        Domain: '',
        Class10: '',
        Class12: '',
    };
    const handleClose = () => setShow(false);
    const { id1, id2 } = useParams();
    const handleSubmit = (values) => {
        addStudentApi(values);
    }

    const uploadFileSubmit = () => {
        if (Object.keys(uploadFile)?.length > 0) {
            uploadStudentDataApi(uploadFile);
        }
    }
    async function uploadStudentDataApi(file) {
        const toastId = toast.loading("Please Wait we are uploading Data...")
        try {
            const res = await uploadStudentData(file, decrypt(id2));
            toast.dismiss(toastId);
            toast.success("Successfully uploaded");

        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }
    }


    async function addStudentApi(values) {
        const toastId = toast.loading("Please Wait we are adding student...");
        try {
            const res = await addStudent(values, CollegeId,
            );
            toast.dismiss(toastId);
            toast.success("Successfully added");
            // getStaticData()
            setShow(false);
            getApi();
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }
    }

    const { getInputProps, getRootProps, acceptedFiles, isDragActive } = useDropzone({
        accept: {
            'application/vnd.ms-excel': ['.csv'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        },
        minSize: 0,
        maxFiles: 1,
        maxSize: 5242880,
        // onDrop: (acceptedFiles) => {
        //     if (acceptedFiles.length > 0) {
        //         setCollegeMou(acceptedFiles);
        //     }
        // },
    })

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = sampleDocument;
        a.download = 'sample_document.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            setUploadFile(acceptedFiles[0])
        }
    }, [acceptedFiles]);
    console.log(uploadFile, "uploadFile")
    return (
        <div id='addStudentsOverlay' className={`addCollegeModal ${show ? 'show' : 'hide'}`}>
            <div id="addStudents" className={`addColleges ${show ? 'articleShow' : 'articleHide'}`}>
                <div className='modal-header'>
                    <div>{type === "College" ? "Add College" : "Add Student"}</div>
                    <img src={cross} alt="" onClick={handleClose} />
                </div>
                <div className='modal-body' style={{
                    overflowY: 'scroll'
                }}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={addStudentSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className='AddCollegeForm'>
                            <div>
                                <div className='AddLPFormDiv'>
                                    <label>Student Name<span>*</span></label>
                                    <div className="fieldDivWithErrorCollege">
                                        <Field type='text' name='studentName' required />
                                        <ErrorMessage name='studentName' component='div' className='errorMessage' />
                                    </div>
                                </div>
                                <div className='AddLPFormDiv'>
                                    <label>Email ID<span>*</span></label>
                                    <div className="fieldDivWithErrorCollege">
                                        <Field type='email' name='EmailId' required />
                                        <ErrorMessage name='EmailId' component='div' className='errorMessage' />
                                    </div>
                                </div>
                                <div className='AddLPFormDiv'>
                                    <label>Contact No.<span>*</span></label>
                                    <div className="fieldDivWithErrorCollege">
                                        <Field type='tel' name='ContactNo' required />
                                        <ErrorMessage name='ContactNo' component='div' className='errorMessage' />
                                    </div>
                                </div>
                                <div className='AddLPFormDiv'>
                                    <label>B.Tech Stream<span>*</span></label>
                                    <div className="fieldDivWithErrorCollege">
                                        <Field type='text' name='btechStream' required />
                                        <ErrorMessage name='btechStream' component='div' className='errorMessage' />
                                    </div>
                                </div>
                                <div className='AddLPFormDiv'>
                                    <label>Current Sem<span>*</span></label>
                                    <div className="fieldDivWithErrorCollege">
                                        <Field type='text' name='currentSem' required />
                                        <ErrorMessage name='currentSem' component='div' className='errorMessage' />
                                    </div>
                                </div>
                                <div className='AddLPFormDiv' style={{
                                    justifyContent: "center"
                                }}>
                                    <label>Domain<span>*</span></label>
                                    <div className="fieldDivWithErrorCollege">
                                        <Field as="select" id="Domain" name="Domain" style={{
                                            width: '100%'
                                        }}>
                                            <option hidden value="">Select Department</option>
                                            {
                                                totalDomains && totalDomains?.length > 0 && totalDomains?.map((item, index) => (
                                                    <option key={index} value={item?.value}>{item?.text}</option>
                                                ))
                                            }
                                        </Field>
                                        <ErrorMessage name='Domain' component='div' className='errorMessage' />
                                    </div>
                                </div>

                                <div className='AddLPFormDiv'>
                                    <label>Class 10 %<span>*</span></label>
                                    <div className="fieldDivWithErrorCollege">
                                        <Field type='text' name='Class10' required />
                                        <ErrorMessage name='Class10' component='div' className='errorMessage' />
                                    </div>
                                </div>
                                <div className='AddLPFormDiv'>
                                    <label>Class 12 %<span>*</span></label>
                                    <div className="fieldDivWithErrorCollege">
                                        <Field type='text' name='Class12' required />
                                        <ErrorMessage name='Class12' component='div' className='errorMessage' />
                                    </div>
                                </div>
                            </div>




                            <div className='footer'>
                                <button type='button' onClick={handleClose}>
                                    Cancel
                                </button>
                                <button type='submit'>
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <div>
                        <div>
                            <div style={{
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <hr style={{
                                    width: "45%"
                                }} />
                                <span style={{
                                    fontSize: '13px',
                                    color: "#838283",
                                    fontWeight: "500"
                                }}>OR</span>
                                <hr style={{
                                    width: "45%"
                                }} />
                            </div>
                            <div className='uploadDocs' style={{
                                marginBottom: "1rem",

                            }}>

                                <div  {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <img src={uploadStudents} alt='' />
                                </div>
                                {
                                    Object.keys(uploadFile)?.length > 0 ?
                                        <div className='uploadFileName'>
                                            <span className=''>{uploadFile?.path}</span>
                                            <img onClick={() => setUploadFile({})} src={cross} alt='' />
                                        </div>
                                        :
                                        <div
                                            style={{
                                                display: 'flex',
                                                width: '46%',
                                                padding: '0px 3px',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                // gap: '5px',
                                                borderRadius: '2px',
                                                color: '#424242',
                                                fontSize: '12px',
                                                outline: 'none',
                                                marginTop: '10px',
                                                marginLeft: '10px',
                                                // border: '1px solid black'
                                            }}
                                        >
                                            <span>
                                                Sample Document
                                            </span>
                                            <div
                                                className=""
                                                style={{
                                                    borderRadius: '4px',
                                                    height: '20px',
                                                    width: '20px',
                                                    padding: '4px',
                                                    backgroundColor: '#654E8A',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignContent: 'center',
                                                    cursor: 'pointer',
                                                    // border:'1px solid black'
                                                }}
                                                onClick={handleDownload}
                                            >
                                                <img src={downloadIcon} alt="" />
                                            </div>
                                        </div>}
                                {/* {Object.keys(formik.values.CollegeMou)?.length > 0 && <p className='uploadFileName'>{formik.values.CollegeMou?.path}</p>} */}
                                {/* <ErrorMessage name='CollegeMou' component='div' className='errorMessage' /> */}
                            </div>
                        </div>
                        <div className='footer'>
                            <button type='button' onClick={handleClose}>
                                Cancel
                            </button>
                            <button type='submit' onClick={uploadFileSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminAddStudents;

