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


   it("returns an array of 5 objects", function() {

      result = tabulator(archerScore)

      expect(result.length).toBe(5);
   });
});




describe("convert Ms and Xs module", function() {

   it("should convert to X when score = 10 & spider = 1", function() {

      result = converter.convertMX(fakeRow)

      expect(result).toEqual({ arrow: 7, score: 'X', spider: 1})
   });

   it("should convert to M when score = 0 & spider = 0", function() {

      result = converter.convertMX(fakeRowWithMiss)

      expect(result).toEqual({ arrow: 7, score: 'M', spider: 0})
   });

   it("should set spider to 0 if score != 10", function() {

      result = converter.convertMX(fakeRowWithIncorrectSpider)

      expect(result).toEqual({ arrow: 3, score: 6, spider: 0})
   });
});









// let expectedResults =
// [ { endIndex: [  { arrow: 1, score: 8, spider: 0 },
//              { arrow: 2, score: 4, spider: 0 },
//              { arrow: 3, score: 10, spider: 0 },
//              { arrow: 4, score: 5, spider: 0 },
//              { arrow: 5, score: 5, spider: 0 },
//              { arrow: 6, score: 5, spider: 0 } ] },
//   { endIndex: [  { arrow: 7, score: 6, spider: 0 },
//              { arrow: 8, score: 9, spider: 0 },
//              { arrow: 9, score: 6, spider: 0 },
//              { arrow: 10, score: 9, spider: 0 },
//              { arrow: 11, score: 8, spider: 0 },
//              { arrow: 12, score: 6, spider: 0 } ] },
//   { endIndex: [  { arrow: 13, score: 1, spider: 0 },
//              { arrow: 14, score: 4, spider: 0 },
//              { arrow: 15, score: 'M', spider: 0 },
//              { arrow: 16, score: 2, spider: 0 },
//              { arrow: 17, score: 9, spider: 0 },
//              { arrow: 18, score: 6, spider: 0 }  ] },
//   { endIndex: [  { arrow: 19, score: 7, spider: 0 },
//              { arrow: 20, score: 6, spider: 0 },
//              { arrow: 21, score: 7, spider: 0 },
//              { arrow: 22, score: 4, spider: 0 },
//              { arrow: 23, score: 1, spider: 0 },
//              { arrow: 24, score: 7, spider: 0 } ] },
//   { endIndex: [  { arrow: 25, score: 'X', spider:1},
//              { arrow: 26, score: 1, spider: 0 },
//              { arrow: 27, score: 2, spider: 0 },
//              { arrow: 28, score: 4, spider: 0 },
//              { arrow: 29, score: 1, spider: 0 },
//              { arrow: 30, score: 2, spider: 0 ] } ]


let fakeRow = { arrow: 7, score: 10, spider: 1}
let fakeRowWithMiss = { arrow: 7, score: 0, spider: 0}
let fakeRowWithIncorrectSpider = { arrow: 3, score: 6, spider: 1}


let archerScore = [ { arrow: 1, score: 8, spider: 0},
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
   { arrow: 14, score: 4, spider: 0},
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

