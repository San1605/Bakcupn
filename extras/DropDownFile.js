import { Button, Form } from "react-bootstrap"
import UploadIcon from "../../assets/uploadIcon.svg"
import "../../assets/css/dropdownfile.css"
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import axios from "axios"


export default function DropDownFile({ uploadFile, setUploadFile, apiType, setApiType, setApiResp }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg',],
    }
  });

  const files = acceptedFiles.map(file => (
    <div key={file.path}>
      {file.path}
    </div>
  ))

  const handleSubmit = () => {
    let apiUrl = "http://70.37.107.99:8072";
    const toastId = toast.loading("please wait.....");
    var bodyFormData = new FormData();
    bodyFormData.append('image_url', acceptedFiles[0]);
    axios({
      method: "post",
      url: `${apiUrl}/${apiType}`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        toast.dismiss(toastId);
        if (response.status === 200) {
          console.log(response.data)
          let output = "";
          if (apiType === "checkpattern") {
            output = response.data["Pattern Type"];
          } else if (apiType === "checkdamage") {
            output = response.data["Damage Type"];
          } else {
            output = response.data["Text"];
          }
          setApiResp(output);
        } else {
          toast.error("Something went wrong.")
        }
      })
      .catch(function (response) {
        //handle error
        toast.dismiss(toastId);
        toast.error("Something went wrong.")
        console.log(response);
      });
  }

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setUploadFile(acceptedFiles)
    }
  }, [acceptedFiles]);


  return (
    <>
      <div className="m-auto" style={{maxWidth: "70%"}}>
        <Form.Select aria-label="checkpattern" onChange={(e) => setApiType(e.target.value)}>
          <option value="checkpattern">Check Pattern</option>
          <option value="checkdamage">Check Damage</option>
          <option value="readtyre">Read Tyre</option>
        </Form.Select>
      </div>
      {uploadFile.length == 0 ?
        <section className="dropdown-container">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className='dropzone-inside'>
              <img src={UploadIcon} width="75px" />
              <p className="heading-text-dropzone mt-2">Drag and Drop file here</p>
              <div className='file-select'>
                <div className='file-select-text px-2 py-2'>Choose file </div>

              </div>
              <p className="bottom-dropdown-text mt-2">Max File: 5MB</p>
            </div>
          </div>
        </section> : <>
          <section className="dropdown-output">
            <aside className="d-flex justify-content-center align-items-center flex-column">
              <img src={URL.createObjectURL(acceptedFiles[0])} width="300px" height="175px" />
              <ul className="mt-3">{files}</ul>
            </aside>
          </section>
          <div className='d-flex justify-content-end pt-3 pb-1 pe-4'>
            <Button style={{ marginRight: "15px", width: "8rem" }} variant="danger" onClick={() => { setUploadFile([]) }}>Upload a new</Button>
            <Button style={{ width: "5rem", background: "#EA7748", border: "unset" }} onClick={() => handleSubmit()}>Submit</Button>
          </div>
        </>
      }
    </>
  );
}
