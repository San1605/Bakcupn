import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Button from "../../../../components/Button/Button";
import MetaDataTable from "../MetaDataTable/MetaDataTable";
import FULL_SCREEN_ICON from "../../../../assets/icons/fullScreenIcon.svg";
import mlAnalyzedImage from "../../../../assets/background/petscan_copy.jpg";
import "./Dicom.css";

const Dicom = ({ setIsDicom, file, data }) => {
  const [src, setSrc] = useState();
  const appReducerData = useSelector((state) => state.AppReducer);

  useEffect(() => {
    var reader = new FileReader();
    reader.onload = function (e) {
      setSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  return (
    <div className="dicom-comp">
      <div className="h-100">
        <Row className="m-0 p-0 pb-2 " style={{ paddingLeft: "15px" }}>
          <Col md={10} className="p-0">
            <h3 className="heading-overview mb-1">Report Analyzer</h3>
            <h2 className="heading-homepage">Report Analyzer</h2>
          </Col>
          <Col md={2} className="d-flex justify-content-end">
            <Button
              type="primary"
              text="Back To Call"
              onClick={() => {
                setIsDicom(false);
              }}
              className="py-3 px-4 h-50 rounded"
            />
          </Col>
        </Row>
        <div className="dicomContent h-100">
          <div className="dicomContentInner">
            <div className="w-50 dicomContentLeft">
              <div className="report-dicom">
                <div className="report-dicom-header">
                  <p>
                    Report <br /> <span> MRI</span>
                  </p>
                  <div>
                    <img
                      src={FULL_SCREEN_ICON}
                      className="full-screen-icon"
                      alt=""
                      height={14}
                    />
                  </div>
                </div>
                <div
                  className="rounded overflow-hidden"
                  style={{ height: "calc(100% - 50px)" }}
                >
                  <img
                    className="h-100"
                    src={mlAnalyzedImage || src}
                    alt=""
                    height={440}
                  />
                </div>
              </div>
            </div>
            <div className="w-50">
              {(appReducerData?.dicomFile?.dataLoaded || true) && (
                <MetaDataTable data={dummyData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dicom;

const dummyData = [
  { name: "PatientName", value: "John Doe" },
  { name: "PatientID", value: "P123456" },
  { name: "PatientAge", value: "45" },
  { name: "PatientSex", value: "Male" },
  { name: "StudyDate", value: "2023-07-20" },
  { name: "StudyDescription", value: "MRI Brain without Contrast" },
  { name: "ReferringPhysician", value: "Dr. Jane Smith" },
  {
    name: "StudyInstanceUID",
    value: "1.2.345.678910.1112131415.1617181920",
  },
  { name: "SeriesDescription", value: "T1-weighted Sagittal" },
  { name: "Manufacturer", value: "GE Healthcare" },
  { name: "Modality", value: "MR" },
  { name: "MagneticFieldStrength", value: "1.5 Tesla" },
  { name: "SliceThickness", value: "5 mm" },
  { name: "PixelSpacing", value: "0.5 mm" },
  { name: "EchoTime", value: "TE=10 ms" },
  { name: "RepetitionTime", value: "TR=2000 ms" },
  { name: "InstitutionName", value: "City Medical Center" },
  { name: "StudyID", value: "S789012" },
  { name: "PatientOrientation", value: "Head First Supine" },
  { name: "ImageComments", value: "No acute abnormalities detected." },
  {
    name: "Findings",
    value: "Small non-enhancing lesion in the left parietal lobe.",
  },
  {
    name: "Impression",
    value: "Likely a benign cyst. Recommend follow-up in 6 months.",
  },
  { name: "StudyTime", value: "10:30 AM" },
  { name: "AccessionNumber", value: "A567890" },
  { name: "BodyPartExamined", value: "Brain" },
  { name: "ImageType", value: "ORIGINAL PRIMARY" },
  { name: "StudyComments", value: "Patient has history of migraines." },
  { name: "PerformedProcedureStepID", value: "P456789" },
  { name: "SeriesNumber", value: "1" },
  { name: "StudyStatusID", value: "Completed" },
  { name: "OperatorsName", value: "MRI Tech John" },
  { name: "PixelData", value: "Binary pixel data here..." },
  { name: "SOPClassUID", value: "1.2.840.10008.5.1.4.1.1.2" },
  {
    name: "SOPInstanceUID",
    value: "1.2.345.678910.1112131415.1617181920.2122232425",
  },
  { name: "PatientBirthDate", value: "1978-05-15" },
  { name: "PatientWeight", value: "70 kg" },
  { name: "SoftwareVersions", value: "MRI Software v2.3.5" },
  { name: "StationName", value: "MRI Scanner 3" },
  { name: "BodyPartThickness", value: "16 cm" },
  { name: "PatientPosition", value: "HFS" },
  { name: "SeriesTime", value: "10:45 AM" },
  { name: "AcquisitionTime", value: "10:40 AM" },
  { name: "StudyDateOfBirth", value: "1978-05-15" },
  { name: "ManufacturerModelName", value: "Signa HDxt" },
  { name: "ProtocolName", value: "Standard Brain Protocol" },
  { name: "TransferSyntaxUID", value: "1.2.840.10008.1.2.1" },
  { name: "InstanceNumber", value: "25" },
  { name: "SliceLocation", value: "45 mm" },
  { name: "PatientComments", value: "No known allergies." },
  { name: "PerformedProcedureStepDescription", value: "MRI Brain Scan" },
];
