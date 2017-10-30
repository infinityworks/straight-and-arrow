 
function convertMX(score, spider){

    let convertedScore = score.toString()

    if (score == 0){
        convertedScore = 'M'
    }
    if (score == 10 && spider == 1){
        convertedScore = 'X'
    }

    return convertedScore
}

exports.convertMX = convertMX