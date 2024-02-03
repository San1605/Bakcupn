import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Modal from 'react-bootstrap/Modal';
import "./AddLearningPathModal.css";
import toast from 'react-hot-toast';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { addLPSchema } from '../../../../Utils/Schema';

function AddLearningPathModal({ show, setShow, getAllLpsData }) {
    const { addLP, totalDomains, getStaticData } = useContext(GlobalContext);
    const initialValues = {
        lpName: '',
        NoOfCourses: '',
        technology: '',
    };



    const handleSubmit = async (values, { resetForm }) => {
        try {
            const toastId = toast.loading("Please Wait we are adding Learning Path...");
            await addLPApi(values.lpName, values.technology, values.NoOfCourses);
            toast.dismiss(toastId);
            toast.success("Successfully added");
            setShow(false);
            getAllLpsData("all");
            getStaticData()
            resetForm();
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }
    };

    const handleClose = () => {
        setShow(false);
    };

    async function addLPApi(lpName, technology, NoOfCourses) {
        console.log(lpName, technology, NoOfCourses,"lllllllllllll")
        await addLP(lpName, technology, NoOfCourses);
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
                <div>Add Learning Path</div>
                <CloseButton
                    variant='white'
                    style={{ fontSize: "14px", fontWeight: "500" }}
                    onClick={handleClose}
                />
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={addLPSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className='AddLPForm'>
                        <div className='AddLPFormDiv'>
                            <label htmlFor="lpName">Name<span>*</span></label>
                            <div className='fieldDivWithError' >
                                <Field as="select" id="lpName" name="lpName">
                                    <option hidden value="">Select Department</option>
                                    {
                                        totalDomains?.map((item, index) => (
                                            <option key={index} value={item?.value}>{item?.text}</option>
                                        ))
                                    }
                                </Field>
                                <ErrorMessage name="lpName" component="div" className="errorMessage" />
                            </div>
                        </div>
                        <div className='AddLPFormDiv'>
                            <label htmlFor="technology">Technology<span>*</span></label>
                            <div className='fieldDivWithError'>
                                <Field type='text' id="technology" name="technology" />
                                <ErrorMessage name="technology" component="div" className="errorMessage" />
                            </div>
                        </div>
                        <div className='AddLPFormDiv'>
                            <label htmlFor="NoOfCourses">No. of courses<span>*</span></label>
                            <div className='fieldDivWithError'>
                                <Field type='text' id="NoOfCourses" name="NoOfCourses" />
                                <ErrorMessage name="NoOfCourses" component="div" className="errorMessage" />
                            </div>
                        </div>
                        {/* <div className='AddLPFormDiv'>
                            <label htmlFor="department">Domain</label>
                            <div className='fieldDivWithError'>
                                <Field as="select" id="department" name="department">
                                <option hidden value="">Select Department</option>
                                <option value="Appdevelopment">App Development</option>
                                <option value="bigdata">Big Data</option>
                                <option value="Datascience">Data Science</option>
                                <option value="Cloud">Cloud And Network</option>
                            </Field>
                                <ErrorMessage name="department" component="div" className="errorMessage" />
                            </div>
                        </div> */}

                        <div className='footer'>
                            <button type="button" onClick={handleClose}>
                                Cancel
                            </button>
                            <button type="submit">
                                Submit
                            </button>
                        </div>
                    </Form>
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default AddLearningPathModal;
