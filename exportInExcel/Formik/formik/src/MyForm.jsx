import React, { useState } from 'react';
import { useFormik } from "formik"
import { signUpSchema } from './schemas/signupSchema';
const MyForm = () => {
    const [formData, setFormData] = useState({});

    const initialState = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialState,
        validationSchema: signUpSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: (values, action) => {
            console.log(values)
            setFormData(values)
            action.resetForm()
        }
    })



    return (
        <form  onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                   {errors.name && touched.name ? (
                      <p className="form-error">{errors.name}</p>
                    ) : null}
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                   {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                   {errors.password && touched.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
            </label>
            <br />
            <label>
                Confirm Password:
                <input
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                   {errors.confirmPassword && touched.confirmPassword ? (
                      <p className="form-error">{errors.confirmPassword}</p>
                    ) : null}
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default MyForm;