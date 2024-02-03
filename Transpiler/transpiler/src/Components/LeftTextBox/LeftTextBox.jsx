import React, { useState } from 'react'
import "./LeftTextBox.css"
import Sap from "../../assets/Sap.svg"
import UploadModal from '../UpLoadModal/UploadModal'
import TextModal from '../TextModal/TextModal'
import RepoModal from '../RepoModal/RepoModal'
import { Editor } from "@monaco-editor/react";
import PDFviewerplugin from '../../utils/pdf'
import ErrorBoundaries from '../../utils/ErrorBoundaries'
const LeftTextBox = ({
    textValue,
    setTextValue,
    languages
      }) => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showTextModal, setShowTextModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [showRepoModal, setShowRepoModal] = useState(false);
    // console.log(textValue, "textvlaue")
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue)
        if (selectedValue === 'File') {
            setShowUploadModal(true);
            setSelectedValue('')
        }
        if (selectedValue === 'Repo') {
            setShowRepoModal(true);
            setSelectedValue('')
        }

        // console.log(selectedValue, "aaaaaaa")
    };

    const handleChange=(e)=>{

    }
    return (
        <div className='LeftTextBox'>
            <div className="navbarLeftBox">
                <img src={Sap} alt='sap' />
                <select className='languageSelect' onChange={handleChange} >
                <option value="" hidden>Select language</option>
                    {
                        languages?.input?.map((item)=>(
                            <option value="pyspark">{item}</option>
                        ))
                    }
                    
                   
                </select>
            </div>
            <div className='leftBoxContainer'>
                <div className='leftBoxContainerUpper'>
                    {/* {
                        uploadFileData && !showTextModal && dataType === "file" ? (
                            <PDFviewerplugin fileurl={encodeURI(URL.createObjectURL(uploadFileData))} />
                        ) : dataType === "text" ? (
                            // <textarea readOnly value={textValue} className='textarea' name="" />
                            <ErrorBoundaries>
                                <Editor
                                    language="javascript"
                                    defaultLanguage='javascript'
                                    value={textValue}
                                    options={{
                                        // automaticLayout: false,
                                        readOnly: true
                                    }}
                                    placeholder="language1"
                                    className="editor"
                                />
                            </ErrorBoundaries>
                        ) : (
                            <Editor
                                language="javascript"
                                defaultLanguage='javascript'
                                value={dataRepoLink}
                                options={{
                                    // automaticLayout: false,
                                    readOnly: true
                                }}
                                placeholder="language1"
                                className="editor"
                            />
                        )
                    } */}
                    <ErrorBoundaries>
                        <Editor
                            // language="javascript"
                            defaultLanguage='abap'
                            value={textValue}
                            onChange={(value) => setTextValue(value)}
                            options={{
                                // automaticLayout: false,
                                // readOnly: true
                            }}
                            placeholder="language1"
                            className="editor"
                        />
                    </ErrorBoundaries>
                    <TextModal
                        show={showTextModal}
                        onHide={() => setShowTextModal(false)}
                        settextvalue={setTextValue}
                    />
                </div>
                <div className='leftBoxContainerLower'>
                    <select className='leftBoxContainerLowerselect' value={selectedValue} onChange={handleSelectChange}>
                        <option value="" hidden>Browse</option>
                        <option value="File">File</option>
                        <option value="Repo">Repo</option>
                    </select>
                    <button onClick={() => setShowTextModal(true)}>Text</button>
                    <button>Format</button>
                    <UploadModal
                        show={showUploadModal}
                        onHide={() => setShowUploadModal(false)}
                        settextvalue={setTextValue}
                    />
                    <RepoModal
                        show={showRepoModal}
                        onHide={() => setShowRepoModal(false)}
                        settextvalue={setTextValue}
                    />
                </div>
            </div>
        </div>
    )
}
export default LeftTextBox