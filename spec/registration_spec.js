const registrationController = require('../app/controller/registration-controller');
const utility = require('../app/util/utilities');

//IF PASS =/= CPASS (Funtion to return false)

describe("Check strings which do not match", function() {
	it("returns false", function() {
    expect(utility.checkCredentialsMatch(
    	"pass", "fail")).toEqual(false);
	});
});

describe("Check strings which do match", function() {
	it("returns false", function() {
    expect(utility.checkCredentialsMatch(
    	"pass", "pass")).toEqual(true);
	});
});



//IF PASS 4 CHARS

// describe("4 character password", function() {
// 	it("raises exception because too short", function() {
//     expect(registrationController.sendRegistration(
//     	entryWithShortPassword)).toEqual(exception);
// 	});
// });




//IF PASS IS 5 CHARS

//IF PASS CONTAINS VOWELS

// IF PASS DOESNT CONTAIN VOWELS

//IF PASS HAS SPACES

// IF PASS DOESNT HAVE SPACES

// IF PASS MATCHES CPASS

//IF PASS =/= CPASS (THEN RAISE EXCEPTION)

// IF EMAIL MATCHES CEMAIL

//IF EMAIL =/= CEMAIL (THEN RAISE EXCEPTION)

// IF PASS HAS MORE THAN 128 CHARS

//IF PASS HAS 8 to 128 CHARS

//IF PASS STARTS WITH SPACES

//IF PASS ENDS WITH SPACES


