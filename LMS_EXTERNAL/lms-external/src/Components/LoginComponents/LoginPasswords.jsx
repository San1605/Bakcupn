import { Form, ErrorMessage, Field, Formik } from 'formik'
import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { globalActions } from '../../Context/GlobalActions';
import { GlobalContext } from '../../Context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { loginValidationSchema } from '../../Utils/Schema';
import { encryptToken } from '../../Utils/encryptDecrypt';
import { userActions } from '../../Views/User/Context/userAction';

const LoginPasswords = ({ currentForm, setCurrentForm }) => {
    const { authenticateUser, dispatch } = useContext(GlobalContext)
    const navigate = useNavigate();

    const handleLogin = async (values, { resetForm }) => {
        try {
            const data = await authenticateUser(values.email, values.password);
            localStorage.setItem("role", data?.data?.info?.role);
            localStorage.setItem("name", data?.data?.info?.fullName);
            localStorage.setItem("token",data?.data?.token);
            localStorage.setItem("email", data?.data?.info?.emailId);
            dispatch({
                type: globalActions.SET_USER_TYPE,
                payload: data?.data?.info?.role,
            });
            dispatch({
                type: userActions.GET_PROFILE_DATA,
                payload: data?.data?.info
            })

            if (data?.data?.info?.isPasswordUpdated === 0) {
                setCurrentForm("updatePassword");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }

        resetForm();
    };
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}>

            <div className="loginFormCollege">
                <div>
                    <div>Welcome</div>
                    <div>Login into your LMS account</div>
                </div>
                <Form className='loginCollegeStudent'>
                    <div className='loginCollegeStudentDiv'>
                        <label>Email</label>
                        <div>
                            < Field
                                type='email'
                                placeholder='Enter your email'
                                name='email'
                            />
                            <ErrorMessage name='email' component='div' className="errorMessageLogin" />

                        </div>
                    </div>

                    <div className='loginCollegeStudentDiv'>
                        <label>Password</label>
                        <div>
                            < Field
                                type='password'
                                placeholder='Enter your password'
                                name='password'
                            />
                            <ErrorMessage name='password' component='div' className="errorMessageLogin" />
                        </div>
                        <span onClick={() => setCurrentForm("forgotPassword")}>forgot password?</span>
                    </div>
                    <button className='signInLoginCollege' type='submit'>
                        Sign In
                    </button>
                </Form>
            </div>
        </Formik>
    )
}

export default LoginPasswords
