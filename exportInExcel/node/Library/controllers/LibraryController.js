const libraryLogic = require("../services/libraryLogic")

const getAllBooks = async (req, res, next) => {
    try {
        res.json(await libraryLogic.getAllBooksLogic(req.query.page));
    }
    catch (error) {
        console.log(error);
        next(error)
    }
}

const addBook = async (req, res, next) => {
    try {
        res.json(await libraryLogic.addABookLogic(req.body))
    }
    catch (error) {
        console.log(error);
        next(error)
    }
}

const updateBook=async(req,res,next)=>{
  try{
    res.json(await libraryLogic.updateBook(req.body))
  }
  catch(error){
    console.log(error);
    next(error)
  }
}

const deleteBook=async(req,res,next)=>{
    try{
        res.json(await libraryLogic.deleteBook(req.params.id))
      }
      catch(error){
        console.log(error);
        next(error)
      }
}

module.exports = {
    getAllBooks,
    addBook,
    updateBook,
    deleteBook
}