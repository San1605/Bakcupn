// import React from 'react';
// import ExcelJS from 'exceljs';

// const ExportToExcel = ({ data }) => {
//   const handleExport = () => {
//     // Create a new workbook and add a worksheet
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Employee Data');

//     // Define custom headers
//     const headers = [
//       { header: 'HRMID', key: 'HRMID', width: 15 },
//       { header: 'Employee Name', key: 'Employee Name', width: 15 },
//       { header: 'Department', key: 'Department', width: 15 },
//       { header: 'Employee Type', key: 'Employee Type', width: 15 },
//       { header: 'Date of Joining', key: 'Dateofjoining', width: 15 },
//       { header: 'Reporting Manager', key: 'Reporting Manager', width: 15 },
//       { header: 'Work Mode', key: 'Work Mode', width: 15 },
//       { header: 'Work Location', key: 'Work Location', width: 15 },
//       { header: 'Enrolled Course', key: 'Enrolled Course', width: 15 },
//     ];

//     // Add project headers dynamically
//     data[0].Project.forEach((project, index) => {
//       headers.push(
//         { header: `Project ${index + 1}`, key: `Project[${index}].Project`, width: 30 },
//         { header: `Engagement Start Date ${index + 1}`, key: `Project[${index}].Engagement_Start_Date`, width: 20 },
//         { header: `Engagement End Date ${index + 1}`, key: `Project[${index}].Engagement_End_Date`, width: 20 },
//         { header: `Billability ${index + 1}`, key: `Project[${index}].Billability`, width: 20 },
//         { header: `Utilization % ${index + 1}`, key: `Project[${index}].Utilization %`, width: 20 },
//         { header: `Project Status ${index + 1}`, key: `Project[${index}].Project Status`, width: 20 }
//       );
//     });

//     // Add headers to the worksheet
//     worksheet.columns = headers;

//     // Initialize the row index
//     let rowIndex = 2; // Start from row 2 to accommodate headers

//     // Add data rows to the worksheet
//     data.forEach((employee) => {
//       const row = {
//         ...employee,
//       };

//       // Determine the number of project rows
//       const numProjectRows = Math.max(1, employee.Project.length); // At least 1 row

//       // Set the "Employee Name" cell with a rowSpan
//       if (rowIndex === 2) {
//         worksheet.getCell(`B${rowIndex}`).alignment = { vertical: 'middle', horizontal: 'center' };
//         worksheet.getCell(`B${rowIndex}`).rowSpan = numProjectRows;
//       }

//       // Add project data
//       employee.Project.forEach((project, index) => {
//         if (index === 0) {
//           // Skip the first row for "Employee Name" if multiple project rows
//           rowIndex++;
//         }
//         row[`Project[${index}].Project`] = project.Project;
//         row[`Project[${index}].Engagement_Start_Date`] = project.Engagement_Start_Date;
//         row[`Project[${index}].Engagement_End_Date`] = project.Engagement_End_Date;
//         row[`Project[${index}].Billability`] = project.Billability;
//         row[`Project[${index}].Utilization %`] = project['Utilization %'];
//         row[`Project[${index}].Project Status`] = project['Project Status'];
//         rowIndex++;
//       });

//       worksheet.addRow(row);
//     });

//     // Create a Blob object from the workbook
//     workbook.xlsx.writeBuffer().then((buffer) => {
//       const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//       // Create a download link and trigger the download
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'employee_data.xlsx';
//       a.click();

//       // Clean up
//       URL.revokeObjectURL(url);
//     });
//   };

//   return (
//     <div>
//       <button onClick={handleExport}>Export to Excel</button>
//     </div>
//   );
// };

// export default ExportToExcel;




// import React from 'react';
// import ExcelJS from 'exceljs';

// const ExportToExcel = ({ data }) => {
//   const handleExport = () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Employee Data');

//     // Define custom headers
//     const headers = [
//       { header: 'HRMID', key: 'HRMID', width: 15 },
//       { header: 'Employee Name', key: 'Employee Name', width: 15 },
//       { header: 'Department', key: 'Department', width: 15 },
//       { header: 'Employee Type', key: 'Employee Type', width: 15 },
//       { header: 'Date of Joining', key: 'Dateofjoining', width: 15 },
//       { header: 'Reporting Manager', key: 'Reporting Manager', width: 15 },
//       { header: 'Work Mode', key: 'Work Mode', width: 15 },
//       { header: 'Work Location', key: 'Work Location', width: 15 },
//       { header: 'Enrolled Course', key: 'Enrolled Course', width: 15 },
//       { header: 'Project', key: 'Project', width: 50 },
//       { header: 'Engagement Start Date', key: 'Engagement_Start_Date', width: 20 },
//       { header: 'Engagement End Date', key: 'Engagement_End_Date', width: 20 },
//       { header: 'Billability', key: 'Billability', width: 20 },
//       { header: 'Utilization %', key: 'Utilization %', width: 20 },
//       { header: 'Project Status', key: 'Project Status', width: 20 },
//       { header: 'Evaluation Report Link', key: 'Evaluation Report Link', width: 20 },
//     ];

//     // Add headers to the worksheet
//     worksheet.columns = headers;

//     // Style the header row
//     const headerRow = worksheet.getRow(1);
//     headerRow.eachCell((cell) => {
//       cell.font = { color: { argb: 'FFFFFF' } }; // White font color
//       cell.fill = {
//         type: 'pattern',
//         pattern: 'solid',
//         fgColor: { argb: '000000' }, // Black background color
//       };
//     });

//     // Add data rows to the worksheet
//     data.forEach((employee) => {
//       const projects = employee.Project.split(',');
//       const engagementStartDates = employee.Engagement_Start_Date.split(',');
//       const engagementEndDates = employee.Engagement_End_Date.split(',');
//       const billabilities = employee.Billability.split(',');
//       const utilizationPercentages = employee['Utilization %'].split(',');
//       const projectStatuses = employee['Project Status'].split(',');
//       const enrolledCourses = employee['Enrolled Course'].split(',');

//       const numRows = Math.max(projects.length, enrolledCourses.length, 1); // Ensure at least one row is added

//       for (let i = 0; i < numRows; i++) {
//         const row = {
//           HRMID: i <numRows ? employee.HRMID : '', // Display HRMID only in the first row
//           'Employee Name': i <numRows ? employee['Employee Name'] : '', // Display Employee Name only in the first row
//           Department: i === 0 ? employee.Department : '', // Display Department only in the first row
//           'Employee Type': i === 0 ? employee['Employee Type'] : '', // Display Employee Type only in the first row
//           'Date of Joining': i === 0 ? employee['Dateofjoining'] : '', // Display Date of Joining only in the first row
//           'Reporting Manager': i === 0 ? employee['Reporting Manager'] : '', // Display Reporting Manager only in the first row
//           'Work Mode': i === 0 ? employee['Work Mode'] : '', // Display Work Mode only in the first row
//           'Work Location': i === 0 ? employee['Work Location'] : '', // Display Work Location only in the first row
//           'Enrolled Course': i < enrolledCourses.length ? enrolledCourses[i] : '', // Display Enrolled Course on separate lines
//           Project: projects[i] || '', // Display the project for each row or an empty string if not available
//           Engagement_Start_Date: i < projects.length ? engagementStartDates[i] || '' : '', // Display empty string for additional rows
//           Engagement_End_Date: i < projects.length ? engagementEndDates[i] || '' : '', // Display empty string for additional rows
//           Billability: i < projects.length ? billabilities[i] || '' : '', // Display empty string for additional rows
//           'Utilization %': i < projects.length ? utilizationPercentages[i] || '' : '', // Display empty string for additional rows
//           'Project Status': i < projects.length ? projectStatuses[i] || '' : '', // Display empty string for additional rows
//           'Evaluation Report Link': i === 0 ? employee['Evaluation Report Link'] : '', // Display Evaluation Report Link only in the first row
//         };
//         worksheet.addRow(row);
//       }
//     });


//     workbook.xlsx.writeBuffer().then((buffer) => {
//       const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'employee_data.xlsx';
//       a.click();

//       // Clean up
//       URL.revokeObjectURL(url);
//     });
//   };

//   return (
//     <div>
//       <button onClick={handleExport}>Export to Excel</button>
//     </div>
//   );
// };

// export default ExportToExcel;




// import React from 'react';
// import ExcelJS from 'exceljs';

// const ExportToExcel = ({ data, headers }) => {
//   const handleExport = () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Employee Data');

//     // Add custom headers to the worksheet
//     worksheet.columns = headers.map((header) => ({
//       header: header.key,
//       key: header.key,
//       width: header.width || 15, // Default width if not specified
//     }));

//     // Style the header row
//     const headerRow = worksheet.getRow(1);
//     headerRow.eachCell((cell) => {
//       cell.font = { color: { argb: 'FFFFFF' } }; // White font color
//       cell.fill = {
//         type: 'pattern',
//         pattern: 'solid',
//         fgColor: { argb: '000000' }, // Black background color
//       };
//     });

//     // Add data rows to the worksheet
//     data.forEach((rowData) => {
//       const row = {};
//       headers.forEach((header) => {
//         row[header.key] = rowData[header.key] || '';
//       });
//       worksheet.addRow(row);
//     });

//     workbook.xlsx.writeBuffer().then((buffer) => {
//       const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'employee_data.xlsx';
//       a.click();

//       // Clean up
//       URL.revokeObjectURL(url);
//     });
//   };

//   return (
//     <div>
//       <button onClick={handleExport}>Export to Excel</button>
//     </div>
//   );
// };

// export default ExportToExcel;


import React from 'react';
import ExcelJS from 'exceljs';

const ExportToExcel = ({ data, headers }) => {
    const handleExport = () => {
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
                    item[ctr]!==null &&
                 item[ctr].includes(",")&&
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
            console.log(maxRowCount,"maxrowcountBeofre")
            if(maxRowCount===  Number.NEGATIVE_INFINITY){
                maxRowCount=1;
            }
            console.log(maxRowCount,"maxrowcountAfter")
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

    return (
        <div>
            <button onClick={handleExport}>Export to Excel</button>
        </div>
    );
};

export default ExportToExcel;



