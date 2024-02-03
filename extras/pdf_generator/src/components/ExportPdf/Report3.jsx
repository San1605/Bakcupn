import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
let language = "";

const Report3 = () => {
    let isOn = "Arabic"
    language = isOn;
    const contentRef = useRef(null);
    const [value, setValue] = useState([]);
    const [res, setRes] = useState(
        {
            "answers": [
                "1. الدورة الديناميكية الحرارية هي عملية ديناميكية حرارية تتكرر وتعود إلى حالتها الأولية.",
                "2. تمثل مساحة الدورة على مخطط P-V الشغل المبذول بواسطة الغاز أو عليه.",
                "3. الشغل المبذول بواسطة الغاز الموسع في دورة واحدة يساوي التغير في الضغط مضروبا في التغير في الحجم: W = (P2 - P1) (V2 - V1).",
                "4. الشغل الذي تقوم به البيئة المحيطة على الغاز هو W = -P ، AV.",
                "5. أنا. نقل الحرارة - نقل الطاقة الحرارية بين مادتين في درجات حرارة مختلفة. التوازن الحراري - الحالة التي تكون فيها درجة الحرارة متساوية في جميع أنحاء النظام. iii. الشغل المنجز بالغاز على الوسط المحيط - W = + P2AV. iv. العمل الذي تقوم به البيئة المحيطة على الغاز - W = -P ، AV.",
                "6. الشغل المبذول بواسطة الغاز الموسع في دورة واحدة هو W = (11 - 10) (1 - 0.5) = 5 J.",
                "7. نقل الحرارة هو نقل الطاقة الحرارية بين مادتين عند درجات حرارة مختلفة ، في حين أن التوازن الحراري هو الحالة التي تكون فيها درجة الحرارة متساوية في جميع أنحاء النظام."
            ],
            "questions": [
                "1. ما هي الدورة الديناميكية الحرارية؟ (2 علامات)",
                "2. ما هي مساحة الدورة على مخطط P-V؟ (2 علامات)",
                "3. ما الشغل المبذول بواسطة الغاز الموسع في دورة واحدة؟ (2 علامات)",
                "4. ما هو الشغل الذي تقوم به البيئة المحيطة على الغاز؟ (2 علامات)",
                "5. طابق المصطلحات التالية مع تعريفاتها:\ni. نقل الحرارة ii. التوازن الحراري الثالث. الشغل المبذول بالغاز على الوسط المحيط iv. الشغل الذي تقوم به البيئة المحيطة على الغاز (3 علامات)",
                "6. احسب الشغل المبذول بواسطة الغاز الموسع في دورة واحدة بمعلومية المعلومات التالية: P1 = 10 باسكال ، P2 = 11 باسكال ، V1 = 0.5 م 3 ، V2 = 1 م 3 (3 علامات)",
                "7. ما هو الفرق بين انتقال الحرارة والتوازن الحراري؟ (2 علامات)"
            ]
        }
    );
    console.log(res, "RES")

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
            setRes(JSON.parse(result))
        })
        .catch(error => console.log('error', error))

    const handleGeneratePDF = () => {
        try {
            const content = contentRef.current;
            const options = {
                margin: [10, 10],
                filename: `question_answers.pdf`,
                fontSize: "11px",
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                // Enable page breaks
                pagebreak: { mode: ['css', 'legacy'] },
            };

            html2pdf()
                .set(options)
                .from(content)
                .save();
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    return (
        <div>
            <button className="btn btn-danger mt-3 px-4 buttondown" onClick={() => {
                setValue(res?.answers)
                console.log(value, "value")
                handleGeneratePDF()
            }}>
                Answers
            </button>
            <button className="btn btn-danger mt-3 px-4 buttondown" onClick={() => {
                setValue(res?.questions)
                handleGeneratePDF()
            }}>
                Questions
            </button>
            <div className="d-none">
                <div id="pdf-content" ref={contentRef} >
                    <div style={styles1.lastPage1}>
                        <div style={styles.section}>
                            <div className="parat" dir={isOn === "English" ? "ltr" : "rtl"}>
                                <ol style={styles.ol}>

                                    {value?.map((answer, index) => (
                                        <li key={index} style={styles.li} dangerouslySetInnerHTML={{ __html: answer }} />
                                    ))}
                                </ol>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

const styles1 = {
    page1: {
        paddingTop: 0,
        pageBreakAfter: "always",
        paddingBottom: 1,
        paddingHorizontal: 50,
        fontFamily: "NotoSansArabic",
        direction: "rtl",
        // pageBreakBefore:"always"

    },
    lastPage1: {
        paddingTop: 0,
        pageBreakInside: "avoid",
        paddingBottom: 0,
        paddingHorizontal: 50,
        fontFamily: "NotoSansArabic",
        direction: "rtl",
        // border:"2px solid black"
    },
    span: {
        fontSize: 10,
        fontFamily: "NotoSansArabic",
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
        fontFamily: "NotoSansArabic",
        marginBottom: "0px",
        color: "#555",
        lineHeight: 1.25,
        textAlign: "right",
        paddingLeft: 10,
        direction: "RTL",
        flexDirection: "row-reverse",
    },
    ol: {
        fontSize: 12,
        fontFamily: "NotoSansArabic",
        marginBottom: "0px",
        color: "#555",
        lineHeight: 1.25,
        textAlign: "right",
        paddingLeft: 10,
        direction: "RTL",
        writingMode: "horizontal-tb",

        unicodeBidi: "embed",
    },

    li: {
        fontSize: 12,
        fontFamily: "NotoSansArabic",
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
        fontFamily: "NotoSansArabic",
        color: "#000",
        textAlign: "right",
        direction: "rtl",
    },
    h4: {
        fontSize: 14,
        marginBottom: "-25px",
        fontFamily: "NotoSansArabic",
        color: "#000",
        textAlign: "right",
        direction: "rtl",
    },
    h6: {
        minWidth: "",
    },
};

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
        fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
        marginBottom: "0px",
        color: "#555",
        lineHeight: 1.25,
        textAlign: "justify",
        paddingLeft: 10,
    },
    p: {
        fontSize: 12,
        fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
        marginBottom: "0px",
        color: "#555",
        lineHeight: 1.25,
        textAlign: "justify",
        paddingLeft: 10,
    },
    h3: {
        fontSize: 16,
        marginBottom: "-25px",
        fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
        color: "#000",
        textAlign: "justify",
    },
    h4: {
        fontSize: 14,
        marginBottom: "-25px",
        fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
        color: "#000",
        textAlign: "justify",
    },
    h6: {
        minWidth: "",
    },
    heading: {
        margin: "25px 0",
        fontSize: 14,
        textAlign: "center",
        color: "#000",
        textTransform: "uppercase",
        textDecoration: "none",
        fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
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
        borderTopWidth: 1,
        paddingTop: 15,
        borderTopColor: "#112131",
        borderTopStyle: "solid",
        alignItems: "stretch",
        color: "grey",
    },
    title: {
        fontSize: 14,
        marginBottom: "5px",
        fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
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
        fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
        marginBottom: "25px",
        color: "#555",
        lineHeight: 1.25,
        textAlign: "justify",
    },
    image: {
        marginTop: 70,
        marginBottom: 25,
        // height:"30px",
        width: "100px",
        // marginHorizontal: 200,
        textAlign: "cneter",
        margin: "0 auto",
        //  border:"2px solid black"
    },
    image1: {
        marginBottom: 17,
        width: "175px",
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
        fontSize: 15,
        textAlign: "center",
        color: "#000",
        marginTop: "2px",
        fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
    },
    confidentialview: {
        marginTop: 250,
    },
    confidentialheadingtext: {
        fontSize: 14,
        textAlign: "center",
        fontWeight: 600,
        color: "#000",
        marginBottom: "10px",
        fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
    },
    confidentialheadingsubtext: {
        fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
        marginBottom: 5,
        fontSize: 11,
        textAlign: "center",
        color: "#000",
    },
    tablecontent: {
        marginTop: 10,
        marginBottom: 5,
    },
    tbcontentheading: {
        color: "#000",
        fontSize: 20,
        fontWeight: 600,
        fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
        marginBottom: 4,
        textAlign: "justify",
    },
    contenttitle: {
        fontSize: 16,
        fontWeight: 600,
        marginBottom: "10px",
        fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
        color: "#000",
        textAlign: "justify",
    },
    contentsubtitle: {
        fontSize: 12,
        fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
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
        fontSize: 17,
        fontWeight: 600,
        fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
    },
    tbcontentsubheadtext: {
        paddingLeft: 10,
        paddingBottom: 0,
        fontSize: 14,
        marginBottom: 5,
        fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
    },
    tbcontentsubheading: {
        marginTop: 0,
        marginBottom: 8,
        padding: "3px",
        fontSize: 16,
        fontWeight: 600,
        fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
    },
    tbcontentsubhead: {
        textDecoration: "none",
        color: "#000",
        fontSize: 14,
        paddingBottom: 2,
        fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
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

export default Report3;
