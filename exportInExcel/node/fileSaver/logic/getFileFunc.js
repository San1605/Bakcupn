const getFileFunc = (file) => {
    return new Promise(async (resolve, reject) => {
        try {
            file.mv(`./files/${file.name}`, () => {
                resolve({ message: `File uploaded successfully!` });
            })
        }
        catch (error) {
            console.log(error)
        }
    })
}
module.exports=getFileFunc

