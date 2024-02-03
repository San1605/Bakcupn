const config = require('../utils/config');
const helper = require("../utils/helper");
const db = require("./db")


const getAllBooksLogic = async (page = 1) => {
    const offset = helper.getOffest(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM user.library LIMIT ${offset},${config.listPerPage}`);
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

const addABookLogic = async (record) => {
    const result = await db.query(`INSERT INTO user.library (name, status,author) VALUES("${record.name}","${record.status}", "${record.author}")`);
    let message = 'Error in adding a book';
    if (result?.affectedRows) {
        message = 'added successfully';
    }
    return { message, result }
}

const updateBook = async (record) => {
    const result = await db.query(`UPDATE user.library SET name="${record.name}", author="${record.author}", status="${record.status}" WHERE id=${record.id}`);
    let message = 'Error in updating programming language';
    if (result.affectedRows) {
        message = "Update successfully";
    }

    return { message, record }
}
const deleteBook = async (id) => {
    const result = await db.query(`DELETE FROM user.library WHERE id=${id}`);
    let message = 'Error in deleting programing languages';
    if (result.affectedRows) {
        message = 'Delete successfully.'
    }
    return { message };
}

module.exports = {
    getAllBooksLogic,
    addABookLogic,
    updateBook,
    deleteBook
}