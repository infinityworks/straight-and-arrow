module.exports = (archerScore) => {


    let tabulatedResults = []
    let counter = 0
    let endSelection = []
    let endCounter = 1
    let endTotal = 0

    archerScore.forEach((row) => {
        // if (row.score == 0){
        //     row.score = 'M'
        // }
        // if (row.spider.lastIndexOf(1) !== -1){
        //     row.score = 'X'
        // }
        counter++
        endTotal += row.score
        endSelection.push(row)
        if (counter % 6 == 0) {
            tabulatedResults.push({
                endCounter, 
                endIndex: endSelection,
                endTotal
            })

            endTotal = 0

            endCounter++
            endSelection = []
        }

    })

    return tabulatedResults
}
