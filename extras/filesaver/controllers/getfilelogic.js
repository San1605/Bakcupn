const getfilefunc = require('../logic/getfilefunc');
const getfilelogic = async(req,res)=>{
  
    try{
        if(req.files)
        {
            let file = req.files.codefile;
         await getfilefunc(file).then((result)=>res.json(result)).catch(error=>res.json(error))}
         else{
            console.log("file not found");
            res.json({message:"file not found"});
         }
    }
    catch(error){
        console.log(error)
    }
}
module.exports = getfilelogic