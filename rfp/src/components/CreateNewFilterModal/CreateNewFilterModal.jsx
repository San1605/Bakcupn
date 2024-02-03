import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import "./CreateNewFilterModal.css"
import { Alert, CloseButton } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import ChatContext from '../../Context/Context';
import axios from 'axios';
function CreateNewFilterModal(props) {
    const { department,
        setDepartment,
        action,
        setAction,
        apidata,
        setApiData, } = useContext(ChatContext)
    const navigate = useNavigate();
    const globalApiEndPoint = "http://20.127.168.63:8082";
    console.log({ department, action })
    const [showError, setShowError] = useState(false)

    // const callOneApi = () => {
    //     const toastId = toast.loading("Generating content for an RFP. Please wait....")
    //     axios.get('http://20.127.168.63:8082/one_api')
    //         .then((response) => {
    //             if (response.status === 200 && Array.isArray(response.data)) {
    //                 const json = response.data;
    //                 setApiData(json);
    //                 navigate("/home");
    //             } else {
    //                 toast.error("Something went wrong.")
    //             }

    //             toast.dismiss(toastId);

    //         })
    //         .catch((error) => {
    //             toast.dismiss(toastId);
    //             // Handle the error here, for example:
    //             console.error('An error occurred:', error);
    //         });

    // }

    const sendFiltersApi = async () => {
        if (department.length === 0 || action.length === 0) {
            toast.error("Data is invalid !");
            return;
        }
        setApiData([]);
        const toastId = toast.loading("Generating content for an RFP. Please wait....");
        try {
            const response1 = await axios.post(`${globalApiEndPoint}/get_dept`, {
                dept: department,
                time: action,
            });

            if (response1.status === 200) {
                const response2 = await axios.get('http://20.127.168.63:8082/one_api');

                if (response2.status === 200 && Array.isArray(response2.data)) {
                    const json = response2.data;
                    setApiData(json);
                    navigate("/home");
                } else {
                    toast.error("Something went wrong.");
                }
            } else {
                toast.error("Something went wrong.");
            }
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error("Something went wrong.");
        } finally {
            toast.dismiss(toastId);
        }
    };

    const handleSubmit = () => {
        if (department !== "" && action !== "") {
            // navigate("/home");
            sendFiltersApi();
        } else {
            console.log("not filled")
            //   setShowError(true)
            toast.error('Please fill in both selects.');
        }
    };

    return (
        <>
            <Modal
                className='CreateNewFilterModal'
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <div>Create a new RFP</div>
                    <CloseButton
                        style={{ fontSize: "14px" }}
                        onClick={() => props.onHide()}
                    />
                </Modal.Header>
                <Modal.Body className='CreateNewFilterModalBody'>
                    <div className='outerDiv'>
                        <div className='FilterModalSelectDiv'>
                            <label htmlFor="">Department</label>
                            <select onChange={(e) => setDepartment(e.target.value)} value={department}>
                                <option value="default" hidden>Select Department</option>
                                <option value="Defence">Defence Department</option>
                                <option value="Power & Energy">Power & Energy</option>
                                <option value="IT">IT Department</option>
                            </select>
                        </div>
                        <div className='FilterModalSelectDiv' >
                            <label htmlFor="">Select Sections from</label>

                            <select onChange={(e) => setAction(e.target.value)} value={action}>
                                <option value="default" hidden>Select Section</option>
                                <option value="Latest">Latest RFP</option>
                                <option value="Generic">Generic RFP</option>
                                <option value="6 Months">Last 6 Months' Data</option>
                            </select>
                        </div>
                    </div>
                    <Button className='modalButton' onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Body>
                {/* {showError && (
                        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                            Please fill in both selects.
                        </Alert>
                    )} */}
            </Modal>
        </>
    );
}

export default CreateNewFilterModal;