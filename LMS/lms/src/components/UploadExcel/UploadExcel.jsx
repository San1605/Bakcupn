import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { GlobalContext } from '../../context/GlobalContext'

const UploadExcel = () => {
    const { uploadExcelData } = useContext(GlobalContext)
    const [fruits, setfruits] = useState("");
    const [studentDataArray, setStudentDataArray] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const { getInputProps, getRootProps, acceptedFiles, isDragActive } = useDropzone({
        // accept: [".xlsx"],
        minSize: 0,
        maxFiles: 1,
        maxSize: 5242880,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                setFiles(acceptedFiles[0]);
            }
        },
    })
    const [file, setFiles] = useState("");
    // console.log(acceptedFiles);

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            setFiles(acceptedFiles[0]);
        }
    }, [acceptedFiles])


    const sendData = () => {
        if (file !== "") {
            uploadExcelData(file, "excel")
        }
        else {
            alert("please select file first")
        }

    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (name !== "" && email !== '' && course !== "") {
            setStudentDataArray((prev) => [
                ...prev,
                { name: name, email: email, course: course },
            ]);

        }
        setName("");
        setEmail("");
        setCourse("");
        console.log("inside handlesubmit")
    };

    // const handleSubmitForm = () => {
    //     setStudentDataArray((prev) => [
    //         ...prev,
    //         { name: name, email: email, course: course },
    //     ], () => {
    //         // This callback function will be called after the state update is complete.
    //         setName("");
    //         setEmail("");
    //         setCourse("");
    //     });
    // };

    useEffect(() => {
        uploadExcelData(studentDataArray, 'array');
        // setName("");
        // setEmail("");
        // setCourse("");
        console.log(studentDataArray)
    }, [studentDataArray])

    const dataListArr = [
        "Apple",
        "Banana",
        "Cherry",
        "Date",
        "Fig",
        "Grape",
    ]


    const [leftArray, setLeftArray] = useState(["i am first in left", "i am second in left", "i am third in left", "i am fourth in left"])
    const [rightArray, setRightArray] = useState(["i am first in right", "i am second in right", "i am third in right", "i am fourth in right"])

    const [selectedItemRight, setSelectedItemRight] = useState([]);
    const [selectedItemLeft, setSelectedItemLeft] = useState([]);
    const [leftCheckedArray, setLeftCheckedArray] = useState([]);
    const [rightCheckedArray, setRightCheckedArray] = useState([]);

    useEffect(() => {
        setLeftCheckedArray(leftArray.map((item) => false))
    }, [leftArray])

    useEffect(() => {
        setRightCheckedArray(rightArray.map((item) => false))
    }, [rightArray])

    const addLeft = () => {
        setLeftArray((prev) => [...prev, ...selectedItemRight]);

        selectedItemRight.forEach((item) => {
            if (rightArray.includes(item)) {
                setRightArray((prev) => { return prev.filter((data) => data !== item) })
            }
        })

    }

    const addRight = () => {
        setRightArray((prev) => [...prev, ...selectedItemLeft])
        selectedItemLeft.forEach((item) => {
            if (leftArray.includes(item)) {
                setLeftArray((prev) => { return prev.filter((data) => data !== item) })
            }
        })
    }
    console.log(selectedItemLeft, "left")
    console.log(selectedItemRight, "right")
    return (
        <div>
            {/* <div style={{
                border: "1px solid black"
            }} {...getRootProps()}>
                <input style={{
                    border: '1px solid black'
                }}  {...getInputProps()} />
                <p>{file ? file?.name : "upload"}</p>
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }

            </div>
            <button onClick={sendData}>send file to backend</button>

            <form onSubmit={(e) => {
                handleSubmitForm(e)
            }}>
                <input type="text" placeholder='Enter Full Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder='Enter Email Address' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <select name="" id="" required value={course} onChange={(e) => setCourse(e.target.value)} >
                    <option hidden value="default">Select option</option>
                    <option value="React js">React js</option>
                    <option value="Node js">Node js</option>
                    <option value="BigData">Big Data and EDW</option>
                    <option value="data Science">Data Science</option>
                </select>

                <button type='submit'>Submit</button>
            </form>


            <label htmlFor="fruits">Choose a fruit: </label>
            <input list="fruitOptions" id="fruits" name="fruits" value={fruits} onChange={(e) => setfruits(e.target.value)}/>

            <datalist id="fruitOptions" style={{backgroundColor:"red"}}>
                {
                    dataListArr?.map((item, index) => (
                        <option key={index}  value={item}>
                            <div>
                                <img src="" alt="logo" />
                                <p>{item}</p>
                            </div>
                        </option>
                    ))
                }
            </datalist>

            <button onClick={() => console.log(fruits)}>submit fruits</button> */}


            <div style={{
                border: "1px solid black",
                height: "600px",
                width: "600px",
                display: 'flex'
            }}>
                <div style={{
                    border: '1px solid black',
                    width: "40%",
                    height: "100%"
                }}>
                    {
                        leftArray?.map((item, index) => (
                            <div key={index}>
                                <input
                                checked={selectedItemLeft.includes(item)}
                                 type="checkbox" value={item} onChange={() => {
                                    if (selectedItemLeft.includes(item)) {
                                        setSelectedItemLeft((prev) => {
                                            return prev.filter((data) => data !== item)
                                        })
                                    }
                                    
                                    else {
                                        setSelectedItemLeft((prev) => [...prev, item])
                                    }

                                    // setLeftCheckedArray((prev) => {
                                    //     const newArray = [...prev];
                                    //     newArray[index] = selectedItemLeft.includes(item);
                                    //     return newArray;
                                    // });
                                }}
                                />
                                <span>{item}</span>
                            </div>
                        ))
                    }

                </div>
                <div style={{
                    border: '1px solid black',
                    width: "20%",
                    height: "100%",
                    display: "flex",
                    flexDirection: 'column'
                }}>
                    <button onClick={addRight}>&gt;</button>
                    <button onClick={addLeft}>&lt;</button>
                </div>
                <div style={{
                    border: '1px solid black',
                    width: "40%",
                    height: "100%"
                }}>
                    <div>
                        {
                            rightArray?.map((item, index) => (
                                <div key={index}>
                                    <input 
                                 checked={selectedItemRight.includes(item)}
                                    type="checkbox" value={item} onChange={() => {
                                        if (selectedItemRight.includes(item)) {
                                            setSelectedItemRight((prev) => {
                                                return prev.filter((data) => data !== item)
                                            })
                                        }
                                        else {
                                            setSelectedItemRight((prev) => [...prev, item])
                                        }
                                        // setRightCheckedArray((prev) => {
                                        //     const newArray = [...prev];
                                        //     newArray[index] = selectedItemRight.includes(item);
                                        //     return newArray;
                                        // });
                                    }} />
                                    <span>{item}</span>
                                </div>
                            ))
                        }

                    </div>

                </div>
            </div>

        </div>
    )
}
export default UploadExcel