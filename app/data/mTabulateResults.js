module.exports = (archerScore) => {

        
    let tabulatedResults = []
    let counter = 0
    let endSelection = []


    archerScore.forEach((row) => {
        if (row.score == 0){
            row.score = 'M'
        }
        if (row.spider.lastIndexOf(1) !== -1){
            row.score = 'X'
        }
        counter++
        endSelection.push(row)
        if (counter % 6 == 0) {
            tabulatedResults.push({
                endIndex: endSelection
            })
            endSelection = []
        }

    })

    return tabulatedResults
}
