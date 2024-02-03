const appRoot = require('app-root-path');
const monthlyConversionDetails = require(appRoot + '/controllers/hrBuddy/monthlyConversionDetails')
module.exports = async function (context, myTimer) {
    try {
        console.log("Helllo")
        var timeStamp = new Date().toISOString();
        //Sending subscription and RG info to DB
        await monthlyConversionDetails().then(resp => {
            context.log('Success:', resp, timeStamp);
        }).catch(err => {
           
            context.log(err)
        })
    } catch (error) {
        
        context.log(error.message)
    }
}