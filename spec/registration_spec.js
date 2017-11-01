const registrationController = require('../app/controller/registration-controller');
const utility = require('../app/util/utilities');


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

describe("Check when passwords do not match", function() {
	it("reveals an incorrect password notification", function() {
    expect(registrationController.registration(wrongPasswordExample)).toEqual(false);
	});
});

// describe("Check passwords which do match", function() {
// 	it("returns false", function() {
//     expect(registrationController.checkPasswordsMatch(
//     	"pass", "pass")).toEqual(true);
// 	});
// });

//Name
//DOB
//Email
//CEmail
//Password
//CPassword

let wrongPasswordExample =
{ name: 'Dan',
  dob: '01011900',
  email: 'dan@dan.com',
  cemail: 'dan@dan.com',
  password: 'password',
  cpassword: 'wrongpassword' }

// IF PASS 4 CHARS

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


