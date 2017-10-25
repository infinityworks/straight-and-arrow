 
function convertMX(row){
 if (row.score == 0){
            row.score = 'M'
    }
if (row.spider.lastIndexOf(1) !== -1){
        row.score = 'X'
    }

    return row
}

exports.convertMX = convertMX