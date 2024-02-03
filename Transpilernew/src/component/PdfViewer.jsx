import React from 'react'
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFviewer = ({ fileurl }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
            <div
                style={{
                    height: "100%",
                    maxWidth: "100%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                <Viewer
                    fileUrl={fileurl}
                    plugins={[defaultLayoutPluginInstance]}
                >
                </Viewer>
            </div>
        </Worker>
    )
}
export default PDFviewer
