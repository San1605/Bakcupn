import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import { GlobalContext } from '../../../../Context/GlobalContext';
import toast from 'react-hot-toast';
function AddRoleModal({ show, setShow, text, getCelebalMentorsApi, getCollegeMentorsApi, staticData }) {

    const { addCollegeMentor,
        addCelebalRoles, staticdata } = useContext(GlobalContext)

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Domain, setDomain] = useState("");
    const [Role, setRole] = useState("");
    const [CollegeName, setCollegeName] = useState("");
    const [contactNo, setContactNo] = useState("");
    const handleClose = () => {
        setName("")
        setEmail("");
        setDomain("");
        setRole("");
        setCollegeName("")
        setShow(false);
        setContactNo("")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = false;
        if (Role?.length === 0) {
            isValid = "Please select the role first"
        }
        if (Role === "Admin") {
            isValid = validateAdminFields();
        } else if (Role === "HR Buddy") {
            isValid = validateHrBuddyFields();
        } else if (Role === "Mentor") {
            isValid = validateMentorFields();
        }
        else if (Role === 'mentor') {
            isValid = validateColegeMentorFields()
        }

        if (isValid === null) {
            if (text !== "College") {
                addCelebalRoleApi(Name, Email, Domain, Role, CollegeName);
            } else {
                addCollegeRoleApi(Name, Email, Domain, Role, CollegeName, contactNo);
            }
        } else {
            toast.dismiss();
            toast.error(isValid);
        }
    }

    const validateAdminFields = () => {
        if (!(Name?.length > 0 && Email?.length > 0 && Role?.length > 0)) {
            return "Please complete all required fields.";
        }

        if (text !== "College" && !isValidEmailDomain(Email, "celebaltech.com")) {
            return "For this role, the email domain should be 'celebaltech.com'.";
        }

        if (!isValidEmailFormat(Email)) {
            return "Please provide a valid email address.";
        }

        return null; // Validation passed
    }

    const validateHrBuddyFields = () => {
        if (!(Name?.length > 0 && Email?.length > 0 && Role?.length > 0 && CollegeName?.length > 0)) {
            return "Please complete all required fields.";
        }

        if (text !== "College" && !isValidEmailDomain(Email, "celebaltech.com")) {
            return "For this role, the email domain should be 'celebaltech.com'.";
        }
        if (!isValidEmailFormat(Email)) {
            return "Please provide a valid email address.";
        }
        return null;
    }

    const validateMentorFields = () => {
        if (!(Name?.length > 0 && Email?.length > 0 && Domain?.length > 0 && Role?.length > 0 && CollegeName?.length > 0)) {
            return "Please complete all required fields.";
        }
        if (text !== "College" && !isValidEmailDomain(Email, "celebaltech.com")) {
            return "For this role, the email domain should be 'celebaltech.com'.";
        }
        if (!isValidEmailFormat(Email)) {
            return "Please provide a valid email address.";
        }
        if (text === "College" && contactNo && !isValidContactNumber(contactNo)) {
            return "Please provide a valid contact number.";
        }
        return null;
    }

    const validateColegeMentorFields = () => {
        if (!(Name?.length > 0 && Email?.length > 0 && Domain?.length > 0 && Role?.length > 0 && CollegeName?.length > 0 && contactNo?.length > 0)) {
            return "Please complete all required fields.";
        }
        if (text !== "College" && !isValidEmailDomain(Email, "celebaltech.com")) {
            return "For this role, the email domain should be 'celebaltech.com'.";
        }
        if (!isValidEmailFormat(Email)) {
            return "Please provide a valid email address.";
        }
        if (text === "College" && contactNo && !isValidContactNumber(contactNo)) {
            return "Please provide a valid contact number.";
        }
        return null;
    }


    const isValidEmailFormat = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const isValidContactNumber = (contactNo) => {
        const digitRegex = /^\d{10}$/;
        return digitRegex.test(contactNo);
    }
    const isValidEmailDomain = (email, domain) => {
        const regex = new RegExp(`@${domain}$`);
        return regex.test(email);
    }



    async function addCelebalRoleApi(Name, Email, Domain, Role, CollegeName) {
        const toastId = toast.loading("Please Wait we are addding role...")
        try {
            const res = await addCelebalRoles(Name, Email, Domain, Role, CollegeName);
            toast.dismiss(toastId);
            toast.success("Sucessfully added");
            setShow(false)
            setName("")
            setEmail("");
            setDomain("");
            setRole("");
            getCelebalMentorsApi()

        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
        }
    }

    async function addCollegeRoleApi(Name, Email, Domain, Role, CollegeName, contactNo) {
        const toastId = toast.loading("Please Wait we are adding role...")
        try {
            const res = await addCollegeMentor(Name, Email, Domain, Role, CollegeName, contactNo);
            toast.dismiss(toastId);
            toast.success("Sucessfully added");
            setShow(false)
            setName("")
            setEmail("");
            setDomain("");
            setRole("");
            setCollegeName("")
            setContactNo("");
            getCollegeMentorsApi()

        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.message);
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
                <div>{text === "College" ? "Add College Roles" : "Add Celebal Roles"}</div>
                <CloseButton
                    variant='white'
                    style={{ fontSize: "14px", fontWeight: "500" }}
                    onClick={handleClose}
                />
            </Modal.Header>
            <Modal.Body>
                <form className='AddLPForm'>

                    <div className='AddLPFormDiv'>
                        <label>Name<span>*</span></label>
                        <input
                            type='text'
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            required

                        />
                    </div>


                    <div className='AddLPFormDiv'>
                        <label>Role</label>
                        {text === "College" ?
                            <select value={Role} name="" id="" onChange={(e) => setRole(e.target.value)}>
                                <option hidden value="">Select Role</option>
                                <option value="mentor">Mentor</option>

                            </select> :
                            <select value={Role} name="" id="" onChange={(e) => setRole(e.target.value)}>
                                <option hidden value="">Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="HR Buddy">HR Buddy</option>
                                <option value="Mentor">Mentor</option>
                            </select>}
                    </div>

                    <div className='AddLPFormDiv'>
                        <label>Email ID<span>*</span></label>
                        <input
                            type='email'
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {(Role === "Mentor" || Role === "mentor") &&
                        <div className='AddLPFormDiv'>
                            <label>Domain</label>
                            <select value={Domain} name="" id="" onChange={(e) => setDomain(e.target.value)}>
                                <option hidden value="">Select Domain</option>
                                {
                                    staticdata && staticdata?.Domain?.length > 0 && staticdata?.Domain?.map((item, index) => (
                                        <option key={index} value={item?.value}>{item?.text}</option>
                                    ))
                                }

                            </select>
                        </div>
                    }
                    {Role === "mentor" && text === "College" &&
                        <div className='AddLPFormDiv'>
                            <label>Contact no.</label>
                            <input
                                type='tel'
                                value={contactNo}
                                onChange={(e) => setContactNo(e.target.value)}
                                required
                            />
                        </div>
                    }
                    {(Role === "HR Buddy" || Role === "Mentor" || Role === "mentor") &&
                        <div className='AddLPFormDiv'>
                            <label>College Name</label>
                            <select value={CollegeName} name="" id="" onChange={(e) => setCollegeName(e.target.value)}>
                                <option hidden value="">Select College</option>
                                {
                                    staticdata && staticdata?.colleges?.length > 0 && staticdata?.colleges?.map((item, index) => (
                                        <option key={index} value={item?.value}>{item?.text}</option>
                                    ))
                                }
                            </select>
                        </div>
                    }

                    <div className='footer'>
                        <button onClick={handleClose}>
                            Cancel
                        </button>
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default AddRoleModal;