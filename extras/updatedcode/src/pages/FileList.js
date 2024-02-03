// import React, { useEffect, useState } from 'react';
// import { TopMostNav } from '../components/TopMostNav';
// import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
// import '../assets/css/fileupload.css';
// import { FaSistrix } from 'react-icons/fa';
// import DocIcon from '../assets/images/docs.svg';
// import VideoIcon from '../assets/images/videos.svg';
// import FileUploadModal from '../components/FileUploadModal';
// import { useNavigate } from 'react-router';
// import axios from 'axios';
// import { apiUrl } from '../api';
// import { ToastContainer, toast } from 'react-toastify';

// const FileList = () => {
//     let navigate = useNavigate();
//     const [addModalShow, setAddModalShow] = useState(false);
//     const [searchFileName, setSearchFileName] = useState("");
//     const [tabName, setTabName] = useState("file");
//     const [allFilesData, setAllFilesData] = useState([]);
//     const [allsFilesData, setAllsFilesData] = useState([]);

//     useEffect(() => {
//         if (searchFileName) {
//             const filterDataAll = [{}];
//             console.log(searchFileName)
//             console.log(allFilesData)
//             if (allFilesData[0]) {
//                 const filterData = Object.keys(allFilesData[0]).filter(
//                     item => {
//                         return (
//                             item
//                                 .toLowerCase()
//                                 .includes(searchFileName.toLowerCase())
//                         );
//                     }
//                 );
//                 if (filterData.length > 0) {
//                     filterData.map((fData) => {
//                         filterDataAll[0][fData] = allFilesData[0][fData];
//                     })
//                     setAllsFilesData(filterDataAll)
//                 }
//             } else {
//                 setAllsFilesData(allFilesData)
//             }
//         } else {
//             setAllsFilesData(allFilesData)
//         }
//     }, [searchFileName])


//     useEffect(() => {
//         var config = {
//             method: 'post',
//             url: `${apiUrl}/listfiles`,
//         };
//         axios(config)
//             .then(function (response) {
//                 console.log(response.data)
//                 setAllFilesData([response.data]);
//                 setAllsFilesData([response.data])
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }, [])

//     function isAudioType(s) {
//         var audioTypes = [".mp3", ".wav"],
//             audioExt = s.replace(/^.+(?=\.)/i, '');
//         return (audioTypes.indexOf(audioExt.toLowerCase()) > -1);
//     }

//     const fileSummaryDetails = (fileurl) => {
//         const toastId = toast.loading("Please wait.....")
//         axios.post(`${apiUrl}/response`, {
//             filesasurl: fileurl
//         })
//             .then(res => {
//                 toast.dismiss(toastId)
//                 if (res.status === 200) {
//                     navigate("/summary", { state: { filedata: [res.data], fileType: res.data.filetype, fileUrl: fileurl } })
//                 } else {
//                     toast.error("Something went wrong.")
//                 }
//             })
//             .catch(function (error) {
//                 toast.dismiss(toastId);
//                 toast.error("Something went wrong.")
//                 console.log(error);
//             });
//     }

//     return (
//         <>

//             <TopMostNav />
//             <Container fluid>
//                 <div className='filelist-body mt-3'>
//                     <Row>
//                         <Col md={6} xs={4} className="d-flex gap-4">
//                             <h5 className='px-2' 
//                             // style={{ backgroundColor: tabName === 'file' ? '#00829B' : 'transparent' }} className={`title rounded-4 border border-gray-300 px-2 py-6 ${tabName==="file" ? "text-white" : null}`} onClick={()=>setTabName("file")}
//                             >Files</h5>
//                             {/* <button style={{ backgroundColor: tabName === 'Agent Dashboard' ? '#00829B' : 'transparent' }} className={`title rounded-4 border border-gray-300 px-2 py-6 ${tabName==="Agent Dashboard" ? "text-white " : null}`} onClick={()=>setTabName("Agent Dashboard")}>Agent Dashboard</button>
//                             <button style={{ backgroundColor: tabName === 'Customer Dashboard' ? '#00829B' : 'transparent' }}  className={`title rounded-4 border border-gray-300 px-2 py-6 ${tabName==="Customer Dashboard" ? "text-white " : null}`} onClick={()=>setTabName("Customer Dashboard")}>Customer Dashboard</button>
//                             <button style={{ backgroundColor: tabName === 'Agent List' ? '#00829B' : 'transparent' }} className={`title rounded-4 border border-gray-300 px-2 py-6 ${tabName==="Agent List" ? "text-white " : null}`} onClick={()=>setTabName("Agent List")}>Agent List</button> */}
//                         </Col>
//                         <Col md={6} xs={12}>
//                             <div className='d-flex s-bar-flex'>
//                                 <InputGroup className='search-bar' size="sm">
//                                     <FormControl
//                                         placeholder="Search file by Name"
//                                         aria-label="Search file by Name"
//                                         aria-describedby="basic-addon2"
//                                         onChange={(e) => setSearchFileName(e.target.value)}
//                                     />
//                                     <InputGroup.Text id="basic-addon2"><FaSistrix /></InputGroup.Text>
//                                 </InputGroup>
//                                 <button className='upload-btn' onClick={() => setAddModalShow(true)}>
//                                     Upload
//                                 </button>
//                             </div>
//                         </Col>
//                     </Row>
//                     <div className='allfile-list mt-3'>
//                         <Row className='h-100'>
//                             {
//                                 allsFilesData.length > 0 ? Object.keys(allsFilesData[0]).map((key, index) => {
//                                     const isAudioFileE = isAudioType(key);
//                                     return (
//                                         <Col lg={2} md={3} xs={6} key={index} className='h-100 file-div-main'>
//                                             <div className='file-div h-100' onClick={() => fileSummaryDetails(allFilesData[0][key].url)}>
//                                                 <Row className='mb-file'>
//                                                     <Col xs={6}><span>Posted by</span></Col>
//                                                     <Col xs={6} className="text-end"><span>Admin</span></Col>
//                                                 </Row>
//                                                 <img
//                                                     src={isAudioFileE ? VideoIcon : DocIcon}
//                                                     alt="docicon"
//                                                     height="45px"
//                                                 />
//                                                 <h6 className='mt-2 mb-file'>{key}</h6>
//                                                 <Row>
//                                                     <Col xs={6}><span>Posted On</span></Col>
//                                                     <Col xs={6} className="text-end"><span>27/06/2023</span></Col>
//                                                 </Row>
//                                             </div>
//                                         </Col>
//                                     )
//                                 })
//                                     : <h6>No File Found.</h6>
                            

//                         </Row>
//                     </div>
//                 </div>
//             </Container>
//             <FileUploadModal
//                 show={addModalShow}
//                 onHide={() => setAddModalShow(false)}
//             />
//             <ToastContainer />
//         </>
//     )
// }
// export default FileList


import React, { useState } from "react";

 

function SearchFilters() {

const [value, setValue] = useState(0);

const [valueId, setValueID] = useState(1);

 

const handleChange = (event) => {

console.log(event.target.value, "valuevalue");
console.log(valueId, "valuevalue");

setValue(event.target.value);

// Make the API call with the current slider value.

if(event.target.value === 25)

{setValueID(1); console.log(valueId,"valuevalue"); console.log(event.target.value, "valuevalue");}

else if (event.target.value == 50)

{setValueID(2); console.log(valueId,"valuevalue"); console.log(event.target.value, "valuevalue");}

else if (event.target.value == 75)

{setValueID(3); console.log(valueId,"valuevalue"); console.log(event.target.value, "valuevalue");}

else

{setValueID(4); console.log(valueId,"valuevalue"); console.log(event.target.value, "valuevalue");}

// Code to execute if variable does not match any of the case values

fetch(`https://fakestoreapi.com/products/${valueId}`)

.then((response) => response.json())

.then((results) => {

console.log(results, "results");

});

};

 

return (

<div>

<div className="slidecontainer">

<input

type="range"

min="0"

max="75"

value={value}

className="slider"

step={25}

id="myRange"

onChange={handleChange}

/>

</div>

<div className="value">{value}</div>

</div>

);

}

 

export default SearchFilters;