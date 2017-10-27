const convert = require('./convertmx')

module.exports = (archerScore) => {


    let tabulatedResults = [
        new Array(6),
        new Array(6),
        new Array(6),
        new Array(6),
        new Array(6)
    ]
    // let counter = 0
    // let endSelection = []
    // let endCounter = 1
    //let endTotal = 0

    arrowCounter = 1

    for (var i=0; i<tabulatedResults.length; i++) { 
        for (var j=0; j<tabulatedResults[i].length; j++) { 
            arrowRow = archerScore.shift()
            if (arrowRow && arrowRow.arrow != arrowCounter) {
                tabulatedResults[i][j] = {arrow: arrowCounter, score: 0}
                archerScore.unshift(arrowRow)
                arrowCounter++
            }
            else if (arrowRow && arrowRow.arrow == arrowCounter) {
                convert.convertMX(arrowRow)
                tabulatedResults[i][j] = {arrow: arrowRow.arrow, score: arrowRow.score}
                arrowCounter++
            }
            else if(!arrowRow){
                tabulatedResults[i][j] = {arrow: arrowCounter, score: 0}
                arrowCounter++
            }
            // else {
            //     tabulatedResults[i][j] = {arrow: arrowCounter, score: 0}
            //     arrowCounter ++
            // }
        console.log(tabulatedResults)
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
