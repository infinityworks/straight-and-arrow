const convert = require('./convertmx')

module.exports = (archerScore) => {


    let tabulatedResults = []
    let counter = 0
    let endSelection = []
    let endCounter = 1
    //let endTotal = 0

    archerScore.forEach((row) => {
        counter++
       // endTotal += row.score
        

        endSelection.push(convert.convertMX(row))
        
        if (counter % 6 == 0) {
            tabulatedResults.push({
                endCounter, 
                endIndex: endSelection,
                //endTotal
            })

            //endTotal = 0

            endCounter++
            endSelection = []
        }
    })

    return tabulatedResults
}
