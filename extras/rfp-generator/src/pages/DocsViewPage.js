import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header/Header";
import ChatContext from "../Context/Context";
import { Button, Container } from "react-bootstrap";
import "../App.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Report1 from "../components/ExportPdf/Report1";
import ReportArbic from "../components/ExportPdf/ReportArbic";
import { PDFDownloadLink } from "@react-pdf/renderer";


function DocsViewPage() {
  let renderedHeaders2 = [];
  const { pdfValue, isOn, tableValue } = useContext(ChatContext);
  function replaceNewlinesWithBreaks(text) {
    return text.replace(/\n/g, "<br>");
  }
  function isHTML(input) {
    const trimmedInput = input.trim().toLowerCase();
    return trimmedInput.startsWith('<table>');
  }
  //   let htmlString1 =`
  //  <p>A paragraph is a collection of words strung together to make a longer unit than a sentence. Several sentences often make a paragraph. There are normally three to eight sentences in a paragraph. Paragraphs can start with a five-space indentation or by skipping a line and then starting over. This makes it simpler to tell when one paragraph ends and the next starts simply it has 3-9 lines.

  //   A topic phrase appears in most ordered types of writing, such as essays. This paragraph's topic sentence informs the reader about the topic of the paragraph. In most essays, numerous paragraphs make statements to support a thesis statement, which is the essay's fundamental point.</p>

  //   `

  let htmlString1 = ""

  pdfValue.length > 0 &&
    pdfValue.map((val, i) => {
      if (!renderedHeaders2.includes(val.header)) {
        renderedHeaders2.push(val.header);
        return (
          <>
            {htmlString1 += `<h3>${val.header}</h3>`}
            {val.data.map((items) => {
              return (
                <>
                  {htmlString1 += `<h4 id={nav-${items.name}}>&nbsp;&nbsp;&nbsp;${items.name}</h4>`}

                  {htmlString1 += `<p class="para" style="font-size: 12px">${items.value !== ""
                    ? isHTML(items.value) ? items.value : replaceNewlinesWithBreaks(items.value) : "No data found."}</p>`}

                </>
              );
            })}
            {/* {htmlString1 += `<p style="font-size: 16px">${val.value !== "" ? val.value : "No data found."}</p>`} */}
          </>
        );
      } else {
        return (
          <>
            {htmlString1 += `<h3>${val.header}</h3>`}
            {val.data.map((items) => {
              return (
                <>
                  {htmlString1 += `<h4>&nbsp;&nbsp;&nbsp;${items.name}</h4>`}

                  {htmlString1 += `<p style="font-size: 12px" class="para">${items.value !== ""
                    ? isHTML(items.value) ? items.value : replaceNewlinesWithBreaks(items.value) : "No data found."}</p>`}

                </>
              );
            })}
            {/* {htmlString1 += `<p style="font-size: 16px">${val.value !== "" ? val.value : "No data found."}</p>`} */}
          </>
        );
      }
    })

  const [value, setValue] = useState(htmlString1);

  return (
    <div>
      <Header />
      <Container className="mt-3">
        <h4 className="mb-3">{isOn === "English" ? "Document Preview" : "معاينة الوثيقة"}</h4>

        <CKEditor
          editor={ClassicEditor}
          data={value}
          onReady={(editor) => {
            console.log('CKEditor React Component is ready to use!', editor);
          }}

          onChange={(event, editor) => {
            const data = editor.getData();
            setValue(data)
            // console.log({ event, editor, data });
          }}

          config={{
            // Add the configuration options here
            language: isOn === "English" ? "en" : 'ar',
          }}

        />

        <div className="mt-3 text-center">
          {/* pdfValue, html, type, isOn, tableValue */}

          <PDFDownloadLink
            document={
            <Report1/>
          }
            fileName="rfp-generator-doc.pdf"
          >
            {({ blob, url, loading, error }) => {
              console.log(blob, url);
              return (
                <Button variant="danger">
                  {loading ? isOn === "English" ? "Export as PDF" : "تصدير كملف PDF" : isOn === "English" ? "Export as PDF" : "تصدير كملف PDF"}
                </Button>
              );
            }}
          </PDFDownloadLink>
        </div>
      </Container>
    </div>
  );
}
export default DocsViewPage;