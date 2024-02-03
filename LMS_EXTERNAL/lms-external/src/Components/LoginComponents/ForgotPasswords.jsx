import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { forgotpasswordValidationSchema } from '../../Utils/Schema'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../Context/GlobalContext';

const ForgotPasswords = ({ currentForm, setCurrentForm }) => {
    const { forgotPasswordUser } = useContext(GlobalContext);


    const handleForgotPassword = async (values, { resetForm }) => {
        try {
            const data = await forgotPasswordUser(values.email);
            toast.dismiss();
            toast.success(data?.data)
            localStorage.setItem("email", values?.email)
            setCurrentForm("otp")
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }

        resetForm();
    };

    return (
        <Formik
            initialValues={{
                email: ''
            }}
            validationSchema={forgotpasswordValidationSchema}
            onSubmit={handleForgotPassword}>
            <div className="loginFormCollege">
                <div>
                    <div>Forgot Password</div>
                    <div>for sandesh.singhal@celebaltech.com</div>
                </div>
                <Form className='loginCollegeStudent'>
                    <div className='loginCollegeStudentDiv'>
                        <label>Email</label>
                        <div>
                            <Field
                                type='email'
                                placeholder='Enter your email'
                                name='email'
                            />
                            <ErrorMessage name='email' component='div' className="errorMessageLogin" />
                        </div>

                    </div>
                    <div className='loginCollegeStudentDiv' style={{
                        marginTop: '6px'
                    }}>
                        <button className='signInLoginCollege' type='submit'>
                            Next
                        </button>
                    </div>
                </Form>
            </div>
        </Formik>
    )
}
export default ForgotPasswords