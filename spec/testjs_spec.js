const helloWorld = require('../jasminetests');
const utility = require('../app/util/utilities');
const tabulator = require("../app/data/mTabulateResults")
const converter = require("../app/data/convertmx")


describe("Hello world", function() {
	it("returns hello world", function() {
    expect(helloWorld()).toEqual("Hello World!");
	});
});

describe("Parse Date", function() {
   it("returns formatted date", function() {
      expect(utility.parseDate("2017-11-12 10:00:00")).toEqual("Sunday 12th November, 2017");
   });
});



describe("tabulateResults model", function() {

  it("returns an array of 5 objects, having passed an input of 30 arrows", function() {

      result = tabulator(archerScore30)
      //console.log(archerScore30)
      expect(result.length).toBe(5);
   });


// START THE TESTING HERE

  // it("returns 5 ends of length 6, having passed an input of 30 arrows", function() {

  //     result = tabulator(archerScore30)

  //     expect(result[0].length).toBe(6);
  //     expect(result[1].length).toBe(6);
  //     expect(result[2].length).toBe(6);
  //     expect(result[3].length).toBe(6);
  //     expect(result[4].length).toBe(6);
  //  });


   // it("returns an array of 5 objects, having passed an input of 15 arrows", function() {

   //    result = tabulator(archerScoreWith15)

   //    expect(result.length).toBe(5);
   // });

   // it("returns 5 ends of length 6, having passed an input of 15 arrows", function() {

   //    result = tabulator(archerScoreWith15)

   //    expect(result[0].length).toBe(6);
   //    expect(result[1].length).toBe(6);
   //    expect(result[2].length).toBe(6);
   //    expect(result[3].length).toBe(6);
   //    expect(result[4].length).toBe(6);
   // });

   // it("returns an array of 5 objects, having passed a list with one arrow object", function() {

   //    result = tabulator([fakeRow])

   //    expect(result[0].length).toBe(6);
   //    expect(result[1].length).toBe(6);
   //    expect(result[2].length).toBe(6);
   //    expect(result[3].length).toBe(6);
   //    expect(result[4].length).toBe(6);
   // });





   it("Correctly converts full archer scorecard", function() {

      result = tabulator(archerScore30)
      console.log(result)

      expect(result).toEqual(convertedArcherScore);
   });
});




describe("convert Ms and Xs module", function() {

   it("should convert to X when score = 10 & spider = 1", function() {

      result = converter.convertMX(10, 1)

      expect(result).toEqual("X")
   });

   it("should convert to M when score = 0 & spider = 0", function() {

      result = converter.convertMX(0, 0)

      expect(result).toEqual("M")
   });

   it("should set spider to 0 if score != 10", function() {

      result = converter.convertMX(6, 1)

      expect(result).toEqual("6")
   });

   it("Keeps score at 10 if spider is 0", function() {

      result = converter.convertMX(10, 0)

      expect(result).toEqual("10")
   });
});








//result variables comparison
let convertedArcherScore =
[ {arrows: ["8", "4", "10", "5", "5", "5"] },
  {arrows: ["6", "9", "6", "9", "8", "6"] },
  {arrows: ["1", "4", "M", "2", "9", "6"] },
  {arrows: ["7", "6", "7", "4", "1", "7"] },
  {arrows: ["X", "1", "2", "4", "1", "2"] } ]


//mock rows
let fakeRow = { arrow: 7, score: 10, spider: 1}
let fakeRowWithMiss = { arrow: 7, score: 0, spider: 0}
let fakeRowWithIncorrectSpider = { arrow: 3, score: 6, spider: 1}
let fakeRowWithNoSpiderAndHighScore = { arrow: 3, score: 10, spider: 0}


//mock objects
let archerScore30 = [ 
   { arrow: 1, score: 8, spider: 0},
   { arrow: 2, score: 4, spider: 0},
   { arrow: 3, score: 10, spider: 0},
   { arrow: 4, score: 5, spider: 0},
   { arrow: 5, score: 5, spider: 0},
   { arrow: 6, score: 5, spider: 0},
   { arrow: 7, score: 6, spider: 0},
   { arrow: 8, score: 9, spider: 0},
   { arrow: 9, score: 6, spider: 0},
   { arrow: 10, score: 9, spider: 0},
   { arrow: 11, score: 8, spider: 0},
   { arrow: 12, score: 6, spider: 0},
   { arrow: 13, score: 1, spider: 0},
   { arrow: 14, score: 4, spider: 1},
   { arrow: 15, score: 0, spider: 0},
   { arrow: 16, score: 2, spider: 0},
   { arrow: 17, score: 9, spider: 0},
   { arrow: 18, score: 6, spider: 0},
   { arrow: 19, score: 7, spider: 0},
   { arrow: 20, score: 6, spider: 0},
   { arrow: 21, score: 7, spider: 0},
   { arrow: 22, score: 4, spider: 0},
   { arrow: 23, score: 1, spider: 0},
   { arrow: 24, score: 7, spider: 0},
   { arrow: 25, score: 10, spider: 1},
   { arrow: 26, score: 1, spider: 0},
   { arrow: 27, score: 2, spider: 0},
   { arrow: 28, score: 4, spider: 0},
   { arrow: 29, score: 1, spider: 0},
   { arrow: 30, score: 2, spider: 0}]

let archerScoreWith15 = [ { arrow: 1, score: 8, spider: 0},
   { arrow: 2, score: 4, spider: 0},
   { arrow: 3, score: 10, spider: 0},
   { arrow: 4, score: 5, spider: 0},
   { arrow: 5, score: 5, spider: 0},
   { arrow: 21, score: 7, spider: 0},
   { arrow: 22, score: 4, spider: 0},
   { arrow: 23, score: 1, spider: 0},
   { arrow: 24, score: 7, spider: 0},
   { arrow: 25, score: 10, spider: 1},
   { arrow: 26, score: 1, spider: 0},
   { arrow: 27, score: 2, spider: 0},
   { arrow: 28, score: 4, spider: 0},
   { arrow: 29, score: 1, spider: 0},
   { arrow: 30, score: 2, spider: 0}]

