const people = require("../people");

const getPeople=  (req, res) => {
    res.status(200).json({
        success: true,
        data: people
    })
}

const login =(req, res) => {
    console.log(req.body);
    const { userName } = req.body;
    if (userName) {
        console.log("name")
        return res.status(200).send(`welcome ${userName}`);
    }
    res.status(401).send("Please provide name");
}

const editUser=(req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const person = people.find((person) => person.id === Number(id));
    console.log(person)
    if (!person) {
        return req.status(404).json({
            success: "false",
            message: "please provide a valid id"
        })
    }
    const newPeople = people.map((item) => {
        if (item.id === Number(id)) {
            item.name = name;
        }
        return item;
    })

    res.status(200).json({
        success: "true",
        data: newPeople
    })
}

const deleteUser=(req, res) => {
    const { id } = req.params;
    const person = people.find((item) => item.id === Number(id));
    if (!person) {
       return res.status(404).json({
            success: "true",
            message: "Please provide valid id"
        })
    }

    const newPerson = people.filter((item)=>item.id!==Number(id));
    return res.status(200).json({
        success:"true",
        data:newPerson
    })
}

module.exports={
    getPeople,
    deleteUser,
    editUser,
    login
}