function getOffest(currentpage = 1, listPerPage){
    return (currentpage - 1) * [listPerPage];
}

function emptyOrRows(rows){
    if(!rows){
        return [];
    }
    return rows;
}

module.exports = {
    getOffest,
    emptyOrRows
}