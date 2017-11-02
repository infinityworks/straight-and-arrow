const registrationController = require('../app/controller/registration-controller');
const utility = require('../app/util/utilities');
const rc = registrationController(1,2, utility)


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
    expect(rc.checkPasswordsMatch("pass", "fail")).toEqual(false);
	});
});

describe("Check when passwords do match", function() {
  it("doesn't error", function() {
    expect(rc.checkPasswordsMatch("danifyouwant", "danifyouwant")).toEqual(true);
  });
});

describe("Check when emails do not match", function() {
  it("reveals an incorrect email notification", function() {
    expect(rc.checkEmailsMatch("danifyouwant@dan.com", "danifyoudont@dan.com")).toEqual(false);
  });
});

describe("Check when passwords do match", function() {
  it("doesn't error", function() {
    expect(rc.checkEmailsMatch("danifyouwant@dan.com", "danifyouwant@dan.com")).toEqual(true);
  });
});

describe("Check when passwords length is less than 8", function() {
	it("returns false", function() {
    expect(rc.checkPasswordLength("hello")).toEqual(false);
	});
});

describe("Check when passwords length is more than 20", function() {
	it("returns false", function() {
    expect(rc.checkPasswordLength("hellohellohellohellohellohello")).toEqual(false);
	});
});

describe("Check when passwords length is between 8 and 20", function() {
	it("returns false", function() {
    expect(rc.checkPasswordLength("hellohello")).toEqual(true);
	});
});

describe("Check when passwords length is between 8 and 20", function() {
	it("returns false", function() {
    expect(rc.checkPasswordLength("hellohello")).toEqual(true);
	});
});

// FUTURE INTERGRATION TEST
// describe("Checks success page is rendered when form filled in correctly", function() {
//   it("will redirect user to successful registration page", function() {
      //   result = rc.sendRegistration(correctPasswordExample)
      //    expect(result.something).toInclude("this phrase")
//   }
// })


let wrongPasswordExample =
{ name: 'Dan',
  dob: '01011900',
  email: 'dan@dan.com',
  cemail: 'dan@dan.com',
  password: 'password',
  cpassword: 'wrongpassword' }

  let correctPasswordExample =
{ name: 'Dan',
  dob: '01011900',
  email: 'dan@dan.com',
  cemail: 'dan@dan.com',
  password: 'password',
  cpassword: 'password' }

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
