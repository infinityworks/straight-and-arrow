const helloWorld = require('../jasminetests');

describe("Hello world", function() {
	it("returns hello world", function() {
    expect(helloWorld()).toEqual("Hello World!");
	});
});



const tabulator = require("../app/data/mTabulateResults")

describe ("tabulateResults model", ()=>{


   it("returns an array of 5 objects", ()=> {

      result = tabulator(archerScore)

      expect(result.length).toBe(5);
   });
});





// expected results:
// [ { endIndex: [  { arrow: 1, score: 8, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 2, score: 4, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 3, score: 10, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 4, score: 5, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 5, score: 5, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 6, score: 5, spider: {“type”:“Buffer”,“data”:[0]} } ] },
//   { endIndex: [  { arrow: 7, score: 6, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 8, score: 9, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 9, score: 6, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 10, score: 9, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 11, score: 8, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 12, score: 6, spider: {“type”:“Buffer”,“data”:[0]} } ] },
//   { endIndex: [  { arrow: 13, score: 1, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 14, score: 4, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 15, score: 'M', spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 16, score: 2, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 17, score: 9, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 18, score: 6, spider: {“type”:“Buffer”,“data”:[0]} }  ] },
//   { endIndex: [  { arrow: 19, score: 7, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 20, score: 6, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 21, score: 7, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 22, score: 4, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 23, score: 1, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 24, score: 7, spider: {“type”:“Buffer”,“data”:[0]} } ] },
//   { endIndex: [  { arrow: 25, score: 'X', spider: {“type”:“Buffer”,“data”:[1]} },
//              { arrow: 26, score: 1, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 27, score: 2, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 28, score: 4, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 29, score: 1, spider: {“type”:“Buffer”,“data”:[0]} },
//              { arrow: 30, score: 2, spider: 0 ] } ]




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

