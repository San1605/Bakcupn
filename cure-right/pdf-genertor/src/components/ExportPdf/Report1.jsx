import React, { useRef } from "react";
import './report.css';
import { PDFExport } from "@progress/kendo-react-pdf";
//form register links and metod
// import "./report.css";
let language = "";
const Report1 = ({ value, isOn, pdfValue, type }) => {
  language = isOn;
  console.log(language, "language");

  // pdfValue.length > 0 && console.log(pdfValue, "pp1");

  let renderedHeaders = [];
  let renderedHeaders2 = [];

  function isHTML(input) {
    const trimmedInput = input.trim().toLowerCase();
    return trimmedInput.startsWith("<table>");
  }

  const contentRef = useRef(null);
  return (
    <div>
      <button className="btn btn-danger mt-3 px-4 buttondown" onClick={() => {
        if (contentRef.current) {
          contentRef.current.save();
        }
      }}>
        {isOn === "English" ? "Export as PDF" : "تصدير كملف PDF"}
      </button>
      <div className="d-none1">
        <PDFExport forcePageBreak=".page-break" ref={contentRef}
          paperSize="a4"
          margin={20}
          fileName={`RFP Report - ${new Date().getFullYear()}`}
        >
          {/* <div id="pdf-content" ref={contentRef} > */}
          <div dir={language === "English" ? "ltr" : "rtr"}>

            <div style={language === "English" ? styles.page : styles1.page1}>
              <div style={styles.section}>
                <div
                  style={
                    {
                      // display:"flex",
                      // justifyContent:"center",
                      // alignItems:"center",
                      // flexDirection:"col",
                      // textAlign:"center"
                    }
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                    className="mt-5"
                  >
                    <img
                      src="https://celebaltech.com/assets/img/celebal.webp"
                      style={styles.image}
                      alt=""
                    />
                  </div>
                  <p style={styles.heading}>
                    {isOn === "English"
                      ? "MINISTRY OF COMMUNICATIONS AND INFORMATION TECHNOLOGY"
                      : "وزارة الاتصالات وتكنولوجيا المعلومات"}
                  </p>
                </div>
                <div style={styles.usecaseview}>
                  <p style={styles.usecasetext}>
                    {isOn === "English"
                      ? "Implementation of Use cases wave 3 -"
                      : "تنفيذ حالات الاستخدام الموجة 3 -"}
                  </p>
                  <p style={styles.usecasetext}>
                    {isOn === "English"
                      ? "Smart Water and Electricity Experience and Insights"
                      : "تجربة ورؤى ذكية في مجال المياه والكهرباء"}
                  </p>
                </div>
                <div style={styles.confidentialview}>
                  <p style={styles.confidentialheadingtext}>
                    {isOn === "English"
                      ? "Confidential & Proprietary"
                      : "سرية وملكية"}
                  </p>
                  <p style={styles.confidentialheadingsubtext}>
                    {isOn === "English"
                      ? "The contents of this document are intended solely for the use of the Ministry of Transport and Communications"
                      : "محتويات هذا المستند مخصصة فقط لاستخدام وزارة النقل والاتصالات."}
                  </p>
                  <p style={styles.confidentialheadingsubtext}>
                    {isOn === "English"
                      ? "The use, duplication, or disclosure of the information is restricted to this purpose except where exempted by"
                      : "يقتصر استخدام المعلومات أو نسخها أو الكشف عنها لهذا الغرض إلا في حالة الإعفاء من ذلك"}
                  </p>
                  <p style={styles.confidentialheadingsubtext}>
                    {" "}
                    {isOn === "English"
                      ? "Implementation of Use cases wave 3 -"
                      : "بالاتفاق في أماكن أخرى."}
                  </p>
                </div>
              </div>
            </div>

            <div className="page-break" style={isOn === "English" ? styles.page : styles1.page1}>
              {/* <div style={styles.section}> */}
              <div>
                <div style={styles.imageHeading}>
                  <img
                    src="https://celebaltech.com/assets/img/celebal.webp"
                    style={styles.image1}
                    alt=""
                  />
                </div>
                <div style={styles.tableHeading}>
                  <p style={styles.tbcontentheading1}>
                    {isOn === "English"
                      ? "Table of Contents"
                      : "هل يمكنك تقديم لمحة موجزة عن الشركة المسماة Celebal Technologies وتاريخها؟"}
                  </p>
                </div>
                {/* view for the table content pdf value map for the print  heading */}
                <div style={styles.tablecontent}>
                  {pdfValue.length > 0 &&
                    pdfValue.map((val, i) => {
                      if (!renderedHeaders.includes(val.header)) {
                        // If the header hasn't been rendered, add it to the renderedHeaders array and render it
                        renderedHeaders.push(val.header);
                        return (
                          <div>
                            <p style={styles.tbcontentsubheading}>
                              {val.header}
                            </p>
                            {val.data.map((e, ii) => (
                              <>
                                <p style={styles.tbcontentsubheadtext}>
                                  <p
                                    style={styles.tbcontentsubhead}
                                  // href={`nav${ii}`}
                                  >
                                    {` ${e.name}`}
                                  </p>
                                </p>
                              </>
                            ))}
                          </div>
                        );
                      } else {
                        return (
                          <div>
                            {val.data.map((e, ii) => (
                              <>
                                <p style={styles.tbcontentsubheadtext}>
                                  <p
                                    style={styles.tbcontentsubhead}
                                  // href={`nav${ii}`}
                                  >
                                    {` ${e.name}`}
                                  </p>
                                </p>
                              </>
                            ))}
                          </div>
                        );
                      }
                    })}

                  <div></div>
                </div>
              </div>
            </div>

            <div style={isOn === "English" ? styles.lastPage : styles1.lastPage1} className={isOn === "English" ? "eng-content" : "arbic-content"}>
              <div className="page-break"></div>
              <div style={styles.section} className="main-content">
                {type === 1 ? (
                  <>
                    {pdfValue.length > 0 &&
                      pdfValue.map((val, i) => {
                        if (!renderedHeaders2.includes(val.header)) {
                          renderedHeaders2.push(val.header);

                          return (
                            <div style={styles.response}>
                              <p style={styles.tbcontentheading} key={i}>
                                {` ${val.header}`}
                              </p>
                              {val.data.map((items, ii) => {
                                return (
                                  <div style={styles.response1}>
                                    <p
                                      style={styles.contenttitle}
                                      id={`nav${ii}`}
                                      key={i}
                                    >
                                      {` ${items.name}`}
                                    </p>
                                    {items.value !== "" ? (
                                      isHTML(items.value) ? (
                                        <div
                                          style={
                                            isOn === "English"
                                              ? styles
                                              : styles1
                                          }
                                          className="para parat"
                                        >
                                          <div
                                            className="para parat"
                                            dir={
                                              isOn === "English"
                                                ? "ltr"
                                                : "rtl"
                                            }
                                            dangerouslySetInnerHTML={{
                                              __html: items.value,
                                            }}
                                          ></div>
                                        </div>
                                      ) : (
                                        <p
                                          className="para"
                                          style={styles.contentsubtitle}
                                        >
                                          {items.value}
                                        </p>
                                      )
                                    ) : (
                                      <p
                                        className="para"
                                        style={styles.contentsubtitle}
                                      >
                                        No data found.
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        } else {
                          return (
                            <div style={styles.response}>
                              {val.data.map((items, ii) => {
                                return (
                                  <div style={styles.response1}>
                                    <p
                                      style={styles.contenttitle}
                                      id={`nav${ii}`}
                                    >
                                      {` ${items.name}`}
                                    </p>
                                    <p style={styles.contentsubtitle}>
                                      {items.value !== "" ? (
                                        isHTML(items.value) ? (
                                          <div
                                            style={
                                              isOn === "English"
                                                ? styles
                                                : styles1
                                            }
                                            className="para parat"
                                          >
                                            <div
                                              className="para parat"
                                              dir={
                                                isOn === "English"
                                                  ? "ltr"
                                                  : "rtl"
                                              }
                                              dangerouslySetInnerHTML={{
                                                __html: items.value,
                                              }}
                                            ></div>
                                          </div>
                                        ) : (
                                          <p
                                            className="para"
                                            style={styles.contentsubtitle}
                                          >
                                            {items.value}
                                          </p>
                                        )
                                      ) : (
                                        <p
                                          className="para"
                                          style={styles.contentsubtitle}
                                        >
                                          No data found.
                                        </p>
                                      )}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }
                      })}
                  </>
                ) : (
                  <div className="parat" dir={isOn === "English" ? "ltr" : "rtl"}>
                    <div

                      dir={isOn === "English" ? "ltr" : "rtl"}
                      dangerouslySetInnerHTML={{ __html: value }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </PDFExport>
      </div>
    </div>
  );
};

const styles1 = {
  page1: {
    paddingTop: 0,
    paddingBottom: 1,
    paddingHorizontal: 50,
    fontFamily: "",
    direction: "rtl",
    fontFamily: "NotoSansArabic"
  },
  lastPage1: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 50,
    fontFamily: "",
    direction: "rtl",
  },
  span: {
    fontSize: 10,
    fontFamily: "",
    marginBottom: "0px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "right",
    paddingLeft: 10,
    direction: "rtl",
  },
  contentitems: {
    width: "300px",
    minWidth: "400px",
    flex: 1,
    alignItems: "flex-end", // Align items to the end to achieve RTL direction
    paddingRight: 20,
  },
  p: {
    fontSize: 12,
    fontFamily: "",
    marginBottom: "0px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "right",
    paddingLeft: 10,
    direction: "RTL",
  },
  ol: {
    fontSize: 12,
    fontFamily: "",
    marginBottom: "0px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "right",
    paddingLeft: 10,
    direction: "RTL",
  },

  li: {
    fontSize: 12,
    fontFamily: "",
    marginBottom: "0px",
    color: "#555",
    lineHeight: 1.25,
    // textAlign: "right",
    paddingLeft: 10,
    rotate: 180, // Rotate the list item content to achieve RTL effect
    rotateOrigin: "right top",
    direction: "LTR",
    flexDirection: "row-reverse",
    writingMode: "horizontal-tb",
    unicodeBidi: "embed",
  },

  table: {
    width: "1000px",
    borderCollapse: "collapse",
    tableLayout: "auto",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  th: {
    padding: "8px",
    fontWeight: "bold",
    border: "1px solid #ccc",
    fontSize: "12px",
  },
  td: {
    padding: "8px",
    border: "1px solid #ccc",
    fontSize: "11px",
  },

  tr: {
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  h3: {
    fontSize: 5,
    marginBottom: "-25px",
    fontFamily: "",
    color: "#000",
    textAlign: "right",
    direction: "rtl",
  },
  h4: {
    fontSize: 14,
    marginBottom: "-25px",
    fontFamily: "",
    color: "#000",
    textAlign: "right",
    direction: "rtl",
  },
  h6: {
    minWidth: "",
  },
};

//inline style defirn.
const styles = {
  page: {
    paddingTop: 0,
    paddingBottom: 1,
    pageBreakAfter: "always",
    paddingHorizontal: 50,
    // border:"2px solid black"
  },
  page1: {
    paddingTop: 0,
    pageBreakAfter: "always",
    paddingBottom: 0,
    paddingHorizontal: 50,
    fontFamily: "NotoSansArabic",
    direction: "rtl",
    // border:"2px solid black"
  },
  lastPage: {
    paddingTop: 0,
    paddingBottom: 0,
    pageBreakInside: "avoid",
    paddingHorizontal: 50,
    // border:"2px solid black"
  },
  contentitems: {
    width: "300px",
    minWidth: "400px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "auto",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  th: {
    padding: "8px",
    fontWeight: "bold",
    border: "1px solid #ccc",
    fontSize: "12px",
  },
  td: {
    padding: "8px",
    border: "1px solid #ccc",
    fontSize: "11px",
  },
  tr: {
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  span: {
    fontSize: 12,
    fontFamily: "",
    marginBottom: "0px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "justify",
    paddingLeft: 10,
  },
  p: {
    fontSize: 12,
    fontFamily: "",
    marginBottom: "0px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "justify",
    paddingLeft: 10,
  },
  h3: {
    fontSize: 16,
    marginBottom: "-25px",
    fontFamily: "",
    color: "#000",
    textAlign: "justify",
  },
  h4: {
    fontSize: 14,
    marginBottom: "-25px",
    fontFamily: "",
    color: "#000",
    textAlign: "justify",
  },
  h6: {
    minWidth: "",
  },
  heading: {
    margin: "25px 0",
    fontSize: 12,
    textAlign: "center",
    color: "#000",
    textTransform: "uppercase",
    textDecoration: "none",
    fontFamily: "",
  },
  ftitle: {
    margin: 10,
    fontSize: 12,
    textAlign: "center",
    backgroundColor: "#CF2F21",
    textTransform: "uppercase",
    color: "#000",
    padding: 5,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 15,
    left: 0,
    right: 0,
    textAlign: "center",
    // borderTopWidth: 1,
    paddingTop: 15,
    // borderTopColor: "#112131",
    // borderTopStyle: "solid",
    alignItems: "stretch",
    color: "grey",
  },
  title: {
    fontSize: 14,
    marginBottom: "5px",
    fontFamily: "",
    color: "#000",
    textAlign: "justify",
  },
  response: {
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
    textAlign: "justify",
  },
  response1: {
    marginTop: 7,
    textAlign: "justify",
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "",
    marginBottom: "25px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "justify",
  },
  image: {
    marginTop: 70,
    marginBottom: 50,
    // height:"30px",
    width: "150px",
    // marginHorizontal: 200,
    textAlign: "cneter",
    margin: "0 auto",
    //  border:"2px solid black"
  },
  image1: {
    marginBottom: 17,
    width: 150,
    marginHorizontal: 335,
    display: "flex",
    alignSelf: "center",
  },
  usecaseview: {
    marginTop: 180,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: "#112131",
    borderTopStyle: "solid",
    alignItems: "stretch",
    padding: "25px 0",
  },
  usecasetext: {
    fontSize: 13,
    textAlign: "center",
    color: "#000",
    marginTop: "2px",
    fontFamily: "",
  },
  confidentialview: {
    marginTop: 175,
  },
  confidentialheadingtext: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: 600,
    color: "#000",
    marginBottom: "10px",
    fontFamily: "",
  },
  confidentialheadingsubtext: {
    fontFamily: "",
    marginBottom: 5,
    fontSize: 11,
    textAlign: "center",
    color: "#555",
  },
  tablecontent: {
    marginTop: 10,
    marginBottom: 5,
  },
  tbcontentheading: {
    color: "#000",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "",
    marginBottom: 4,
    textAlign: "justify",
  },
  contenttitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: "10px",
    fontFamily: "",
    color: "#000",
    textAlign: "justify",
  },
  contentsubtitle: {
    fontSize: 12,
    fontFamily: "",
    marginBottom: "10px",
    color: "#555",
    lineHeight: 1.25,
    textAlign: "justify",
  },
  inlineRadio: {
    display: "flex",
  },
  radioPre: {
    content: "() ",
  },
  tbcontentheading1: {
    color: "#208EDD",
    marginBottom: 0,
    padding: "3px",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: ""
  },
  tbcontentsubheadtext: {
    paddingLeft: 10,
    paddingBottom: 0,
    fontSize: 12,
    marginBottom: 1,
    fontFamily: ""
  },
  tbcontentsubheading: {
    marginTop: 0,
    marginBottom: 8,
    padding: "3px",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: ""
  },
  tbcontentsubhead: {
    textDecoration: "none",
    color: "#000",
    fontSize: 12,
    paddingBottom: 1,
    marginBottom: 5,
    fontFamily: ""
  },
  imageHeading: {
    display: "flex",
    justifyContent: language === "English" ? "start" : "end",
  },

  tableHeading: {
    display: "flex",
    justifyContent: language === "English" ? "end" : "star",
  },
};

export default Report1;
