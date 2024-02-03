// import React, { useState } from "react";
// import { Modal } from "react-bootstrap";
// import calendar from "../../Assets/calendar.png";
// import "./addusermodal.css";
// import axios from "axios";
// import toast from "react-hot-toast";
// import eye from "../../Assets/noun-eye-hide-4890509.svg";
// import eyes from "../../Assets/noun-eye-hide-48905092.svg";
// const options = [
//   { value: "Customer Happiness", label: "Customer Happiness" },
//   {
//     value: "Digital Solutions & Services",
//     label: "Digital Solutions & Services",
//   },
//   { value: "Information Security", label: "Information Security" },
//   {
//     value: "Information Security & Compliance",
//     label: "Information Security & Compliance",
//   },
//   { value: "EVP Office", label: "EVP Office" },
//   { value: "Innovation", label: "Innovation" },
//   // Add more options as needed
// ];
// const designationOption = [
//   { value: "innovation & the future", label: "innovation & the future" },
//   // Add more options as needed
// ];
// const AddUserModal = ({ show, setShow, fetchData }) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [user_name, setUsername] = useState("");
//   const [user_email, setuser_email] = useState("");
//   const [department, setdepartment] = useState("");
//   const [designation, setdesignation] = useState("");
//   const [division, setdivision] = useState("");
//   const [added_on, setadded_on] = useState("");
//   const [password, setPassword] = useState("");
//   const [isEmailValid, setEmailValid] = useState(true);
//   const [visibility, setVisibility] = useState(false);
//   let data = new FormData();
//   const [year, month, day] = added_on.split("-");
//   const formattedDate = `${day}/${month}/${year}`;

//   const handleClose = () => {
//     setUsername("");
//     setuser_email("");
//     setadded_on("");
//     setdepartment("");
//     setdesignation("");
//     setdivision("");
//     setPassword("");
//     setShow(false);
//   };
//   const handleRemoveOption = (optionToRemove) => {
//     const updatedOptions = selectedOptions.filter(
//       (option) => option.value !== optionToRemove.value
//     );
//     setSelectedOptions(updatedOptions);
//   };
//   const AddUser = (e) => {
//     e.preventDefault();
//     if (validPassword) {
//       if (isEmailValid) {
//         if (
//           user_name.trimStart() !== "" &&
//           user_email.trimStart() !== "" &&
//           designation.trimStart() !== "" &&
//           password.trimStart() !== "" &&
//           division != "" &&
//           added_on !== "" &&
//           department != ""
//         ) {
//           const FormData = require("form-data");

//           data.append("designation", designation);
//           data.append("division", division);
//           data.append("added_on", formattedDate);
//           data.append("user_name", user_name);
//           data.append("user_email", user_email);
//           data.append("department", department);
//           data.append("password", password);

//           let config = {
//             method: "post",
//             maxBodyLength: Infinity,
//             url: "https://dewa-uaen-poc-rfp-app-python.azurewebsites.net/add_user_to_list",
//             data: data,
//           };

//           axios
//             .request(config)
//             .then((response) => {
//               toast.success("User added");
//               fetchData();
//               setUsername("");
//               setuser_email("");
//               setadded_on("");
//               setdepartment("");
//               setdesignation("");
//               setdivision("");
//               setPassword("");
//               setShow(false);
//             })
//             .catch((error) => {
//               toast.error(
//                 error?.response?.data
//                   ? error?.response?.data
//                   : "Something went wrong"
//               );
//               setShow(false);
//             });
//         } else {
//           toast.error("Kindly fill all the fields");
//         }
//       } else {
//         toast.error("Invalid email address");
//       }
//     } else toast.error("Invalid password Format");
//   };

//   const validateEmail = (email) => {
//     // Regular expression for a basic email validation
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     return emailRegex.test(email);
//   };

//   const handleEmailChange = (e) => {
//     const newUserEmail = e.target.value;
//     setuser_email(newUserEmail);
//     setEmailValid(validateEmail(newUserEmail));
//   };

//   const [validPassword, setValidPassword] = useState(true);

//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);
//     // Add your password validation logic here
//     const isValid = /^(.{6,})$/.test(newPassword);

//     setValidPassword(isValid);
//   };
//   const togglePasswordVisibility = () => {
//     setVisibility(!visibility);
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header
//         closeButton
//         className="py-2 px-3 add-user-management-modal-header"
//       >
//         <Modal.Title className="header-add-user">Add User</Modal.Title>
//       </Modal.Header>
//       <form onSubmit={AddUser}>
//         <Modal.Body>
//           <div className="d-flex flex-column gap-1">
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="d-flex flex-column gap-1 w-100">
//                   <div className="label">
//                     User Name <span className="asterisk">*</span>
//                   </div>
//                   <input
//                     className="d-flex input p-2 justify-content-between FileContainer"
//                     type="text"
//                     placeholder="enter user name "
//                     value={user_name}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required // Add 'required' attribute to mark this input as mandatory
//                   />
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className="d-flex flex-column gap-1 w-100">
//                   <div className="label">
//                     User Email <span className="asterisk">*</span>
//                   </div>
//                   <input
//                     className={`d-flex input p-2 justify-content-between FileContainer ${
//                       isEmailValid ? "" : "is-invalid"
//                     }`}
//                     type="email"
//                     value={user_email}
//                     placeholder="enter user email"
//                     onChange={handleEmailChange}
//                     title="Invalid email address"
//                     required // Add 'required' attribute to mark this input as mandatory
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="d-flex flex-column gap-1 w-100">
//                   <div className="label">
//                     Designation <span className="asterisk">*</span>
//                   </div>
//                   <input
//                     className="d-flex input p-2 justify-content-between FileContainer"
//                     type="text"
//                     placeholder="enter designation"
//                     value={designation}
//                     onChange={(e) => setdesignation(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className="d-flex flex-column gap-1 w-100">
//                   <div className="label">
//                     Division <span className="asterisk">*</span>
//                   </div>
//                   <select
//                     className="form-select dropdown_RFP"
//                     aria-label="Default select example"
//                     value={division}
//                     onChange={(e) => {
//                       setdivision(e.target.value);
//                     }}
//                     required
//                   >
//                     <option>select division </option>
//                     {designationOption.map((item) => {
//                       return <option value={item.value}>{item.label}</option>;
//                     })}
//                   </select>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="d-flex flex-column gap-1 w-100">
//                   <div className="label">
//                     Added on <span className="asterisk">*</span>
//                   </div>
//                   <div className="d-flex input p-2 justify-content-between FileContainer date-input">
//                     <input
//                       id="datepicker"
//                       type="date"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         border: "none", // Remove the border
//                         outline: "none", // Remove the outline
//                       }}
//                       value={added_on}
//                       onChange={(e) => setadded_on(e.target.value)}
//                       required
//                     />
//                     <img src={calendar} width="18px" /> {/* Calendar Icon */}
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className="d-flex flex-column gap-1 w-100">
//                   <div className="label">
//                     Department <span className="asterisk">*</span>
//                   </div>
//                   <select
//                     className="form-select dropdown_RFP"
//                     aria-label="Default select example"
//                     value={department}
//                     onChange={(e) => {
//                       setdepartment(e.target.value);
//                     }}
//                     required // Add 'required' attribute to mark this input as mandatory
//                   >
//                     <option className="pointer">select department</option>
//                     {options.map((item) => {
//                       return (
//                         <option value={item.value} className="pointer">
//                           {item.label}
//                         </option>
//                       );
//                     })}
//                   </select>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="d-flex flex-column gap-1 w-100">
//                   <div className="label">
//                     Password <span className="asterisk">*</span>
//                   </div>

//                   <div className="d-flex input p-2 justify-content-between FileContainer">
//                     <input
//                       className={`${
//                         validPassword ? "" : "is-invalid"
//                       } w-100 no-border`}
//                       type={visibility ? "text" : "password"}
//                       placeholder="Enter password"
//                       value={password}
//                       onChange={handlePasswordChange}
//                       pattern=".{6,}"
//                       title="Password must contain at least 5 characters"
//                       required
//                     />

//                     <img
//                       className="password-toggle-icon"
//                       width={24}
//                       src={visibility ? eyes : eye}
//                       alt="Toggle Password Visibility"
//                       onClick={togglePasswordVisibility}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Modal.Body>

//         <Modal.Footer closeButton className="py-1 px-3 ">
//           <button
//             className="reset-btn action-buttons py-2 "
//             onClick={handleClose}
//           >
//             Cancel
//           </button>
//           <button className="a-button action-buttons ms-3 py-2" type="submit">
//             Submit
//           </button>
//         </Modal.Footer>
//       </form>
//     </Modal>
//   );
// };

// export default AddUserModal;