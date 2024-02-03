const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getRecords(page = 1) {
    const offset = helper.getOffest(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM programming_languages LIMIT ${offset},${config.listPerPage}`);
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function deleteRecord(id) {
    const result = await db.query(`DELETE FROM programming_languages WHERE id=${id}`);

    let message = 'Error in deleting programing languages';
    if (result.affectedRows) {
        message = 'Delete successfully.'
    }

    return { message };
}
// name, released_year, githut_rank, pypl_rank, tiobe_rank

async function updateRecord(record) {
    const result = await db.query(`UPDATE programming_languages SET name="${record.name}", released_year=${record.released_year}, githut_rank=${record.githut_rank}, pypl_rank=${record.pypl_rank}, tiobe_rank=${record.tiobe_rank} 
    WHERE id = ${record.id}`);

    let message = 'Error in updating programming language';
    if (result.affectedRows) {
        message = "Update successfully";
    }

    return { message, record }
}

async function createRecord(record) {
    const result = await db.query(`INSERT INTO programming_languages(name, released_year, githut_rank, pypl_rank, tiobe_rank) VALUES(
        "${record.name}", ${record.released_year}, ${record.githut_rank}, ${record.pypl_rank}, ${record.tiobe_rank} )`);
    
    let message = 'Error in creating a prgramming lang';
    if(result.affectedRows){
        message = 'Create successfully';
    }
    return {message, result}
}

module.exports = {
    getRecords,
    deleteRecord,
    updateRecord,
    createRecord
}