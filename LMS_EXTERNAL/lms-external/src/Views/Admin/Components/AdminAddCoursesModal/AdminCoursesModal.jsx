import React, { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import toast from 'react-hot-toast';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { useDropzone } from 'react-dropzone';
import {upload,cross,downloadIcon} from "../../Assets/adminIcons"
import sampleDocument from '../../Assets/Files/Student_Template.xlsx';
import "./AdminCoursesModal.css"
import { addCourseSchema } from '../../../../Utils/Schema';

function AdminAddCoursesModal({ show, setShow, getApi, lpId }) {

    const { addCourse } = useContext(GlobalContext);

    const handleClose = () => setShow(false);

    const handleSubmit = (values, { resetForm }) => {
        addCourseApi(values);
        resetForm()
    };

    async function addCourseApi({ courseSequence, Description, complexity, uploadDocument }) {
        const toastId = toast.loading('Please Wait we are adding course...');
        try {
            const res = await addCourse(lpId, courseSequence, Description, complexity, uploadDocument);
            toast.dismiss(toastId);
            toast.success('Successfully added');
            setShow(false);
            getApi();
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }
    }



    return (
        <div  id="addCoursesOverlay" className={`addCollegeModal ${show ? 'show' : 'hide'}`}>
            <div id="addCourses"  className={`addColleges ${show ? 'articleShow' : 'articleHide'}`}>
                <div className="modal-header">
                    <div>Add Course</div>
                    <img src={cross} alt="" onClick={handleClose} />
                </div>
                <div className="modal-body">
                    <Formik
                        initialValues={{
                            courseSequence: '',
                            Description: '',
                            complexity: '',
                            uploadDocument: '',
                        }}
                        validationSchema={addCourseSchema}
                        onSubmit={handleSubmit}
                    >
                        <InnerForm lpId={lpId} handleClose={handleClose} />
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default AdminAddCoursesModal;





const InnerForm = ({ lpId, handleClose }) => {
    const formik = useFormikContext();

    const [uploadDocumentName, setUploadDocumentName] = useState('');
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept: {
            'application/vnd.ms-excel': ['.csv'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        },
        minSize: 0,
        maxFiles: 1,
        maxSize: 5242880,
    });

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            // setUploadDocument(acceptedFiles[0]);
            setUploadDocumentName(acceptedFiles[0]?.path);
            // formik.validateField('uploadDocument')
            formik.setFieldValue('uploadDocument', acceptedFiles[0]);
        }
    }, [acceptedFiles]);


    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = sampleDocument;
        a.download = 'sample_document.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };


    return (
        <Form className="AddCollegeForm" style={{ height: '100%' }}>
            <div className="addCollegefields">
                <div className="AddLPFormDiv">
                    <label>Learning Path<span>*</span></label>
                    <Field type="text" name="LearningPath" readOnly value={lpId} />
                </div>
                <div className="AddLPFormDiv">
                    <label>Course Sequence <span>*</span></label>
                    <div className='fieldDivWithErrorCourse'>
                        <Field style={{ width: "100%" }} type="number" name="courseSequence" required />
                        <ErrorMessage name="courseSequence" component="div" className="errorMessage" />
                    </div>
                </div>
                <div className="AddLPFormDiv" style={{ alignItems: 'flex-start' }}>
                    <label>Description <span>*</span></label>
                    <div className='fieldDivWithErrorCourse'>
                        <Field style={{ width: "100%" }} as="textarea" name="Description" cols="22" rows="3" required />
                        <ErrorMessage name="Description" component="div" className="errorMessage" />
                    </div>
                </div>
                <div className="AddLPFormDiv" style={{ alignItems: 'flex-start' }}>
                    <label>Complexity<span>*</span></label>
                    <div className='fieldDivWithErrorCourse' >
                        <div className="uploadCourseRadioDiv">
                            <div className="uploadCourseRadio">
                                <Field type="radio" name="complexity" value="begineer" />
                                <label>Beginner</label>
                            </div>
                            <div className="uploadCourseRadio">
                                <Field type="radio" name="complexity" value="intermediate" />
                                <label>Intermediate</label>
                            </div>
                            <div className="uploadCourseRadio">
                                <Field type="radio" name="complexity" value="advanced" />
                                <label>Advanced</label>
                            </div>
                        </div>
                        <ErrorMessage name="complexity" component="div" className="errorMessage" />
                    </div>
                </div>
                <div className="AddLPFormDiv">
                    <label>Sample Document</label>
                    <div
                        style={{
                            display: 'flex',
                            width: '60%',
                            padding: '6px ',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: '10px',
                            borderRadius: '2px',
                            border: '1px solid #D7D7D7',
                            background: '#FFF',
                            color: '#424242',
                            fontSize: '13px',
                            outline: 'none',
                        }}
                    >
                        <span
                            style={{
                                color: '#424242',
                                fontSize: '13px',
                                width: 'calc(100% - 20px)',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            sample_document.xlsx
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
                            }}
                            onClick={handleDownload}
                        >
                            <img src={downloadIcon} alt="" />
                        </div>
                    </div>
                </div>
                <div className="AddLPFormDiv">
                    <label>Upload Document<span>*</span></label>
                    <div className='fieldDivWithErrorCourse'>
                        <div className="uploadCourseDocument">
                            <input
                                className="uploadCourseInput"
                                type="text"
                                // contentEditable={false}
                                value={uploadDocumentName}
                            />
                            <div className="uploadCourseButton" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <img src={upload} alt="img" />
                                <span>Choose File</span>
                            </div>
                        </div>
                        <ErrorMessage name="uploadDocument" component="div" className="errorMessage" />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" onClick={() => {
                    formik.resetForm()
                    handleClose()
                }}>
                    Cancel
                </button>
                <button type="submit">Submit</button>
            </div>
        </Form>
    )
}