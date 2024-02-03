import { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Context } from "../../context/ContextProvider";
import "./ExtentionModal.css";
import { ToastContainer, toast } from "react-toastify";

function ExtensionModal(props) {
  const { socket,setChat , conversation, setConversation , extensionId , setExtensionId  } = useContext(Context);
  const [joinedRoom, setJoinedRoom] = useState({ response: "" });

  const handleExtensionIdChange = (event) => {
    setExtensionId(event.target.value);
  };
  useEffect(()=>{
if(localStorage.getItem("ExtentionId")){
  setTimeout(() => {
    socket?.emit("sendExtension", extensionId , (response) => {
      setJoinedRoom(response);
      console.log(response , extensionId)
    });
  }, 3000);
}
  } , [])

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (extensionId === "") {
      toast.error("Extension ID cannot be empty.");
    } else {
      if (socket) {
        console.log("Extension ID submitted:", extensionId);
        // localStorage.setItem("ExtentionId" ,extensionId )
        setConversation([])
        setChat([])

        socket.emit("sendExtension", extensionId , (response) => {
          setJoinedRoom(response);
          console.log(response , extensionId)
        });

        props.handleClose();
      } else {
        toast.error("Connection is not established.");
        console.log(socket,"ssjj")
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Enter Extension
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form> */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="number"
              placeholder="Enter Extension Id"
              autoFocus
              value={extensionId}
              onChange={handleExtensionIdChange}
            />
          </Form.Group>
          {/* </Form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="modal_buttn"
            // onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
            onClick={handleSubmit}
            style={{
              " align-self": "stretch",
              " border-radius": "0px 0px 0px 8px",
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ExtensionModal;
