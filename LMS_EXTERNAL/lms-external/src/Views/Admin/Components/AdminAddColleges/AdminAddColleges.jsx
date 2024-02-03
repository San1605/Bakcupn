import { uploadImg, uploadDoc, cross, emptyCollegeLogo } from "../../Assets/adminIcons"
import "./AdminAddColleges.css"
import toast from 'react-hot-toast';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { useContext, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { addCollegeSchema } from "../../../../Utils/Schema"

function AdminAddColleges({ show, setShow, type, getApi, CollegeId }) {
    const { addColleges, addStudent } = useContext(GlobalContext)


    const initialValues = {
        CollegeName: "",
        TpoHeadName: "",
        TpoContactNo: "",
        TpoEmailId: "",
        // Domains: "",
        address: "",
        StartDate: "",
        endDate: "",
        collegeLogo: {},
        CollegeMou: {},
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const toastId = toast.loading("Please Wait we are adding college...");

            const res = await addColleges(
                values.CollegeName,
                values.TpoHeadName,
                values.TpoContactNo,
                values.TpoEmailId,
                // values.Domains,
                values.collegeLogo,
                values.CollegeMou,
                values.address,
                values.StartDate,
                values.endDate
            );
            toast.dismiss(toastId);
            toast.success("Successfully added");
            setShow(false);
            getApi();
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }
        resetForm()
    };




    const handleClose = () => {
        setShow(false);
    }

    return (

        <div id="addCollegeOverlay" className={`addCollegeModal ${show ? "show" : "hide"}`}>
            <div id="addCollege" className={`addColleges ${show ? "articleShow" : "articleHide"}`}>
                <div className="modal-header">
                    <div>{type === "College" ? "Add College" : "Add Student"}</div>
                    <img src={cross} alt="" onClick={handleClose} />
                </div>
                <div className="modal-body">
                    <Formik initialValues={initialValues} validationSchema={addCollegeSchema} onSubmit={handleSubmit}>
                        <InnerForm handleClose={handleClose} />
                    </Formik>
                </div>
            </div>
        </div>
    );
}
export default AdminAddColleges;


const InnerForm = ({ handleClose }) => {
    const formik = useFormikContext();
    const { getInputProps: getLogoInputProps, getRootProps: getLogoRootProps, acceptedFiles: acceptedLogoFiles, isDragActive: isLogoDragActive } = useDropzone({
        accept: {
            'image/jpeg': ['.jpeg', '.png']
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

    const { getInputProps: getMouInputProps, getRootProps: getMouRootProps, acceptedFiles: acceptedMouFiles, isDragActive: isMouDragActive } = useDropzone({
        accept: {
            'application/pdf': ['.pdf'],
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


    useEffect(() => {
        if (acceptedLogoFiles.length > 0) {
            formik.setFieldValue("collegeLogo", acceptedLogoFiles[0]);
        }
    }, [acceptedLogoFiles]);

    useEffect(() => {
        if (acceptedMouFiles.length > 0) {
            formik.setFieldValue("CollegeMou", acceptedMouFiles[0]);
        }
    }, [acceptedMouFiles]);
    return (
        <Form className="AddCollegeForm" style={{ height: "100%" }}>
            <div className="addCollegefields">
                <div className="ImageDiv">
                    <img
                        className="uploadedImageDrop"
                        src={Object.keys(formik.values.collegeLogo)?.length > 0 ? URL.createObjectURL(formik.values.collegeLogo) : emptyCollegeLogo}
                        alt=""
                    />
                    <div {...getLogoRootProps()}>
                        <input {...getLogoInputProps()} />
                        <div className="uploadImgdiv">
                            <img src={uploadImg} alt="" style={{
                                cursor: "pointer"
                            }} />
                        </div>
                    </div>
                    <ErrorMessage name='collegeLogo' component='div' className='errorMessage' />
                </div>

                <div className='AddLPFormDiv'>
                    <label>College Name<span>*</span></label>
                    <div className="fieldDivWithErrorCollege">
                        <Field
                            type='text'
                            name='CollegeName'
                            required
                        />
                        <ErrorMessage name='CollegeName' component='div' className='errorMessage' />
                    </div>
                </div>

                <div className='AddLPFormDiv'>
                    <label>TPO Head Name<span>*</span></label>
                    <div className="fieldDivWithErrorCollege">
                        <Field
                            type='text'
                            name='TpoHeadName'
                            required
                        />
                        <ErrorMessage name='TpoHeadName' component='div' className='errorMessage' />
                    </div>
                </div>

                <div className='AddLPFormDiv'>
                    <label>TPO Contact No.<span>*</span></label>
                    <div className="fieldDivWithErrorCollege">
                        <Field
                            type='tel'
                            name='TpoContactNo'
                        />
                        <ErrorMessage name='TpoContactNo' component='div' className='errorMessage' />
                    </div>
                </div>

                <div className='AddLPFormDiv'>
                    <label>TPO Email ID<span>*</span></label>
                    <div className="fieldDivWithErrorCollege">
                        <Field
                            type='email'
                            name='TpoEmailId'
                            required
                        />
                        <ErrorMessage name='TpoEmailId' component='div' className='errorMessage' />
                    </div>
                </div>

                {/* <div className='AddLPFormDiv'>
                    <label>Domains<span>*</span></label>
                    <div className="fieldDivWithErrorCollege">
                        <Field
                            as='textarea'
                            cols='22'
                            rows='3'
                            name='Domains'
                            required
                        />
                        <ErrorMessage name='Domains' component='div' className='errorMessage' />
                    </div>
                </div> */}

                <div className='AddLPFormDiv'>
                    <label>College Address<span>*</span></label>
                    <div className="fieldDivWithErrorCollege">
                        <Field
                            type='text'
                            name='address'
                            required
                        />
                        <ErrorMessage name='address' component='div' className='errorMessage' />
                    </div>
                </div>

                <div className='AddLPFormDiv'>
                    <label>Start Date<span>*</span></label>
                    <div className="fieldDivWithErrorCollege">
                        <Field
                            type='date'
                            name='StartDate'
                            required
                        />
                        <ErrorMessage name='StartDate' component='div' className='errorMessage' />
                    </div>
                </div>

                <div className='AddLPFormDiv'>
                    <label>End Date<span>*</span></label>
                    <div className="fieldDivWithErrorCollege">
                        <Field
                            type='date'
                            name='endDate'
                            required
                        />
                        <ErrorMessage name='endDate' component='div' className='errorMessage' />
                    </div>
                </div>

                <div className='uploadDocs'>

                    <div className="fieldDivWithErrorCollege">
                        <div  {...getMouRootProps()}>
                            <input {...getMouInputProps()} />
                            <img src={uploadDoc} alt='' />
                        </div>
                        {Object.keys(formik.values.CollegeMou)?.length > 0 && <p className='uploadFileName'>{formik.values.CollegeMou?.path}</p>}
                        <ErrorMessage name='CollegeMou' component='div' className='errorMessage' />
                    </div>
                </div>
            </div>

            <div className='footer'>
                <button type="button" onClick={() => {
                    formik.resetForm()
                    handleClose()
                }}>
                    Cancel
                </button>
                <button type="submit">
                    Submit
                </button>
            </div>
        </Form>
    )
}