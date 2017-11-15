const convert = require('./convertmx')

module.exports = (archerScore) => {

    let scoreCopy = archerScore.sort(function(a, b) {
    return parseFloat(a.arrow) - parseFloat(b.arrow);
    });

    let tabulatedResults = [
        {arrows:new Array(6)},
        {arrows:new Array(6)},
        {arrows:new Array(6)},
        {arrows:new Array(6)},
        {arrows:new Array(6)}
    ]

    arrowCounter = 0

    for (var i=0; i<tabulatedResults.length; i++) {

        for (var j=0; j<tabulatedResults[i].arrows.length; j++) {

            arrowRow = scoreCopy[arrowCounter]
            if (arrowRow && arrowRow.arrow != arrowCounter +1) {
                tabulatedResults[i].arrows[j] = 0
                arrowCounter++
            }
            else if (arrowRow && arrowRow.arrow == arrowCounter +1) {
                convertedScore = convert.convertMX(arrowRow.score, arrowRow.spider)
                tabulatedResults[i].arrows[j] = convertedScore
                arrowCounter++
            }
            else{
                tabulatedResults[i].arrows[j] = 0
                arrowCounter++
            }

        }
    }

    return tabulatedResults
}
