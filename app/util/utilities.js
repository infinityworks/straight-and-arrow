const moment = require('moment')

function parseDate(date) {
    let formattedDate = moment(date).format('dddd Do MMMM, YYYY')
    return formattedDate
}


function checkCredentialsMatch(stringA, stringB) {
    return stringB === stringA;
}


exports.parseDate = parseDate
exports.checkCredentialsMatch = checkCredentialsMatch

exports.loginOptions = (loggedIn) => {
    if(loggedIn){
        return [ { name: 'Logout', link: '/logout' } ];
    }

    return [
        { name: 'Registration', link: '/registration' },
        { name: 'Login', link: '/login' }
    ];

};
