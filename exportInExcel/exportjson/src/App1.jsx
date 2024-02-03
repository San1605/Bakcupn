import React, { useEffect, useState } from 'react';
import ExcelJS from 'exceljs';
// import EmployeeExcelExport from './Export';
import "./App.css"
function App() {

  const departMentResources = [
    {
      "HRMID": "HRM2889",
      "Employee Name": "Aayush Chandna",
      "Department": "App Development",
      "Employee Type": "Permanent",
      "Dateofjoining": "03-01-2023",
      "Reporting Manager": "Gaurav Sharma HRM459",
      "Work Mode": "null",
      "Work Location": "null",
      "Enrolled Course": "LP_UIUX,LP_LogicApp",
      "Project": "Jera MVP Development,OCR Solution- PoC Demo,CT-Cure Right,CT-Vision Demo,Etisalat GPT Bot",
      "Engagement_Start_Date": "00:00.0,00:00.0,00:00.0,00:00.0,00:00.0",
      "Engagement_End_Date": "00:00.0,00:00.0,00:00.0,00:00.0,00:00.0",
      "Billability": "Non-Billable & non-critical,Non-Billable & non-critical,Non-Billable & critical,Non-Billable & critical,Non-Billable & critical",
      "Utilization %": "50,100,100,100,100",
      "Project Status": "current,current,current,current,current",
      "Evaluation Report Link": "null"
    },
    {
      "HRMID": "HRM2889",
      "Employee Name": "ayush jain",
      "Department": "App Development",
      "Employee Type": "Permanent",
      "Dateofjoining": "03-01-2023",
      "Reporting Manager": "Gaurav Sharma HRM459",
      "Work Mode": "null",
      "Work Location": "null",
      "Enrolled Course": "LP_UIUX,LP_LogicApp",
      "Project": "Jera MVP Development,OCR Solution- PoC Demo,CT-Cure Right",
      "Engagement_Start_Date": "00:00.0,00:00.0,00:00.0",
      "Engagement_End_Date": "00:00.0,00:00.0,00:00.0",
      "Billability": "Non-Billable & non-critical,Non-Billable & non-critical,Non-Billable & critical",
      "Utilization %": "50,100,100",
      "Project Status": "current,current,current",
      "Evaluation Report Link": "null"
    },
    {
      "HRMID": "HRM2889",
      "Employee Name": "sujit jha",
      "Department": "App Development",
      "Employee Type": "Permanent",
      "Dateofjoining": "03-01-2023",
      "Reporting Manager": "Gaurav Sharma HRM459",
      "Work Mode": "null",
      "Work Location": "null",
      "Enrolled Course": "LP_UIUX",
      "Project": "Jera MVP Development",
      "Engagement_Start_Date": "00:00.0",
      "Engagement_End_Date": "00:00.0",
      "Billability": "Non-Billable & non-critical",
      "Utilization %": "50",
      "Project Status": "current",
      "Evaluation Report Link": "null"
    },
  ];

  const employeeList = [
    {
      "HRM ID": "HRM3558",
      "Employee Name": "Aachal Naresh Patil",
      "Reporting Manager": "HRM183 - Shashank Shekhar",
      "Department": "Data Science",
      "Employee Type": "Trainee",
      "Work Mode": "",
      "Work Location": "",
      "Project": "CT - OpenAI Demos",
      "Engagement_Start_Date": "00:00.0",
      "Engagement_End_Date": "00:00.0",
      "Billability": "Non-Billable & critical",
      "Engagement": "100",
      "Project Status": "current"
    },
    {
      "HRM ID": "HRM2937",
      "Employee Name": "Aadarsh Maheshwari",
      "Reporting Manager": "HRM441 - Akash Verma",
      "Department": "Data Science",
      "Employee Type": "Trainee",
      "Work Mode": "",
      "Work Location": "",
      "Project": "Americana Foods | HR & KPI Bot,CT-Demo,DEWA Phase 1 | Pilot | RFP Proposal Evaluation",
      "Engagement_Start_Date": "00:00.0,00:00.0,00:00.0",
      "Engagement_End_Date": "00:00.0,00:00.0,00:00.0",
      "Billability": "Billable & critical,Non-Billable & critical,Billable & critical",
      "Engagement": "80,100,100",
      "Project Status": "current,current,current"
    },
    {
      "HRM ID": "HRM1755",
      "Employee Name": "Aadi Kesharwani",
      "Reporting Manager": "HRM880 - Pranjul Gupta",
      "Department": "Business Intelligence",
      "Employee Type": "Permanent",
      "Work Mode": "Office",
      "Work Location": "Pune",
      "Project": "ThoughtClan(VAL)_BI",
      "Engagement_Start_Date": "00:00.0",
      "Engagement_End_Date": "00:00.0",
      "Billability": "Billable & critical",
      "Engagement": "100",
      "Project Status": "current"
    },
  ]

  const menteeList = [
    {
      "HRM ID": "HRM3007",
      "Employee Name": "Devesh Giri",
      "Department": "App Development",
      "Employee Type": "Trainee",
      "Secondary Mentor": null,
      "Date Of Joining": "01-02-2023",
      "Work Mode": "Office",
      "Work Location": "Jaipur - Jhalana",
      "Current Courses": "LP_SERVICEBUS, CT_BDA100",
      "Reporting_To": "HRM3860 - Sandesh Singhal",
      "Project": "CT-Design & Website Maintenance,CT-Cure Right",
      "Engagement_Start_Date": "00:00.0,00:00.0",
      "Engagement_End_Date": "00:00.0,00:00.0",
      "Project Status": "current,current",
      "Billability": "Non-Billable & critical,Non-Billable & critical",
      "Utilization%": "100,100",
      "Interview ID": "I_02505",
      "Interview Title": "FTE Conversion",
      "Interview Date": "2023-09-01T00:00:00.000Z",
      "Recording Link": "https://google.com",
      "Attached Document": null,
      "Communication Score": "5",
      "Technical Score": "4",
      "Learning Adaptibility": "3",
      "Punctuality Status": "2",
      "Performance In Internal Task": "1",
      "Updated His/Her Resume": "yes",
      "Overall Performance": "Excellent",
      "Candidate's Strength In Technical Area": "1",
      "Candidate's Weakness In Technical Area": "2",
      "Candidate's Improvement Area": "3",
      "Comprehensive List Of Projects": "4",
      "Has He/She Pursued POC": "5",
      "Relocated To Office?": "Yes",
      "Coming To Office?": "Yes",
      "Number Of Monthly Mocks": "5",
      "Reason Of Undeploybility": null,
      "How often the candidate takes the leaves in the month?": "6",
      "LP Paths completed?": "7",
      "Any Certification is done after joining Celebal?": "8",
      "Rigidness of the resource": "Low",
      "Project Name": "CT-Design & Website Maintenance,CT-Cure Right",
      "Project Manager": "swagatarhea.kousik@celebaltech.com,swagatarhea.kousik@celebaltech.com",
      "Final Decision Maker": "manan.gautam@celebaltech.com",
      "Is candidate eligible to be converted?": "Yes",
      "Final Verdict": "Concern resource can be able to qualify client-side interview. Eligible for deployment in any relevant project (Interview Qualified Successfully)",
      "Overall Feedback": "9"
    },
    {
      "HRM ID": "HRM3370",
      "Employee Name": "Abhishek Sharma",
      "Department": "App Development",
      "Employee Type": "Trainee",
      "Secondary Mentor": "Sandesh Singhal",
      "Date Of Joining": "15-03-2023",
      "Work Mode": "Office",
      "Work Location": "Jaipur - Jhalana",
      "Current Courses": null,
      "Reporting_To": "HRM3847 - Abhishek Tiwari",
      "Project": "CT-Cure Right",
      "Engagement_Start_Date": "00:00.0",
      "Engagement_End_Date": "00:00.0",
      "Project Status": "current",
      "Billability": "Non-Billable & non-critical",
      "Utilization%": "100",
      "Interview ID": "I_01868",
      "Interview Title": "Trainee Conversion",
      "Interview Date": "2023-07-13 00:00:00",
      "Recording Link": "https://celebaltech-my.sharepoint.com/:v:/p/hemant_sharma/EYzHHO0GYDBLohltDBdBKcgB4JFR-4gdP6R8xisT2RoewA",
      "Attached Document": null,
      "Communication Score": "4",
      "Technical Score": "4",
      "Learning Adaptibility": "5",
      "Punctuality Status": "5",
      "Performance In Internal Task": "4",
      "Updated His/Her Resume": "yes",
      "Overall Performance": "Excellent",
      "Candidate's Strength In Technical Area": "Node.js, WebSockets, SQL Database",
      "Candidate's Weakness In Technical Area": "GrapjQl",
      "Candidate's Improvement Area": "More fluent communication",
      "Comprehensive List Of Projects": "HandsFree Automation\nCt-CureRight",
      "Has He/She Pursued POC": "Ct-CureRight",
      "Relocated To Office?": "Yes",
      "Coming To Office?": "Yes",
      "Number Of Monthly Mocks": "0",
      "Reason Of Undeploybility": null,
      "How often the candidate takes the leaves in the month?": "0",
      "LP Paths completed?": "CT_NODEJS",
      "Any Certification is done after joining Celebal?": "No",
      "Rigidness of the resource": "Low",
      "Project Name": null,
      "Project Manager": null,
      "Final Decision Maker": "prashant.kumar@celebaltech.com",
      "Is candidate eligible to be converted?": "Yes",
      "Final Verdict": "Concern resource can be able to qualify client-side interview.\r Eligible for deployment in any relevant project (Interview\r Qualified Successfully)",
      "Overall Feedback": "Approved for Trainee "
    },
    {
      "HRM ID": "HRM3370",
      "Employee Name": "Abhishek Sharma",
      "Department": "App Development",
      "Employee Type": "Trainee",
      "Secondary Mentor": "Sandesh Singhal",
      "Date Of Joining": "15-03-2023",
      "Work Mode": "Office",
      "Work Location": "Jaipur - Jhalana",
      "Current Courses": null,
      "Reporting_To": "HRM3847 - Abhishek Tiwari",
      "Project": "CT-Cure Right",
      "Engagement_Start_Date": "00:00.0",
      "Engagement_End_Date": "00:00.0",
      "Project Status": "current",
      "Billability": "Non-Billable & non-critical",
      "Utilization%": "100",
      "Interview ID": "I_02321",
      "Interview Title": "Monthly",
      "Interview Date": "2023-07-29 00:00:00",
      "Recording Link": "https://celebaltech-my.sharepoint.com/:v:/p/hemant_sharma/EctclCpAGSNPrQUbfoy4ZOIBevvxRgomXP0Qbqr4loOXoQ",
      "Attached Document": null,
      "Communication Score": "4",
      "Technical Score": "4",
      "Learning Adaptibility": "5",
      "Punctuality Status": "5",
      "Performance In Internal Task": "4",
      "Updated His/Her Resume": "yes",
      "Overall Performance": "Good",
      "Candidate's Strength In Technical Area": "Rest APi ",
      "Candidate's Weakness In Technical Area": "Socket",
      "Candidate's Improvement Area": "Javascript",
      "Comprehensive List Of Projects": null,
      "Has He/She Pursued POC": "No",
      "Relocated To Office?": "Yes",
      "Coming To Office?": "Yes",
      "Number Of Monthly Mocks": null,
      "Reason Of Undeploybility": null,
      "How often the candidate takes the leaves in the month?": null,
      "LP Paths completed?": null,
      "Any Certification is done after joining Celebal?": null,
      "Rigidness of the resource": null,
      "Project Name": null,
      "Project Manager": null,
      "Final Decision Maker": null,
      "Is candidate eligible to be converted?": null,
      "Final Verdict": "Interview Qualified Successfully but need more training for\r getting deployed on a project.",
      "Overall Feedback": "Ok"
    },
    {
      "HRM ID": "HRM3685",
      "Employee Name": "Pradhyuman Shringi",
      "Department": "App Development",
      "Employee Type": "Intern",
      "Secondary Mentor": "Sandesh Singhal",
      "Date Of Joining": "01-06-2023",
      "Work Mode": "Office",
      "Work Location": "Jaipur - Jhalana",
      "Current Courses": "CT_DOP101",
      "Reporting_To": "HRM2601 - Divyanshu Rana",
      "Project": "CT-Cure Right,CT-Sustainability",
      "Engagement_Start_Date": "00:00.0,00:00.0",
      "Engagement_End_Date": "00:00.0,00:00.0",
      "Project Status": "current,current",
      "Billability": "Non-Billable & non-critical,Non-Billable & non-critical",
      "Utilization%": "100,100",
      "Interview ID": "I_02322",
      "Interview Title": "Monthly",
      "Interview Date": "2023-07-29 00:00:00",
      "Recording Link": "https://celebaltech-my.sharepoint.com/:v:/p/hemant_sharma/Ec2-gAsfDPdGjqJisCaT03IBKFXNJRGP8Fz33CHmUkTv9Q",
      "Attached Document": null,
      "Communication Score": "5",
      "Technical Score": "4",
      "Learning Adaptibility": "4",
      "Punctuality Status": "5",
      "Performance In Internal Task": "4",
      "Updated His/Her Resume": "yes",
      "Overall Performance": "Good",
      "Candidate's Strength In Technical Area": "Node.js",
      "Candidate's Weakness In Technical Area": "Socket",
      "Candidate's Improvement Area": "Database",
      "Comprehensive List Of Projects": null,
      "Has He/She Pursued POC": "NO",
      "Relocated To Office?": "Yes",
      "Coming To Office?": "Yes",
      "Number Of Monthly Mocks": null,
      "Reason Of Undeploybility": null,
      "How often the candidate takes the leaves in the month?": null,
      "LP Paths completed?": null,
      "Any Certification is done after joining Celebal?": null,
      "Rigidness of the resource": null,
      "Project Name": null,
      "Project Manager": null,
      "Final Decision Maker": null,
      "Is candidate eligible to be converted?": null,
      "Final Verdict": "Interview Qualified Successfully but need more training for\r getting deployed on a project.",
      "Overall Feedback": "OK"
    },
    {
      "HRM ID": "HRM3685",
      "Employee Name": "Pradhyuman Shringi",
      "Department": "App Development",
      "Employee Type": "Intern",
      "Secondary Mentor": "Sandesh Singhal",
      "Date Of Joining": "01-06-2023",
      "Work Mode": "Office",
      "Work Location": "Jaipur - Jhalana",
      "Current Courses": "CT_DOP101",
      "Reporting_To": "HRM2601 - Divyanshu Rana",
      "Project": "CT-Cure Right,CT-Sustainability",
      "Engagement_Start_Date": "00:00.0,00:00.0",
      "Engagement_End_Date": "00:00.0,00:00.0",
      "Project Status": "current,current",
      "Billability": "Non-Billable & non-critical,Non-Billable & non-critical",
      "Utilization%": "100,100",
      "Interview ID": "I_02510",
      "Interview Title": "Trainee Conversion",
      "Interview Date": "2023-09-14T00:00:00.000Z",
      "Recording Link": "https://google.com",
      "Attached Document": null,
      "Communication Score": "5",
      "Technical Score": "3",
      "Learning Adaptibility": "5",
      "Punctuality Status": "3",
      "Performance In Internal Task": "5",
      "Updated His/Her Resume": "yes",
      "Overall Performance": "Good",
      "Candidate's Strength In Technical Area": "adada",
      "Candidate's Weakness In Technical Area": "adadad",
      "Candidate's Improvement Area": "asaddad",
      "Comprehensive List Of Projects": "asdadadda",
      "Has He/She Pursued POC": "adadda",
      "Relocated To Office?": "Yes",
      "Coming To Office?": "Yes",
      "Number Of Monthly Mocks": "3",
      "Reason Of Undeploybility": null,
      "How often the candidate takes the leaves in the month?": "adsad",
      "LP Paths completed?": "adadadad",
      "Any Certification is done after joining Celebal?": "adadad",
      "Rigidness of the resource": "Low",
      "Project Name": "CT-Cure Right,CT-Sustainability",
      "Project Manager": "abhishek.tiwari2@celebaltech.com,sandesh.singhal@celebaltech.com",
      "Final Decision Maker": "sandesh.singhal@celebaltech.com",
      "Is candidate eligible to be converted?": "Yes",
      "Final Verdict": "Concern resource can be able to qualify client-side interview. Eligible for deployment in any relevant project (Interview Qualified Successfully)",
      "Overall Feedback": "asasas"
    }
  ]
  
  const [headersSelected, setHeadersSelected] = useState([]);

  const handleExport = (data, headers) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employee Data');

    // Add custom headers to the worksheet
    worksheet.columns = headers.map((item) => ({
      header: item,
      key: item,
      width: 20,
    }));

    const multiValueColumns = [];

    data?.forEach((item, index) => {
      Object.keys(item)?.forEach((ctr, index) => {

        if (
          headers.includes(ctr) &&
          item[ctr] !== null &&
          item[ctr].includes(",") &&
          multiValueColumns.find((obj) => obj === ctr) === undefined) {
          multiValueColumns.push(ctr);
        }

      })
    })
    console.log(multiValueColumns, "multi");


    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { color: { argb: 'FFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '000000' },
      };
    });

    // Add data rows to the worksheet
    data.forEach((rowData) => {
      let maxRowCount = Math.max(
        ...multiValueColumns.map((column) => rowData[column]?.split(',').length)
      );
      console.log(maxRowCount, "maxrowcountBeofre")
      if (maxRowCount === Number.NEGATIVE_INFINITY) {
        maxRowCount = 1;
      }
      console.log(maxRowCount, "maxrowcountAfter")
      for (let rowIndex = 0; rowIndex < maxRowCount; rowIndex++) {
        const row = {};
        headers.forEach((header) => {
          const columnName = header;
          if (multiValueColumns.includes(columnName)) {
            const values = rowData[columnName].split(',');
            row[columnName] = rowIndex < values.length ? values[rowIndex].trim() : '';
          }
          else {
            row[columnName] = rowData[columnName] || '';
          }
        });
        worksheet.addRow(row);
      }
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'employee_data.xlsx';
      a.click();

      // Clean up
      URL.revokeObjectURL(url);
    });
  };

  // const headers = Object.keys(employeeList[0]);
  const headers = Object.keys(menteeList[0]);
  // const headers = Object.keys(departMentResources[0]);



  const handleAll = () => {
    if (headers.length === headersSelected.length) {
      setHeadersSelected([])
    }
    else {
      setHeadersSelected(headers)
    }
  }

  const toggleChange = (item) => {
    if (headersSelected.includes(item)) {
      setHeadersSelected((prev) => prev.filter((data) => data !== item))
    }
    else {
      setHeadersSelected((prev) => [...prev, item])
    }
  }


  return (
    <div className='filterPopover'>
      <div className='DownloadFilterBoxTop'>
        <span>Filter</span>
        <div className='selectAllBox'>
          <input type="checkbox" name="" id=""
            checked={headers.length === headersSelected.length}
            onChange={handleAll} />
          <label className='selectAllLabel' htmlFor="">Select All</label>
        </div>
      </div>

      <div className="optionBox">
        {
          headers.map((item, index) => {
            // if (index > 3) {
            return (
              <div key={index}>
                <input type="checkbox"
                  value={item}
                  checked={headersSelected.includes(item)}
                  onChange={() => toggleChange(item)}
                  />
                  <span className='downloadFilterSpan'>{item}</span>
              </div>
            )
            // }
          }
          )
        }
      </div>
      <div className="downloadFilterButton">
        <button  className='downloadFilterButtonCancel'>Cancel</button>
        <button onClick={() => handleExport(menteeList, headersSelected)} className='downloadFilterButtonExport' >Download Excel</button>
      </div>

    </div>
  )
}
export default App;