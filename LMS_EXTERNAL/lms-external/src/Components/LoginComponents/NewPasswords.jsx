import React, { useContext } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../Context/GlobalContext';
import toast from 'react-hot-toast';
import { newPasswordValidationSchema } from '../../Utils/Schema';

const NewPasswords = ({ currentForm, setCurrentForm }) => {
    const { handleNewPassword } = useContext(GlobalContext);
    const navigate = useNavigate();
    const handleNewpassword = async (values, { resetForm }) => {
        try {
            const data = await handleNewPassword(values.newPassword);
            navigate("/courses");
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }

        resetForm();
    };

    return (
        <Formik
            initialValues={{
                confirmPassword: '',
                newPassword: ""
            }}
            validationSchema={newPasswordValidationSchema}
            onSubmit={handleNewpassword}>
            <div className="loginFormCollege">
                <div>
                    <div>New Password</div>
                </div>
                <Form className='loginCollegeStudent'>

                    <div className='loginCollegeStudentDiv'>
                        <label>New Password</label>
                        <div>
                            <Field
                                type='password'
                                placeholder='Enter your  new password'
                                name='newPassword'
                            />
                            <ErrorMessage name='newPassword' component='div' className="errorMessageLogin" />
                        </div>

                    </div>


                    <div className='loginCollegeStudentDiv'>
                        <label>Confirm Password</label>
                        <div>
                            < Field
                                type='password'
                                placeholder='Confirm new password'
                                name='confirmPassword'
                            />
                            <ErrorMessage name='confirmPassword' component='div' className="errorMessageLogin" />
                        </div>
                    </div>

                    <div className='loginCollegeStudentDiv' style={{
                        marginTop: '6px'
                    }}>
                        <button className='signInLoginCollege' type='submit'>
                            Submit
                        </button>
                    </div>
                </Form>
            </div>
        </Formik>
    )
}

export default NewPasswords
