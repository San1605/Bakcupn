import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header/Header";
import ChatContext from "../Context/Context";
import { Container } from "react-bootstrap";
import "../App.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Report1 from "../components/ExportPdf/Report1";
import ReportArbic from "../components/ExportPdf/ReportArbic";

import Report3 from "../components/ExportPdf/Report3";
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
                  {htmlString1 += `<h4>&nbsp;&nbsp;&nbsp;${items.name}</h4>`}

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
            {htmlString1 += `<h3 style="font-size: 10px">${val.header}</h3>`}
            {val.data.map((items) => {
              return (
                <>
                  {htmlString1 += `<h4 style="font-size: 10px" >&nbsp;&nbsp;&nbsp;${items.name}</h4>`}

                  {htmlString1 += `<p style="font-size: 10px" class="para">${items.value !== ""
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

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    "topic": "دورة الديناميكا الحرارية"
  });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch("https://moe-arabic.azurewebsites.net/generate_test_paper", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(JSON.parse(result))
      // setValue(result)
    })
    .catch(error => console.log('error', error))



  return (
    <div>
      <Header />
      <Container className="mt-3">
        {/* <h4 className="mb-3">{isOn === "English" ? "Document Preview" : "معاينة الوثيقة"}</h4> */}
{/* 
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onReady={(editor) => {
            // console.log('CKEditor React Component is ready to use!', editor);
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
        /> */}


        <div className="mt-2">
          {/* pdfValue, html, type, isOn, tableValue */}

          {
            isOn === "English" ?


              <Report1
                pdfValue={pdfValue}
                value={value}
                type={2}
                isOn={isOn}
              />

              :
              <Report3
                pdfValue={pdfValue}
                value={value}
                type={2}
                isOn={isOn}
              />

              // <ReportArbic
              //   pdfValue={pdfValue}
              //   value={value}
              //   type={2}
              //   isOn={isOn}
              // />
          }

        </div>
      </Container>
    </div>
  );
}

export default DocsViewPage;