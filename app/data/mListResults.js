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
        

    })

    return endSelection
}
