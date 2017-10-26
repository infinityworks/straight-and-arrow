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

    for (var i=0; i<tabulatedResults.length; i++) { //endIndex
        for (var j=0; j<tabulatedResults[i].length; j++) { //ends
            arrowRow = archerScore.shift()
            if (arrowRow) {
                convert.convertMX(arrowRow)
                tabulatedResults[i][j] = arrowRow.score
                console.log("jfsbjsf:", tabulatedResults)
            }
            
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
