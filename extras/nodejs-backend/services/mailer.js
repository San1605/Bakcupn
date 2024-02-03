var nodemailer = require("nodemailer");
const config = require("../config");

var transporter = nodemailer.createTransport(config.mailServer);

async function sendMail(info) {
    const mailOption = {
        from: config.mailServer.auth.user,
        to: info.to,
        subject: info.subject,
        html: info.html,
    };
    try {
        let mailinfo = await transporter.sendMail(mailOption);
        return { message: "Mail sent", info: mailinfo.response };
    } catch (error) {
        return { message: "Unable to send Mail", error: error };
    }
}

module.exports = {
    sendMail
}