import React, { useEffect, useState } from 'react'
import "./GeneralFiles.css"
import pdfimg from "../../assets/pdf.svg"
import download from "../../assets/download.svg"
import search from "../../assets/search.svg"
import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
const GeneralFiles = () => {
    const { generalFiles, getGeneralFiles } = useContext(GlobalContext);
    const [filteredArray, setFilteredArray] = useState([]);
    useEffect(() => {
        getGeneralFiles()
    }, [])

    useEffect(() => {
        if (filteredArray.length === 0) {
            generalFiles.map((files, index) => {
                setFilteredArray((prev) => [...prev, files])
            })
        }
    }, [generalFiles])


    // console.log(filteredArray, "fiterereeerererererr")
    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'downloaded-file.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }
    const handleSearch = (text) => {
        // console.log("saerchhhhh")
        const filteredArr = generalFiles.filter((data) => data.blobname?.toLowerCase()?.includes(text?.toLowerCase())) || generalFiles;
        // console.log(filteredArr)
        setFilteredArray(filteredArr)
    }
    return (
        <div className="generalFiles">
            <div className="generalFilesDiv">
                <div className='generalfileHeading'>General Files</div>
                <div className='generalfilesinputDiv'>
                    <input type="search" placeholder='Search' onChange={(e) => {
                        handleSearch(e.target.value)
                        
                    }} />
                    <img src={search} alt="" onClick={handleSearch} />
                </div>
                <div className="generalFilesBox">
                    {
                        filteredArray?.map((file, index) => (
                            <div key={index} className="files" >
                                <img src={pdfimg} alt="" />
                                <span>{file.blobname}</span>
                                <img onClick={() => handleDownload(file.bloburl)} src={download} alt="" />
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default GeneralFiles
