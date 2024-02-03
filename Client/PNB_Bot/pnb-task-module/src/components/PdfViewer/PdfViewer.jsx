import React, { useEffect, useState } from 'react';
import './PdfViewer.css';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import rightArrow from "../../Assets/rightArrow.svg";
import leftArrow from "../../Assets/leftArrow.svg";
import { getAllPdfUrls } from '../../apiFunctions';

const PdfViewer = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const [pdfUrls, setpdfUrls] = useState([]);
    const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

    // const queryParams = new URLSearchParams(window.location.search);
    // const pdfUrlParam = queryParams.get('pdfUrl');
    // const pdfUrl = pdfUrlParam
    // ? decodeURIComponent(pdfUrlParam) : null;
    // console.log(pdfUrl);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     if (!pdfUrl) {
    //         setError('PDF URL not provided');
    //     }
    //     else {
    //         setLoading(false);
    //     }
    // }, [pdfUrl]);


    const handleLoadSuccess = () => {
        // setLoading(false);
    };

    const handleLoadError = (error) => {
        // setLoading(false);
        // setError(`Error loading PDF: ${error.message}`);
    };

    const getAllUrls = async (values) => {
        try {
            // const res = await getAllPdfUrls();
            const res = [
                "https://storageekapoc.blob.core.windows.net/pnb-container/POL-TD-002_IDENTITY_&_ACCESS_POLICY_GartnerReviewed/page_16.pdf",
                "https://storageekapoc.blob.core.windows.net/pnb-container/POL-TD-002_IDENTITY_&_ACCESS_POLICY_GartnerReviewed/page_16.pdf",
                "https://storageekapoc.blob.core.windows.net/pnb-container/POL-TD-002_IDENTITY_&_ACCESS_POLICY_GartnerReviewed/page_16.pdf",
                "https://storageekapoc.blob.core.windows.net/pnb-container/POL-TD-002_IDENTITY_&_ACCESS_POLICY_GartnerReviewed/page_16.pdf"
            ]
            console.log(res, "res")
            setpdfUrls(res);
            setCurrentUrlIndex(0);
        }
        catch (error) {
            console.log(error?.message)
        }
    }


    const handlePrev = () => {
        setCurrentUrlIndex((prevIndex) => (prevIndex - 1 + pdfUrls.length) % pdfUrls.length);
    };

    const handleNext = () => {
        setCurrentUrlIndex((prevIndex) => (prevIndex + 1) % pdfUrls.length);
    };



    useEffect(() => {
        getAllUrls()
    }, [])
    console.log(pdfUrls[currentUrlIndex])
    return (
        <div className='pdfViewerTaskModule'>
            <div className="pdf-container">
                {pdfUrls[currentUrlIndex] && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
                        <Viewer
                            fileUrl={pdfUrls[currentUrlIndex]}
                            plugins={[defaultLayoutPluginInstance]}
                            defaultScale={1}
                            onOpenSuccess={handleLoadSuccess}
                            onOpenError={(error) => handleLoadError(error)}
                        />
                    </Worker>
                )}
            </div>
            {pdfUrls[currentUrlIndex] && <div className='changeDocumentDiv'>
                <img onClick={handlePrev} src={leftArrow} alt='' />
                <span>{`Citation ${currentUrlIndex + 1}`}</span>
                <img onClick={handleNext} src={rightArrow} alt='' />
            </div>
            }
        </div>
    );
};

export default PdfViewer;
