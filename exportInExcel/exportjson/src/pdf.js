import React from "react";
import logo from "./assets/logo_celebal.png";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Font,
    Link,
} from "@react-pdf/renderer";

// ... Font registration and other code ...

const PDF = ({
    date,
    name,
    hrmid,
    department,
    start,
    end,
    during,
    period,
}) => {
    return (
        <Document>
            <Page style={styles.page} size="A4" wrap>

                <View style={styles.header}>
                    <Text style={styles.PdfTopic}>PERFORMANCE IMPROVEMENT PLAN</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.subSection1}>
                        <Text style={styles.text}>To,</Text>
                        <Text style={styles.text}>{date}</Text>
                    </View>
                    <View style={styles.subSection2}>
                        <Text style={styles.text}><Text style={styles.boldText}>Employee Name:</Text> {name}</Text>
                        <Text style={styles.text}><Text style={styles.boldText}>HRM ID:</Text> {hrmid}</Text>
                        <Text style={styles.text}><Text style={styles.boldText}>Department:</Text> {department}</Text>
                    </View>

                    <View style={styles.subSection3}>
                        <Text style={styles.subValue}>
                            Sub: <Text style={styles.boldText}>Performance Improvement Plan</Text>
                        </Text>
                    </View>

                    <View style={styles.subSection4}>
                        <Text style={styles.para}>
                            Dear {name?.split(" ")[0]},
                        </Text>
                        <Text style={styles.para}>
                            This is in reference to the discussion held between you and your RM
                            in the presence of the HR team. This is to confirm that you will be
                            on a performance improvement plan w.e.f <Text style={styles.boldText}>{start}</Text> till <Text style={styles.boldText}>{end}</Text>.
                        </Text>
                        <Text style={styles.para}>
                            As you are aware, we expect certain standards of performance from
                            every intern and during the last <Text style={styles.boldText}>{during}</Text>, we found that your
                            performance did not meet the expectations for the role. However, as
                            a company policy, we are providing you with an opportunity to
                            better your performance during this period of <Text style={styles.boldText}>{period}</Text>.
                        </Text>
                        <Text style={styles.para}>
                            Please note that your manager will review your performance on a
                            weekly basis during this time. We request you to collaborate with
                            your manager to enhance your performance in the areas of improvement
                            shared with you.
                        </Text>
                        <Text style={styles.para}>
                            After <Text style={styles.boldText}>{period}</Text>, there will be one performance assessment interview
                            scheduled for you, to evaluate your performance.
                        </Text>
                        <Text style={styles.para}>
                            However, please note that your terms of traineeship will be revisited
                            on completion of the PIP. In case, if your performance does not
                            improve or meet the desired expectations during this time, then your
                            internship can be terminated.
                        </Text>
                        <Text style={styles.para}>
                            The areas of improvement are assigned to you in a sheet sent via
                            official email id by the RM keeping HR in the loop.
                        </Text>
                        <Text style={styles.para}>Wishing you the best of luck!</Text>
                    </View>
                    <View style={styles.signatureSection}>
                        <Text style={styles.signatureText}>Sharthak Acharjee</Text>
                        <Text style={styles.signatureText}>Senior Manager-HR</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    page: {
        paddingTop: 40,
        paddingBottom: 40,
        paddingHorizontal: 40,
    },


    PdfTopic: {
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
        textDecoration: "underline",
        marginBottom: 20
    },
    subValue: {
        fontSize: 11,
        fontWeight: "bold",
        textAlign: "left",
        textDecoration: "underline",
        marginTop: 10,
    },
    subSection3: {
        marginTop: 10,
    },
    text: {
        fontSize: 11,
        marginTop: 5,
    },
    para: {
        fontSize: 11,
        marginTop: 15,
    },
    boldText: {
        fontWeight: 700,
    },
    subSection1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    subSection2: {
        display: "flex",
        flexDirection: "column",
    },
    signatureSection: {
        marginTop: 40,
    },
    signatureText: {
        fontSize: 11,
        fontWeight: 700,
        textAlign: "left",
    },
});

export default PDF;
