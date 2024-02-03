import React, { useEffect, useState } from "react";
import Html from "react-pdf-html";
import NotoSansArabicFont from "../../assets/NotoSansArabic-Regular.ttf";

//import react pdf
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Font,
} from "@react-pdf/renderer";

//form register links and metod
Font.register({
  family: "Open Sans",
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
  family: "NotoSansArabic",
  src: NotoSansArabicFont,
});


Font.register({
  family: "Lato",
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
  family: "Lato Italic",
  src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

// Font.register({
//   family: "Times New Roman",
//   src: "../../assets/TimesNewRoman.ttf"
// });

let language = "";
const ReportEdit = ({isOn, value }) => {

console.log(value,"value in report edit")

  language = isOn;


  return (
    <Document>

      <Page
        style={isOn === "English" ? styles.page : styles1.page1}
        size="A4"
        wrap
      >
        <View 
        style={styles.section}
        >
            <View dir={isOn === "English" ? "ltr" : "rtl"} >
              <Html dir={isOn === "English" ? "ltr" : "rtl"} 
               stylesheet={isOn === "English" ?styles : styles1}
              >
                {value}
              </Html>
            </View>
        </View>
      
      </Page>
    </Document>
  );
};

const styles1 = StyleSheet.create({

  page1: {
    paddingTop: 35,
    // flexDirection: 'row-reverse',
    paddingBottom: 65,
    paddingHorizontal: 50,
    // fontFamily: "",
    direction: "rtl",
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
    alignItems: 'flex-end', // Align items to the end to achieve RTL direction
    paddingRight: 20,
  },
  p: {
    fontSize: 10,
    fontFamily: "NotoSansArabic",
    marginBottom: "0px",
    color: "#262626",
    lineHeight: 1.25,
    textAlign: "right",
    paddingLeft: 10,
    direction: "RTL",
    flexDirection: "row-reverse"
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
    writingMode: 'horizontal-tb',

    unicodeBidi: 'embed',
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
    rotateOrigin: 'right top',
    direction: "LTR",
    flexDirection: "row-reverse",
    writingMode: 'horizontal-tb',
    unicodeBidi: 'embed',
  },

  table: {
    width: "1000px",
    borderCollapse: "collapse",
    tableLayout: "auto"
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  th: {
    padding: "8px",
    fontWeight: "bold",
    border: "1px solid #ccc",
    fontSize: "10px",

  },
  td: {
    padding: "8px",
    border: "1px solid #ccc",
    fontSize: "9px",
  },

  tr: {
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  h3: {
    fontSize: 4,
    marginBottom: "-25px",
    fontFamily: "NotoSansArabic",
    color: "#000",
    textAlign: "right",
    direction: "rtl",
  },
  h4: {
    fontSize: 12,
    marginBottom: "-25px",
    fontFamily: "NotoSansArabic",
    color: "#000",
    textAlign: "right",
    direction: "rtl",
  },
  h6: {
    minWidth: ""
  }
});

//inline style defirn.
const styles = StyleSheet.create({
  page: {
    pageBreakAfter: "always",
    paddingTop: 25,
    paddingBottom: 50,
    paddingHorizontal: 50,
  },
  page1: {
    pageBreakAfter: "always",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 50,
    // fontFamily: "NotoSansArabic",
    direction: "rtl",
  },
  contentitems: {
    width: "300px",
    minWidth: "400px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "auto"
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
    fontSize: 10,
    fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
    marginBottom: "0px",
    color: "#262626",
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
    direction: language === "English" ? "ltr" : "rtl",
  },
  h4: {
    fontSize: 14,
    marginBottom: "-25px",
    fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
    color: "#000",
    textAlign: "justify",
    direction: language === "English" ? "ltr" : "rtl",
  },
  // ol: {
  //   fontSize: 14,
  //   marginBottom: "-25px",
  //   fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
  //   color: "#000",
  //   textAlign: "right",
  //   direction: language === "English" ? "ltr" : "rtl",
  // },
  // li: {
  //   fontSize: 14,
  //   marginBottom: "-25px",
  //   fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
  //   color: "#000",
  //   textAlign: "right",
  //   direction: language === "English" ? "ltr" : "rtl",
  // },
  h6: {
    minWidth: ""
  },
  heading: {
    margin: "25px 0",
    fontSize: 13,
    fontWeight: 800,
    textAlign: "center",
    color: "#000",
    textTransform: "uppercase",
    textDecoration: "none",
    direction: language === "English" ? "ltr" : "rtl",
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
    direction: language === "English" ? "ltr" : "rtl",
    color: "#000",
    textAlign: "justify",
  },
  response: {
    marginTop: 1,
    marginBottom: 10,
    paddingBottom: 10,
    textAlign: "justify",
  },
  response1: {
    marginTop: 2,
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
    direction: language === "English" ? "ltr" : "rtl",
  },
  image: {
    marginTop: 70,
    marginBottom: 25,
    width: "100px",
    marginHorizontal: 200,
    display: "flex",
    alignSelf: "center",
  },
  image1: {
    marginBottom: 17,
    width: "175px",
    marginHorizontal: 335,
    display: "flex",
    alignSelf: "end",
  },
  pagetopheading: {
    fontSize: 10,
    fontWeight: 700,
    color: "#9b9b9b",
  },
  usecaseview: {
    marginTop: 110,
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
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginTop: "5px",
    marginBottom: "5px",
    // fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
    // direction: language === "English" ? "ltr" : "rtl",
  },
  confidentialview: {
    marginTop: 175,
  },
  confidentialheadingtext: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
    marginBottom: "0px",
    fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
    direction: language === "English" ? "ltr" : "rtl",
  },
  confidentialheadingsubtext: {
    fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
    direction: language === "English" ? "ltr" : "rtl",
    fontSize: 9,
    textAlign: "center",
    color: "#000",
    lineHeight: 1.25
  },
  tablecontent: {
    marginTop: 1,
    marginBottom: 0,
  },
  tbcontentheading: {
    marginTop: 0,
    color: "#000",
    fontSize: 15,
    fontFamily: language === "English" ? "Lato Bold" : "NotoSansArabic",
    marginBottom: 1,
    textAlign: "justify",
    direction: language === "English" ? "ltr" : "rtl",
  },
  contenttitle: {
    fontSize: 13,
    marginBottom: "2px",
    fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
    color: "#000",
    textAlign: "justify",
    direction: language === "English" ? "ltr" : "rtl",
  },
  contentsubtitle: {
    fontSize: 10,
    fontFamily: language === "English" ? "Lato" : "NotoSansArabic",
    marginBottom: "10px",
    color: "#262626",
    lineHeight: 1.25,
    textAlign: "justify",
    direction: language === "English" ? "ltr" : "rtl",
  },
  inlineRadio: {
    display: "flex"
  },
  radioPre: {
    content: "() "
  },
  tbcontentheading1: {
    color: "#365F91",
    marginBottom: 0,
    padding: "0px",
    fontSize: 13,
    fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
    direction: language === "English" ? "ltr" : "rtl",
  },
  tbcontentsubheadtext: {
    paddingLeft: 10,
    paddingBottom: 0,
    fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
    direction: language === "English" ? "ltr" : "rtl",
  },
  tbcontentsubheading: {
    marginTop: 2,
    padding: "1px",
    fontSize: 12,
    lineHeight: 1.75,
    fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
    direction: language === "English" ? "ltr" : "rtl",
  },
  tbcontentsubhead: {
    textDecoration: "none",
    color: "#000",
    fontSize: 11,
    paddingBottom: 0,
    fontFamily: language === "English" ? "Open Sans" : "NotoSansArabic",
    direction: language === "English" ? "ltr" : "rtl",
    lineHeight: 1.60
  },
});

export default ReportEdit;
