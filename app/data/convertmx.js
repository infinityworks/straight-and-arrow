 
function convertMX(row){
    if (row.score == 0){
            row.score = 'M'
    }
    if (row.score == 10 && row.spider == 1){
        row.score = 'X'
    }

    return row
}

exports.convertMX = convertMX