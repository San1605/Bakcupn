// 
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import "./ShowPdfModal.css"
import PdfViewer from '../../Utils/PdfViewer/PdfViewer';
import { downloadIcon } from '../../Views/Admin/Assets/adminIcons';
function ShowPdfModal({ show, setShow, pdfName, pdfUrl }) {
    const handleClose = () => {
        setShow(false);
    }
    console.log(pdfUrl, 'pdfUrl')
    function handleDownload(filename, pdfUrl) {
        console.log(pdfUrl, "lllllllllllllll")
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='pdfModal'
        >
            <Modal.Header >
                <div className='modalheaderPdf'>
                    <span>{pdfName}</span>
                    <img onClick={() => handleDownload(pdfName, pdfUrl)} src={downloadIcon} alt='' />
                </div>
                <CloseButton
                    variant='white'
                    style={{ fontSize: "14px", fontWeight: "500" }}
                    onClick={() => handleClose()}
                />
            </Modal.Header>
            <Modal.Body>
                <PdfViewer pdfURL={pdfUrl} />
                {/* <iframe src={pdfUrl} title='pdf' height="100%" width="100%" /> */}
            </Modal.Body>
        </Modal>
    );
}

export default ShowPdfModal;