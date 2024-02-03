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
import { toast } from "react-hot-toast";
import axios from "axios";


function DocsViewPage() {
  const { previewData,setPreview, setSetpreview,previewTOC } = useContext(ChatContext);
  console.log(previewData, "props")
  console.log(previewTOC, "previewTOC")
  let renderedHeaders2 = [];
  const { pdfValue, isOn, tableValue } = useContext(ChatContext);

  function replaceNewlinesWithBreaks(text) {
    return text.replace(/\n/g, "<br>");
  }
  function isHTML(input) {
    const trimmedInput = input.trim().toLowerCase();
    return trimmedInput.startsWith('<table>');
  }
  console.log(pdfValue, "anjali")
  let htmlString1 = ""

  pdfValue.length > 0 &&
    pdfValue.map((val, i) => {
      console.log(val, "val")

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


  useEffect(() => {
    if (htmlString1?.length > 0) {
      setValue(htmlString1)
    }
  }, [htmlString1, pdfValue])


  console.log(htmlString1, "htmlString1")
  console.log(value, "value");


  const saveAsDraft = (data) => {
    console.log(data, "save to data")
    if (data) {
      const toastId = toast.loading("Please Wait !!")
      const authOptions = {
        method: "post",
        url: "http://20.127.168.63:8082/save_draft_to_blob",
        data: JSON.stringify(
          {
            content: data,
            filename: "1_RFP_test"
          }
        ),
        headers: {
          "Content-Type": "application/json",
        },
        json: true,
      };

      axios(authOptions)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            toast.dismiss(toastId);
            toast.success(response.data)
          }
          toast.dismiss(toastId);
        })
        .catch((error) => {
          toast.dismiss(toastId);
          toast.error("Something went wrong");
        })

    }
    else {
      toast.error("Data is invalid !")
    }
  }


  return (
    <div>
      {/* <Header /> */}
      <Container className="mt-1">
        {/* <h4 className="mb-3">{isOn === "English" ? "Document Preview" : "معاينة الوثيقة"}</h4> */}
        <CKEditor
          editor={ClassicEditor}
          data={previewData.length > 0 ? previewData : value}
          onReady={(editor) => {
            console.log('CKEditor React Component is ready to use!', editor);
          }}

          onChange={(event, editor) => {
            const data = editor.getData();
            setValue(data)
            console.log(editor, data, "ckeditor");
          }}

          config={{
            // Add the configuration options here
            language: isOn === "English" ? "en" : 'ar',
          }}

        />

        <div className="mt-3 text-center">
          {/* pdfValue, html, type, isOn, tableValue */}

          <div className="d-flex gap-2 justify-content-center">
        <button className='save-button' onClick={() => saveAsDraft(value)}>{isOn === "English" ? "Save as Draft" : "حفظ كمسودة"}</button>
            <PDFDownloadLink
              className="pdfstyle"
              document={<Report1 pdfValue={pdfValue} value={value} type={2} isOn={isOn} setPreview={setPreview} previewTOC={previewTOC} />}
              fileName="rfp-generator-doc.pdf"
            >
              {({ blob, url, loading, error }) => {
                console.log(blob, url);
                return (
                  <Button variant="danger" style={{ fontSize: '14px' }}>
                    {loading ? isOn === "English" ? "Export as PDF" : "تصدير كملف PDF" : isOn === "English" ? "Export as PDF" : "تصدير كملف PDF"}
                  </Button>
                );
              }}
            </PDFDownloadLink>
          </div>

        </div>
      </Container>
    </div>
  );
}

export default DocsViewPage;