import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react'
import "./TextModal.css"
import CloseButton from 'react-bootstrap/esm/CloseButton';
import { Editor } from '@monaco-editor/react';
import ErrorBoundaries from '../../utils/ErrorBoundaries';

const TextModal = (props) => {
    const [textArea, setTextArea] = useState("");
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className=''
        >
            <Modal.Header >
                <div className='textModalHeading'>Text</div>
                <CloseButton
                    style={{ fontSize: "14px" }}
                    onClick={() => props.onHide()}
                />
            </Modal.Header>
            <div className="line"></div>
            <Modal.Body>
                <div className='textModal'>
                    <ErrorBoundaries>
                        <Editor
                            // language="javascript"
                            defaultLanguage='abap'
                            // theme="vs-dark"
                            value={textArea}
                            onChange={(value) => setTextArea(value)}
                            // options={{ automaticLayout: false }}
                            placeholder="Type your code here"
                            className="editor"
                        />
                    </ErrorBoundaries>

                    {/* <textarea value={textArea} className='textarea' placeholder='Start Writing...' onChange={(e) => setTextArea(e.target.value)} /> */}
                    <div className="textModalBottom">
                        <button className='textModalCancelButton'
                            onClick={() => props.onHide()}>Cancel</button>
                        <button
                            onClick={() => {
                                if (textArea !== '') {
                                    props.settextvalue(textArea)
                                    // setTextArea("")
                                }
                                props.onHide()
                            }}
                            className='textModalSubmitButton'>Submit</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default TextModal