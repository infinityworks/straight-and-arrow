const moment = require('moment')

function parseDate(date) {
    let formattedDate = moment(date).format('dddd Do MMMM, YYYY')
    return formattedDate
}

exports.parseDate = parseDate