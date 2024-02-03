const getfileFunc = require("../logic/getFileFunc");

const getFileController = async (req, res) => {
    try {
        if (req.files) {
            const file = req.files.file;
            await getfileFunc(file)
            .then((result) => {
                res.json(result)
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        else {
            console.log(file, "error")
            res.json({
                message: "unsuccessfull"
            })
        }
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = getFileController