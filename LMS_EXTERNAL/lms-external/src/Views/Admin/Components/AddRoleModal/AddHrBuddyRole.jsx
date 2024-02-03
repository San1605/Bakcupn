import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import { GlobalContext } from '../../../../Context/GlobalContext';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from "formik"
import { addCelebalRoleHrBuddySchema, addCollegeRoleHrBuddySchema, addHrBuddyRoleSchema } from '../../../../Utils/Schema';

function AddHrRoleModal({ show, setShow, text, getCelebalMentorsApi, getCollegeMentorsApi }) {
    const { addCollegeMentor, addCelebalRoles, staticdata } = useContext(GlobalContext)
    const initialValuesCollege = {
        Name: "",
        Email: "",
        contactNo: "",
        CollegeName: "",
        Domain: "",
    };

    const initialValuesCelebal = {
        Name: "",
        Email: "",
        CollegeName: "",
        Domain: "",
    };


    const handleClose = () => {
        setShow(false);
    }

    const handleSubmit = async (values, { resetForm }) => {
        try {
            if (text !== "College") {
                await addCelebalRoleApi(values.Name, values.Email, values.Domain, "Mentor", values.CollegeName);
            } else {
                await addCollegeRoleApi(values.Name, values.Email, values.Domain, "mentor", values.CollegeName, values.contactNo);
            }
            resetForm();
            setShow(false);
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }

    }

    async function addCelebalRoleApi(Name, Email, Domain, Role, CollegeName) {
        const toastId = toast.loading("Please Wait we are addding role...")
        try {
            const res = await addCelebalRoles(Name, Email, Domain, Role, CollegeName);
            toast.dismiss(toastId);
            toast.success("Sucessfully added");
            setShow(false)
            getCelebalMentorsApi()

        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }
        finally {
            toast.dismiss(toastId);
        }
    }

    async function addCollegeRoleApi(Name, Email, Domain, Role, CollegeName, contactNo) {
        const toastId = toast.loading("Please Wait we are adding role...")
        try {
            const res = await addCollegeMentor(Name, Email, Domain, Role, CollegeName, contactNo);
            toast.dismiss(toastId);
            toast.success("Sucessfully added");
            setShow(false)
            getCollegeMentorsApi()

        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }
        finally {
            toast.dismiss(toastId);
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
                <div>{text !== "College" ? "Add CT Mentor" : "Add Faculty Mentor"}</div>
                <CloseButton
                    variant='white'
                    style={{ fontSize: "14px", fontWeight: "500" }}
                    onClick={handleClose}
                />
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={text === "College" ? initialValuesCollege : initialValuesCelebal}
                    validationSchema={text === "College" ? addCollegeRoleHrBuddySchema : addCelebalRoleHrBuddySchema}
                    onSubmit={handleSubmit}
                >
                    <Form className='AddLPForm'>
                        <div className='AddLPFormDiv'>
                            <label>Name<span>*</span></label>
                            <div>
                                <Field type='text' name='Name' required />
                                <ErrorMessage name='Name' component='div' className="errorMessageLogin" />
                            </div>
                        </div>

                        <div className='AddLPFormDiv'>
                            <label>Email ID<span>*</span></label>
                            <div>
                                <Field type='email' name='Email' required />
                                <ErrorMessage name='Email' component='div' className="errorMessageLogin" />
                            </div>
                        </div>

                        {text === "College" && <div className='AddLPFormDiv'>
                            <label>Contact No.<span>*</span></label>
                            <div>
                                <Field type='tel' name='contactNo' required />
                                <ErrorMessage name='contactNo' component='div' className="errorMessageLogin" />
                            </div>
                        </div>
                        }
                        <div className='AddLPFormDiv'>
                            <label>College Name</label>
                            <div>
                                <Field as='select' name='CollegeName'>
                                    <option hidden value="">Select College</option>
                                    {
                                        staticdata && staticdata?.colleges?.length > 0 && staticdata?.colleges?.map((item) => (
                                            <option value={item?.value}>{item?.text}</option>
                                        ))
                                    }
                                </Field>
                                <ErrorMessage name='CollegeName' component='div' className="errorMessageLogin" />

                            </div>
                        </div>

                        <div className='AddLPFormDiv'>
                            <label>Domain</label>
                            <div>
                                <Field as='select' name='Domain'>
                                    <option hidden value="">Select Domain</option>
                                    {
                                        staticdata && staticdata?.Domain?.length > 0 && staticdata?.Domain?.map((item) => (
                                            <option value={item?.value}>{item?.text}</option>
                                        ))
                                    }
                                </Field>
                                <ErrorMessage name='Domain' component='div' className="errorMessageLogin" />
                            </div>
                        </div>

                        <div className='footer'>
                            <button onClick={handleClose}>
                                Cancel
                            </button>
                            <button type='submit'>
                                Submit
                            </button>
                        </div>
                    </Form>
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default AddHrRoleModal;