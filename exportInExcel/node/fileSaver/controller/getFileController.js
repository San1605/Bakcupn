const getFileFunc= require("../logic/getFileFunc")

const getFileController = async (req,res) => {
    try {
        if (req.files) {
            const file = req.files.files;
            await getFileFunc(file)
                .then((result) => {
                    return res.json(result)
                })
                .catch((error) => {
                    return res.json(error)
                })
        }
        else {
            console.log("file not found");
            res.json({ message: "file not found" })
        }
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = getFileController