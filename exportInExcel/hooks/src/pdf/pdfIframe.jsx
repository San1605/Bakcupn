// import React, { useState } from 'react';
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// const PdfIframe = () => {
//   const fileurl = 'https://pdf.usaid.gov/pdf_docs/PA00JVXG.pdf';
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();
//   const [pageNumber, setPageNumber] = useState(2);

//   const changePage = (page) => {
//     setPageNumber(page);
//   };

//   return (
//     <div>
//       <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
//         <div
//           style={{
//             height: '450px',
//             maxWidth: '500px',
//             margin: '0 auto',
//           }}
//         >
//           <Viewer
//             fileUrl={fileurl}
//             plugins={[defaultLayoutPluginInstance]}
//             page={pageNumber - 1} // Set the page to display
//           />
//         </div>
//       </Worker>
//       <div>
//         <button onClick={() => changePage(3)}>Page 3</button>
//         <button onClick={() => changePage(2)}>Page 2</button>
//       </div>
//     </div>
//   );
// };

// export default PdfIframe;



import React from 'react';
import { Viewer, Worker, SpecialZoomLevel, Store, createStore } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfIframe = () => {
  const store = createStore();
  console.log(store, "store")
  // Get the current page and number of pages
  const { currentPage, numberOfPages } = store.get('currentPage') || {};

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Navigate to the next page
  const goToNextPage = () => {
    if (currentPage < numberOfPages - 1) {
        const nextPage = currentPage + 1;
        store.update('goToPage')(nextPage);
    }
};

  // Navigate to the previous page
  const goToPrevPage = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      store.update('goToPage')(prevPage);
    }
  };

  return (
    <div>
      <button onClick={goToPrevPage}>Previous</button>
      <button onClick={goToNextPage}>Next</button>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
        <div
          style={{
            height: '450px',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          <Viewer
            fileUrl="https://pdf.usaid.gov/pdf_docs/PA00JVXG.pdf"
            plugins={[defaultLayoutPluginInstance]}
            store={store}
          />
        </div>
      </Worker>
    </div>
  );
};

export default PdfIframe;