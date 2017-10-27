const convert = require('./convertmx')

module.exports = (archerScore) => {
console.log("data being passed", archerScore)
    let scoreCopy = archerScore
    let tabulatedResults = [
        {arrows:new Array(6)},
        {arrows:new Array(6)},
        {arrows:new Array(6)},
        {arrows:new Array(6)},
        {arrows:new Array(6)}
    ]
    // let counter = 0
    // let endSelection = []
    // let endCounter = 1
    //let endTotal = 0

    arrowCounter = 0

    for (var i=0; i<tabulatedResults.length; i++) { 

        for (var j=0; j<tabulatedResults[i].arrows.length; j++) { 

            arrowRow = scoreCopy[arrowCounter]
            console.log("the arrow row is", arrowRow)
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
            // else {
            //     tabulatedResults[i][j] = {arrow: arrowCounter, score: 0}
            //     arrowCounter ++
            // }
        
        }
    }


    
    
    // archerScore.forEach((row) => {
    //     counter++
    //    // endTotal += row.score
        

    //     endSelection.push(convert.convertMX(row))
        
    //     if (counter % 6 == 0) {
    //         tabulatedResults.push({
    //             endCounter, 
    //             endIndex: endSelection,
    //             //endTotal
    //         })

    //         //endTotal = 0

    //         endCounter++
    //         endSelection = []
    //     }
    // })

    return tabulatedResults
}
