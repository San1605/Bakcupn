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
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import "./docsview.css"
import profile from "../assets/images/profile.svg";
import ct_logo from '../assets/images/ct_logo.svg';
import ReportEdit from "../components/ExportPdf/ReportEdit";
import "./docsview2.css"
import workerScriptURL from "./worker.js"
function DocsViewPage2() {

  const { pdfValue, isOn, tableValue } = useContext(ChatContext);
  let navigate = useNavigate();
  const [value, setValue] = useState("");
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

  const location = useLocation()
  const pdfUrl = location.state?.pdfUrl;
  const blobUrl = location.state?.blobUrl;

  // const removeInlineStylesAndClasses = (htmlContent) => {
  //   if (!htmlContent) return "";
  //   let contentWithoutStyles = htmlContent.replace(/ style=("([^"]*)"|'([^']*)')/g, '');
  //   contentWithoutStyles = contentWithoutStyles.replace(/<figure/g, '<div').replace(/<\/figure/g, '</div');
  //   const contentWithDivs = contentWithoutStyles.replace(/ class="[^"]*"/g, '');
  //   return contentWithDivs;
  // };

  // useEffect(() => {
  //   if (pdfContentStyle && pdfContentStyle?.length > 0) {
  //     //  setValue(removeInlineStylesAndClasses(pdfContentStyle))
  //     setValue(pdfContentStyle)
  //   }
  // }, [])


  // useEffect(() => {
  //   if (pdfContentStyle && pdfContentStyle?.length > 0) {
  //     const worker = new Worker(workerScriptURL);
  //     worker.postMessage(pdfContentStyle);
  //     worker.addEventListener('message', (event) => {
  //       const processedContent = event.data;
  //       setValue(processedContent);
  //     });
  //   }
  // }, []);
  console.log(pdfUrl, "pdfUrl")
  console.log(blobUrl, "blobUrl")
  return (
    <div>
      <div className='landing_heading' style={{ marginBottom: '1rem' }}>
        <div>
          <img src={ct_logo} style={{ width: '5.5rem' }} alt="" className="ms-5 " />
        </div>
        <div>
          <button className='create-button me-3' onClick={() => navigate(-1)}>Back</button>
          <button className='create-button me-3' onClick={() => navigate("/home")}>Create new RFP</button>
          <img src={profile} style={{ width: '1.3rem' }} alt="" className="profile_img me-5 cursor-pointer" onClick={() => navigate("/Profile")} />
        </div>
      </div>

      <Container className="mt-1" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
    
    
        {/* <CKEditor
          // style={{ height: pdfUrl ? "68vh" : "38vh" }}
          editor={ClassicEditor}
          data={value}
          onReady={(editor) => {
            console.log('CKEditor React Component is ready to use!', editor);
          }}

          // onChange={(event, editor) => {
            // const data = editor.getData();
            // setValue(removeInlineStylesAndClasses(data))
            //  setValue(data)
            // console.log(editor, data, "ckeditor");
          // }}

          config={{
            // Add the configuration options here
            language: isOn === "English" ? "en" : 'ar',
          }}

        /> */}


        <div style={{
          width: '90vw',
          height: "78vh"
        }}>

          {
            blobUrl !== undefined ?
              (
                <iframe width="100%" height="100%" src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(blobUrl)}`}></iframe>
              )
              :
              (
                <div>I have no pdf to show</div>
              )
          }

        </div>

        <div className="mt-3 text-center">

          {/* pdfValue, html, type, isOn, tableValue */}

          <div className="d-flex gap-2 justify-content-center">
            {/* <button className='save-button' onClick={() => saveAsDraft(value)}>{isOn === "English" ? "Save as Draft" : "حفظ كمسودة"}</button> */}

            {
              pdfUrl !== undefined &&
              <button className='save-button'>
                <a style={{ textDecoration: "none", color: "white" }} href={pdfUrl}
                  target="_blank">
                  Edit Pdf
                </a>
              </button>
            }

            {/* <PDFDownloadLink
              className="pdfstyle"
              document={
                //   <Report1 pdfValue={pdfValue} value={value} type={2} isOn={isOn} />
                <ReportEdit value={value} isOn={isOn} />
              }
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
            </PDFDownloadLink> */}
          </div>

        </div>
      </Container>
    </div>
  );
}

export default DocsViewPage2;