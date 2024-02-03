import { ErrorMessage, Form, Field, Formik } from 'formik'
import React, { useContext } from 'react'
import { passwordUpdateValidationSchema } from '../../Utils/Schema'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../Context/GlobalContext'
import toast from 'react-hot-toast'

const UpdatePasswords = ({ currentForm, setCurrentForm }) => {
    const { updatePasswordUser } = useContext(GlobalContext)
    const navigate = useNavigate();
    const handlePasswordUpdate = async (values, { resetForm }) => {
        try {
            const data = await updatePasswordUser(values.currentPassword, values.updatedPassword);
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
                currentPassword: '',
                updatedPassword: '',
            }}
            validationSchema={passwordUpdateValidationSchema}
            onSubmit={handlePasswordUpdate}>
            <div className="loginFormCollege">
                <div>
                    <div>Change Password</div>
                    <div>for {localStorage.getItem("email")}</div>
                </div>
                <Form className='loginCollegeStudent'>
                    <div className='loginCollegeStudentDiv'>
                        <label>Current Password</label>
                        <div>
                            <Field
                                type='password'
                                placeholder='Enter your current password'
                                name='currentPassword'
                            />
                            <ErrorMessage name='currentPassword' component='div' className="errorMessageLogin" />
                        </div>

                    </div>

                    <div className='loginCollegeStudentDiv'>
                        <label>New Password</label>
                        <div>
                            < Field
                                type='password'
                                placeholder='Enter your new password'
                                name='updatedPassword'
                            />
                            <ErrorMessage name='updatedPassword' component='div' className="errorMessageLogin" />
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

export default UpdatePasswords

