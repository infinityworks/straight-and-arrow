module.exports = (executeQuery, app, utility) => {

    return { showRegistration, sendRegistration, checkEmailsMatch, 
        checkEmailUnique, checkPasswordsMatch, checkPasswordPolicy , 
        checkPasswordLength };

    function showRegistration(req, res) {


        app.render('registration.html', {

        }, (err, content) => {
            res.render('fullpage.html', {
                title: "Registration",
                year: "2017",
                content: content
            })
        })
    }

function sendRegistration(req, res) {

       if(checkEmailUnique(req.body.email) == false){
           console.log("need to do the database count thing here")
       } else{

            // //password hashing should go here
            // hashword = regInput.password

            // executeQuery(`INSERT INTO player (name, dob, email, password)
            //             VALUES (?,?,?,?)`,
            //             [regInput.name, regInput.dob, regInput.email, hashword],(result) =>{

           app.render('registrationSuccess.html', {

           }, (err, content) => {
               res.render('fullpage.html', {
                   title: "Registration Success",
                   year: "2017",
                   content: content
               })
           })
       // })
   }
}



    function checkPasswordsMatch(pass, cpass) {
        return utility.checkCredentialsMatch(pass, cpass)
    }

    function checkEmailsMatch(email, cemail) {
        return utility.checkCredentialsMatch(email, cemail)
    }

    function checkEmailUnique(email){
        return true
        // select count(*) from table where email = email
        // if 0 it's unique, if 1 not unique
    }

    function checkPasswordPolicy(pass){
        return checkPasswordLength(pass)
    }

    function checkPasswordLength(password){
        if (password.length <8 || password.length >20){
            return false
        }
        else {
            return true
        }
    }

    // add DOB check?

}
