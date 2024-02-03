import * as Yup from "yup";



export const signUpSchema= Yup.object({
name:Yup.string().min(3).max(20).required("Please enter name"),
email:Yup.string().email().required("please enter email"),
password:Yup.string().min(2).max(6).required("Please enter your password"),
confirmPassword:Yup.string().required().oneOf([Yup.ref("password"),null],"Password must match")
})