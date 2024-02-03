const getfilefunc = (file)=>{
    return new Promise(async(resolve, reject) =>{
        try{
          file.mv(`./files/${file.name}`,()=>{
            resolve({message: `File uploaded successfully!`});
          })
        }
        catch(err){
            reject(err.message)
        }
    })
}
module.exports = getfilefunc;


