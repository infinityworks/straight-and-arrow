const moment = require('moment')

function parseDate(date) {
    let formattedDate = moment(date).format('dddd Do MMMM, YYYY')
    return formattedDate
}


function checkCredentialsMatch(stringA, stringB) {
    if (stringB !== stringA){
    	return false
    }
    else {
    	return true
    }
}

exports.parseDate = parseDate
exports.checkCredentialsMatch = checkCredentialsMatch
