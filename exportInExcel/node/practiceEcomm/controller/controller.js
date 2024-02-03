const  todoModel = require("../todoModel")

 const getController = async (req,res) => {
    const todos = await todoModel.find();
    res.send(todos)
}

 const postController = async(req, res) => {
    console.log("inisde")
    const todos = await todoModel.create({
        text: 'text'
    })
    res.send(todos)
}

const updateController = async() => {
 const userModal = await todoModel.findOneAndUpdate({_id})
}

const deleteController = () => {

}

module.exports={
    getController,
    postController,
    updateController,
    deleteController
}