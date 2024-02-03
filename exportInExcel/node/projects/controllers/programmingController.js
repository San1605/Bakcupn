const programmingLogic = require("../services/programminglogic")

const getRecordsController = async (req, res, next) => {
    try {
        res.json(await programmingLogic.getRecords(req.query.page))
    }
    catch (error) {
        console.log(error);
        next(error)
    }
}

const createRecordsController = async (req, res, next) => {
    try {
        res.json(await programmingLogic.createRecords(req.body))
    }
    catch (err) {
        console.log(err);
        next(err)
    }
}

const deleteRecordsController = async (req, res, next) => {
    try {
       res.json(await programmingLogic.deleteRecords(req.params.id))
    }
    catch (err) {
        console.log(err);
        next(err)
    }
}

const updateRecordsController=async(req,res,next)=>{
    try{
       res.json(await programmingLogic.updateRecords(req.body))
    }
    catch(err){
        console.log(err);
        next(err)
    }
}

module.exports = {
    getRecordsController,
    createRecordsController,
    deleteRecordsController,
    updateRecordsController
}