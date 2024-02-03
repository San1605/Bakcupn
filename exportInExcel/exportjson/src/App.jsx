import React from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button, Container } from "react-bootstrap";
import PDF from './pdf';
const App = () => {
    return (
        <div>
            <Container>
                <PDFDownloadLink
                    document={<PDF date={"19 July 2023"} name={"Ritesh Sharma"} hrmid={"HRM3501"} department={"D365 & Power Apps"} start={"19-July-2023"} end={"26-July-2023."} during={"1 month"} period={"07 days"} />}
                    fileName="pip_letter.pdf"
                >
                    {({ blob, url, loading, error }) => {
                        console.log(blob, url);
                        return (
                            <Button variant="danger">Export as PDF</Button>
                        );
                    }}
                </PDFDownloadLink>
                <PDF date={"19 July 2023"} name={"Ritesh Sharma"} hrmid={"HRM3501)"} department={"D365 & Power Apps"} start={"19-July-2023"} end={"26-July-2023."} during={"1 month"} period={"07 days"} />
            </Container>
        </div>
    )
}

export default App
