const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getRecords(page = 1) {
    const offset = helper.getOffest(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM user.programming_languages LIMIT ${offset},${config.listPerPage}`);
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function createRecords(record) {
    const result = await db.query(`INSERT INTO user.programming_languages (name, released_year) VALUES("${record.name}", ${record.released_year})`);

    let message = 'Error in creating a programming lang';
    if (result?.affectedRows) {
        message = 'Create successfully';
    }
    return { message, result }
}


async function deleteRecords(id) {
    const result = await db.query(`DELETE FROM user.programming_languages WHERE id=${id}`);
    let message = 'Error in deleting programing languages';
    if (result.affectedRows) {
        message = 'Delete successfully.'
    }
    return { message };
}



async function updateRecords(record) {
    const result = await db.query(`UPDATE user.programming_languages SET name="${record.name}", released_year=${record.released_year} WHERE id=${record.id}`);

    let message = 'Error in updating programming language';
    if (result.affectedRows) {
        message = "Update successfully";
    }

    return { message, record }
}

module.exports = {
    getRecords,
    createRecords,
    deleteRecords,
    updateRecords
}




// const programmingLanguages = [
//     { name: "JavaScript", releaseYear: 1995 },
//     { name: "Python", releaseYear: 1991 },
//     { name: "Java", releaseYear: 1995 },
//     { name: "C++", releaseYear: 1985 },
//     { name: "C#", releaseYear: 2000 },
//     { name: "Ruby", releaseYear: 1995 },
//     { name: "Swift", releaseYear: 2014 },
//     { name: "TypeScript", releaseYear: 2012 },
//     { name: "Go", releaseYear: 2009 },
//     { name: "Rust", releaseYear: 2010 },
//     { name: "Kotlin", releaseYear: 2011 },
//     { name: "PHP", releaseYear: 1995 },
//     { name: "HTML", releaseYear: 1993 },
//     { name: "CSS", releaseYear: 1996 },
//     { name: "Scala", releaseYear: 2003 },
//     { name: "R", releaseYear: 1993 },
//     { name: "Perl", releaseYear: 1987 },
//     { name: "Haskell", releaseYear: 1990 },
//     { name: "Lua", releaseYear: 1993 },
//     { name: "Swift", releaseYear: 2014 },
//   ];