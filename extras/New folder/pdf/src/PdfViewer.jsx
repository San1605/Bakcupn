// import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf';

// function PdfViewer({ pdfUrls }) {
//     const [pageNumber, setPageNumber] = useState(1);
  
//     const goToNextPage = () => {
//       if (pageNumber < pdfUrls.length) {
//         setPageNumber(pageNumber + 1);
//       }
//     };
  
//     const goToPreviousPage = () => {
//       if (pageNumber > 1) {
//         setPageNumber(pageNumber - 1);
//       }
//     };
  
//     return (
//       <div>
//         <div>
//           <button onClick={goToPreviousPage}>Previous</button>
//           <button onClick={goToNextPage}>Next</button>
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <Document file={pdfUrls[pageNumber - 1]} onLoadError={console.error}>
//             <Page pageNumber={1} />
//           </Document>
//         </div>
//       </div>
//     );
//   }
  
//   export default PdfViewer; 

import React, { useState } from 'react';
import PDF from 'react-pdf-js'
function PDFViewer({ pdfUrls }) {
  const [pdfs, setPdfs] = useState(pdfUrls)
  const [index, setIndex] = useState(1)

  return (
    <div>
      <button onClick={() => setIndex(index - 1)}>prev</button>
      <iframe
        src={pdfs[index - 1]}
        title="PDF Viewer"
        width="100%"
        height="500px"
      ></iframe>
      <button onClick={() => setIndex(index + 1)}>next</button>
    </div>
  );
}

export default PDFViewer;