const appRoot = require('app-root-path');
const getmonthlyConversionDetails = require('../../logic/hrBuddy/monthyConversionDetailsMail')


//Sending Role Info and user data to Database
async function monthlyConversionDetails() {
    return new Promise(async (resolve, reject) => {
        try {
            // Test DB Connection
            let status = await getmonthlyConversionDetails().catch(err => reject(err))
            if (status == "Mail Sent Successfully") {
                resolve({ status: true })
            } else {
                reject("Error Occured")
            }

        } catch (err) {
            reject(err.message)
        }
    })
}
module.exports = monthlyConversionDetails