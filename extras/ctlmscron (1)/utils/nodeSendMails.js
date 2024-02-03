const nodemailer = require('nodemailer');
require('dotenv').config({ path: "../config.env" });
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "ctlms@celebaltech.com",
        pass: "wclbpgkkrwftsqzl"
    }
});  //creating a transporter or intiliazing ...
// console.log({ 
//     user: process.env.EMAIL,
//     pass: process.env.EMAILPASSWORD
// })

  
//function for sending the mail via api/sendMails
async function sendMails(toEmail, sub, details,attachment) {
    return new Promise(async (resolve, reject) => {
        try{
            mailOption = {
                from: "ctlms@celebaltech.com",
                to: toEmail,
                subject: sub,
                html: details,
                attachments:attachment
            }
            transporter.sendMail(mailOption, function (err, info) {
                if (err) {
                    console.log(err)
                    resolve({ code: 404, message: err });
                }
                else {
                    console.log("kkkkkkkkkkkk")
                    resolve({ code: 200, message: 'Mail Delievered' });
                }
            });
        }catch(err){
            reject(err.message)
        }
    })
}

module.exports = sendMails;