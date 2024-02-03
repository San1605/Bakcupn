import React, { useEffect, useRef, useState } from 'react';
import styles from './serviceAgreement.module.css'

import axios from 'axios';
import { Document, Page, pdfjs } from "react-pdf";

import { baseUrl } from '../../config';

import Download from '../../assets/download.svg'
import Upload from '../../assets/upload.svg'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ServiceAgreement = () => {

    const fileInputRef = useRef(null)

    const [docAgreement, setDocAgreement] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPages, setMaxPages] = useState(1)
    const [canvasHeight, setCanvasHeight] = useState(null)
    // const [upload, setUpload] = useState(false)

    function onDocumentLoadSuccess({ numPages }) {
        setMaxPages(numPages)
    }

    const renderCanvas = ({ canvas }) => {
        setCanvasHeight(canvas.height);
    };

    const handleUpload = () => {
        fileInputRef.current.click();
    }

    const handleDownload = () => {
        if (docAgreement) {
            const a = document.createElement('a');
            a.href = docAgreement;
            a.download = 'service-agreement.pdf'; // Specify the desired file name
            a.click();
        }
    }

    const fetchURL = () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/serviceAgreement`,
        };

        axios(config)
            .then((response) => {
                setDocAgreement(response.data[0])
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchURL()
    }, [])

    const handlePage = (e) => {
        setCurrentPage(parseInt(e.target.value))
    }

    function handleFile(file) {
        const data = new FormData();
        data.append('file', file);

        let config = {
            method: 'post',
            url: `${baseUrl}/editAgreement`,
            header: {
                'Content-Type': 'multipart/form-data',
            },
            data: data
        };

        axios(config)
            .then(response => {
                if (response.data.status_code === 200) fetchURL()
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <span className={styles.headerTitle}>
                        Service Agreement
                    </span>
                    <button
                        className={styles.downloadBtn}
                        onClick={handleDownload}
                        disabled={!docAgreement}
                    >
                        <img src={Download} alt='Download' />
                    </button>
                </div>
                <div className={styles.uploadBtn} onClick={handleUpload}>
                    <input
                        type='file'
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={e => handleFile(e.target.files[0])}
                    />
                    <img src={Upload} alt='Upload' />
                    <span className={styles.buttonLabel}>
                        New Agreement
                    </span>
                </div>
            </div>
            <div className={styles.docContainer}>
                <Document
                    file={docAgreement}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page
                        pageNumber={currentPage}
                        renderTextLayer={false}
                        renderMode="canvas"
                        onRenderSuccess={renderCanvas}
                        height={canvasHeight}
                    />
                </Document>
            </div>
            <div className={styles.paginationContainer}>Page
                <input type='number' min={1} max={maxPages} value={currentPage} onChange={handlePage} className={styles.paginationInput} />
                of
                <span>{maxPages}</span>
            </div>
        </div>
    );
};

export default ServiceAgreement;