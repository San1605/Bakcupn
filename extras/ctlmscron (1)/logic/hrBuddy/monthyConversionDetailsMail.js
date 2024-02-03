const appRoot = require('app-root-path');
const format = require('pg-format');
const dbQuery = require("../../helpers/dbQuery.json");
const dbrequest = require("../../utils/dbrequest");
const sendMails = require("../../utils/nodeSendMails");
const Excel = require('exceljs');



// Get user assess info on Sub. and RG
const getmonthlyConversionDetails = async () => {       // get list of role assignments
    return new Promise(async (resolve, reject) => {
        try {
            console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            Date.prototype.today = function () { 
                return ((this.getDate() < 10)?"0":"") + this.getDate() +"-"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"-"+ this.getFullYear();
            }
            let formattedquery1 = format(dbQuery.hrBuddy.hrbuddylist);
            console.log(formattedquery1)
            let datas1 = await dbrequest(formattedquery1).catch(err => reject(err));
            console.log(datas1)
            // datas1.map(async(value)=>{
                var newDate = new Date();
                var datetime = newDate.today();

                    //  console.log(datetime);
                     let formattedquery = format(dbQuery.hrBuddy.getdata,datetime,datas1[0].department);
                     console.log(formattedquery);
                     let datas = await dbrequest(formattedquery).catch(err => reject(err));
                     console.log(datas);
                     if(datas.length > 0)
{

                     let fileName = 'conversion_report.xlsx';
                     let workbook = new Excel.Workbook();
                     let worksheet = workbook.addWorksheet('Sheet1');
                     worksheet.columns = [
                         {header: 'Name', key: 'Name', width: 35 },
                         {header: 'Email ID', key: 'EmailId', width: 35},
                         {header: 'Reporting to', key: 'Reporting_To', width: 35},
                         {header: 'Employee_type', key: 'Employee_type', width: 35},
                         {header: 'Potential_FTE_Conversion_Month', key: 'Potential_FTE_Conversion_Month', width: 35},
                         {header: 'Potential_Trainee_Conversion_Month', key: 'Potential_Trainee_Conversion_Month', width: 35}
                           
                     ];
                     worksheet.addRows(datas);
                     worksheet.getRow(1).eachCell((cell) => {
                         cell.font = {bold: true};
                     });
                     const buffer = await workbook.xlsx.writeBuffer();
                     console.log('....................................................................');
                     let attachment = [
                         {
                             fileName,
                             content: buffer,
                             contentType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                         }
                     ]
                     console.log(attachment)
                     console.log(buffer);
                     await sendMails("ishan.jain@celebaltech.com","Conversion Details",`<div>File Attached here</div>`,attachment)
                     resolve("Mail Sent Successfully")
                    }
                    else{
                        resolve("No data to send over mail")
                    }
                    // })
     } catch (err) {
            reject(err.message)
        }

    })
}

module.exports = getmonthlyConversionDetails
